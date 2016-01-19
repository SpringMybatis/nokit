/* global it */
/* global describe */
var assert = require("assert");
var app = require("./app");

it("启动后停止", function (done) {
    app.server.start(function (err, info) {
        assert.equal(err, null);
        app.server.stop(function (err, info) {
            assert.equal(err, null);
            done();
        });
    });
});