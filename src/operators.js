import SafeObject from './safe-object.js';

const isNullOrUndefined = value => null === value || undefined === value;

const comparingEmpty = (EMPTY, ...vars) => !!vars.find(v => v === EMPTY);

const createOperator = (EMPTY, handler) => (l, r) => {
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
      if (!l) return false
      if (typeof l.indexOf !== 'function') return false
      return l.indexOf(r) > -1
    }),

    'and': _createOperator((l, r) => isTruthy(l) && isTruthy(r)),

    'or': _createOperator((l, r) => isTruthy(l) || isTruthy(r)),
  }
}
