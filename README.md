# expand-expression
[![npm](https://img.shields.io/npm/v/expression-expander.svg)](https://www.npmjs.com/package/expression-expander)
[![Build Status](https://secure.travis-ci.org/arlac77/expand-expression.png)](http://travis-ci.org/arlac77/expand-expression)
[![Coverage Status](https://coveralls.io/repos/arlac77/expand-expression/badge.svg)](https://coveralls.io/r/arlac77/expand-expression)
[![GitHub Issues](https://img.shields.io/github/issues/arlac77/expand-expression.svg?style=flat-square)](https://github.com/arlac77/expand-expression/issues)
[![Dependency Status](https://david-dm.org/arlac77/expand-expression.svg)](https://david-dm.org/arlac77/expand-expression)
[![devDependency Status](https://david-dm.org/arlac77/expand-expression/dev-status.svg)](https://david-dm.org/arlac77/expand-expression#info=devDependencies)
[![docs](http://inch-ci.org/github/arlac77/expand-expression.svg?branch=master)](http://inch-ci.org/github/arlac77/expand-expression)

Expression Expander
-------------------

Expands expressions in json objects

# example

## file.js

```js
var ee = require('expression-expander');

var context = ee.createContext();

cntext.properties = { aKey : "aValue" };

console.log(context.expand("${aKey}"));
```

Output

```
aValue
```

# install

With [npm](http://npmjs.org) do:

```
npm install expand-expression
```

# license

BSD-2-Clause
