/* jslint node: true, esnext: true */
/* eslint-env es6 */
/* eslint valid-jsdoc: 2 */

'use strict';

/**
 * @module expression-expander
 */

function _quote(str, expression) {
  return str;
}

/**
 * Creates a new expansion context
 * @param {object} [options] object with the following keys
 *  - valueQuoter function to quote epanded values
 *    by default no special quoting is done and the evaluated result will be direcly
 *    inserted into the output string
 *  - evaluate(expression,context,path) function to evaluate expressions
 *    the default evaluation function simply does a lookup into the properties
 *  - keepUndefinedValues
 *    true: is expression resolves to undefind the original string will be used (with surrounding ${})
 *  - maxNestingLevel max number of recursive calls to expand defaults to 20
 *
 * @return {ExpressionExpander} newly created expansion context
 */
export function createContext(options = {}) {

  const leftMarker = options.leftMarker || '${';
  const rightMarker = options.rightMarker || '}';
  const markerRegexp = new RegExp(options.markerRegexp || /\$\{([^\}]+)\}/, 'g');
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
     * @param {object[]} [path] describing the location in the to expanding data source
     * @return {any} expanded object
     */
    expand(object, path = [{
      value: object
    }]) {
      const promises = [];
      const value = _expand(object, path, promises);
      if (promises.length) {
        return Promise.all(promises).then(() => value);
      }
      return value;
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

  function _expand(object, path, promises) {
    if (path.length >= maxNestingLevel) throw new Error(`Max nesting level ${maxNestingLevel} reached: ${object}`);
    if (typeof object === 'string' || object instanceof String) {
      let wholeValue;
      const v = object.replace(markerRegexp, (match, key, offset, string) => {
        let value = evaluate(key, context, path);

        if (typeof value === 'string' || value instanceof String) {
          value = valueQuoter(_expand(value, path, promises));
        } else if (value === undefined) {
          value = keepUndefinedValues ? leftMarker + key + rightMarker : '';
        }
        if (string.length === key.length + leftMarker.length + rightMarker.length) {
          wholeValue = value;
          return '';
        }

        return value;
      });

      return wholeValue === undefined ? v : wholeValue;
    }
    if (object === undefined || object === null ||
      typeof object === 'number' || object instanceof Number ||
      object instanceof Date) { // TODO: find a better way to identify special cases
      return object;
    }

    if (Array.isArray(object)) {
      const array = new Array(object.length);

      for (let index = 0; index < object.length; index++) {
        const o = object[index];
        path.push({
          key: index,
          value: o
        });

        const r = _expand(o, path, promises);
        if (r instanceof Promise) {
          promises.push(r);
          r.then(f => array[index] = f);
        }
        array[index] = r;
        path.pop();
      }

      return array;
    }

    let newObject = {};

    for (const key of Object.keys(object)) {
      const newKey = _expand(key, path, promises);
      if (typeof newKey === 'string' || newKey instanceof String) {
        path.push({
          key: key,
          value: object[key]
        });
        const value = _expand(object[key], path, promises);
        if (value instanceof Promise) {
          promises.push(value);
          value.then(v => newObject[newKey] = v);
        }
        newObject[newKey] = value;
        path.pop();
      } else {
        newObject = newKey;
      }
    }

    return newObject;
  }

  return context;
}
