const isNull = value => value === null || value === undefined;

export function compatSize (result) {
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

export function compatFirst (result) {
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

export function compatLast (result) {
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
