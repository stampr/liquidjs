import { evalExp } from '../syntax.js';
import { mapSeries } from '../util/promise.js';
import assert from '../util/assert.js';
import * as lexical from '../lexical.js';
const re = new RegExp(`^(${lexical.identifier.source})\\s+in\\s+` +
  `(${lexical.value.source})` +
  `(?:\\s+${lexical.hash.source})*$`);

export default function (liquid) {
  liquid.registerTag('tablerow', {

    parse: function (tagToken, remainTokens) {
      var match = re.exec(tagToken.args);
      assert(match, `illegal tag: ${tagToken.raw}`);

      this.variable = match[1];
      this.collection = match[2];
      this.templates = [];

      var p;
      var stream = liquid.parser.parseStream(remainTokens)
        .on('start', () => (p = this.templates))
        .on('tag:endtablerow', token => stream.stop())
        .on('template', tpl => p.push(tpl))
        .on('end', () => {
          throw new Error(`tag ${tagToken.raw} not closed`);
        });

      stream.start();
    },

    render: function (scope, hash) {
      return evalExp(this.collection, scope).then(collection => {
        collection = collection || [];
        var html = '<table>';
        var offset = hash.offset || 0;
        var limit = (hash.limit === undefined) ? collection.length : hash.limit;

        var cols = hash.cols;
        var row;
        var col;
        if (!cols) throw new Error(`illegal cols: ${cols}`);

        // build array of arguments to pass to sequential promises...
        collection = collection.slice(offset, offset + limit);
        var contexts = [];
        collection.some((item, i) => {
          var ctx = {};
          ctx[this.variable] = item;
          contexts.push(ctx);
        });

        return mapSeries(contexts,
          (context, idx) => {
            row = Math.floor(idx / cols) + 1;
            col = (idx % cols) + 1;
            if (col === 1) {
              if (row !== 1) {
                html += '</tr>';
              }
              html += `<tr class="row${row}">`;
            }

            html += `<td class="col${col}">`;
            scope.push(context);
            return liquid.renderer
              .renderTemplates(this.templates, scope)
              .then((partial) => {
                scope.pop(context);
                html += partial;
                html += '</td>';
                return html;
              });
          })
          .then(() => {
            if (row > 0) {
              html += '</tr>';
            }
            html += '</table>';
            return html;
          });
      });
    }
  });
}
