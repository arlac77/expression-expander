
[![npm](https://img.shields.io/npm/v/expression-expander.svg)](https://www.npmjs.com/package/expression-expander)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/arlac77/expression-expander)
[![Build Status](https://secure.travis-ci.org/arlac77/expression-expander.png)](http://travis-ci.org/arlac77/expression-expander)
[![bithound](https://www.bithound.io/github/arlac77/expression-expander/badges/score.svg)](https://www.bithound.io/github/arlac77/expression-expander)
[![Coverage Status](https://coveralls.io/repos/arlac77/expression-expander/badge.svg?branch=master&service=github)](https://coveralls.io/github/arlac77/expression-expander?branch=master)
[![Code Climate](https://codeclimate.com/github/arlac77/expression-expander/badges/gpa.svg)](https://codeclimate.com/github/arlac77/expression-expander)
[![GitHub Issues](https://img.shields.io/github/issues/arlac77/expression-expander.svg?style=flat-square)](https://github.com/arlac77/expression-expander/issues)
[![Dependency Status](https://david-dm.org/arlac77/expression-expander.svg)](https://david-dm.org/arlac77/expression-expander)
[![devDependency Status](https://david-dm.org/arlac77/expression-expander/dev-status.svg)](https://david-dm.org/arlac77/expression-expander#info=devDependencies)
[![docs](http://inch-ci.org/github/arlac77/expression-expander.svg?branch=master)](http://inch-ci.org/github/arlac77/expression-expander)
[![API Doc](https://doclets.io/arlac77/expression-expander/master.svg)](https://doclets.io/arlac77/expression-expander/master)
[![downloads](http://img.shields.io/npm/dm/expression-expander?style=flat-square)](https://npmjs.org/package/expression-expander)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Expression Expander
-------------------

Expands expressions in json objects

# example

## file.js

```js
const ee = require('expression-expander');

let context = ee.createContext();

context.properties = { aKey : "aValue", moreKeys : { "a" : 1, "b" : 2 } };

console.log(context.expand("${aKey}"));

// expanding hole expressions at the key position
console.log(JSON.stringify(context.expand({"${moreKeys}" : {} })));
```

Output

```
aValue
{ "a" : 1, "b" : 2 }
```

jsdoc can be found [here](http://arlac77.github.io/modules/expression-expander/doc/).

# install

With [npm](http://npmjs.org) do:

```shell
npm install expression-expander
```

# license

BSD-2-Clause
