/* global describe, it, xit */
/* jslint node: true, esnext: true */

'use strict';

const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should();

const expander = require('../lib/expander');

describe('expand special', () => {
  describe('user defined evaluate', () => {
    const context = expander.createContext({
      evaluate(expression, context, path) {
        //console.log(`path: ${path.map(o => o.key).join('/')}`);
        const r = expression.match(/(\d+)\s*([\+\-\*\/])\s*(\d+)/);
        if (r) {
          return r[1] * r[3];
        }
        if (expression === 'path') {
          return path.map(o => o.key).join('/');
        }
        return path[0].value;
      }
    });

    it('expand string to object', () => assert.equal(context.expand('${2 * 3}'), 6));
    it('expand with path', () => assert.deepEqual(context.expand({
      key1: '${path}',
      key2: {
        key3: '${path}',
        key4: [0, '${path}'],
        key5: [0, '${value}']
      }
    }), {
      key1: 'key1',
      key2: {
        key3: 'key2/key3',
        key4: [0, 'key2/key4/1'],
        key5: [0, {
          key3: '${path}',
          key4: [0, '${path}'],
          key5: [0, '${value}']
        }]
      }
    }));
  });
});
