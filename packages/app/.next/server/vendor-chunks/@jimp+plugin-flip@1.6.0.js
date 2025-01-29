"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@jimp+plugin-flip@1.6.0";
exports.ids = ["vendor-chunks/@jimp+plugin-flip@1.6.0"];
exports.modules = {

/***/ "(ssr)/../../node_modules/.pnpm/@jimp+plugin-flip@1.6.0/node_modules/@jimp/plugin-flip/dist/commonjs/index.js":
/*!**************************************************************************************************************!*\
  !*** ../../node_modules/.pnpm/@jimp+plugin-flip@1.6.0/node_modules/@jimp/plugin-flip/dist/commonjs/index.js ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.methods = void 0;\nconst zod_1 = __webpack_require__(/*! zod */ \"(ssr)/../../node_modules/.pnpm/zod@3.24.1/node_modules/zod/lib/index.js\");\nconst FlipOptionsSchema = zod_1.z.object({\n    /** if true the image will be flipped horizontally */\n    horizontal: zod_1.z.boolean().optional(),\n    /** if true the image will be flipped vertically */\n    vertical: zod_1.z.boolean().optional(),\n});\nexports.methods = {\n    /**\n     * Flip the image.\n     * @param horizontal a Boolean, if true the image will be flipped horizontally\n     * @param vertical a Boolean, if true the image will be flipped vertically\n     * @example\n     * ```ts\n     * import { Jimp } from \"jimp\";\n     *\n     * const image = await Jimp.read(\"test/image.png\");\n     *\n     * image.flip(true, false);\n     * ```\n     */\n    flip(image, options) {\n        const { horizontal, vertical } = FlipOptionsSchema.parse(options);\n        const bitmap = Buffer.alloc(image.bitmap.data.length);\n        image.scan((x, y, idx) => {\n            const _x = horizontal ? image.bitmap.width - 1 - x : x;\n            const _y = vertical ? image.bitmap.height - 1 - y : y;\n            const _idx = (image.bitmap.width * _y + _x) << 2;\n            const data = image.bitmap.data.readUInt32BE(idx);\n            bitmap.writeUInt32BE(data, _idx);\n        });\n        image.bitmap.data = Buffer.from(bitmap);\n        return image;\n    },\n};\n//# sourceMappingURL=index.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BqaW1wK3BsdWdpbi1mbGlwQDEuNi4wL25vZGVfbW9kdWxlcy9AamltcC9wbHVnaW4tZmxpcC9kaXN0L2NvbW1vbmpzL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGVBQWU7QUFDZixjQUFjLG1CQUFPLENBQUMsb0ZBQUs7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsdUJBQXVCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSIsInNvdXJjZXMiOlsiL1VzZXJzL21pa2V3ZXN0aGFkL0Rlc2t0b3AvUmVwb3Mvc3BvcmFkaWMtbGFicy10aWxlLWV4dHJ1ZGVyL25vZGVfbW9kdWxlcy8ucG5wbS9AamltcCtwbHVnaW4tZmxpcEAxLjYuMC9ub2RlX21vZHVsZXMvQGppbXAvcGx1Z2luLWZsaXAvZGlzdC9jb21tb25qcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMubWV0aG9kcyA9IHZvaWQgMDtcbmNvbnN0IHpvZF8xID0gcmVxdWlyZShcInpvZFwiKTtcbmNvbnN0IEZsaXBPcHRpb25zU2NoZW1hID0gem9kXzEuei5vYmplY3Qoe1xuICAgIC8qKiBpZiB0cnVlIHRoZSBpbWFnZSB3aWxsIGJlIGZsaXBwZWQgaG9yaXpvbnRhbGx5ICovXG4gICAgaG9yaXpvbnRhbDogem9kXzEuei5ib29sZWFuKCkub3B0aW9uYWwoKSxcbiAgICAvKiogaWYgdHJ1ZSB0aGUgaW1hZ2Ugd2lsbCBiZSBmbGlwcGVkIHZlcnRpY2FsbHkgKi9cbiAgICB2ZXJ0aWNhbDogem9kXzEuei5ib29sZWFuKCkub3B0aW9uYWwoKSxcbn0pO1xuZXhwb3J0cy5tZXRob2RzID0ge1xuICAgIC8qKlxuICAgICAqIEZsaXAgdGhlIGltYWdlLlxuICAgICAqIEBwYXJhbSBob3Jpem9udGFsIGEgQm9vbGVhbiwgaWYgdHJ1ZSB0aGUgaW1hZ2Ugd2lsbCBiZSBmbGlwcGVkIGhvcml6b250YWxseVxuICAgICAqIEBwYXJhbSB2ZXJ0aWNhbCBhIEJvb2xlYW4sIGlmIHRydWUgdGhlIGltYWdlIHdpbGwgYmUgZmxpcHBlZCB2ZXJ0aWNhbGx5XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBgYGB0c1xuICAgICAqIGltcG9ydCB7IEppbXAgfSBmcm9tIFwiamltcFwiO1xuICAgICAqXG4gICAgICogY29uc3QgaW1hZ2UgPSBhd2FpdCBKaW1wLnJlYWQoXCJ0ZXN0L2ltYWdlLnBuZ1wiKTtcbiAgICAgKlxuICAgICAqIGltYWdlLmZsaXAodHJ1ZSwgZmFsc2UpO1xuICAgICAqIGBgYFxuICAgICAqL1xuICAgIGZsaXAoaW1hZ2UsIG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgeyBob3Jpem9udGFsLCB2ZXJ0aWNhbCB9ID0gRmxpcE9wdGlvbnNTY2hlbWEucGFyc2Uob3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IGJpdG1hcCA9IEJ1ZmZlci5hbGxvYyhpbWFnZS5iaXRtYXAuZGF0YS5sZW5ndGgpO1xuICAgICAgICBpbWFnZS5zY2FuKCh4LCB5LCBpZHgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IF94ID0gaG9yaXpvbnRhbCA/IGltYWdlLmJpdG1hcC53aWR0aCAtIDEgLSB4IDogeDtcbiAgICAgICAgICAgIGNvbnN0IF95ID0gdmVydGljYWwgPyBpbWFnZS5iaXRtYXAuaGVpZ2h0IC0gMSAtIHkgOiB5O1xuICAgICAgICAgICAgY29uc3QgX2lkeCA9IChpbWFnZS5iaXRtYXAud2lkdGggKiBfeSArIF94KSA8PCAyO1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGltYWdlLmJpdG1hcC5kYXRhLnJlYWRVSW50MzJCRShpZHgpO1xuICAgICAgICAgICAgYml0bWFwLndyaXRlVUludDMyQkUoZGF0YSwgX2lkeCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpbWFnZS5iaXRtYXAuZGF0YSA9IEJ1ZmZlci5mcm9tKGJpdG1hcCk7XG4gICAgICAgIHJldHVybiBpbWFnZTtcbiAgICB9LFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/../../node_modules/.pnpm/@jimp+plugin-flip@1.6.0/node_modules/@jimp/plugin-flip/dist/commonjs/index.js\n");

/***/ })

};
;