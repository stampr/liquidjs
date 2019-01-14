const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const expect = chai.expect

chai.use(sinonChai)
chai.use(require('chai-as-promised'))

var filter = require('../src/filter.js').default()
var createScope = require('../src/scope.js').createScope

describe('filter', function () {
  var scope
  beforeEach(function () {
    filter.clear()
    scope = createScope()
  })
  it('should return default filter when not registered', function () {
    var result = filter.construct('foo')
    expect(result.name).to.equal('foo')
  })

  it('should throw when filter name illegal', function () {
    expect(function () {
      filter.construct('/')
    }).to.throw(/illegal filter/)
  })

  it('should parse argument syntax', function () {
    filter.register('foo', x => x)
    var f = filter.construct('foo: a, "b"')

    expect(f.name).to.equal('foo')
    expect(f.args).to.deep.equal(['a', '"b"'])
  })

  it('should register a simple filter', function () {
    filter.register('upcase', x => x.toUpperCase())
    return expect(filter.construct('upcase').render('foo', scope)).to.eventually.equal('FOO')
  })

  it('should register a argumented filter', function () {
    filter.register('add', (a, b) => a + b)
    return expect(filter.construct('add: 2').render(3, scope)).to.eventually.equal(5)
  })

  it('should register a multi-argumented filter', function () {
    filter.register('add', (a, b, c) => a + b + c)
    return expect(filter.construct('add: 2, "c"').render(3, scope)).to.eventually.equal('5c')
  })

  it('should call filter with correct arguments', function () {
    var spy = sinon.spy()
    filter.register('foo', spy)
    return filter.construct('foo: 33').render('foo', scope).then(() => {
      expect(spy).to.have.been.calledWith('foo', 33)
    })
  })

  it('should support arguments as named key/values', function () {
    filter.register('foo', x => x)
    var f = filter.construct('foo: key1: "literal1", key2: value2');
    expect(f.name).to.equal('foo')
    expect(f.args).to.deep.equal([ '\'key1\'', '"literal1"', '\'key2\'', 'value2' ]);
  })

  it('should support arguments as named key/values with inline literals', function () {
    filter.register('foo', x => x)
    var f = filter.construct('foo: "test0", key1: "literal1", key2: value2');
    expect(f.name).to.equal('foo')
    expect(f.args).to.deep.equal([ '"test0"', '\'key1\'', '"literal1"', '\'key2\'', 'value2' ]);
  })

  it('should support arguments as named key/values with inline values', function () {
    filter.register('foo', x => x)
    var f = filter.construct('foo: test0, key1: "literal1", key2: value2');
    expect(f.name).to.equal('foo')
    expect(f.args).to.deep.equal([ 'test0', '\'key1\'', '"literal1"', '\'key2\'', 'value2' ]);
  })


  it('should support argument values named same as keys', function () {
    filter.register('foo', x => x)
    var f = filter.construct('foo: a: a');
    expect(f.name).to.equal('foo')
    expect(f.args).to.deep.equal(['\'a\'', 'a'])
  })

  it('should support argument literals named same as keys', function () {
    filter.register('foo', x => x)
    var f = filter.construct('foo: a: "a"');
    expect(f.name).to.equal('foo')
    expect(f.args).to.deep.equal(['\'a\'', '"a"'])
  })
})
