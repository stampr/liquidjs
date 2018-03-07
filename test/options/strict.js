const chai = require('chai')
const expect = chai.expect
const Liquid = require('../..')
chai.use(require('chai-as-promised'))

describe('strict options', function () {
  var engine;
  var ctx = {
    kindaexists: { ido: 'hello' },
    promiseundefined: new Promise(resolve => resolve(undefined)),
    promiseundefineddeep: new Promise(resolve => resolve({ ido: 'hello' })),
  };
  beforeEach(function () {
    engine = Liquid({
      root:     '/root/',
      extname:  '.html',
    });
  });
  it('should not throw when strict_variables false (default)', function () {
    return expect(engine.parseAndRender('before{{notdefined}}after', ctx)).to
      .eventually.equal('beforeafter');
  });
  it('should not throw when strict_variables false on deep key', function () {
    return expect(engine.parseAndRender('{{kindaexists.ido}}before{{kindaexists.butidont}}after', ctx)).to
      .eventually.equal('hellobeforeafter');
  });
  it('should not throw when strict_variables false on promise undefined', function () {
    return expect(engine.parseAndRender('before{{promiseundefined}}after', ctx)).to
      .eventually.equal('beforeafter');
  });
  it('should not throw when strict_variables false on promise deep key', function () {
    return expect(engine.parseAndRender('{{promiseundefineddeep.ido}}before{{promiseundefineddeep.butidont}}after', ctx)).to
      .eventually.equal('hellobeforeafter');
  });
  it('should throw when strict_variables true', function () {
    var tpl = engine.parse('before{{notdefined}}after')
    var opts = {
      strict_variables: true
    }
    return expect(engine.render(tpl, ctx, opts)).to
      .be.rejectedWith(/undefined variable: "notdefined"/)
  });
  it('should pass strict_variables to render by parseAndRender', function () {
    var html = 'before{{notdefined}}after'
    var opts = {
      strict_variables: true
    }
    return expect(engine.parseAndRender(html, ctx, opts)).to
      .be.rejectedWith(/undefined variable: "notdefined"/)
  });
})
