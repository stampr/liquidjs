const operators = require('./operators.js')(isTruthy)
const lexical = require('./lexical.js')
const assert = require('../src/util/assert.js')

function evalExp (exp, scope) {
  assert(scope, 'unable to evalExp: scope undefined')
  var operatorREs = lexical.operators
  var match
  for (var i = 0; i < operatorREs.length; i++) {
    var operatorRE = operatorREs[i]
    var expRE = new RegExp(`^(${lexical.quoteBalanced.source})(${operatorRE.source})(${lexical.quoteBalanced.source})$`)
    if ((match = exp.match(expRE))) {
      return (function(match) {
        return Promise.all([
          evalExp(match[1], scope),
          evalExp(match[3], scope),
        ]).then(results => {
          var l = results[0]
          var r = results[1]
          var op = operators[match[2].trim()]
          return op(l, r)
        })
      })(match)
    }
  }

  if ((match = exp.match(lexical.rangeLine))) {
    return Promise.all([
      evalValue(match[1], scope),
      evalValue(match[2], scope),
    ]).then(results => {
      var low = results[0]
      var high = results[1]
      var range = []
      for (var j = low; j <= high; j++) {
        range.push(j)
      }
      return range
    })
  }

  return evalValue(exp, scope)
}

function evalValue (str, scope) {
  str = str && str.trim()
  if (!str) return Promise.resolve(undefined)
  if (lexical.isLiteral(str)) {
    // console.log('evalValue isLiteral', str);
    return Promise.resolve(lexical.parseLiteral(str))
  }
  if (lexical.isVariable(str)) {
    // console.log('evalValue isVariable', str, scope);
    return scope.get(str);
  }
  throw new TypeError(`cannot eval '${str}' as value`)
}

function isTruthy (val) {
  return !isFalsy(val)
}

function isFalsy (val) {
  return val === false || undefined === val || val === null
}

module.exports = {
  evalExp, evalValue, isTruthy, isFalsy
}
