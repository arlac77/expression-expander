/* jslint node: true, esnext: true */
/* eslint-env es6 */
/* eslint valid-jsdoc: 2 */

'use strict';

function _quote(str, expression) {
  return str;
}

/**
 * Creates a new expansion context
 * @param {object} options object with the following keys
 *  - valueQuoter function to quote epanded values
 *    by default no special quoting is done and the evaluated result will be direcly
 *    inserted into the output string
 *  - evaluate(expression,context) function to evaluate expressions
 *    the default evaluation function simply does a lookup into the properties
 *  - keepUndefinedValues
 *    true: is expression resolves to undefind the original string will be used (with surrounding ${})
 *  - maxNestingLevel max number of recursive calls to expand defaults to 20
 *
 * @return {ExpressionExpander} newly created expansion context
 */
function createContext(options = {}) {

  const leftMarker = options.leftMarker || '${';
  const rightMarker = options.rightMarker || '}';
  const markerRegexp = new RegExp(options.markerRegexp || /\$\{([^\}]+)\}/, 'g');
  const markerWholeRegexp = options.markerRegexp ? new RegExp('^' + options.markerRegexp + '$', '') :
    /^\$\{([^\}]+)\}$/;

  const keepUndefinedValues = options.keepUndefinedValues === undefined ?
    false : options.keepUndefinedValues ? true : false;

  const valueQuoter = options.valueQuoter || _quote;
  const maxNestingLevel = options.maxNestingLevel || 20;

  let properties = {};

  function _evaluate(expression) {
    return properties[expression];
  }

  const evaluate = options.evaluate || _evaluate;

  const context = Object.create({
    /**
     * Expands object
     * @param {any} object to expand
     * @param {array} optional path describing the location in the to expanding data source
     * @return {any} expanded object
     */
    expand(object, path = [{
      value: object
    }]) {
      return _expand(object, path);
    }
  }, {
    /**
     * Properties used for the default expander implementation
     */
    properties: {
      get() {
          return properties;
        },
        set(newProperties) {
          properties = newProperties;
        }
    }
  });

  function _expand(object, path) {
    if (path.length >= maxNestingLevel) throw new Error(`Max nesting level ${maxNestingLevel} reached: ${object}`);
    if (typeof object === 'string' || object instanceof String) {
      let wholeValue;
      object.replace(markerWholeRegexp, (match, key) => {
        wholeValue = evaluate(key, context, path);
        if (wholeValue === undefined) {
          wholeValue = keepUndefinedValues ? leftMarker + key + rightMarker : '';
        }
        if (typeof wholeValue === 'string' || wholeValue instanceof String) {
          wholeValue = valueQuoter(_expand(wholeValue, path));
        }
      });

      if (wholeValue !== undefined) {
        return wholeValue;
      }

      return object.replace(markerRegexp, (match, key) => {
        const value = evaluate(key, context, path);

        if (value === undefined) {
          if (keepUndefinedValues) return leftMarker + key + rightMarker;
          return '';
        }

        if (typeof value === 'string' || value instanceof String) {
          return valueQuoter(_expand(value, path));
        }
        return value;
      });
    }
    if (object === undefined || object === null ||
      typeof object === 'number' || object instanceof Number ||
      object instanceof Date) { // TODO: find a better way to identify special cases
      return object;
    }

    if (Array.isArray(object)) {
      return object.map((o, index) => {
        path.push({
          key: index,
          value: o
        });
        const r = _expand(o, path);
        path.pop();
        return r;
      });
    }

    let newObject = {};

    for (let key of Object.keys(object)) {
      const newKey = _expand(key, path);
      if (typeof newKey === 'string' || newKey instanceof String) {
        path.push({
          key: key,
          value: object[key]
        });
        newObject[newKey] = _expand(object[key], path);
        path.pop();
      } else {
        newObject = newKey;
      }
    }

    return newObject;
  }

  return context;
}

export {
  createContext
};
