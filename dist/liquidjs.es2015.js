import fs from 'fs';
import path from 'path';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/*
 * Checks if value is classified as a String primitive or object.
 * @param {any} value The value to check.
 * @return {Boolean} Returns true if value is a string, else false.
 */
function isString(value) {
  return value instanceof String || typeof value === 'string';
}

function isNil(value) {
  return value === null || value === undefined;
}





/*
 * Iterates over own enumerable string keyed properties of an object and invokes iteratee for each property.
 * The iteratee is invoked with three arguments: (value, key, object).
 * Iteratee functions may exit iteration early by explicitly returning false.
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @return {Object} Returns object.
 */
function forOwn(object, iteratee) {
  object = object || {};
  for (var k in object) {
    if (object.hasOwnProperty(k)) {
      if (iteratee(object[k], k, object) === false) break;
    }
  }
  return object;
}

/*
 * Assigns own enumerable string keyed properties of source objects to the destination object.
 * Source objects are applied from left to right.
 * Subsequent sources overwrite property assignments of previous sources.
 *
 * Note: This method mutates object and is loosely based on Object.assign.
 *
 * @param {Object} object The destination object.
 * @param {...Object} sources The source objects.
 * @return {Object} Returns object.
 */
function assign(object) {
  object = isObject(object) ? object : {};
  var srcs = Array.prototype.slice.call(arguments, 1);
  srcs.forEach(function (src) {
    _assignBinary(object, src);
  });
  return object;
}

function _assignBinary(dst, src) {
  forOwn(src, function (v, k) {
    dst[k] = v;
  });
  return dst;
}

function last(arr) {
  return arr[arr.length - 1];
}

function uniq(arr) {
  var u = {};
  var a = [];
  for (var i = 0, l = arr.length; i < l; ++i) {
    if (u.hasOwnProperty(arr[i])) {
      continue;
    }
    a.push(arr[i]);
    u[arr[i]] = 1;
  }
  return a;
}

/*
 * Checks if value is the language type of Object.
 * (e.g. arrays, functions, objects, regexes, new Number(0), and new String(''))
 * @param {any} value The value to check.
 * @return {Boolean} Returns true if value is an object, else false.
 */
function isObject(value) {
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return value != null && (type === 'object' || type === 'function');
}

/*
 * A function to create flexibly-numbered lists of integers,
 * handy for each and map loops. start, if omitted, defaults to 0; step defaults to 1.
 * Returns a list of integers from start (inclusive) to stop (exclusive),
 * incremented (or decremented) by step, exclusive.
 * Note that ranges that stop before they start are considered to be zero-length instead of
 * negative — if you'd like a negative range, use a negative step.
 */
function range(start, stop, step) {
  if (arguments.length === 1) {
    stop = start;
    start = 0;
  }
  step = step || 1;

  var arr = [];
  for (var i = start; i < stop; i += step) {
    arr.push(i);
  }
  return arr;
}

function EmptyVariable() {}
EmptyVariable.prototype.toString = function () {
  return '';
};
EmptyVariable.prototype.toJSON = function () {
  return '';
};

var EMPTY = new EmptyVariable();

// quote related
var singleQuoted = /'[^']*'/;
var doubleQuoted = /"[^"]*"/;
var quoted = new RegExp(singleQuoted.source + '|' + doubleQuoted.source);
var quoteBalanced = new RegExp('(?:' + quoted.source + '|[^\'"])*');

// basic types
var integer = /-?\d+/;
var number = /-?\d+\.?\d*|\.?\d+/;
var bool = /true|false/;

// peoperty access
var identifier = /[\w-]+/;
var subscript = new RegExp('\\[(?:' + quoted.source + '|[\\w-\\.]+)\\]');
var literal = new RegExp('(?:' + quoted.source + '|' + bool.source + '|' + number.source + '|nil|null|empty|blank)');
var variable = new RegExp(identifier.source + '(?:\\.' + identifier.source + '|' + subscript.source + ')*');

// range related
var rangeLimit = new RegExp('(?:' + variable.source + '|' + number.source + ')');
var range$1 = new RegExp('\\(' + rangeLimit.source + '\\.\\.' + rangeLimit.source + '\\)');
var rangeCapture = new RegExp('\\((' + rangeLimit.source + ')\\.\\.(' + rangeLimit.source + ')\\)');

var value = new RegExp('(?:' + variable.source + '|' + literal.source + '|' + range$1.source + ')');

// hash related
var hash = new RegExp('(?:' + identifier.source + ')\\s*:\\s*(?:' + value.source + ')');
var hashCapture = new RegExp('(' + identifier.source + ')\\s*:\\s*(' + value.source + ')', 'g');

// full match
var tagLine = new RegExp('^\\s*(' + identifier.source + ')\\s*([\\s\\S]*)\\s*$');
var literalLine = new RegExp('^' + literal.source + '$', 'i');
var variableLine = new RegExp('^' + variable.source + '$');
var numberLine = new RegExp('^' + number.source + '$');
var boolLine = new RegExp('^' + bool.source + '$', 'i');
var quotedLine = new RegExp('^' + quoted.source + '$');
var rangeLine = new RegExp('^' + rangeCapture.source + '$');
var integerLine = new RegExp('^' + integer.source + '$');

// filter related
var valueDeclaration = new RegExp('(?:' + identifier.source + '\\s*:\\s*)?' + value.source);
var valueList = new RegExp(valueDeclaration.source + '(\\s*,\\s*' + valueDeclaration.source + ')*');
var filter = new RegExp(identifier.source + '(?:\\s*:\\s*' + valueList.source + ')?', 'g');
var filterCapture = new RegExp('(' + identifier.source + ')(?:\\s*:\\s*(' + valueList.source + '))?');
var filterLine = new RegExp('^' + filterCapture.source + '$');

var operators = [/\s+or\s+/, /\s+and\s+/, /==|!=|<=|>=|<|>|\s+contains\s+/];

function isInteger(str) {
  return integerLine.test(str);
}

function isLiteral(str) {
  return literalLine.test(str);
}



function isVariable(str) {
  return variableLine.test(str);
}

function matchValue(str) {
  return value.exec(str);
}

function parseLiteral(str) {
  if (['nil', 'null'].indexOf(str) > -1) {
    // console.log('parseLiteral; nil', str);
    return null;
  }
  if (['empty', 'blank'].indexOf(str) > -1) {
    // console.log('parseLiteral; empty', str);
    return EMPTY;
  }
  var res = str.match(numberLine);
  if (res) {
    // console.log('parseLiteral; number', str);
    return Number(str);
  }
  res = str.match(boolLine);
  if (res) {
    // console.log('parseLiteral; bool', str);
    return str.toLowerCase() === 'true';
  }
  res = str.match(quotedLine);
  if (res) {
    // console.log('parseLiteral; quoted', str);
    return str.slice(1, -1);
  }
  throw new TypeError('cannot parse \'' + str + '\' as literal');
}

function initError() {
  this.name = this.constructor.name;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  }
}

function initLiquidError(err, token) {
  initError.call(this);

  this.input = token.input;
  this.line = token.line;
  this.file = token.file;

  var context = mkContext(token.input, token.line);
  this.message = mkMessage(err.message, token);
  this.stack = context + '\n' + (this.stack || this.message) + (err.stack ? '\nFrom ' + err.stack : '');
}

function TokenizationError(message, token) {
  initLiquidError.call(this, { message: message }, token);
}
TokenizationError.prototype = Object.create(Error.prototype);
TokenizationError.prototype.constructor = TokenizationError;

function ParseError(e, token) {
  assign(this, e);
  this.originalError = e;

  initLiquidError.call(this, e, token);
}
ParseError.prototype = Object.create(Error.prototype);
ParseError.prototype.constructor = ParseError;

function RenderError(e, tpl) {
  // return the original render error
  if (e instanceof RenderError) {
    return e;
  }
  assign(this, e);
  this.originalError = e;

  initLiquidError.call(this, e, tpl.token);
}
RenderError.prototype = Object.create(Error.prototype);
RenderError.prototype.constructor = RenderError;

function RenderBreakError(message) {
  initError.call(this);
  this.message = message + '';
}
RenderBreakError.prototype = Object.create(Error.prototype);
RenderBreakError.prototype.constructor = RenderBreakError;

function AssertionError(message) {
  initError.call(this);
  this.message = message + '';
}
AssertionError.prototype = Object.create(Error.prototype);
AssertionError.prototype.constructor = AssertionError;

function mkContext(input, line) {
  var lines = input.split('\n');
  var begin = Math.max(line - 2, 1);
  var end = Math.min(line + 3, lines.length);

  var context = range(begin, end + 1).map(function (l) {
    return [l === line ? '>> ' : '   ', align(l, end), '| ', lines[l - 1]].join('');
  }).join('\n');

  return context;
}

function align(n, max) {
  var length = (max + '').length;
  var str = n + '';
  var blank = Array(length - str.length).join(' ');
  return blank + str;
}

function mkMessage(msg, token) {
  msg = msg || '';
  if (token.file) {
    msg += ', file:' + token.file;
  }
  if (token.line) {
    msg += ', line:' + token.line;
  }
  return msg;
}

var error$1 = Object.freeze({
	TokenizationError: TokenizationError,
	ParseError: ParseError,
	RenderError: RenderError,
	RenderBreakError: RenderBreakError,
	AssertionError: AssertionError
});

function assert(predicate, message) {
  if (!predicate) {
    message = message || 'expect ' + predicate + ' to be true';
    throw new AssertionError(message);
  }
}

var isNull = function isNull(value) {
  return value === null || value === undefined;
};

