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

  const __hash_args = [
    '"mixed"',
    'hashValues',
    // for compat, dupe values take last occurence
    'aa:"hmmm"', // so this should be ignored/overriden
    'aa:foo',
    'bb: arr[0]',
    'cc: 2.3',
    'dd:bar.coo',
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
      it('should resolve non-hash literal values as commands', function () {
        return tag.construct(token, []).render(scope, {})
          .then(() => expect(spy).to.have.been.calledWithMatch(scope, {
            _: [ 'mixed', [ 1, 'two', [ 'three' ] ] ],
          }))
      })
    })
  });
})
