(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-70998cba"],{1551:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:t.loading,expression:"loading",modifiers:{fullscreen:!0,lock:!0}}],staticClass:"ordering"},[r("div",{staticClass:"heading"},[t._v("菜品管理")]),r("div",{staticClass:"content-view"},[r("div",{staticClass:"button-view"},[r("router-link",{attrs:{to:{name:"upload"}}},[r("el-button",{attrs:{type:"success",size:"medium"}},[t._v("添加菜品")])],1)],1),t.nodatas?r("div",[r("div",{staticClass:"tab-list"},t._l(t.tablist,(function(e,n){return r("span",{key:n},[t._v(t._s(e))])})),0),t._l(t.tabcont,(function(e,n){return r("div",{key:n,staticClass:"tab-table"},[r("div",[t._v(t._s(e.time))]),r("div",[t._v(t._s(e.category))]),r("div",[t._v(t._s(e.name))]),r("div",[r("el-image",{staticClass:"elimg",attrs:{src:e.image[0].url,fit:"cover",lazy:!0,"preview-src-list":[e.image[0].url]}})],1),r("div",[t._v(t._s(e.specsArray[0].unitprice))]),r("div",[r("el-button",{attrs:{size:"small"},on:{click:function(r){return t.edIt(e)}}},[t._v("编辑")]),e.onsale?r("el-button",{attrs:{type:"danger",size:"small",loading:n==t.shelfload,disabled:n==t.shelfload},on:{click:function(r){return t.shelf(e._id,n,e.cid)}}},[t._v("下架")]):r("el-button",{attrs:{type:"warning",size:"small",disabled:""}},[t._v("已下架")])],1)])})),r("el-pagination",{attrs:{background:"",layout:"prev, pager, next","hide-on-single-page":!0,total:t.total},on:{"current-change":t.currentchange}})],2):t._e(),t.nodatas?t._e():r("div",{staticClass:"nodatas"},[t._v("还没有菜品数据")])]),r("div",{staticStyle:{height:"120px"}})])},i=[],o=(r("96cf"),r("1da1")),a={data:function(){return{loading:!0,nodatas:!0,shelfload:-1,tablist:["创建时间","类目","菜品名称","菜品图片","价格(元)","操作"],tabcont:[],currentnum:1,total:0,pagenum:0}},methods:{currentchange:function(t){this.pagenum=t-1,this.obtaindishes()},obtaindishes:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,new this.Request(this.Urls.m().obtaindishes+"?page="+this.pagenum).modeget();case 3:e=t.sent,this.nodatas=0!=e.data.data.tatal,this.tabcont=e.data.data.result,this.total=e.data.data.tatal,this.loading=!1,t.next=14;break;case 10:t.prev=10,t.t0=t["catch"](0),this.loading=!1,new this.mytitle(this.$message,"error","服务器发生错误,请重试").funtitle();case 14:case"end":return t.stop()}}),t,this,[[0,10]])})));function e(){return t.apply(this,arguments)}return e}(),edIt:function(t){this.$router.push({name:"upload",params:{item:t}})},shelf:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(e,r,n){var i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.shelfload=r,i=this.$qs.stringify({id:e,value:n}),t.prev=2,t.next=5,new this.Request(this.Urls.m().fromsale+"?"+i).modeget();case 5:this.$set(this.tabcont[r],"onsale",!1),this.shelfload=-1,t.next=13;break;case 9:t.prev=9,t.t0=t["catch"](2),this.shelfload=-1,new this.mytitle(this.$message,"error","下架失败，重试").funtitle();case 13:case"end":return t.stop()}}),t,this,[[2,9]])})));function e(e,r,n){return t.apply(this,arguments)}return e}()},created:function(){this.obtaindishes()}},s=a,c=(r("8002"),r("2877")),u=Object(c["a"])(s,n,i,!1,null,"49e06ed8",null);e["default"]=u.exports},"1da1":function(t,e,r){"use strict";function n(t,e,r,n,i,o,a){try{var s=t[o](a),c=s.value}catch(u){return void r(u)}s.done?e(c):Promise.resolve(c).then(n,i)}function i(t){return function(){var e=this,r=arguments;return new Promise((function(i,o){var a=t.apply(e,r);function s(t){n(a,i,o,s,c,"next",t)}function c(t){n(a,i,o,s,c,"throw",t)}s(void 0)}))}}r.d(e,"a",(function(){return i}))},8002:function(t,e,r){"use strict";r("a0ef")},"96cf":function(t,e,r){var n=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,i="function"===typeof Symbol?Symbol:{},o=i.iterator||"@@iterator",a=i.asyncIterator||"@@asyncIterator",s=i.toStringTag||"@@toStringTag";function c(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(P){c=function(t,e,r){return t[e]=r}}function u(t,e,r,n){var i=e&&e.prototype instanceof g?e:g,o=Object.create(i.prototype),a=new R(n||[]);return o._invoke=E(t,r,a),o}function l(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(P){return{type:"throw",arg:P}}}t.wrap=u;var h="suspendedStart",f="suspendedYield",d="executing",p="completed",v={};function g(){}function y(){}function m(){}var w={};c(w,o,(function(){return this}));var b=Object.getPrototypeOf,_=b&&b(b(C([])));_&&_!==r&&n.call(_,o)&&(w=_);var x=m.prototype=g.prototype=Object.create(w);function L(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function k(t,e){function r(i,o,a,s){var c=l(t[i],t,o);if("throw"!==c.type){var u=c.arg,h=u.value;return h&&"object"===typeof h&&n.call(h,"__await")?e.resolve(h.__await).then((function(t){r("next",t,a,s)}),(function(t){r("throw",t,a,s)})):e.resolve(h).then((function(t){u.value=t,a(u)}),(function(t){return r("throw",t,a,s)}))}s(c.arg)}var i;function o(t,n){function o(){return new e((function(e,i){r(t,n,e,i)}))}return i=i?i.then(o,o):o()}this._invoke=o}function E(t,e,r){var n=h;return function(i,o){if(n===d)throw new Error("Generator is already running");if(n===p){if("throw"===i)throw o;return G()}r.method=i,r.arg=o;while(1){var a=r.delegate;if(a){var s=j(a,r);if(s){if(s===v)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===h)throw n=p,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=d;var c=l(t,e,r);if("normal"===c.type){if(n=r.done?p:f,c.arg===v)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n=p,r.method="throw",r.arg=c.arg)}}}function j(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator["return"]&&(r.method="return",r.arg=e,j(t,r),"throw"===r.method))return v;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var i=l(n,t.iterator,r.arg);if("throw"===i.type)return r.method="throw",r.arg=i.arg,r.delegate=null,v;var o=i.arg;return o?o.done?(r[t.resultName]=o.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,v):o:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,v)}function O(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function N(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function R(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(O,this),this.reset(!0)}function C(t){if(t){var r=t[o];if(r)return r.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var i=-1,a=function r(){while(++i<t.length)if(n.call(t,i))return r.value=t[i],r.done=!1,r;return r.value=e,r.done=!0,r};return a.next=a}}return{next:G}}function G(){return{value:e,done:!0}}return y.prototype=m,c(x,"constructor",m),c(m,"constructor",y),y.displayName=c(m,s,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===y||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,c(t,s,"GeneratorFunction")),t.prototype=Object.create(x),t},t.awrap=function(t){return{__await:t}},L(k.prototype),c(k.prototype,a,(function(){return this})),t.AsyncIterator=k,t.async=function(e,r,n,i,o){void 0===o&&(o=Promise);var a=new k(u(e,r,n,i),o);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},L(x),c(x,s,"Generator"),c(x,o,(function(){return this})),c(x,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){while(e.length){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=C,R.prototype={constructor:R,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(N),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function i(n,i){return s.type="throw",s.arg=t,r.next=n,i&&(r.method="next",r.arg=e),!!i}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],s=a.completion;if("root"===a.tryLoc)return i("end");if(a.tryLoc<=this.prev){var c=n.call(a,"catchLoc"),u=n.call(a,"finallyLoc");if(c&&u){if(this.prev<a.catchLoc)return i(a.catchLoc,!0);if(this.prev<a.finallyLoc)return i(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return i(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return i(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var i=this.tryEntries[r];if(i.tryLoc<=this.prev&&n.call(i,"finallyLoc")&&this.prev<i.finallyLoc){var o=i;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=t,a.arg=e,o?(this.method="next",this.next=o.finallyLoc,v):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),N(r),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var i=n.arg;N(r)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:C(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),v}},t}(t.exports);try{regeneratorRuntime=n}catch(i){"object"===typeof globalThis?globalThis.regeneratorRuntime=n:Function("r","regeneratorRuntime = r")(n)}},a0ef:function(t,e,r){}}]);
//# sourceMappingURL=chunk-70998cba.a23899b2.js.map