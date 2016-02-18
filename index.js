'use strict';
var ExecBuffer = require('exec-buffer');
var isPng = require('is-png');
var through = require('through2');
var zopfli = require('zopflipng-bin');

module.exports = function (opts) {
	opts = opts || {};

	return through.ctor({objectMode: true}, function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new Error('Streaming is not supported'));
			return;
		}

		if (!isPng(file.contents)) {
			cb(null, file);
			return;
		}

		var execBuffer = new ExecBuffer();
		var args = ['-y'];

		if (opts['8bit']) {
			args.push('--lossy_8bit');
		}

		if (opts.transparent) {
			args.push('--lossy_transparent');
		}

		if (opts.iterations) {
			args.push('--iterations=' + opts.iterations);
		}

		if (opts.iterationsLarge) {
			args.push('--iterations_large=' + opts.iterationsLarge);
		}

		if (opts.more) {
			args.push('-m');
		}

		execBuffer
			.use(zopfli, args.concat([execBuffer.src(), execBuffer.dest()]))
			.run(file.contents, function (err, buf) {
				if (err) {
					err.fileName = file.path;
					cb(err);
					return;
				}

				if (buf.length < file.contents.length) {
					file.contents = buf;
				}

				cb(null, file);
			});
	});
};
