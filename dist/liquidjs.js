(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used to compose bitmasks for comparison styles. */
var UNORDERED_COMPARE_FLAG = 1,
    PARTIAL_COMPARE_FLAG = 2;

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/,
    reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * The base implementation of `_.sortBy` which uses `comparer` to define the
 * sort order of `array` and replaces criteria objects with their corresponding
 * values.
 *
 * @private
 * @param {Array} array The array to sort.
 * @param {Function} comparer The function to define sort order.
 * @returns {Array} Returns `array`.
 */
function baseSortBy(array, comparer) {
  var length = array.length;

  array.sort(comparer);
  while (length--) {
    array[length] = array[length].value;
  }
  return array;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice,
    spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object),
    nativeMax = Math.max;

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values ? values.length : 0;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  this.__data__ = new ListCache(entries);
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  return this.__data__['delete'](key);
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var cache = this.__data__;
  if (cache instanceof ListCache) {
    var pairs = cache.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      return this;
    }
    cache = this.__data__ = new MapCache(pairs);
  }
  cache.set(key, value);
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach = createBaseEach(baseForOwn);

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = isKey(path, object) ? [path] : castPath(path);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

/**
 * The base implementation of `getTag`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  return objectToString.call(value);
}

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {boolean} [bitmask] The bitmask of comparison flags.
 *  The bitmask may be composed of the following flags:
 *     1 - Unordered comparison
 *     2 - Partial comparison
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, customizer, bitmask, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
}

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = getTag(object);
    objTag = objTag == argsTag ? objectTag : objTag;
  }
  if (!othIsArr) {
    othTag = getTag(other);
    othTag = othTag == argsTag ? objectTag : othTag;
  }
  var objIsObj = objTag == objectTag && !isHostObject(object),
      othIsObj = othTag == objectTag && !isHostObject(other),
      isSameTag = objTag == othTag;

  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
      : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
  }
  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
}

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
}

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (typeof value == 'object') {
    return isArray(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.map` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function baseMap(collection, iteratee) {
  var index = -1,
      result = isArrayLike(collection) ? Array(collection.length) : [];

  baseEach(collection, function(value, key, collection) {
    result[++index] = iteratee(value, key, collection);
  });
  return result;
}

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
  };
}

/**
 * The base implementation of `_.orderBy` without param guards.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
 * @param {string[]} orders The sort orders of `iteratees`.
 * @returns {Array} Returns the new sorted array.
 */
function baseOrderBy(collection, iteratees, orders) {
  var index = -1;
  iteratees = arrayMap(iteratees.length ? iteratees : [identity], baseUnary(baseIteratee));

  var result = baseMap(collection, function(value, key, collection) {
    var criteria = arrayMap(iteratees, function(iteratee) {
      return iteratee(value);
    });
    return { 'criteria': criteria, 'index': ++index, 'value': value };
  });

  return baseSortBy(result, function(object, other) {
    return compareMultiple(object, other, orders);
  });
}

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value) {
  return isArray(value) ? value : stringToPath(value);
}

/**
 * Compares values to sort them in ascending order.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {number} Returns the sort order indicator for `value`.
 */
function compareAscending(value, other) {
  if (value !== other) {
    var valIsDefined = value !== undefined,
        valIsNull = value === null,
        valIsReflexive = value === value,
        valIsSymbol = isSymbol(value);

    var othIsDefined = other !== undefined,
        othIsNull = other === null,
        othIsReflexive = other === other,
        othIsSymbol = isSymbol(other);

    if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
        (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
        (valIsNull && othIsDefined && othIsReflexive) ||
        (!valIsDefined && othIsReflexive) ||
        !valIsReflexive) {
      return 1;
    }
    if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
        (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
        (othIsNull && valIsDefined && valIsReflexive) ||
        (!othIsDefined && valIsReflexive) ||
        !othIsReflexive) {
      return -1;
    }
  }
  return 0;
}

/**
 * Used by `_.orderBy` to compare multiple properties of a value to another
 * and stable sort them.
 *
 * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
 * specify an order of "desc" for descending or "asc" for ascending sort order
 * of corresponding values.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {boolean[]|string[]} orders The order to sort by for each property.
 * @returns {number} Returns the sort order indicator for `object`.
 */
function compareMultiple(object, other, orders) {
  var index = -1,
      objCriteria = object.criteria,
      othCriteria = other.criteria,
      length = objCriteria.length,
      ordersLength = orders.length;

  while (++index < length) {
    var result = compareAscending(objCriteria[index], othCriteria[index]);
    if (result) {
      if (index >= ordersLength) {
        return result;
      }
      var order = orders[index];
      return result * (order == 'desc' ? -1 : 1);
    }
  }
  // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
  // that causes it, under certain circumstances, to provide the same value for
  // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
  // for more details.
  //
  // This also ensures a stable sort in V8 and other engines.
  // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
  return object.index - other.index;
}

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & UNORDERED_COMPARE_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!seen.has(othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
              return seen.add(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, customizer, bitmask, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= UNORDERED_COMPARE_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
      objProps = keys(object),
      objLength = objProps.length,
      othProps = keys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, isStrictComparable(value)];
  }
  return result;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11,
// for data views in Edge < 14, and promises in Node.js.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = objectToString.call(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : undefined;

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = isKey(path, object) ? [path] : castPath(path);

  var result,
      index = -1,
      length = path.length;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result) {
    return result;
  }
  var length = object ? object.length : 0;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray(object) || isArguments(object));
}

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoize(function(string) {
  string = toString(string);

  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Creates an array of elements, sorted in ascending order by the results of
 * running each element in a collection thru each iteratee. This method
 * performs a stable sort, that is, it preserves the original sort order of
 * equal elements. The iteratees are invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {...(Function|Function[])} [iteratees=[_.identity]]
 *  The iteratees to sort by.
 * @returns {Array} Returns the new sorted array.
 * @example
 *
 * var users = [
 *   { 'user': 'fred',   'age': 48 },
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred',   'age': 40 },
 *   { 'user': 'barney', 'age': 34 }
 * ];
 *
 * _.sortBy(users, function(o) { return o.user; });
 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
 *
 * _.sortBy(users, ['user', 'age']);
 * // => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
 *
 * _.sortBy(users, 'user', function(o) {
 *   return Math.floor(o.age / 10);
 * });
 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
 */
var sortBy = baseRest(function(collection, iteratees) {
  if (collection == null) {
    return [];
  }
  var length = iteratees.length;
  if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
    iteratees = [];
  } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
    iteratees = [iteratees[0]];
  }
  return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
});

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Assign cache to `_.memoize`.
memoize.Cache = MapCache;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

module.exports = sortBy;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(4)(module)))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array ? array.length : 0;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  if (value !== value) {
    return baseFindIndex(array, baseIsNaN, fromIndex);
  }
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

