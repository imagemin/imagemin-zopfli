const {promisify} = require('util');
const fs = require('fs');
const path = require('path');
const isPng = require('is-png');
const test = require('ava');
const m = require('.');

const readFile = promisify(fs.readFile);

test('optimize a PNG', async t => {
	const buf = await readFile(path.join(__dirname, 'fixtures/test.png'));
	const data = await m()(buf);

	t.true(data.length < buf.length);
	t.true(isPng(data));
});

test('skip optimizing a non-PNG file', async t => {
	const buf = await readFile(__filename);
	const data = await m()(buf);

	t.deepEqual(data, buf);
});

test('skip optimizing an already optimized PNG', async t => {
	const buf = await readFile(path.join(__dirname, 'fixtures/test-smallest.png'));
	const data = await m()(buf);

	t.deepEqual(data, buf);
});
