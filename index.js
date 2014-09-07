'use strict';

var ExecBuffer = require('exec-buffer');
var isPng = require('is-png');
var zopfli = require('zopflipng-bin').path;

/**
 * zopfli image-min plugin
 *
 * @param {Object} opts
 * @api public
 */

module.exports = function (opts) {
	opts = opts || {};

	return function (file, imagemin, cb) {
		if (!isPng(file.contents)) {
			cb();
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
				cb();
			});
	};
};
