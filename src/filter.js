import * as lexical from './lexical.js';
import * as Syntax from './syntax.js';
import assert from './util/assert.js';
import * as _ from './util/underscore.js';

const valueRE = new RegExp(`${lexical.value.source}`, 'g');

export default function (options) {
  options = _.assign({}, options);
  var filters = {};

  var _filterInstance = {
    render: function (output, scope) {
      return Promise.all(this.args.map(arg => Syntax.evalValue(arg, scope))).then(args => {
        args.unshift(output);
        return this.filter.apply(scope, args);
      });
    },
    parse: function (str) {
      let match = lexical.filterLine.exec(str);
      assert(match, 'illegal filter: ' + str);

      const name = match[1];
      const argList = match[2] || '';
      const filter = filters[name];
      if (typeof filter !== 'function') {
        if (options.strict_filters) {
          throw new TypeError(`undefined filter: ${name}`);
        }
        this.name = name;
        this.filter = x => x;
        this.args = [];
        return this;
      }

      const args = [];
      // console.log('starting while', argList);
      while ((match = valueRE.exec(argList.trim()))) {
        const v = match[0];
        const startIndex        = match.index;
        const valueEndIndex     = startIndex + v.length;
        const nextColonIndex    = argList.indexOf(':', valueEndIndex);
        const nextColon         = nextColonIndex < 0 ? null : argList.slice(valueEndIndex, nextColonIndex + 1);
        const nextColonBelongs  = nextColon && nextColon.trim() === ':' ? true : false;
        const endIndex          = !nextColonBelongs ? startIndex : (nextColonIndex + 1);
        const currentMatchIsKey = nextColonBelongs;
        // const matchArea     = argList.slice(startIndex, endIndex - startIndex);
        // console.log('\t-> iter res', {
        //   v,
        //   startIndex,
        //   valueEndIndex,
        //   nextColonIndex,
        //   nextColon,
        //   nextColonBelongs,
        //   endIndex,
        //   matchArea,
        //   currentMatchIsKey,
        // });
        currentMatchIsKey ? args.push(`'${v}'`) : args.push(v);
      }

      this.name = name;
      this.filter = filter;
      this.args = args;

      return this;
    }
  };

  function construct (str) {
    var instance = Object.create(_filterInstance);
    return instance.parse(str);
  }

  function register (name, filter) {
    filters[name] = filter;
  }

  function clear () {
    filters = {};
  }

  return {
    construct, register, clear
  };
}
