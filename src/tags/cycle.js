import { evalValue } from '../syntax.js';
import assert from '../util/assert.js';

import * as lexical from '../lexical.js';
const groupRE = new RegExp(`^(?:(${lexical.value.source})\\s*:\\s*)?(.*)$`)
const candidatesRE = new RegExp(lexical.value.source, 'g')

export default function(liquid) {
  liquid.registerTag('cycle', {

    parse: function (tagToken, remainTokens) {
      var match = groupRE.exec(tagToken.args)
      assert(match, `illegal tag: ${tagToken.raw}`)

      this.group = match[1] || ''
      var candidates = match[2]

      this.candidates = []

      while ((match = candidatesRE.exec(candidates))) {
        this.candidates.push(match[0])
      }
      assert(this.candidates.length, `empty candidates: ${tagToken.raw}`)
    },

    render: function (scope, hash) {
      return evalValue(this.group, scope).then(group => {
        var fingerprint = `cycle:${group}:` + this.candidates.join(',')

        var groups = scope.opts.groups = scope.opts.groups || {}
        var idx = groups[fingerprint]

        if (idx === undefined) {
          idx = groups[fingerprint] = 0
        }

        var candidate = this.candidates[idx]
        idx = (idx + 1) % this.candidates.length
        groups[fingerprint] = idx
        return evalValue(candidate, scope)
      })
    }
  })
}
