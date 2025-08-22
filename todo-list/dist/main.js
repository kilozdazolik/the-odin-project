/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controllers/TaskController.js":
/*!*******************************************!*\
  !*** ./src/controllers/TaskController.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   taskController: () => (/* binding */ taskController)\n/* harmony export */ });\n/* harmony import */ var _models_task_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/task.js */ \"./src/models/task.js\");\n\r\n\r\nclass TaskController {\r\n  constructor() {\r\n    this.tasks = [];\r\n    this.Id = 0;\r\n  }\r\n\r\n  addTask(title, description, priority, dueDate) {\r\n    const newTask = new _models_task_js__WEBPACK_IMPORTED_MODULE_0__.Task(this.Id++, title, description, priority, dueDate);\r\n    this.tasks.push(newTask);\r\n    console.log(\"task added\");\r\n  }\r\n\r\n  //Console help\r\n  viewTasks() {\r\n    console.log(this.tasks);\r\n  }\r\n\r\n  //TODO: Delete task\r\n  deleteTask() {\r\n    const id = Number(prompt(\"give me id\"));\r\n    this.tasks = this.tasks.filter((item) => item.id !== id);\r\n    console.log(`Task with ID ${id} deleted`);\r\n  }\r\n  //TODO: Update task\r\n  updateTask(newTitle, newDescription, newPrioirty, newDueDate) {}\r\n}\r\n\r\nconst taskController = new TaskController();\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29udHJvbGxlcnMvVGFza0NvbnRyb2xsZXIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixpREFBSTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxJQUFJO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jb250cm9sbGVycy9UYXNrQ29udHJvbGxlci5qcz9kMzgzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi4vbW9kZWxzL3Rhc2suanNcIjtcclxuXHJcbmNsYXNzIFRhc2tDb250cm9sbGVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMudGFza3MgPSBbXTtcclxuICAgIHRoaXMuSWQgPSAwO1xyXG4gIH1cclxuXHJcbiAgYWRkVGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIHByaW9yaXR5LCBkdWVEYXRlKSB7XHJcbiAgICBjb25zdCBuZXdUYXNrID0gbmV3IFRhc2sodGhpcy5JZCsrLCB0aXRsZSwgZGVzY3JpcHRpb24sIHByaW9yaXR5LCBkdWVEYXRlKTtcclxuICAgIHRoaXMudGFza3MucHVzaChuZXdUYXNrKTtcclxuICAgIGNvbnNvbGUubG9nKFwidGFzayBhZGRlZFwiKTtcclxuICB9XHJcblxyXG4gIC8vQ29uc29sZSBoZWxwXHJcbiAgdmlld1Rhc2tzKCkge1xyXG4gICAgY29uc29sZS5sb2codGhpcy50YXNrcyk7XHJcbiAgfVxyXG5cclxuICAvL1RPRE86IERlbGV0ZSB0YXNrXHJcbiAgZGVsZXRlVGFzaygpIHtcclxuICAgIGNvbnN0IGlkID0gTnVtYmVyKHByb21wdChcImdpdmUgbWUgaWRcIikpO1xyXG4gICAgdGhpcy50YXNrcyA9IHRoaXMudGFza3MuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmlkICE9PSBpZCk7XHJcbiAgICBjb25zb2xlLmxvZyhgVGFzayB3aXRoIElEICR7aWR9IGRlbGV0ZWRgKTtcclxuICB9XHJcbiAgLy9UT0RPOiBVcGRhdGUgdGFza1xyXG4gIHVwZGF0ZVRhc2sobmV3VGl0bGUsIG5ld0Rlc2NyaXB0aW9uLCBuZXdQcmlvaXJ0eSwgbmV3RHVlRGF0ZSkge31cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHRhc2tDb250cm9sbGVyID0gbmV3IFRhc2tDb250cm9sbGVyKCk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/controllers/TaskController.js\n");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _controllers_TaskController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controllers/TaskController.js */ \"./src/controllers/TaskController.js\");\n\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7QUFBaUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanM/YjYzNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0YXNrQ29udHJvbGxlciB9IGZyb20gXCIuL2NvbnRyb2xsZXJzL1Rhc2tDb250cm9sbGVyLmpzXCI7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/models/task.js":
/*!****************************!*\
  !*** ./src/models/task.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Task: () => (/* binding */ Task)\n/* harmony export */ });\nclass Task {\r\n  constructor(id, title, description, note, priority, dueDate) {\r\n    this.id = id;\r\n    this.title = title;\r\n    this.description = description;\r\n    this.priority = priority;\r\n    this.dueDate = dueDate;\r\n  }\r\n}\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbW9kZWxzL3Rhc2suanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2RlbHMvdGFzay5qcz9mMWE0Il0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBUYXNrIHtcclxuICBjb25zdHJ1Y3RvcihpZCwgdGl0bGUsIGRlc2NyaXB0aW9uLCBub3RlLCBwcmlvcml0eSwgZHVlRGF0ZSkge1xyXG4gICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xyXG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xyXG4gICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/models/task.js\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;