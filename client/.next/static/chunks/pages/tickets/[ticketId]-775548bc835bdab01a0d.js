(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[42],{3511:function(r,e,t){"use strict";var n=t(7757),c=t.n(n),s=t(5893),o=t(6156),i=t(2137),u=t(7294),a=t(9669),l=t.n(a);function p(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),t.push.apply(t,n)}return t}function d(r){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?p(Object(t),!0).forEach((function(e){(0,o.Z)(r,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):p(Object(t)).forEach((function(e){Object.defineProperty(r,e,Object.getOwnPropertyDescriptor(t,e))}))}return r}e.Z=function(r){var e=r.url,t=r.method,n=r.body,o=r.onSuccess,a=(0,u.useState)(null),p=a[0],f=a[1];return{fetch:function(){var r=(0,i.Z)(c().mark((function r(i){var u,a;return c().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,f(null),r.next=4,l()[t](e,d(d({},n),i));case 4:return u=r.sent,o&&o(u.data),r.abrupt("return",u.data);case 9:r.prev=9,r.t0=r.catch(0),console.error(r.t0),f((0,s.jsxs)("div",{className:"alert alert-danger",children:[(0,s.jsx)("h4",{children:"Ooops.."}),(0,s.jsx)("ul",{children:r.t0.response.data.errors?null===(a=r.t0.response.data.errors)||void 0===a?void 0:a.map((function(r){var e=r.message;return(0,s.jsx)("li",{children:e},e)})):(0,s.jsx)("li",{children:"Something went wrong.."})})]}));case 13:case"end":return r.stop()}}),r,null,[[0,9]])})));return function(e){return r.apply(this,arguments)}}(),errors:p}}},626:function(r,e,t){"use strict";t.r(e);var n=t(7757),c=t.n(n),s=t(2137),o=t(5893),i=t(3511),u=t(1163),a=function(r){var e=r.ticket,t=(0,i.Z)({url:"/api/orders",method:"post",body:{ticketId:e.id},onSuccess:function(r){return u.default.push("/orders/[orderId]","/orders/".concat(r.id))}}),n=t.fetch,c=t.errors;return(0,o.jsxs)("div",{children:[(0,o.jsx)("h1",{children:e.title}),(0,o.jsxs)("h4",{children:["Price: ",e.price]}),c,(0,o.jsx)("button",{className:"btn btn-primary",onClick:function(){return n()},children:"Purchase"})]})};a.getInitialProps=function(){var r=(0,s.Z)(c().mark((function r(e,t){var n,s,o;return c().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n=e.query.ticketId,r.next=3,t.get("/api/tickets/".concat(n));case 3:return s=r.sent,o=s.data,r.abrupt("return",{ticket:o});case 6:case"end":return r.stop()}}),r)})));return function(e,t){return r.apply(this,arguments)}}(),e.default=a},3628:function(r,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/tickets/[ticketId]",function(){return t(626)}])}},function(r){r.O(0,[774,888,179],(function(){return e=3628,r(r.s=e);var e}));var e=r.O();_N_E=e}]);