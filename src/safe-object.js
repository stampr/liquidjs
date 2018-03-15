function SafeObject(comparisonId) {
  Object.defineProperty(this, SafeObject.COMPARISON_KEY, {
    enumerable: false,
    value: comparisonId === undefined ? Date.now() : comparisonId,
  });
}

SafeObject.COMPARISON_KEY = '_liquid_comparison_id';

module.exports = SafeObject;