/**
 * Checks if a cache value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var splice = arrayProto.splice;

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map'),
    Set = getNative(root, 'Set'),
    nativeCreate = getNative(Object, 'create');

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values ? values.length : 0;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */
function baseUniq(array, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      length = array.length,
      isCommon = true,
      result = [],
      seen = result;

  if (comparator) {
    isCommon = false;
    includes = arrayIncludesWith;
  }
  else if (length >= LARGE_ARRAY_SIZE) {
    var set = iteratee ? null : createSet(array);
    if (set) {
      return setToArray(set);
    }
    isCommon = false;
    includes = cacheHas;
    seen = new SetCache;
  }
  else {
    seen = iteratee ? [] : result;
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        seen.push(computed);
      }
      result.push(value);
    }
    else if (!includes(seen, computed, comparator)) {
      if (seen !== result) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

/**
 * Creates a set object of `values`.
 *
 * @private
 * @param {Array} values The values to add to the set.
 * @returns {Object} Returns the new set.
 */
var createSet = !(Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY) ? noop : function(values) {
  return new Set(values);
};

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Creates a duplicate-free version of an array, using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons, in which only the first occurrence of each
 * element is kept.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @returns {Array} Returns the new duplicate free array.
 * @example
 *
 * _.uniq([2, 1, 2]);
 * // => [2, 1]
 */
function uniq(array) {
  return (array && array.length)
    ? baseUniq(array)
    : [];
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

module.exports = uniq;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "Locale", function() { return /* reexport */ locale_Locale; });
__webpack_require__.d(__webpack_exports__, "lexical", function() { return /* reexport */ lexical_namespaceObject; });
__webpack_require__.d(__webpack_exports__, "Syntax", function() { return /* reexport */ syntax_namespaceObject; });
__webpack_require__.d(__webpack_exports__, "Errors", function() { return /* reexport */ error_namespaceObject; });
__webpack_require__.d(__webpack_exports__, "argsToObject", function() { return /* reexport */ argsToObject; });
__webpack_require__.d(__webpack_exports__, "SafeObject", function() { return /* reexport */ SafeObject; });
__webpack_require__.d(__webpack_exports__, "strftime", function() { return /* reexport */ strftime; });
__webpack_require__.d(__webpack_exports__, "createEngine", function() { return /* binding */ createEngine; });

// NAMESPACE OBJECT: ./src/lexical.js
var lexical_namespaceObject = {};
__webpack_require__.r(lexical_namespaceObject);
__webpack_require__.d(lexical_namespaceObject, "EMPTY", function() { return EMPTY; });
__webpack_require__.d(lexical_namespaceObject, "singleQuoted", function() { return singleQuoted; });
__webpack_require__.d(lexical_namespaceObject, "doubleQuoted", function() { return doubleQuoted; });
__webpack_require__.d(lexical_namespaceObject, "quoted", function() { return quoted; });
__webpack_require__.d(lexical_namespaceObject, "quoteBalanced", function() { return quoteBalanced; });
__webpack_require__.d(lexical_namespaceObject, "integer", function() { return integer; });
__webpack_require__.d(lexical_namespaceObject, "number", function() { return number; });
__webpack_require__.d(lexical_namespaceObject, "bool", function() { return bool; });
__webpack_require__.d(lexical_namespaceObject, "identifier", function() { return identifier; });
__webpack_require__.d(lexical_namespaceObject, "subscript", function() { return subscript; });
__webpack_require__.d(lexical_namespaceObject, "literal", function() { return literal; });
__webpack_require__.d(lexical_namespaceObject, "variable", function() { return variable; });
__webpack_require__.d(lexical_namespaceObject, "rangeLimit", function() { return rangeLimit; });
__webpack_require__.d(lexical_namespaceObject, "range", function() { return lexical_range; });
__webpack_require__.d(lexical_namespaceObject, "rangeCapture", function() { return rangeCapture; });
__webpack_require__.d(lexical_namespaceObject, "value", function() { return lexical_value; });
__webpack_require__.d(lexical_namespaceObject, "hash", function() { return lexical_hash; });
__webpack_require__.d(lexical_namespaceObject, "hashCapture", function() { return hashCapture; });
__webpack_require__.d(lexical_namespaceObject, "tagLine", function() { return tagLine; });
__webpack_require__.d(lexical_namespaceObject, "literalLine", function() { return literalLine; });
__webpack_require__.d(lexical_namespaceObject, "variableLine", function() { return variableLine; });
__webpack_require__.d(lexical_namespaceObject, "numberLine", function() { return numberLine; });
__webpack_require__.d(lexical_namespaceObject, "boolLine", function() { return boolLine; });
__webpack_require__.d(lexical_namespaceObject, "quotedLine", function() { return quotedLine; });
__webpack_require__.d(lexical_namespaceObject, "rangeLine", function() { return rangeLine; });
__webpack_require__.d(lexical_namespaceObject, "integerLine", function() { return integerLine; });
__webpack_require__.d(lexical_namespaceObject, "valueDeclaration", function() { return valueDeclaration; });
__webpack_require__.d(lexical_namespaceObject, "valueList", function() { return valueList; });
__webpack_require__.d(lexical_namespaceObject, "filter", function() { return lexical_filter; });
__webpack_require__.d(lexical_namespaceObject, "filterCapture", function() { return filterCapture; });
__webpack_require__.d(lexical_namespaceObject, "valueCapture", function() { return valueCapture; });
__webpack_require__.d(lexical_namespaceObject, "filterLine", function() { return filterLine; });
__webpack_require__.d(lexical_namespaceObject, "operators", function() { return operators; });
__webpack_require__.d(lexical_namespaceObject, "isInteger", function() { return isInteger; });
__webpack_require__.d(lexical_namespaceObject, "isLiteral", function() { return isLiteral; });
__webpack_require__.d(lexical_namespaceObject, "isRange", function() { return isRange; });
__webpack_require__.d(lexical_namespaceObject, "isVariable", function() { return isVariable; });
__webpack_require__.d(lexical_namespaceObject, "matchValue", function() { return matchValue; });
__webpack_require__.d(lexical_namespaceObject, "parseLiteral", function() { return parseLiteral; });

// NAMESPACE OBJECT: ./src/util/error.js
var error_namespaceObject = {};
__webpack_require__.r(error_namespaceObject);
__webpack_require__.d(error_namespaceObject, "TokenizationError", function() { return TokenizationError; });
__webpack_require__.d(error_namespaceObject, "ParseError", function() { return ParseError; });
__webpack_require__.d(error_namespaceObject, "RenderError", function() { return RenderError; });
__webpack_require__.d(error_namespaceObject, "RenderBreakError", function() { return RenderBreakError; });
__webpack_require__.d(error_namespaceObject, "AssertionError", function() { return AssertionError; });

// NAMESPACE OBJECT: ./src/syntax.js
var syntax_namespaceObject = {};
__webpack_require__.r(syntax_namespaceObject);
__webpack_require__.d(syntax_namespaceObject, "evalExp", function() { return evalExp; });
__webpack_require__.d(syntax_namespaceObject, "evalValue", function() { return evalValue; });
__webpack_require__.d(syntax_namespaceObject, "isTruthy", function() { return isTruthy; });
__webpack_require__.d(syntax_namespaceObject, "isFalsy", function() { return isFalsy; });

// CONCATENATED MODULE: ./src/util/underscore.js
const toStr = Object.prototype.toString;

/*
 * Checks if value is classified as a String primitive or object.
 * @param {any} value The value to check.
 * @return {Boolean} Returns true if value is a string, else false.
 */
function isString (value) {
  return value instanceof String || typeof value === 'string';
}

function isNil (value) {
  return value === null || value === undefined;
}

function isArray (value) {
  // be compatible with IE 8
  return toStr.call(value) === '[object Array]';
}

function isError (value) {
  var signature = Object.prototype.toString.call(value);
  // [object XXXError]
  return signature.substr(-6, 5) === 'Error' ||
        (typeof value.message === 'string' && typeof value.name === 'string');
}

/*
 * Iterates over own enumerable string keyed properties of an object and invokes iteratee for each property.
 * The iteratee is invoked with three arguments: (value, key, object).
 * Iteratee functions may exit iteration early by explicitly returning false.
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @return {Object} Returns object.
 */
function forOwn (object, iteratee) {
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
function underscore_assign (object) {
  object = isObject(object) ? object : {};
  var srcs = Array.prototype.slice.call(arguments, 1);
  srcs.forEach(function (src) {
    _assignBinary(object, src);
  });
  return object;
}

function _assignBinary (dst, src) {
  forOwn(src, function (v, k) {
    dst[k] = v;
  });
  return dst;
}

function last (arr) {
  return arr[arr.length - 1];
}

function uniq (arr) {
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
function isObject (value) {
  var type = typeof value;
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
function range (start, stop, step) {
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

// CONCATENATED MODULE: ./src/lexical.js
function EmptyVariable () {}
EmptyVariable.prototype.toString = function () { return ''; };
EmptyVariable.prototype.toJSON = function () { return ''; };
EmptyVariable.prototype.valueOf = function () { return null; };

const EMPTY = new EmptyVariable();

// quote related
const singleQuoted = /'[^']*'/;
const doubleQuoted = /"[^"]*"/;
const quoted = new RegExp(`${singleQuoted.source}|${doubleQuoted.source}`);
const quoteBalanced = new RegExp(`(?:${quoted.source}|[^'"])*`);

// basic types
const integer = /-?\d+/;
const number = /-?\d+\.?\d*|\.?\d+/;
const bool = /true|false/;

// peoperty access
const identifier = /[\w_$-]+\??/;
const subscript = new RegExp(`\\[(?:${quoted.source}|[\\w-\\.]+)\\]`);
const literal = new RegExp(`(?:${quoted.source}|${bool.source}|${number.source}|nil|null|empty|blank)`);
const variable = new RegExp(`${identifier.source}(?:\\.${identifier.source}|${subscript.source})*`);

// range related
const rangeLimit = new RegExp(`(?:${variable.source}|${number.source})`);
const lexical_range = new RegExp(`\\(${rangeLimit.source}\\.\\.${rangeLimit.source}\\)`);
const rangeCapture = new RegExp(`\\((${rangeLimit.source})\\.\\.(${rangeLimit.source})\\)`);

const lexical_value = new RegExp(`(?:${variable.source}|${literal.source}|${lexical_range.source})`);

// hash related
const lexical_hash = new RegExp(`(?:${identifier.source})\\s*:\\s*(?:${lexical_value.source})`);
const hashCapture = new RegExp(`(${identifier.source})\\s*:\\s*(${lexical_value.source})`, 'g');

// full match
const tagLine = new RegExp(`^\\s*(${identifier.source})\\s*([\\s\\S]*)\\s*$`);
const literalLine = new RegExp(`^${literal.source}$`, 'i');
const variableLine = new RegExp(`^${variable.source}$`);
const numberLine = new RegExp(`^${number.source}$`);
const boolLine = new RegExp(`^${bool.source}$`, 'i');
const quotedLine = new RegExp(`^${quoted.source}$`);
const rangeLine = new RegExp(`^${rangeCapture.source}$`);
const integerLine = new RegExp(`^${integer.source}$`);

// filter related
const valueDeclaration = new RegExp(`(?:${identifier.source}\\s*:\\s*)?${lexical_value.source}`);
const valueList = new RegExp(`${valueDeclaration.source}(\\s*,\\s*${valueDeclaration.source})*`);
const lexical_filter = new RegExp(`${identifier.source}(?:\\s*:\\s*${valueList.source})?`, 'g');
const filterCapture = new RegExp(`(${identifier.source})(?:\\s*:\\s*(${valueList.source}))?`);
const valueCapture = new RegExp(lexical_value.source, 'g');
const filterLine = new RegExp(`^${filterCapture.source}$`);

const operators = [
  /\s+or\s+/,
  /\s+and\s+/,
  /==|!=|<=|>=|<|>|\s+contains\s+/
];

function isInteger (str) {
  return integerLine.test(str);
}

function isLiteral (str) {
  return literalLine.test(str);
}

function isRange (str) {
  return rangeLine.test(str);
}

function isVariable (str) {
  return variableLine.test(str);
}

function matchValue (str) {
  return lexical_value.exec(str);
}

function parseLiteral (str) {
  if ([ 'nil', 'null' ].indexOf(str) > -1) {
    // console.log('parseLiteral; null', str);
    return null;
  }
  if ([ 'empty', 'blank' ].indexOf(str) > -1) {
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
  throw new TypeError(`cannot parse '${str}' as literal`);
}

// CONCATENATED MODULE: ./src/util/error.js


function initError () {
  this.name = this.constructor.name;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  }
}

function initLiquidError (err, token) {
  initError.call(this);

  this.input = token.input;
  this.line = token.line;
  this.file = token.file;

  var context = mkContext(token.input, token.line);
  this.message = mkMessage(err.message, token);
  this.stack = context +
    '\n' + (this.stack || this.message) +
      (err.stack ? '\nFrom ' + err.stack : '');
}

function TokenizationError (message, token) {
  initLiquidError.call(this, {message: message}, token);
}
TokenizationError.prototype = Object.create(Error.prototype);
TokenizationError.prototype.constructor = TokenizationError;

function ParseError (e, token) {
  underscore_assign(this, e);
  this.originalError = e;

  initLiquidError.call(this, e, token);
}
ParseError.prototype = Object.create(Error.prototype);
ParseError.prototype.constructor = ParseError;

function RenderError (e, tpl) {
  // return the original render error
  if (e instanceof RenderError) {
    return e;
  }
  underscore_assign(this, e);
  this.originalError = e;

  initLiquidError.call(this, e, tpl.token);
}
RenderError.prototype = Object.create(Error.prototype);
RenderError.prototype.constructor = RenderError;

function RenderBreakError (message) {
  initError.call(this);
  this.message = message + '';
}
RenderBreakError.prototype = Object.create(Error.prototype);
RenderBreakError.prototype.constructor = RenderBreakError;

function AssertionError (message) {
  initError.call(this);
  this.message = message + '';
}
AssertionError.prototype = Object.create(Error.prototype);
AssertionError.prototype.constructor = AssertionError;

function mkContext (input, line) {
  var lines = input.split('\n');
  var begin = Math.max(line - 2, 1);
  var end = Math.min(line + 3, lines.length);

  var context = range(begin, end + 1)
    .map(l => [
      (l === line) ? '>> ' : '   ',
      align(l, end),
      '| ',
      lines[l - 1]
    ].join(''))
    .join('\n');

  return context;
}

function align (n, max) {
  var length = (max + '').length;
  var str = n + '';
  var blank = Array(length - str.length).join(' ');
  return blank + str;
}

function mkMessage (msg, token) {
  msg = msg || '';
  if (token.file) {
    msg += ', file:' + token.file;
  }
  if (token.line) {
    msg += ', line:' + token.line;
  }
  return msg;
}

// CONCATENATED MODULE: ./src/util/assert.js


function assert (predicate, message) {
  if (!predicate) {
    message = message || `expect ${predicate} to be true`;
    throw new AssertionError(message);
  }
}

/* harmony default export */ var util_assert = (assert);

// CONCATENATED MODULE: ./src/util/compatibility.js
const isNull = value => value === null || value === undefined;

function compatSize (result) {
  if (Array.isArray(result) || typeof result === 'string') {
    return result.length;
  } else if (isNull(result)) {
    return 0;
  } else if (typeof result === 'object') {
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

function compatFirst (result) {
  if (Array.isArray(result) || typeof result === 'string') {
    return result.length > 0 ? result[0] : null;
  } else if (isNull(result)) {
    return null;
  } else if (typeof result === 'object') {
    if ('first' in result) {
      return result.first;
    } else {
      let keys = Object.keys(result);
      if (keys.length <= 0) return null;
      let first = keys[0];
      return result[first];
    }
  } else {
    return result;
  }
}

function compatLast (result) {
  if (Array.isArray(result) || typeof result === 'string') {
    return result.length > 0 ? result[result.length - 1] : null;
  } else if (isNull(result)) {
    return null;
  } else if (typeof result === 'object') {
    if ('last' in result) {
      return result.last;
    } else {
      let keys = Object.keys(result);
      if (keys.length <= 0) return null;
      let last = keys[keys.length - 1];
      return result[last];
    }
  } else {
    return result;
  }
}

// CONCATENATED MODULE: ./src/scope.js






const delimiters = [ `'`, '"' ];

const forbidden = [
  'empty',
  'blank',
  'nil',
  'null',
  'undefined',
  'true',
  'false',
  ''
];

function isVariableValid (varName) {
  return forbidden.indexOf((varName || '').trim().toLowerCase()) < 0;
}

function validateContextObject (ctx) {
  if (ctx === null || undefined === ctx) return;
  let keys = Object.keys(ctx);
  keys.forEach(v => {
    if (!isVariableValid(v)) {
      throw new Error(`invalid context variable name; "${v}" is forbidden`);
    }
  });
}

var Scope = {
  getAll: function () {
    var ctx = {};
    for (var i = this.scopes.length - 1; i >= 0; i--) {
      underscore_assign(ctx, this.scopes[i]);
    }
    return ctx;
  },
  getFromContext: function (str) {
    return new Promise((resolve, reject) => {
      this.getPropertyByPath(this.scopes, str).then(resolve).catch(err => {
        // console.log('get -> getPropertyByPath returned err:', err.message);
        if (!/undefined variable/.test(err.message) || this.opts.strict_variables) {
          // console.log('\t-> rejecting');
          return reject(err);
        } else {
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
    } else {
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
    util_assert(ctx, `trying to push ${ctx} into scopes`);
    validateContextObject(ctx);
    return this.scopes.push(ctx);
  },
  pop: function () {
    return this.scopes.pop();
  },
  findScopeFor: function (key) {
    var i = this.scopes.length - 1;
    while (i >= 0 && !(key in this.scopes[i])) {
      i--;
    }
    if (i < 0) {
      i = this.scopes.length - 1;
    }
    return this.scopes[i];
  },
  unshift: function (ctx) {
    util_assert(ctx, `trying to push ${ctx} into scopes`);
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
    for (let cursor = 0; cursor < strLen;) {
      // log('[loop]', str[cursor]);
      /* eslint-disable no-case-declarations */
      switch (str[cursor]) {
      case '[':
        let delimiter = str[cursor + 1];
        if (delimiters.indexOf(delimiter) > -1) { // access by quoted name: foo["bar"]
          let nameEndIndex = str.indexOf(delimiter, cursor + 2);
          if (nameEndIndex < 0) {
            return Promise.reject(new AssertionError(`unbalanced ${delimiter}: "${str}"`));
          }
          let nameToken = str.slice(cursor + 2, nameEndIndex);
          tokenProviders.push(Promise.resolve(nameToken));
          cursor = nameEndIndex + 2; // the closing " and ]
          // log('BRACKET w/delimiter',nameEndIndex, nameToken);
        } else { // access by variable: foo[bar.coo]
          let variableEndIndex = matchRightBracket(str, cursor + 1);
          if (variableEndIndex < 0) {
            return Promise.reject(new AssertionError(`unbalanced []: "${str}"`));
          }
          let variableToken = str.slice(cursor + 1, variableEndIndex);
          if (isInteger(variableToken)) { // foo[1]
            // log('BRACKET; number', variableToken);
            tokenProviders.push(Promise.resolve(variableToken));
          } else {
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
        let nextBracketIndex = str.indexOf('[', cursor);
        let nextDotIndex = str.indexOf('.', cursor);
        let foundIndexes = [ strLen, nextBracketIndex, nextDotIndex ].filter(index => index > -1);
        let nextSeparator = Math.min.apply(Math, foundIndexes);
        let unquotedNameToken = str.slice(cursor, nextSeparator);
        // log('DEFAULT', {nextBracketIndex,nextDotIndex,nextSeparator,unquotedNameToken});
        tokenProviders.push(Promise.resolve(unquotedNameToken));
        cursor = nextSeparator;
        break;
      }
      /* eslint-enable no-case-declarations */
    }
    return Promise.all(tokenProviders);
  }
};

function setPropertyByPath (obj, path, val) {
  var paths = (path + '').replace(/\[/g, '.').replace(/\]/g, '').split('.');
  for (var i = 0; i < paths.length; i++) {
    var key = paths[i];
    if (!isObject(obj)) {
      // cannot set property of non-object
      return;
    }
    // for end point
    if (i === paths.length - 1) {
      return (obj[key] = val);
    }
    // if path not exist
    if (undefined === obj[key]) {
      obj[key] = {};
    }
    obj = obj[key];
  }
}

function getValueFromParent (key, value) {
  if (key === 'size') {
    return compatSize(value);
  } else if (key === 'first') {
    return compatFirst(value);
  } else if (key === 'last') {
    return compatLast(value);
  } else {
    if (isNil(value)) {
      throw new TypeError(`undefined variable: "${key}"`);
    }
    return value[key];
  }
}

function getValueFromScopes (key, scopes) {
  for (var i = scopes.length - 1; i > -1; i--) {
    var scope = scopes[i];
    if (scope.hasOwnProperty(key)) {
      return scope[key];
    }
  }
  throw new TypeError(`undefined variable: "${key}"`);
}

function matchRightBracket (str, begin) {
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

function createScope (ctx, opts) {
  var defaultOptions = {
    dynamicPartials: true,
    strict_variables: false,
    strict_filters: false,
    blocks: {},
    root: []
  };
  var scope = Object.create(Scope);
  scope.opts = underscore_assign(defaultOptions, opts);
  validateContextObject(ctx);
  scope.scopes = [ctx || {}];
  return scope;
}

// CONCATENATED MODULE: ./src/util/strftime.js
var monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
];
var monthNamesShort = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct',
  'Nov', 'Dec'
];
var dayNames = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];
var dayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getOrdinal (date) {
  const day = date.getDate();
  if (day > 3 && day < 21) {
    return 'th';
  } else {
    switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
    }
  }
}

function isLeapYear (date) {
  const year = date.getFullYear();
  if ((year & 3) != 0) {
    return false;
  }
  return ((year % 100) != 0 || (year % 400) == 0);
}

const dayCount = [ 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334 ];

function getDayOfYear (date) {
  const month = date.getMonth();
  const day = date.getDate();
  const leapYear = month > 1 && isLeapYear(date);
  const dayOfYear = (dayCount[month] + day) + (leapYear ? 1 : 0);
  return dayOfYear;
}

// prototype extensions
var _date = {
  getDayOfYear,

  // Startday is an integer of which day to start the week measuring from
  getWeekOfYear: function (d, startDay) {
    // Skip to startDay of this week
    var now = getDayOfYear(d) + (startDay - d.getDay());
    // Find the first startDay of the year
    var jan1 = new Date(d.getFullYear(), 0, 1);
    var then = (7 - jan1.getDay() + startDay);
    return _number.pad(Math.floor((now - then) / 7) + 1, 2);
  },

  isLeapYear,

  getSuffix: function (d) {
    return getOrdinal(d);
  },

  century: function (d) {
    return parseInt(d.getFullYear().toString().substring(0, 2), 10);
  }
};

var _number = {
  pad: function (value, size, ch) {
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
  a: function (d) {
    return dayNamesShort[d.getDay()];
  },
  A: function (d) {
    return dayNames[d.getDay()];
  },
  b: function (d) {
    return monthNamesShort[d.getMonth()];
  },
  B: function (d) {
    return monthNames[d.getMonth()];
  },
  c: function (d) {
    return d.toLocaleString();
  },
  C: function (d) {
    return _date.century(d);
  },
  d: function (d) {
    return _number.pad(d.getDate(), 2);
  },
  e: function (d) {
    return _number.pad(d.getDate(), 2, ' ');
  },
  H: function (d) {
    return _number.pad(d.getHours(), 2);
  },
  I: function (d) {
    return _number.pad(d.getHours() % 12 || 12, 2);
  },
  j: function (d) {
    return _number.pad(_date.getDayOfYear(d), 3);
  },
  k: function (d) {
    return _number.pad(d.getHours(), 2, ' ');
  },
  l: function (d) {
    return _number.pad(d.getHours() % 12 || 12, 2, ' ');
  },
  L: function (d) {
    return _number.pad(d.getMilliseconds(), 3);
  },
  m: function (d) {
    return _number.pad(d.getMonth() + 1, 2);
  },
  M: function (d) {
    return _number.pad(d.getMinutes(), 2);
  },
  p: function (d) {
    return (d.getHours() < 12 ? 'AM' : 'PM');
  },
  P: function (d) {
    return (d.getHours() < 12 ? 'am' : 'pm');
  },
  q: function (d) {
    return _date.getSuffix(d);
  },
  s: function (d) {
    return Math.round(d.valueOf() / 1000);
  },
  S: function (d) {
    return _number.pad(d.getSeconds(), 2);
  },
  u: function (d) {
    return d.getDay() || 7;
  },
  U: function (d) {
    return _date.getWeekOfYear(d, 0);
  },
  w: function (d) {
    return d.getDay();
  },
  W: function (d) {
    return _date.getWeekOfYear(d, 1);
  },
  x: function (d) {
    return d.toLocaleDateString();
  },
  X: function (d) {
    return d.toLocaleTimeString();
  },
  y: function (d) {
    return d.getFullYear().toString().substring(2, 4);
  },
  Y: function (d) {
    return d.getFullYear();
  },
  z: function (d) {
    var tz = (d.getTimezoneOffset() / 60) * 100;
    return (tz > 0 ? '-' : '+') + _number.pad(Math.abs(tz), 4);
  },
  '%': function () {
    return '%';
  }
};
formatCodes.h = formatCodes.b;
formatCodes.N = formatCodes.L;

/* harmony default export */ var strftime = (function (d, format) {
  var output = '';
  var remaining = format;

  for (;;) {
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
});

// CONCATENATED MODULE: ./src/whitespace-ctrl.js


function shouldTrimLeft (token, inRaw, options) {
  if (inRaw) return false;
  if (token.type === 'tag') return token.trim_left || options.trim_tag_left;
  if (token.type === 'value') return token.trim_left || options.trim_value_left;
}

function shouldTrimRight (token, inRaw, options) {
  if (inRaw) return false;
  if (token.type === 'tag') return token.trim_right || options.trim_tag_right;
  if (token.type === 'value') return token.trim_right || options.trim_value_right;
}

function trimLeft (token, greedy) {
  if (!token || token.type !== 'html') return;

  var rLeft = greedy ? /\s+$/g : /[\t\r ]*$/g;
  token.value = token.value.replace(rLeft, '');
}

function trimRight (token, greedy) {
  if (!token || token.type !== 'html') return;

  var rRight = greedy ? /^\s+/g : /^[\t\r ]*\n?/g;
  token.value = token.value.replace(rRight, '');
}

/* harmony default export */ var whitespace_ctrl = (function (tokens, options) {
  options = underscore_assign({ greedy: true }, options);
  var inRaw = false;

  tokens.forEach((token, i) => {
    if (shouldTrimLeft(token, inRaw, options)) {
      trimLeft(tokens[i - 1], options.greedy);
    }

    if (token.type === 'tag' && token.name === 'raw') inRaw = true;
    if (token.type === 'tag' && token.name === 'endraw') inRaw = false;

    if (shouldTrimRight(token, inRaw, options)) {
      trimRight(tokens[i + 1], options.greedy);
    }
  });
});

// CONCATENATED MODULE: ./src/tokenizer.js






function tokenizer_parse (input, file, options) {
  util_assert(isString(input), `illegal input; "${'' + input}"`);

  var rLiquid = /({%-?([\s\S]*?)-?%})|({{-?([\s\S]*?)-?}})/g;
  var currIndent = 0;
  var lineNumber = LineNumber(input);
  var lastMatchEnd = 0;
  var tokens = [];

  for (var match; (match = rLiquid.exec(input)); lastMatchEnd = rLiquid.lastIndex) {
    if (match.index > lastMatchEnd) {
      tokens.push(parseHTMLToken(lastMatchEnd, match.index));
    }
    tokens.push(match[1]
      ? parseTagToken(match[1], match[2].trim(), match.index)
      : parseValueToken(match[3], match[4].trim(), match.index));
  }
  if (input.length > lastMatchEnd) {
    tokens.push(parseHTMLToken(lastMatchEnd, input.length));
  }
  whitespace_ctrl(tokens, options);
  return tokens;

  function parseTagToken (raw, value, pos) {
    var match = value.match(tagLine);
    var token = {
      type: 'tag',
      indent: currIndent,
      line: lineNumber.get(pos),
      trim_left: raw.slice(0, 3) === '{%-',
      trim_right: raw.slice(-3) === '-%}',
      raw,
      value,
      input,
      file
    };
    if (!match) {
      throw new TokenizationError(`illegal tag syntax`, token);
    }
    token.name = match[1];
    token.args = match[2];
    return token;
  }

  function parseValueToken (raw, value, pos) {
    return {
      type: 'value',
      line: lineNumber.get(pos),
      trim_left: raw.slice(0, 3) === '{{-',
      trim_right: raw.slice(-3) === '-}}',
      raw,
      value,
      input,
      file
    };
  }

  function parseHTMLToken (begin, end) {
    var htmlFragment = input.slice(begin, end);
    currIndent = last((htmlFragment).split('\n')).length;

    return {
      type: 'html',
      raw: htmlFragment,
      value: htmlFragment
    };
  }
}

function LineNumber (html) {
  var parsedLinesCount = 0;
  var lastMatchBegin = -1;

  return {
    get: function (pos) {
      var lines = html.slice(lastMatchBegin + 1, pos).split('\n');
      parsedLinesCount += lines.length - 1;
      lastMatchBegin = pos;
      return parsedLinesCount + 1;
    }
  };
}

// EXTERNAL MODULE: external "fs"
var external_fs_ = __webpack_require__(0);
var external_fs_default = /*#__PURE__*/__webpack_require__.n(external_fs_);

// CONCATENATED MODULE: ./src/util/fs.js


function readFileAsync (filepath) {
  return new Promise(function (resolve, reject) {
    external_fs_default.a.readFile(filepath, 'utf8', function (err, content) {
      err ? reject(err) : resolve(content);
    });
  });
}

function statFileAsync (path) {
  return new Promise(function (resolve, reject) {
    external_fs_default.a.stat(path, (err, stat) => err ? reject(err) : resolve(stat));
  });
}

// EXTERNAL MODULE: external "path"
var external_path_ = __webpack_require__(1);
var external_path_default = /*#__PURE__*/__webpack_require__.n(external_path_);

// CONCATENATED MODULE: ./src/safe-object.js
class SafeObject {
  constructor(comparisonId) {
    if (undefined !== comparisonId) {
      Object.defineProperty(this, SafeObject.COMPARISON_KEY, {
        enumerable: false,
        value: comparisonId
      });
    } else {
      // noop. must inherit
    }
  }

  valueOf() {
    return this[SafeObject.COMPARISON_KEY];
  }

  toString() {
    return '' + this.valueOf();
  }
}

SafeObject.COMPARISON_KEY = '_liquid_comparison_id';

// CONCATENATED MODULE: ./src/operators.js


const getCompareValue = value => {
  if (value instanceof SafeObject && SafeObject.COMPARISON_KEY in value) {
    return value[SafeObject.COMPARISON_KEY];
  } else if (isNullOrUndefined(value)) {
    return null;
  } else if (typeof value === 'object') {
    if (Array.isArray(value)) {
      return value.length === 0 ? null : value;
    } else if (value.valueOf) {
      return value.valueOf();
    } else if (value.toJSON) {
      return value.toJSON();
    } else if (value.toString) {
      return value.toString();
    } else {
      return Object.keys(value).length === 0 ? null : value;
    }
  } else if (typeof value === 'string') {
    return value.length === 0 ? null : value;
  } else {
    return value;
  }
};

const isNullOrUndefined = value => value === null || undefined === value;

const createOperator = (EMPTY, handler) => (l, r) => {
  // console.log('compare operator. before: ', { l, r });
  l = getCompareValue(l);
  r = getCompareValue(r);
  // console.log('compare operator. after: ', { l, r });
  return handler(l, r);
};

/* harmony default export */ var src_operators = (function (isTruthy, EMPTY) {
  let _createOperator = createOperator.bind(null, EMPTY);
  return {
    '==': _createOperator((l, r) => l === r),

    '!=': _createOperator((l, r) => l !== r),

    '>': _createOperator((l, r) => l !== null && r !== null && l > r),

    '<': _createOperator((l, r) => l !== null && r !== null && l < r),

    '>=': _createOperator((l, r) => l !== null && r !== null && l >= r),

    '<=': _createOperator((l, r) => l !== null && r !== null && l <= r),

    'contains': _createOperator((l, r) => {
      if (!l) return false;
      if (typeof l.indexOf !== 'function') return false;
      const compareValue = getCompareValue(r);
      // substr or literal match within an array
      const simpleComparison = l.indexOf(compareValue) > -1;
      if (simpleComparison || !Array.isArray(l)) { // return result if string
        return simpleComparison;
      } else if (Array.isArray(l) && l.some) { // supports some
        return l.some(item => getCompareValue(item) === compareValue);
      } else {
        return simpleComparison; // sanity/falllback return result of simple compare
      }
    }),

    'and': _createOperator((l, r) => isTruthy(l) && isTruthy(r)),

    'or': _createOperator((l, r) => isTruthy(l) || isTruthy(r))
  };
});

// CONCATENATED MODULE: ./src/syntax.js




const syntax_operators = src_operators(isTruthy, EMPTY);

function evalExp (exp, scope) {
  util_assert(scope, 'unable to evalExp: scope undefined');
  var operatorREs = operators;
  var match;
  for (var i = 0; i < operatorREs.length; i++) {
    var operatorRE = operatorREs[i];
    var expRE = new RegExp(`^(${quoteBalanced.source})(${operatorRE.source})(${quoteBalanced.source})$`);
    if ((match = exp.match(expRE))) {
      return Promise.all([
        evalExp(match[1], scope),
        evalExp(match[3], scope)
      ]).then(results => {
        let l = results[0];
        let r = results[1];
        var op = syntax_operators[match[2].trim()];
        // console.log('evalExp', l, op, r);
        return op(l, r);
      });
    }
  }

  if ((match = exp.match(rangeLine))) {
    return Promise.all([
      evalValue(match[1], scope),
      evalValue(match[2], scope)
    ]).then(results => {
      var low = results[0];
      var high = results[1];
      var range = [];
      for (var j = low; j <= high; j++) {
        range.push(j);
      }
      return range;
    });
  }
  // need to support if this.boolean? is true
  if (exp.substr(-1) === '?') {
    exp = exp.substr(0, exp.length - 1);
  }
  return evalValue(exp, scope);
}

function evalValue (str, scope) {
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
  // instead of throwing, just return value as-is.  this seems
  // to be the compatible way of dealing with this situation
  return Promise.resolve('' + str);
  // throw new TypeError(`cannot eval '${str}' as value`)
}

function isTruthy (value) {
  return !isFalsy(value);
}

function isFalsy (value) {
  if (value === false) {
    return true;
  }
  if (value === null || value === undefined) {
    return true;
  }
  return false;
}

// CONCATENATED MODULE: ./src/util/promise.js

/*
 * Call functions in serial until someone resolved.
 * @param {Array} iterable the array to iterate with.
 * @param {Array} iteratee returns a new promise.
 * The iteratee is invoked with three arguments: (value, index, iterable).
 */
function anySeries (iterable, iteratee) {
  var ret = Promise.reject(new Error('init'));
  iterable.forEach(function (item, idx) {
    ret = ret.catch(e => iteratee(item, idx, iterable));
  });
  return ret;
}

/*
 * Call functions in serial until someone rejected.
 * @param {Array} iterable the array to iterate with.
 * @param {Array} iteratee returns a new promise.
 * The iteratee is invoked with three arguments: (value, index, iterable).
 */
function mapSeries (iterable, iteratee) {
  var ret = Promise.resolve('init');
  var result = [];
  iterable.forEach(function (item, idx) {
    ret = ret
      .then(() => iteratee(item, idx, iterable))
      .then(x => result.push(x));
  });
  return ret.then(() => result);
}

/*
 * Call functions in serial until someone resolved; skip rest of series
 * @param {Array} iterable the array to iterate with.
 * @param {Array} iteratee returns a new promise.
 * The iteratee is invoked with three arguments: (value, index, iterable).
 */
function firstSeries (iterable, iteratee, fallbackFn) {
  var winner;
  return iterable.reduce((promise, item) => {
    return promise.then(() => {
      if (winner) {
        return Promise.resolve(winner);
      } else {
        return iteratee(item).then(found => {
          winner = found;
          return winner;
        }).catch(err => {
          if (err instanceof Error) {
            throw err;
          } else {
            // noop. swallow promises rejected with non-errors
          }
        });
      }
    });
  }, Promise.resolve()).then(() => {
    if (undefined !== winner) {
      return winner;
    } else if (fallbackFn) {
      return fallbackFn();
    } else {
      return undefined;
    }
  });
}

// CONCATENATED MODULE: ./src/render.js






var render = {

  // NOTE: this renders in parallel instead of series (below) but that won't work because
  //       of the nature of templates.  each template can impact the scope for the next template
  //       (e.g. assign) and doing this in parallel introduces a race
  // renderTemplates: async function (templates, scope) {
  //   assert(scope, 'unable to evalTemplates: scope undefined');
  //   // console.log('\n\nrenderTemplates', templates);
  //   const tasks = templates
  //     .map(async template => {
  //       let value = null;
  //       try {
  //         if (template.type === 'tag') {
  //           value = this.renderTag(template, scope);
  //         }
  //         else if (template.type === 'value') {
  //           value = this.evalValue(template, scope);
  //         }
  //         else { // template.type === 'html'
  //           value = Promise.resolve(template.value);
  //         }
  //         const rendered = await value;
  //         return stringify(rendered);
  //       }
  //       catch (err) {
  //         if (err instanceof RenderBreakError) {
  //           err.resolvedHTML = value;
  //           throw err;
  //         }
  //         if (template && template.token) {
  //           throw new RenderError(err, template);
  //         }
  //         else {
  //           throw new Error('Could not render because of unkown error: ' + err.message);
  //         }
  //       }
  //     });
  //   const result = await Promise.all(tasks);
  //   const html = result.join('');
  //   return html;
  // },

  renderTemplates: function (templates, scope) {
    util_assert(scope, 'unable to evalTemplates: scope undefined');

    // console.log('\n\nrenderTemplates', templates);

    var html = '';
    return mapSeries(templates, tpl => renderTemplate.call(this, tpl)
      .then(partial => {
        html += partial;
      })
      .catch(e => {
        if (e instanceof RenderBreakError) {
          e.resolvedHTML = html;
          throw e;
        }
        if (tpl && tpl.token) {
          throw new RenderError(e, tpl);
        } else {
          throw new Error('Could not render because of unkown error: ' + e.message);
        }
      }))
      .then(() => html);

    function renderTemplate (template) {
      let value;
      if (template.type === 'tag') {
        value = this.renderTag(template, scope);
      } else if (template.type === 'value') {
        value = this.evalValue(template, scope);
      } else { // template.type === 'html'
        value = Promise.resolve(template.value);
      }
      return value.then(result => stringify(result));
    }
  },

  renderTag: function (template, scope) {
    if (template.name === 'continue') {
      return Promise.reject(new RenderBreakError('continue'));
    }
    if (template.name === 'break') {
      return Promise.reject(new RenderBreakError('break'));
    }
    return template.render(scope);
  },

  evalValue: function (template, scope) {
    util_assert(scope, 'unable to evalValue: scope undefined');
    try {
      // console.log('evalValue; template', template);
      return evalExp(template.initial, scope)
        .then(initialValue => {
          // console.log('evalValue; initialValue', initialValue);
          return template.filters.reduce((promise, filter) => {
            return promise.then(prev => {
              // console.log('evalValue; calling filter', filter, 'with', prev);
              return filter.render(prev, scope).then(next => {
                // console.log('evalValue; filter done', filter, 'result', next);
                return next;
              });
            });
          }, Promise.resolve(initialValue));
        })
        .then(result => {
          // console.log('evalValue; result', result);
          return result;
        });
    } catch (err) {
      return Promise.reject(err);
    }
  }
};

function stringify (val) {
  if (val === null || undefined === val || EMPTY === val) {
    return '';
  } else if (Array.isArray(val)) {
    return val.join(''); // shopify compatible
  } else if (typeof val === 'object') {
    if (val && typeof val.toString === 'function') {
      const result = val.toString();
      return result === '[object Object]' ? '' : result;
    } else {
      return ''; // shopify compatible
    }
  } else {
    return '' + val; // string, number, bool
  }
}

/* harmony default export */ var src_render = (function () {
  var instance = Object.create(render);
  return instance;
});

// CONCATENATED MODULE: ./src/tag.js




// const logger = console.log.bind(null, '[TAG]');
const logger = function () {};

// hash { _: [ one, two ], some: 'value', other: 'value' }
const COMMAND_HASH_GROUP_KEY = '_';

const overwrite = (str, originalValue, newValue) => {
  const offsetIndex = str.indexOf(originalValue);
  if (offsetIndex < 0) throw new Error('cannot overwrite non-existent value'); // this is a sanity.  it should never happen
  const endIndex = offsetIndex + originalValue.length;
  const before = str.slice(0, offsetIndex);
  const after = str.slice(endIndex);
  return before + newValue + after;
};

const tag_hash = (markup, scope) => {
  const keys = [];
  const vals = [];
  const obj = {
    [COMMAND_HASH_GROUP_KEY]: [],
  };
  let markupCopy = markup; // used to find "commands";
  let commandMatches;
  hashCapture.lastIndex = 0;
  while ((commandMatches = hashCapture.exec(markup))) {
    markupCopy = overwrite(markupCopy, commandMatches[0], ''); // strip our commandMatches
    const k = commandMatches[1];
    const v = commandMatches[2];
    logger('hash; arg commandMatches', { k, v });
    keys.push(k);
    vals.push(evalValue(v, scope));
  }
  // markupCopy now contains all the unmatchable hash groups. these are "commands"
  // we do another match to parse out those valid values
  let fallbackCommandMatches;
  valueCapture.lastIndex = 0;
  while ((fallbackCommandMatches = valueCapture.exec(markupCopy))) {
    const k = COMMAND_HASH_GROUP_KEY;
    const v = fallbackCommandMatches[0];
    logger('hash; cmd fallbackCommandMatches', { k, v });
    keys.push(k);
    vals.push(evalValue(v, scope));
  }
  return Promise.all(vals).then(results => {
    results.forEach((v, i) => {
      const k = keys[i];
      if (k === COMMAND_HASH_GROUP_KEY) {
        obj[COMMAND_HASH_GROUP_KEY].push(v);
      } else {
        obj[k] = v;
      }
    });
    logger('hash; result', obj);
    return obj;
  });
};

/* harmony default export */ var src_tag = (function () {
  var tagImpls = {};

  var _tagInstance = {
    render: function (scope) {
      return tag_hash(this.token.args, scope).then(obj => {
        var impl = this.tagImpl;
        if (typeof impl.render !== 'function') {
          return Promise.resolve('');
        }
        return impl.render(scope, obj);
      });
    },
    parse: function (token, tokens) {
      this.type = 'tag';
      this.token = token;
      this.name = token.name;

      var tagImpl = tagImpls[this.name];
      util_assert(tagImpl, `tag ${this.name} not found`);
      this.tagImpl = Object.create(tagImpl);
      if (this.tagImpl.parse) {
        this.tagImpl.parse(token, tokens);
      }
    }
  };

  const register = (name, tag) => {
    tagImpls[name] = tag;
  };

  const construct = (token, tokens) => {
    var instance = Object.create(_tagInstance);
    instance.parse(token, tokens);
    return instance;
  };

  const clear = () => {
    tagImpls = {};
  };

  return {
    construct,
    register,
    clear
  };
});

// CONCATENATED MODULE: ./src/filter.js





const valueRE = new RegExp(`${lexical_value.source}`, 'g');

/* harmony default export */ var src_filter = (function (options) {
  options = underscore_assign({}, options);
  var filters = {};

  var _filterInstance = {
    render: function (output, scope) {
      return Promise.all(this.args.map(arg => evalValue(arg, scope))).then(args => {
        args.unshift(output);
        return this.filter.apply(scope, args);
      });
    },
    parse: function (str) {
      let match = filterLine.exec(str);
      util_assert(match, 'illegal filter: ' + str);

      const name = match[1];
      const argList = match[2] || '';
      const filter = filters[name];
      if (typeof filter !== 'function') {
        if (options.strict_filters) {
          throw new TypeError(`undefined filter: ${name}`);
        }
        this.name = name;
        this.filter = x => x;
        this.args = [];
        return this;
      }

      const args = [];
      // console.log('starting while', argList);
      while ((match = valueRE.exec(argList.trim()))) {
        const v = match[0];
        const startIndex        = match.index;
        const valueEndIndex     = startIndex + v.length;
        const nextColonIndex    = argList.indexOf(':', valueEndIndex);
        const nextColon         = nextColonIndex < 0 ? null : argList.slice(valueEndIndex, nextColonIndex + 1);
        const nextColonBelongs  = nextColon && nextColon.trim() === ':' ? true : false;
        const currentMatchIsKey = nextColonBelongs;
        // const endIndex          = !nextColonBelongs ? startIndex : (nextColonIndex + 1);
        // const matchArea     = argList.slice(startIndex, endIndex - startIndex);
        // console.log('\t-> iter res', {
        //   v,
        //   startIndex,
        //   valueEndIndex,
        //   nextColonIndex,
        //   nextColon,
        //   nextColonBelongs,
        //   endIndex,
        //   matchArea,
        //   currentMatchIsKey,
        // });
        currentMatchIsKey ? args.push(`'${v}'`) : args.push(v);
      }

      this.name = name;
      this.filter = filter;
      this.args = args;

      return this;
    }
  };

  function construct (str) {
    var instance = Object.create(_filterInstance);
    return instance.parse(str);
  }

  function register (name, filter) {
    filters[name] = filter;
  }

  function clear () {
    filters = {};
  }

  return {
    construct,
    register,
    clear,
    get filters() {
      return Object.assign({}, filters);
    }
  };
});

// CONCATENATED MODULE: ./src/parser.js




/* harmony default export */ var parser = (function (Tag, Filter) {
  var stream = {
    init: function (tokens) {
      this.tokens = tokens;
      this.handlers = {};
      return this;
    },
    on: function (name, cb) {
      this.handlers[name] = cb;
      return this;
    },
    trigger: function (event, arg) {
      var h = this.handlers[event];
      if (typeof h === 'function') {
        h(arg);
        return true;
      }
    },
    start: function () {
      this.trigger('start');
      var token;
      while (!this.stopRequested && (token = this.tokens.shift())) {
        if (this.trigger('token', token)) continue;
        if (token.type === 'tag' &&
            this.trigger(`tag:${token.name}`, token)) {
          continue;
        }
        var template = parseToken(token, this.tokens);
        this.trigger('template', template);
      }
      if (!this.stopRequested) this.trigger('end');
      return this;
    },
    stop: function () {
      this.stopRequested = true;
      return this;
    }
  };

  function parse (tokens) {
    var token;
    var templates = [];
    while ((token = tokens.shift())) {
      templates.push(parseToken(token, tokens));
    }
    return templates;
  }

  function parseToken (token, tokens) {
    try {
      var tpl = null;
      if (token.type === 'tag') {
        tpl = parseTag(token, tokens);
      } else if (token.type === 'value') {
        tpl = parseValue(token.value);
      } else { // token.type === 'html'
        tpl = token;
      }
      tpl.token = token;
      return tpl;
    } catch (e) {
      throw new ParseError(e, token);
    }
  }

  function parseTag (token, tokens) {
    if (token.name === 'continue' || token.name === 'break') return token;
    return Tag.construct(token, tokens);
  }

  function parseValue (str) {
    var match = matchValue(str);
    util_assert(match, `illegal value string: ${str}`);

    var initial = match[0];
    str = str.substr(match.index + match[0].length);

    var filters = [];
    while ((match = lexical_filter.exec(str))) {
      filters.push([match[0].trim()]);
    }

    return {
      type: 'value',
      initial: initial,
      filters: filters.map(str => Filter.construct(str))
    };
  }

  function parseStream (tokens) {
    var s = Object.create(stream);
    return s.init(tokens);
  }

  return {
    parse,
    parseTag,
    parseStream,
    parseValue
  };
});

// CONCATENATED MODULE: ./src/tags/assign.js



const re = new RegExp(`(${identifier.source})\\s*=(.*)`);

/* harmony default export */ var tags_assign = (function (liquid) {
  liquid.registerTag('assign', {
    parse: function (token) {
      var match = token.args.match(re);
      util_assert(match, `illegal token ${token.raw}`);
      this.key = match[1];
      this.value = match[2];
    },
    render: function (scope) {
      return liquid.evalValue(this.value, scope).then(value => {
        scope.set(this.key, value);
        return '';
      });
    }
  });
});

// CONCATENATED MODULE: ./src/tags/capture.js



const capture_re = new RegExp(`(${identifier.source})`);

/* harmony default export */ var capture = (function (liquid) {
  liquid.registerTag('capture', {
    parse: function (tagToken, remainTokens) {
      var match = tagToken.args.match(capture_re);
      util_assert(match, `${tagToken.args} not valid identifier`);

      this.variable = match[1];
      this.templates = [];

      var stream = liquid.parser.parseStream(remainTokens);
      stream.on('tag:endcapture', token => stream.stop())
        .on('template', tpl => this.templates.push(tpl))
        .on('end', x => {
          throw new Error(`tag ${tagToken.raw} not closed`);
        });
      stream.start();
    },
    render: function (scope, hash) {
      return liquid.renderer.renderTemplates(this.templates, scope)
        .then((html) => {
          scope.set(this.variable, html);
        });
    }
  });
});

// CONCATENATED MODULE: ./src/tags/case.js



const evaluateBranch = (val, cond) => {
  return Promise.all([ val, cond ]).then(results => {
    return results[0] === results[1];
  });
};

/* harmony default export */ var tags_case = (function (liquid) {
  liquid.registerTag('case', {

    parse: function (tagToken, remainTokens) {
      this.cond = tagToken.args;
      this.cases = [];
      this.elseTemplates = [];

      var p = [];
      var stream = liquid.parser.parseStream(remainTokens)
        .on('tag:when', token => {
          this.cases.push({
            val: token.args,
            templates: p = []
          });
        })
        .on('tag:else', () => (p = this.elseTemplates))
        .on('tag:endcase', token => stream.stop())
        .on('template', tpl => p.push(tpl))
        .on('end', x => {
          throw new Error(`tag ${tagToken.raw} not closed`);
        });

      stream.start();
    },

    render: function (scope, hash) {
      return firstSeries(this.cases, branch => {
        return new Promise((resolve, reject) => {
          evaluateBranch(evalExp(branch.val, scope), evalExp(this.cond, scope)).then(found => {
            if (found) {
              resolve(liquid.renderer.renderTemplates(branch.templates, scope));
            } else {
              reject();
            }
          });
        });
      }, () => liquid.renderer.renderTemplates(this.elseTemplates, scope));
    }
  });
});

// CONCATENATED MODULE: ./src/tags/comment.js
/* harmony default export */ var comment = (function (liquid) {
  liquid.registerTag('comment', {
    parse: function (tagToken, remainTokens) {
      var stream = liquid.parser.parseStream(remainTokens);
      stream
        .on('token', token => {
          if (token.name === 'endcomment') stream.stop();
        })
        .on('end', x => {
          throw new Error(`tag ${tagToken.raw} not closed`);
        });
      stream.start();
    }
  });
});

// CONCATENATED MODULE: ./src/tags/cycle.js




const groupRE = new RegExp(`^(?:(${lexical_value.source})\\s*:\\s*)?(.*)$`);
const candidatesRE = new RegExp(lexical_value.source, 'g');

/* harmony default export */ var cycle = (function (liquid) {
  liquid.registerTag('cycle', {

    parse: function (tagToken, remainTokens) {
      var match = groupRE.exec(tagToken.args);
      util_assert(match, `illegal tag: ${tagToken.raw}`);

      this.group = match[1] || '';
      var candidates = match[2];

      this.candidates = [];

      while ((match = candidatesRE.exec(candidates))) {
        this.candidates.push(match[0]);
      }
      util_assert(this.candidates.length, `empty candidates: ${tagToken.raw}`);
    },

    render: function (scope, hash) {
      return evalValue(this.group, scope).then(group => {
        var fingerprint = `cycle:${group}:` + this.candidates.join(',');

        var groups = scope.opts.groups = scope.opts.groups || {};
        var idx = groups[fingerprint];

        if (idx === undefined) {
          idx = groups[fingerprint] = 0;
        }

        var candidate = this.candidates[idx];
        idx = (idx + 1) % this.candidates.length;
        groups[fingerprint] = idx;
        return evalValue(candidate, scope);
      });
    }
  });
});

// CONCATENATED MODULE: ./src/tags/decrement.js




/* harmony default export */ var decrement = (function (liquid) {
  liquid.registerTag('decrement', {
    parse: function (token) {
      var match = token.args.match(identifier);
      util_assert(match, `illegal identifier ${token.args}`);
      this.variable = match[0];
    },
    render: function (scope, hash) {
      return scope.get(this.variable).then(v => {
        if (typeof v !== 'number') v = 0;
        scope.set(this.variable, v - 1);
      });
    }
  });
});

// CONCATENATED MODULE: ./src/tags/for.js







const for_re = new RegExp(`^(${identifier.source})\\s+in\\s+` +
    `(${lexical_value.source})` +
    `(?:\\s+${lexical_hash.source})*` +
    `(?:\\s+(reversed))?` +
    `(?:\\s+${lexical_hash.source})*$`);

/* harmony default export */ var tags_for = (function (liquid) {
  liquid.registerTag('for', {

    parse: function (tagToken, remainTokens) {
      var match = for_re.exec(tagToken.args);
      util_assert(match, `illegal tag: ${tagToken.raw}`);
      this.variable = match[1];
      this.collection = match[2];
      this.reversed = !!match[3];

      this.templates = [];
      this.elseTemplates = [];

      var p;
      var stream = liquid.parser.parseStream(remainTokens)
        .on('start', () => (p = this.templates))
        .on('tag:else', () => (p = this.elseTemplates))
        .on('tag:endfor', () => stream.stop())
        .on('template', tpl => p.push(tpl))
        .on('end', () => {
          throw new Error(`tag ${tagToken.raw} not closed`);
        });

      stream.start();
    },

    render: function (scope, hash) {
      return evalExp(this.collection, scope).then(collection => {
        collection = collection || [];
        if (!Array.isArray(collection)) {
          if (isString(collection) && collection.length > 0) {
            collection = [collection];
          } else if (isObject(collection)) {
            collection = Object.keys(collection).map(key => collection[key]);
          }
        }
        if (!Array.isArray(collection) || !collection.length) {
          return liquid.renderer.renderTemplates(this.elseTemplates, scope);
        }

        var length = collection.length;
        var offset = hash.offset || 0;
        var limit = (hash.limit === undefined) ? collection.length : hash.limit;

        collection = collection.slice(offset, offset + limit);
        if (this.reversed) collection.reverse();

        var contexts = collection.map((item, i) => {
          var ctx = {};
          ctx[this.variable] = item;
          ctx.forloop = {
            _target: collection, // expose object being iterated for filters
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
        return mapSeries(contexts, (context) => {
          return Promise.resolve()
            .then(() => scope.push(context))
            .then(() => liquid.renderer.renderTemplates(this.templates, scope))
            .then(partial => (html += partial))
            .catch(e => {
              if (e instanceof RenderBreakError) {
                html += e.resolvedHTML;
                if (e.message === 'continue') return;
              }
              throw e;
            })
            .then(() => scope.pop());
        }).catch((e) => {
          if (e instanceof RenderBreakError && e.message === 'break') {
            return;
          }
          throw e;
        }).then(() => html);
      });
    }
  });
});

// CONCATENATED MODULE: ./src/tags/if.js



/* harmony default export */ var tags_if = (function (liquid) {
  liquid.registerTag('if', {

    parse: function (tagToken, remainTokens) {
      this.branches = [];
      this.elseTemplates = [];

      var p;
      var stream = liquid.parser.parseStream(remainTokens)
        .on('start', () => this.branches.push({
          cond: tagToken.args,
          templates: (p = [])
        }))
        .on('tag:elsif', token => {
          this.branches.push({
            cond: token.args,
            templates: p = []
          });
        })
        .on('tag:else', () => (p = this.elseTemplates))
        .on('tag:endif', token => stream.stop())
        .on('template', tpl => p.push(tpl))
        .on('end', x => {
          throw new Error(`tag ${tagToken.raw} not closed`);
        });

      stream.start();
    },

    render: function (scope, hash) {
      return firstSeries(this.branches, branch => {
        return new Promise((resolve, reject) => {
          return evalExp(branch.cond, scope).then(cond => {
            if (isTruthy(cond)) {
              resolve(liquid.renderer.renderTemplates(branch.templates, scope));
            } else {
              reject();
            }
          });
        });
      }, () => liquid.renderer.renderTemplates(this.elseTemplates, scope));
    }
  });
});

// CONCATENATED MODULE: ./src/tags/include.js




const withRE = new RegExp(`with\\s+(${lexical_value.source})`);
const staticFileRE = /\S+/;

/* harmony default export */ var include = (function (liquid) {
  liquid.registerTag('include', {
    parse: function (token) {
      var match = staticFileRE.exec(token.args);
      if (match) {
        this.staticValue = match[0];
      }

      match = lexical_value.exec(token.args);
      if (match) {
        this.value = match[0];
      }

      match = withRE.exec(token.args);
      if (match) {
        this.with = match[1];
      }
    },
    render: function (scope, hash) {
      return (scope.opts.dynamicPartials
        ? evalValue(this.value, scope)
        : Promise.resolve(this.staticValue)).then(filepath => {
        util_assert(filepath, `cannot include with empty filename`);
        var originBlocks = scope.opts.blocks;
        var originBlockMode = scope.opts.blockMode;
        scope.opts.blocks = {};
        scope.opts.blockMode = 'output';

        return (!this.with ? Promise.resolve() : evalValue(this.with, scope).then(result => {
          hash[filepath] = result;
          return result;
        })).then(() => {
          return liquid.getTemplate(filepath, scope.opts.root)
            .then((templates) => {
              scope.push(hash);
              return liquid.renderer.renderTemplates(templates, scope);
            })
            .then((html) => {
              scope.pop();
              scope.opts.blocks = originBlocks;
              scope.opts.blockMode = originBlockMode;
              return html;
            });
        });
      });
    }
  });
});

// CONCATENATED MODULE: ./src/tags/increment.js



/* harmony default export */ var increment = (function (liquid) {
  liquid.registerTag('increment', {
    parse: function (token) {
      var match = token.args.match(identifier);
      util_assert(match, `illegal identifier ${token.args}`);
      this.variable = match[0];
    },
    render: function (scope, hash) {
      return scope.get(this.variable).then(v => {
        if (typeof v !== 'number') v = 0;
        scope.set(this.variable, v + 1);
      });
    }
  });
});

// CONCATENATED MODULE: ./src/tags/layout.js




const layout_staticFileRE = /\S+/;

/*
 * blockMode:
 * * "store": store rendered html into blocks
 * * "output": output rendered html
 */

/* harmony default export */ var tags_layout = (function (liquid) {
  liquid.registerTag('layout', {
    parse: function (token, remainTokens) {
      var match = layout_staticFileRE.exec(token.args);
      if (match) {
        this.staticLayout = match[0];
      }

      match = lexical_value.exec(token.args);
      if (match) {
        this.layout = match[0];
      }

      this.tpls = liquid.parser.parse(remainTokens);
    },
    render: function (scope, hash) {
      return (scope.opts.dynamicPartials ? evalValue(this.layout, scope) : Promise.resolve(this.staticLayout)).then(layout => {
        util_assert(layout, `cannot apply layout with empty filename`);

        // render the remaining tokens immediately
        scope.opts.blockMode = 'store';
        return liquid.renderer.renderTemplates(this.tpls, scope)
          .then(html => {
            if (scope.opts.blocks[''] === undefined) {
              scope.opts.blocks[''] = html;
            }
            return liquid.getTemplate(layout, scope.opts.root);
          })
          .then(templates => {
            // push the hash
            scope.push(hash);
            scope.opts.blockMode = 'output';
            return liquid.renderer.renderTemplates(templates, scope);
          })
          // pop the hash
          .then(partial => {
            scope.pop();
            return partial;
          });
      });
    }
  });

  liquid.registerTag('block', {
    parse: function (token, remainTokens) {
      var match = /\w+/.exec(token.args);
      this.block = match ? match[0] : '';

      this.tpls = [];
      var stream = liquid.parser.parseStream(remainTokens)
        .on('tag:endblock', () => stream.stop())
        .on('template', tpl => this.tpls.push(tpl))
        .on('end', () => {
          throw new Error(`tag ${token.raw} not closed`);
        });
      stream.start();
    },
    render: function (scope) {
      return Promise.resolve(scope.opts.blocks[this.block])
        .then(html => html === undefined
          // render default block
          ? liquid.renderer.renderTemplates(this.tpls, scope)
          // use child-defined block
          : html)
        .then(html => {
          if (scope.opts.blockMode === 'store') {
            scope.opts.blocks[this.block] = html;
            return '';
          }
          return html;
        });
    }
  });
});

// CONCATENATED MODULE: ./src/tags/raw.js

/* harmony default export */ var tags_raw = (function (liquid) {
  liquid.registerTag('raw', {
    parse: function (tagToken, remainTokens) {
      this.tokens = [];

      var stream = liquid.parser.parseStream(remainTokens);
      stream
        .on('token', token => {
          if (token.name === 'endraw') stream.stop();
          else this.tokens.push(token);
        })
        .on('end', x => {
          throw new Error(`tag ${tagToken.raw} not closed`);
        });
      stream.start();
    },
    render: function (scope, hash) {
      var tokens = this.tokens.map(token => token.raw).join('');
      return Promise.resolve(tokens);
    }
  });
});

// CONCATENATED MODULE: ./src/tags/tablerow.js




const tablerow_re = new RegExp(`^(${identifier.source})\\s+in\\s+` +
  `(${lexical_value.source})` +
  `(?:\\s+${lexical_hash.source})*$`);

/* harmony default export */ var tablerow = (function (liquid) {
  liquid.registerTag('tablerow', {

    parse: function (tagToken, remainTokens) {
      var match = tablerow_re.exec(tagToken.args);
      util_assert(match, `illegal tag: ${tagToken.raw}`);

      this.variable = match[1];
      this.collection = match[2];
      this.templates = [];

      var p;
      var stream = liquid.parser.parseStream(remainTokens)
        .on('start', () => (p = this.templates))
        .on('tag:endtablerow', token => stream.stop())
        .on('template', tpl => p.push(tpl))
        .on('end', () => {
          throw new Error(`tag ${tagToken.raw} not closed`);
        });

      stream.start();
    },

    render: function (scope, hash) {
      return evalExp(this.collection, scope).then(collection => {
        collection = collection || [];
        var html = '<table>';
        var offset = hash.offset || 0;
        var limit = (hash.limit === undefined) ? collection.length : hash.limit;

        var cols = hash.cols;
        var row;
        var col;
        if (!cols) throw new Error(`illegal cols: ${cols}`);

        // build array of arguments to pass to sequential promises...
        collection = collection.slice(offset, offset + limit);
        var contexts = [];
        collection.some((item, i) => {
          var ctx = {};
          ctx[this.variable] = item;
          contexts.push(ctx);
        });

        return mapSeries(contexts,
          (context, idx) => {
            row = Math.floor(idx / cols) + 1;
            col = (idx % cols) + 1;
            if (col === 1) {
              if (row !== 1) {
                html += '</tr>';
              }
              html += `<tr class="row${row}">`;
            }

            html += `<td class="col${col}">`;
            scope.push(context);
            return liquid.renderer
              .renderTemplates(this.templates, scope)
              .then((partial) => {
                scope.pop(context);
                html += partial;
                html += '</td>';
                return html;
              });
          })
          .then(() => {
            if (row > 0) {
              html += '</tr>';
            }
            html += '</table>';
            return html;
          });
      });
    }
  });
});

// CONCATENATED MODULE: ./src/tags/unless.js


/* harmony default export */ var unless = (function (liquid) {
  liquid.registerTag('unless', {
    parse: function (tagToken, remainTokens) {
      this.templates = [];
      this.elseTemplates = [];
      var p;
      var stream = liquid.parser.parseStream(remainTokens)
        .on('start', x => {
          p = this.templates;
          this.cond = tagToken.args;
        })
        .on('tag:else', () => (p = this.elseTemplates))
        .on('tag:endunless', token => stream.stop())
        .on('template', tpl => p.push(tpl))
        .on('end', x => {
          throw new Error(`tag ${tagToken.raw} not closed`);
        });

      stream.start();
    },

    render: function (scope, hash) {
      // console.log('unless cond', this.cond);
      return evalExp(this.cond, scope).then(cond => {
        // console.log('unless cond; eval', cond, 'isFalsy?', isFalsy(cond), {
        //   truthy: this.templates,
        //   falsy: this.elseTemplates,
        // });
        const result = isFalsy(cond)
          ? liquid.renderer.renderTemplates(this.templates, scope)
          : liquid.renderer.renderTemplates(this.elseTemplates, scope);
        // result.then(_result => {
        //   console.log('unless cond; result', `"${_result}"`);
        //   return _result;
        // });
        return result;
      });
    }
  });
});

// CONCATENATED MODULE: ./src/tags/index.js















/* harmony default export */ var tags = (function (engine) {
  [
    tags_assign,
    capture,
    tags_case,
    comment,
    cycle,
    decrement,
    tags_for,
    tags_if,
    include,
    increment,
    tags_layout,
    tags_raw,
    tablerow,
    unless
  ].forEach(registerTag => registerTag(engine));
});

// EXTERNAL MODULE: ./node_modules/lodash.sortby/index.js
var lodash_sortby = __webpack_require__(2);
var lodash_sortby_default = /*#__PURE__*/__webpack_require__.n(lodash_sortby);

// EXTERNAL MODULE: ./node_modules/lodash.uniq/index.js
var lodash_uniq = __webpack_require__(3);
var lodash_uniq_default = /*#__PURE__*/__webpack_require__.n(lodash_uniq);

// CONCATENATED MODULE: ./src/util/args.js
function argsToObject (args) {
  let obj = {};
  for (let i = 0; i < args.length; i += 2) {
    let key = args[i];
    let value = args[i + 1];
    obj[key] = value;
  }
  return obj;
}

// CONCATENATED MODULE: ./src/util/object-path.js



const object_path_delimiters = [ `'`, '"' ];

function object_path_matchRightBracket (str, begin) {
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

function splitPath (str) {
  if (typeof str !== 'string') {
    return [];
  }
  let strLen = str.length;
  let tokens = [];
  for (let cursor = 0; cursor < strLen;) {
    // log('[loop]', str[cursor]);
    /* eslint-disable no-case-declarations */
    switch (str[cursor]) {
    case '[':
      let delimiter = str[cursor + 1];
      if (object_path_delimiters.indexOf(delimiter) > -1) { // access by quoted name: foo["bar"]
        let nameEndIndex = str.indexOf(delimiter, cursor + 2);
        if (nameEndIndex < 0) {
          throw new AssertionError(`unbalanced ${delimiter}: "${str}"`);
        }
        let nameToken = str.slice(cursor + 2, nameEndIndex);
        tokens.push(nameToken);
        cursor = nameEndIndex + 2; // the closing " and ]
        // log('BRACKET w/delimiter',nameEndIndex, nameToken);
      } else { // access by variable: foo[bar.coo]
        let variableEndIndex = object_path_matchRightBracket(str, cursor + 1);
        if (variableEndIndex < 0) {
          throw new AssertionError(`unbalanced []: "${str}"`);
        }
        let variableToken = str.slice(cursor + 1, variableEndIndex);
        if (isInteger(variableToken)) { // foo[1]
          // log('BRACKET; number', variableToken);
          tokens.push(variableToken);
        } else {
          // log('BRACKET; name', variableToken);
          tokens.push(this.get(variableToken));
        }
        cursor = variableEndIndex + 1;
      }
      break;
    case '.': // separator: foo.bar, foo[0].bar
      cursor++;
      // log('DOT');
      break;
    default: // access by unquoted name: foo.bar
      let nextBracketIndex = str.indexOf('[', cursor);
      let nextDotIndex = str.indexOf('.', cursor);
      let foundIndexes = [ strLen, nextBracketIndex, nextDotIndex ].filter(index => index > -1);
      let nextSeparator = Math.min.apply(Math, foundIndexes);
      let unquotedNameToken = str.slice(cursor, nextSeparator);
      // log('DEFAULT', {nextBracketIndex,nextDotIndex,nextSeparator,unquotedNameToken});
      tokens.push(unquotedNameToken);
      cursor = nextSeparator;
      break;
    }
    /* eslint-enable no-case-declarations */
  }
  return tokens;
}

// CONCATENATED MODULE: ./src/locale.js


class locale_Locale {
  constructor (translation, id) {
    this.translation = translation;
    this.id = id;
  }

  splitPath (str) {
    return splitPath(str);
  }

  translate (str) {
    let tokens = this.splitPath(str);
    const result = tokens.reduce((value, currentValue) => {
      if (currentValue in value) {
        return value[currentValue];
      } else {
        throw new Error(`invalid translation key: "${str}"`);
      }
    }, this.translation);
    if (typeof result !== 'string') { // make sure we're not returning this.translation or bad translation data
      throw new Error(`invalid translation key: "${str}"`);
    }
    return result;
  }
}

// some implementations of liquid add higher level logic to filters e.g. shopify's section->schema->locale
// the only way to be able to support that, is to allow locales to be provided in the scope.
// this is a common key for accessing locales set by tags.  these locales will be detected
// by filters.translate and checked first before looking at options.locale
locale_Locale.LOCALE_SCOPE_KEY = '_liquid_locale';

// CONCATENATED MODULE: ./src/filters.js









const LOCALE_SCOPE_KEY = locale_Locale.LOCALE_SCOPE_KEY;

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
    'append': (v, arg) => filters_stringify(v) + arg,
    'capitalize': str => filters_stringify(str).charAt(0).toUpperCase() + str.slice(1),
    'ceil': v => Math.ceil(v),
    'concat': (v, arg) => Array.prototype.concat.call(toCollection(v), arg),
    compact: v => !Array.isArray(v) ? null : v.filter(v => v !== null && v !== undefined),
    'date': (v, arg) => {
      var date = v;
      if (v === 'now') {
        date = new Date();
      } else if (isString(v)) {
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
    'downcase': v => filters_stringify(v).toLowerCase(),
    'escape': filters_escape,
    'escape_once': str => filters_escape(filters_unescape(str)),
    'first': v => toCollection(v)[0],
    'floor': v => Math.floor(numberify(v)),
    'join': (v, arg) => toCollection(v).join(arg),
    'last': v => {
      const collection = toCollection(v);
      return filters_stringify(collection[collection.length - 1]);
    },
    // TODO: don't use regex
    'lstrip': v => filters_stringify(v).replace(/^\s+/, ''),
    'map': (arr, arg) => toCollection(arr).map(v => v && typeof v === 'object' ? v[arg] : null),
    'minus': bindFixed((v, arg) => numberify(v) - numberify(arg)),
    'modulo': bindFixed((v, arg) => numberify(v) % numberify(arg)),
    'newline_to_br': v => filters_stringify(v).replace(/\n/g, '<br />'),
    'plus': bindFixed((v, arg) => numberify(v) + numberify(arg)),
    'prepend': (v, arg) => arg + filters_stringify(v),
    'remove': (v, arg) => filters.replace(v, arg, ''),
    'remove_first': (v, l) => filters.replace_first(v, l, ''),
    'replace': (v, pattern, replacement) => filters.split(v, pattern).join(filters_stringify(replacement)),
    'replace_first': (v, arg1, arg2) => {
      const split = filters.split(v, arg1);
      const beforeRemove = split.shift();
      const afterRemove = split.join(arg1);
      return beforeRemove + filters_stringify(arg2) + afterRemove;
    },
    'reverse': v => toCollection(v).reverse(),
    'round': (v, arg) => {
      var amp = Math.pow(10, numberify(arg) || 0);
      return Math.round(numberify(v) * amp, numberify(arg)) / amp;
    },
    // TODO: don't use regex
    'rstrip': str => filters_stringify(str).replace(/\s+$/, ''),
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
      filters_stringify(v).substr(begin, length === undefined ? 1 : length),
    'sort': (v, property) => {
      const collection = toCollection(v);
      if (property) {
        return lodash_sortby_default()(collection, property);
      } else {
        return collection.sort();
      }
    },
    'split': (v, arg) => filters_stringify(v).split(arg),
    'strip': (v) => filters_stringify(v).trim(),
    'strip_html': v => {
      const result = filters_stringify(v).replace(/<\/?[^>]*?\/?>/gm, '').trim();
      return result;
    },
    'strip_newlines': v => filters_stringify(v).replace(/[\n\r]/g, ''),
    'times': (v, arg) => numberify(v) * numberify(arg),
    'truncate': (v, l, o) => {
      v = filters_stringify(v);
      o = (o === undefined) ? '...' : o;
      l = l || 16;
      if (v.length <= l) return v;
      return v.substr(0, l - o.length) + o;
    },
    'truncatewords': (v, l, o) => {
      if (o === undefined) o = '...';
      var arr = filters_stringify(v).split(' ');
      var ret = arr.slice(0, l).join(' ');
      if (arr.length > l) ret += o;
      return ret;
    },
    'uniq': v => lodash_uniq_default()(toCollection(v)),
    'upcase': str => filters_stringify(str).toUpperCase(),
    'url_encode': v => encodeURIComponent(filters_stringify(v)),
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

function filters_escape (str) {
  return filters_stringify(str).replace(/&|<|>|"|'/g, m => escapeMap[m]);
}

function filters_unescape (str) {
  return filters_stringify(str).replace(/&(amp|lt|gt|#34|#39);/g, m => unescapeMap[m]);
}

function getFixed (v) {
  var p = (v + '').split('.');
  return (p.length > 1) ? p[1].length : 0;
}

function getMaxFixed (l, r) {
  return Math.max(getFixed(l), getFixed(r));
}

function filters_stringify (obj) {
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
  return forOwn(filters, (func, name) => liquid.registerFilter(name, func));
}

function isValidDate (date) {
  return date instanceof Date && !isNaN(date.getTime());
}

/* harmony default export */ var src_filters = (registerAll);

// CONCATENATED MODULE: ./src/main.js

























var _engine = {
  init: function (tag, filter, options) {
    if (options.cache) {
      this.cache = {};
    }
    this.options = options;
    this.tag = tag;
    this.filter = filter;
    this.parser = parser(tag, filter);
    this.renderer = src_render();

    tags(this);
    src_filters(this);

    return this;
  },
  loadTranslation: function (translation, id, defaultLocale = null) {
    this.options.locale = new locale_Locale(translation, id);
    if (null !== defaultLocale && !(defaultLocale instanceof locale_Locale)) {
      throw new Error('defaultLocale must be null or instance of Locale');
    }
    this.options.defaultLocale = defaultLocale;
  },
  tokenize: function (html, filepath) {
    var tokens = tokenizer_parse(html, filepath, this.options);
    return tokens;
  },
  parse: function (html, filepath) {
    var tokens = this.tokenize(html, filepath);
    return this.parser.parse(tokens);
  },
  render: function (tpl, ctx, opts) {
    opts = underscore_assign({}, this.options, opts);
    var scope = createScope(ctx, opts);
    return this.renderer.renderTemplates(tpl, scope);
  },
  parseAndRender: function (html, ctx, opts) {
    return Promise.resolve()
      .then(() => this.parse(html))
      .then(tpl => this.render(tpl, ctx, opts));
  },
  renderFile: function (filepath, ctx, opts) {
    opts = underscore_assign({}, opts);
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
    root = uniq(root);
    var paths = root.map(root => external_path_default.a.resolve(root, filepath));
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
    if (!external_path_default.a.extname(filepath)) {
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
      util_assert(Array.isArray(this.root) || isString(this.root),
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
  if (isString(value)) return [value];
  return [];
}

function createEngine (options) {
  options = underscore_assign({
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
  engine.init(src_tag(), src_filter(options), options);
  return engine;
}


/***/ })
/******/ ]);
});
//# sourceMappingURL=liquidjs.js.map