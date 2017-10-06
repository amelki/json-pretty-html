import prettyPrint from '../src/prettyPrint';
import * as fs from 'fs';
import * as Promise from 'bluebird';
//const Promise = require("bluebird");

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
