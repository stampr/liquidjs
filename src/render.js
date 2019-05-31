import * as Syntax from './syntax.js';
import { EMPTY } from './lexical.js';
import { mapSeries } from './util/promise.js';
import { RenderBreakError, RenderError } from './util/error.js';
import assert from './util/assert.js';

var render = {

  renderTemplates: function (templates, scope) {
    assert(scope, 'unable to evalTemplates: scope undefined');

    // console.log('\n\nrenderTemplates', templates);

    var html = '';
    return mapSeries(templates, tpl => renderTemplate.call(this, tpl)
      .then(partial => {
        html += partial;
      })
      .catch(e => {
        if (e instanceof RenderBreakError) {
          e.resolvedHTML = html;
          throw e;
        }
        if (tpl && tpl.token) {
          throw new RenderError(e, tpl);
        } else {
          throw new Error('Could not render because of unkown error: ' + e.message);
        }
      }))
      .then(() => html);

    function renderTemplate (template) {
      let value;
      if (template.type === 'tag') {
        value = this.renderTag(template, scope);
      } else if (template.type === 'value') {
        value = this.evalValue(template, scope);
      } else { // template.type === 'html'
        value = Promise.resolve(template.value);
      }
      return value.then(result => stringify(result));
    }
  },

  renderTag: function (template, scope) {
    if (template.name === 'continue') {
      return Promise.reject(new RenderBreakError('continue'));
    }
    if (template.name === 'break') {
      return Promise.reject(new RenderBreakError('break'));
    }
    return template.render(scope);
  },

  evalValue: function (template, scope) {
    assert(scope, 'unable to evalValue: scope undefined');
    try {
      // console.log('evalValue; template', template);
      return Syntax.evalExp(template.initial, scope)
        .then(initialValue => {
          // console.log('evalValue; initialValue', initialValue);
          return template.filters.reduce((promise, filter) => {
            return promise.then(prev => {
              // console.log('evalValue; calling filter', filter, 'with', prev);
              return filter.render(prev, scope).then(next => {
                // console.log('evalValue; filter done', filter, 'result', next);
                return next;
              });
            });
          }, Promise.resolve(initialValue));
        })
        .then(result => {
          // console.log('evalValue; result', result);
          return result;
        });
    } catch (err) {
      return Promise.reject(err);
    }
  }
};

function stringify (val) {
  if (val === null || undefined === val || EMPTY === val) {
    return '';
  } else if (Array.isArray(val)) {
    return val.join(''); // shopify compatible
  } else if (typeof val === 'object') {
    if (val && typeof val.toString === 'function') {
      const result = val.toString();
      return result === '[object Object]' ? '' : result;
    } else {
      return ''; // shopify compatible
    }
  } else {
    return '' + val; // string, number, bool
  }
}

export default function () {
  var instance = Object.create(render);
  return instance;
}
