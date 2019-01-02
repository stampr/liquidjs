import * as lexical from './lexical.js';
import * as Syntax from './syntax.js';
import assert from './util/assert.js';

// hash { _: [ one, two ], some: 'value', other: 'value' }
const COMMAND_HASH_GROUP_KEY = '_';

function overwrite(str, originalValue, newValue) {
  const offsetIndex = str.indexOf(originalValue);
  if (offsetIndex < 0) throw new Error('cannot overwrite non-existent value'); // this is a sanity.  it should never happen
  const endIndex = offsetIndex + originalValue.length;
  const before = str.slice(0, offsetIndex);
  const after = str.slice(endIndex);
  return before + newValue + after;
}

// ranges are evaluated as syntax.  they should probably be a new special kind of value maybe?
function evalParameter(destination, v, scope) {
  if (lexical.isRange(v)) {
    destination.push(Syntax.evalExp(v, scope));
  }
  else {
    destination.push(Syntax.evalValue(v, scope));
  }
}

function hash (markup, scope) {
  var keys = [];
  var vals = [];
  var obj = {
    [COMMAND_HASH_GROUP_KEY]: [],
  };
  var markupCopy = markup; // used to find "commands"
  var match;
  lexical.hashCapture.lastIndex = 0;
  while ((match = lexical.hashCapture.exec(markup))) {
    markupCopy = overwrite(markupCopy, match[0], ''); // strip our match
    var k = match[1];
    var v = match[2];
    keys.push(k);
    evalParameter(vals, v, scope);
  }
  // markupCopy now contains all the unmatchable hash groups. these are "commands"
  // we do another match to parse out those valid values
  match = null;
  lexical.valueCapture.lastIndex = 0;
  while ((match = lexical.valueCapture.exec(markupCopy))) {
    var k = COMMAND_HASH_GROUP_KEY;
    var v = match[0];
    keys.push(k);
    evalParameter(vals, v, scope);
  }
  return Promise.all(vals).then(results => {
    results.forEach((v, i) => {
      var k = keys[i];
      if (k === COMMAND_HASH_GROUP_KEY) {
        obj[COMMAND_HASH_GROUP_KEY].push(v);
      }
      else {
        obj[k] = v;
      }
    })
    return obj;
  });
}

export default function () {
  var tagImpls = {}

  var _tagInstance = {
    render: function (scope) {
      return hash(this.token.args, scope).then(obj => {
        var impl = this.tagImpl
        if (typeof impl.render !== 'function') {
          return Promise.resolve('')
        }
        return impl.render(scope, obj)
      })
    },
    parse: function (token, tokens) {
      this.type = 'tag'
      this.token = token
      this.name = token.name

      var tagImpl = tagImpls[this.name]
      assert(tagImpl, `tag ${this.name} not found`)
      this.tagImpl = Object.create(tagImpl)
      if (this.tagImpl.parse) {
        this.tagImpl.parse(token, tokens)
      }
    }
  }

  function register (name, tag) {
    tagImpls[name] = tag
  }

  function construct (token, tokens) {
    var instance = Object.create(_tagInstance)
    instance.parse(token, tokens)
    return instance
  }

  function clear () {
    tagImpls = {}
  }

  return {
    construct,
    register,
    clear
  }
}
