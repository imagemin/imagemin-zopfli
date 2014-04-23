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

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License) © [Kevin Mårtensson](https://github.com/kevva)
