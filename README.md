[![npm](https://img.shields.io/npm/v/expression-expander.svg)](https://www.npmjs.com/package/expression-expander)
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
[![minified size](https://badgen.net/bundlephobia/min/expression-expander)](https://bundlephobia.com/result?p=expression-expander)
[![downloads](http://img.shields.io/npm/dm/expression-expander.svg?style=flat-square)](https://npmjs.org/package/expression-expander)
[![GitHub Issues](https://img.shields.io/github/issues/arlac77/expression-expander.svg?style=flat-square)](https://github.com/arlac77/expression-expander/issues)
[![Build Status](https://secure.travis-ci.org/arlac77/expression-expander.png)](http://travis-ci.org/arlac77/expression-expander)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Known Vulnerabilities](https://snyk.io/test/github/arlac77/expression-expander/badge.svg)](https://snyk.io/test/github/arlac77/expression-expander)
[![Greenkeeper](https://badges.greenkeeper.io/arlac77/expression-expander.svg)](https://greenkeeper.io/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/arlac77/expression-expander)

## Expression Expander

Expands _\\${to be evaluated}_ expressions in object graphs. The actual expression syntax inside of the _\\${evaluated}_ is not defined within this module (only simple key lookup)

# example

## file.js

<!-- skip-example -->

```js
import { createContext } from "expression-expander";

const context = createContext();

context.properties = { aKey: "aValue", moreKeys: { a: 1, b: 2 } };

// expanding whole expressions at the key position
console.log(
  JSON.stringify(
    context.expand({ simple: "${aKey}", complex: { "${moreKeys}": {} } })
  )
);
```

Output

```json
{ "simple": "aValue", "complex": { "a": 1, "b": 2 } }
```

## Any Object of the following types may be expanded

-   String
-   Number
-   BigInt
-   Buffer
-   Object (key and value will be expanded)
-   Array
-   Map (key and value will be expanded)
-   Set
-   Boolean
-   Promise

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [expression-expander](#expression-expander)
-   [Evaluator](#evaluator)
    -   [Parameters](#parameters)
-   [PathEntry](#pathentry)
    -   [Properties](#properties)
-   [Quoter](#quoter)
    -   [Parameters](#parameters-1)
-   [ExpressionExpander](#expressionexpander)
    -   [Properties](#properties-1)
    -   [expand](#expand)
        -   [Parameters](#parameters-2)
    -   [properties](#properties-2)
-   [createContext](#createcontext)
    -   [Parameters](#parameters-3)

## expression-expander

## Evaluator

Type: [Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)

### Parameters

-   `expression` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `context` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
-   `path` **\[[PathEntry](#pathentry)]** 

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** expression evaluation result

## PathEntry

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

### Properties

-   `value` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

## Quoter

Type: [Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)

### Parameters

-   `value` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** to be quoted

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** quoted value

## ExpressionExpander

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

### Properties

-   `properties` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

### expand

expand

#### Parameters

-   `object` **([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) \| [boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean) \| [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) | bigint | [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) \| [Map](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map) \| [Set](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set))** to expand
-   `path` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[PathEntry](#pathentry)>** describing the location in the to expanding data source (optional, default `[{value:object}]`)

Returns **any** expanded object

### properties

Properties used for the default expander implementation

## createContext

Creates a new expansion context

### Parameters

-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** object with the following keys (optional, default `{}`)
    -   `options.valueQuoter` **[Quoter](#quoter)?** to quote expanded values
           by default no special quoting is done and the evaluated result will be direcly
           inserted into the output string
    -   `options.evaluate` **[Evaluator](#evaluator)?** evaluate(expression,context,path) function to evaluate expressions
           the default evaluation function does a lookup into the properties
    -   `options.keepUndefinedValues` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)?** true: is expression resolves to undefind the original string will be used (with surrounding ${})
    -   `options.maxNestingLevel` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)?** max number of recursive calls to expand defaults to 20
    -   `options.properties` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** default properties to evaluate expression against

Returns **[ExpressionExpander](#expressionexpander)** newly created expansion context

# install

With [npm](http://npmjs.org) do:

```shell
npm install expression-expander
```

# license

BSD-2-Clause
