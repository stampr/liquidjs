import assert from '../util/assert.js';
import * as lexical from '../lexical.js';

export default function (liquid) {
  liquid.registerTag('increment', {
    parse: function (token) {
      var match = token.args.match(lexical.identifier);
      assert(match, `illegal identifier ${token.args}`);
      this.variable = match[0];
    },
    render: function (scope, hash) {
      return scope.get(this.variable).then(v => {
        if (typeof v !== 'number') v = 0;
        scope.set(this.variable, v + 1);
      });
    }
  });
}
