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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   taskController: () => (/* binding */ taskController)\n/* harmony export */ });\n/* harmony import */ var _models_task_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/task.js */ \"./src/models/task.js\");\n\n\nclass TaskController {\n  constructor() {\n    this.tasks = [];\n    this.Id = 0;\n  }\n\n  addTask(title, description, note, priority, dueDate) {\n    const newTask = new _models_task_js__WEBPACK_IMPORTED_MODULE_0__.Task(\n      this.Id++,\n      title,\n      description,\n      note,\n      priority,\n      dueDate\n    );\n    this.tasks.push(newTask);\n    console.log(\"task added\");\n  }\n\n  //Console help\n  viewTasks() {\n    console.log(this.tasks);\n  }\n\n  //TODO: Delete task\n  deleteTask() {\n    const id = Number(prompt(\"give me id baby\"));\n    this.tasks = this.tasks.filter((item) => item.id !== id);\n    console.log(`Task with ID ${id} deleted`);\n  }\n  //TODO: Update task\n}\n\nconst taskController = new TaskController();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29udHJvbGxlcnMvVGFza0NvbnRyb2xsZXIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBeUM7O0FBRXpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3QkFBd0IsaURBQUk7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsSUFBSTtBQUNwQztBQUNBO0FBQ0E7O0FBRU8iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvY29udHJvbGxlcnMvVGFza0NvbnRyb2xsZXIuanM/ZDM4MyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4uL21vZGVscy90YXNrLmpzXCI7XG5cbmNsYXNzIFRhc2tDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy50YXNrcyA9IFtdO1xuICAgIHRoaXMuSWQgPSAwO1xuICB9XG5cbiAgYWRkVGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIG5vdGUsIHByaW9yaXR5LCBkdWVEYXRlKSB7XG4gICAgY29uc3QgbmV3VGFzayA9IG5ldyBUYXNrKFxuICAgICAgdGhpcy5JZCsrLFxuICAgICAgdGl0bGUsXG4gICAgICBkZXNjcmlwdGlvbixcbiAgICAgIG5vdGUsXG4gICAgICBwcmlvcml0eSxcbiAgICAgIGR1ZURhdGVcbiAgICApO1xuICAgIHRoaXMudGFza3MucHVzaChuZXdUYXNrKTtcbiAgICBjb25zb2xlLmxvZyhcInRhc2sgYWRkZWRcIik7XG4gIH1cblxuICAvL0NvbnNvbGUgaGVscFxuICB2aWV3VGFza3MoKSB7XG4gICAgY29uc29sZS5sb2codGhpcy50YXNrcyk7XG4gIH1cblxuICAvL1RPRE86IERlbGV0ZSB0YXNrXG4gIGRlbGV0ZVRhc2soKSB7XG4gICAgY29uc3QgaWQgPSBOdW1iZXIocHJvbXB0KFwiZ2l2ZSBtZSBpZCBiYWJ5XCIpKTtcbiAgICB0aGlzLnRhc2tzID0gdGhpcy50YXNrcy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uaWQgIT09IGlkKTtcbiAgICBjb25zb2xlLmxvZyhgVGFzayB3aXRoIElEICR7aWR9IGRlbGV0ZWRgKTtcbiAgfVxuICAvL1RPRE86IFVwZGF0ZSB0YXNrXG59XG5cbmV4cG9ydCBjb25zdCB0YXNrQ29udHJvbGxlciA9IG5ldyBUYXNrQ29udHJvbGxlcigpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/controllers/TaskController.js\n");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _controllers_TaskController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controllers/TaskController.js */ \"./src/controllers/TaskController.js\");\n\n\n_controllers_TaskController_js__WEBPACK_IMPORTED_MODULE_0__.taskController.addTask(\"bum\", \"\", \"\", \"\", \"\");\n_controllers_TaskController_js__WEBPACK_IMPORTED_MODULE_0__.taskController.addTask(\"bam\", \"\", \"\", \"\", \"\");\n_controllers_TaskController_js__WEBPACK_IMPORTED_MODULE_0__.taskController.addTask(\"bim\", \"\", \"\", \"\", \"\");\n\n_controllers_TaskController_js__WEBPACK_IMPORTED_MODULE_0__.taskController.viewTasks();\n_controllers_TaskController_js__WEBPACK_IMPORTED_MODULE_0__.taskController.deleteTask();\n_controllers_TaskController_js__WEBPACK_IMPORTED_MODULE_0__.taskController.viewTasks();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7QUFBaUU7O0FBRWpFLDBFQUFjO0FBQ2QsMEVBQWM7QUFDZCwwRUFBYzs7QUFFZCwwRUFBYztBQUNkLDBFQUFjO0FBQ2QsMEVBQWMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanM/YjYzNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0YXNrQ29udHJvbGxlciB9IGZyb20gXCIuL2NvbnRyb2xsZXJzL1Rhc2tDb250cm9sbGVyLmpzXCI7XG5cbnRhc2tDb250cm9sbGVyLmFkZFRhc2soXCJidW1cIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIik7XG50YXNrQ29udHJvbGxlci5hZGRUYXNrKFwiYmFtXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIpO1xudGFza0NvbnRyb2xsZXIuYWRkVGFzayhcImJpbVwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiKTtcblxudGFza0NvbnRyb2xsZXIudmlld1Rhc2tzKCk7XG50YXNrQ29udHJvbGxlci5kZWxldGVUYXNrKCk7XG50YXNrQ29udHJvbGxlci52aWV3VGFza3MoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/models/task.js":
/*!****************************!*\
  !*** ./src/models/task.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Task: () => (/* binding */ Task)\n/* harmony export */ });\nclass Task {\n  constructor(id, title, description, note, priority, dueDate) {\n    this.id = id;\n    this.title = title;\n    this.description = description;\n    this.note = note;\n    this.priority = priority;\n    this.dueDate = dueDate;\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbW9kZWxzL3Rhc2suanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZGVscy90YXNrLmpzP2YxYTQiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFRhc2sge1xuICBjb25zdHJ1Y3RvcihpZCwgdGl0bGUsIGRlc2NyaXB0aW9uLCBub3RlLCBwcmlvcml0eSwgZHVlRGF0ZSkge1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIHRoaXMubm90ZSA9IG5vdGU7XG4gICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/models/task.js\n");

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