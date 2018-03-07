const chai = require('chai')
const expect = chai.expect
var syntax = require('../src/syntax.js')
var Scope = require('../src/scope.js')

chai.use(require('chai-as-promised'))

var evalExp = syntax.evalExp
var evalValue = syntax.evalValue
var isTruthy = syntax.isTruthy

describe('expression', function () {
  var scope

  beforeEach(function () {
    scope = Scope.factory({
      one: 1,
      two: 2,
      empty: '',
      x: 'XXX',
      y: undefined,
      z: null
    })
  })

  describe('.evalValue()', function () {
    it('should eval literals', function () {
      return Promise.all([
        expect(evalValue('2.3')).to.eventually.equal(2.3),
        expect(evalValue('"foo"')).to.eventually.equal('foo'),
      ])
    })

    it('should eval variables', function () {
      return Promise.all([
        expect(evalValue('23', scope)).eventually.to.equal(23),
        expect(evalValue('one', scope)).eventually.to.equal(1),
        expect(evalValue('x', scope)).to.eventually.equal('XXX'),
      ])
    })

    it('should throw if not valid', function () {
      var fn = () => evalValue('===')
      return expect(fn).to.throw("cannot eval '===' as value")
    })
  })

  describe('.isTruthy()', function () {
    // Spec: https://shopify.github.io/liquid/basics/truthy-and-falsy/
    expect(isTruthy(true)).to.be.true
    expect(isTruthy(false)).to.be.false
    expect(isTruthy(null)).to.be.false
    expect(isTruthy('foo')).to.be.true
    expect(isTruthy('')).to.be.true
    expect(isTruthy(0)).to.be.true
    expect(isTruthy(1)).to.be.true
    expect(isTruthy(1.1)).to.be.true
    expect(isTruthy([1])).to.be.true
    expect(isTruthy([])).to.be.true
  })

  describe('.evalExp()', function () {
    it('should throw when scope undefined', function () {
      expect(function () {
        evalExp('')
      }).to.throw(/scope undefined/)
    })

    it('should eval simple expression', function () {
      return Promise.all([
        expect(evalExp('1<2', scope)).to.eventually.equal(true),
        expect(evalExp('2<=2', scope)).to.eventually.equal(true),
        expect(evalExp('one<=two', scope)).to.eventually.equal(true),
        expect(evalExp('x contains "x"', scope)).to.eventually.equal(false),
        expect(evalExp('x contains "X"', scope)).to.eventually.equal(true),
        expect(evalExp('1 contains "x"', scope)).to.eventually.equal(false),
        expect(evalExp('y contains "x"', scope)).to.eventually.equal(false),
        expect(evalExp('z contains "x"', scope)).to.eventually.equal(false),
        expect(evalExp('(1..5) contains 3', scope)).to.eventually.equal(true),
        expect(evalExp('(1..5) contains 6', scope)).to.eventually.equal(false),
        expect(evalExp('"<=" == "<="', scope)).to.eventually.equal(true),
      ])
    })

    describe('complex expression', function () {
      it('should support value or value', function () {
        return expect(evalExp('false or true', scope)).to.eventually.equal(true)
      })
      it('should support < and contains', function () {
        return expect(evalExp('1<2 and x contains "x"', scope)).to.eventually.equal(false)
      })
      it('should support < or contains', function () {
        return expect(evalExp('1<2 or x contains "x"', scope)).to.eventually.equal(true)
      })
      it('should support value and !=', function () {
        return expect(evalExp('empty and empty != ""', scope)).to.eventually.equal(false)
      })
    })

    it('should eval range expression', function () {
      return Promise.all([
        expect(evalExp('(2..4)', scope)).to.eventually.deep.equal([2, 3, 4]),
        expect(evalExp('(two..4)', scope)).to.eventually.deep.equal([2, 3, 4]),
      ])
    })
  })
})
