import prettyPrint from '../src/prettyPrint';
import * as fs from 'fs';
import * as Promise from 'bluebird';
const readFile = Promise.promisify(fs.readFile);

const testPrettyPrint = (jsonFile: string, expected: string, selection: string) => {
  return test(`testPrettyPrint(${jsonFile})`, () => {
    return Promise.all([ readFile(jsonFile), readFile(expected)])
      .then((results: Buffer[]) => {
        const json = <object>JSON.parse(results[0].toString());
        const html : string = prettyPrint(json, <object>eval(selection));
        const styles : string = '<style>.json-key{ color: red } ' +
          '.json-string{ color: green } .json-boolean{ color: blue } ' +
          '.json-selected { background-color: #ddd }</style>';
        const all = `${styles} <br> ${html}`;
        expect(all).toBe(results[1].toString());
      });
  });
};

testPrettyPrint('__tests__/data/schema.json', '__tests__/data/pretty1.html', 'json.properties.nav');
testPrettyPrint('__tests__/data/data.json', '__tests__/data/pretty2.html', 'json.pages');

test('undefinedOrNull', () => {
  expect(prettyPrint(null)).toBe('');
  expect(prettyPrint(undefined)).toBe('');
});

test('simple', () => {
  const object = { foo: { bar: 'hux' } };
  expect(prettyPrint(object)).toBe('<div class="json-pretty">{<br>&nbsp;&nbsp;"<span class="json-key">foo</span>":&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;"<span class="json-key">bar</span>":&nbsp;"<span class="json-string">hux</span>"<br>&nbsp;&nbsp;}<br>}</div>');
  expect(prettyPrint(object, object.foo)).toBe('<div class="json-pretty">{<br></div><div class="json-pretty json-selected">&nbsp;&nbsp;"<span class="json-key">foo</span>":&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;"<span class="json-key">bar</span>":&nbsp;"<span class="json-string">hux</span>"<br>&nbsp;&nbsp;}</div><div class="json-pretty">}</div>');
  expect(prettyPrint(object, object)).toBe('<div class="json-pretty json-selected">{<br>&nbsp;&nbsp;"<span class="json-key">foo</span>":&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;"<span class="json-key">bar</span>":&nbsp;"<span class="json-string">hux</span>"<br>&nbsp;&nbsp;}<br>}</div>');
});

test('array', () => {
  const json = [ 'foo', 'bar' ];
  expect(prettyPrint(json)).toBe('<div class="json-pretty">[<br>&nbsp;&nbsp;"<span class="json-string">foo</span>",<br>&nbsp;&nbsp;"<span class="json-string">bar</span>"<br>]</div>');
});

test('arrayWithObject', () => {
  const json = [ 'foo', { bar : 'hux' } ];
  expect(prettyPrint(json)).toBe('<div class="json-pretty">[<br>&nbsp;&nbsp;"<span class="json-string">foo</span>",<br>&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;"<span class="json-key">bar</span>":&nbsp;"<span class="json-string">hux</span>"<br>&nbsp;&nbsp;}<br>]</div>');
  expect(prettyPrint(json, <object>json[1])).toBe('<div class="json-pretty">[<br>&nbsp;&nbsp;"<span class="json-string">foo</span>",<br></div><div class="json-pretty json-selected">&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;"<span class="json-key">bar</span>":&nbsp;"<span class="json-string">hux</span>"<br>&nbsp;&nbsp;}</div><div class="json-pretty">]</div>');
});

test('options', () => {
  expect(prettyPrint({ foo: 'bar' }, null, { indent: '  ' })).toBe('<div class="json-pretty">{<br>  "<span class="json-key">foo</span>":&nbsp;"<span class="json-string">bar</span>"<br>}</div>');
  expect(prettyPrint({ foo: 'bar' }, null, { indent: '&nbsp;&nbsp;&nbsp;&nbsp;' })).toBe('<div class="json-pretty">{<br>&nbsp;&nbsp;&nbsp;&nbsp;"<span class="json-key">foo</span>":&nbsp;"<span class="json-string">bar</span>"<br>}</div>');
});

test('circular', () => {
  const object = { foo: { bar: 'hux' }, hux: null };
  object.hux = object;
  expect(() => prettyPrint(object)).toThrow('Cannot pretty print object with circular reference');
});

test('escapedHtml', () => {
  const json = { foo: 'hello <span> world', 'the<key>': 'other', bar: 'with "double" quotes' };
  expect(prettyPrint(json)).toBe('<div class="json-pretty">{<br>&nbsp;&nbsp;"<span class="json-key">foo</span>":&nbsp;"<span class="json-string">hello &lt;span&gt; world</span>",<br>&nbsp;&nbsp;"<span class="json-key">the&lt;key&gt;</span>":&nbsp;"<span class="json-string">other</span>",<br>&nbsp;&nbsp;"<span class="json-key">bar</span>":&nbsp;"<span class="json-string">with &quot;double&quot; quotes</span>"<br>}</div>');
});

test('unexpectedTypes', () => {
  const json = { foo: 'test', bar: () => { const test = 'test'; } };
  expect(prettyPrint(json)).toBe('<div class="json-pretty">{<br>&nbsp;&nbsp;"<span class="json-key">foo</span>":&nbsp;"<span class="json-string">test</span>",<br>&nbsp;&nbsp;"<span class="json-key">bar</span>":&nbsp;function<br>}</div>');
});
