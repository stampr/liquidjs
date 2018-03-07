const Promise = require('any-promise');
const _ = require('./util/underscore.js')
const lexical = require('./lexical.js')
const assert = require('./util/assert.js')
const AssertionError = require('./util/error.js').AssertionError

const placeholderBoundary = '_#$#_';
const delimiters = [ `'`, '"' ];

var Scope = {
  getAll: function () {
    var ctx = {};
    for (var i = this.scopes.length - 1; i >= 0; i--) {
      _.assign(ctx, this.scopes[i])
    }
    return ctx;
  },
  get: function (str) {
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
  set: function (k, v) {
    var scope = this.findScopeFor(k);
    setPropertyByPath(scope, k, v);
    return this;
  },
  push: function (ctx) {
    assert(ctx, `trying to push ${ctx} into scopes`);
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
    return this.scopes.unshift(ctx)
  },
  shift: function () {
    return this.scopes.shift()
  },

  getPropertyByPath: function (scopes, path) {
    return new Promise((resolve, reject) => {
      this.propertyAccessSeq(path + '').then(paths => {
        if (!paths.length) {
          reject(new TypeError(`undefined variable: "${path}"`));
          return;
        }
        var key = paths.shift();
        var value = getValueFromScopes(key, scopes);
        (value instanceof Promise ? value : Promise.resolve(value)).then(rootValue => {
          try {
            let result = paths.reduce((value, key) => {
              if (_.isNil(value)) {
                throw new TypeError(`undefined variable: "${key}"`);
              }
              return getValueFromParent(key, value);
            }, rootValue);
            return resolve(result);
          }
          catch (err) {
            return reject(err);
          }
        }).catch(reject);
      }).catch(reject);
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

function setPropertyByPath (obj, path, val) {
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

function getValueFromParent (key, value) {
  return (key === 'size' && (_.isArray(value) || _.isString(value)))
    ? value.length
    : value[key]
}

function getValueFromScopes (key, scopes) {
  for (var i = scopes.length - 1; i > -1; i--) {
    var scope = scopes[i]
    if (scope.hasOwnProperty(key)) {
      return scope[key]
    }
  }
  throw new TypeError(`undefined variable: "${key}"`)
}

function matchRightBracket (str, begin) {
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

exports.factory = function (ctx, opts) {
  var defaultOptions = {
    dynamicPartials: true,
    strict_variables: false,
    strict_filters: false,
    blocks: {},
    root: []
  }
  var scope = Object.create(Scope)
  scope.opts = _.assign(defaultOptions, opts)
  scope.scopes = [ctx || {}]
  return scope
}
