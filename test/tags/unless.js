const Liquid = require('../../src/main.js').createEngine;
const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-as-promised'));

describe('tags/unless', function () {
  var liquid = Liquid();

  it('should render else when predicate yields true', function () {
    // 0 is truthy
    var src = '{% unless 0 %}yes{%else%}no{%endunless%}';
    return expect(liquid.parseAndRender(src))
      .to.eventually.equal('no');
  });
  it('should render unless when predicate yields false', function () {
    var src = '{% unless false %}yes{%else%}no{%endunless%}';
    return expect(liquid.parseAndRender(src))
      .to.eventually.equal('yes');
  });
  it('should reject when tag not closed', function () {
    var src = '{% unless 1>2 %}yes';
    return expect(liquid.parseAndRender(src))
      .to.be.rejectedWith(/tag {% unless 1>2 %} not closed/);
  });
  it('should render unless when predicate yields false and else undefined', function () {
    var src = '{% unless 1>2 %}yes{%endunless%}';
    return expect(liquid.parseAndRender(src))
      .to.eventually.equal('yes');
  });
  it('should render "" when predicate yields false and else undefined', function () {
    var src = '{% unless 1<2 %}yes{%endunless%}';
    return expect(liquid.parseAndRender(src))
      .to.eventually.equal('');
  });
  it('should handle an undefined deep object reference equals blank', function () {
    var src = '{% unless something.deep.undefined.here == blank %}yes{%endunless%}';
    return expect(liquid.parseAndRender(src))
      .to.eventually.equal('');
  });
  it('should handle an undefined deep object reference equals blank', function () {
    var src = '{% unless something.deep.undefined.here != blank %}yes{%endunless%}';
    return expect(liquid.parseAndRender(src))
      .to.eventually.equal('yes');
  });
  it('should not get tripped up by tag hash parsing (regression test)', async () => {
    // this breaks after adding commands to hash
    const src = '{% unless variant[other_options[0]] == current_variant[other_options[0]] %}yes{%endunless%}';
    // this should not throw
    const result = await liquid.parseAndRender(src, {
      other_options: [], // doesn't matter
      variant: {},
      current_variant: {}
    });
    expect(result).to.equal('yes');
  });
});
