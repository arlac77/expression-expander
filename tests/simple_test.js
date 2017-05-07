/* global describe, it, xit */
/* jslint node: true, esnext: true */

'use strict';

const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should();

const expander = require('../dist/expander');



describe('expression', () => {
  describe('plain', () => {
    const context = expander.createContext();

    it('expand string', () => {
      context.properties = {
        a: 1,
        b: 2,
        c: 'text'
      };

      assert.equal(context.expand('${a}'), '1');
      assert.equal(context.expand('A${a}C'), 'A1C');
      assert.equal(context.expand('A${a}${b}C'), 'A12C');
      assert.equal(context.expand('A${c}C'), 'AtextC');
    });

    it('expand string with undefined value', function () {
      context.properties = {
        b: 2
      };

      assert.equal(context.expand('B${a}A'), 'BA');
      assert.equal(context.expand('${a}'), '');
    });

    it('expand string transitive', function () {
      context.properties = {
        a: '${b}',
        b: 2
      };
      assert.equal(context.expand('${a}'), '2');
    });

    it('expand undefined', () => assert.isUndefined(context.expand(undefined)));
    it('expand NaN', () => assert.isNaN(context.expand(NaN)));

    it('expand false', () => assert.equal(false, context.expand(false)));
    it('expand true', () => assert.equal(true, context.expand(true)));

    it('expand Date', () => {
      const d = new Date();
      assert.equal(context.expand(d), d);
    });

    it('expand null', () => assert.isNull(context.expand(null)));

    it('expand undefined value', () => {
      const context = expander.createContext();
      assert.equal(context.expand('${a}'), '');
    });

    it('expand object', () => {
      context.properties = {
        a: 1,
        b: 2,
        c: 'nc'
      };

      const expanded = context.expand({
        b: 3,
        c: '${a}',
        '${c}': 4
      });

      assert.equal(expanded.b, '3');
      assert.equal(expanded.c, '1');
      assert.equal(expanded.nc, '4');
    });

    it('expand array', () => {
      context.properties = {
        a: 1,
        b: 2
      };

      const expanded = context.expand([0, '${a}', '${b}']);

      assert.equal(expanded[0], '0');
      assert.equal(expanded[1], '1');
      assert.equal(expanded[2], '2');
    });
  });

  describe('with valueQuoter', () => {
    let context = expander.createContext({
      valueQuoter: function (o) {
        return '<' + o + '>';
      }
    });

    it('string expand', () => {
      context.properties = {
        a: '1'
      };

      //console.log(`${context.expand('${a}')}`);
      assert.equal(context.expand('${a}'), '<1>');
    });
  });

  describe('circular transitivity', () => {
    const context = expander.createContext();

    context.properties = {
      a: '${b}',
      b: '${a}'
    };
    it('string expand should fail', () => {
      assert.throws(() => context.expand('${a}'));
    });
  });


  describe('special marker', () => {
    const context = expander.createContext({
      leftMarker: '{{',
      rightMarker: '}}',
      markerRegexp: '\{\{([^\}]+)\}\}'
    });

    it('expand string', () => {
      context.properties = {
        a: 1,
        b: 2,
        c: 'text'
      };

      assert.equal(context.expand('{{a}}'), '1');
      assert.equal(context.expand('A{{a}}C'), 'A1C');
      assert.equal(context.expand('A{{a}}{{b}}C'), 'A12C');
      assert.equal(context.expand('A{{c}}C'), 'AtextC');
    });
  });

});
