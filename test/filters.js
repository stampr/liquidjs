const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
const Liquid = require('../src/main.js').createEngine;
const Locale = require('../src/locale.js').default;
const liquid = Liquid();
chai.use(chaiAsPromised);

var ctx = {
  date: new Date(),
  foo: 'bar',
  arr: [-2, 'a'],
  empty_arr: [],
  obj: {
    foo: 'bar',
    second: 'two'
  },
  func: function () {},
  posts: [{
    category: 'foo',
    author: {
      name: 'blah'
    }
  }, {
    category: 'bar'
  }],
  where_posts: [
    { author: 'bob', content: 'hello bob 1' },
    { author: 'bob', content: 'hello bob 2' },
    { author: 'jim', content: 'hello jim' },
    { content: 'hello missing' },
    { author: 'james', content: 'hello james' },
    { author: 'bob', content: 'hello bob 3' },
    null,
    { author: 'tracy', content: 'hello tracy' }
  ],
  array_with_nulls: [ null, null, 'one', null, 'two', 'three', null, null ],
  test_null: null,
  test_undefined: undefined,
  multi_line_html: `
<p
  style="background-image: url('blah.jpeg');"
  class="whatever"
  data-blah="¡™£¢∞§¶•ªº">
    hello <b>there</b> world <i class="fa fa-world"></i> <img src="blah.jpeg" />
</p>
  `.trim(),
};

async function test (src, dst, engine) {
  engine = engine || liquid;
  const result = await engine.parseAndRender(src, ctx);
  expect(result).to.equal(dst);
}

