"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./src/app/page.tsx":
/*!**************************!*\
  !*** ./src/app/page.tsx ***!
  \**************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Home)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/../../node_modules/.pnpm/next@15.1.6_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _page_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./page.module.css */ \"(app-pages-browser)/./src/app/page.module.css\");\n/* harmony import */ var _page_module_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_page_module_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var tile_extruder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tile-extruder */ \"(app-pages-browser)/../cli/bin/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"(app-pages-browser)/../../node_modules/.pnpm/next@15.1.6_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\nfunction Home() {\n    _s();\n    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)({\n        \"Home.useEffect\": ()=>{\n            (0,tile_extruder__WEBPACK_IMPORTED_MODULE_2__.extrudeTilesetToJimp)(16, 16, \"buch-tileset.png\", {\n                margin: 0,\n                spacing: 0,\n                color: 0xffffff00,\n                extrusion: 1\n            }).then({\n                \"Home.useEffect\": async (jimpImage)=>{\n                    // Get canvas element\n                    const canvas = document.getElementById(\"output-canvas\");\n                    if (!canvas) return;\n                    // Get canvas context\n                    const ctx = canvas.getContext(\"2d\");\n                    console.log(jimpImage.bitmap.data);\n                    if (!ctx) return;\n                    const imageData = new ImageData(new Uint8ClampedArray(jimpImage.bitmap.data), jimpImage.bitmap.width, jimpImage.bitmap.height);\n                    console.log(jimpImage.bitmap.data);\n                    ctx.putImageData(imageData, 0, 0);\n                }\n            }[\"Home.useEffect\"]).catch({\n                \"Home.useEffect\": (err)=>{\n                    console.error(err);\n                }\n            }[\"Home.useEffect\"]);\n        }\n    }[\"Home.useEffect\"], []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n        className: (_page_module_css__WEBPACK_IMPORTED_MODULE_1___default().main),\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                children: \"Tile Extruder\"\n            }, void 0, false, {\n                fileName: \"/Users/mikewesthad/Desktop/Repos/sporadic-labs-tile-extruder/packages/app/src/app/page.tsx\",\n                lineNumber: 45,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"canvas\", {\n                id: \"canvas\"\n            }, void 0, false, {\n                fileName: \"/Users/mikewesthad/Desktop/Repos/sporadic-labs-tile-extruder/packages/app/src/app/page.tsx\",\n                lineNumber: 46,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/mikewesthad/Desktop/Repos/sporadic-labs-tile-extruder/packages/app/src/app/page.tsx\",\n        lineNumber: 44,\n        columnNumber: 5\n    }, this);\n}\n_s(Home, \"OD7bBpZva5O2jO+Puf00hKivP7c=\");\n_c = Home;\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvcGFnZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBR3VDO0FBRWM7QUFDbkI7QUFHbkIsU0FBU0c7O0lBQ3RCRCxnREFBU0E7MEJBQUM7WUFDUkQsbUVBQW9CQSxDQUFDLElBQUksSUFBSSxvQkFBb0I7Z0JBQy9DRyxRQUFRO2dCQUNSQyxTQUFTO2dCQUNUQyxPQUFPO2dCQUNQQyxXQUFXO1lBQ2IsR0FDR0MsSUFBSTtrQ0FBQyxPQUFPQztvQkFDWCxxQkFBcUI7b0JBQ3JCLE1BQU1DLFNBQVNDLFNBQVNDLGNBQWMsQ0FBQztvQkFDdkMsSUFBSSxDQUFDRixRQUFRO29CQUViLHFCQUFxQjtvQkFDckIsTUFBTUcsTUFBTUgsT0FBT0ksVUFBVSxDQUFDO29CQUM5QkMsUUFBUUMsR0FBRyxDQUFDUCxVQUFVUSxNQUFNLENBQUNDLElBQUk7b0JBQ2pDLElBQUksQ0FBQ0wsS0FBSztvQkFFVixNQUFNTSxZQUFZLElBQUlDLFVBQ3BCLElBQUlDLGtCQUFrQlosVUFBVVEsTUFBTSxDQUFDQyxJQUFJLEdBQzNDVCxVQUFVUSxNQUFNLENBQUNLLEtBQUssRUFDdEJiLFVBQVVRLE1BQU0sQ0FBQ00sTUFBTTtvQkFHekJSLFFBQVFDLEdBQUcsQ0FBQ1AsVUFBVVEsTUFBTSxDQUFDQyxJQUFJO29CQUVqQ0wsSUFBSVcsWUFBWSxDQUFDTCxXQUFXLEdBQUc7Z0JBQ2pDO2lDQUNDTSxLQUFLO2tDQUFDLENBQUNDO29CQUNOWCxRQUFRWSxLQUFLLENBQUNEO2dCQUNoQjs7UUFDSjt5QkFBRyxFQUFFO0lBRUwscUJBQ0UsOERBQUNFO1FBQUtDLFdBQVc3Qiw4REFBVzs7MEJBQzFCLDhEQUFDOEI7MEJBQUc7Ozs7OzswQkFDSiw4REFBQ3BCO2dCQUFPcUIsSUFBRzs7Ozs7Ozs7Ozs7O0FBR2pCO0dBdkN3QjVCO0tBQUFBIiwic291cmNlcyI6WyIvVXNlcnMvbWlrZXdlc3RoYWQvRGVza3RvcC9SZXBvcy9zcG9yYWRpYy1sYWJzLXRpbGUtZXh0cnVkZXIvcGFja2FnZXMvYXBwL3NyYy9hcHAvcGFnZS50c3giXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCI7XG5cbmltcG9ydCBJbWFnZSBmcm9tIFwibmV4dC9pbWFnZVwiO1xuaW1wb3J0IHN0eWxlcyBmcm9tIFwiLi9wYWdlLm1vZHVsZS5jc3NcIjtcblxuaW1wb3J0IHsgZXh0cnVkZVRpbGVzZXRUb0ppbXAgfSBmcm9tIFwidGlsZS1leHRydWRlclwiO1xuaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgSmltcCBmcm9tIFwiamltcFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIb21lKCkge1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGV4dHJ1ZGVUaWxlc2V0VG9KaW1wKDE2LCAxNiwgXCJidWNoLXRpbGVzZXQucG5nXCIsIHtcbiAgICAgIG1hcmdpbjogMCxcbiAgICAgIHNwYWNpbmc6IDAsXG4gICAgICBjb2xvcjogMHhmZmZmZmYwMCxcbiAgICAgIGV4dHJ1c2lvbjogMSxcbiAgICB9KVxuICAgICAgLnRoZW4oYXN5bmMgKGppbXBJbWFnZSkgPT4ge1xuICAgICAgICAvLyBHZXQgY2FudmFzIGVsZW1lbnRcbiAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvdXRwdXQtY2FudmFzXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAgICAgICBpZiAoIWNhbnZhcykgcmV0dXJuO1xuXG4gICAgICAgIC8vIEdldCBjYW52YXMgY29udGV4dFxuICAgICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhqaW1wSW1hZ2UuYml0bWFwLmRhdGEpO1xuICAgICAgICBpZiAoIWN0eCkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGltYWdlRGF0YSA9IG5ldyBJbWFnZURhdGEoXG4gICAgICAgICAgbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KGppbXBJbWFnZS5iaXRtYXAuZGF0YSksXG4gICAgICAgICAgamltcEltYWdlLmJpdG1hcC53aWR0aCxcbiAgICAgICAgICBqaW1wSW1hZ2UuYml0bWFwLmhlaWdodFxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGppbXBJbWFnZS5iaXRtYXAuZGF0YSk7XG5cbiAgICAgICAgY3R4LnB1dEltYWdlRGF0YShpbWFnZURhdGEsIDAsIDApO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgIH0pO1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8bWFpbiBjbGFzc05hbWU9e3N0eWxlcy5tYWlufT5cbiAgICAgIDxoMT5UaWxlIEV4dHJ1ZGVyPC9oMT5cbiAgICAgIDxjYW52YXMgaWQ9XCJjYW52YXNcIj48L2NhbnZhcz5cbiAgICA8L21haW4+XG4gICk7XG59XG4iXSwibmFtZXMiOlsic3R5bGVzIiwiZXh0cnVkZVRpbGVzZXRUb0ppbXAiLCJ1c2VFZmZlY3QiLCJIb21lIiwibWFyZ2luIiwic3BhY2luZyIsImNvbG9yIiwiZXh0cnVzaW9uIiwidGhlbiIsImppbXBJbWFnZSIsImNhbnZhcyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjdHgiLCJnZXRDb250ZXh0IiwiY29uc29sZSIsImxvZyIsImJpdG1hcCIsImRhdGEiLCJpbWFnZURhdGEiLCJJbWFnZURhdGEiLCJVaW50OENsYW1wZWRBcnJheSIsIndpZHRoIiwiaGVpZ2h0IiwicHV0SW1hZ2VEYXRhIiwiY2F0Y2giLCJlcnIiLCJlcnJvciIsIm1haW4iLCJjbGFzc05hbWUiLCJoMSIsImlkIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/page.tsx\n"));

/***/ })

});