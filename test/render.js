const chai = require('chai')
const Promise = require('any-promise')
const chaiAsPromised = require('chai-as-promised')
const expect = chai.expect
const sinonChai = require('sinon-chai')
const sinon = require('sinon')

chai.use(sinonChai)
chai.use(chaiAsPromised)

var tag = require('../src/tag.js')()
var Scope = require('../src/scope.js')
var filter = require('../src/filter')()
var Render = require('../src/render.js')
var Template = require('../src/parser.js')(tag, filter)

describe('render', function () {
  var scope, render

  beforeEach(function () {
    scope = Scope.factory({
      foo: {
        bar: ['a', 2]
      },
      promise_value_resolved: new Promise(resolve => process.nextTick(() => resolve('resolved'))),
      promise_value_rejected: new Promise((resolve, reject) => process.nextTick(() => reject(new Error('promise_value_rejected')))),
    })
    filter.clear()
    tag.clear()
    render = Render()
  })

  describe('.renderTemplates()', function () {
    it('should throw when scope undefined', function () {
      expect(function () {
        render.renderTemplates([])
      }).to.throw(/scope undefined/)
    })

    it('should render html', function () {
      return expect(render.renderTemplates([{type: 'html', value: '<p>'}], scope)).to.eventually.equal('<p>')
    })
  })

  it('should eval filter with correct arguments', function () {
    var date = sinon.stub().returns('y')
    var time = sinon.spy()
    filter.register('date', date)
    filter.register('time', time)
    var tpl = Template.parseValue('foo.bar[0] | date: "b" | time:2')
    render.evalValueSync(tpl, scope)
    expect(date).to.have.been.calledWith('a', 'b')
    expect(time).to.have.been.calledWith('y', 2)
  })

  describe('.evalValueSync()', function () {
    it('should throw when scope undefined', function () {
      expect(function () {
        render.evalValueSync()
      }).to.throw(/scope undefined/)
    })
    it('should eval value', function () {
      filter.register('date', (l, r) => l + r)
      filter.register('time', (l, r) => l + 3 * r)
      var tpl = Template.parseValue('foo.bar[0] | date: "b" | time:2')
      expect(render.evalValueSync(tpl, scope)).to.equal('ab6')
    })
  })

  describe('.evalValue()', function () {
    it('should throw when scope undefined', function () {
      expect(function () {
        render.evalValue()
      }).to.throw(/scope undefined/)
    })
    it('should eval value', function () {
      filter.register('date', (l, r) => l + r)
      filter.register('time', (l, r) => l + 3 * r)
      var tpl = Template.parseValue('foo.bar[0] | date: "b" | time:2')
      expect(render.evalValue(tpl, scope)).to.eventually.equal('ab6')
    })
    it('should eval promise', function () {
      filter.register('date', (l, r) => l + r)
      filter.register('time', (l, r) => l + 3 * r)
      var tpl = Template.parseValue('promise_value_resolved | date: "b" | time:2')
      return expect(render.evalValue(tpl, scope)).to.eventually.equal('resolvedb6')
    })
    it('should handle rejected promises', function () {
      var tpl = Template.parseValue('promise_value_rejected')
      expect(render.evalValue(tpl, scope)).to.be.rejectedWith(Error, 'promise_value_rejected')
    })
  })
})
