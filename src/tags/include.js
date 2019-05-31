import { evalValue } from '../syntax.js';
import assert from '../util/assert.js';

import * as lexical from '../lexical.js';
const withRE = new RegExp(`with\\s+(${lexical.value.source})`);
const staticFileRE = /\S+/;

export default function (liquid) {
  liquid.registerTag('include', {
    parse: function (token) {
      var match = staticFileRE.exec(token.args);
      if (match) {
        this.staticValue = match[0];
      }

      match = lexical.value.exec(token.args);
      if (match) {
        this.value = match[0];
      }

      match = withRE.exec(token.args);
      if (match) {
        this.with = match[1];
      }
    },
    render: function (scope, hash) {
      return (scope.opts.dynamicPartials
        ? evalValue(this.value, scope)
        : Promise.resolve(this.staticValue)).then(filepath => {
        assert(filepath, `cannot include with empty filename`);
        var originBlocks = scope.opts.blocks;
        var originBlockMode = scope.opts.blockMode;
        scope.opts.blocks = {};
        scope.opts.blockMode = 'output';

        return (!this.with ? Promise.resolve() : evalValue(this.with, scope).then(result => {
          hash[filepath] = result;
          return result;
        })).then(() => {
          return liquid.getTemplate(filepath, scope.opts.root)
            .then((templates) => {
              scope.push(hash);
              return liquid.renderer.renderTemplates(templates, scope);
            })
            .then((html) => {
              scope.pop();
              scope.opts.blocks = originBlocks;
              scope.opts.blockMode = originBlockMode;
              return html;
            });
        });
      });
    }
  });
}
