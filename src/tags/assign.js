import assert from '../util/assert.js';
import * as lexical from '../lexical.js';

const re = new RegExp(`(${lexical.identifier.source})\\s*=(.*)`);

export default function (liquid) {
  liquid.registerTag('assign', {
    parse: function (token) {
      var match = token.args.match(re);
      assert(match, `illegal token ${token.raw}`);
      this.key = match[1];
      this.value = match[2];
    },
    render: function (scope) {
      return liquid.evalValue(this.value, scope).then(value => {
        scope.set(this.key, value);
        return '';
      });
    }
  });
}
