/* global nokit */
/* global it */
/* global describe */
const assert = require("assert");
const app = require("./app");
const base64 = nokit.base64;

describe('base64', function() {

  it('base64.encode', function() {
    assert.notEqual(base64.encode, null);
    var rs = base64.encode("test");
    assert.equal(rs, "dGVzdA==");
  });

  it('base64.decode', function() {
    assert.notEqual(base64.encode, null);
    var rs = base64.decode("dGVzdA==");
    assert.equal(rs, "test");
  });

});