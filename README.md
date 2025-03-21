[![npm](https://img.shields.io/npm/v/expression-expander.svg)](https://www.npmjs.com/package/expression-expander)
[![License](https://img.shields.io/badge/License-0BSD-blue.svg)](https://spdx.org/licenses/0BSD.html)
[![Typed with TypeScript](https://flat.badgen.net/badge/icon/Typed?icon=typescript\&label\&labelColor=blue\&color=555555)](https://typescriptlang.org)
[![bundlejs](https://deno.bundlejs.com/?q=expression-expander\&badge=detailed)](https://bundlejs.com/?q=expression-expander)
[![downloads](http://img.shields.io/npm/dm/expression-expander.svg?style=flat-square)](https://npmjs.org/package/expression-expander)
[![GitHub Issues](https://img.shields.io/github/issues/arlac77/expression-expander.svg?style=flat-square)](https://github.com/arlac77/expression-expander/issues)
[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Farlac77%2Fexpression-expander%2Fbadge\&style=flat)](https://actions-badge.atrox.dev/arlac77/expression-expander/goto)
[![Styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Known Vulnerabilities](https://snyk.io/test/github/arlac77/expression-expander/badge.svg)](https://snyk.io/test/github/arlac77/expression-expander)
[![Coverage Status](https://coveralls.io/repos/arlac77/expression-expander/badge.svg)](https://coveralls.io/github/arlac77/expression-expander)

## Expression Expander

Expands *\\${to be evaluated}* expressions in object graphs. The actual expression syntax inside of the *\\${evaluated}* is not defined within this module (only simple key lookup)

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

*   String
*   Number
*   BigInt
*   Buffer
*   Object (key and value will be expanded)
*   Array
*   Map (key and value will be expanded)
*   Set
*   Boolean
*   Promise

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

*   [Evaluator](#evaluator)
    *   [Parameters](#parameters)
*   [PathEntry](#pathentry)
    *   [Properties](#properties)
*   [Quoter](#quoter)
    *   [Parameters](#parameters-1)
*   [Expander](#expander)
    *   [Parameters](#parameters-2)
*   [ExpressionExpander](#expressionexpander)
    *   [Properties](#properties-1)
*   [createContext](#createcontext)
    *   [Parameters](#parameters-3)
*   [expand](#expand)
    *   [Parameters](#parameters-4)
*   [properties](#properties-2)

## Evaluator

Type: [Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)

### Parameters

*   `expression` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;
*   `context` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**&#x20;
*   `path` **\[[PathEntry](#pathentry)]**&#x20;

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** expression evaluation result

## PathEntry

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

### Properties

*   `value` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**&#x20;

## Quoter

Type: [Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)

### Parameters

*   `value` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** to be quoted

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** quoted value

## Expander

Type: [Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)

### Parameters

*   `value` **([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | [boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) | bigint | [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) | [Map](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map) | [Set](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set))**&#x20;
*   `path` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[PathEntry](#pathentry)>?**&#x20;

Returns **([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | [boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) | bigint | [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) | [Map](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map) | [Set](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set))** expression evaluation result

## ExpressionExpander

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

### Properties

*   `properties` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**&#x20;
*   `expand` **[Expander](#expander)**&#x20;

## createContext

Creates a new expansion context

### Parameters

*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** object with the following keys

    *   `options.leftMarker` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** lead in of expression
    *   `options.rightMarker` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** lead out of expression
    *   `options.markerRegexp` **([RegExp](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp) | [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))?** expression with lead in / out
    *   `options.valueQuoter` **[Quoter](#quoter)?** to quote expanded values
        by default no special quoting is done and the evaluated result will be direcly
        inserted into the output string
    *   `options.evaluate` **[Evaluator](#evaluator)?** evaluate(expression,context,path) function to evaluate expressions
        the default evaluation function does a lookup into the properties
    *   `options.keepUndefinedValues` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)?** true: is expression resolves to undefind the original string will be used (with surrounding ${})
    *   `options.maxNestingLevel` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)?** max number of recursive calls to expand defaults to 20
    *   `options.properties` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** default properties to evaluate expression against

Returns **[ExpressionExpander](#expressionexpander)** newly created expansion context

## expand

Type: [Expander](#expander)

### Parameters

*   `object` &#x20;
*   `path`   (optional, default `[{value:object}]`)

## properties

Properties used for the default expander implementation

# install

With [npm](http://npmjs.org) do:

```shell
npm install expression-expander
```

# license

BSD-2-Clause
