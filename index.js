'use strict';
const execBuffer = require('exec-buffer');
const isPng = require('is-png');
const zopfli = require('zopflipng-bin');

module.exports = opts => buf => {
	opts = Object.assign({}, opts);

	if (!Buffer.isBuffer(buf)) {
		return Promise.reject(new TypeError('Expected a buffer'));
	}

	if (!isPng(buf)) {
		return Promise.resolve(buf);
	}

	const args = ['-y'];

	if (opts['8bit']) {
		args.push('--lossy_8bit');
	}

	if (opts.transparent) {
		args.push('--lossy_transparent');
	}

	if (opts.iterations) {
		args.push(`--iterations=${opts.iterations}`);
	}

	if (opts.iterationsLarge) {
		args.push(`--iterations_large=${opts.iterationsLarge}`);
	}

	if (opts.more) {
		args.push('-m');
	}

	args.push(execBuffer.input, execBuffer.output);

	return execBuffer({
		input: buf,
		bin: zopfli,
		args
	}).catch(err => {
		err.message = err.stderr || err.message;
		throw err;
	});
};
