[![Dev dependencies][dependencies-badge]][dependencies]
[![Node.js version][nodejs-badge]][nodejs]
[![NPM version][npm-badge]][npm]
[![Build Status][travis-badge]][travis-ci]
[![MIT][license-badge]][LICENSE]

# json-pretty-html

Transforms a JSON object into an HTML string. Allows selecting a subset of the object and highlight it with a CSS class.

## Usage

```js
var json = {
  "id": 2,
  "name": "An ice sculpture",
  "price": 12.50,
  "tags": ["cold", "ice"],
  "dimensions": {
    "length": 7.0,
    "width": 12.0,
    "height": 9.5
  },
  "warehouseLocation": {
    "latitude": -78.75,
    "longitude": 20.4
  }
};
var prettyHtml = require('json-pretty-html');
var html = prettyHtml(json, json.dimensions);
```

With [a nice CSS](https://github.com/amelki/json-pretty-html/blob/master/examples/styles.css), the result will be:


<img src="https://cdn.pbrd.co/images/GNTkTu9.png" alt="Result" width="350">


[dependencies-badge]: https://david-dm.org/amelki/json-pretty-html/dev-status.svg
[dependencies]: https://david-dm.org/amelki/json-pretty-html?type=dev
[nodejs-badge]: https://img.shields.io/badge/node->=%206.9-blue.svg
[nodejs]: https://nodejs.org/dist/latest-v6.x/docs/api/
[npm-badge]: https://img.shields.io/badge/npm->=%203.10.8-blue.svg
[npm]: https://docs.npmjs.com/
[travis-badge]: https://travis-ci.org/amelki/json-pretty-html.svg?branch=master
[travis-ci]: https://travis-ci.org/amelki/json-pretty-html
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg
[license]: https://github.com/amelki/json-pretty-html/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
[prs]: http://makeapullrequest.com
[donate-badge]: https://img.shields.io/badge/$-support-green.svg
[donate]: http://bit.ly/donate-js
[github-watch-badge]: https://img.shields.io/github/watchers/amelki/json-pretty-html.svg?style=social
[github-watch]: https://github.com/amelki/json-pretty-html/watchers
[github-star-badge]: https://img.shields.io/github/stars/amelki/json-pretty-html.svg?style=social
[github-star]: https://github.com/amelki/json-pretty-html/stargazers
[jest]: https://facebook.github.io/jest/
[tslint]: https://palantir.github.io/tslint/
