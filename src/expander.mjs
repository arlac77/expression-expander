/**
 * @module expression-expander
 */

function _quote(str) {
  return str;
}

/**
 * @callback Evaluator
 * @param {string} expression
 * @param {Object} context
 * @param {[Object]} path
 * @return {Object} expression evaluation result
 */

/**
 * @callback Quoter
 * @param {string} value
 * @return {string} quoted value
 */

/**
 * Creates a new expansion context
 * @param {Object} [options] object with the following keys
 * @param {Quoter} [options.valueQuoter] to quote expanded values
 *    by default no special quoting is done and the evaluated result will be direcly
 *    inserted into the output string
 * @param {Evaluator} [options.evaluate] evaluate(expression,context,path) function to evaluate expressions
 *    the default evaluation function does a lookup into the properties
 * @param  {boolean} [options.keepUndefinedValues] true: is expression resolves to undefind the original string will be used (with surrounding ${})
 * @param {number} [options.maxNestingLevel] max number of recursive calls to expand defaults to 20
 * @param {Object} [options.properties] default properties to evaluate expression against
 * @return {ExpressionExpander} newly created expansion context
 */
export function createContext(options = {}) {
  const leftMarker = options.leftMarker || "${";
  const rightMarker = options.rightMarker || "}";
  const markerRegexp = new RegExp(options.markerRegexp || /\${([^}]+)}/, "g");
  const keepUndefinedValues =
    options.keepUndefinedValues === undefined
      ? false
      : options.keepUndefinedValues;

  const valueQuoter = options.valueQuoter || _quote;
  const maxNestingLevel = options.maxNestingLevel || 20;

  let properties = options.properties || {};

  function _evaluate(expression) {
    return properties[expression];
  }

  const evaluate = options.evaluate || _evaluate;

  const context = Object.create(
    {
      /**
       * Expands object
       * @param {Object|string|boolean|number|Map|Set} object to expand
       * @param {Object[]} [path]  describing the location in the to expanding data source
       * @return {any} expanded object
       */
      expand(
        object,
        path = [
          {
            value: object
          }
        ]
      ) {
        const promises = [];
        const value = _expand(object, path, promises);
        if (promises.length !== 0) {
          return Promise.all(promises).then(() => value);
        }
        return value;
      }
    },
    {
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
    }
  );

  function _expand(object, path, promises) {
    if (path.length >= maxNestingLevel) {
      throw new Error(
        `Max nesting level ${maxNestingLevel} reached: ${object}`
      );
    }

    if (typeof object === "string" || object instanceof String) {
      let wholeValue;

      const localPromises = [];
      const v = object.replace(markerRegexp, (match, key, offset, string) => {
        let value = evaluate(key, context, path);

        if (typeof value === "string" || value instanceof String) {
          value = valueQuoter(_expand(value, path, promises));
        } else if (value === undefined) {
          value = keepUndefinedValues ? leftMarker + key + rightMarker : "";
        }
        if (
          string.length ===
          key.length + leftMarker.length + rightMarker.length
        ) {
          wholeValue = value;
          return "";
        }

        if (value instanceof Promise) {
          localPromises.push(value);
          return "${" + (localPromises.length - 1) + "}";
        }
        return value;
      });

      if (wholeValue !== undefined) {
        return wholeValue;
      }

      if (localPromises.length !== 0) {
        return Promise.all(localPromises).then(all =>
          v.replace(/\$\{(\d+)\}/g, (match, key) => all[parseInt(key, 10)])
        );
      }

      return v;
    }
    if (
      object === true ||
      object === false ||
      object === undefined ||
      object === null ||
      typeof object === "number" ||
      typeof object === "bigint" ||
      object instanceof Number ||
      object instanceof Date
    ) {
      // TODO: find a better way to identify special cases
      return object;
    }

    if (object instanceof Map) {
      const r = new Map();
      for (const [key, value] of object.entries()) {
        path.push({
          key,
          value
        });

        r.set(_expand(key, path, promises), _expand(value, path, promises));

        path.pop();
      }

      return r;
    }

    if (object instanceof Set) {
      const r = new Set();
      for (const value of object.values()) {
        path.push({
          value
        });

        r.add(_expand(value, path, promises));

        path.pop();
      }

      return r;
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
          r.then(f => (array[index] = f));
        }
        array[index] = r;
        path.pop();
      }

      return array;
    }

    let newObject = {};

    for (const key of Object.keys(object)) {
      const newKey = _expand(key, path, promises);
      if (typeof newKey === "string" || newKey instanceof String) {
        path.push({
          key,
          value: object[key]
        });
        const value = _expand(object[key], path, promises);
        if (value instanceof Promise) {
          promises.push(value);
          value.then(v => (newObject[newKey] = v));
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
