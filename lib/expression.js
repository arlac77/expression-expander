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
      let wholeValue;
      object.replace(/^\$\{([^\}]+)\}$/, function (match, key) {
        wholeValue = evaluate(key);
        if(wholeValue === undefined) wholeValue = '';
        if(typeof wholeValue === 'string' || wholeValue instanceof String) {
          wholeValue = valueQuoter(_expand(wholeValue, level + 1));
        }
      });

      if(wholeValue !== undefined) { return wholeValue; }

      return object.replace(/\$\{([^\}]+)\}/g, function (match, key) {
        const value = evaluate(key);
        if(value === undefined) return '';
        if(typeof value === 'string' || value instanceof String) {
          return valueQuoter(_expand(value, level + 1));
        }
        return value;
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

    let newObject = {};

    for (let key of Object.keys(object)) {
      const newKey = _expand(key, level + 1);
      if(typeof newKey === 'string' || newKey instanceof String) {
        newObject[newKey] = _expand(object[key], level + 1);
      }
      else {
        newObject = newKey;
      }
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
