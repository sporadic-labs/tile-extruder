"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@jimp+plugin-dither@1.6.0";
exports.ids = ["vendor-chunks/@jimp+plugin-dither@1.6.0"];
exports.modules = {

/***/ "(ssr)/../../node_modules/.pnpm/@jimp+plugin-dither@1.6.0/node_modules/@jimp/plugin-dither/dist/commonjs/index.js":
/*!******************************************************************************************************************!*\
  !*** ../../node_modules/.pnpm/@jimp+plugin-dither@1.6.0/node_modules/@jimp/plugin-dither/dist/commonjs/index.js ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.methods = void 0;\nexports.methods = {\n    /**\n     * Apply a ordered dithering effect.\n     * @example\n     * ```ts\n     * import { Jimp } from \"jimp\";\n     *\n     * const image = await Jimp.read(\"test/image.png\");\n     *\n     * image.dither();\n     * ```\n     */\n    dither(image) {\n        const rgb565Matrix = [\n            1, 9, 3, 11, 13, 5, 15, 7, 4, 12, 2, 10, 16, 8, 14, 6,\n        ];\n        image.scan((x, y, idx) => {\n            const thresholdId = ((y & 3) << 2) + (x % 4);\n            const dither = rgb565Matrix[thresholdId];\n            image.bitmap.data[idx] = Math.min(image.bitmap.data[idx] + dither, 0xff);\n            image.bitmap.data[idx + 1] = Math.min(image.bitmap.data[idx + 1] + dither, 0xff);\n            image.bitmap.data[idx + 2] = Math.min(image.bitmap.data[idx + 2] + dither, 0xff);\n        });\n        return image;\n    },\n};\n//# sourceMappingURL=index.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BqaW1wK3BsdWdpbi1kaXRoZXJAMS42LjAvbm9kZV9tb2R1bGVzL0BqaW1wL3BsdWdpbi1kaXRoZXIvZGlzdC9jb21tb25qcy9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxlQUFlO0FBQ2YsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQSIsInNvdXJjZXMiOlsiL1VzZXJzL21pa2V3ZXN0aGFkL0Rlc2t0b3AvUmVwb3Mvc3BvcmFkaWMtbGFicy10aWxlLWV4dHJ1ZGVyL25vZGVfbW9kdWxlcy8ucG5wbS9AamltcCtwbHVnaW4tZGl0aGVyQDEuNi4wL25vZGVfbW9kdWxlcy9AamltcC9wbHVnaW4tZGl0aGVyL2Rpc3QvY29tbW9uanMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm1ldGhvZHMgPSB2b2lkIDA7XG5leHBvcnRzLm1ldGhvZHMgPSB7XG4gICAgLyoqXG4gICAgICogQXBwbHkgYSBvcmRlcmVkIGRpdGhlcmluZyBlZmZlY3QuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBgYGB0c1xuICAgICAqIGltcG9ydCB7IEppbXAgfSBmcm9tIFwiamltcFwiO1xuICAgICAqXG4gICAgICogY29uc3QgaW1hZ2UgPSBhd2FpdCBKaW1wLnJlYWQoXCJ0ZXN0L2ltYWdlLnBuZ1wiKTtcbiAgICAgKlxuICAgICAqIGltYWdlLmRpdGhlcigpO1xuICAgICAqIGBgYFxuICAgICAqL1xuICAgIGRpdGhlcihpbWFnZSkge1xuICAgICAgICBjb25zdCByZ2I1NjVNYXRyaXggPSBbXG4gICAgICAgICAgICAxLCA5LCAzLCAxMSwgMTMsIDUsIDE1LCA3LCA0LCAxMiwgMiwgMTAsIDE2LCA4LCAxNCwgNixcbiAgICAgICAgXTtcbiAgICAgICAgaW1hZ2Uuc2NhbigoeCwgeSwgaWR4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0aHJlc2hvbGRJZCA9ICgoeSAmIDMpIDw8IDIpICsgKHggJSA0KTtcbiAgICAgICAgICAgIGNvbnN0IGRpdGhlciA9IHJnYjU2NU1hdHJpeFt0aHJlc2hvbGRJZF07XG4gICAgICAgICAgICBpbWFnZS5iaXRtYXAuZGF0YVtpZHhdID0gTWF0aC5taW4oaW1hZ2UuYml0bWFwLmRhdGFbaWR4XSArIGRpdGhlciwgMHhmZik7XG4gICAgICAgICAgICBpbWFnZS5iaXRtYXAuZGF0YVtpZHggKyAxXSA9IE1hdGgubWluKGltYWdlLmJpdG1hcC5kYXRhW2lkeCArIDFdICsgZGl0aGVyLCAweGZmKTtcbiAgICAgICAgICAgIGltYWdlLmJpdG1hcC5kYXRhW2lkeCArIDJdID0gTWF0aC5taW4oaW1hZ2UuYml0bWFwLmRhdGFbaWR4ICsgMl0gKyBkaXRoZXIsIDB4ZmYpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGltYWdlO1xuICAgIH0sXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/../../node_modules/.pnpm/@jimp+plugin-dither@1.6.0/node_modules/@jimp/plugin-dither/dist/commonjs/index.js\n");

/***/ })

};
;