function compatSize(result) {
  if (Array.isArray(result) || typeof result === 'string') {
    return result.length;
  } else if (isNull(result)) {
    return 0;
  } else if ((typeof result === 'undefined' ? 'undefined' : _typeof(result)) === 'object') {
    // objects that don't have their own property "size" defined
    // should return key length
    if ('size' in result) {
      return result.size;
    } else {
      return Object.keys(result).length;
    }
  } else {
    return result;
  }
}

function compatFirst(result) {
  if (Array.isArray(result) || typeof result === 'string') {
    return result.length > 0 ? result[0] : null;
  } else if (isNull(result)) {
    return null;
  } else if ((typeof result === 'undefined' ? 'undefined' : _typeof(result)) === 'object') {
    if ('first' in result) {
      return result.first;
    } else {
      var keys = Object.keys(result);
      if (keys.length <= 0) return null;
      var first = keys[0];
      return result[first];
    }
  } else {
    return result;
  }
}

function compatLast(result) {
  if (Array.isArray(result) || typeof result === 'string') {
    return result.length > 0 ? result[result.length - 1] : null;
  } else if (isNull(result)) {
    return null;
  } else if ((typeof result === 'undefined' ? 'undefined' : _typeof(result)) === 'object') {
    if ('last' in result) {
      return result.last;
    } else {
      var keys = Object.keys(result);
      if (keys.length <= 0) return null;
      var last = keys[keys.length - 1];
      return result[last];
    }
  } else {
    return result;
  }
}

var delimiters = ['\'', '"'];

var forbidden = ['empty', 'blank', 'nil', 'null', 'undefined', 'true', 'false', ''];

function isVariableValid(varName) {
  return forbidden.indexOf((varName || '').trim().toLowerCase()) < 0;
}

function validateContextObject(ctx) {
  if (null === ctx || undefined === ctx) return;
  var keys = Object.keys(ctx);
  keys.forEach(function (v) {
    if (!isVariableValid(v)) {
      throw new Error('invalid context variable name; "' + v + '" is forbidden');
    }
  });
}

var Scope = {
  getAll: function getAll() {
    var ctx = {};
    for (var i = this.scopes.length - 1; i >= 0; i--) {
      assign(ctx, this.scopes[i]);
    }
    return ctx;
  },
  getFromContext: function getFromContext(str) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      _this.getPropertyByPath(_this.scopes, str).then(resolve).catch(function (err) {
        // console.log('get -> getPropertyByPath returned err:', err.message);
        if (!/undefined variable/.test(err.message) || _this.opts.strict_variables) {
          // console.log('\t-> rejecting');
          return reject(err);
        } else {
          // console.log('\t-> resolving undefined');
          return resolve(undefined);
        }
      });
    });
  },
  get: function get(str) {
    var _this2 = this;

    if (this.opts.beforeScopeProvides) {
      return this.opts.beforeScopeProvides(str, this).then(function () {
        return _this2.getFromContext(str);
      });
    } else {
      return this.getFromContext(str);
    }
  },
  set: function set(k, v) {
    if (!isVariableValid(k)) throw new Error('invalid variable name; "' + v + '" is forbidden');
    var scope = this.findScopeFor(k);
    setPropertyByPath(scope, k, v);
    return this;
  },
  push: function push(ctx) {
    assert(ctx, 'trying to push ' + ctx + ' into scopes');
    validateContextObject(ctx);
    return this.scopes.push(ctx);
  },
  pop: function pop() {
    return this.scopes.pop();
  },
  findScopeFor: function findScopeFor(key) {
    var i = this.scopes.length - 1;
    while (i >= 0 && !(key in this.scopes[i])) {
      i--;
    }
    if (i < 0) {
      i = this.scopes.length - 1;
    }
    return this.scopes[i];
  },
  unshift: function unshift(ctx) {
    assert(ctx, 'trying to push ' + ctx + ' into scopes');
    validateContextObject(ctx);
    return this.scopes.unshift(ctx);
  },
  shift: function shift() {
    return this.scopes.shift();
  },

  getPropertyByPath: function getPropertyByPath(scopes, path$$1) {
    return this.propertyAccessSeq(path$$1 + '').then(function (paths) {
      if (!paths.length) {
        throw new TypeError('undefined variable: "' + path$$1 + '"');
      }
      var key = paths.shift();
      var value$$1 = getValueFromScopes(key, scopes);
      return paths.reduce(function (value$$1, key) {
        return value$$1.then(function (value$$1) {
          return getValueFromParent(key, value$$1);
        });
      }, Promise.resolve(value$$1));
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
  propertyAccessSeq: function propertyAccessSeq(str) {
    // log = console.log.bind(console, `"${str}"`);
    var tokenProviders = [];
    var strLen = str.length;
    for (var cursor = 0; cursor < strLen;) {
      // log('[loop]', str[cursor]);
      switch (str[cursor]) {
        case '[':
          var delimiter = str[cursor + 1];
          if (delimiters.indexOf(delimiter) > -1) {
            // access by quoted name: foo["bar"]
            var nameEndIndex = str.indexOf(delimiter, cursor + 2);
            if (nameEndIndex < 0) {
              return Promise.reject(new AssertionError('unbalanced ' + delimiter + ': "' + str + '"'));
            }
            var nameToken = str.slice(cursor + 2, nameEndIndex);
            tokenProviders.push(Promise.resolve(nameToken));
            cursor = nameEndIndex + 2; // the closing " and ]
            // log('BRACKET w/delimiter',nameEndIndex, nameToken);
          } else {
            // access by variable: foo[bar.coo]
            var variableEndIndex = matchRightBracket(str, cursor + 1);
            if (variableEndIndex < 0) {
              return Promise.reject(new AssertionError('unbalanced []: "' + str + '"'));
            }
            var variableToken = str.slice(cursor + 1, variableEndIndex);
            if (isInteger(variableToken)) {
              // foo[1]
              // log('BRACKET; number', variableToken);
              tokenProviders.push(Promise.resolve(variableToken));
            } else {
              // log('BRACKET; name', variableToken);
              tokenProviders.push(this.get(variableToken));
            }
            cursor = variableEndIndex + 1;
          }
          break;
        case '.':
          // separator: foo.bar, foo[0].bar
          cursor++;
          // log('DOT');
          break;
        default:
          // access by unquoted name: foo.bar
          var nextBracketIndex = str.indexOf('[', cursor);
          var nextDotIndex = str.indexOf('.', cursor);
          var foundIndexes = [strLen, nextBracketIndex, nextDotIndex].filter(function (index) {
            return index > -1;
          });
          var nextSeparator = Math.min.apply(Math, foundIndexes);
          var unquotedNameToken = str.slice(cursor, nextSeparator);
          // log('DEFAULT', {nextBracketIndex,nextDotIndex,nextSeparator,unquotedNameToken});
          tokenProviders.push(Promise.resolve(unquotedNameToken));
          cursor = nextSeparator;
          break;
      }
    }
    return Promise.all(tokenProviders);
  }
};

function setPropertyByPath(obj, path$$1, val) {
  var paths = (path$$1 + '').replace(/\[/g, '.').replace(/\]/g, '').split('.');
  for (var i = 0; i < paths.length; i++) {
    var key = paths[i];
    if (!isObject(obj)) {
      // cannot set property of non-object
      return;
    }
    // for end point
    if (i === paths.length - 1) {
      return obj[key] = val;
    }
    // if path not exist
    if (undefined === obj[key]) {
      obj[key] = {};
    }
    obj = obj[key];
  }
}

function getValueFromParent(key, value$$1) {
  if ('size' === key) {
    return compatSize(value$$1);
  } else if ('first' === key) {
    return compatFirst(value$$1);
  } else if ('last' === key) {
    return compatLast(value$$1);
  } else {
    if (isNil(value$$1)) {
      throw new TypeError('undefined variable: "' + key + '"');
    }
    return value$$1[key];
  }
}

function getValueFromScopes(key, scopes) {
  for (var i = scopes.length - 1; i > -1; i--) {
    var scope = scopes[i];
    if (scope.hasOwnProperty(key)) {
      return scope[key];
    }
  }
  throw new TypeError('undefined variable: "' + key + '"');
}

function matchRightBracket(str, begin) {
  var stack = 1; // count of '[' - count of ']'
  for (var i = begin; i < str.length; i++) {
    if (str[i] === '[') {
      stack++;
    }
    if (str[i] === ']') {
      stack--;
      if (stack === 0) {
        return i;
      }
    }
  }
  return -1;
}

function createScope(ctx, opts) {
  var defaultOptions = {
    dynamicPartials: true,
    strict_variables: false,
    strict_filters: false,
    blocks: {},
    root: []
  };
  var scope = Object.create(Scope);
  scope.opts = assign(defaultOptions, opts);
  validateContextObject(ctx);
  scope.scopes = [ctx || {}];
  return scope;
}

function shouldTrimLeft(token, inRaw, options) {
  if (inRaw) return false;
  if (token.type === 'tag') return token.trim_left || options.trim_tag_left;
  if (token.type === 'value') return token.trim_left || options.trim_value_left;
}

function shouldTrimRight(token, inRaw, options) {
  if (inRaw) return false;
  if (token.type === 'tag') return token.trim_right || options.trim_tag_right;
  if (token.type === 'value') return token.trim_right || options.trim_value_right;
}

function trimLeft(token, greedy) {
  if (!token || token.type !== 'html') return;

  var rLeft = greedy ? /\s+$/g : /[\t\r ]*$/g;
  token.value = token.value.replace(rLeft, '');
}

function trimRight(token, greedy) {
  if (!token || token.type !== 'html') return;

  var rRight = greedy ? /^\s+/g : /^[\t\r ]*\n?/g;
  token.value = token.value.replace(rRight, '');
}

var whiteSpaceCtrl = function (tokens, options) {
  options = assign({ greedy: true }, options);
  var inRaw = false;

  tokens.forEach(function (token, i) {
    if (shouldTrimLeft(token, inRaw, options)) {
      trimLeft(tokens[i - 1], options.greedy);
    }

    if (token.type === 'tag' && token.name === 'raw') inRaw = true;
    if (token.type === 'tag' && token.name === 'endraw') inRaw = false;

    if (shouldTrimRight(token, inRaw, options)) {
      trimRight(tokens[i + 1], options.greedy);
    }
  });
};

function parse(input, file, options) {
  assert(isString(input), 'illegal input; "' + ('' + input) + '"');

  var rLiquid = /({%-?([\s\S]*?)-?%})|({{-?([\s\S]*?)-?}})/g;
  var currIndent = 0;
  var lineNumber = LineNumber(input);
  var lastMatchEnd = 0;
  var tokens = [];

  for (var match; match = rLiquid.exec(input); lastMatchEnd = rLiquid.lastIndex) {
    if (match.index > lastMatchEnd) {
      tokens.push(parseHTMLToken(lastMatchEnd, match.index));
    }
    tokens.push(match[1] ? parseTagToken(match[1], match[2].trim(), match.index) : parseValueToken(match[3], match[4].trim(), match.index));
  }
  if (input.length > lastMatchEnd) {
    tokens.push(parseHTMLToken(lastMatchEnd, input.length));
  }
  whiteSpaceCtrl(tokens, options);
  return tokens;

  function parseTagToken(raw, value$$1, pos) {
    var match = value$$1.match(tagLine);
    var token = {
      type: 'tag',
      indent: currIndent,
      line: lineNumber.get(pos),
      trim_left: raw.slice(0, 3) === '{%-',
      trim_right: raw.slice(-3) === '-%}',
      raw: raw,
      value: value$$1,
      input: input,
      file: file
    };
    if (!match) {
      throw new TokenizationError('illegal tag syntax', token);
    }
    token.name = match[1];
    token.args = match[2];
    return token;
  }

  function parseValueToken(raw, value$$1, pos) {
    return {
      type: 'value',
      line: lineNumber.get(pos),
      trim_left: raw.slice(0, 3) === '{{-',
      trim_right: raw.slice(-3) === '-}}',
      raw: raw,
      value: value$$1,
      input: input,
      file: file
    };
  }

  function parseHTMLToken(begin, end) {
    var htmlFragment = input.slice(begin, end);
    currIndent = last(htmlFragment.split('\n')).length;

    return {
      type: 'html',
      raw: htmlFragment,
      value: htmlFragment
    };
  }
}

function LineNumber(html) {
  var parsedLinesCount = 0;
  var lastMatchBegin = -1;

  return {
    get: function get(pos) {
      var lines = html.slice(lastMatchBegin + 1, pos).split('\n');
      parsedLinesCount += lines.length - 1;
      lastMatchBegin = pos;
      return parsedLinesCount + 1;
    }
  };
}

function readFileAsync(filepath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(filepath, 'utf8', function (err, content) {
      err ? reject(err) : resolve(content);
    });
  });
}

