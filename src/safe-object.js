export default class SafeObject {
  constructor(comparisonId) {
    if (undefined !== comparisonId) {
      Object.defineProperty(this, SafeObject.COMPARISON_KEY, {
        enumerable: false,
        value:      comparisonId,
      });
    }
    else {
      // noop. must inherit
    }
  }
  
  toString() {
    return '';
  }
}

SafeObject.COMPARISON_KEY = '_liquid_comparison_id';
