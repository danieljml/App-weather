(this["webpackJsonpweather-app"]=this["webpackJsonpweather-app"]||[]).push([[0],{17:function(e,t,c){"use strict";c.r(t);var n=c(1),a=c.n(n),r=c(6),s=c.n(r),i=(c(5),c(4)),o=c.n(i),u=c(7),l=c(2),j=c(8),d=c.n(j),m=c(9),p=c(0),b=function(e){var t=e/60;return d()().utcOffset(t).format("h:mm A")},h="4aa692caf0bf7cf7a224fe81a3ca4959",O="https://api.openweathermap.org/data/2.5/";var x=function(){var e,t,c=Object(n.useState)(null),a=Object(l.a)(c,2),r=a[0],s=a[1],i=Object(n.useState)(""),j=Object(l.a)(i,2),d=j[0],x=j[1],f=Object(n.useState)({type:"",message:""}),v=Object(l.a)(f,2),y=v[0],g=v[1],w=Object(n.useRef)(null),_=function(){setTimeout((function(){return g({type:"",message:""})}),3e3)},N=function(e){e.preventDefault();var t=null===w||void 0===w?void 0:w.current,c=new FormData(t),n=Object.fromEntries(c.entries()).country;S(n),t.reset()};Object(n.useEffect)((function(){var e;null===w||void 0===w||null===(e=w.current)||void 0===e||e.addEventListener("submit",N)}),[]);var S=function(){var e=Object(u.a)(o.a.mark((function e(t){var c,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(O,"weather?q=").concat(t,"&units=metric&APPID=").concat(h));case 2:return c=e.sent,e.next=5,c.json();case 5:if(n=e.sent,200!==c.status){e.next=16;break}if(s(n),g({type:"success",message:"Success request"}),_(),!(n.main.temp>16)){e.next=13;break}return x("warm"),e.abrupt("return");case 13:x("cold"),e.next=17;break;case 16:g({type:"error",message:"Invalid country"});case 17:_();case 18:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),D=r?Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)("img",{className:"top__image",src:"warm"===d?"https://i.imgur.com/H2Fa2Ye.jpg":"https://i.imgur.com/FK28j2H.png",alt:"img-weather"}),Object(p.jsxs)("div",{className:"top__content",children:[Object(p.jsx)("p",{children:null===(e=r.weather[0])||void 0===e?void 0:e.main}),Object(p.jsxs)("span",{children:[Math.round(r.main.temp),"\xb0"]})]})]}):"",F=r?Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)("div",{className:"container__image",children:Object(p.jsx)("img",{className:d,src:"https://openweathermap.org/img/wn/".concat(null===(t=r.weather[0])||void 0===t?void 0:t.icon,"@2x.png"),alt:"icon"})}),Object(p.jsxs)("p",{className:"location",children:[r.name,", ",r.sys.country]}),Object(p.jsx)("p",{className:"date",children:function(e){var t=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"][e.getDay()],c=e.getDate(),n=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"][e.getMonth()],a=e.getFullYear();return"".concat(t," ").concat(c," ").concat(n," ").concat(a)}(new Date)}),Object(p.jsxs)("ul",{children:[Object(p.jsxs)("li",{children:["Description: ",Object(p.jsx)("span",{children:r.weather[0].description})]}),Object(p.jsxs)("li",{children:["Coords:"," ",Object.entries(r.coord).map((function(e){return"".concat(e[0],": ").concat(e[1])})).join(", ")]}),Object(p.jsxs)("li",{children:["Timezone: ",b(r.timezone)]}),Object(p.jsxs)("li",{children:["Pressure: ",Math.round(r.main.pressure)]}),Object(p.jsxs)("li",{children:["Humidity: ",Math.round(r.main.humidity)]})]})]}):"";return Object(p.jsxs)("div",{className:"container__app ".concat(d),children:[Object(p.jsx)("div",{className:"alert ".concat(y.type),children:Object(p.jsx)("p",{children:y.message})}),Object(p.jsxs)("main",{className:"app",children:[Object(p.jsxs)("div",{className:"container__top",children:[Object(p.jsx)("header",{className:"block",children:Object(p.jsxs)("form",{ref:w,id:"form-country",className:"form-weather",children:[Object(p.jsx)("input",{className:"form__input",type:"text",name:"country",placeholder:"Search weather by country"}),Object(p.jsx)("button",{className:"form__btn",children:Object(p.jsx)(m.a,{className:"btn__icon"})})]})}),D]}),Object(p.jsx)("div",{className:"container__bottom ".concat(d),children:F})]})]})};s.a.render(Object(p.jsx)(a.a.StrictMode,{children:Object(p.jsx)(x,{})}),document.getElementById("root"))},5:function(e,t,c){}},[[17,1,2]]]);
//# sourceMappingURL=main.9991b6f3.chunk.js.map