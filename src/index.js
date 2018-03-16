const Scope = require('./scope')
const _ = require('./util/underscore.js')
const assert = require('./util/assert.js')
const tokenizer = require('./tokenizer.js')
const statFileAsync = require('./util/fs.js').statFileAsync
const readFileAsync = require('./util/fs.js').readFileAsync
const path = require('path')
const url = require('./util/url.js')
const Render = require('./render.js')
const lexical = require('./lexical.js')
const Tag = require('./tag.js')
const Filter = require('./filter.js')
const Parser = require('./parser')
const Syntax = require('./syntax.js')
const tags = require('./tags')
const filters = require('./filters')
const Locale = require('./locale')
const anySeries = require('./util/promise.js').anySeries
const Errors = require('./util/error.js')

var _engine = {
  init: function (tag, filter, options) {
    if (options.cache) {
      this.cache = {}
    }
    this.options = options
    this.tag = tag
    this.filter = filter
    this.parser = Parser(tag, filter)
    this.renderer = Render()

    tags(this)
    filters(this)

    return this
  },
  loadTranslation: function(translation, id) {
    this.options.locale = new Locale(translation, id);
  },
  parse: function (html, filepath) {
    var tokens = tokenizer.parse(html, filepath, this.options)
    return this.parser.parse(tokens)
  },
  render: function (tpl, ctx, opts) {
    opts = _.assign({}, this.options, opts)
    var scope = Scope.factory(ctx, opts)
    return this.renderer.renderTemplates(tpl, scope)
  },
  parseAndRender: function (html, ctx, opts) {
    return Promise.resolve()
      .then(() => this.parse(html))
      .then(tpl => this.render(tpl, ctx, opts))
  },
  renderFile: function (filepath, ctx, opts) {
    opts = _.assign({}, opts)
    return this.getTemplate(filepath, opts.root)
      .then(templates => this.render(templates, ctx, opts))
  },
  evalValue: function (str, scope) {
    var tpl = this.parser.parseValue(str.trim())
    return this.renderer.evalValue(tpl, scope)
  },
  registerFilter: function (name, filter) {
    return this.filter.register(name, filter)
  },
  registerTag: function (name, tag) {
    return this.tag.register(name, tag)
  },
  lookup: function (filepath, root) {
    root = this.options.root.concat(root || [])
    root = _.uniq(root)
    var paths = root.map(root => path.resolve(root, filepath))
    return anySeries(paths, path => statFileAsync(path).then(() => path))
      .catch((e) => {
        e.message = `${e.code}: Failed to lookup ${filepath} in: ${root}`
        throw e
      })
  },
  getTemplate: function (filepath, root) {
    if (this.options.templateProvider) {
      return this.options.templateProvider(filepath).then(str => {
        let tpl = this.parse(str);
        if (this.options.cache) {
          this.cache[filepath] = tpl; 
        }
        return tpl;
      });
    }
    else {
      return typeof XMLHttpRequest === 'undefined'
        ? this.getTemplateFromFile(filepath, root)
        : this.getTemplateFromUrl(filepath, root);
    }
  },
  getTemplateFromFile: function (filepath, root) {
    if (!path.extname(filepath)) {
      filepath += this.options.extname
    }
    return this
      .lookup(filepath, root)
      .then(filepath => {
        if (this.options.cache) {
          var tpl = this.cache[filepath]
          if (tpl) {
            return Promise.resolve(tpl)
          }
          return readFileAsync(filepath)
            .then(str => this.parse(str))
            .then(tpl => (this.cache[filepath] = tpl))
        } else {
          return readFileAsync(filepath)
            .then(str => this.parse(str, filepath))
        }
      })
  },
  getTemplateFromUrl: function (filepath, root) {
    var fullUrl
    if (url.valid(filepath)) {
      fullUrl = filepath
    } else {
      if (!url.extname(filepath)) {
        filepath += this.options.extname
      }
      fullUrl = url.resolve(root || this.options.root, filepath)
    }
    if (this.options.cache) {
      var tpl = this.cache[filepath]
      if (tpl) {
        return Promise.resolve(tpl)
      }
    }
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest()
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          var tpl = this.parse(xhr.responseText)
          if (this.options.cache) {
            this.cache[filepath] = tpl
          }
          resolve(tpl)
        } else {
          reject(new Error(xhr.statusText))
        }
      }
      xhr.onerror = () => {
        reject(new Error('An error occurred whilst sending the response.'))
      }
      xhr.open('GET', fullUrl)
      xhr.send()
    })
  },
  express: function (opts) {
    opts = opts || {}
    var self = this
    return function (filePath, ctx, callback) {
      assert(Array.isArray(this.root) || _.isString(this.root),
        'illegal views root, are you using express.js?')
      opts.root = this.root
      self.renderFile(filePath, ctx, opts)
        .then(html => callback(null, html))
        .catch(e => callback(e))
    }
  }
}

function factory (options) {
  options = _.assign({
    root: ['.'],
    cache: false,
    extname: '',
    dynamicPartials: true,
    trim_tag_right: false,
    trim_tag_left: false,
    trim_value_right: false,
    trim_value_left: false,
    greedy: true,
    strict_filters: false,
    strict_variables: false,
    templateProvider: null,
    locale: null,
  }, options)
  options.root = normalizeStringArray(options.root)

  var engine = Object.create(_engine)
  engine.init(Tag(), Filter(options), options)
  return engine
}

function normalizeStringArray (value) {
  if (Array.isArray(value)) return value
  if (_.isString(value)) return [value]
  return []
}

factory.lexical = lexical
factory.isTruthy = Syntax.isTruthy
factory.isFalsy = Syntax.isFalsy
factory.evalExp = Syntax.evalExp
factory.evalValue = Syntax.evalValue
factory.Types = {
  ParseError: Errors.ParseError,
  TokenizationEroor: Errors.TokenizationError,
  RenderBreakError: Errors.RenderBreakError,
  AssertionError: Errors.AssertionError
}
factory.Locale = Locale;

module.exports = factory
