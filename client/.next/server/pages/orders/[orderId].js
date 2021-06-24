(function() {
var exports = {};
exports.id = 349;
exports.ids = [349];
exports.modules = {

/***/ 2689:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ _orderId_; }
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
// EXTERNAL MODULE: ./src/hooks/useRequest/index.tsx
var useRequest = __webpack_require__(3511);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
;// CONCATENATED MODULE: external "react-stripe-checkout"
var external_react_stripe_checkout_namespaceObject = require("react-stripe-checkout");;
var external_react_stripe_checkout_default = /*#__PURE__*/__webpack_require__.n(external_react_stripe_checkout_namespaceObject);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(6731);
var router_default = /*#__PURE__*/__webpack_require__.n(router_);
;// CONCATENATED MODULE: ./src/pages/orders/[orderId].tsx





 // @ts-ignore

const showOrder = ({
  order,
  currentUser
}) => {
  const {
    0: secondsLeft,
    1: setSecondsLeft
  } = (0,external_react_.useState)(0);
  const {
    fetch,
    errors
  } = (0,useRequest/* default */.Z)({
    url: `/api/payments`,
    method: `post`,
    body: {
      orderId: order.id
    },
    onSuccess: payment => router_default().push(`/orders`)
  });
  (0,external_react_.useEffect)(() => {
    const calcTimeLeft = () => {
      const currentTime = new Date();
      const expiresAt = new Date(order.expiresAt); // @ts-ignore
      // calculate the difference

      const expiresInMs = expiresAt - currentTime;
      setSecondsLeft(Math.floor(expiresInMs / 1000));
    };

    calcTimeLeft();
    const interval = setInterval(calcTimeLeft, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  if (secondsLeft <= 0) {
    return /*#__PURE__*/jsx_runtime_.jsx("div", {
      children: "Order expired."
    });
  }

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    children: [/*#__PURE__*/jsx_runtime_.jsx("h1", {
      children: order.ticket.title
    }), secondsLeft, " seconds until order expires.", /*#__PURE__*/jsx_runtime_.jsx((external_react_stripe_checkout_default()), {
      token: token => fetch({
        token: token === null || token === void 0 ? void 0 : token.id
      }),
      stripeKey: `pk_test_51J5mAKIRdzKR5zq4XmZoObIYJvuhXJuZeTIDDeTEVwwXgNLCSxYeoqKZZjnkBBSyCVsSev0EExT68JWdmkHGcZal00IyUAEWXP`,
      amount: order.ticket.price * 100,
      email: currentUser.email
    }), errors]
  });
}; // @ts-ignore


showOrder.getInitialProps = async (context, client) => {
  const {
    orderId
  } = context.query;
  const {
    data
  } = await client.get(`/api/orders/${orderId}`);
  return {
    order: data
  };
};

/* harmony default export */ var _orderId_ = (showOrder);

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
var __webpack_exports__ = __webpack_require__.X(0, [511], function() { return __webpack_exec__(2689); });
module.exports = __webpack_exports__;

})();