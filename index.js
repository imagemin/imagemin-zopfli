'use strict';

var execFile = require('child_process').execFile;
var fs = require('fs');
var imageType = require('image-type');
var tempfile = require('tempfile');
var rm = require('rimraf');
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
        if (imageType(file.contents) !== 'png') {
            return cb();
        }

        var args = ['-y'];
        var src = tempfile('.png');
        var dest = tempfile('.png');

        if (opts.more) {
            args.push('-m');
        }

        if (opts['8bit']) {
            args.push('--lossy_8bit');
        }

        fs.writeFile(src, file.contents, function (err) {
            if (err) {
                return cb(err);
            }

            execFile(zopfli, args.concat([src, dest]), function (err) {
                if (err) {
                    return cb(err);
                }

                fs.readFile(dest, function (err, buf) {
                    rm(src, function (err) {
                        if (err) {
                            return cb(err);
                        }

                        rm(dest, function (err) {
                            if (err) {
                                return cb(err);
                            }

                            file.contents = buf;

                            cb();
                        });
                    });
                });
            });
        });
    };
};
