import * as _ from './util/underscore.js';
import * as lexical from './lexical.js';
import assert from './util/assert.js';
import { AssertionError } from './util/error.js';
import * as compatibility from './util/compatibility.js';

export const delimiters = [ `'`, '"' ];

export const forbidden = [
  'empty',
  'blank',
  'nil',
  'null',
  'undefined',
  'true',
  'false',
  '',
];

export function isVariableValid(varName) {
  return forbidden.indexOf((varName || '').trim().toLowerCase()) < 0;
};

export function validateContextObject(ctx) {
  if (null === ctx || undefined === ctx) return;
  let keys = Object.keys(ctx);
  keys.forEach(v => {
    if (!isVariableValid(v)) {
      throw new Error(`invalid context variable name; "${v}" is forbidden`);
    }
  });
};

var Scope = {
  getAll: function () {
    var ctx = {};
    for (var i = this.scopes.length - 1; i >= 0; i--) {
      _.assign(ctx, this.scopes[i])
    }
    return ctx;
  },
  getFromContext: function(str) {
    return new Promise((resolve, reject) => {
      this.getPropertyByPath(this.scopes, str).then(resolve).catch(err => {
        // console.log('get -> getPropertyByPath returned err:', err.message);
        if (!/undefined variable/.test(err.message) || this.opts.strict_variables) {
          // console.log('\t-> rejecting');
          return reject(err);
        }
        else {
          // console.log('\t-> resolving undefined');
          return resolve(undefined);
        }
      });
    });
  },
  get: function (str) {
    if (this.opts.beforeScopeProvides) {
      return this.opts.beforeScopeProvides(str, this).then(() => {
        return this.getFromContext(str);
      });
    }
    else {
      return this.getFromContext(str);
    }
  },
  set: function (k, v) {
    if (!isVariableValid(k)) throw new Error(`invalid variable name; "${v}" is forbidden`);
    var scope = this.findScopeFor(k);
    setPropertyByPath(scope, k, v);
    return this;
  },
  push: function (ctx) {
    assert(ctx, `trying to push ${ctx} into scopes`);
    validateContextObject(ctx);
    return this.scopes.push(ctx);
  },
  pop: function () {
    return this.scopes.pop();
  },
  findScopeFor: function (key) {
    var i = this.scopes.length - 1
    while (i >= 0 && !(key in this.scopes[i])) {
      i--
    }
    if (i < 0) {
      i = this.scopes.length - 1
    }
    return this.scopes[i]
  },
  unshift: function (ctx) {
    assert(ctx, `trying to push ${ctx} into scopes`)
    validateContextObject(ctx);
    return this.scopes.unshift(ctx);
  },
  shift: function () {
    return this.scopes.shift();
  },

  getPropertyByPath: function (scopes, path) {
    return this.propertyAccessSeq(path + '').then(paths => {
      if (!paths.length) {
        throw new TypeError(`undefined variable: "${path}"`);
      }
      var key = paths.shift();
      var value = getValueFromScopes(key, scopes);
      return paths.reduce((value, key) => {
        return value.then(value => getValueFromParent(key, value));
      }, Promise.resolve(value));
    });
  },

  /*
   * Parse property access sequence from access string
   * @example
   * accessSeq("foo.bar")            // ['foo', 'bar']
   * accessSeq("foo['bar']")      // ['foo', 'bar']
   * accessSeq("foo['b]r']")      // ['foo', 'b]r']
   * accessSeq("foo[bar.coo]")    // ['foo', 'bar'], for bar.coo == 'bar'
   */
  propertyAccessSeq: function (str) {
    // log = console.log.bind(console, `"${str}"`);
    let tokenProviders = [];
    let strLen = str.length;
    for (let cursor=0; cursor < strLen;) {
      // log('[loop]', str[cursor]);
      switch (str[cursor]) {
        case '[':
          let delimiter = str[cursor + 1]
          if (delimiters.indexOf(delimiter) > -1) { // access by quoted name: foo["bar"]
            let nameEndIndex = str.indexOf(delimiter, cursor + 2);
            if (nameEndIndex < 0) {
              return Promise.reject(new AssertionError(`unbalanced ${delimiter}: "${str}"`));
            }
            let nameToken = str.slice(cursor + 2, nameEndIndex);
            tokenProviders.push(Promise.resolve(nameToken));
            cursor = nameEndIndex + 2; // the closing " and ]
            // log('BRACKET w/delimiter',nameEndIndex, nameToken);
          }
          else { // access by variable: foo[bar.coo]
            let variableEndIndex = matchRightBracket(str, cursor + 1);
            if (variableEndIndex < 0) {
              return Promise.reject(new AssertionError(`unbalanced []: "${str}"`));
            }
            let variableToken = str.slice(cursor + 1, variableEndIndex);
            if (lexical.isInteger(variableToken)) { // foo[1]
              // log('BRACKET; number', variableToken);
              tokenProviders.push(Promise.resolve(variableToken));
            }
            else {
              // log('BRACKET; name', variableToken);
              tokenProviders.push(this.get(variableToken));
            }
            cursor = variableEndIndex + 1;
          }
          break;
        case '.': // separator: foo.bar, foo[0].bar
          cursor++;
          // log('DOT');
          break;
        default: // access by unquoted name: foo.bar
          let nextBracketIndex    = str.indexOf('[', cursor);
          let nextDotIndex        = str.indexOf('.', cursor);
          let foundIndexes        = [ strLen, nextBracketIndex, nextDotIndex ].filter(index => index > -1);
          let nextSeparator       = Math.min.apply(Math, foundIndexes);
          let unquotedNameToken   = str.slice(cursor, nextSeparator);
          // log('DEFAULT', {nextBracketIndex,nextDotIndex,nextSeparator,unquotedNameToken});
          tokenProviders.push(Promise.resolve(unquotedNameToken));
          cursor = nextSeparator;
          break;
      }
    }
    return Promise.all(tokenProviders);
  },
}

