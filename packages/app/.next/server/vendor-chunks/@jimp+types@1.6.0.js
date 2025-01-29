"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@jimp+types@1.6.0";
exports.ids = ["vendor-chunks/@jimp+types@1.6.0"];
exports.modules = {

/***/ "(ssr)/../../node_modules/.pnpm/@jimp+types@1.6.0/node_modules/@jimp/types/dist/commonjs/index.js":
/*!**************************************************************************************************!*\
  !*** ../../node_modules/.pnpm/@jimp+types@1.6.0/node_modules/@jimp/types/dist/commonjs/index.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.JimpClassSchema = exports.Edge = void 0;\nconst zod_1 = __webpack_require__(/*! zod */ \"(ssr)/../../node_modules/.pnpm/zod@3.24.1/node_modules/zod/lib/index.js\");\nvar Edge;\n(function (Edge) {\n    Edge[Edge[\"EXTEND\"] = 1] = \"EXTEND\";\n    Edge[Edge[\"WRAP\"] = 2] = \"WRAP\";\n    Edge[Edge[\"CROP\"] = 3] = \"CROP\";\n})(Edge || (exports.Edge = Edge = {}));\nexports.JimpClassSchema = zod_1.z.object({\n    bitmap: zod_1.z.object({\n        data: zod_1.z.union([zod_1.z.instanceof(Buffer), zod_1.z.instanceof(Uint8Array)]),\n        width: zod_1.z.number(),\n        height: zod_1.z.number(),\n    }),\n});\n//# sourceMappingURL=index.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BqaW1wK3R5cGVzQDEuNi4wL25vZGVfbW9kdWxlcy9AamltcC90eXBlcy9kaXN0L2NvbW1vbmpzL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELHVCQUF1QixHQUFHLFlBQVk7QUFDdEMsY0FBYyxtQkFBTyxDQUFDLG9GQUFLO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLFdBQVcsWUFBWSxZQUFZO0FBQ3BDLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDO0FBQ0QiLCJzb3VyY2VzIjpbIi9Vc2Vycy9taWtld2VzdGhhZC9EZXNrdG9wL1JlcG9zL3Nwb3JhZGljLWxhYnMtdGlsZS1leHRydWRlci9ub2RlX21vZHVsZXMvLnBucG0vQGppbXArdHlwZXNAMS42LjAvbm9kZV9tb2R1bGVzL0BqaW1wL3R5cGVzL2Rpc3QvY29tbW9uanMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkppbXBDbGFzc1NjaGVtYSA9IGV4cG9ydHMuRWRnZSA9IHZvaWQgMDtcbmNvbnN0IHpvZF8xID0gcmVxdWlyZShcInpvZFwiKTtcbnZhciBFZGdlO1xuKGZ1bmN0aW9uIChFZGdlKSB7XG4gICAgRWRnZVtFZGdlW1wiRVhURU5EXCJdID0gMV0gPSBcIkVYVEVORFwiO1xuICAgIEVkZ2VbRWRnZVtcIldSQVBcIl0gPSAyXSA9IFwiV1JBUFwiO1xuICAgIEVkZ2VbRWRnZVtcIkNST1BcIl0gPSAzXSA9IFwiQ1JPUFwiO1xufSkoRWRnZSB8fCAoZXhwb3J0cy5FZGdlID0gRWRnZSA9IHt9KSk7XG5leHBvcnRzLkppbXBDbGFzc1NjaGVtYSA9IHpvZF8xLnoub2JqZWN0KHtcbiAgICBiaXRtYXA6IHpvZF8xLnoub2JqZWN0KHtcbiAgICAgICAgZGF0YTogem9kXzEuei51bmlvbihbem9kXzEuei5pbnN0YW5jZW9mKEJ1ZmZlciksIHpvZF8xLnouaW5zdGFuY2VvZihVaW50OEFycmF5KV0pLFxuICAgICAgICB3aWR0aDogem9kXzEuei5udW1iZXIoKSxcbiAgICAgICAgaGVpZ2h0OiB6b2RfMS56Lm51bWJlcigpLFxuICAgIH0pLFxufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/../../node_modules/.pnpm/@jimp+types@1.6.0/node_modules/@jimp/types/dist/commonjs/index.js\n");

/***/ })

};
;