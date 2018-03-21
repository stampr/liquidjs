const Liquid = require('../main.js');
const assert = require('../util/assert.js')
const lexical = Liquid.lexical

module.exports = function (liquid) {
  liquid.registerTag('increment', {
    parse: function (token) {
      var match = token.args.match(lexical.identifier)
      assert(match, `illegal identifier ${token.args}`)
      this.variable = match[0]
    },
    render: function (scope, hash) {
      return scope.get(this.variable).then(v => {
        if (typeof v !== 'number') v = 0
        scope.set(this.variable, v + 1)
      });
    }
  })
}