function statFileAsync(path$$1) {
  return new Promise(function (resolve, reject) {
    fs.stat(path$$1, function (err, stat) {
      return err ? reject(err) : resolve(stat);
    });
  });
}

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var resolveUrl = createCommonjsModule(function (module, exports) {
// Copyright 2014 Simon Lydell
// X11 (“MIT”) Licensed. (See LICENSE.)

void (function(root, factory) {
  if (typeof undefined === "function" && undefined.amd) {
    undefined(factory);
  } else {
    module.exports = factory();
  }
}(commonjsGlobal, function() {

  function resolveUrl(/* ...urls */) {
    var numUrls = arguments.length;

    if (numUrls === 0) {
      throw new Error("resolveUrl requires at least one argument; got none.")
    }

    var base = document.createElement("base");
    base.href = arguments[0];

    if (numUrls === 1) {
      return base.href
    }

    var head = document.getElementsByTagName("head")[0];
    head.insertBefore(base, head.firstChild);

    var a = document.createElement("a");
    var resolved;

    for (var index = 1; index < numUrls; index++) {
      a.href = arguments[index];
      resolved = a.href;
      base.href = resolved;
    }

    head.removeChild(base);

    return resolved
  }

  return resolveUrl

}));
});

var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^/]+?|)(\.[^./]*|))(?:[/]*)$/;
var urlRe = /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/;

// https://github.com/jinder/path/blob/master/path.js#L567
function extname(path$$1) {
  return splitPathRe.exec(path$$1).slice(1)[3];
}

// https://www.npmjs.com/package/is-url
function valid(path$$1) {
  return urlRe.test(path$$1);
}

function resolve(root, path$$1) {
  if (Object.prototype.toString.call(root) === '[object Array]') {
    root = root[0];
  }
  if (root && root.charAt(root.length - 1) !== '/') {
    root += '/';
  }
  return resolveUrl(root, path$$1);
}

var SafeObject = function SafeObject(comparisonId) {
  classCallCheck(this, SafeObject);

  if (undefined !== comparisonId) {
    Object.defineProperty(this, SafeObject.COMPARISON_KEY, {
      enumerable: false,
      value: comparisonId
    });
  } else {
    // noop. must inherit
  }
};

SafeObject.COMPARISON_KEY = '_liquid_comparison_id';

var isNullOrUndefined = function isNullOrUndefined(value) {
  return null === value || undefined === value;
};

var comparingEmpty = function comparingEmpty(EMPTY) {
  for (var _len = arguments.length, vars = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    vars[_key - 1] = arguments[_key];
  }

  return !!vars.find(function (v) {
    return v === EMPTY;
  });
};

var createOperator = function createOperator(EMPTY, handler) {
  return function (l, r) {
    // HACK: if comparing against EMPTY const we'll stringify first
    //       because both [] == empty and '' == empty, but i don't think
    //       {} == empty.  since [].toString() is converted to '' this works
    // NOTE: in liquid, you can do {% if Product == Product %} but in js you can't.
    //       any object requiring that kind of comparison should extend SafeObject
    //       and provide a comparison id that can uniquely identify that object
    if (l instanceof SafeObject) {
      l = l[SafeObject.COMPARISON_KEY];
    }
    if (r instanceof SafeObject) {
      r = r[SafeObject.COMPARISON_KEY];
    }
    if (comparingEmpty(EMPTY, l, r)) {
      // if comparing to empty, null or undefined is evaluated as an empty string
      l = isNullOrUndefined(l) ? '' : '' + l;
      r = isNullOrUndefined(r) ? '' : '' + r;
    }
    return handler(l, r);
  };
};

var createOperators = function (isTruthy, EMPTY) {
  var _createOperator = createOperator.bind(null, EMPTY);
  return {
    '==': _createOperator(function (l, r) {
      return l === r;
    }),

    '!=': _createOperator(function (l, r) {
      return l !== r;
    }),

    '>': _createOperator(function (l, r) {
      return l !== null && r !== null && l > r;
    }),

    '<': _createOperator(function (l, r) {
      return l !== null && r !== null && l < r;
    }),

    '>=': _createOperator(function (l, r) {
      return l !== null && r !== null && l >= r;
    }),

    '<=': _createOperator(function (l, r) {
      return l !== null && r !== null && l <= r;
    }),

    'contains': _createOperator(function (l, r) {
      if (!l) return false;
      if (typeof l.indexOf !== 'function') return false;
      return l.indexOf(r) > -1;
    }),

    'and': _createOperator(function (l, r) {
      return isTruthy(l) && isTruthy(r);
    }),

    'or': _createOperator(function (l, r) {
      return isTruthy(l) || isTruthy(r);
    })
  };
};

var operators$1 = createOperators(isTruthy, EMPTY);

function evalExp(exp, scope) {
  assert(scope, 'unable to evalExp: scope undefined');
  var operatorREs = operators;
  var match;
  for (var i = 0; i < operatorREs.length; i++) {
    var operatorRE = operatorREs[i];
    var expRE = new RegExp('^(' + quoteBalanced.source + ')(' + operatorRE.source + ')(' + quoteBalanced.source + ')$');
    if (match = exp.match(expRE)) {
      return Promise.all([evalExp(match[1], scope), evalExp(match[3], scope)]).then(function (results) {
        var l = results[0];
        var r = results[1];
        var op = operators$1[match[2].trim()];
        // console.log('evalExp', l, op, r);
        return op(l, r);
      });
    }
  }

  if (match = exp.match(rangeLine)) {
    return Promise.all([evalValue(match[1], scope), evalValue(match[2], scope)]).then(function (results) {
      var low = results[0];
      var high = results[1];
      var range$$1 = [];
      for (var j = low; j <= high; j++) {
        range$$1.push(j);
      }
      return range$$1;
    });
  }
  // need to support if this.boolean? is true
  if (exp.substr(-1) === '?') {
    exp = exp.substr(0, exp.length - 1);
  }
  return evalValue(exp, scope);
}

function evalValue(str, scope) {
  str = str && str.trim();
  if (!str) return Promise.resolve(undefined);
  if (isLiteral(str)) {
    // console.log('evalValue isLiteral', str);
    return Promise.resolve(parseLiteral(str));
  }
  if (isVariable(str)) {
    // console.log('evalValue isVariable', str, scope);
    return scope.get(str);
  }
  throw new TypeError('cannot eval \'' + str + '\' as value');
}

function isTruthy(val) {
  return !isFalsy(val);
}

