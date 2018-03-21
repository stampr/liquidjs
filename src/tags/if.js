const Liquid = require('../main.js');
const firstSeries = require('../util/promise.js').firstSeries

module.exports = function (liquid) {
  liquid.registerTag('if', {

    parse: function (tagToken, remainTokens) {
      this.branches = []
      this.elseTemplates = []

      var p
      var stream = liquid.parser.parseStream(remainTokens)
        .on('start', () => this.branches.push({
          cond: tagToken.args,
          templates: (p = [])
        }))
        .on('tag:elsif', token => {
          this.branches.push({
            cond: token.args,
            templates: p = []
          })
        })
        .on('tag:else', () => (p = this.elseTemplates))
        .on('tag:endif', token => stream.stop())
        .on('template', tpl => p.push(tpl))
        .on('end', x => {
          throw new Error(`tag ${tagToken.raw} not closed`)
        })

      stream.start()
    },

    render: function (scope, hash) {
      return firstSeries(this.branches, branch => {
        return new Promise((resolve, reject) => {
          return Liquid.evalExp(branch.cond, scope).then(cond => {
            if (Liquid.isTruthy(cond)) {
              resolve(liquid.renderer.renderTemplates(branch.templates, scope))
            }
            else {
              reject()
            }
          })
        })
      }, () => liquid.renderer.renderTemplates(this.elseTemplates, scope))
    }
  })
}
