/* global describe, it, xit */
/* jslint node: true, esnext: true */

'use strict';

const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should();

const expander = require('../dist/expander');

describe('promise', () => {
  describe('object value', () => {
    const context = expander.createContext();

    context.properties = {
      //thePromise: 'promise value'
      thePromise: Promise.resolve('promise value')
    };

    const json = {
      some: '${thePromise}'
    };

    it('can expand', () => context.expand(json).then(v => assert.equal(v.some, 'promise value')));
  });

  describe('object key', () => {
    const context = expander.createContext();

    context.properties = {
      thePromise: Promise.resolve({
        value: 'the promise value'
      })
    };

    const json = {
      '${thePromise}': {}
    };

    it('can expand', () => context.expand(json).then(v => assert.deepEqual(v, {
      value: 'the promise value'
    })));
  });

  describe('array index', () => {
    const context = expander.createContext();

    context.properties = {
      thePromise: Promise.resolve({
        value: 'the promise value'
      })
    };

    const json = [1, 2, '${thePromise}', 4];

    it('can expand', () => context.expand(json).then(v => assert.deepEqual(v, [1, 2, {
      value: 'the promise value'
    }, 4])));
  });

  describe('string expression', () => {
    const context = expander.createContext();

    context.properties = {
      thePromise: Promise.resolve('the promise value')
    };

    const json = 'A${thePromise}B';

    it('can expand', () => context.expand(json).then(v => assert.equal(v, 'Athe promise valueB')));
  });
});
