'use strict';

var ExecBuffer = require('exec-buffer');
var isPng = require('is-png');
var through = require('through2');
var zopfli = require('zopflipng-bin').path;

/**
 * zopfli imagemin plugin
 *
 * @param {Object} opts
 * @api public
 */

module.exports = function (opts) {
	opts = opts || {};

	return through.ctor({ objectMode: true }, function (file, enc, cb) {
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

		var exec = new ExecBuffer();
		var args = ['-y'];

		if (opts.more) {
			args.push('-m');
		}

		if (opts['8bit']) {
			args.push('--lossy_8bit');
		}

		exec
			.use(zopfli, args.concat([exec.src(), exec.dest()]))
			.run(file.contents, function (err, buf) {
				if (err) {
					cb(err);
					return;
				}

				file.contents = buf;
				cb(null, file);
			});
	});
};
