/* global describe, it, xit */
/* jslint node: true, esnext: true */

"use strict";

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();

const expander = require('../lib/expander');

describe('expression', function () {
  describe('complex', function () {
    let context = expander.createContext();
    context.properties = {
      moreThanOne: {
        a: 1,
        b: 2
      }
    };

    it('expand string to object', function () {
      const expanded = context.expand("${moreThanOne}");
      assert.equal(expanded.a, 1);
      assert.equal(expanded.b, 2);
    });

    it('expand string in array to object', function () {
      const expanded = context.expand(["${moreThanOne}",2,3]);
      assert.equal(expanded[0].a, 1);
      assert.equal(expanded[0].b, 2);
      assert.equal(expanded[1], 2);
    });

    it('expand object key to object', function () {
      const expanded = context.expand({
        "${moreThanOne}": {}
      });
      //console.log(`expanded: ${JSON.stringify(expanded)}`);
      assert.equal(expanded.a, 1);
      assert.equal(expanded.b, 2);
    });

    it('expand object value to object', function () {
      const expanded = context.expand({
        "aKey" : "${moreThanOne}"
      });
      assert.equal(expanded.aKey.a, 1);
      assert.equal(expanded.aKey.b, 2);
    });

  });
});
