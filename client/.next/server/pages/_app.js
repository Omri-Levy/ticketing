(function() {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 6776:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ _app; }
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
;// CONCATENATED MODULE: ./src/components/Header/Brand/index.tsx


 // returns a Next.js link with an anchor tag styled with Bootstrap's
// navbar-brand class. Expects the anchor's text as children prop.

const Brand = ({
  children
}) => /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
  href: `/`,
  children: /*#__PURE__*/jsx_runtime_.jsx("a", {
    className: `navbar-brand`,
    children: children
  })
});

/* harmony default export */ var Header_Brand = (Brand);
;// CONCATENATED MODULE: ./src/components/Header/Nav/index.tsx




const Nav = ({
  children,
  brand
}) => /*#__PURE__*/jsx_runtime_.jsx("nav", {
  className: `navbar navbar-expand-lg navbar-light bg-light`,
  children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: `container-fluid`,
    children: [/*#__PURE__*/jsx_runtime_.jsx(Header_Brand, {
      children: brand
    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "d-flex justify-content-end",
      children: /*#__PURE__*/jsx_runtime_.jsx("ul", {
        className: `nav navbar-nav`,
        children: children
      })
    })]
  })
});

/* harmony default export */ var Header_Nav = (Nav);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(6731);
;// CONCATENATED MODULE: ./src/components/Header/Nav/NavLink/index.tsx


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const NavLink = ({
  children,
  href,
  anchorProps
}) => {
  const router = (0,router_.useRouter)();
  const isActive = router.asPath === href;
  const activeClass = isActive ? `active` : undefined;
  return /*#__PURE__*/jsx_runtime_.jsx("li", {
    className: `nav-item`,
    children: /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
      href: href,
      children: /*#__PURE__*/jsx_runtime_.jsx("a", _objectSpread(_objectSpread({
        className: `nav-link ${activeClass}`,
        "aria-current": isActive
      }, anchorProps), {}, {
        children: children
      }))
    })
  });
};

/* harmony default export */ var Nav_NavLink = (NavLink);
;// CONCATENATED MODULE: ./src/components/Header/index.tsx





const Header = ({
  currentUser
}) => {
  const links = (0,external_react_.useMemo)(() => [!currentUser && {
    label: `Sign Up`,
    href: `/auth/signUp`
  }, !currentUser && {
    label: `Sign In`,
    href: `/auth/signIn`
  }, currentUser && {
    label: `My Orders`,
    href: `/orders`
  }, currentUser && {
    label: `Sell Tickets`,
    href: `/tickets/newTicket`
  }, currentUser && {
    label: `Sign Out`,
    href: `/auth/signOut`
  }], [currentUser]);
  return /*#__PURE__*/jsx_runtime_.jsx("header", {
    children: /*#__PURE__*/jsx_runtime_.jsx(Header_Nav, {
      brand: `GitTix`,
      children: links === null || links === void 0 ? void 0 : links.map(link => {
        if (!link) {
          return null;
        }

        const {
          href,
          label
        } = link;
        return /*#__PURE__*/jsx_runtime_.jsx(Nav_NavLink, {
          href: href,
          children: label
        }, href);
      })
    })
  });
};

/* harmony default export */ var components_Header = (Header);
;// CONCATENATED MODULE: ./src/components/Layout/index.tsx





const Layout = ({
  children,
  currentUser
}) => /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
  children: [/*#__PURE__*/jsx_runtime_.jsx(components_Header, {
    currentUser: currentUser
  }), /*#__PURE__*/jsx_runtime_.jsx("main", {
    className: 'container',
    children: /*#__PURE__*/jsx_runtime_.jsx("section", {
      children: children
    })
  })]
});

/* harmony default export */ var components_Layout = (Layout);
;// CONCATENATED MODULE: ./src/utils/functions/is-server-side.ts
// is server-side if window is undefined, otherwise is client-side.
const isServerSide = () => true;

/* harmony default export */ var is_server_side = (isServerSide);
// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__(2376);
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_);
;// CONCATENATED MODULE: ./src/api/axios-client.ts

 // send requests using ingress-nginx's Kubernetes path if the request is
// server-sided, due to Next.js + Kubernetes behaviour.

const axiosClient = ({
  req
}) => {
  if (is_server_side()) {
    const baseURL =  true ? `http://www.omrilevy-ticketing-app.xyz/` : 0;
    return external_axios_default().create({
      baseURL,
      headers: req.headers
    });
  } else {
    return external_axios_default().create({
      baseURL: `/`
    });
  }
};

/* harmony default export */ var axios_client = (axiosClient);
;// CONCATENATED MODULE: ./src/pages/_app.tsx


function _app_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _app_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { _app_ownKeys(Object(source), true).forEach(function (key) { _app_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { _app_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _app_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





const AppComponent = ({
  Component,
  pageProps,
  currentUser
}) => /*#__PURE__*/jsx_runtime_.jsx(components_Layout, {
  currentUser: currentUser,
  children: /*#__PURE__*/jsx_runtime_.jsx(Component, _app_objectSpread({
    currentUser: currentUser
  }, pageProps))
});

AppComponent.getInitialProps = async appContext => {
  const client = axios_client(appContext.ctx);
  const {
    data
  } = await client.get(`/api/users/currentUser`);
  let pageProps = {};

  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser);
  }

  return _app_objectSpread({
    pageProps
  }, data);
};

/* harmony default export */ var _app = (AppComponent);

/***/ }),

/***/ 2376:
/***/ (function(module) {

"use strict";
module.exports = require("axios");;

/***/ }),

/***/ 8417:
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/router-context.js");;

/***/ }),

/***/ 2238:
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/router/utils/get-asset-path-from-route.js");;

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

/***/ }),

/***/ 4453:
/***/ (function() {

/* (ignored) */

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = __webpack_require__.X(0, [664], function() { return __webpack_exec__(6776); });
module.exports = __webpack_exports__;

})();