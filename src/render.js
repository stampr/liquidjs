import * as Syntax from './syntax.js';
import { EMPTY } from './lexical.js';
import { mapSeries } from './util/promise.js';
import { RenderBreakError, RenderError } from './util/error.js';
import assert from './util/assert.js';

var render = {

  renderTemplates: function (templates, scope) {
    assert(scope, 'unable to evalTemplates: scope undefined')

    var html = ''
    return mapSeries(templates, (tpl) => {
      return renderTemplate.call(this, tpl)
        .then(partial => (html += partial))
        .catch(e => {
          if (e instanceof RenderBreakError) {
            e.resolvedHTML = html
            throw e
          }
          throw new RenderError(e, tpl)
        })
    }).then(() => html)

    function renderTemplate (template) {
      if (template.type === 'tag') {
        return this.renderTag(template, scope)
          .then(partial => partial === undefined ? '' : partial)
      } else if (template.type === 'value') {
        return this.evalValue(template, scope)
          .then(partial => partial === undefined ? '' : stringify(partial))
      } else { // template.type === 'html'
        return Promise.resolve(template.value)
      }
    }
  },

  renderTag: function (template, scope) {
    if (template.name === 'continue') {
      return Promise.reject(new RenderBreakError('continue'))
    }
    if (template.name === 'break') {
      return Promise.reject(new RenderBreakError('break'))
    }
    return template.render(scope)
  },

  evalValue: function (template, scope) {
    assert(scope, 'unable to evalValue: scope undefined')
    try {
      // console.log('template.filters', template.filters)
      return Syntax.evalExp(template.initial, scope).then(initialValue => {
        // console.log('template.filters; initialValue', initialValue);
        return template.filters.reduce((promise, filter) => {
          return promise.then(prev => {
            return filter.render(prev, scope).then(next => {
              // console.log('evalValue', {prev,next})
              return next;
            });
          })
        }, Promise.resolve(initialValue));
      });
    }
    catch (err) {
      return Promise.reject(err);
    }
  },
}

function stringify (val) {
  if (typeof val === 'string') {
    return val;
  }
  else if (null === val || undefined === val || EMPTY === val) {
    return '';
  }
  else {
    return JSON.stringify(val);
  }
}

export default function() {
  var instance = Object.create(render)
  return instance
}