function isFalsy(val) {
  return val === false || undefined === val || val === null || EMPTY === val || typeof val === 'string' && val.length === 0;
}

var syntax = Object.freeze({
	evalExp: evalExp,
	evalValue: evalValue,
	isTruthy: isTruthy,
	isFalsy: isFalsy
});

/*
 * Call functions in serial until someone resolved.
 * @param {Array} iterable the array to iterate with.
 * @param {Array} iteratee returns a new promise.
 * The iteratee is invoked with three arguments: (value, index, iterable).
 */
function anySeries(iterable, iteratee) {
  var ret = Promise.reject(new Error('init'));
  iterable.forEach(function (item, idx) {
    ret = ret.catch(function (e) {
      return iteratee(item, idx, iterable);
    });
  });
  return ret;
}

/*
 * Call functions in serial until someone rejected.
 * @param {Array} iterable the array to iterate with.
 * @param {Array} iteratee returns a new promise.
 * The iteratee is invoked with three arguments: (value, index, iterable).
 */
function mapSeries(iterable, iteratee) {
  var ret = Promise.resolve('init');
  var result = [];
  iterable.forEach(function (item, idx) {
    ret = ret.then(function () {
      return iteratee(item, idx, iterable);
    }).then(function (x) {
      return result.push(x);
    });
  });
  return ret.then(function () {
    return result;
  });
}

/*
 * Call functions in serial until someone resolved; skip rest of series
 * @param {Array} iterable the array to iterate with.
 * @param {Array} iteratee returns a new promise.
 * The iteratee is invoked with three arguments: (value, index, iterable).
 */
function firstSeries(iterable, iteratee, fallbackFn) {
  var winner;
  return iterable.reduce(function (promise, item) {
    return promise.then(function () {
      if (winner) {
        return Promise.resolve(winner);
      } else {
        return iteratee(item).then(function (found) {
          winner = found;
          return winner;
        }).catch(function (err) {
          if (err instanceof Error) {
            throw err;
          } else {
            // noop. swallow promises rejected with non-errors
          }
        });
      }
    });
  }, Promise.resolve()).then(function () {
    if (undefined !== winner) {
      return winner;
    } else if (fallbackFn) {
      return fallbackFn();
    } else {
      return undefined;
    }
  });
}

var render = {

  renderTemplates: function renderTemplates(templates, scope) {
    var _this = this;

    assert(scope, 'unable to evalTemplates: scope undefined');

    var html = '';
    return mapSeries(templates, function (tpl) {
      return renderTemplate.call(_this, tpl).then(function (partial) {
        return html += partial;
      }).catch(function (e) {
        if (e instanceof RenderBreakError) {
          e.resolvedHTML = html;
          throw e;
        }
        throw new RenderError(e, tpl);
      });
    }).then(function () {
      return html;
    });

    function renderTemplate(template) {
      if (template.type === 'tag') {
        return this.renderTag(template, scope).then(function (partial) {
          return partial === undefined ? '' : partial;
        });
      } else if (template.type === 'value') {
        return this.evalValue(template, scope).then(function (partial) {
          return partial === undefined ? '' : stringify(partial);
        });
      } else {
        // template.type === 'html'
        return Promise.resolve(template.value);
      }
    }
  },

  renderTag: function renderTag(template, scope) {
    if (template.name === 'continue') {
      return Promise.reject(new RenderBreakError('continue'));
    }
    if (template.name === 'break') {
      return Promise.reject(new RenderBreakError('break'));
    }
    return template.render(scope);
  },

  evalValue: function evalValue$$1(template, scope) {
    assert(scope, 'unable to evalValue: scope undefined');
    try {
      // console.log('template.filters', template.filters)
      return evalExp(template.initial, scope).then(function (initialValue) {
        // console.log('template.filters; initialValue', initialValue);
        return template.filters.reduce(function (promise, filter$$1) {
          return promise.then(function (prev) {
            return filter$$1.render(prev, scope).then(function (next) {
              // console.log('evalValue', {prev,next})
              return next;
            });
          });
        }, Promise.resolve(initialValue));
      });
    } catch (err) {
      return Promise.reject(err);
    }
  }
};

function stringify(val) {
  if (typeof val === 'string') {
    return val;
  } else if (null === val || undefined === val || EMPTY === val) {
    return '';
  } else {
    return JSON.stringify(val);
  }
}

var Render = function () {
  var instance = Object.create(render);
  return instance;
};

function hash$1(markup, scope) {
  var keys = [];
  var vals = [];
  var obj = {};
  var match;
  hashCapture.lastIndex = 0;
  while (match = hashCapture.exec(markup)) {
    var k = match[1];
    var v = match[2];
    keys.push(k);
    vals.push(evalValue(v, scope));
  }
  return Promise.all(vals).then(function (results) {
    results.forEach(function (v, i) {
      var k = keys[i];
      obj[k] = v;
    });
    return obj;
  });
}

var Tag = function () {
  var tagImpls = {};

  var _tagInstance = {
    render: function render(scope) {
      var _this = this;

      return hash$1(this.token.args, scope).then(function (obj) {
        var impl = _this.tagImpl;
        if (typeof impl.render !== 'function') {
          return Promise.resolve('');
        }
        return impl.render(scope, obj);
      });
    },
    parse: function parse(token, tokens) {
      this.type = 'tag';
      this.token = token;
      this.name = token.name;

      var tagImpl = tagImpls[this.name];
      assert(tagImpl, 'tag ' + this.name + ' not found');
      this.tagImpl = Object.create(tagImpl);
      if (this.tagImpl.parse) {
        this.tagImpl.parse(token, tokens);
      }
    }
  };

  function register(name, tag) {
    tagImpls[name] = tag;
  }

  function construct(token, tokens) {
    var instance = Object.create(_tagInstance);
    instance.parse(token, tokens);
    return instance;
  }

  function clear() {
    tagImpls = {};
  }

  return {
    construct: construct,
    register: register,
    clear: clear
  };
};

var valueRE = new RegExp('' + value.source, 'g');

var Filter = function (options) {
  options = assign({}, options);
  var filters = {};

  var _filterInstance = {
    render: function render(output, scope) {
      var _this = this;

      return Promise.all(this.args.map(function (arg) {
        return evalValue(arg, scope);
      })).then(function (args) {
        args.unshift(output);
        return _this.filter.apply(scope, args);
      });
    },
    parse: function parse(str) {
      var match = filterLine.exec(str);
      assert(match, 'illegal filter: ' + str);

      var name = match[1];
      var argList = match[2] || '';
      var filter$$1 = filters[name];
      if (typeof filter$$1 !== 'function') {
        if (options.strict_filters) {
          throw new TypeError('undefined filter: ' + name);
        }
        this.name = name;
        this.filter = function (x) {
          return x;
        };
        this.args = [];
        return this;
      }

      var args = [];
      while (match = valueRE.exec(argList.trim())) {
        var v = match[0];
        var re = new RegExp(v + '\\s*:', 'g');
        var keyMatch = re.exec(match.input);
        var currentMatchIsKey = keyMatch && keyMatch.index === match.index;
        currentMatchIsKey ? args.push('\'' + v + '\'') : args.push(v);
      }

      this.name = name;
      this.filter = filter$$1;
      this.args = args;

      return this;
    }
  };

  function construct(str) {
    var instance = Object.create(_filterInstance);
    return instance.parse(str);
  }

  function register(name, filter$$1) {
    filters[name] = filter$$1;
  }

  function clear() {
    filters = {};
  }

  return {
    construct: construct, register: register, clear: clear
  };
};

var Parser = function (Tag, Filter) {
  var stream = {
    init: function init(tokens) {
      this.tokens = tokens;
      this.handlers = {};
      return this;
    },
    on: function on(name, cb) {
      this.handlers[name] = cb;
      return this;
    },
    trigger: function trigger(event, arg) {
      var h = this.handlers[event];
      if (typeof h === 'function') {
        h(arg);
        return true;
      }
    },
    start: function start() {
      this.trigger('start');
      var token;
      while (!this.stopRequested && (token = this.tokens.shift())) {
        if (this.trigger('token', token)) continue;
        if (token.type === 'tag' && this.trigger('tag:' + token.name, token)) {
          continue;
        }
        var template = parseToken(token, this.tokens);
        this.trigger('template', template);
      }
      if (!this.stopRequested) this.trigger('end');
      return this;
    },
    stop: function stop() {
      this.stopRequested = true;
      return this;
    }
  };

  function parse(tokens) {
    var token;
    var templates = [];
    while (token = tokens.shift()) {
      templates.push(parseToken(token, tokens));
    }
    return templates;
  }

  function parseToken(token, tokens) {
    try {
      var tpl = null;
      if (token.type === 'tag') {
        tpl = parseTag(token, tokens);
      } else if (token.type === 'value') {
        tpl = parseValue(token.value);
      } else {
        // token.type === 'html'
        tpl = token;
      }
      tpl.token = token;
      return tpl;
    } catch (e) {
      throw new ParseError(e, token);
    }
  }

  function parseTag(token, tokens) {
    if (token.name === 'continue' || token.name === 'break') return token;
    return Tag.construct(token, tokens);
  }

  function parseValue(str) {
    var match = matchValue(str);
    assert(match, 'illegal value string: ' + str);

    var initial = match[0];
    str = str.substr(match.index + match[0].length);

    var filters = [];
    while (match = filter.exec(str)) {
      filters.push([match[0].trim()]);
    }

    return {
      type: 'value',
      initial: initial,
      filters: filters.map(function (str) {
        return Filter.construct(str);
      })
    };
  }

  function parseStream(tokens) {
    var s = Object.create(stream);
    return s.init(tokens);
  }

  return {
    parse: parse,
    parseTag: parseTag,
    parseStream: parseStream,
    parseValue: parseValue
  };
};

