/* global describe, it*/
/* jslint node: true, esnext: true */

"use strict";

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();

const expression = require('../index.js');


describe('expression', function () {

  let context = expression.createExpressionContext();

  it('simple string expand', function () {
    context.properties = { a : 1, b: 2 };

    assert(context.expand("${a}") == '1');
    const expanded = context.expand({ "b" : 2, "c" : "${a}"});
    //console.log(`${JSON.stringify(expanded)}`);

    assert(expanded.b == '2');
    assert(expanded.c == '1');

  });
});
