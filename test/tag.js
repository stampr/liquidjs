const chai = require('chai')
const sinon = require('sinon')
const expect = chai.expect
chai.use(require('sinon-chai'))

var tag = require('../src/tag.js').default()
var createScope = require('../src/scope.js').createScope

describe('tag', function () {
  var scope
  beforeEach(function () {
    scope = createScope({
      foo: 'bar',
      arr: [2, 1],
      bar: {
        coo: 'uoo'
      },
      hashValues: [ 1, 'two', [ 'three' ] ],
      // explicit value for hash expression tests below
      contains: undefined,
    })
    tag.clear()
  })

  it('should throw when not registered', function () {
    expect(function () {
      tag.construct({
        type: 'tag',
        value: 'foo',
        name: 'foo'
      }, [])
    }).to.throw(/tag foo not found/)
  })

  it('should register simple tag', function () {
    expect(function () {
      tag.register('foo', {
        render: x => 'bar'
      })
    }).not.throw()
  })

  it('should call tag.render', function () {
    var spy = sinon.spy()
    tag.register('foo', {
      render: spy
    })
    return tag
      .construct({
        type: 'tag',
        value: 'foo',
        name: 'foo'
      }, [])
      .render(scope, {})
      .then(() => expect(spy).to.have.been.called)
  })

  // NOTE: expressions are not supported.  but we want to make sure their existence doesn't break things
  const __hash_args = [
    '"mixed"',
    'hashValues',
    // for compat, dupe values take last occurence
    'aa:"hmmm"', // so this should be ignored/overriden
    'aa:foo',
    'bb: arr[0]',
    'cc: 2.3',
    'dd:bar.coo',
    'ee: (4..6)', // simple expression; hash
    '(1..3)', // simple expression; command
    'ff: (4..6) contains 5', // complex expression; hash
    '(1..3) contains 2', // complex expression; command
  ];
  [
    { label: 'hash (comma separated)', separator: ',' },
    { label: 'hash (space separated)', separator: ' ' },
    { label: 'hash (new line separated)', separator: '\n' },
    { label: 'hash (mixed separated)', separator: ', \n' },
  ].forEach(({ label, separator }) => {
    describe(label, function () {
      var spy, token
      beforeEach(function () {
        spy = sinon.spy()
        tag.register('foo', {
          render: spy
        })
        const args = __hash_args.join(separator);
        token = {
          type: 'tag',
          value: args,
          name: 'foo',
          args,
        }
      })
      it('should call tag.render with scope', function () {
        return tag.construct(token, []).render(scope, {})
          .then(() => expect(spy).to.have.been.calledWithMatch(scope))
      })
      it('should resolve identifier hash', function () {
        return tag.construct(token, []).render(scope, {})
          .then(() => expect(spy).to.have.been.calledWithMatch({}, {
            aa: 'bar'
          }))
      })
      it('should accept space between key/value', function () {
        return tag.construct(token, []).render(scope, {})
          .then(() => expect(spy).to.have.been.calledWithMatch({}, {
            bb: 2
          }))
      })
      it('should resolve number value hash', function () {
        return tag.construct(token, []).render(scope, {})
          .then(() => expect(spy).to.have.been.calledWithMatch(scope, {
            cc: 2.3
          }))
      })
      it('should resolve property access hash', function () {
        return tag.construct(token, []).render(scope, {})
          .then(() => expect(spy).to.have.been.calledWithMatch(scope, {
            dd: 'uoo'
          }))
      })
      it('should not break expressions', function () {
        return tag.construct(token, []).render(scope, {})
          .then(() => expect(spy).to.have.been.calledWithMatch(scope, {
            ee: '(4..6)',
          }))
      })
      it('should not break complex expressions', function () {
        return tag.construct(token, []).render(scope, {})
          .then(() => expect(spy).to.have.been.calledWithMatch(scope, {
            ff: '(4..6)',
          }))
      })
      it('should resolve non-hash literal values as commands, including resolving simple and complex expressions', function () {
        return tag.construct(token, []).render(scope, {})
          .then(() => expect(spy).to.have.been.calledWithMatch(scope, {
            _: [
              'mixed', // __hash_args[0]
              [ 1, 'two', [ 'three' ] ], // __hash_args[1]
              '(1..3)', // __hash_args (1..3)
              undefined, // because "(4..6) contains 5" is evaluated as (4..6) (literal), contains (variable), and 5 (literal).  and since contains is undefined
              5,
              '(1..3)', // __hash_args (1..3) contains 2
              undefined, // same as above for "contains"
              2,
            ],
          }))
      })
    })
  });
})
