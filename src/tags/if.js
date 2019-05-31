import { isTruthy, evalExp } from '../syntax.js';
import { firstSeries } from '../util/promise.js';

export default function (liquid) {
  liquid.registerTag('if', {

    parse: function (tagToken, remainTokens) {
      this.branches = [];
      this.elseTemplates = [];

      var p;
      var stream = liquid.parser.parseStream(remainTokens)
        .on('start', () => this.branches.push({
          cond: tagToken.args,
          templates: (p = [])
        }))
        .on('tag:elsif', token => {
          this.branches.push({
            cond: token.args,
            templates: p = []
          });
        })
        .on('tag:else', () => (p = this.elseTemplates))
        .on('tag:endif', token => stream.stop())
        .on('template', tpl => p.push(tpl))
        .on('end', x => {
          throw new Error(`tag ${tagToken.raw} not closed`);
        });

      stream.start();
    },

    render: function (scope, hash) {
      return firstSeries(this.branches, branch => {
        return new Promise((resolve, reject) => {
          return evalExp(branch.cond, scope).then(cond => {
            if (isTruthy(cond)) {
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
