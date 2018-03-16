'use strict';

const splitPath = require('./util/object-path.js').splitPath;

function Locale(translation, id) {
  this.translation = translation;
  this.id = id;
}

Locale.prototype.splitPath = function(str) {
  return splitPath(str);
};

Locale.prototype.translate = function(str) {
  let tokens = this.splitPath(str);
  return tokens.reduce((value, currentValue) => {
    if (currentValue in value) {
      return value[currentValue];
    }
    else {
      throw new Error(`invalid translation key: "${str}"`);
    }
  }, this.translation);
};

// some implementations of liquid add higher level logic to filters e.g. shopify's section->schema->locale
// the only way to be able to support that, is to allow locales to be provided in the scope.
// this is a common key for accessing locales set by tags.  these locales will be detected
// by filters.translate and checked first before looking at options.locale
Locale.LOCALE_SCOPE_KEY = '_liquid_locale';

module.exports = Locale;