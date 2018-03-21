import { AssertionError } from './error.js';

function assert (predicate, message) {
  if (!predicate) {
    message = message || `expect ${predicate} to be true`
    throw new AssertionError(message)
  }
}

export default assert;