var re = new RegExp('(' + identifier.source + ')\\s*=(.*)');

var tag_assign = function (liquid) {
  liquid.registerTag('assign', {
    parse: function parse(token) {
      var match = token.args.match(re);
      assert(match, 'illegal token ' + token.raw);
      this.key = match[1];
      this.value = match[2];
    },
    render: function render(scope) {
      var _this = this;

      return evalValue(this.value, scope).then(function (value$$1) {
        scope.set(_this.key, value$$1);
        return '';
      });
    }
  });
};

var re$1 = new RegExp('(' + identifier.source + ')');

var tag_capture = function (liquid) {
  liquid.registerTag('capture', {
    parse: function parse(tagToken, remainTokens) {
      var _this = this;

      var match = tagToken.args.match(re$1);
      assert(match, tagToken.args + ' not valid identifier');

      this.variable = match[1];
      this.templates = [];

      var stream = liquid.parser.parseStream(remainTokens);
      stream.on('tag:endcapture', function (token) {
        return stream.stop();
      }).on('template', function (tpl) {
        return _this.templates.push(tpl);
      }).on('end', function (x) {
        throw new Error('tag ' + tagToken.raw + ' not closed');
      });
      stream.start();
    },
    render: function render(scope, hash$$1) {
      var _this2 = this;

      return liquid.renderer.renderTemplates(this.templates, scope).then(function (html) {
        scope.set(_this2.variable, html);
      });
    }
  });
};

var evaluateBranch = function evaluateBranch(val, cond) {
  return Promise.all([val, cond]).then(function (results) {
    return results[0] === results[1];
  });
};

var tag_case = function (liquid) {
  liquid.registerTag('case', {

    parse: function parse(tagToken, remainTokens) {
      var _this = this;

      this.cond = tagToken.args;
      this.cases = [];
      this.elseTemplates = [];

      var p = [];
      var stream = liquid.parser.parseStream(remainTokens).on('tag:when', function (token) {
        _this.cases.push({
          val: token.args,
          templates: p = []
        });
      }).on('tag:else', function () {
        return p = _this.elseTemplates;
      }).on('tag:endcase', function (token) {
        return stream.stop();
      }).on('template', function (tpl) {
        return p.push(tpl);
      }).on('end', function (x) {
        throw new Error('tag ' + tagToken.raw + ' not closed');
      });

      stream.start();
    },

    render: function render(scope, hash) {
      var _this2 = this;

      return firstSeries(this.cases, function (branch) {
        return new Promise(function (resolve, reject) {
          evaluateBranch(evalExp(branch.val, scope), evalExp(_this2.cond, scope)).then(function (found) {
            if (found) {
              resolve(liquid.renderer.renderTemplates(branch.templates, scope));
            } else {
              reject();
            }
          });
        });
      }, function () {
        return liquid.renderer.renderTemplates(_this2.elseTemplates, scope);
      });
    }
  });
};

var tag_comment = function (liquid) {
  liquid.registerTag('comment', {
    parse: function parse(tagToken, remainTokens) {
      var stream = liquid.parser.parseStream(remainTokens);
      stream.on('token', function (token) {
        if (token.name === 'endcomment') stream.stop();
      }).on('end', function (x) {
        throw new Error('tag ' + tagToken.raw + ' not closed');
      });
      stream.start();
    }
  });
};

var groupRE = new RegExp('^(?:(' + value.source + ')\\s*:\\s*)?(.*)$');
var candidatesRE = new RegExp(value.source, 'g');

var tag_cycle = function (liquid) {
  liquid.registerTag('cycle', {

    parse: function parse(tagToken, remainTokens) {
      var match = groupRE.exec(tagToken.args);
      assert(match, 'illegal tag: ' + tagToken.raw);

      this.group = match[1] || '';
      var candidates = match[2];

      this.candidates = [];

      while (match = candidatesRE.exec(candidates)) {
        this.candidates.push(match[0]);
      }
      assert(this.candidates.length, 'empty candidates: ' + tagToken.raw);
    },

    render: function render(scope, hash$$1) {
      var _this = this;

      return evalValue(this.group, scope).then(function (group) {
        var fingerprint = 'cycle:' + group + ':' + _this.candidates.join(',');

        var groups = scope.opts.groups = scope.opts.groups || {};
        var idx = groups[fingerprint];

        if (idx === undefined) {
          idx = groups[fingerprint] = 0;
        }

        var candidate = _this.candidates[idx];
        idx = (idx + 1) % _this.candidates.length;
        groups[fingerprint] = idx;
        return evalValue(candidate, scope);
      });
    }
  });
};

var tag_decrement = function (liquid) {
  liquid.registerTag('decrement', {
    parse: function parse(token) {
      var match = token.args.match(identifier);
      assert(match, 'illegal identifier ' + token.args);
      this.variable = match[0];
    },
    render: function render(scope, hash$$1) {
      var _this = this;

      return scope.get(this.variable).then(function (v) {
        if (typeof v !== 'number') v = 0;
        scope.set(_this.variable, v - 1);
      });
    }
  });
};

var re$2 = new RegExp('^(' + identifier.source + ')\\s+in\\s+' + ('(' + value.source + ')') + ('(?:\\s+' + hash.source + ')*') + '(?:\\s+(reversed))?' + ('(?:\\s+' + hash.source + ')*$'));

var tag_for = function (liquid) {
  liquid.registerTag('for', {

    parse: function parse(tagToken, remainTokens) {
      var _this = this;

      var match = re$2.exec(tagToken.args);
      assert(match, 'illegal tag: ' + tagToken.raw);
      this.variable = match[1];
      this.collection = match[2];
      this.reversed = !!match[3];

      this.templates = [];
      this.elseTemplates = [];

      var p;
      var stream = liquid.parser.parseStream(remainTokens).on('start', function () {
        return p = _this.templates;
      }).on('tag:else', function () {
        return p = _this.elseTemplates;
      }).on('tag:endfor', function () {
        return stream.stop();
      }).on('template', function (tpl) {
        return p.push(tpl);
      }).on('end', function () {
        throw new Error('tag ' + tagToken.raw + ' not closed');
      });

      stream.start();
    },

    render: function render(scope, hash$$1) {
      var _this2 = this;

      return evalExp(this.collection, scope).then(function (collection) {
        collection = collection || [];
        if (!Array.isArray(collection)) {
          if (isString(collection) && collection.length > 0) {
            collection = [collection];
          } else if (isObject(collection)) {
            collection = Object.keys(collection).map(function (key) {
              return collection[key];
            });
          }
        }
        if (!Array.isArray(collection) || !collection.length) {
          return liquid.renderer.renderTemplates(_this2.elseTemplates, scope);
        }

        var length = collection.length;
        var offset = hash$$1.offset || 0;
        var limit = hash$$1.limit === undefined ? collection.length : hash$$1.limit;

        collection = collection.slice(offset, offset + limit);
        if (_this2.reversed) collection.reverse();

        var contexts = collection.map(function (item, i) {
          var ctx = {};
          ctx[_this2.variable] = item;
          ctx.forloop = {
            first: i === 0,
            index: i + 1,
            index0: i,
            last: i === length - 1,
            length: length,
            rindex: length - i,
            rindex0: length - i - 1
          };
          return ctx;
        });

        var html = '';
        return mapSeries(contexts, function (context) {
          return Promise.resolve().then(function () {
            return scope.push(context);
          }).then(function () {
            return liquid.renderer.renderTemplates(_this2.templates, scope);
          }).then(function (partial) {
            return html += partial;
          }).catch(function (e) {
            if (e instanceof RenderBreakError) {
              html += e.resolvedHTML;
              if (e.message === 'continue') return;
            }
            throw e;
          }).then(function () {
            return scope.pop();
          });
        }).catch(function (e) {
          if (e instanceof RenderBreakError && e.message === 'break') {
            return;
          }
          throw e;
        }).then(function () {
          return html;
        });
      });
    }
  });
};

var tag_if = function (liquid) {
  liquid.registerTag('if', {

    parse: function parse(tagToken, remainTokens) {
      var _this = this;

      this.branches = [];
      this.elseTemplates = [];

      var p;
      var stream = liquid.parser.parseStream(remainTokens).on('start', function () {
        return _this.branches.push({
          cond: tagToken.args,
          templates: p = []
        });
      }).on('tag:elsif', function (token) {
        _this.branches.push({
          cond: token.args,
          templates: p = []
        });
      }).on('tag:else', function () {
        return p = _this.elseTemplates;
      }).on('tag:endif', function (token) {
        return stream.stop();
      }).on('template', function (tpl) {
        return p.push(tpl);
      }).on('end', function (x) {
        throw new Error('tag ' + tagToken.raw + ' not closed');
      });

      stream.start();
    },

    render: function render(scope, hash) {
      var _this2 = this;

      return firstSeries(this.branches, function (branch) {
        return new Promise(function (resolve, reject) {
          return evalExp(branch.cond, scope).then(function (cond) {
            if (isTruthy(cond)) {
              resolve(liquid.renderer.renderTemplates(branch.templates, scope));
            } else {
              reject();
            }
          });
        });
      }, function () {
        return liquid.renderer.renderTemplates(_this2.elseTemplates, scope);
      });
    }
  });
};

var withRE = new RegExp('with\\s+(' + value.source + ')');
var staticFileRE = /\S+/;

