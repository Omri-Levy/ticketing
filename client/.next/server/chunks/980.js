exports.id = 980;
exports.ids = [980];
exports.modules = {

/***/ 8980:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _hooks_useRequest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3511);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6731);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);




 // changes the submit request url, form title and submit button text
// based on the formType (signUp | signIn).

const AuthForm = ({
  formType
}) => {
  const {
    0: email,
    1: setEmail
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(``);
  const {
    0: password,
    1: setPassword
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(``);
  const {
    fetch,
    errors
  } = (0,_hooks_useRequest__WEBPACK_IMPORTED_MODULE_2__/* .default */ .Z)({
    url: `/api/users/${formType}`,
    method: 'post',
    body: {
      email,
      password
    },
    onSuccess: () => next_router__WEBPACK_IMPORTED_MODULE_3___default().push(`/`)
  });

  const onSubmit = async event => {
    event.preventDefault();
    await fetch();
  };

  const title = formType === `signIn` ? `Sign In` : `Sign Up`;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
    onSubmit: onSubmit,
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
      children: title
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: 'form-group',
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
        htmlFor: "email",
        children: "Email:"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
        className: 'form-control',
        type: "text",
        id: 'email',
        name: 'email',
        onChange: ({
          target: {
            value
          }
        }) => setEmail(value),
        value: email
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: 'form-group mb-3',
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
        htmlFor: "password",
        children: "Password:"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
        className: 'form-control',
        type: "password",
        id: 'password',
        name: 'password',
        onChange: ({
          target: {
            value
          }
        }) => setPassword(value),
        value: password
      })]
    }), errors, /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
      className: "btn btn-primary",
      children: title
    })]
  });
};

/* harmony default export */ __webpack_exports__["Z"] = (AuthForm);

/***/ })

};
;