import { splitPath } from './util/object-path.js';

export default class Locale {
  constructor (translation, id) {
    this.translation = translation;
    this.id = id;
  }

  splitPath (str) {
    return splitPath(str);
  }

  translate (str) {
    let tokens = this.splitPath(str);
    return tokens.reduce((value, currentValue) => {
      if (currentValue in value) {
        return value[currentValue];
      } else {
        throw new Error(`invalid translation key: "${str}"`);
      }
    }, this.translation);
  }
}

// some implementations of liquid add higher level logic to filters e.g. shopify's section->schema->locale
// the only way to be able to support that, is to allow locales to be provided in the scope.
// this is a common key for accessing locales set by tags.  these locales will be detected
// by filters.translate and checked first before looking at options.locale
Locale.LOCALE_SCOPE_KEY = '_liquid_locale';
