(function() {
var exports = {};
exports.id = 42;
exports.ids = [42];
exports.modules = {

/***/ 626:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hooks_useRequest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3511);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6731);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);



 // @ts-ignore

const showTicket = ({
  ticket
}) => {
  const {
    fetch,
    errors
  } = (0,_hooks_useRequest__WEBPACK_IMPORTED_MODULE_1__/* .default */ .Z)({
    url: `/api/orders`,
    method: `post`,
    body: {
      ticketId: ticket.id
    },
    onSuccess: order => next_router__WEBPACK_IMPORTED_MODULE_2___default().push(`/orders/[orderId]`, `/orders/${order.id}`)
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
      children: ticket.title
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h4", {
      children: ["Price: ", ticket.price]
    }), errors, /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
      className: "btn btn-primary",
      onClick: () => fetch(),
      children: "Purchase"
    })]
  });
}; // @ts-ignore


showTicket.getInitialProps = async (context, client) => {
  const {
    ticketId
  } = context.query;
  const {
    data
  } = await client.get(`/api/tickets/${ticketId}`);
  return {
    ticket: data
  };
};

/* harmony default export */ __webpack_exports__["default"] = (showTicket);

/***/ }),

/***/ 2376:
/***/ (function(module) {

"use strict";
module.exports = require("axios");;

/***/ }),

/***/ 6731:
/***/ (function(module) {

"use strict";
module.exports = require("next/router");;

/***/ }),

/***/ 9297:
/***/ (function(module) {

"use strict";
module.exports = require("react");;

/***/ }),

/***/ 5282:
/***/ (function(module) {

"use strict";
module.exports = require("react/jsx-runtime");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = __webpack_require__.X(0, [511], function() { return __webpack_exec__(626); });
module.exports = __webpack_exports__;

})();