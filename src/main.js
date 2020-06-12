import { createScope } from './scope';
import * as _ from './util/underscore.js';
import strftime from './util/strftime.js';
import assert from './util/assert.js';
import { parse } from './tokenizer.js';
import { statFileAsync, readFileAsync } from './util/fs.js';
import path from 'path';
import Render from './render.js';
import Tag from './tag.js';
import Filter from './filter.js';
import Parser from './parser';
import tags from './tags';
import filters from './filters';
import Locale from './locale';
import { anySeries } from './util/promise.js';

import * as Syntax from './syntax.js';
import * as Errors from './util/error.js';
import * as lexical from './lexical.js';

import { argsToObject } from './util/args.js';
import SafeObject from './safe-object.js';

export {
  Locale,
  lexical,
  Syntax,
  Errors,
  argsToObject,
  SafeObject,
  strftime };

var _engine = {
  init: function (tag, filter, options) {
    if (options.cache) {
      this.cache = {};
    }
    this.options = options;
    this.tag = tag;
    this.filter = filter;
    this.parser = Parser(tag, filter);
    this.renderer = Render();

    tags(this);
    filters(this);

    return this;
  },
  loadTranslation: function (translation, id, defaultLocale = null) {
    this.options.locale = new Locale(translation, id);
    if (null !== defaultLocale && !(defaultLocale instanceof Locale)) {
      throw new Error('defaultLocale must be null or instance of Locale');
    }
    this.options.defaultLocale = defaultLocale;
  },
  tokenize: function (html, filepath) {
    var tokens = parse(html, filepath, this.options);
    return tokens;
  },
  parse: function (html, filepath) {
    var tokens = this.tokenize(html, filepath);
    return this.parser.parse(tokens);
  },
  render: function (tpl, ctx, opts) {
    opts = _.assign({}, this.options, opts);
    var scope = createScope(ctx, opts);
    return this.renderer.renderTemplates(tpl, scope);
  },
  parseAndRender: function (html, ctx, opts) {
    return Promise.resolve()
      .then(() => this.parse(html))
      .then(tpl => this.render(tpl, ctx, opts));
  },
  renderFile: function (filepath, ctx, opts) {
    opts = _.assign({}, opts);
    return this.getTemplate(filepath, opts.root)
      .then(templates => this.render(templates, ctx, opts));
  },
  evalValue: function (str, scope) {
    var tpl = this.parser.parseValue(str.trim());
    return this.renderer.evalValue(tpl, scope);
  },
  registerFilter: function (name, filter) {
    return this.filter.register(name, filter);
  },
  registerTag: function (name, tag) {
    return this.tag.register(name, tag);
  },
  lookup: function (filepath, root) {
    root = this.options.root.concat(root || []);
    root = _.uniq(root);
    var paths = root.map(root => path.resolve(root, filepath));
    return anySeries(paths, path => statFileAsync(path).then(() => path))
      .catch((e) => {
        e.message = `${e.code}: Failed to lookup ${filepath} in: ${root}`;
        throw e;
      });
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
    } else {
      return this.getTemplateFromFile(filepath, root);
    }
  },
  getTemplateFromFile: function (filepath, root) {
    if (!path.extname(filepath)) {
      filepath += this.options.extname;
    }
    return this
      .lookup(filepath, root)
      .then(filepath => {
        if (this.options.cache) {
          var tpl = this.cache[filepath];
          if (tpl) {
            return Promise.resolve(tpl);
          }
          return readFileAsync(filepath)
            .then(str => this.parse(str))
            .then(tpl => (this.cache[filepath] = tpl));
        } else {
          return readFileAsync(filepath)
            .then(str => this.parse(str, filepath));
        }
      });
  },
  express: function (opts) {
    opts = opts || {};
    var self = this;
    return function (filePath, ctx, callback) {
      assert(Array.isArray(this.root) || _.isString(this.root),
        'illegal views root, are you using express.js?');
      opts.root = this.root;
      self.renderFile(filePath, ctx, opts)
        .then(html => callback(null, html))
        .catch(e => callback(e));
    };
  }
};

function normalizeStringArray (value) {
  if (Array.isArray(value)) return value;
  if (_.isString(value)) return [value];
  return [];
}

export function createEngine (options) {
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
    beforeScopeProvides: null,
    locale: null,
    defaultLocale: null,
  }, options);
  options.root = normalizeStringArray(options.root);

  var engine = Object.create(_engine);
  engine.init(Tag(), Filter(options), options);
  return engine;
}
