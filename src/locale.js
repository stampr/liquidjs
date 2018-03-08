'use strict';

const splitPath = require('./util/object-path.js').splitPath;

function Locale(translation) {
  this.translation = translation;
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

module.exports = Locale;