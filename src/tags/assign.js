const Liquid = require('../index.js');
const lexical = Liquid.lexical;
const re = new RegExp(`(${lexical.identifier.source})\\s*=(.*)`)
const assert = require('../util/assert.js')

module.exports = function (liquid) {
  liquid.registerTag('assign', {
    parse: function (token) {
      var match = token.args.match(re)
      assert(match, `illegal token ${token.raw}`)
      this.key = match[1]
      this.value = match[2]
    },
    render: function (scope) {
      return liquid.evalValue(this.value, scope).then(value => {
        scope.set(this.key, value)
        return ''
      })
    }
  })
}
