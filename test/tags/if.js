const Liquid = require('../../src/main.js').default;
const chai = require('chai')
const expect = chai.expect
chai.use(require('chai-as-promised'))

describe('tags/if', function () {
  var liquid = Liquid()
  var ctx = {
    one: 1,
    two: 2,
    emptyString: '',
    emptyArray: []
  }

  it('should throw if not closed', function () {
    var src = '{% if false%}yes'
    return expect(liquid.parseAndRender(src, ctx))
      .to.be.rejectedWith(/tag {% if false%} not closed/)
  })
  it('should support nested', function () {
    var src = '{%if false%}{%if true%}{%else%}a{%endif%}{%endif%}'
    return expect(liquid.parseAndRender(src, ctx))
      .to.eventually.equal('')
  })

  describe('single value as condition', function () {
    it('should support boolean', function () {
      var src = '{% if false %}1{%elsif true%}2{%else%}3{%endif%}'
      return expect(liquid.parseAndRender(src, ctx))
        .to.eventually.equal('2')
    })
    it('should treat Array truthy', function () {
      var src = '{%if emptyArray%}a{%endif%}'
      return expect(liquid.parseAndRender(src, ctx))
        .to.eventually.equal('a')
    })
    it('should return false if empty string', function () {
      var src = '{%if emptyString%}a{% else %}b{%endif%}'
      return expect(liquid.parseAndRender(src, ctx))
        .to.eventually.equal('b');
    })
  })
  describe('expression as condition', function () {
    it('should support ==', function () {
      var src = '{% if 2==3 %}yes{%else%}no{%endif%}'
      return expect(liquid.parseAndRender(src, ctx))
        .to.eventually.equal('no')
    })
    it('should support >=', function () {
      var src = '{% if 1>=2 and one<two %}a{%endif%}'
      return expect(liquid.parseAndRender(src, ctx))
        .to.eventually.equal('')
    })
    it('should support !=', function () {
      var src = '{% if one!=two %}yes{%else%}no{%endif%}'
      return expect(liquid.parseAndRender(src, ctx))
        .to.eventually.equal('yes')
    })
    it('should support value and expression', function () {
      var src = `X{%if version and version != '' %}x{{version}}y{%endif%}Y`
      var ctx = { 'version': '' }
      return expect(liquid.parseAndRender(src, ctx))
        .to.eventually.equal('XY')
    })
  })
  describe('comparison to null', function () {
    it('should evaluate false for null < 10', function () {
      var src = '{% if null < 10 %}yes{% else %}no{% endif %}'
      return expect(liquid.parseAndRender(src, ctx))
        .to.eventually.equal('no')
    })

    it('should evaluate false for null > 10', function () {
      var src = '{% if null > 10 %}yes{% else %}no{% endif %}'
      return expect(liquid.parseAndRender(src, ctx))
        .to.eventually.equal('no')
    })

    it('should evaluate false for null <= 10', function () {
      var src = '{% if null <= 10 %}yes{% else %}no{% endif %}'
      return expect(liquid.parseAndRender(src, ctx))
        .to.eventually.equal('no')
    })

    it('should evaluate false for null >= 10', function () {
      var src = '{% if null >= 10 %}yes{% else %}no{% endif %}'
      return expect(liquid.parseAndRender(src, ctx))
        .to.eventually.equal('no')
    })

    it('should evaluate false for 10 < null', function () {
      var src = '{% if 10 < null %}yes{% else %}no{% endif %}'
      return expect(liquid.parseAndRender(src, ctx))
        .to.eventually.equal('no')
    })

    it('should evaluate false for 10 > null', function () {
      var src = '{% if 10 > null %}yes{% else %}no{% endif %}'
      return expect(liquid.parseAndRender(src, ctx))
        .to.eventually.equal('no')
    })

    it('should evaluate false for 10 <= null', function () {
      var src = '{% if 10 <= null %}yes{% else %}no{% endif %}'
      return expect(liquid.parseAndRender(src, ctx))
        .to.eventually.equal('no')
    })

    it('should evaluate false for 10 >= null', function () {
      var src = '{% if 10 >= null %}yes{% else %}no{% endif %}'
      return expect(liquid.parseAndRender(src, ctx))
        .to.eventually.equal('no')
    })
  })

  describe('comparison to empty', function () {
    it('should evaluate true for [] == empty', function () {
      var src = '{% if emptyArray == empty %}yes{% else %}no{% endif %}'
      return expect(liquid.parseAndRender(src, ctx)).to.eventually.equal('yes')
    });
    it('should evaluate true for [] == blank', function () {
      var src = '{% if emptyArray == blank %}yes{% else %}no{% endif %}'
      return expect(liquid.parseAndRender(src, ctx)).to.eventually.equal('yes')
    });
    it('should evaluate false for [] != empty', function () {
      var src = '{% if emptyArray != empty %}yes{% else %}no{% endif %}'
      return expect(liquid.parseAndRender(src, ctx)).to.eventually.equal('no')
    });
    it('should evaluate true for "" == empty', function () {
      var src = '{% if emptyString == empty %}yes{% else %}no{% endif %}'
      return expect(liquid.parseAndRender(src, ctx)).to.eventually.equal('yes')
    });
    it('should evaluate false for "" != empty', function () {
      var src = '{% if emptyString != empty %}yes{% else %}no{% endif %}'
      return expect(liquid.parseAndRender(src, ctx)).to.eventually.equal('no')
    });
  });
})
