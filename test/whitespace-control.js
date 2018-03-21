const chai = require('chai')
const expect = chai.expect
const Liquid = require('../src/main.js').createEngine;
const liquid = new Liquid()
chai.use(require('chai-as-promised'))

// NOTE: this file is fragile because of the white
// spaces.  i've been adding literal spaces via ${'  '}
// as tests break.  .editorconfig broke some.


const cases = [
  {
    text: `
      <div>
        <p>
          {{ 'John' }}
        </p>
      </div>
    `,
    expected: `
      <div>
        <p>
          John
        </p>
      </div>
    `
  }, {
    text: `
      <div>
        <p>


          {{- 'John' -}}


        </p>
      </div>
    `,
    expected: `
      <div>
        <p>John</p>
      </div>
    `
  }, {
    text: `
      <div>
        <p>


          {%- if true -%}
          yes
          {%- endif -%}


        </p>
      </div>
    `,
    expected: `
      <div>
        <p>yes</p>
      </div>
    `
  }, {
    text: `
      <div>
        <p>
          {% if true %}
          yes
          {% endif %}
        </p>
      </div>
    `,
    expected: `
      <div>
        <p>
${'          '}
          yes
${'          '}
        </p>
      </div>
    `
  }, {
    text: `
      <div>
        <p>
          {% if false %}
          no
          {% endif %}
        </p>
      </div>
    `,
    expected: `
      <div>
        <p>
${'          '}
        </p>
      </div>
    `
  }, {
    text: '<p>{{- \'John\' -}}</p>',
    expected: '<p>John</p>'
  }, {
    text: '<p>{%- if true -%}yes{%- endif -%}</p>',
    expected: '<p>yes</p>'
  }, {
    text: '<p>{%- if false -%}no{%- endif -%}</p>',
    expected: '<p></p>'
  }, {
    text: '<p> {%- if true %} yes {% endif -%} </p>',
    expected: '<p> yes </p>'
  }, {
    text: '<p> {%- if false %} no {% endif -%} </p>',
    expected: '<p></p>'
  }, {
    text: '<p> {% if true -%} yes {%- endif %} </p>',
    expected: '<p> yes </p>'
  }, {
    text: '<p> {% if false -%} no {%- endif %} </p>',
    expected: '<p>  </p>'
  }, {
    text: '<p> {% if true -%} yes {% endif -%} </p>',
    expected: '<p> yes </p>'
  }, {
    text: '<p> {% if false -%} no {% endif -%} </p>',
    expected: '<p> </p>'
  }, {
    text: '<p> {%- if true %} yes {%- endif %} </p>',
    expected: '<p> yes </p>'
  }, {
    text: '<p> {%- if false %} no {%- endif %} </p>',
    expected: '<p> </p>'
  }, {
    text: `
      <div>
        <p>
          {{- 'John' }}
        </p>
      </div>
    `,
    expected: `
      <div>
        <p>John
        </p>
      </div>
    `
  }, {
    text: `
      <div>
        <p>
          {%- if true %}
          yes
          {%- endif %}
        </p>
      </div>
    `,
    expected: `
      <div>
        <p>
          yes
        </p>
      </div>
    `
  }, {
    text: `
      <div>
        <p>
          {%- if false %}
          no
          {%- endif %}
        </p>
      </div>
    `,
    expected: `
      <div>
        <p>
        </p>
      </div>
    `
  }, {
    text: `
      <div>
        <p>
          {{ 'John' -}}
        </p>
      </div>
    `,
    expected: `
      <div>
        <p>
          John</p>
      </div>
    `
  }, {
    text: `
      <div>
        <p>
          {% if true -%}
          yes
          {% endif -%}
        </p>
      </div>
    `,
    expected: `
      <div>
        <p>
          yes
          </p>
      </div>
    `
  }, {
    text: `
      <div>
        <p>
          {% if false -%}
          no
          {% endif -%}
        </p>
      </div>
    `,
    expected: `
      <div>
        <p>
          </p>
      </div>
    `
  }, {
    text: `
      <div>
        <p>
          {%- if true %}
          yes
          {% endif -%}
        </p>
      </div>
    `,
    expected: `
      <div>
        <p>
          yes
          </p>
      </div>
    `
  }, {
    text: `
      <div>
        <p>
          {%- if false %}
          no
          {% endif -%}
        </p>
      </div>
    `,
    expected: `
      <div>
        <p></p>
      </div>
    `
  }, {
    text: `
      <div>
        <p>
          {% if true -%}
          yes
          {%- endif %}
        </p>
      </div>
    `,
    expected: `
      <div>
        <p>
          yes
        </p>
      </div>
    `
  }, {
    text: `
      <div>
        <p>
          {% if false -%}
          no
          {%- endif %}
        </p>
      </div>
    `,
    expected: `
      <div>
        <p>
${'          '}
        </p>
      </div>
    `
  }, {
    text: `
      <div>
        <p>
          {{- 'John' -}}
        </p>
      </div>
    `,
    expected: `
      <div>
        <p>John</p>
      </div>
    `
  }, {
    text: `
      <div>
        <p>
          {%- if true -%}
          yes
          {%- endif -%}
        </p>
      </div>
    `,
    expected: `
      <div>
        <p>yes</p>
      </div>
    `
  }, {
    text: `
      <div>
        <p>
          {%- if false -%}
          no
          {%- endif -%}
        </p>
      </div>
    `,
    expected: `
      <div>
        <p></p>
      </div>
    `
  }, {
    text: `
      <div>
        <p>
          {{- 'John' -}},
          {{- '30' -}}
        </p>
      </div>
    `,
    expected: `
      <div>
        <p>John,30</p>
      </div>
    `
  }, {
    text: `
      <div>
        <p>
          {%- if true -%}
          yes
          {%- endif -%}
        </p>
      </div>
    `,
    expected: `
      <div>
        <p>yes</p>
      </div>
    `
  }, {
    text: `
      <div>
        <p>
          {%- if false -%}
          no
          {%- endif -%}
        </p>
      </div>
    `,
    expected: `
      <div>
        <p></p>
      </div>
    `
  }, {
    text: `
      <div>
        <p>
          {{- 'John' -}}
          {{- '30' -}}
        </p>
        <b>
          {{ 'John' -}}
          {{- '30' }}
        </b>
        <i>
          {{- 'John' }}
          {{ '30' -}}
        </i>
      </div>
    `,
    expected: `
      <div>
        <p>John30</p>
        <b>
          John30
        </b>
        <i>John
          30</i>
      </div>
    `
  }, {
    text: `
      <div>
        {%- if true -%}
          {%- if true -%}
            <p>
              {{- 'John' -}}
            </p>
          {%- endif -%}
        {%- endif -%}
      </div>
    `,
    expected: `
      <div><p>John</p></div>
    `
  }, {
    text: `
      <div>
        {% raw %}
          {%- if true -%}
            <p>
              {{- 'John' -}}
            </p>
          {%- endif -%}
        {% endraw %}
      </div>
    `,
    expected: `
      <div>
${'        '}
          {%- if true -%}
            <p>
              {{- 'John' -}}
            </p>
          {%- endif -%}
${'        '}
      </div>
    `
  }
]

describe('Whitespace Control', function () {
  cases.forEach((item, index) => it(
    item.text,
    () => expect(liquid.parseAndRender(item.text)).to.eventually.equal(item.expected, `index ${index} failed`)
  ))
})
