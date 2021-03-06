import { evalExp } from '../syntax.js';
import { mapSeries } from '../util/promise.js';
import * as _ from '../util/underscore.js';
import assert from '../util/assert.js';
import { RenderBreakError } from '../util/error.js';
import * as lexical from '../lexical.js';

const re = new RegExp(`^(${lexical.identifier.source})\\s+in\\s+` +
    `(${lexical.value.source})` +
    `(?:\\s+${lexical.hash.source})*` +
    `(?:\\s+(reversed))?` +
    `(?:\\s+${lexical.hash.source})*$`);

export default function (liquid) {
  liquid.registerTag('for', {

    parse: function (tagToken, remainTokens) {
      var match = re.exec(tagToken.args);
      assert(match, `illegal tag: ${tagToken.raw}`);
      this.variable = match[1];
      this.collection = match[2];
      this.reversed = !!match[3];

      this.templates = [];
      this.elseTemplates = [];

      var p;
      var stream = liquid.parser.parseStream(remainTokens)
        .on('start', () => (p = this.templates))
        .on('tag:else', () => (p = this.elseTemplates))
        .on('tag:endfor', () => stream.stop())
        .on('template', tpl => p.push(tpl))
        .on('end', () => {
          throw new Error(`tag ${tagToken.raw} not closed`);
        });

      stream.start();
    },

    render: function (scope, hash) {
      return evalExp(this.collection, scope).then(collection => {
        collection = collection || [];
        if (!Array.isArray(collection)) {
          if (_.isString(collection) && collection.length > 0) {
            collection = [collection];
          } else if (_.isObject(collection)) {
            collection = Object.keys(collection).map(key => collection[key]);
          }
        }
        if (!Array.isArray(collection) || !collection.length) {
          return liquid.renderer.renderTemplates(this.elseTemplates, scope);
        }

        var length = collection.length;
        var offset = hash.offset || 0;
        var limit = (hash.limit === undefined) ? collection.length : hash.limit;

        collection = collection.slice(offset, offset + limit);
        if (this.reversed) collection.reverse();

        var contexts = collection.map((item, i) => {
          var ctx = {};
          ctx[this.variable] = item;
          ctx.forloop = {
            _target: collection, // expose object being iterated for filters
            first: i === 0,
            index: i + 1,
            index0: i,
            last: i === length - 1,
            length: length,
            rindex: length - i,
            rindex0: length - i - 1
          };
          return ctx;
        });

        var html = '';
        return mapSeries(contexts, (context) => {
          return Promise.resolve()
            .then(() => scope.push(context))
            .then(() => liquid.renderer.renderTemplates(this.templates, scope))
            .then(partial => (html += partial))
            .catch(e => {
              if (e instanceof RenderBreakError) {
                html += e.resolvedHTML;
                if (e.message === 'continue') return;
              }
              throw e;
            })
            .then(() => scope.pop());
        }).catch((e) => {
          if (e instanceof RenderBreakError && e.message === 'break') {
            return;
          }
          throw e;
        }).then(() => html);
      });
    }
  });
}
