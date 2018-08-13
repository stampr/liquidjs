import { isFalsy, evalExp } from '../syntax.js';


export default function(liquid) {
  liquid.registerTag('unless', {
    parse: function (tagToken, remainTokens) {
      this.templates = []
      this.elseTemplates = []
      var p
      var stream = liquid.parser.parseStream(remainTokens)
        .on('start', x => {
          p = this.templates
          this.cond = tagToken.args
        })
        .on('tag:else', () => (p = this.elseTemplates))
        .on('tag:endunless', token => stream.stop())
        .on('template', tpl => p.push(tpl))
        .on('end', x => {
          throw new Error(`tag ${tagToken.raw} not closed`)
        })

      stream.start()
    },

    render: function (scope, hash) {
      // console.log('unless cond', this.cond);
      return evalExp(this.cond, scope).then(cond => {
        // console.log('unless cond; eval', cond, 'isFalsy?', isFalsy(cond), {
        //   truthy: this.templates,
        //   falsy: this.elseTemplates,
        // });
        const result = isFalsy(cond)
          ? liquid.renderer.renderTemplates(this.templates, scope)
          : liquid.renderer.renderTemplates(this.elseTemplates, scope);
        // result.then(_result => {
        //   console.log('unless cond; result', `"${_result}"`);
        //   return _result;
        // });
        return result;
      })
    }
  })
}