describe('filters', function () {
  describe('multi filters', async () => {
    it('should support multiple filter on null element', async () => {
      return test(`{{ test_null | split: 'nonexistent' | last | prepend: '@' }}`, '@');
    });
    it('should support multiple filter on root element', async () => {
      return test(`{{ test_undefined | split: 'nonexistent' | last | prepend: '@' }}`, '@');
    });
    it('should support multiple filter on undefined', async () => {
      return test(`{{ something.undefined | split: 'nonexistent' | last | prepend: '@' }}`, '@');
    });
    it('should support multiple filter on deep undefined', async () => {
      return test(`{{ obj.undefined | split: 'nonexistent' | last | prepend: '@' }}`, '@');
    });
  });

  describe('split', () => {
    it('should split on not found string', async () => {
      // return test(`{{ foo | split: 'nonexistent' | last | prepend: '@' }}`, '@');
      // compatibility dictates this returning the full str
      return test(`{{ foo | split: 'nonexistent' | last | prepend: '@' }}`, '@bar');
    });
  });

  describe('abs', function () {
    it('should return 3 for -3', async () => test('{{ -3 | abs }}', '3'));
    it('should return 2 for arr[0]', async () => test('{{ arr[0] | abs }}', '2'));
    it('should return convert string', async () => test('{{ "-3" | abs }}', '3'));
  });

  describe('append', function () {
    it('should return "-3abc" for -3, "abc"',
      async () => test('{{ -3 | append: "abc" }}', '-3abc'));
    it('should return "abar" for "a",foo', async () => test('{{ "a" | append: foo }}', 'abar'));
  });

  it('should support capitalize', async () => test('{{ "i am good" | capitalize }}', 'I am good'));

  describe('ceil', function () {
    it('should return "2" for 1.2', async () => test('{{ 1.2 | ceil }}', '2'));
    it('should return "2" for 2.0', async () => test('{{ 2.0 | ceil }}', '2'));
    it('should return "4" for 3.5', async () => test('{{ "3.5" | ceil }}', '4'));
    it('should return "184" for 183.357', async () => test('{{ 183.357 | ceil }}', '184'));
  });

  describe('concat', function () {
    it('should concat arrays', async () => test(`
      {%- assign fruits = "apples, oranges, peaches" | split: ", " -%}
      {%- assign vegetables = "carrots, turnips, potatoes" | split: ", " -%}

      {%- assign everything = fruits | concat: vegetables -%}

      {%- for item in everything -%}
      - {{ item }}
      {% endfor -%}`,
    `- apples
      - oranges
      - peaches
      - carrots
      - turnips
      - potatoes
      `));
    it('should support chained concat', async () => test(`
      {%- assign fruits = "apples, oranges, peaches" | split: ", " -%}
      {%- assign vegetables = "carrots, turnips, potatoes" | split: ", " -%}
      {%- assign furniture = "chairs, tables, shelves" | split: ", " -%}
      {%- assign everything = fruits | concat: vegetables | concat: furniture -%}

      {%- for item in everything -%}
      - {{ item }}
      {% endfor -%}`,
    `- apples
      - oranges
      - peaches
      - carrots
      - turnips
      - potatoes
      - chairs
      - tables
      - shelves
      `));
  });

  describe('compact', () => {
    it('should remove null values from array', async () => test(`{{ array_with_nulls | compact | join: ',' }}`, 'one,two,three'));
  });

  describe('date', function () {
    it('should support date: %a %b %d %Y', async () => {
      var str = ctx.date.toDateString();
      return test('{{ date | date:"%a %b %d %Y"}}', str);
    });
    it('should create a new Date when given "now"', async () => {
      return test('{{ "now" | date: "%Y"}}', (new Date()).getFullYear().toString());
    });
    it('should parse as Date when given UTC string', async () => {
      return test('{{ "1991-02-22T00:00:00" | date: "%Y"}}', '1991');
    });
    it('should render string as string if not valid', async () => {
      return test('{{ "foo" | date: "%Y"}}', 'foo');
    });
    it('should render object as empty string if not valid', async () => {
      return test('{{ obj | date: "%Y"}}', '');
    });
    it('should treat invalid dates as pass through', async () => {
      return test('{{ "not a valid date" | date: "%Y"}}', 'not a valid date');
    });
  });

  describe('default', function () {
    it('should use default when falsy', async () => test('{{false |default: "a"}}', 'a'));
    it('should not use default when truthy', async () => test('{{true |default: "a"}}', 'true'));
  });

  describe('divided_by', function () {
    it('should return 2 for 4,2', async () => test('{{4 | divided_by: 2}}', '2'));
    it('should return 4 for 16,4', async () => test('{{16 | divided_by: 4}}', '4'));
    it('should return 1 for 5,3', async () => test('{{5 | divided_by: 3}}', '1'));
    it('should convert string to number', async () => test('{{"5" | divided_by: "3"}}', '1'));
  });

  describe('downcase', function () {
    it('should return "parker moore" for "Parker Moore"',
      async () => test('{{ "Parker Moore" | downcase }}', 'parker moore'));
    it('should return "apple" for "apple"',
      async () => test('{{ "apple" | downcase }}', 'apple'));
  });

  describe('escape', function () {
    it('should escape \' and &', async () => {
      return test('{{ "Have you read \'James & the Giant Peach\'?" | escape }}',
        'Have you read &#39;James &amp; the Giant Peach&#39;?');
    });
    it('should escape normal string', async () => {
      return test('{{ "Tetsuro Takara" | escape }}', 'Tetsuro Takara');
    });
    it('should return an empty string for null, undefined, or a function', async () => {
      return Promise.all([
        test('{{ func | escape }}', ''),
        test('{{ test_null | escape }}', ''),
        test('{{ test_undefined | escape }}', '')
      ]);
    });
  });

  describe('escape_once', function () {
    it('should do escape', () =>
      test('{{ "1 < 2 & 3" | escape_once }}', '1 &lt; 2 &amp; 3'));
    it('should not escape twice',
      async () => test('{{ "1 &lt; 2 &amp; 3" | escape_once }}', '1 &lt; 2 &amp; 3'));
  });

  it('should support split/first', async () => {
    var src = '{% assign my_array = "apples, oranges, peaches, plums" | split: ", " %}' +
            '{{ my_array | first }}';
    return test(src, 'apples');
  });

  describe('first', function () {
    it('should handle null', async () => test('{{ test_null | first }}', ''));
    it('should handle undefined', async () => test('{{ test_undefined | first }}', ''));
    it('should handle function', async () => test('{{ func | first }}', ''));
    it('should support arrays', async () => test('{{ arr | first }}', '-2'));
    it('should support empty arrays', async () => test('{{ empty_arr | first }}', ''));
    it('should support objects', async () => test('{{ obj | first }}', 'bar'));
  });

  describe('floor', function () {
    it('should return "1" for 1.2', async () => test('{{ 1.2 | floor }}', '1'));
    it('should return "2" for 2.0', async () => test('{{ 2.0 | floor }}', '2'));
    it('should return "183" for 183.357', async () => test('{{ 183.357 | floor }}', '183'));
    it('should return "3" for 3.5', async () => test('{{ "3.5" | floor }}', '3'));
  });

  it('should support join', async () => {
    var src = '{% assign beatles = "John, Paul, George, Ringo" | split: ", " %}' +
            '{{ beatles | join: " and " }}';
    return test(src, 'John and Paul and George and Ringo');
  });

  it('should support split/last', async () => {
    var src = '{% assign my_array = "zebra, octopus, giraffe, tiger" | split: ", " %}' +
            '{{ my_array|last }}';
    return test(src, 'tiger');
  });

  it('should support lstrip', async () => {
    var src = '{{ "          So much room for activities!          " | lstrip }}';
    return test(src, 'So much room for activities!          ');
  });

  it('should support map', async () => {
    return test('{{posts | map: "category"}}', 'foobar');
  });
  it('should support map with invalid properties', async () => {
    return test('{{posts | map: "author" | map: "name"}}', 'blah');
  });

  describe('minus', () => {
    it('should return "2" for 4,2', async () => test('{{ 4 | minus: 2 }}', '2'));
    it('should return "12" for 16,4', async () => test('{{ 16 | minus: 4 }}', '12'));
    it('should return "171.357" for 183.357,12',
      async () => test('{{ 183.357 | minus: 12 }}', '171.357'));
    it('should convert first arg as number', async () => test('{{ "4" | minus: 1 }}', '3'));
    it('should convert both args as number', async () => test('{{ "4" | minus: "1" }}', '3'));
  });

  describe('modulo', function () {
    it('should return "1" for 3,2', async () => test('{{ 3 | modulo: 2 }}', '1'));
    it('should return "3" for 24,7', async () => test('{{ 24 | modulo: 7 }}', '3'));
    it('should return "3.357" for 183.357,12',
      async () => test('{{ 183.357 | modulo: 12 }}', '3.357'));
    it('should convert string', async () => test('{{ "24" | modulo: "7" }}', '3'));
  });

  it('should support string_with_newlines', async () => {
    var src = '{% capture string_with_newlines %}\n' +
            'Hello\n' +
            'there\n' +
            '{% endcapture %}' +
            '{{ string_with_newlines | newline_to_br }}';
    var dst = '<br />' +
            'Hello<br />' +
            'there<br />';
    return test(src, dst);
  });

  describe('plus', function () {
    it('should return "6" for 4,2', async () => test('{{ 4 | plus: 2 }}', '6'));
    it('should return "20" for 16,4', async () => test('{{ 16 | plus: 4 }}', '20'));
    it('should return "195.357" for 183.357,12',
      async () => test('{{ 183.357 | plus: 12 }}', '195.357'));
    it('should convert first arg as number', async () => test('{{ "4" | plus: 2 }}', '6'));
    it('should convert both args as number', async () => test('{{ "4" | plus: "2" }}', '6'));
    it('should support compatible type conversion hack', async () => {
      await test('{{ nil | plus: 0 }}', '0');
      await test('{{ test_null | plus: 0 }}', '0');
      await test('{{ test_undefined | plus: 0 }}', '0');
      await test('{{ blank | plus: 0 }}', '0');
      await test('{{ empty_arr | plus: 0 }}', '0');
    });
  });

  it('should support prepend', async () => {
    return test('{% assign url = "liquidmarkup.com" %}' +
            '{{ "/index.html" | prepend: url }}',
    'liquidmarkup.com/index.html');
  });

  it('should support remove', async () => {
    return test('{{ "I strained to see the train through the rain" | remove: "rain" }}',
      'I sted to see the t through the ');
  });

  it('should support remove_first', async () => {
    return test('{{ "I strained to see the train through the rain" | remove_first: "rain" }}',
      'I sted to see the train through the rain');
  });

  it('should support replace', async () => {
    return test('{{ "Take my protein pills and put my helmet on" | replace: "my", "your" }}',
      'Take your protein pills and put your helmet on');
  });

  it('should support replace_first', async () => {
    return test('{% assign my_string = "Take my protein pills and put my helmet on" %}\n' +
            '{{ my_string | replace_first: "my", "your" }}',
    '\nTake your protein pills and put my helmet on');
  });

  it('should support reverse', async () => {
    return test('{{ "Ground control to Major Tom." | split: "" | reverse | join: "" }}',
      '.moT rojaM ot lortnoc dnuorG');
  });

  describe('round', function () {
    it('should return "1" for 1.2', async () => test('{{1.2|round}}', '1'));
    it('should return "3" for 2.7', async () => test('{{2.7|round}}', '3'));
    it('should return "183.36" for 183.357,2',
      async () => test('{{183.357|round: 2}}', '183.36'));
    it('should convert string to number', async () => test('{{"2.7"|round}}', '3'));
  });

  it('should support rstrip', async () => {
    return test('{{ "          So much room for activities!          " | rstrip }}',
      '          So much room for activities!');
  });

  describe('size', function () {
    it('should return string length',
      async () => test('{{ "Ground control to Major Tom." | size }}', '28'));
    it('should return array size', async () => {
      return test('{% assign my_array = "apples, oranges, peaches, plums"' +
                ' | split: ", " %}{{ my_array | size }}',
      '4');
    });
    it('should also be used with dot notation - string',
      async () => test('{% assign my_string = "Ground control to Major Tom." %}{{ my_string.size }}', '28'));
    it('should also be used with dot notation - array',
      async () => test('{% assign my_array = "apples, oranges, peaches, plums" | split: ", " %}{{ my_array.size }}', '4'));
  });

  describe('slice', function () {
    it('should slice first char by 0', async () => test('{{ "Liquid" | slice: 0 }}', 'L'));
    it('should slice third char by 2', async () => test('{{ "Liquid" | slice: 2 }}', 'q'));
    it('should slice substr by 2,5', async () => test('{{ "Liquid" | slice: 2, 5 }}', 'quid'));
    it('should slice substr by -3,2', async () => test('{{ "Liquid" | slice: -3, 2 }}', 'ui'));
  });

  it('should support sort', async () => {
    return test('{% assign my_array = "zebra, octopus, giraffe, Sally Snake"' +
            ' | split: ", " %}' +
            '{{ my_array | sort | join: ", " }}',
    'Sally Snake, giraffe, octopus, zebra');
  });

  it('should support split', async () => {
    return test('{% assign beatles = "John, Paul, George, Ringo" | split: ", " %}' +
            '{% for member in beatles %}' +
            '{{ member }} ' +
            '{% endfor %}',
    'John Paul George Ringo ');
  });

  it('should support strip', async () => {
    return test('{{ "          So much room for activities!          " | strip }}',
      'So much room for activities!');
  });

  describe('strip_html', () => {
    it('should strip all tags', async () => {
      return test('{{ "Have <em>you</em> read <strong>Ulysses</strong>?" | strip_html }}',
        'Have you read Ulysses?');
    });
    it('should strip until empty', async () => {
      return test('{{"<br/><br />< p ></p></ p >" | strip_html }}', '');
    });
    it('should strip attributes', async () => {
      return test('{{ multi_line_html | strip_html }}', 'hello there world');
    });
  });

  it('should support strip_newlines', async () => {
    return test('{% capture string_with_newlines %}\n' +
            'Hello\nthere\n{% endcapture %}' +
            '{{ string_with_newlines | strip_newlines }}',
    'Hellothere');
  });

  describe('times', function () {
    it('should return "6" for 3,2', async () => test('{{ 3 | times: 2 }}', '6'));
    it('should return "168" for 24,7', async () => test('{{ 24 | times: 7 }}', '168'));
    it('should return "2200.284" for 183.357,12',
      async () => test('{{ 183.357 | times: 12 }}', '2200.284'));
    it('should convert string to number', async () => test('{{ "24" | times: "7" }}', '168'));
  });

  describe('truncate', function () {
    it('should truncate when string too long', async () => {
      return test('{{ "Ground control to Major Tom." | truncate: 20 }}',
        'Ground control to...');
    });
    it('should not truncate when string not long enough', async () => {
      return test('{{ "Ground control to Major Tom." | truncate: 80 }}',
        'Ground control to Major Tom.');
    });
    it('should truncate with custom ellipsis', async () => {
      return test('{{ "Ground control to Major Tom." | truncate: 25,", and so on" }}',
        'Ground control, and so on');
    });
    it('should truncate with empty custom ellipsis', async () => {
      return test('{{ "Ground control to Major Tom." | truncate: 20, "" }}',
        'Ground control to Ma');
    });
    it('should not truncate when short enough', async () => {
      return test('{{ "12345" | truncate: 5 }}', '12345');
    });
    it('should default to 16', async () => {
      return test('{{ "1234567890abcdefghi" | truncate }}', '1234567890abc...');
    });
  });

  describe('truncatewords', function () {
    it('should truncate when too many words', async () => {
      return test('{{ "Ground control to Major Tom." | truncatewords: 3 }}',
        'Ground control to...');
    });
    it('should not truncate when not enough words', async () => {
      return test('{{ "Ground control to Major Tom." | truncatewords: 8 }}',
        'Ground control to Major Tom.');
    });
    it('should truncate with custom ellipsis', async () => {
      return test('{{ "Ground control to Major Tom." | truncatewords: 3, "--" }}',
        'Ground control to--');
    });
    it('should truncate with empty custom ellipsis', async () => {
      return test('{{ "Ground control to Major Tom." | truncatewords: 3, "" }}',
        'Ground control to');
    });
  });

  describe('uniq', function () {
    it('should uniq string list', async () => {
      return test(
        '{% assign my_array = "ants, bugs, bees, bugs, ants" | split: ", " %}' +
        '{{ my_array | uniq | join: ", " }}',
        'ants, bugs, bees'
      );
    });
    it('should uniq falsy value', async () => {
      return test('{{"" | uniq | join: ","}}', '');
    });
  });

  it('should support upcase', async () => test('{{ "Parker Moore" | upcase }}', 'PARKER MOORE'));

  describe('url_encode', function () {
    it('should encode @',
      async () => test('{{ "john@liquid.com" | url_encode }}', 'john%40liquid.com'));
    it('should encode <space>',
      async () => test('{{ "Tetsuro Takara" | url_encode }}', 'Tetsuro%20Takara'));
  });

  describe('obj_test', function () {
    liquid.registerFilter('obj_test', function () {
      return Array.prototype.slice.call(arguments).join(',');
    });
    it('should support object', async () => test(`{{ "a" | obj_test: k1: "v1", k2: foo }}`, 'a,k1,v1,k2,bar'));
    it('should support mixed object', async () => test(`{{ "a" | obj_test: "something", k1: "v1", k2: foo }}`, 'a,something,k1,v1,k2,bar'));
  });

  describe('translate', function () {
    var engine = Liquid({
      locale: new Locale({
        hello: 'world',
        scoped: 'hello {{ var1 }} foo {{ var2 }}',
        here: {
          is: {
            a: [
              [
                { deep: 'key' }
              ]
            ]
          }
        }
      })
    });
    it('should translate keys',
      async () => test('{{ "hello" | t }}', 'world', engine));
    it('should translate deep keys',
      async () => test('{{ "here.is.a[0][0].deep" | t }}', 'key', engine));
    it('should return empty string if no locale',
      async () => test('{{ "anything.here" | t }}', ''));
    it('should throw if key is invalid', async () => {
      return expect(engine.parseAndRender('{{ "anything.here" | t }}', {})).to.be.rejectedWith(/invalid translation key/);
    });
    it('should pass variables',
      async () => test('{{ "scoped" | t: var1: "world", var2: foo }}', 'hello world foo bar', engine));
    it('should work with filters',
      async () => test('{{ "scoped" | t: var1: "world", var2: foo | capitalize }}', 'Hello world foo bar', engine));
  });

  describe('where', function () {
    it('should be fine with invalid input', () =>
      test(`{{ doesnotexist | where: 'author' | size }}`, '0'));
    it('should find all truthy values', () =>
      test(`{{ where_posts | where: 'author' | size }}`, '6'));
    it('should find all truthy values and map', () =>
      test(`{{ where_posts | where: 'author' | map: 'author' | join: ',' }}`, 'bob,bob,jim,james,bob,tracy'));
    it('should find matches', () =>
      test(`{{ where_posts | where: 'author', 'bob' | size }}`, '3'));
    it('should find matches and map', () =>
      test(`{{ where_posts | where: 'author', 'bob' | map: 'author' | join: ',' }}`, 'bob,bob,bob'));
    it('should find matches and map in conjunction with uniq', () =>
      test(`{{ where_posts | where: 'author', 'bob' | map: 'author' | uniq | join: ',' }}`, 'bob'));
  });

  describe('filter composition', () => {
    var engine = Liquid();
    engine.registerFilter('testcompose123', v => {
      return engine.filter.filters.ceil(v);
    });
    it('should be possible to compose a new filter with an existing filter', async () => {
      return test('{{ 4.01 | testcompose123 }}', '5', engine);
    });
  });
});
