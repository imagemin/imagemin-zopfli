# imagemin-zopfli [![Build Status](https://travis-ci.org/imagemin/imagemin-zopfli.svg?branch=master)](https://travis-ci.org/imagemin/imagemin-zopfli) [![Build status](https://ci.appveyor.com/api/projects/status/au86jlv1nyfcv40h?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/imagemin-zopfli)

> [Zopfli](https://en.wikipedia.org/wiki/Zopfli) imagemin plugin


## Install

```
$ npm install --save imagemin-zopfli
```


## Usage

```js
const imagemin = require('imagemin');
const imageminZopfli = require('imagemin-zopfli');

imagemin(['images/*.png'], 'build/images', {
    use: [
        imageminZopfli({more: true})
    ]
}).then(() => {
    console.log('Images optimized');
});
```


## API

### imageminZopfli([options])(buffer)

#### options

Type: `object`

##### 8bit

Type: `boolean`<br>
Default: `false`

Convert 16-bit per channel image to 8-bit per channel.

##### transparent

Type: `boolean`<br>
Default: `false`

Allow altering hidden colors of fully transparent pixels.

##### iterations

Type: `integer`<br>
Default: `15`

Number of iterations for images smaller than 200 KiB.

##### iterationsLarge

Type: `integer`<br>
Default: `5`

Number of iterations for images larger than 200 KiB.

##### more

Type: `boolean`<br>
Default: `false`

Compress more using more iterations (depending on file size).

#### buffer

Type: `buffer`

Buffer to optimize.


## License

MIT © [imagemin](https://github.com/imagemin)
