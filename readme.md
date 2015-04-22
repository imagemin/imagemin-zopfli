# imagemin-zopfli [![Build Status](https://travis-ci.org/imagemin/imagemin-zopfli.svg?branch=master)](https://travis-ci.org/imagemin/imagemin-zopfli) [![Build status](https://ci.appveyor.com/api/projects/status/au86jlv1nyfcv40h?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/imagemin-zopfli)

> zopfli imagemin plugin


## Install

```
$ npm install --save imagemin-zopfli
```


## Usage

```js
var Imagemin = require('imagemin');
var imageminZopfli = require('imagemin-zopfli');

new Imagemin()
	.src('images/*.png')
	.dest('build/images')
	.use(imageminZopfli({more: true}))
	.run();
```

You can also use this plugin with [gulp](http://gulpjs.com/):

```js
var gulp = require('gulp');
var imageminZopfli = require('imagemin-zopfli');

gulp.task('default', function () {
	return gulp.src('images/*.png')
		.pipe(imageminZopfli({more: true})())
		.pipe(gulp.dest('build/images'));
});
```


## API

### imageminZopfli(options)

#### options.8bit

Type: `boolean`  
Default: `false`

Convert 16-bit per channel image to 8-bit per channel.

#### options.more

Type: `boolean`  
Default: `false`

Compress more using more iterations (depending on file size).


## License

MIT © [imagemin](https://github.com/imagemin)
