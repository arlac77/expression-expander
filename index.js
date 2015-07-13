/* jslint node: true, esnext: true */
"use strict";

exports.createExpressionContext = function () {

  let properties = {};

  function quote(str) {
    return str;
  }

  function evaluate(expression) {
    const v = properties[expression];
    if (v !== undefined) return v;
    return '${' + v + '}';
  }

  function expand(object) {
    if (typeof object === 'string' || object instanceof String) {
      return object.replace(/\$\{([^\}]+)\}/g, function (match, key) {
        return evaluate(key);
      });
    }
    if (object === undefined || object === null ||
      typeof object === 'number' ||  object instanceof Number) {
      return object;
    }

    if (Array.isArray(object)) {
      return object.forEach(function (o) {
        return expand(o);
      });
    }

    //console.log(`expand: ${JSON.stringify(object)}`);

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
