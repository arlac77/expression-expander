/* global describe, it*/
/* jslint node: true, esnext: true */

"use strict";

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();

const expression = require('../index.js');


describe('expression', function () {

  describe('plain', function () {
    let context = expression.createExpressionContext();

    it('string expand', function () {
      context.properties = {
        a: 1,
        b: 2
      };

      assert(context.expand("${a}") == '1');
      assert(context.expand("A${a}C") === 'A1C');
      assert(context.expand("A${a}${b}C") === 'A12C');
    });

    it('object expand', function () {
      context.properties = {
        a: 1,
        b: 2
      };

      const expanded = context.expand({
        "b": 3,
        "c": "${a}"
      });

      assert(expanded.b == '3');
      assert(expanded.c == '1');
    });

    it('array expand', function () {
      context.properties = {
        a: 1,
        b: 2
      };

      const expanded = context.expand([0, "${a}", "${b}"]);

      assert(expanded[0] == '0');
      assert(expanded[1] == '1');
      assert(expanded[2] == '2');
    });
  });

  describe('with valueQuoter', function () {
    let context = expression.createExpressionContext({
      valueQuoter: function (o) {
        return '<' + o + '>';
      }
    });

    it('string expand', function () {
      context.properties = {
        a: 1
      };

      //console.log(`${context.expand("${a}")}`);
      assert(context.expand("${a}") === "<1>");
    });
  });

});
