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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Home)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/../../node_modules/.pnpm/next@15.1.6_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _page_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./page.module.css */ \"(app-pages-browser)/./src/app/page.module.css\");\n/* harmony import */ var _page_module_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_page_module_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var tile_extruder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tile-extruder */ \"(app-pages-browser)/../cli/bin/index.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \n\n\nfunction Home() {\n    const handleFileUpload = async (event)=>{\n        var _event_target_files;\n        const file = (_event_target_files = event.target.files) === null || _event_target_files === void 0 ? void 0 : _event_target_files[0];\n        if (!file) return;\n        // Read the file as ArrayBuffer\n        const buffer = await file.arrayBuffer();\n        // Process the image using tile-extruder\n        (0,tile_extruder__WEBPACK_IMPORTED_MODULE_2__.extrudeBufferTilesetToJimp)(16, 16, buffer, {\n            margin: 0,\n            spacing: 0,\n            color: 0xffffff00,\n            extrusion: 10\n        }).then(async (jimpImage)=>{\n            const canvas = document.getElementById(\"canvas\");\n            if (!canvas) return;\n            const ctx = canvas.getContext(\"2d\");\n            if (!ctx) return;\n            const imageData = new ImageData(new Uint8ClampedArray(jimpImage.bitmap.data), jimpImage.bitmap.width, jimpImage.bitmap.height);\n            canvas.width = jimpImage.bitmap.width;\n            canvas.height = jimpImage.bitmap.height;\n            ctx.putImageData(imageData, 0, 0);\n        }).catch((err)=>{\n            console.error(err);\n        });\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n        className: (_page_module_css__WEBPACK_IMPORTED_MODULE_1___default().main),\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                children: \"Tile Extruder\"\n            }, void 0, false, {\n                fileName: \"/Users/mikewesthad/Desktop/Repos/sporadic-labs-tile-extruder/packages/app/src/app/page.tsx\",\n                lineNumber: 49,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                type: \"file\",\n                accept: \"image/*\",\n                onChange: handleFileUpload,\n                className: (_page_module_css__WEBPACK_IMPORTED_MODULE_1___default().fileInput)\n            }, void 0, false, {\n                fileName: \"/Users/mikewesthad/Desktop/Repos/sporadic-labs-tile-extruder/packages/app/src/app/page.tsx\",\n                lineNumber: 50,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"canvas\", {\n                id: \"canvas\",\n                width: 100,\n                height: 100\n            }, void 0, false, {\n                fileName: \"/Users/mikewesthad/Desktop/Repos/sporadic-labs-tile-extruder/packages/app/src/app/page.tsx\",\n                lineNumber: 56,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/mikewesthad/Desktop/Repos/sporadic-labs-tile-extruder/packages/app/src/app/page.tsx\",\n        lineNumber: 48,\n        columnNumber: 5\n    }, this);\n}\n_c = Home;\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvcGFnZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBR3VDO0FBRW9CO0FBRzVDLFNBQVNFO0lBQ3RCLE1BQU1DLG1CQUFtQixPQUFPQztZQUNqQkE7UUFBYixNQUFNQyxRQUFPRCxzQkFBQUEsTUFBTUUsTUFBTSxDQUFDQyxLQUFLLGNBQWxCSCwwQ0FBQUEsbUJBQW9CLENBQUMsRUFBRTtRQUNwQyxJQUFJLENBQUNDLE1BQU07UUFFWCwrQkFBK0I7UUFDL0IsTUFBTUcsU0FBUyxNQUFNSCxLQUFLSSxXQUFXO1FBRXJDLHdDQUF3QztRQUN4Q1IseUVBQTBCQSxDQUFDLElBQUksSUFBSU8sUUFBUTtZQUN6Q0UsUUFBUTtZQUNSQyxTQUFTO1lBQ1RDLE9BQU87WUFDUEMsV0FBVztRQUNiLEdBQ0dDLElBQUksQ0FBQyxPQUFPQztZQUNYLE1BQU1DLFNBQVNDLFNBQVNDLGNBQWMsQ0FBQztZQUN2QyxJQUFJLENBQUNGLFFBQVE7WUFFYixNQUFNRyxNQUFNSCxPQUFPSSxVQUFVLENBQUM7WUFDOUIsSUFBSSxDQUFDRCxLQUFLO1lBRVYsTUFBTUUsWUFBWSxJQUFJQyxVQUNwQixJQUFJQyxrQkFBa0JSLFVBQVVTLE1BQU0sQ0FBQ0MsSUFBSSxHQUMzQ1YsVUFBVVMsTUFBTSxDQUFDRSxLQUFLLEVBQ3RCWCxVQUFVUyxNQUFNLENBQUNHLE1BQU07WUFHekJYLE9BQU9VLEtBQUssR0FBR1gsVUFBVVMsTUFBTSxDQUFDRSxLQUFLO1lBQ3JDVixPQUFPVyxNQUFNLEdBQUdaLFVBQVVTLE1BQU0sQ0FBQ0csTUFBTTtZQUV2Q1IsSUFBSVMsWUFBWSxDQUFDUCxXQUFXLEdBQUc7UUFDakMsR0FDQ1EsS0FBSyxDQUFDLENBQUNDO1lBQ05DLFFBQVFDLEtBQUssQ0FBQ0Y7UUFDaEI7SUFDSjtJQUVBLHFCQUNFLDhEQUFDRztRQUFLQyxXQUFXbEMsOERBQVc7OzBCQUMxQiw4REFBQ21DOzBCQUFHOzs7Ozs7MEJBQ0osOERBQUNDO2dCQUNDQyxNQUFLO2dCQUNMQyxRQUFPO2dCQUNQQyxVQUFVcEM7Z0JBQ1YrQixXQUFXbEMsbUVBQWdCOzs7Ozs7MEJBRTdCLDhEQUFDZ0I7Z0JBQU95QixJQUFHO2dCQUFTZixPQUFPO2dCQUFLQyxRQUFROzs7Ozs7Ozs7Ozs7QUFHOUM7S0FsRHdCekIiLCJzb3VyY2VzIjpbIi9Vc2Vycy9taWtld2VzdGhhZC9EZXNrdG9wL1JlcG9zL3Nwb3JhZGljLWxhYnMtdGlsZS1leHRydWRlci9wYWNrYWdlcy9hcHAvc3JjL2FwcC9wYWdlLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcblxuaW1wb3J0IEltYWdlIGZyb20gXCJuZXh0L2ltYWdlXCI7XG5pbXBvcnQgc3R5bGVzIGZyb20gXCIuL3BhZ2UubW9kdWxlLmNzc1wiO1xuXG5pbXBvcnQgeyBleHRydWRlQnVmZmVyVGlsZXNldFRvSmltcCB9IGZyb20gXCJ0aWxlLWV4dHJ1ZGVyXCI7XG5pbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSG9tZSgpIHtcbiAgY29uc3QgaGFuZGxlRmlsZVVwbG9hZCA9IGFzeW5jIChldmVudDogUmVhY3QuQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHtcbiAgICBjb25zdCBmaWxlID0gZXZlbnQudGFyZ2V0LmZpbGVzPy5bMF07XG4gICAgaWYgKCFmaWxlKSByZXR1cm47XG5cbiAgICAvLyBSZWFkIHRoZSBmaWxlIGFzIEFycmF5QnVmZmVyXG4gICAgY29uc3QgYnVmZmVyID0gYXdhaXQgZmlsZS5hcnJheUJ1ZmZlcigpO1xuXG4gICAgLy8gUHJvY2VzcyB0aGUgaW1hZ2UgdXNpbmcgdGlsZS1leHRydWRlclxuICAgIGV4dHJ1ZGVCdWZmZXJUaWxlc2V0VG9KaW1wKDE2LCAxNiwgYnVmZmVyLCB7XG4gICAgICBtYXJnaW46IDAsXG4gICAgICBzcGFjaW5nOiAwLFxuICAgICAgY29sb3I6IDB4ZmZmZmZmMDAsXG4gICAgICBleHRydXNpb246IDEwLFxuICAgIH0pXG4gICAgICAudGhlbihhc3luYyAoamltcEltYWdlKSA9PiB7XG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAgICAgICBpZiAoIWNhbnZhcykgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgIGlmICghY3R4KSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgaW1hZ2VEYXRhID0gbmV3IEltYWdlRGF0YShcbiAgICAgICAgICBuZXcgVWludDhDbGFtcGVkQXJyYXkoamltcEltYWdlLmJpdG1hcC5kYXRhKSxcbiAgICAgICAgICBqaW1wSW1hZ2UuYml0bWFwLndpZHRoLFxuICAgICAgICAgIGppbXBJbWFnZS5iaXRtYXAuaGVpZ2h0XG4gICAgICAgICk7XG5cbiAgICAgICAgY2FudmFzLndpZHRoID0gamltcEltYWdlLmJpdG1hcC53aWR0aDtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IGppbXBJbWFnZS5iaXRtYXAuaGVpZ2h0O1xuXG4gICAgICAgIGN0eC5wdXRJbWFnZURhdGEoaW1hZ2VEYXRhLCAwLCAwKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxtYWluIGNsYXNzTmFtZT17c3R5bGVzLm1haW59PlxuICAgICAgPGgxPlRpbGUgRXh0cnVkZXI8L2gxPlxuICAgICAgPGlucHV0XG4gICAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgICAgYWNjZXB0PVwiaW1hZ2UvKlwiXG4gICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVGaWxlVXBsb2FkfVxuICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5maWxlSW5wdXR9XG4gICAgICAvPlxuICAgICAgPGNhbnZhcyBpZD1cImNhbnZhc1wiIHdpZHRoPXsxMDB9IGhlaWdodD17MTAwfT48L2NhbnZhcz5cbiAgICA8L21haW4+XG4gICk7XG59XG4iXSwibmFtZXMiOlsic3R5bGVzIiwiZXh0cnVkZUJ1ZmZlclRpbGVzZXRUb0ppbXAiLCJIb21lIiwiaGFuZGxlRmlsZVVwbG9hZCIsImV2ZW50IiwiZmlsZSIsInRhcmdldCIsImZpbGVzIiwiYnVmZmVyIiwiYXJyYXlCdWZmZXIiLCJtYXJnaW4iLCJzcGFjaW5nIiwiY29sb3IiLCJleHRydXNpb24iLCJ0aGVuIiwiamltcEltYWdlIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImN0eCIsImdldENvbnRleHQiLCJpbWFnZURhdGEiLCJJbWFnZURhdGEiLCJVaW50OENsYW1wZWRBcnJheSIsImJpdG1hcCIsImRhdGEiLCJ3aWR0aCIsImhlaWdodCIsInB1dEltYWdlRGF0YSIsImNhdGNoIiwiZXJyIiwiY29uc29sZSIsImVycm9yIiwibWFpbiIsImNsYXNzTmFtZSIsImgxIiwiaW5wdXQiLCJ0eXBlIiwiYWNjZXB0Iiwib25DaGFuZ2UiLCJmaWxlSW5wdXQiLCJpZCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/page.tsx\n"));

/***/ })

});