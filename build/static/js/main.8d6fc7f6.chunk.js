(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{145:function(e,n,t){"use strict";t.r(n),t(89);var a=t(18),o=t(0),r=t.n(o),c=t(59),l=t.n(c);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var i=t(84),m=t(62),u=(t(95),t(83));function d(e){var n=e.redirect,t=e.path,a=e.component,o=e.key;return n?r.a.createElement(k.a,{exact:!0,key:o,from:t,to:n}):r.a.createElement(k.b,{key:o,component:a,path:t})}function s(e,n,t,a,c){return n?r.a.createElement(a,Object.assign({key:e},t),r.a.createElement(o.Suspense,{fallback:r.a.createElement("div",null)},r.a.createElement(k.d,null,n.map(function(n,t){var a=n.redirect,o=n.path,r=n.component,l=n.exact;return d({key:"".concat(e,"-").concat(t),redirect:a,path:o&&v.a.join(c.path,o),component:r,exact:l})})))):r.a.createElement(o.Suspense,{fallback:r.a.createElement("div",null)},d(Object(m.a)({key:e},c)))}var p=Object(o.lazy)(function(){return t.e(7).then(t.bind(null,189))}),h=Object(o.lazy)(function(){return Promise.all([t.e(0),t.e(4),t.e(5)]).then(t.bind(null,191))}),E=Object(o.lazy)(function(){return Promise.all([t.e(0),t.e(6)]).then(t.bind(null,190))}),b=[{path:"/user",component:function(e){return r.a.createElement(u.a,null,r.a.createElement("div",null,e.children))},isNotNeedHead:!0,children:[{path:"/login",component:h},{path:"/",redirect:"/user/login"},{component:E}]},{name:"home",path:"/home",component:p,requiresAuth:!0},{name:"\u9996\u9875",path:"/",exact:!0,redirect:"/home"},{component:E,isNotNeedHead:!0}],f=t(81),v=t.n(f),k=t(12),w=t(79);l.a.render(r.a.createElement(a.a,null,r.a.createElement(w.a,null,r.a.createElement(k.d,null,b.map(function(e,n){var t=e.component,a=e.children,o=e.requiresAuth,c=e.isNotNeedHead,l=Object(i.a)(e,["component","children","requiresAuth","isNotNeedHead"]);return r.a.createElement(k.b,Object.assign({key:n},l,{component:function(l){return o?r.a.createElement(k.a,{to:{pathname:"/user/login",state:{from:l.location}}}):c?s(n,a,l,t,e):r.a.createElement("div",{className:"need_head"},s(n,a,l,t,e))}}))})))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},88:function(e,n,t){e.exports=t(145)}},[[88,2,3]]]);