import { evalValue } from '../syntax.js';
import assert from '../util/assert.js';

import * as lexical from '../lexical.js';
const staticFileRE = /\S+/;

/*
 * blockMode:
 * * "store": store rendered html into blocks
 * * "output": output rendered html
 */

export default function (liquid) {
  liquid.registerTag('layout', {
    parse: function (token, remainTokens) {
      var match = staticFileRE.exec(token.args);
      if (match) {
        this.staticLayout = match[0];
      }

      match = lexical.value.exec(token.args);
      if (match) {
        this.layout = match[0];
      }

      this.tpls = liquid.parser.parse(remainTokens);
    },
    render: function (scope, hash) {
      return (scope.opts.dynamicPartials ? evalValue(this.layout, scope) : Promise.resolve(this.staticLayout)).then(layout => {
        assert(layout, `cannot apply layout with empty filename`);

        // render the remaining tokens immediately
        scope.opts.blockMode = 'store';
        return liquid.renderer.renderTemplates(this.tpls, scope)
          .then(html => {
            if (scope.opts.blocks[''] === undefined) {
              scope.opts.blocks[''] = html;
            }
            return liquid.getTemplate(layout, scope.opts.root);
          })
          .then(templates => {
            // push the hash
            scope.push(hash);
            scope.opts.blockMode = 'output';
            return liquid.renderer.renderTemplates(templates, scope);
          })
          // pop the hash
          .then(partial => {
            scope.pop();
            return partial;
          });
      });
    }
  });

  liquid.registerTag('block', {
    parse: function (token, remainTokens) {
      var match = /\w+/.exec(token.args);
      this.block = match ? match[0] : '';

      this.tpls = [];
      var stream = liquid.parser.parseStream(remainTokens)
        .on('tag:endblock', () => stream.stop())
        .on('template', tpl => this.tpls.push(tpl))
        .on('end', () => {
          throw new Error(`tag ${token.raw} not closed`);
        });
      stream.start();
    },
    render: function (scope) {
      return Promise.resolve(scope.opts.blocks[this.block])
        .then(html => html === undefined
          // render default block
          ? liquid.renderer.renderTemplates(this.tpls, scope)
          // use child-defined block
          : html)
        .then(html => {
          if (scope.opts.blockMode === 'store') {
            scope.opts.blocks[this.block] = html;
            return '';
          }
          return html;
        });
    }
  });
}
