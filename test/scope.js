const chai = require('chai');
const expect = chai.expect;
const AssertionError = require('../src/util/error.js').AssertionError;
chai.use(require('chai-as-promised'));

var Scope = require('../src/scope.js');

const createScope = Scope.createScope;

describe('scope', function () {
  var scope, ctx;
  beforeEach(function () {
    ctx = {
      foo: 'zoo',
      bar: {
        zoo: 'coo',
        'Mr.Smith': 'John',
        arr: ['a', 'b']
      },
      promise_parent: new Promise(resolve => process.nextTick(() => resolve({
        promise_child: new Promise(resolve => process.nextTick(() => resolve({
          id: 'hello',
          value: 'zoo',
        })))
      })))
    };
    scope = createScope(ctx);
  });

  describe('#isVariableValid()', function () {
    expect(Scope.isVariableValid('ok')).to.be.true;
    Scope.forbidden.forEach(forbiddenVariable => {
      expect(Scope.isVariableValid(forbiddenVariable)).to.be.false;
    });
  });

  describe('#validateContextObject()', function () {
    let test = createScope({});
    expect(() => test.push({ ok: true })).to.not.throw();
    expect(() => test.push({ empty: true })).to.throw(/invalid context variable name/);
  });

  describe('#propertyAccessSeq()', function () {
    it('should handle top-level access', function () {
      return expect(scope.propertyAccessSeq('foo'))
        .to.eventually.deep.equal([ 'foo' ]);
    });
    it('should handle dot syntax', function () {
      return expect(scope.propertyAccessSeq('foo.bar'))
        .to.eventually.deep.equal(['foo', 'bar']);
    });
    it('should handle [<String>] syntax', function () {
      return expect(scope.propertyAccessSeq('foo["bar"]'))
        .to.eventually.deep.equal(['foo', 'bar']);
    });
    it('should handle [<Identifier>] syntax', function () {
      return expect(scope.propertyAccessSeq('foo[foo]'))
        .to.eventually.deep.equal(['foo', 'zoo']);
    });
    it('should handle nested access 1', function () {
      return expect(scope.propertyAccessSeq('foo[bar.zoo]'))
        .to.eventually.deep.equal(['foo', 'coo']);
    });
    it('should handle nested access 2', function () {
      return expect(scope.propertyAccessSeq('foo[bar["zoo"]]'))
        .to.eventually.deep.equal(['foo', 'coo']);
    });
    it('should handle nested access 3', function () {
      return expect(scope.propertyAccessSeq('bar["foo"].zoo'))
        .to.eventually.deep.equal(['bar', 'foo', 'zoo']);
    });
    it('should handle nested access 4', function () {
      return expect(scope.propertyAccessSeq('foo[0].bar'))
        .to.eventually.deep.equal(['foo', '0', 'bar']);
    });
  });

  describe('#get()', function () {
    it('should get direct property', function () {
      return expect(scope.get('foo')).to.eventually.equal('zoo');
    });

    it('should get undefined property', function () {
      return Promise.all([
        expect(scope.get('notdefined')).to.eventually.equal(undefined),
        expect(scope.get('')).to.eventually.equal(undefined),
        expect(scope.get(false)).to.eventually.equal(undefined)
      ]);
    });

    it('should throw when [] unbalanced', function () {
      let testValue = 'foo[bar';
      let expectedErrorMessage = /unbalanced \[\]/;
      return expect(scope.get(testValue)).to.eventually.be.rejectedWith(AssertionError, expectedErrorMessage);
    });

    it('should throw when "" unbalanced', function () {
      let testValue = 'foo["bar]';
      let expectedErrorMessage = /unbalanced "/;
      return expect(scope.get(testValue)).to.eventually.be.rejectedWith(AssertionError, expectedErrorMessage);
    });

    it('should throw when \'\' unbalanced', function () {
      let testValue = `foo['bar]`;
      let expectedErrorMessage = /unbalanced '/;
      return expect(scope.get(testValue)).to.eventually.be.rejectedWith(AssertionError, expectedErrorMessage);
    });

    it('should access child property via dot syntax', function () {
      return Promise.all([
        expect(scope.get('bar.zoo')).to.eventually.equal('coo'),
        expect(scope.get('bar.arr')).to.eventually.deep.equal(['a', 'b'])
      ]);
    });

    it('should access child property via [<String>] syntax', function () {
      return expect(scope.get('bar["zoo"]')).to.eventually.equal('coo');
    });

    it('should access child property via [<Number>] syntax', function () {
      return expect(scope.get('bar.arr[0]')).to.eventually.equal('a');
    });

    it('should access child property via [<Identifier>] syntax', function () {
      return expect(scope.get('bar[foo]')).to.eventually.equal('coo');
    });

    it('should return undefined when not exist', function () {
      return expect(scope.get('foo.foo.foo')).to.eventually.be.undefined;
    });

    it('should work with promises at any depth', async () => {
      await expect(scope.get('promise_parent.promise_child.id')).to.eventually.equal('hello');
    });

    it('should work with resolved promise as input to another property', async () => {
      await expect(scope.get('bar[promise_parent.promise_child.value]')).to.eventually.equal('coo');
    });
  });

  describe('#set', function () {
    it('should set nested value', function () {
      scope.set('posts', {
        'first': {
          'name': 'A Nice Day'
        }
      });
      scope.set('category', {
        'diary': ['first']
      });
      return expect(scope.get('posts[category.diary[0]].name')).to.eventually.equal('A Nice Day');
    });

    it('should create in parent scope if needed', function () {
      scope.push({});
      scope.set('bar.coo', 'COO');
      return expect(scope.get('bar.coo')).to.eventually.equal('COO');
    });
    it('should keep other properties of parent', function () {
      scope.push({obj: {foo: 'FOO'}});
      scope.set('obj.bar', 'BAR');
      return expect(scope.get('obj.foo')).to.eventually.equal('FOO');
    });
    it('should abort if property cannot be set', function () {
      scope.push({obj: {foo: 'FOO'}});
      scope.set('obj.foo.bar', 'BAR');
      return expect(scope.get('obj.foo')).to.eventually.equal('FOO');
    });
    it('should set parents\' corresponding value', function () {
      scope.push({});
      scope.set('foo', 'bar');
      scope.pop();
      return expect(scope.get('foo')).to.eventually.equal('bar');
    });
  });
  describe('strict_variables', function () {
    var scope;
    beforeEach(function () {
      scope = createScope(ctx, {
        strict_variables: true
      });
    });
    it('should throw when variable not defined', function () {
      return expect(scope.get('notdefined')).to.eventually.be.rejectedWith(TypeError, /undefined variable: "notdefined"/);
    });
    it('should throw when deep variable not exist', function () {
      scope.set('foo', 'bar');
      return expect(scope.get('foo.bar.not.defined')).to.eventually.be.rejectedWith(TypeError, /undefined variable: "not"/);
    });
    it('should find variable in parent scope', function () {
      scope.set('foo', 'foo');
      scope.push({
        'bar': 'bar'
      });
      return expect(scope.get('foo')).to.eventually.equal('foo');
    });
  });

  describe('.getAll()', function () {
    it('should get all properties when arguments empty', function () {
      expect(scope.getAll()).deep.equal(ctx);
    });
  });

  describe('.push()', function () {
    it('should throw when trying to push non-object', function () {
      expect(function () {
        scope.push(false);
      }).to.throw();
    });
    it('should push scope', function () {
      scope.set('bar', 'bar');
      scope.push({
        foo: 'foo'
      });
      return Promise.all([
        expect(scope.get('foo')).to.eventually.equal('foo'),
        expect(scope.get('bar')).to.eventually.equal('bar')
      ]);
    });
    it('should hide deep properties by push', function () {
      scope.set('bar', {bar: 'bar'});
      scope.push({bar: {foo: 'foo'}});
      return Promise.all([
        expect(scope.get('bar.foo')).to.eventually.equal('foo'),
        expect(scope.get('bar.bar')).to.eventually.equal(undefined)
      ]);
    });
  });
  describe('.pop()', function () {
    it('should pop scope', function () {
      scope.push({
        foo: 'foo'
      });
      scope.pop();
      return expect(scope.get('foo')).to.eventually.equal('zoo');
    });
  });

  describe('.unshift()', function () {
    it('should throw when trying to unshift non-object', function () {
      expect(function () {
        scope.unshift(false);
      }).to.throw();
    });
    it('should unshift scope', function () {
      scope.unshift({
        foo: 'blue',
        foo1: 'foo1'
      });
      return Promise.all([
        expect(scope.get('foo')).to.eventually.equal('zoo'),
        expect(scope.get('foo1')).to.eventually.equal('foo1')
      ]);
    });
  });
  describe('.shift()', function () {
    it('should shift scope', function () {
      scope.unshift({
        foo: 'blue',
        foo1: 'foo1'
      });
      scope.shift();
      return Promise.all([
        expect(scope.get('foo')).to.eventually.equal('zoo'),
        expect(scope.get('foo1')).to.eventually.equal(undefined)
      ]);
    });
  });
});