var tag_include = function (liquid) {
  liquid.registerTag('include', {
    parse: function parse(token) {
      var match = staticFileRE.exec(token.args);
      if (match) {
        this.staticValue = match[0];
      }

      match = value.exec(token.args);
      if (match) {
        this.value = match[0];
      }

      match = withRE.exec(token.args);
      if (match) {
        this.with = match[1];
      }
    },
    render: function render(scope, hash$$1) {
      var _this = this;

      return (scope.opts.dynamicPartials ? evalValue(this.value, scope) : Promise.resolve(this.staticValue)).then(function (filepath) {
        assert(filepath, 'cannot include with empty filename');
        var originBlocks = scope.opts.blocks;
        var originBlockMode = scope.opts.blockMode;
        scope.opts.blocks = {};
        scope.opts.blockMode = 'output';

        return (!_this.with ? Promise.resolve() : evalValue(_this.with, scope).then(function (result) {
          hash$$1[filepath] = result;
          return result;
        })).then(function () {
          return liquid.getTemplate(filepath, scope.opts.root).then(function (templates) {
            scope.push(hash$$1);
            return liquid.renderer.renderTemplates(templates, scope);
          }).then(function (html) {
            scope.pop();
            scope.opts.blocks = originBlocks;
            scope.opts.blockMode = originBlockMode;
            return html;
          });
        });
      });
    }
  });
};

var tag_increment = function (liquid) {
  liquid.registerTag('increment', {
    parse: function parse(token) {
      var match = token.args.match(identifier);
      assert(match, 'illegal identifier ' + token.args);
      this.variable = match[0];
    },
    render: function render(scope, hash$$1) {
      var _this = this;

      return scope.get(this.variable).then(function (v) {
        if (typeof v !== 'number') v = 0;
        scope.set(_this.variable, v + 1);
      });
    }
  });
};

var staticFileRE$1 = /\S+/;

/*
 * blockMode:
 * * "store": store rendered html into blocks
 * * "output": output rendered html
 */

var tag_layout = function (liquid) {
  liquid.registerTag('layout', {
    parse: function parse(token, remainTokens) {
      var match = staticFileRE$1.exec(token.args);
      if (match) {
        this.staticLayout = match[0];
      }

      match = value.exec(token.args);
      if (match) {
        this.layout = match[0];
      }

      this.tpls = liquid.parser.parse(remainTokens);
    },
    render: function render(scope, hash$$1) {
      var _this = this;

      return (scope.opts.dynamicPartials ? evalValue(this.layout, scope) : Promise.resolve(this.staticLayout)).then(function (layout) {
        assert(layout, 'cannot apply layout with empty filename');

        // render the remaining tokens immediately
        scope.opts.blockMode = 'store';
        return liquid.renderer.renderTemplates(_this.tpls, scope).then(function (html) {
          if (scope.opts.blocks[''] === undefined) {
            scope.opts.blocks[''] = html;
          }
          return liquid.getTemplate(layout, scope.opts.root);
        }).then(function (templates) {
          // push the hash
          scope.push(hash$$1);
          scope.opts.blockMode = 'output';
          return liquid.renderer.renderTemplates(templates, scope);
        })
        // pop the hash
        .then(function (partial) {
          scope.pop();
          return partial;
        });
      });
    }
  });

  liquid.registerTag('block', {
    parse: function parse(token, remainTokens) {
      var _this2 = this;

      var match = /\w+/.exec(token.args);
      this.block = match ? match[0] : '';

      this.tpls = [];
      var stream = liquid.parser.parseStream(remainTokens).on('tag:endblock', function () {
        return stream.stop();
      }).on('template', function (tpl) {
        return _this2.tpls.push(tpl);
      }).on('end', function () {
        throw new Error('tag ' + token.raw + ' not closed');
      });
      stream.start();
    },
    render: function render(scope) {
      var _this3 = this;

      return Promise.resolve(scope.opts.blocks[this.block]).then(function (html) {
        return html === undefined
        // render default block
        ? liquid.renderer.renderTemplates(_this3.tpls, scope)
        // use child-defined block
        : html;
      }).then(function (html) {
        if (scope.opts.blockMode === 'store') {
          scope.opts.blocks[_this3.block] = html;
          return '';
        }
        return html;
      });
    }
  });
};

var tag_raw = function (liquid) {
  liquid.registerTag('raw', {
    parse: function parse(tagToken, remainTokens) {
      var _this = this;

      this.tokens = [];

      var stream = liquid.parser.parseStream(remainTokens);
      stream.on('token', function (token) {
        if (token.name === 'endraw') stream.stop();else _this.tokens.push(token);
      }).on('end', function (x) {
        throw new Error('tag ' + tagToken.raw + ' not closed');
      });
      stream.start();
    },
    render: function render(scope, hash) {
      var tokens = this.tokens.map(function (token) {
        return token.raw;
      }).join('');
      return Promise.resolve(tokens);
    }
  });
};

var re$3 = new RegExp('^(' + identifier.source + ')\\s+in\\s+' + ('(' + value.source + ')') + ('(?:\\s+' + hash.source + ')*$'));

var tag_tablerow = function (liquid) {
  liquid.registerTag('tablerow', {

    parse: function parse(tagToken, remainTokens) {
      var _this = this;

      var match = re$3.exec(tagToken.args);
      assert(match, 'illegal tag: ' + tagToken.raw);

      this.variable = match[1];
      this.collection = match[2];
      this.templates = [];

      var p;
      var stream = liquid.parser.parseStream(remainTokens).on('start', function () {
        return p = _this.templates;
      }).on('tag:endtablerow', function (token) {
        return stream.stop();
      }).on('template', function (tpl) {
        return p.push(tpl);
      }).on('end', function () {
        throw new Error('tag ' + tagToken.raw + ' not closed');
      });

      stream.start();
    },

    render: function render(scope, hash$$1) {
      var _this2 = this;

      return evalExp(this.collection, scope).then(function (collection) {
        collection = collection || [];
        var html = '<table>';
        var offset = hash$$1.offset || 0;
        var limit = hash$$1.limit === undefined ? collection.length : hash$$1.limit;

        var cols = hash$$1.cols;
        var row;
        var col;
        if (!cols) throw new Error('illegal cols: ' + cols);

        // build array of arguments to pass to sequential promises...
        collection = collection.slice(offset, offset + limit);
        var contexts = [];
        collection.some(function (item, i) {
          var ctx = {};
          ctx[_this2.variable] = item;
          contexts.push(ctx);
        });

        return mapSeries(contexts, function (context, idx) {
          row = Math.floor(idx / cols) + 1;
          col = idx % cols + 1;
          if (col === 1) {
            if (row !== 1) {
              html += '</tr>';
            }
            html += '<tr class="row' + row + '">';
          }

          html += '<td class="col' + col + '">';
          scope.push(context);
          return liquid.renderer.renderTemplates(_this2.templates, scope).then(function (partial) {
            scope.pop(context);
            html += partial;
            html += '</td>';
            return html;
          });
        }).then(function () {
          if (row > 0) {
            html += '</tr>';
          }
          html += '</table>';
          return html;
        });
      });
    }
  });
};

var tag_unless = function (liquid) {
  liquid.registerTag('unless', {
    parse: function parse(tagToken, remainTokens) {
      var _this = this;

      this.templates = [];
      this.elseTemplates = [];
      var p;
      var stream = liquid.parser.parseStream(remainTokens).on('start', function (x) {
        p = _this.templates;
        _this.cond = tagToken.args;
      }).on('tag:else', function () {
        return p = _this.elseTemplates;
      }).on('tag:endunless', function (token) {
        return stream.stop();
      }).on('template', function (tpl) {
        return p.push(tpl);
      }).on('end', function (x) {
        throw new Error('tag ' + tagToken.raw + ' not closed');
      });

      stream.start();
    },

    render: function render(scope, hash) {
      var _this2 = this;

      return evalExp(this.cond, scope).then(function (cond) {
        return isFalsy(cond) ? liquid.renderer.renderTemplates(_this2.templates, scope) : liquid.renderer.renderTemplates(_this2.elseTemplates, scope);
      });
    }
  });
};

var tags = function (engine) {
  [tag_assign, tag_capture, tag_case, tag_comment, tag_cycle, tag_decrement, tag_for, tag_if, tag_include, tag_increment, tag_layout, tag_raw, tag_tablerow, tag_unless].forEach(function (registerTag) {
    return registerTag(engine);
  });
};

