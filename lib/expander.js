/* jslint node: true, esnext: true */
"use strict";

function _quote(str, expression) {
  return str;
}

/**
 * Creates a new expansion context
 * @param options object with the following keys
 *  - valueQuoter function to quote epanded values
 *    by default no special quoting is done and the evaluated result will be direcly
 *    inserted into the output string
 *  - evaluate(expression,context) function to evaluate expressions
 *    the default evaluation function simply does a lookup into the properties
 *  - keepUndefinedValues
 *    true: is expression resolved to undefind the original string will be used (with surrounding ${})
 *
 * @return newly created expansion context
 */
exports.createContext = function (options) {

  if (options === undefined) {
    options = {};
  }

  const keepUndefinedValues = options.keepUndefinedValues === undefined ?
    false : options.keepUndefinedValues ? true : false;

  const valueQuoter = options.valueQuoter || _quote;
  const maxNestingLevel = 5;

  let properties = {};

  function _evaluate(expression) {
    return properties[expression];
  }

  const evaluate = options.evaluate || _evaluate;

  const context = Object.create({
    /**
     * Expands object
     * @param object to expand
     * @return expanded object
     */
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

  function _expand(object, level) {
    if (level >= maxNestingLevel) throw new Error(`max nesting level ${maxNestingLevel} reached: ${object}`);
    if (typeof object === 'string' || object instanceof String) {
      let wholeValue;
      object.replace(/^\$\{([^\}]+)\}$/, function (match, key) {
        wholeValue = evaluate(key, context);
        if (wholeValue === undefined) {
          wholeValue = keepUndefinedValues ? '${' + key + '}' : '';
        }
        if (typeof wholeValue === 'string' || wholeValue instanceof String) {
          wholeValue = valueQuoter(_expand(wholeValue, level + 1));
        }
      });

      if (wholeValue !== undefined) {
        return wholeValue;
      }

      return object.replace(/\$\{([^\}]+)\}/g, function (match, key) {
        const value = evaluate(key, context);

        if (value === undefined) {
          if (keepUndefinedValues) return '${' + key + '}';
          return '';
        }

        if (typeof value === 'string' || value instanceof String) {
          return valueQuoter(_expand(value, level + 1));
        }
        return value;
      });
    }
    if (object === undefined || object === null ||
      typeof object === 'number' ||  object instanceof Number ||
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
      if (typeof newKey === 'string' || newKey instanceof String) {
        newObject[newKey] = _expand(object[key], level + 1);
      } else {
        newObject = newKey;
      }
    }

    return newObject;
  }

  return context;
};
