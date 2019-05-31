const chai = require('chai');
const expect = chai.expect;
var syntax = require('../src/syntax.js');
var createScope = require('../src/scope.js').createScope;
var SafeObject = require('../src/safe-object.js').default;

chai.use(require('chai-as-promised'));

var evalExp = syntax.evalExp;
var evalValue = syntax.evalValue;
var isTruthy = syntax.isTruthy;

describe('expression', function () {
  var scope;

  beforeEach(function () {
    scope = createScope({
      size: 'hello:size',
      first: 'hello:first',
      last: 'hello:last',
      dotnotation: {
        size: 'hello:size',
        first: 'hello:first',
        last: 'hello:last'
      },
      dotnotation2: {
        arr: [
          {
            value: 'hello:first'
          },
          {
            value: 'hello:last'
          }
        ]
      },
      one: 1,
      two: 2,
      emptystr: '',
      emptyarr: [],
      emptyobj: {},
      nonemptyarr: ['hello', 'world'],
      nonemptyobj: {one: 'hello', two: 'world'},
      nonemptystr: '123',
      x: 'XXX',
      y: undefined,
      z: null,
      safeObject_1_Val_A: new SafeObject('a'),
      safeObject_2_Val_B: new SafeObject('b'),
      safeObject_3_Val_A: new SafeObject('a'),
      valueof_arr: [
        { valueOf () { return 'one'; } },
        { valueOf () { return 'two'; } },
        { valueOf () { return 'three'; } }
      ],
      valueof_arr_item: {
        valueOf () {
          return 'two';
        }
      },
      valueof_arr_item_negative: {
        valueOf () {
          return 'four';
        }
      },
      $something: 'dollar works',
      'something?': 'question mark works',
      'in?valid': 'nope',
    });
  });

  describe('.evalValue()', function () {
    it('should eval literals', async () => {
      expect(await evalValue('2.3')).to.equal(2.3);
      expect(await evalValue('"foo"')).to.equal('foo');
    });

    it('should work with dollar sign variables', async () => {
      expect(await evalValue('$something', scope)).to.equal('dollar works');
    });

    it('should work with question mark variables', async () => {
      expect(await evalValue('something?', scope)).to.equal('question mark works');
    });

    it('should not work with variables containing question mark inside', async () => {
      expect(await evalValue('in?valid', scope)).to.equal('in?valid'); // treated as literal
    });

    it('should eval variables', async () => {
      expect(await evalValue('23', scope)).to.equal(23);
      expect(await evalValue('one', scope)).to.equal(1);
      expect(await evalValue('x', scope)).to.equal('XXX');
    });

    // NOTE: this is different in compat mode vs. upstream liquidjs.  in upstream this throws
    it('should not throw if not valid', async () => {
      const result = await evalValue('===');
      expect(result).to.equal('===');
    });

    describe('dot notation methods', function () {
      describe('size', function () {
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
      describe('first', function () {
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
        it('should work anywhere in the object path', function () {
          return expect(evalValue('dotnotation2.arr.first.value', scope)).to.eventually.equal('hello:first');
        });
      });
      describe('last', function () {
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
        it('should work anywhere in the object path', function () {
          return expect(evalValue('dotnotation2.arr.last.value', scope)).to.eventually.equal('hello:last');
        });
      });
    });
  });

  describe('.isTruthy()', function () {
    it('should return truthy', () => {
      // Spec: https://shopify.github.io/liquid/basics/truthy-and-falsy/
      expect(isTruthy(true)).to.equal(true, `true`);
      expect(isTruthy(false)).to.equal(false, `false`);
      expect(isTruthy(null)).to.equal(false, `null`);
      expect(isTruthy('foo')).to.equal(true, `'foo'`);
      expect(isTruthy('')).to.equal(true, `''`);
      expect(isTruthy(0)).to.equal(true, `0`);
      expect(isTruthy(1)).to.equal(true, `1`);
      expect(isTruthy(1.1)).to.equal(true, `1.1`);
      expect(isTruthy([1])).to.equal(true, `[1]`);
      expect(isTruthy([])).to.equal(true, `[]`);
    });
  });

  describe('.evalExp()', function () {
    it('should throw when scope undefined', function () {
      expect(function () {
        evalExp('');
      }).to.throw(/scope undefined/);
    });

    it('should eval simple expression', async () => {
      expect(await evalExp('1<2', scope)).to.equal(true);
      expect(await evalExp('2<=2', scope)).to.equal(true);
      expect(await evalExp('one<=two', scope)).to.equal(true);
      expect(await evalExp('x contains "x"', scope)).to.equal(false);
      expect(await evalExp('x contains "X"', scope)).to.equal(true);
      expect(await evalExp('1 contains "x"', scope)).to.equal(false);
      expect(await evalExp('y contains "x"', scope)).to.equal(false);
      expect(await evalExp('z contains "x"', scope)).to.equal(false);
      expect(await evalExp('(1..5) contains 3', scope)).to.equal(true);
      expect(await evalExp('(1..5) contains 6', scope)).to.equal(false);
      expect(await evalExp('"<=" == "<="', scope)).to.equal(true);
    });

    it('should eval using valueOf', async () => {
      expect(await evalExp('valueof_arr contains valueof_arr_item', scope)).to.equal(true);
      expect(await evalExp('valueof_arr contains valueof_arr_item_negative', scope)).to.equal(false);
      expect(await evalExp('valueof_arr contains "two"', scope)).to.equal(true);
      expect(await evalExp('valueof_arr contains "four"', scope)).to.equal(false);
      expect(await evalExp('safeObject_1_Val_A == "a"', scope)).to.equal(true);
      expect(await evalExp('safeObject_1_Val_A == "b"', scope)).to.equal(false);
    });

    describe('complex expression', function () {
      it('should support value or value', function () {
        return expect(evalExp('false or true', scope)).to.eventually.equal(true);
      });
      it('should support < and contains', function () {
        return expect(evalExp('1<2 and x contains "x"', scope)).to.eventually.equal(false);
      });
      it('should support < or contains', function () {
        return expect(evalExp('1<2 or x contains "x"', scope)).to.eventually.equal(true);
      });
      it('should support value and !=', function () {
        return expect(evalExp('emptystr and emptystr != ""', scope)).to.eventually.equal(false);
      });
    });

    it('should eval range expression', async () => {
      expect(await evalExp('(2..4)', scope)).to.deep.equal([2, 3, 4]);
      expect(await evalExp('(two..4)', scope)).to.deep.equal([2, 3, 4]);
    });

    it('empty comparisons', async () => {
      expect(await evalExp('emptyarr == empty', scope)).to.equal(true, 'emptyarr == empty');
      expect(await evalExp('nonemptyarr == empty', scope)).to.equal(false, 'nonemptyarr == empty');
      expect(await evalExp('emptystr == empty', scope)).to.equal(true, 'emptystr == empty');
      expect(await evalExp('one != empty', scope)).to.equal(true, 'one != empty');
      expect(await evalExp('x != empty', scope)).to.equal(true, 'x != empty');
      expect(await evalExp('undefined == blank', scope)).to.equal(true, 'undefined == blank');
      expect(await evalExp('emptyarr == blank', scope)).to.equal(true, 'emptyarr == blank');
      expect(await evalExp('nonemptyarr == blank', scope)).to.equal(false, 'nonemptyarr == blank');
      expect(await evalExp('emptystr == blank', scope)).to.equal(true, 'emptystr == blank');
      expect(await evalExp('one != blank', scope)).to.equal(true, 'one != blank');
      expect(await evalExp('x != blank', scope)).to.equal(true, 'x != blank');
      expect(await evalExp('x != y', scope)).to.equal(true, 'x != y');
      expect(await evalExp('x != z', scope)).to.equal(true, 'x != z');
      expect(await evalExp('y == empty', scope)).to.equal(true, 'y == empty');
      expect(await evalExp('z == empty', scope)).to.equal(true, 'z == empty');
      expect(await evalExp('null == empty', scope)).to.equal(true, 'null == empty');
      expect(await evalExp('undefined == empty', scope)).to.equal(true, 'undefined == empty');
      expect(await evalExp('undefined == undefined', scope)).to.equal(true, 'undefined == undefined');
      expect(await evalExp('null == null', scope)).to.equal(true, 'null == null');
      expect(await evalExp('empty == empty', scope)).to.equal(true, 'empty == empty');
      expect(await evalExp('empty == blank', scope)).to.equal(true, 'empty == blank');
    });
  });

  describe('SafeObject', function () {
    it('should evaluate safe obejcts', async () => {
      expect(await evalExp('safeObject_1_Val_A == safeObject_2_Val_B', scope)).to.be.false;
      expect(await evalExp('safeObject_1_Val_A != safeObject_2_Val_B', scope)).to.be.true;
      expect(await evalExp('safeObject_1_Val_A == safeObject_3_Val_A', scope)).to.be.true;
      expect(await evalExp('safeObject_1_Val_A != safeObject_3_Val_A', scope)).to.be.false;
      expect(await evalExp('safeObject_1_Val_A > safeObject_3_Val_A', scope)).to.be.false;
      expect(await evalExp('safeObject_1_Val_A < safeObject_3_Val_A', scope)).to.be.false;
      expect(await evalExp('safeObject_1_Val_A >= safeObject_3_Val_A', scope)).to.be.true;
      expect(await evalExp('safeObject_1_Val_A <= safeObject_3_Val_A', scope)).to.be.true;
      expect(await evalExp('safeObject_1_Val_A and safeObject_2_Val_B', scope)).to.be.true;
      expect(await evalExp('safeObject_1_Val_A or safeObject_2_Val_B', scope)).to.be.true;
      expect(await evalExp('safeObject_1_Val_A contains safeObject_3_Val_A', scope)).to.be.true;
    });
  });
});
