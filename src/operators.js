const Drop = require('./drop.js');

const comparingEmpty = (EMPTY, ...vars) => !!vars.find(v => v === EMPTY);

const createOperator = (EMPTY, handler) => (l, r) => {
  // HACK: if comparing against EMPTY const we'll stringify first 
  //       because both [] == empty and '' == empty, but i don't think
  //       {} == empty.  since [].toString() is converted to '' this works
  if (comparingEmpty(EMPTY, l, r)) { 
    l = '' + l;
    r = '' + r;
  }
  return handler(l, r);
};

module.exports = function (isTruthy, EMPTY) {
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
