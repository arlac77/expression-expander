[![npm](https://img.shields.io/npm/v/expression-expander.svg)](https://www.npmjs.com/package/expression-expander)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/arlac77/expression-expander)
[![Build Status](https://secure.travis-ci.org/arlac77/expression-expander.png)](http://travis-ci.org/arlac77/expression-expander)
[![bithound](https://www.bithound.io/github/arlac77/expression-expander/badges/score.svg)](https://www.bithound.io/github/arlac77/expression-expander)
[![codecov.io](http://codecov.io/github/arlac77/expression-expander/coverage.svg?branch=master)](http://codecov.io/github/arlac77/expression-expander?branch=master)
[![Coverage Status](https://coveralls.io/repos/arlac77/expression-expander/badge.svg)](https://coveralls.io/r/arlac77/expression-expander)
[![Code Climate](https://codeclimate.com/github/arlac77/expression-expander/badges/gpa.svg)](https://codeclimate.com/github/arlac77/expression-expander)
[![Known Vulnerabilities](https://snyk.io/test/github/arlac77/expression-expander/badge.svg)](https://snyk.io/test/github/arlac77/expression-expander)
[![GitHub Issues](https://img.shields.io/github/issues/arlac77/expression-expander.svg?style=flat-square)](https://github.com/arlac77/expression-expander/issues)
[![Dependency Status](https://david-dm.org/arlac77/expression-expander.svg)](https://david-dm.org/arlac77/expression-expander)
[![devDependency Status](https://david-dm.org/arlac77/expression-expander/dev-status.svg)](https://david-dm.org/arlac77/expression-expander#info=devDependencies)
[![docs](http://inch-ci.org/github/arlac77/expression-expander.svg?branch=master)](http://inch-ci.org/github/arlac77/expression-expander)
[![downloads](http://img.shields.io/npm/dm/expression-expander.svg?style=flat-square)](https://npmjs.org/package/expression-expander)
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

# API Reference

* <a name="createContext"></a>

## createContext(options) ⇒ <code>ExpressionExpander</code>
Creates a new expansion context

**Kind**: global function  
**Returns**: <code>ExpressionExpander</code> - newly created expansion context  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | object with the following keys  - valueQuoter function to quote epanded values    by default no special quoting is done and the evaluated result will be direcly    inserted into the output string  - evaluate(expression,context) function to evaluate expressions    the default evaluation function simply does a lookup into the properties  - keepUndefinedValues    true: is expression resolves to undefind the original string will be used (with surrounding ${})  - maxNestingLevel max number of recursive calls to expand defaults to 20 |


* <a name="expand"></a>

## expand(object, optional) ⇒ <code>any</code>
Expands object

**Kind**: global function  
**Returns**: <code>any</code> - expanded object  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>any</code> | to expand |
| optional | <code>array</code> | path describing the location in the to expanding data source |


* * *

# install

With [npm](http://npmjs.org) do:

```shell
npm install expression-expander
```

# license

BSD-2-Clause
