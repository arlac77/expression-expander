
[![npm](https://img.shields.io/npm/v/expression-expander.svg)](https://www.npmjs.com/package/expression-expander)
[![Build Status](https://secure.travis-ci.org/arlac77/expression-expander.png)](http://travis-ci.org/arlac77/expression-expander)
[![Coverage Status](https://coveralls.io/repos/arlac77/expression-expander/badge.svg?branch=master&service=github)](https://coveralls.io/github/arlac77/expression-expander?branch=master)
[![GitHub Issues](https://img.shields.io/github/issues/arlac77/expression-expander.svg?style=flat-square)](https://github.com/arlac77/expression-expander/issues)
[![Dependency Status](https://david-dm.org/arlac77/expression-expander.svg)](https://david-dm.org/arlac77/expression-expander)
[![devDependency Status](https://david-dm.org/arlac77/expression-expander/dev-status.svg)](https://david-dm.org/arlac77/expression-expander#info=devDependencies)
[![docs](http://inch-ci.org/github/arlac77/expression-expander.svg?branch=master)](http://inch-ci.org/github/arlac77/expression-expander)

Expression Expander
-------------------

Expands expressions in json objects

# example

## file.js

```js
var ee = require('expression-expander');

var context = ee.createContext();

cntext.properties = { aKey : "aValue", moreKeys : { "a" : 1, "b" : 2 } };

console.log(context.expand("${aKey}"));

// expanding hole expressions at the key position
console.log(JSON.stringify(context.expand({"${moreKeys}" : {} })));
```

Output

```
aValue
{ "a" : 1, "b" : 2 }
```

# install

With [npm](http://npmjs.org) do:

```
npm install expression-expander
```

# license

BSD-2-Clause
