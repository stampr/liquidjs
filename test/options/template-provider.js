const chai = require('chai')
const expect = chai.expect
const Liquid = require('../../src/main.js').createEngine;
chai.use(require('chai-as-promised'))

describe('template provider', function () {
  var engine;
  var ctx = {
    hello: ' and ',
  };
  before(function () {
    engine = Liquid({
      templateProvider(filepath) {
        return new Promise((resolve, reject) => {
          switch (filepath) {
            case 'simple':
              return resolve(`before{{hello}}after`);
            case 'nest':
              return resolve(`this is some content: {% include 'simple' %}`);
            default:
              return reject(new Error('invalid'));
          }
        });
      }
    });
  });
  it('should provide a template', function () {
    return expect(engine.getTemplate('simple').then(template => {
      return engine.render(template, ctx);
    })).to.eventually.equal('before and after');
  });
  it('should error if invalid template', function () {
    return expect(engine.getTemplate('not a template')).to.be.rejectedWith(/invalid/);
  });
  it('should work with partials', function () {
    return expect(engine.getTemplate('nest').then(template => {
      return engine.render(template, ctx);
    })).to.eventually.equal('this is some content: before and after');
  });
})