var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var dayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var suffixes = {
  1: 'st',
  2: 'nd',
  3: 'rd',
  'default': 'th'

  // prototype extensions
};var _date = {
  daysInMonth: function daysInMonth(d) {
    var feb = _date.isLeapYear(d) ? 29 : 28;
    return [31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  },

  getDayOfYear: function getDayOfYear(d) {
    var num = 0;
    for (var i = 0; i < d.getMonth(); ++i) {
      num += _date.daysInMonth(d)[i];
    }
    return num + d.getDate();
  },

  // Startday is an integer of which day to start the week measuring from
  // TODO: that comment was retarted. fix it.
  getWeekOfYear: function getWeekOfYear(d, startDay) {
    // Skip to startDay of this week
    var now = this.getDayOfYear(d) + (startDay - d.getDay());
    // Find the first startDay of the year
    var jan1 = new Date(d.getFullYear(), 0, 1);
    var then = 7 - jan1.getDay() + startDay;
    return _number.pad(Math.floor((now - then) / 7) + 1, 2);
  },

  isLeapYear: function isLeapYear(d) {
    var year = d.getFullYear();
    return !!((year & 3) === 0 && (year % 100 || year % 400 === 0 && year));
  },

  getSuffix: function getSuffix(d) {
    var str = d.getDate().toString();
    var index = parseInt(str.slice(-1));
    return suffixes[index] || suffixes['default'];
  },

  century: function century(d) {
    return parseInt(d.getFullYear().toString().substring(0, 2), 10);
  }
};

var _number = {
  pad: function pad(value, size, ch) {
    if (!ch) ch = '0';
    var result = value.toString();
    var pad = size - result.length;

    while (pad-- > 0) {
      result = ch + result;
    }

    return result;
  }
};

var formatCodes = {
  a: function a(d) {
    return dayNamesShort[d.getDay()];
  },
  A: function A(d) {
    return dayNames[d.getDay()];
  },
  b: function b(d) {
    return monthNamesShort[d.getMonth()];
  },
  B: function B(d) {
    return monthNames[d.getMonth()];
  },
  c: function c(d) {
    return d.toLocaleString();
  },
  C: function C(d) {
    return _date.century(d);
  },
  d: function d(_d) {
    return _number.pad(_d.getDate(), 2);
  },
  e: function e(d) {
    return _number.pad(d.getDate(), 2, ' ');
  },
  H: function H(d) {
    return _number.pad(d.getHours(), 2);
  },
  I: function I(d) {
    return _number.pad(d.getHours() % 12 || 12, 2);
  },
  j: function j(d) {
    return _number.pad(_date.getDayOfYear(d), 3);
  },
  k: function k(d) {
    return _number.pad(d.getHours(), 2, ' ');
  },
  l: function l(d) {
    return _number.pad(d.getHours() % 12 || 12, 2, ' ');
  },
  L: function L(d) {
    return _number.pad(d.getMilliseconds(), 3);
  },
  m: function m(d) {
    return _number.pad(d.getMonth() + 1, 2);
  },
  M: function M(d) {
    return _number.pad(d.getMinutes(), 2);
  },
  p: function p(d) {
    return d.getHours() < 12 ? 'AM' : 'PM';
  },
  P: function P(d) {
    return d.getHours() < 12 ? 'am' : 'pm';
  },
  q: function q(d) {
    return _date.getSuffix(d);
  },
  s: function s(d) {
    return Math.round(d.valueOf() / 1000);
  },
  S: function S(d) {
    return _number.pad(d.getSeconds(), 2);
  },
  u: function u(d) {
    return d.getDay() || 7;
  },
  U: function U(d) {
    return _date.getWeekOfYear(d, 0);
  },
  w: function w(d) {
    return d.getDay();
  },
  W: function W(d) {
    return _date.getWeekOfYear(d, 1);
  },
  x: function x(d) {
    return d.toLocaleDateString();
  },
  X: function X(d) {
    return d.toLocaleTimeString();
  },
  y: function y(d) {
    return d.getFullYear().toString().substring(2, 4);
  },
  Y: function Y(d) {
    return d.getFullYear();
  },
  z: function z(d) {
    var tz = d.getTimezoneOffset() / 60 * 100;
    return (tz > 0 ? '-' : '+') + _number.pad(Math.abs(tz), 4);
  },
  '%': function _() {
    return '%';
  }
};
formatCodes.h = formatCodes.b;
formatCodes.N = formatCodes.L;

var strftime = function (d, format) {
  var output = '';
  var remaining = format;

  while (true) {
    var r = /%./g;
    var results = r.exec(remaining);

    // No more format codes. Add the remaining text and return
    if (!results) {
      return output + remaining;
    }

    // Add the preceding text
    output += remaining.slice(0, r.lastIndex - 2);
    remaining = remaining.slice(r.lastIndex);

    // Add the format code
    var ch = results[0].charAt(1);
    var func = formatCodes[ch];
    output += func ? func.call(this, d) : '%' + ch;
  }
};

function argsToObject(args) {
  var obj = {};
  for (var i = 0; i < args.length; i += 2) {
    var key = args[i];
    var value = args[i + 1];
    obj[key] = value;
  }
  return obj;
}

var delimiters$1 = ['\'', '"'];

function matchRightBracket$1(str, begin) {
  var stack = 1; // count of '[' - count of ']'
  for (var i = begin; i < str.length; i++) {
    if (str[i] === '[') {
      stack++;
    }
    if (str[i] === ']') {
      stack--;
      if (stack === 0) {
        return i;
      }
    }
  }
  return -1;
}

function splitPath(str) {
  var strLen = str.length;
  var tokens = [];
  for (var cursor = 0; cursor < strLen;) {
    // log('[loop]', str[cursor]);
    switch (str[cursor]) {
      case '[':
        var delimiter = str[cursor + 1];
        if (delimiters$1.indexOf(delimiter) > -1) {
          // access by quoted name: foo["bar"]
          var nameEndIndex = str.indexOf(delimiter, cursor + 2);
          if (nameEndIndex < 0) {
            throw new AssertionError('unbalanced ' + delimiter + ': "' + str + '"');
          }
          var nameToken = str.slice(cursor + 2, nameEndIndex);
          tokens.push(nameToken);
          cursor = nameEndIndex + 2; // the closing " and ]
          // log('BRACKET w/delimiter',nameEndIndex, nameToken);
        } else {
          // access by variable: foo[bar.coo]
          var variableEndIndex = matchRightBracket$1(str, cursor + 1);
          if (variableEndIndex < 0) {
            throw new AssertionError('unbalanced []: "' + str + '"');
          }
          var variableToken = str.slice(cursor + 1, variableEndIndex);
          if (isInteger(variableToken)) {
            // foo[1]
            // log('BRACKET; number', variableToken);
            tokens.push(variableToken);
          } else {
            // log('BRACKET; name', variableToken);
            tokens.push(this.get(variableToken));
          }
          cursor = variableEndIndex + 1;
        }
        break;
      case '.':
        // separator: foo.bar, foo[0].bar
        cursor++;
        // log('DOT');
        break;
      default:
        // access by unquoted name: foo.bar
        var nextBracketIndex = str.indexOf('[', cursor);
        var nextDotIndex = str.indexOf('.', cursor);
        var foundIndexes = [strLen, nextBracketIndex, nextDotIndex].filter(function (index) {
          return index > -1;
        });
        var nextSeparator = Math.min.apply(Math, foundIndexes);
        var unquotedNameToken = str.slice(cursor, nextSeparator);
        // log('DEFAULT', {nextBracketIndex,nextDotIndex,nextSeparator,unquotedNameToken});
        tokens.push(unquotedNameToken);
        cursor = nextSeparator;
        break;
    }
  }
  return tokens;
}

var Locale = function () {
  function Locale(translation, id) {
    classCallCheck(this, Locale);

    this.translation = translation;
    this.id = id;
  }

  createClass(Locale, [{
    key: 'splitPath',
    value: function splitPath$$1(str) {
      return splitPath(str);
    }
  }, {
    key: 'translate',
    value: function translate(str) {
      var tokens = this.splitPath(str);
      return tokens.reduce(function (value, currentValue) {
        if (currentValue in value) {
          return value[currentValue];
        } else {
          throw new Error('invalid translation key: "' + str + '"');
        }
      }, this.translation);
    }
  }]);
  return Locale;
}();

Locale.LOCALE_SCOPE_KEY = '_liquid_locale';

var LOCALE_SCOPE_KEY = Locale.LOCALE_SCOPE_KEY;

var escapeMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&#34;',
  "'": '&#39;'
};
var unescapeMap = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&#34;': '"',
  '&#39;': "'"
};

