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
  '\'': '&#39;'
};
var unescapeMap = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&#34;': '"',
  '&#39;': '\''
};

var createFilters = liquid => {
  let filters = {
    'abs': v => Math.abs(numberify(v)),
    'append': (v, arg) => stringify(v) + arg,
    'capitalize': str => stringify(str).charAt(0).toUpperCase() + str.slice(1),
    'ceil': v => Math.ceil(v),
    'concat': (v, arg) => Array.prototype.concat.call(toCollection(v), arg),
    compact: v => !Array.isArray(v) ? null : v.filter(v => v !== null && v !== undefined),
    'date': (v, arg) => {
      var date = v;
      if (v === 'now') {
        date = new Date();
      } else if (_.isString(v)) {
        try {
          date = new Date(v);
        }
        catch (err) {
          date = null;
        }
      }
      return isValidDate(date) ? strftime(date, arg) : v;
    },
    'default': (v, arg) => isTruthy(v) ? v : arg,
    'divided_by': (v, arg) => Math.floor(numberify(v) / numberify(arg)),
    'downcase': v => stringify(v).toLowerCase(),
    'escape': escape,
    'escape_once': str => escape(unescape(str)),
    'first': v => toCollection(v)[0],
    'floor': v => Math.floor(numberify(v)),
    'join': (v, arg) => toCollection(v).join(arg),
    'last': v => {
      const collection = toCollection(v);
      return stringify(collection[collection.length - 1]);
    },
    // TODO: don't use regex
    'lstrip': v => stringify(v).replace(/^\s+/, ''),
    'map': (arr, arg) => toCollection(arr).map(v => v && typeof v === 'object' ? v[arg] : null),
    'minus': bindFixed((v, arg) => numberify(v) - numberify(arg)),
    'modulo': bindFixed((v, arg) => numberify(v) % numberify(arg)),
    'newline_to_br': v => stringify(v).replace(/\n/g, '<br />'),
    'plus': bindFixed((v, arg) => numberify(v) + numberify(arg)),
    'prepend': (v, arg) => arg + stringify(v),
    'remove': (v, arg) => filters.replace(v, arg, ''),
    'remove_first': (v, l) => filters.replace_first(v, l, ''),
    'replace': (v, pattern, replacement) => filters.split(v, pattern).join(stringify(replacement)),
    'replace_first': (v, arg1, arg2) => {
      const split = filters.split(v, arg1);
      const beforeRemove = split.shift();
      const afterRemove = split.join(arg1);
      return beforeRemove + stringify(arg2) + afterRemove;
    },
    'reverse': v => toCollection(v).reverse(),
    'round': (v, arg) => {
      var amp = Math.pow(10, numberify(arg) || 0);
      return Math.round(numberify(v) * amp, numberify(arg)) / amp;
    },
    // TODO: don't use regex
    'rstrip': str => stringify(str).replace(/\s+$/, ''),
    'size': v => {
      if (typeof v === 'string') {
        return v.length;
      } else if (typeof v === 'object') {
        return toCollection(v).length;
      } else {
        return 0;
      }
    },
    'slice': (v, begin, length) =>
      stringify(v).substr(begin, length === undefined ? 1 : length),
    'sort': (v, property) => {
      const collection = toCollection(v);
      if (property) {
        return sortBy(collection, property);
      } else {
        return collection.sort();
      }
    },
    'split': (v, arg) => stringify(v).split(arg),
    'strip': (v) => stringify(v).trim(),
    'strip_html': v => {
      const result = stringify(v).replace(/<\/?[^>]*?\/?>/gm, '').trim();
      return result;
    },
    'strip_newlines': v => stringify(v).replace(/[\n\r]/g, ''),
    'times': (v, arg) => numberify(v) * numberify(arg),
    'truncate': (v, l, o) => {
      v = stringify(v);
      o = (o === undefined) ? '...' : o;
      l = l || 16;
      if (v.length <= l) return v;
      return v.substr(0, l - o.length) + o;
    },
    'truncatewords': (v, l, o) => {
      if (o === undefined) o = '...';
      var arr = stringify(v).split(' ');
      var ret = arr.slice(0, l).join(' ');
      if (arr.length > l) ret += o;
      return ret;
    },
    'uniq': v => uniq(toCollection(v)),
    'upcase': str => stringify(str).toUpperCase(),
    'url_encode': v => encodeURIComponent(stringify(v)),
    'translate': function () {
      let scope = this;
      let args = Array.from(arguments);
      let v = args.shift();
      let context = argsToObject(args);
      return scope.get(LOCALE_SCOPE_KEY).then(async scopeLocales => {
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
        if (liquid.options.defaultLocale) { // absolute fallback
          locales.push(liquid.options.defaultLocale);
        }
        if (locales.length) {
          for (let i = 0; i < locales.length; i++) {
            let locale = locales[i];
            let translation;
            try {
              translation = locale.translate(v);
            } catch (err) {
              if (err.message.indexOf('invalid translation key') > -1) {
                continue; // not found.  try next locale
              } else {
                throw err;
              }
            }
            let countExists = 'count' in context;
            let notNull = translation !== null && undefined !== translation;
            let typeIsObject = typeof translation === 'object';
            if (countExists && notNull && typeIsObject) {
              let { count } = context;
              if (count === undefined) count = 0;
              if (count === 0) {
                translation = translation.zero || translation.other;
              } else if (count === 1) {
                translation = translation.one || translation.other;
              } else if (count === 2) {
                translation = translation.two || translation.other;
              } else {
                translation = translation.other;
              }
            }
            const result = await liquid.parseAndRender(translation, context);
            const noEscapeSuffix = '_html';
            if (v.slice(-noEscapeSuffix.length) === noEscapeSuffix) {
              return result;
            }
            else {
              return filters.escape(result);
            }
          }
          // it wasn't found in any of the provided locales
          // throw new Error(`invalid translation key: "${v}"; not found in any of the provided locales`);
          // don't error if it's not found and instead return an empty string
          return '';
        } else {
          return '';
        }
      });
    },
    where: (v, targetProperty, equalsValue) => {
      return toCollection(v)
        .filter(item => {
          if (!item || typeof item !== 'object') {
            return false;
          }
          if (equalsValue === undefined) {
            return !!item[targetProperty];
          } else {
            return item[targetProperty] === equalsValue;
          }
        });
    }
  };
  // alias
  filters.t = filters.translate;
  return filters;
};

