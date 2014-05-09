# imagemin-zopfli [![Build Status](https://travis-ci.org/kevva/imagemin-zopfli.svg?branch=master)](https://travis-ci.org/kevva/imagemin-zopfli)

> zopfli image-min plugin

## Install

```bash
$ npm install --save imagemin-zopfli
```

## Usage

```js
var Imagemin = require('image-min');
var zopfli = require('imagemin-zopfli');

var imagemin = new Imagemin()
    .src('foo.png')
    .dest('foo-optimized.png')
    .use(zopfli({ more: true, '8bit': true }));

imagemin.optimize();
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

MIT © [Kevin Mårtensson](https://github.com/kevva)
