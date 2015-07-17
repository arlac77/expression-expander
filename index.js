/* jslint node: true, esnext: true */
"use strict";

function quote(str) {
  return str;
}

exports.createExpressionContext = function (options) {

  if (options === undefined) {
    options = {};
  }

  const valueQuoter = options.valueQuoter || quote;
  const maxNestingLevel = 5;

  let properties = {};

  function _evaluate(expression) {
    const v = properties[expression];
    if (v === undefined) {
      return '${' + expression + '}';
    }

    //console.log(`${expression} -> ${v}`);
    return v;
  }

  const evaluate = options.evaluate || _evaluate;

  function _expand(object, level) {
    if (level >= maxNestingLevel) throw new Error(`max nesting level ${maxNestingLevel} reached: ${object}`);
    if (typeof object === 'string' || object instanceof String) {
      return object.replace(/\$\{([^\}]+)\}/g, function (match, key) {
        return valueQuoter(_expand(evaluate(key), level + 1));
      });
    }
    if (object === undefined || object === null ||
      typeof object === 'number' ||  object instanceof Number) {
      return object;
    }

    if (Array.isArray(object)) {
      return object.map(function (o) {
        return _expand(o, level + 1);
      });
    }

    const newObject = {};

    for (let key of Object.keys(object)) {
      newObject[key] = _expand(object[key], level + 1);
    }

    return newObject;
  }

  return Object.create({
    expand(object) {
      return _expand(object, 0);
    }
  }, {
    properties: {
      get: function () {
        return properties;
      },
      set: function (newProperties) {
        properties = newProperties;
      }
    }
  });
};