export function setPropertyByPath(obj, path, val) {
  var paths = (path + '').replace(/\[/g, '.').replace(/\]/g, '').split('.')
  for (var i = 0; i < paths.length; i++) {
    var key = paths[i]
    if (!_.isObject(obj)) {
      // cannot set property of non-object
      return
    }
    // for end point
    if (i === paths.length - 1) {
      return (obj[key] = val)
    }
    // if path not exist
    if (undefined === obj[key]) {
      obj[key] = {}
    }
    obj = obj[key]
  }
}

export function getValueFromParent (key, value) {
  if ('size' === key) {
    return compatibility.compatSize(value);
  }
  else if ('first' === key) {
    return compatibility.compatFirst(value);
  }
  else if ('last' === key) {
    return compatibility.compatLast(value);
  }
  else {
    if (_.isNil(value)) {
      throw new TypeError(`undefined variable: "${key}"`);
    }
    return value[key];
  }
}

export function getValueFromScopes (key, scopes) {
  for (var i = scopes.length - 1; i > -1; i--) {
    var scope = scopes[i]
    if (scope.hasOwnProperty(key)) {
      return scope[key]
    }
  }
  throw new TypeError(`undefined variable: "${key}"`)
}

export function matchRightBracket (str, begin) {
  var stack = 1 // count of '[' - count of ']'
  for (var i = begin; i < str.length; i++) {
    if (str[i] === '[') {
      stack++
    }
    if (str[i] === ']') {
      stack--
      if (stack === 0) {
        return i
      }
    }
  }
  return -1
}

export function createScope(ctx, opts) {
  var defaultOptions = {
    dynamicPartials: true,
    strict_variables: false,
    strict_filters: false,
    blocks: {},
    root: [],
  }
  var scope = Object.create(Scope)
  scope.opts = _.assign(defaultOptions, opts)
  validateContextObject(ctx);
  scope.scopes = [ctx || {}]
  return scope
}
