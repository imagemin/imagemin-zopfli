'use strict';
var fs = require('fs');
var path = require('path');
var bufferEqual = require('buffer-equal');
var isPng = require('is-png');
var test = require('ava');
var imageminZopfli = require('../');

test('optimize a PNG', function (t) {
	t.plan(2);

	var buf = fs.readFileSync(path.join(__dirname, 'fixtures/test.png'));

	imageminZopfli()(buf).then(function (data) {
		t.assert(data.length < buf.length, data.length);
		t.assert(isPng(data));
	});
});

test('skip optimizing a non-PNG file', function (t) {
	t.plan(1);

	var buf = fs.readFileSync(__filename);

	imageminZopfli()(buf).then(function (data) {
		t.assert(bufferEqual(data, buf));
	});
});

test('skip optimizing an already optimized PNG', function (t) {
	t.plan(1);

	var buf = fs.readFileSync(path.join(__dirname, 'fixtures/test-smallest.png'));

	imageminZopfli()(buf).then(function (data) {
		t.assert(bufferEqual(data, buf));
	});
});
