[![npm](https://img.shields.io/npm/v/expression-expander.svg)](https://www.npmjs.com/package/expression-expander)
[![Greenkeeper](https://badges.greenkeeper.io/arlac77/expression-expander.svg)](https://greenkeeper.io/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/arlac77/expression-expander)
[![Build Status](https://secure.travis-ci.org/arlac77/expression-expander.png)](http://travis-ci.org/arlac77/expression-expander)
[![bithound](https://www.bithound.io/github/arlac77/expression-expander/badges/score.svg)](https://www.bithound.io/github/arlac77/expression-expander)
[![codecov.io](http://codecov.io/github/arlac77/expression-expander/coverage.svg?branch=master)](http://codecov.io/github/arlac77/expression-expander?branch=master)
[![Coverage Status](https://coveralls.io/repos/arlac77/expression-expander/badge.svg)](https://coveralls.io/r/arlac77/expression-expander)
[![Known Vulnerabilities](https://snyk.io/test/github/arlac77/expression-expander/badge.svg)](https://snyk.io/test/github/arlac77/expression-expander)
[![GitHub Issues](https://img.shields.io/github/issues/arlac77/expression-expander.svg?style=flat-square)](https://github.com/arlac77/expression-expander/issues)
[![Stories in Ready](https://badge.waffle.io/arlac77/expression-expander.svg?label=ready&title=Ready)](http://waffle.io/arlac77/expression-expander)
[![Dependency Status](https://david-dm.org/arlac77/expression-expander.svg)](https://david-dm.org/arlac77/expression-expander)
[![devDependency Status](https://david-dm.org/arlac77/expression-expander/dev-status.svg)](https://david-dm.org/arlac77/expression-expander#info=devDependencies)
[![docs](http://inch-ci.org/github/arlac77/expression-expander.svg?branch=master)](http://inch-ci.org/github/arlac77/expression-expander)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![downloads](http://img.shields.io/npm/dm/expression-expander.svg?style=flat-square)](https://npmjs.org/package/expression-expander)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Expression Expander
-------------------

Expands _${to be evaluated}_ expressions in object graphs.
The actual expression syntax inside of the _${evaluated}_ is not defined within this module (only simple key lookup)

# example

## file.js

```js
const ee = require('expression-expander');
const context = ee.createContext();

context.properties = { aKey : "aValue", moreKeys : { "a" : 1, "b" : 2 } };

// expanding hole expressions at the key position
console.log(JSON.stringify(context.expand({"simple": "${aKey}", "complex" : {"${moreKeys}" : {} }})));
```

Output

```json
{"simple": "aValue", "complex": { "a" : 1, "b" : 2 }}
```

Any Object of the following types may be expanded
---

- String
- Number
- Object (key and value will be expanded)
- Array
- Map (key and value will be expanded)
- Set
- Boolean
- Promise

# API Reference
- expression-expander

* <a name="module_expression-expander..createContext"></a>

## expression-expander~createContext([options]) ⇒ <code>ExpressionExpander</code>
Creates a new expansion context

**Kind**: inner method of [<code>expression-expander</code>](#module_expression-expander)  
**Returns**: <code>ExpressionExpander</code> - newly created expansion context  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>object</code> | object with the following keys |
| [options.valueQuoter] | <code>function</code> | to quote expanded values    by default no special quoting is done and the evaluated result will be direcly    inserted into the output string |
| [options.evaluate] | <code>function</code> | evaluate(expression,context,path) function to evaluate expressions    the default evaluation function does a lookup into the properties |
| [options.keepUndefinedValues] | <code>bool</code> | true: is expression resolves to undefind the original string will be used (with surrounding ${}) |
| [options.maxNestingLevel] | <code>number</code> | max number of recursive calls to expand defaults to 20 |


* <a name="module_expression-expander..expand"></a>

## expression-expander~expand(object, [path]) ⇒ <code>any</code>
Expands object

**Kind**: inner method of [<code>expression-expander</code>](#module_expression-expander)  
**Returns**: <code>any</code> - expanded object  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>any</code> | to expand |
| [path] | <code>Array.&lt;object&gt;</code> | describing the location in the to expanding data source |


* * *

# install

With [npm](http://npmjs.org) do:

```shell
npm install expression-expander
```

# license

BSD-2-Clause
