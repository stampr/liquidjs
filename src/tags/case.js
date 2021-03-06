import { evalExp } from '../syntax.js';
import { firstSeries } from '../util/promise.js';

const evaluateBranch = (val, cond) => {
  return Promise.all([ val, cond ]).then(results => {
    return results[0] === results[1];
  });
};

export default function (liquid) {
  liquid.registerTag('case', {

    parse: function (tagToken, remainTokens) {
      this.cond = tagToken.args;
      this.cases = [];
      this.elseTemplates = [];

      var p = [];
      var stream = liquid.parser.parseStream(remainTokens)
        .on('tag:when', token => {
          this.cases.push({
            val: token.args,
            templates: p = []
          });
        })
        .on('tag:else', () => (p = this.elseTemplates))
        .on('tag:endcase', token => stream.stop())
        .on('template', tpl => p.push(tpl))
        .on('end', x => {
          throw new Error(`tag ${tagToken.raw} not closed`);
        });

      stream.start();
    },

    render: function (scope, hash) {
      return firstSeries(this.cases, branch => {
        return new Promise((resolve, reject) => {
          evaluateBranch(evalExp(branch.val, scope), evalExp(this.cond, scope)).then(found => {
            if (found) {
              resolve(liquid.renderer.renderTemplates(branch.templates, scope));
            } else {
              reject();
            }
          });
        });
      }, () => liquid.renderer.renderTemplates(this.elseTemplates, scope));
    }
  });
}
