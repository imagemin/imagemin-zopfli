# imagemin-zopfli [![Build Status](http://img.shields.io/travis/imagemin/imagemin-zopfli.svg?style=flat)](https://travis-ci.org/imagemin/imagemin-zopfli) [![Build status](https://ci.appveyor.com/api/projects/status/au86jlv1nyfcv40h?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/imagemin-zopfli)

> zopfli imagemin plugin


## Install

```bash
$ npm install --save imagemin-zopfli
```


## Usage

```js
var Imagemin = require('imagemin');
var zopfli = require('imagemin-zopfli');

var imagemin = new Imagemin()
	.src('images/*.png')
	.dest('build/images')
	.use(zopfli({ more: true }));

imagemin.run(function (err, files) {
	if (err) {
		throw err;
	}

	console.log('Files optimized successfully!');
});
```

You can also use this plugin with [gulp](http://gulpjs.com/):

```js
var gulp = require('gulp');
var zopfli = require('imagemin-zopfli');

gulp.task('default', function () {
	return gulp.src('images/*.png')
		.pipe(zopfli({ more: true })())
		.pipe(gulp.dest('build/images'));
});
```


## Options

### 8bit

Type: `Boolean`  
Default: `false`

Convert 16-bit per channel image to 8-bit per channel.

### more

Type: `Boolean`  
Default: `false`

Compress more using more iterations (depending on file size).


## License

MIT © [imagemin](https://github.com/imagemin)
