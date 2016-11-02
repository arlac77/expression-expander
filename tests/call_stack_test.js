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
    keepUndefinedValues: true,
    leftMarker: '{{',
    rightMarker: '}}',
    markerRegexp: '\{\{([^\}]+)\}\}'
  });

  context.properties = {
    /*  'github.user': 'user',
      'github.repo': 'repo',
      'name': 'repo',
      'date.year': '2016',
      'license.owner': 'user' */
  };

  const json = {
    "name": "{{name}}",
    "version": "0.0.0-semantic-release",
    "module": "{{module}}",
    "main": "{{main}}"
  };

  it('can expand', () => assert.equal(context.expand(json).module, 'module'));
});
