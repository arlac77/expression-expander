/* jslint node: true, esnext: true */
"use strict";

function quote(str,expression) {
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

    return v;
  }

  const evaluate = options.evaluate || _evaluate;

  function _expand(object, level) {
    if (level >= maxNestingLevel) throw new Error(`max nesting level ${maxNestingLevel} reached: ${object}`);
    if (typeof object === 'string' || object instanceof String) {
      return object.replace(/\$\{([^\}]+)\}/g, function (match, key) {
        const value = evaluate(key);
        if(value === undefined) return '';

        return valueQuoter(_expand(value, level + 1));
      });
    }
    if (object === undefined || object === null ||
      typeof object === 'number' || object instanceof Number ||
      object instanceof Date) { // TODO: find a better way to identify special cases
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
