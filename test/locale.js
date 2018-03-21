const chai = require('chai')
const expect = chai.expect
var Locale = require('../src/locale.js').default;

describe('locale', function() {
  it('should translate object paths', function() {
    let locale = new Locale({
      hello: 'world',
      a: {
        very: [
          {
            deep: 'key',
            here: {
              there: 'everywhere'
            }
          }
        ]
      },
      crazy: [
        [
          [],
          [
            [
              [ { arrays: 'here' } ]
            ]
          ]
        ]
      ]
    });
    expect(locale.translate('hello')).to.equal('world');
    expect(locale.translate('a.very[0].deep')).to.equal('key');
    expect(locale.translate('a.very[0]["here"].there')).to.equal('everywhere');
    expect(locale.translate('crazy[0][1][0][0][0].arrays')).to.equal('here');
  });
});
