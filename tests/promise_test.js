/* global describe, it, xit */
/* jslint node: true, esnext: true */

'use strict';

const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should();

const expander = require('../dist/expander');

describe('promise', () => {
  const context = expander.createContext();

  context.properties = {
    //thePromise: 'promise value'
    thePromise: Promise.resolve('promise value')
  };

  const json = {
    some: '${thePromise}'
  };

  it('can expand', () => context.expand(json)
    .then(v => assert.equal(v.some, 'promise value')));
});
