const chai = require('chai')
const expect = chai.expect
var syntax = require('../src/syntax.js')
var createScope = require('../src/scope.js').createScope
var SafeObject = require('../src/safe-object.js');

chai.use(require('chai-as-promised'))

var evalExp = syntax.evalExp
var evalValue = syntax.evalValue
var isTruthy = syntax.isTruthy

describe('expression', function () {
  var scope

  beforeEach(function () {
    scope = createScope({
      size: 'hello:size',
      first: 'hello:first',
      last: 'hello:last',
      dotnotation: {
        size: 'hello:size',
        first: 'hello:first',
        last: 'hello:last',
      },
      dotnotation2: {
        arr: [
          {
            value: 'hello:first',
          },
          {
            value: 'hello:last',
          },
        ]
      },
      one: 1,
      two: 2,
      emptystr: '',
      emptyarr: [],
      emptyobj: {},
      nonemptyarr: ['hello','world'],
      nonemptyobj: {one:'hello',two:'world'},
      nonemptystr: '123',
      x: 'XXX',
      y: undefined,
      z: null,
      safeObject_1_Val_A: new SafeObject('a'),
      safeObject_2_Val_B: new SafeObject('b'),
      safeObject_3_Val_A: new SafeObject('a'),
    });
  });

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

    describe('dot notation methods', function() {
      describe('size', function() {
        it('should not match variables', function () {
          return expect(evalValue('size', scope)).to.eventually.equal('hello:size');
        });
        it('should not match objects that contain property matching method', function () {
          return expect(evalValue('dotnotation.size', scope)).to.eventually.equal('hello:size');
        });
        it('should support size for string length', function () {
          return expect(evalValue('nonemptystr.size', scope)).to.eventually.equal(3);
        });
        it('should support size for array length', function () {
          return expect(evalValue('nonemptyarr.size', scope)).to.eventually.equal(2);
        });
        it('should support size for object key length', function () {
          return expect(evalValue('nonemptyobj.size', scope)).to.eventually.equal(2);
        });
        it('should support undefined', function () {
          return expect(evalValue('y.size', scope)).to.eventually.equal(0);
        });
      });
      describe('first', function() {
        it('should not match variables', function () {
          return expect(evalValue('first', scope)).to.eventually.equal('hello:first');
        });
        it('should not match objects that contain property matching method', function () {
          return expect(evalValue('dotnotation.first', scope)).to.eventually.equal('hello:first');
        });
        it('should support first for string', function () {
          return expect(evalValue('nonemptystr.first', scope)).to.eventually.equal('1');
        });
        it('should support first for array', function () {
          return expect(evalValue('nonemptyarr.first', scope)).to.eventually.equal('hello');
        });
        it('should support first for object key', function () {
          return expect(evalValue('nonemptyobj.first', scope)).to.eventually.equal('hello');
        });
        it('should support undefined', function () {
          return expect(evalValue('y.first', scope)).to.eventually.equal(null);
        });
        it('should work anywhere in the object path', function() {
          return expect(evalValue('dotnotation2.arr.first.value', scope)).to.eventually.equal('hello:first');
        });
      });
      describe('last', function() {
        it('should not match variables', function () {
          return expect(evalValue('last', scope)).to.eventually.equal('hello:last');
        });
        it('should not match objects that contain property matching method', function () {
          return expect(evalValue('dotnotation.last', scope)).to.eventually.equal('hello:last');
        });
        it('should support last for string', function () {
          return expect(evalValue('nonemptystr.last', scope)).to.eventually.equal('3');
        });
        it('should support last for array', function () {
          return expect(evalValue('nonemptyarr.last', scope)).to.eventually.equal('world');
        });
        it('should support last for object key', function () {
          return expect(evalValue('nonemptyobj.last', scope)).to.eventually.equal('world');
        });
        it('should support undefined', function () {
          return expect(evalValue('y.last', scope)).to.eventually.equal(null);
        });
        it('should work anywhere in the object path', function() {
          return expect(evalValue('dotnotation2.arr.last.value', scope)).to.eventually.equal('hello:last');
        });
      });
    });
  })

  describe('.isTruthy()', function () {
    // Spec: https://shopify.github.io/liquid/basics/truthy-and-falsy/
    expect(isTruthy(true)).to.be.true
    expect(isTruthy(false)).to.be.false
    expect(isTruthy(null)).to.be.false
    expect(isTruthy('foo')).to.be.true
    expect(isTruthy('')).to.be.false
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
        return expect(evalExp('emptystr and emptystr != ""', scope)).to.eventually.equal(false)
      })
    })

    it('should eval range expression', function () {
      return Promise.all([
        expect(evalExp('(2..4)', scope)).to.eventually.deep.equal([2, 3, 4]),
        expect(evalExp('(two..4)', scope)).to.eventually.deep.equal([2, 3, 4]),
      ])
    })

    it('empty comparisons', function () {
      return Promise.all([
        expect(evalExp('emptyarr == empty', scope)).to.eventually.be.true,
        expect(evalExp('nonemptyarr == empty', scope)).to.eventually.be.false,
        expect(evalExp('emptystr == empty', scope)).to.eventually.be.true,
        expect(evalExp('one != empty', scope)).to.eventually.be.true,
        expect(evalExp('x != empty', scope)).to.eventually.be.true,
        expect(evalExp('emptyarr == blank', scope)).to.eventually.be.true,
        expect(evalExp('nonemptyarr == blank', scope)).to.eventually.be.false,
        expect(evalExp('emptystr == blank', scope)).to.eventually.be.true,
        expect(evalExp('one != blank', scope)).to.eventually.be.true,
        expect(evalExp('x != blank', scope)).to.eventually.be.true,
        expect(evalExp('x != y', scope)).to.eventually.be.true,
        expect(evalExp('x != z', scope)).to.eventually.be.true,
        expect(evalExp('y == empty', scope)).to.eventually.be.true,
        expect(evalExp('z == empty', scope)).to.eventually.be.true,
        expect(evalExp('null == empty', scope)).to.eventually.be.true,
        expect(evalExp('undefined == empty', scope)).to.eventually.be.true,
        expect(evalExp('undefined == undefined', scope)).to.eventually.be.true,
        expect(evalExp('null == null', scope)).to.eventually.be.true,
        expect(evalExp('empty == empty', scope)).to.eventually.be.true,
        expect(evalExp('empty == blank', scope)).to.eventually.be.true,
      ]);
    })
  })

  describe('SafeObject', function() {
    it('should evaluate safe obejcts', function() {
      return Promise.all([
        expect(evalExp('safeObject_1_Val_A == safeObject_2_Val_B', scope)).to.eventually.be.false,
        expect(evalExp('safeObject_1_Val_A != safeObject_2_Val_B', scope)).to.eventually.be.true,
        expect(evalExp('safeObject_1_Val_A == safeObject_3_Val_A', scope)).to.eventually.be.true,
        expect(evalExp('safeObject_1_Val_A != safeObject_3_Val_A', scope)).to.eventually.be.false,
        expect(evalExp('safeObject_1_Val_A > safeObject_3_Val_A', scope)).to.eventually.be.false,
        expect(evalExp('safeObject_1_Val_A < safeObject_3_Val_A', scope)).to.eventually.be.false,
        expect(evalExp('safeObject_1_Val_A >= safeObject_3_Val_A', scope)).to.eventually.be.true,
        expect(evalExp('safeObject_1_Val_A <= safeObject_3_Val_A', scope)).to.eventually.be.true,
        expect(evalExp('safeObject_1_Val_A and safeObject_2_Val_B', scope)).to.eventually.be.true,
        expect(evalExp('safeObject_1_Val_A or safeObject_2_Val_B', scope)).to.eventually.be.true,
        expect(evalExp('safeObject_1_Val_A contains safeObject_3_Val_A', scope)).to.eventually.be.true,
      ]);
    });
  });
})