var createFilters = function createFilters(liquid) {
  var filters = {
    'abs': function abs(v) {
      return Math.abs(v);
    },
    'append': function append(v, arg) {
      return v + arg;
    },
    'capitalize': function capitalize(str) {
      return stringify$1(str).charAt(0).toUpperCase() + str.slice(1);
    },
    'ceil': function ceil(v) {
      return Math.ceil(v);
    },
    'concat': function concat(v, arg) {
      return Array.prototype.concat.call(v, arg);
    },
    'date': function date(v, arg) {
      var date = v;
      if (v === 'now') {
        date = new Date();
      } else if (isString(v)) {
        date = new Date(v);
      }
      return isValidDate(date) ? strftime(date, arg) : v;
    },
    'default': function _default(v, arg) {
      return isTruthy(v) ? v : arg;
    },
    'divided_by': function divided_by(v, arg) {
      return Math.floor(v / arg);
    },
    'downcase': function downcase(v) {
      return v.toLowerCase();
    },
    'escape': escape,

    'escape_once': function escape_once(str) {
      return escape(unescape(str));
    },
    'first': function first(v) {
      return v[0];
    },
    'floor': function floor(v) {
      return Math.floor(v);
    },
    'join': function join(v, arg) {
      return Array.isArray(v) ? v.join(arg) : v;
    },
    'last': function last$$1(v) {
      return v[v.length - 1];
    },
    'lstrip': function lstrip(v) {
      return stringify$1(v).replace(/^\s+/, '');
    },
    'map': function map(arr, arg) {
      return arr.map(function (v) {
        return v[arg];
      });
    },
    'minus': bindFixed(function (v, arg) {
      return v - arg;
    }),
    'modulo': bindFixed(function (v, arg) {
      return v % arg;
    }),
    'newline_to_br': function newline_to_br(v) {
      return v.replace(/\n/g, '<br />');
    },
    'plus': bindFixed(function (v, arg) {
      return Number(v) + Number(arg);
    }),
    'prepend': function prepend(v, arg) {
      return arg + v;
    },
    'remove': function remove(v, arg) {
      return v.split(arg).join('');
    },
    'remove_first': function remove_first(v, l) {
      return v.replace(l, '');
    },
    'replace': function replace(v, pattern, replacement) {
      return stringify$1(v).split(pattern).join(replacement);
    },
    'replace_first': function replace_first(v, arg1, arg2) {
      return stringify$1(v).replace(arg1, arg2);
    },
    'reverse': function reverse(v) {
      return v.reverse();
    },
    'round': function round(v, arg) {
      var amp = Math.pow(10, arg || 0);
      return Math.round(v * amp, arg) / amp;
    },
    'rstrip': function rstrip(str) {
      return stringify$1(str).replace(/\s+$/, '');
    },
    'size': function size(v) {
      return v.length;
    },
    'slice': function slice(v, begin, length) {
      return v.substr(begin, length === undefined ? 1 : length);
    },
    'sort': function sort(v, arg) {
      return v.sort(arg);
    },
    'split': function split(v, arg) {
      return stringify$1(v).split(arg);
    },
    'strip': function strip(v) {
      return stringify$1(v).trim();
    },
    'strip_html': function strip_html(v) {
      return stringify$1(v).replace(/<\/?\s*\w+\s*\/?>/g, '');
    },
    'strip_newlines': function strip_newlines(v) {
      return stringify$1(v).replace(/\n/g, '');
    },
    'times': function times(v, arg) {
      return v * arg;
    },
    'truncate': function truncate(v, l, o) {
      v = stringify$1(v);
      o = o === undefined ? '...' : o;
      l = l || 16;
      if (v.length <= l) return v;
      return v.substr(0, l - o.length) + o;
    },
    'truncatewords': function truncatewords(v, l, o) {
      if (o === undefined) o = '...';
      var arr = v.split(' ');
      var ret = arr.slice(0, l).join(' ');
      if (arr.length > l) ret += o;
      return ret;
    },
    'uniq': function uniq$$1(arr) {
      var u = {};
      return (arr || []).filter(function (val) {
        if (u.hasOwnProperty(val)) {
          return false;
        }
        u[val] = true;
        return true;
      });
    },
    'upcase': function upcase(str) {
      return stringify$1(str).toUpperCase();
    },
    'url_encode': encodeURIComponent,
    'translate': function translate() {
      var scope = this;
      var args = Array.from(arguments);
      var v = args.shift();
      var context = argsToObject(args);
      return scope.get(LOCALE_SCOPE_KEY).then(function (scopeLocales) {
        var locales = [];
        if (scopeLocales && scopeLocales.length > 0) {
          if (!Array.isArray(scopeLocales)) {
            throw new Error('scope locales must be array; "' + (typeof scopeLocales === 'undefined' ? 'undefined' : _typeof(scopeLocales)) + '" provided');
          }
          locales.push.apply(locales, scopeLocales);
        }
        if (liquid.options.locale) {
          // add/check last
          locales.push(liquid.options.locale);
        }
        if (locales.length) {
          for (var i = 0; i < locales.length; i++) {
            var locale = locales[i];
            var translation = void 0;
            try {
              translation = locale.translate(v);
            } catch (err) {
              if (err.message.indexOf('invalid translation key') > -1) {
                continue; // not found.  try next locale
              } else {
                throw err;
              }
            }
            var countExists = 'count' in context;
            var notNull = null !== translation && undefined !== translation;
            var typeIsObject = (typeof translation === 'undefined' ? 'undefined' : _typeof(translation)) === 'object';
            if (countExists && notNull && typeIsObject) {
              var count = context.count;

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
            return liquid.parseAndRender(translation, context);
          }
          // it wasn't found in any of the provided locales
          throw new Error('invalid translation key: "' + v + '"; not found in any of the provided locales');
        } else {
          return '';
        }
      });
    }
  };
  // alias
  filters.t = filters.translate;
  return filters;
};

function escape(str) {
  return stringify$1(str).replace(/&|<|>|"|'/g, function (m) {
    return escapeMap[m];
  });
}

function unescape(str) {
  return stringify$1(str).replace(/&(amp|lt|gt|#34|#39);/g, function (m) {
    return unescapeMap[m];
  });
}

function getFixed(v) {
  var p = (v + '').split('.');
  return p.length > 1 ? p[1].length : 0;
}

function getMaxFixed(l, r) {
  return Math.max(getFixed(l), getFixed(r));
}

function stringify$1(obj) {
  return obj + '';
}

function bindFixed(cb) {
  return function (l, r) {
    var f = getMaxFixed(l, r);
    return cb(l, r).toFixed(f);
  };
}

function registerAll(liquid) {
  var filters = createFilters(liquid);
  return forOwn(filters, function (func, name) {
    return liquid.registerFilter(name, func);
  });
}

function isValidDate(date) {
  return date instanceof Date && !isNaN(date.getTime());
}

var _engine = {
  init: function init(tag, filter, options) {
    if (options.cache) {
      this.cache = {};
    }
    this.options = options;
    this.tag = tag;
    this.filter = filter;
    this.parser = Parser(tag, filter);
    this.renderer = Render();

    tags(this);
    registerAll(this);

    return this;
  },
  loadTranslation: function loadTranslation(translation, id) {
    this.options.locale = new Locale(translation, id);
  },
  tokenize: function tokenize(html, filepath) {
    var tokens = parse(html, filepath, this.options);
    return tokens;
  },
  parse: function parse$$1(html, filepath) {
    var tokens = this.tokenize(html, filepath);
    return this.parser.parse(tokens);
  },
  render: function render(tpl, ctx, opts) {
    opts = assign({}, this.options, opts);
    var scope = createScope(ctx, opts);
    return this.renderer.renderTemplates(tpl, scope);
  },
  parseAndRender: function parseAndRender(html, ctx, opts) {
    var _this = this;

    return Promise.resolve().then(function () {
      return _this.parse(html);
    }).then(function (tpl) {
      return _this.render(tpl, ctx, opts);
    });
  },
  renderFile: function renderFile(filepath, ctx, opts) {
    var _this2 = this;

    opts = assign({}, opts);
    return this.getTemplate(filepath, opts.root).then(function (templates) {
      return _this2.render(templates, ctx, opts);
    });
  },
  evalValue: function evalValue$$1(str, scope) {
    var tpl = this.parser.parseValue(str.trim());
    return this.renderer.evalValue(tpl, scope);
  },
  registerFilter: function registerFilter(name, filter) {
    return this.filter.register(name, filter);
  },
  registerTag: function registerTag(name, tag) {
    return this.tag.register(name, tag);
  },
  lookup: function lookup(filepath, root) {
    root = this.options.root.concat(root || []);
    root = uniq(root);
    var paths = root.map(function (root) {
      return path.resolve(root, filepath);
    });
    return anySeries(paths, function (path$$1) {
      return statFileAsync(path$$1).then(function () {
        return path$$1;
      });
    }).catch(function (e) {
      e.message = e.code + ': Failed to lookup ' + filepath + ' in: ' + root;
      throw e;
    });
  },
  getTemplate: function getTemplate(filepath, root) {
    var _this3 = this;

    if (this.options.templateProvider) {
      return this.options.templateProvider(filepath).then(function (str) {
        var tpl = _this3.parse(str);
        if (_this3.options.cache) {
          _this3.cache[filepath] = tpl;
        }
        return tpl;
      });
    } else {
      return typeof XMLHttpRequest === 'undefined' ? this.getTemplateFromFile(filepath, root) : this.getTemplateFromUrl(filepath, root);
    }
  },
  getTemplateFromFile: function getTemplateFromFile(filepath, root) {
    var _this4 = this;

    if (!path.extname(filepath)) {
      filepath += this.options.extname;
    }
    return this.lookup(filepath, root).then(function (filepath) {
      if (_this4.options.cache) {
        var tpl = _this4.cache[filepath];
        if (tpl) {
          return Promise.resolve(tpl);
        }
        return readFileAsync(filepath).then(function (str) {
          return _this4.parse(str);
        }).then(function (tpl) {
          return _this4.cache[filepath] = tpl;
        });
      } else {
        return readFileAsync(filepath).then(function (str) {
          return _this4.parse(str, filepath);
        });
      }
    });
  },
  getTemplateFromUrl: function getTemplateFromUrl(filepath, root) {
    var _this5 = this;

    var fullUrl;
    if (valid(filepath)) {
      fullUrl = filepath;
    } else {
      if (!extname(filepath)) {
        filepath += this.options.extname;
      }
      fullUrl = resolve(root || this.options.root, filepath);
    }
    if (this.options.cache) {
      var tpl = this.cache[filepath];
      if (tpl) {
        return Promise.resolve(tpl);
      }
    }
    return new Promise(function (resolve$$1, reject) {
      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          var tpl = _this5.parse(xhr.responseText);
          if (_this5.options.cache) {
            _this5.cache[filepath] = tpl;
          }
          resolve$$1(tpl);
        } else {
          reject(new Error(xhr.statusText));
        }
      };
      xhr.onerror = function () {
        reject(new Error('An error occurred whilst sending the response.'));
      };
      xhr.open('GET', fullUrl);
      xhr.send();
    });
  },
  express: function express(opts) {
    opts = opts || {};
    var self = this;
    return function (filePath, ctx, callback) {
      assert(Array.isArray(this.root) || isString(this.root), 'illegal views root, are you using express.js?');
      opts.root = this.root;
      self.renderFile(filePath, ctx, opts).then(function (html) {
        return callback(null, html);
      }).catch(function (e) {
        return callback(e);
      });
    };
  }
};

function normalizeStringArray(value) {
  if (Array.isArray(value)) return value;
  if (isString(value)) return [value];
  return [];
}

function createEngine(options) {
  options = assign({
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
    locale: null
  }, options);
  options.root = normalizeStringArray(options.root);

  var engine = Object.create(_engine);
  engine.init(Tag(), Filter(options), options);
  return engine;
}

export { Locale, lexical, syntax as Syntax, error$1 as Errors, argsToObject, SafeObject, createEngine };
//# sourceMappingURL=liquidjs.es2015.js.map
