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

  let properties = {};

  function _evaluate(expression) {
    const v = properties[expression];
    if (v === undefined) {
      return '${' + v + '}';
    }

    //console.log(`${expression} -> ${v}`);
    return v;
  }

  const evaluate = options.evaluate || _evaluate;

  function expand(object) {
    if (typeof object === 'string' || object instanceof String) {
      return object.replace(/\$\{([^\}]+)\}/g, function (match, key) {
        return valueQuoter(expand(evaluate(key)));
      });
    }
    if (object === undefined || object === null ||
      typeof object === 'number' ||  object instanceof Number) {
      return object;
    }

    if (Array.isArray(object)) {
      return object.map(function (o) {
        return expand(o);
      });
    }

    const newObject = {};

    for (let key of Object.keys(object)) {
      //console.log(`key: ${key} : ${object[key]}`);
      newObject[key] = expand(object[key]);
    }

    return newObject;
  }

  return Object.create({
    expand(object) {
      return expand(object);
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
