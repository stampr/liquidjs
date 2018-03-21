const chai = require('chai')
const expect = chai.expect
const mock = require('mock-fs')
const Liquid = require('../../src/main.js').default;
chai.use(require('chai-as-promised'))

describe('cache options', function () {
  var engine
  beforeEach(function () {
    engine = Liquid({
      root: '/root/',
      extname: '.html'
    })
    mock({ '/root/files/foo.html': 'foo' })
  })
  afterEach(function () {
    mock.restore()
  })
  it('should be disabled by default', function () {
    return engine.renderFile('files/foo')
      .then(x => expect(x).to.equal('foo'))
      .then(() => mock({
        '/root/files/foo.html': 'bar'
      }))
      .then(() => engine.renderFile('files/foo'))
      .then(x => expect(x).to.equal('bar'))
  })
  it('should respect cache=true option', function () {
    engine = Liquid({
      root: '/root/',
      extname: '.html',
      cache: true
    })
    return engine.renderFile('files/foo')
      .then(x => expect(x).to.equal('foo'))
      .then(() => mock({
        '/root/files/foo.html': 'bar'
      }))
      .then(() => engine.renderFile('files/foo'))
      .then(x => expect(x).to.equal('foo'))
  })
})
