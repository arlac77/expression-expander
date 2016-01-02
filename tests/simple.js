/* global describe, it, xit */
/* jslint node: true, esnext: true */

"use strict";

const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should();

const expander = require('../lib/expander');

describe('expression', function () {

  describe('plain', function () {
    let context = expander.createContext();

    it('expand string', function () {
      context.properties = {
        a: 1,
        b: 2
      };

      assert.equal(context.expand("${a}"), '1');
      assert.equal(context.expand("A${a}C"), 'A1C');
      assert.equal(context.expand("A${a}${b}C"), 'A12C');
    });

    it('expand string with undefined value', function () {
      context.properties = {
        b: 2
      };

      assert.equal(context.expand("B${a}A"), 'BA');
      assert.equal(context.expand("${a}"), '');
    });

    it('expand string transitive', function () {
      context.properties = {
        a: "${b}",
        b: 2
      };
      assert.equal(context.expand("${a}"), '2');
    });

    it('expand undefined', function () {
      assert.isUndefined(context.expand(undefined));
    });

    it('expand NaN', function () {
      assert.isNaN(context.expand(NaN));
    });

    it('expand Date', function () {
      const d = new Date();
      assert.equal(context.expand(d), d);
    });

    it('expand null', function () {
      assert.isNull(context.expand(null));
    });

    it('expand undefined value', function () {
      let context = expander.createContext();
      assert.equal(context.expand("${a}"), '');
    });

    it('expand object', function () {
      context.properties = {
        a: 1,
        b: 2,
        c: 'nc'
      };

      const expanded = context.expand({
        "b": 3,
        "c": "${a}",
        "${c}": 4
      });

      assert.equal(expanded.b, '3');
      assert.equal(expanded.c, '1');
      assert.equal(expanded.nc, '4');
    });

    it('expand array', function () {
      context.properties = {
        a: 1,
        b: 2
      };

      const expanded = context.expand([0, "${a}", "${b}"]);

      assert.equal(expanded[0], '0');
      assert.equal(expanded[1], '1');
      assert.equal(expanded[2], '2');
    });
  });

  describe('with valueQuoter', function () {
    let context = expander.createContext({
      valueQuoter: function (o) {
        return '<' + o + '>';
      }
    });

    it('string expand', function () {
      context.properties = {
        a: '1'
      };

      //console.log(`${context.expand("${a}")}`);
      assert.equal(context.expand("${a}"), "<1>");
    });
  });

  describe('circular transitivity', function () {
    const context = expander.createContext();

    context.properties = {
      a: '${b}',
      b: '${a}'
    };
    it('string expand should fail', function () {
      assert.throws(function () {
        context.expand("${a}");
      });
    });
  });
});
