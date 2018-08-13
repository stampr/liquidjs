import sortBy from 'lodash.sortby';
import uniq from 'lodash.uniq';

import strftime from './util/strftime.js';
import * as _ from './util/underscore.js';
import { argsToObject } from './util/args.js';
import { isTruthy } from './syntax.js';
import Locale from './locale.js';

const LOCALE_SCOPE_KEY = Locale.LOCALE_SCOPE_KEY;

var escapeMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&#34;',
  "'": '&#39;'
}
var unescapeMap = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&#34;': '"',
  '&#39;': "'"
}

var createFilters = liquid => {
  let filters = {
    'abs': v => Math.abs(v),
    'append': (v, arg) => stringify(v) + arg,
    'capitalize': str => stringify(str).charAt(0).toUpperCase() + str.slice(1),
    'ceil': v => Math.ceil(v),
    'concat': (v, arg) => Array.prototype.concat.call(toCollection(v), arg),
    'date': (v, arg) => {
      var date = v
      if (v === 'now') {
        date = new Date()
      } else if (_.isString(v)) {
        date = new Date(v)
      }
      return isValidDate(date) ? strftime(date, arg) : v
    },
    'default': (v, arg) => isTruthy(v) ? v : arg,
    'divided_by': (v, arg) => Math.floor(v / arg),
    'downcase': v => stringify(v).toLowerCase(),
    'escape': escape,

    'escape_once': str => escape(unescape(str)),
    'first': v => toCollection(v)[0],
    'floor': v => Math.floor(v),
    'join': (v, arg) => toCollection(v).join(arg),
    'last': v => {
      const collection = toCollection(v);
      return stringify(collection[collection.length - 1]);
    },
    'lstrip': v => stringify(v).replace(/^\s+/, ''),
    'map': (arr, arg) => toCollection(arr).map(v => v[arg]),
    'minus': bindFixed((v, arg) => v - arg),
    'modulo': bindFixed((v, arg) => v % arg),
    'newline_to_br': v => stringify(v).replace(/\n/g, '<br />'),
    'plus': bindFixed((v, arg) => Number(v) + Number(arg)),
    'prepend': (v, arg) => arg + stringify(v),
    'remove': (v, arg) => stringify(v).split(arg).join(''),
    'remove_first': (v, l) => stringify(v).replace(l, ''),
    'replace': (v, pattern, replacement) =>
      stringify(v).split(pattern).join(replacement),
    'replace_first': (v, arg1, arg2) => stringify(v).replace(arg1, arg2),
    'reverse': v => toCollection(v).reverse(),
    'round': (v, arg) => {
      var amp = Math.pow(10, arg || 0)
      return Math.round(v * amp, arg) / amp
    },
    'rstrip': str => stringify(str).replace(/\s+$/, ''),
    'size': v => {
      if (typeof v === 'string') {
        return v.length;
      }
      else if (typeof v === 'object') {
        return toCollection(v).length;
      }
      else {
        return 0;
      }
    },
    'slice': (v, begin, length) =>
      stringify(v).substr(begin, length === undefined ? 1 : length),
    'sort': (v, property) => {
      const collection = toCollection(v);
      if (property) {
        return sortBy(collection, property);
      }
      else {
        return collection.sort();
      }
    },
    'split': (v, arg) => stringify(v).split(arg),
    'strip': (v) => stringify(v).trim(),
    'strip_html': v => stringify(v).replace(/<\/?\s*\w+\s*\/?>/g, ''),
    'strip_newlines': v => stringify(v).replace(/\n/g, ''),
    'times': (v, arg) => v * arg,
    'truncate': (v, l, o) => {
      v = stringify(v)
      o = (o === undefined) ? '...' : o
      l = l || 16
      if (v.length <= l) return v
      return v.substr(0, l - o.length) + o
    },
    'truncatewords': (v, l, o) => {
      if (o === undefined) o = '...'
      var arr = stringify(v).split(' ')
      var ret = arr.slice(0, l).join(' ')
      if (arr.length > l) ret += o
      return ret
    },
    'uniq': v => uniq(toCollection(v)),
    'upcase': str => stringify(str).toUpperCase(),
    'url_encode': v => encodeURIComponent(stringify(v)),
    'translate': function() {
      let scope   = this;
      let args    = Array.from(arguments);
      let v       = args.shift();
      let context = argsToObject(args);
      return scope.get(LOCALE_SCOPE_KEY).then(scopeLocales => {
        let locales = [];
        if (scopeLocales && scopeLocales.length > 0) {
          if (!Array.isArray(scopeLocales)) {
            throw new Error(`scope locales must be array; "${typeof scopeLocales}" provided`);
          }
          locales.push.apply(locales, scopeLocales);
        }
        if (liquid.options.locale) { // add/check last
          locales.push(liquid.options.locale);
        }
        if (locales.length) {
          for (let i=0; i < locales.length; i++) {
            let locale = locales[i];
            let translation;
            try {
              translation = locale.translate(v);
            }
            catch (err) {
              if (err.message.indexOf('invalid translation key') > -1) {
                continue; // not found.  try next locale
              }
              else {
                throw err;
              }
            }
            let countExists   = 'count' in context;
            let notNull       = null !== translation && undefined !== translation;
            let typeIsObject  = typeof translation === 'object';
            if (countExists && notNull && typeIsObject) {
              let { count } = context;
              if (count === undefined) count = 0;
              if (count === 0) {
                translation = translation.zero || translation.other;
              }
              else if (count === 1) {
                translation = translation.one || translation.other;
              }
              else if (count === 2) {
                translation = translation.two || translation.other;
              }
              else {
                translation = translation.other;
              }
            }
            return liquid.parseAndRender(translation, context);
          }
          // it wasn't found in any of the provided locales
          throw new Error(`invalid translation key: "${v}"; not found in any of the provided locales`);
        }
        else {
          return '';
        }
      });
    },
  };
  // alias
  filters.t = filters.translate;
  return filters;
};

function escape (str) {
  return stringify(str).replace(/&|<|>|"|'/g, m => escapeMap[m])
}

function unescape (str) {
  return stringify(str).replace(/&(amp|lt|gt|#34|#39);/g, m => unescapeMap[m])
}

function getFixed (v) {
  var p = (v + '').split('.')
  return (p.length > 1) ? p[1].length : 0
}

function getMaxFixed (l, r) {
  return Math.max(getFixed(l), getFixed(r))
}

function stringify (obj) {
  if (null === obj || undefined === obj || typeof obj === 'function') return '';
  return obj + ''
}

// in liquid, a collection can be both object[] and { handle: object, ... }
// this means when dealing with "arrays", we need to make sure things work as expected
function toCollection(v) {
  if (Array.isArray(v)) {
    return v;
  }
  else if (v && typeof v === 'object') {
    // return Object.values(v);
    return Object.keys(v).map(key => v[key]);
  }
  else {
    return [];
  }
}

function bindFixed (cb) {
  return (l, r) => {
    var f = getMaxFixed(l, r)
    return cb(l, r).toFixed(f)
  }
}

function registerAll (liquid) {
  let filters = createFilters(liquid);
  return _.forOwn(filters, (func, name) => liquid.registerFilter(name, func))
}

function isValidDate (date) {
  return date instanceof Date && !isNaN(date.getTime())
}

export default registerAll;
