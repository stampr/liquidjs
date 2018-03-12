module.exports = function compatibleArray(arr) {
  if (null === arr) return null;
  if (undefined === arr) return undefined;
  if (!arr.hasOwnProperty('size')) {
    Object.defineProperty(arr, 'size', {
      get: () => arr.length,
    });
  }
  return arr;
};