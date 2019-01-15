import SafeObject from './safe-object.js';

const getCompareValue = value => {
  if (value instanceof SafeObject && SafeObject.COMPARISON_KEY in value) {
    return value[SafeObject.COMPARISON_KEY];
  }
  else if (isNullOrUndefined(value)) {
    return null;
  }
  else if (typeof value === 'object') {
    if (Array.isArray(value)) {
      return value.length === 0 ? null : value;
    }
    else if (value.valueOf) {
      return value.valueOf();
    }
    else if (value.toJSON) {
      return value.toJSON();
    }
    else if (value.toString) {
      return value.toString();
    }
    else {
      return Object.keys(value).length === 0 ? null : value;
    }
  }
  else if (typeof value === 'string') {
    return value.length === 0 ? null : value;
  }
  else {
    return value;
  }
};

const isNullOrUndefined = value => null === value || undefined === value;

const createOperator = (EMPTY, handler) => (l, r) => {
  // console.log('compare operator. before: ', { l, r });
  l = getCompareValue(l);
  r = getCompareValue(r);
  // console.log('compare operator. after: ', { l, r });
  return handler(l, r);
};

export default function (isTruthy, EMPTY) {
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
      }
      else if (Array.isArray(l) && l.some) { // supports some
        return l.some(item => getCompareValue(item) === compareValue);
      }
      else {
        return simpleComparison; // sanity/falllback return result of simple compare
      }
    }),

    'and': _createOperator((l, r) => isTruthy(l) && isTruthy(r)),

    'or': _createOperator((l, r) => isTruthy(l) || isTruthy(r)),
  }
}