function escape (str) {
  return stringify(str).replace(/&|<|>|"|'/g, m => escapeMap[m]);
}

function unescape (str) {
  return stringify(str).replace(/&(amp|lt|gt|#34|#39);/g, m => unescapeMap[m]);
}

function getFixed (v) {
  var p = (v + '').split('.');
  return (p.length > 1) ? p[1].length : 0;
}

function getMaxFixed (l, r) {
  return Math.max(getFixed(l), getFixed(r));
}

function stringify (obj) {
  if (obj === null || undefined === obj || typeof obj === 'function') return '';
  return obj + '';
}

function numberify(value) {
  if (typeof value === 'string') {
    value = Number(value);
  }
  return isNaN(value) || typeof value !== 'number' ? 0 : value;
}

// in liquid, a collection can be both object[] and { handle: object, ... }
// this means when dealing with "arrays", we need to make sure things work as expected
function toCollection (v) {
  if (Array.isArray(v)) {
    return v;
  } else if (v && typeof v === 'object') {
    // return Object.values(v);
    return Object.keys(v).map(key => v[key]);
  } else {
    return [];
  }
}

function bindFixed (cb) {
  return (l, r) => {
    var f = getMaxFixed(l, r);
    return cb(l, r).toFixed(f);
  };
}

function registerAll (liquid) {
  let filters = createFilters(liquid);
  return _.forOwn(filters, (func, name) => liquid.registerFilter(name, func));
}

function isValidDate (date) {
  return date instanceof Date && !isNaN(date.getTime());
}

export default registerAll;
