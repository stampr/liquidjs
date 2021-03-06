const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
const sinonChai = require('sinon-chai');
const sinon = require('sinon');

chai.use(sinonChai);
chai.use(chaiAsPromised);

var tag = require('../src/tag.js').default();
var createScope = require('../src/scope.js').createScope;
var filter = require('../src/filter').default();
var Render = require('../src/render.js').default;
var Template = require('../src/parser.js').default(tag, filter);

describe('render', function () {
  var scope, render;

  beforeEach(function () {
    scope = createScope({
      foo: {
        bar: ['a', 2]
      },
      object_tostring: {
        name: 'Object with toString',
        toString () {
          return 'from object with toString';
        }
      },
      object_arr_tostring: [ 'a', 'b', 'c' ],
      object_no_tostring: {
        name: 'Object with no toString',
        valueOf () {
          return 'not a tostring so does not appear';
        }
      }
    });
    filter.clear();
    tag.clear();
    render = Render();
  });

  describe('.renderTemplates()', function () {
    it('should throw when scope undefined', function () {
      return expect(() => {
        render.renderTemplates([]);
      }).to.throw(/scope undefined/);
    });

    it('should render html', function () {
      return expect(render.renderTemplates([{type: 'html', value: '<p>'}], scope)).to.eventually.equal('<p>');
    });

    it('should render objects to string', async () => {
      // if object has a toString, it should be called
      // NOTE: by default, SafeObject::toString is an empty string ''
      const result1 = await render.renderTemplates([ Template.parseValue('object_tostring') ], scope);
      expect(result1).to.equal('from object with toString');
      // shopify arr toString joins arrays with an empty separator
      const result2 = await render.renderTemplates([ Template.parseValue('object_arr_tostring') ], scope);
      expect(result2).to.equal('abc');
      // shopify objects without a tostring render to an empty string
      const result3 = await render.renderTemplates([ Template.parseValue('object_no_tostring') ], scope);
      expect(result3).to.equal('');
    });

    it('should pass through full objects to filter', async () => {
      filter.register('testobject', v => JSON.stringify(v));
      const result = await render.renderTemplates([
        Template.parseValue('object_tostring | testobject')
      ], scope);
      expect(result).to.equal(`{"name":"Object with toString"}`);
    });
  });

  it('should eval filter with correct arguments', function () {
    var date = sinon.stub().returns('y');
    var time = sinon.spy();
    filter.register('date', date);
    filter.register('time', time);
    var tpl = Template.parseValue('foo.bar[0] | date: "b" | time:2');
    return render.evalValue(tpl, scope).then(() => {
      expect(date).to.have.been.calledWith('a', 'b');
      expect(time).to.have.been.calledWith('y', 2);
    });
  });

  describe('.evalValue()', function () {
    it('should throw when scope undefined', function () {
      expect(function () {
        render.evalValue();
      }).to.throw(/scope undefined/);
    });
    it('should eval value', function () {
      filter.register('date', (l, r) => l + r);
      filter.register('time', (l, r) => l + 3 * r);
      var tpl = Template.parseValue('foo.bar[0] | date: "b" | time:2');
      expect(render.evalValue(tpl, scope)).to.eventually.equal('ab6');
    });
    describe('promises', function () {
      it('should eval promise', function () {
        let resolvedScope = createScope({
          promise_value_resolved: new Promise(resolve => process.nextTick(() => resolve('resolved')))
        });
        filter.register('date', (l, r) => l + r);
        filter.register('time', (l, r) => l + 3 * r);
        var tpl = Template.parseValue('promise_value_resolved | date: "b" | time:2');
        return expect(render.evalValue(tpl, resolvedScope)).to.eventually.equal('resolvedb6');
      });
      it('should handle rejected promises', function () {
        let rejectedScope = createScope({
          promise_value_rejected: new Promise((resolve, reject) => process.nextTick(() => reject(new Error('promise_value_rejected'))))
        });
        var tpl = Template.parseValue('promise_value_rejected');
        expect(render.evalValue(tpl, rejectedScope)).to.be.rejectedWith(Error, 'promise_value_rejected');
      });
    });
  });
});
