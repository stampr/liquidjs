const Syntax = require('./syntax.js')
const Promise = require('any-promise')
const mapSeries = require('./util/promise.js').mapSeries
const RenderBreakError = require('./util/error.js').RenderBreakError
const RenderError = require('./util/error.js').RenderError
const assert = require('./util/assert.js')

var render = {

  renderTemplates: function (templates, scope) {
    assert(scope, 'unable to evalTemplates: scope undefined')

    var html = ''
    return mapSeries(templates, (tpl) => {
      return renderTemplate.call(this, tpl)
        .then(partial => (html += partial))
        .catch(e => {
          if (e instanceof RenderBreakError) {
            e.resolvedHTML = html
            throw e
          }
          throw new RenderError(e, tpl)
        })
    }).then(() => html)

    function renderTemplate (template) {
      if (template.type === 'tag') {
        return this.renderTag(template, scope)
          .then(partial => partial === undefined ? '' : partial)
      } else if (template.type === 'value') {
        return this.evalValue(template, scope)
          .then(partial => partial === undefined ? '' : stringify(partial))
      } else { // template.type === 'html'
        return Promise.resolve(template.value)
      }
    }
  },

  renderTag: function (template, scope) {
    if (template.name === 'continue') {
      return Promise.reject(new RenderBreakError('continue'))
    }
    if (template.name === 'break') {
      return Promise.reject(new RenderBreakError('break'))
    }
    return template.render(scope)
  },

  evalValue: function (template, scope) {
    assert(scope, 'unable to evalValue: scope undefined')
    try {
      // console.log('template.filters', template.filters)
      return Syntax.evalExp(template.initial, scope).then(initialValue => {
        return template.filters.reduce(
          (promise, filter) => {
            return promise.then(prev => {
              return filter.render(prev, scope).then(next => {
                // console.log('evalValue', {prev,next})
                return next
              })
            })
          },
          Promise.resolve(initialValue))
      });
    }
    catch (err) {
      return Promise.reject(err);
    }
  },
}

function factory () {
  var instance = Object.create(render)
  return instance
}

function stringify (val) {
  if (typeof val === 'string') return val
  return JSON.stringify(val)
}

module.exports = factory
