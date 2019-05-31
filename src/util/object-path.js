import * as lexical from '../lexical.js';
import { AssertionError } from './error.js';

export const delimiters = [ `'`, '"' ];

export function matchRightBracket (str, begin) {
  var stack = 1; // count of '[' - count of ']'
  for (var i = begin; i < str.length; i++) {
    if (str[i] === '[') {
      stack++;
    }
    if (str[i] === ']') {
      stack--;
      if (stack === 0) {
        return i;
      }
    }
  }
  return -1;
}

export function splitPath (str) {
  let strLen = str.length;
  let tokens = [];
  for (let cursor = 0; cursor < strLen;) {
    // log('[loop]', str[cursor]);
    /* eslint-disable no-case-declarations */
    switch (str[cursor]) {
    case '[':
      let delimiter = str[cursor + 1];
      if (delimiters.indexOf(delimiter) > -1) { // access by quoted name: foo["bar"]
        let nameEndIndex = str.indexOf(delimiter, cursor + 2);
        if (nameEndIndex < 0) {
          throw new AssertionError(`unbalanced ${delimiter}: "${str}"`);
        }
        let nameToken = str.slice(cursor + 2, nameEndIndex);
        tokens.push(nameToken);
        cursor = nameEndIndex + 2; // the closing " and ]
        // log('BRACKET w/delimiter',nameEndIndex, nameToken);
      } else { // access by variable: foo[bar.coo]
        let variableEndIndex = matchRightBracket(str, cursor + 1);
        if (variableEndIndex < 0) {
          throw new AssertionError(`unbalanced []: "${str}"`);
        }
        let variableToken = str.slice(cursor + 1, variableEndIndex);
        if (lexical.isInteger(variableToken)) { // foo[1]
          // log('BRACKET; number', variableToken);
          tokens.push(variableToken);
        } else {
          // log('BRACKET; name', variableToken);
          tokens.push(this.get(variableToken));
        }
        cursor = variableEndIndex + 1;
      }
      break;
    case '.': // separator: foo.bar, foo[0].bar
      cursor++;
      // log('DOT');
      break;
    default: // access by unquoted name: foo.bar
      let nextBracketIndex = str.indexOf('[', cursor);
      let nextDotIndex = str.indexOf('.', cursor);
      let foundIndexes = [ strLen, nextBracketIndex, nextDotIndex ].filter(index => index > -1);
      let nextSeparator = Math.min.apply(Math, foundIndexes);
      let unquotedNameToken = str.slice(cursor, nextSeparator);
      // log('DEFAULT', {nextBracketIndex,nextDotIndex,nextSeparator,unquotedNameToken});
      tokens.push(unquotedNameToken);
      cursor = nextSeparator;
      break;
    }
    /* eslint-enable no-case-declarations */
  }
  return tokens;
}
