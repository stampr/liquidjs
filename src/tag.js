import * as lexical from './lexical.js';
import * as Syntax from './syntax.js';
import assert from './util/assert.js';

// const logger = console.log.bind(null, '[TAG]');
const logger = function () {};

// hash { _: [ one, two ], some: 'value', other: 'value' }
const COMMAND_HASH_GROUP_KEY = '_';

const overwrite = (str, originalValue, newValue) => {
  const offsetIndex = str.indexOf(originalValue);
  if (offsetIndex < 0) throw new Error('cannot overwrite non-existent value'); // this is a sanity.  it should never happen
  const endIndex = offsetIndex + originalValue.length;
  const before = str.slice(0, offsetIndex);
  const after = str.slice(endIndex);
  return before + newValue + after;
};

const hash = (markup, scope) => {
  const keys = [];
  const vals = [];
  const obj = {
    [COMMAND_HASH_GROUP_KEY]: [],
  };
  let markupCopy = markup; // used to find "commands";
  let commandMatches;
  lexical.hashCapture.lastIndex = 0;
  while ((commandMatches = lexical.hashCapture.exec(markup))) {
    markupCopy = overwrite(markupCopy, commandMatches[0], ''); // strip our commandMatches
    const k = commandMatches[1];
    const v = commandMatches[2];
    logger('hash; arg commandMatches', { k, v });
    keys.push(k);
    vals.push(Syntax.evalValue(v, scope));
  }
  // markupCopy now contains all the unmatchable hash groups. these are "commands"
  // we do another match to parse out those valid values
  let fallbackCommandMatches;
  lexical.valueCapture.lastIndex = 0;
  while ((fallbackCommandMatches = lexical.valueCapture.exec(markupCopy))) {
    const k = COMMAND_HASH_GROUP_KEY;
    const v = fallbackCommandMatches[0];
    logger('hash; cmd fallbackCommandMatches', { k, v });
    keys.push(k);
    vals.push(Syntax.evalValue(v, scope));
  }
  return Promise.all(vals).then(results => {
    results.forEach((v, i) => {
      const k = keys[i];
      if (k === COMMAND_HASH_GROUP_KEY) {
        obj[COMMAND_HASH_GROUP_KEY].push(v);
      } else {
        obj[k] = v;
      }
    });
    logger('hash; result', obj);
    return obj;
  });
};

export default function () {
  var tagImpls = {};

  var _tagInstance = {
    render: function (scope) {
      return hash(this.token.args, scope).then(obj => {
        var impl = this.tagImpl;
        if (typeof impl.render !== 'function') {
          return Promise.resolve('');
        }
        return impl.render(scope, obj);
      });
    },
    parse: function (token, tokens) {
      this.type = 'tag';
      this.token = token;
      this.name = token.name;

      var tagImpl = tagImpls[this.name];
      assert(tagImpl, `tag ${this.name} not found`);
      this.tagImpl = Object.create(tagImpl);
      if (this.tagImpl.parse) {
        this.tagImpl.parse(token, tokens);
      }
    }
  };

  const register = (name, tag) => {
    tagImpls[name] = tag;
  };

  const construct = (token, tokens) => {
    var instance = Object.create(_tagInstance);
    instance.parse(token, tokens);
    return instance;
  };

  const clear = () => {
    tagImpls = {};
  };

  return {
    construct,
    register,
    clear
  };
}
