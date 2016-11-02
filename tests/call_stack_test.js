/* global describe, it, xit */
/* jslint node: true, esnext: true */

'use strict';

const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should();

const expander = require('../dist/expander');

describe('expression', () => {
  const context = expander.createContext({
    keepUndefinedValues: true
  });

  const json = {
    key: '${unknown}'
  };

  it('can expand', () => assert.equal(context.expand(json).key, '${unknown}'));
});
