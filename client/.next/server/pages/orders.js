(function() {
var exports = {};
exports.id = 984;
exports.ids = [984];
exports.modules = {

/***/ 1895:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);



// @ts-ignore
const MyOrders = ({
  orders
}) => {
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
    children: orders === null || orders === void 0 ? void 0 : orders.map(order => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
      children: [order.ticket.title, " - ", order.status]
    }, order.id))
  });
}; // @ts-ignore


MyOrders.getInitialProps = async (context, client) => {
  const {
    data
  } = await client.get(`/api/orders`);
  return {
    orders: data
  };
};

/* harmony default export */ __webpack_exports__["default"] = (MyOrders);

/***/ }),

/***/ 5282:
/***/ (function(module) {

"use strict";
module.exports = require("react/jsx-runtime");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__(1895));
module.exports = __webpack_exports__;

})();