import * as lexical from './lexical.js'
import * as Syntax from './syntax.js'
import assert from './util/assert.js'
import * as _ from './util/underscore.js'

var valueRE = new RegExp(`${lexical.value.source}`, 'g')

export default function (options) {
  options = _.assign({}, options)
  var filters = {}

  var _filterInstance = {
    render: function (output, scope) {
      return Promise.all(this.args.map(arg => Syntax.evalValue(arg, scope))).then(args => {
        args.unshift(output)
        return this.filter.apply(scope, args)
      })
    },
    parse: function (str) {
      let match = lexical.filterLine.exec(str)
      assert(match, 'illegal filter: ' + str)

      const name = match[1]
      const argList = match[2] || ''
      const filter = filters[name]
      if (typeof filter !== 'function') {
        if (options.strict_filters) {
          throw new TypeError(`undefined filter: ${name}`)
        }
        this.name = name
        this.filter = x => x
        this.args = []
        return this
      }

      const args = []
      while ((match = valueRE.exec(argList.trim()))) {
        const v = match[0]
        const re = new RegExp(`${lexical.escape(v)}\\s*:`, 'g')
        const keyMatch = re.exec(match.input)
        const currentMatchIsKey = keyMatch && keyMatch.index === match.index
        currentMatchIsKey ? args.push(`'${v}'`) : args.push(v)
      }

      this.name = name
      this.filter = filter
      this.args = args

      return this
    }
  }

  function construct (str) {
    var instance = Object.create(_filterInstance)
    return instance.parse(str)
  }

  function register (name, filter) {
    filters[name] = filter
  }

  function clear () {
    filters = {}
  }

  return {
    construct, register, clear
  }
}
