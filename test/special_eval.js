/* global describe, it, xit */
/* jslint node: true, esnext: true */

"use strict";

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();

const expander = require('../lib/expander');

describe('expand special', function () {
  describe('user defined evaluate', function () {
    let context = expander.createContext( { evaluate: function(expression,context) {
      const r = expression.match(/(\d+)\s*([\+\-\*\/])\s*(\d+)/);
      if(r) {
        //console.log(`R:${r[1]}`);
        return r[1] * r[3];
      }
      return undefined;
      }});

    it('expand string to object', function () {
      assert.equal(context.expand("${2 * 3}"), 6);
    });
  });
});
