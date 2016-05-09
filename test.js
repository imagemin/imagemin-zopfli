import fs from 'fs';
import path from 'path';
import isPng from 'is-png';
import pify from 'pify';
import test from 'ava';
import m from './';

const fsP = pify(fs);

test('optimize a PNG', async t => {
	const buf = await fsP.readFile(path.join(__dirname, 'fixtures/test.png'));
	const data = await m()(buf);

	t.true(data.length < buf.length);
	t.true(isPng(data));
});

test('skip optimizing a non-PNG file', async t => {
	const buf = await fsP.readFile(__filename);
	const data = await m()(buf);

	t.deepEqual(data, buf);
});

test('skip optimizing an already optimized PNG', async t => {
	const buf = await fsP.readFile(path.join(__dirname, 'fixtures/test-smallest.png'));
	const data = await m()(buf);

	t.deepEqual(data, buf);
});
