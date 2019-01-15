const chai = require('chai')
const expect = chai.expect
const Liquid = require('../src/main.js').createEngine;
const mock = require('mock-fs')
chai.use(require('chai-as-promised'))

describe('liquid', function () {
  var engine, strictEngine, ctx
  beforeEach(function () {
    ctx = {
      name: 'harttle',
      arr: [-2, 'a'],
      obj: {
        foo: 'bar'
      }
    }
    engine = Liquid({
      root: '/root/',
      extname: '.html'
    })
    engine.registerFilter('_test_json', v => JSON.stringify(v));
    strictEngine = Liquid({
      root: '/root',
      extname: '.html',
      strict_filters: true
    })
    mock({
      '/root/files/bar': 'bar',
      '/root/files/foo.html': 'foo',
      '/root/files/name.html': 'My name is {{name}}.',
      '/un-readable.html': mock.file({
        mode: '0000'
      })
    })
  })
  afterEach(function () {
    mock.restore()
  })
  describe('Liquid', function () {
    it('should ignore invalid root option', function () {
      var liquid = Liquid({ root: /regex/ })
      expect(liquid.options.root).to.deep.equal([])
    })
  })
  describe('{{value}}', function () {
    it('should value object', function () {
      // return expect(engine.parseAndRender('{{obj}}', ctx)).to.eventually.equal('{"foo":"bar"}')
      // shopify liquid renders objects as empty strings.  or at least, that's what it seems since
      // it's not possible to create a non-shopify object in the theme.  TODO: dig through
      // shopify/liquid repo
      return expect(engine.parseAndRender('{{obj}}', ctx)).to.eventually.equal('')
    })
    it('should value array', function () {
      // arrays are rendered inline with no separation.  odd behavior, but the correct one
      // {% assign arr = "one,two,three" | split: "," %}
      // array: {{ arr }}
      // renders as: "onetwothree"
      // return expect(engine.parseAndRender('{{arr}}', ctx)).to.eventually.equal('[-2,"a"]')
      return expect(engine.parseAndRender('{{arr}}', ctx)).to.eventually.equal('-2a')
    })
    it('should value undefined to empty', function () {
      return expect(engine.parseAndRender('foo{{zzz}}bar', ctx)).to.eventually.equal('foobar')
    })
    it('should render as null when filter undefined', function () {
      return expect(engine.parseAndRender('{{"foo" | filter1}}', ctx)).to.eventually.equal('foo')
    })
    it('should throw upon undefined filter when strict_filters set', function () {
      return expect(strictEngine.parseAndRender('{{arr | filter1}}', ctx)).to
        .be.rejectedWith(/undefined filter: filter1/)
    })
  })
  it('should parse html', function () {
    expect(function () {
      engine.parse('{{obj}}')
    }).to.not.throw()
    expect(function () {
      engine.parse('<html><head>{{obj}}</head></html>')
    }).to.not.throw()
  })
  it('should render template multiple times', function () {
    var template = engine.parse('{{name}}')
    return engine.render(template, ctx)
      .then(result => expect(result).to.equal('harttle'))
      .then(() => engine.render(template, ctx))
      .then((result) => expect(result).to.equal('harttle'))
  })
  it('should render filters', function () {
    var template = engine.parse('<p>{{arr | join: "_"}}</p>')
    return expect(engine.render(template, ctx)).to.eventually.equal('<p>-2_a</p>')
  });
  it('should render filters', function () {
    var template = engine.parse('<p>{{arr | join: "_"}}</p>')
    return expect(engine.render(template, ctx)).to.eventually.equal('<p>-2_a</p>')
  });
  it('should pass arrays through to filters but render them with join(\'\')', async () => {
    const src = `{{ an_array }}:{{ an_array | _test_json }}`;
    const context = {
      an_array: [ 'a', 'b', 'c' ],
    };
    const result = await engine.parseAndRender(src, context);
    expect(result).to.equal('abc:["a","b","c"]');
  });
  it('should pass objects through to filters but render them with toString', async () => {
    const src = `{{ an_object.name }}:{{ an_object | _test_json }}:{{ an_object }}`;
    const context = {
      an_object: {
        name: 'my name',
        toString() {
          return 'my rendered value';
        }
      }
    };
    const result = await engine.parseAndRender(src, context);
    expect(result).to.equal('my name:{"name":"my name"}:my rendered value');
  });
  describe('#renderFile()', function () {
    it('should render file', function () {
      return expect(engine.renderFile('/root/files/foo.html', ctx))
        .to.eventually.equal('foo')
    })
    it('should find files without extname', function () {
      var engine = Liquid({root: '/root'})
      return expect(engine.renderFile('/root/files/bar', ctx))
        .to.eventually.equal('bar')
    })
    it('should accept relative path', function () {
      return expect(engine.renderFile('files/foo.html'))
        .to.eventually.equal('foo')
    })
    it('should resolve array as root', function () {
      engine = Liquid({
        root: ['/boo', '/root/'],
        extname: '.html'
      })
      return expect(engine.renderFile('files/foo.html'))
        .to.eventually.equal('foo')
    })
    it('should default root to cwd', function () {
      var files = {}
      files[process.cwd() + '/foo.html'] = 'FOO'
      mock(files)

      engine = Liquid({
        extname: '.html'
      })
      return expect(engine.renderFile('foo.html'))
        .to.eventually.equal('FOO')
    })
    it('should render file with context', function () {
      return expect(engine.renderFile('/root/files/name.html', ctx)).to.eventually.equal('My name is harttle.')
    })
    it('should use default extname', function () {
      return expect(engine.renderFile('files/name', ctx)).to.eventually.equal('My name is harttle.')
    })
    it('should throw with lookup list when file not exist', function () {
      engine = Liquid({
        root: ['/boo', '/root/'],
        extname: '.html'
      })
      return expect(engine.renderFile('/not/exist.html')).to
        .be.rejectedWith(/failed to lookup \/not\/exist.html in: \/boo,\/root\//i)
    })
    it('should throw when file not readable', function () {
      return expect(engine.renderFile('/un-readable.html')).to
        .be.rejectedWith(/EACCES/)
    })
  })
})
