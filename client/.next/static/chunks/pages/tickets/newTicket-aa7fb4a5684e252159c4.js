(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[527],{3511:function(e,r,t){"use strict";var n=t(7757),c=t.n(n),s=t(5893),o=t(6156),a=t(2137),i=t(7294),u=t(9669),l=t.n(u);function p(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function f(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?p(Object(t),!0).forEach((function(r){(0,o.Z)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):p(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}r.Z=function(e){var r=e.url,t=e.method,n=e.body,o=e.onSuccess,u=(0,i.useState)(null),p=u[0],d=u[1];return{fetch:function(){var e=(0,a.Z)(c().mark((function e(a){var i,u;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,d(null),e.next=4,l()[t](r,f(f({},n),a));case 4:return i=e.sent,o&&o(i.data),e.abrupt("return",i.data);case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0),d((0,s.jsxs)("div",{className:"alert alert-danger",children:[(0,s.jsx)("h4",{children:"Ooops.."}),(0,s.jsx)("ul",{children:e.t0.response.data.errors?null===(u=e.t0.response.data.errors)||void 0===u?void 0:u.map((function(e){var r=e.message;return(0,s.jsx)("li",{children:r},r)})):(0,s.jsx)("li",{children:"Something went wrong.."})})]}));case 13:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(r){return e.apply(this,arguments)}}(),errors:p}}},86:function(e,r,t){"use strict";t.r(r);var n=t(5893),c=t(7757),s=t.n(c),o=t(2137),a=t(7294),i=t(3511),u=t(1163);r.default=function(){var e=(0,a.useState)(""),r=e[0],t=e[1],c=(0,a.useState)(""),l=c[0],p=c[1],f=(0,i.Z)({url:"/api/tickets",method:"post",body:{title:r,price:l},onSuccess:function(){return u.default.push("/")}}),d=f.fetch,h=f.errors,v=function(){var e=(0,o.Z)(s().mark((function e(r){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r.preventDefault(),e.next=3,d();case 3:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}();return(0,n.jsxs)("div",{children:[(0,n.jsx)("h1",{children:"Create a ticket"}),(0,n.jsxs)("form",{onSubmit:v,children:[(0,n.jsxs)("div",{className:"form-group",children:[(0,n.jsx)("label",{htmlFor:"title",children:"Title"}),(0,n.jsx)("input",{type:"text",id:"title",className:"form-control",onChange:function(e){var r=e.target.value;return t(r)},value:r})]}),(0,n.jsxs)("div",{className:"form-group mb-3",children:[(0,n.jsx)("label",{htmlFor:"price",children:"Price"}),(0,n.jsx)("input",{type:"text",id:"price",className:"form-control",onBlur:function(){var e=parseFloat(l);isNaN(e)||p(e.toFixed(2))},onChange:function(e){var r=e.target.value;return p(r)},value:l})]}),h,(0,n.jsx)("button",{className:"btn btn-primary",children:"Submit"})]})]})}},1700:function(e,r,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/tickets/newTicket",function(){return t(86)}])}},function(e){e.O(0,[774,888,179],(function(){return r=1700,e(e.s=r);var r}));var r=e.O();_N_E=r}]);