(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-00551e1f"],{"0981":function(t,e,r){"use strict";r("6ca5")},"1da1":function(t,e,r){"use strict";function n(t,e,r,n,i,o,a){try{var s=t[o](a),c=s.value}catch(u){return void r(u)}s.done?e(c):Promise.resolve(c).then(n,i)}function i(t){return function(){var e=this,r=arguments;return new Promise((function(i,o){var a=t.apply(e,r);function s(t){n(a,i,o,s,c,"next",t)}function c(t){n(a,i,o,s,c,"throw",t)}s(void 0)}))}}r.d(e,"a",(function(){return i}))},"6ca5":function(t,e,r){},8994:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:t.loadmen,expression:"loadmen",modifiers:{fullscreen:!0,lock:!0}}],staticClass:"max-wid"},[r("div",{staticClass:"heading"},[t.whether?r("p",{on:{click:function(e){return t.reTurn()}}},[t._v("返回上一页")]):t._e(),r("p",{staticClass:"heading-users"},[t._v(t._s(t.setup))])]),r("div",{staticClass:"image-view-title"},[r("div",{staticClass:"image-list"},[t._v("店铺名称")]),r("el-input",{attrs:{placeholder:"请输入店铺名称"},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}})],1),r("div",{staticClass:"image-view-title"},[r("div",{staticClass:"image-list"},[t._v("店铺地址")]),r("el-input",{attrs:{type:"text",placeholder:"请输入店铺地址"},model:{value:t.address,callback:function(e){t.address=e},expression:"address"}})],1),r("div",{staticClass:"image-view-title"},[r("div",{staticClass:"image-list"},[t._v("店铺logo")]),r("div",[r("el-upload",{attrs:{action:t.action,"list-type":"picture-card",name:"file",accept:".jpg,.png,.webp,.jfif, jpeg",limit:1,"on-remove":t.logoRemove,"on-success":t.logoSuccess,"on-preview":t.handlepreview,multiple:!1,"on-error":t.onErr,"before-upload":t.project,"file-list":t.logo}},[r("i",{staticClass:"el-icon-plus"})]),r("el-dialog",{attrs:{visible:t.dialogVisible},on:{"update:visible":function(e){t.dialogVisible=e}}},[r("img",{attrs:{width:"100%",src:t.dialogImageUrl,alt:""}})])],1)]),r("div",{staticClass:"image-button"},[r("el-button",{attrs:{type:"success",size:"medium",loading:t.load,disabled:t.load},on:{click:function(e){return t.bTns(t.butn)}}},[t._v(t._s(t.butn))])],1)])},i=[],o=(r("96cf"),r("1da1")),a=(r("7f7f"),console),s=(a.log,{data:function(){return{whether:!1,setup:"设置店铺信息",butn:"提交",load:!1,action:this.Urls.m().uploadres,loadmen:!1,id:"",name:"",address:"",logo:[],dialogImageUrl:"",dialogVisible:!1}},methods:{handlepreview:function(t){this.dialogImageUrl=t.url,this.dialogVisible=!0},onErr:function(t){this.loadmen=!1,this.$message.error("上传失败,尝试重新上传")},project:function(t){this.loadmen=!0},logoRemove:function(t,e){this.logo=[]},logoSuccess:function(t,e,r){console.log(t),console.log(e),this.logo.push({url:t.data,uid:e.uid}),this.loadmen=!1},reTurn:function(){this.$router.push({name:"set-up"})},bTns:function(t){this.load=!0;var e={id:this.id,name:this.name,address:this.address,logo:JSON.stringify(this.logo)};"提交"==t?(console.log("提交"),this.purequest(e,t,this.Urls.m().uploadshop)):(console.log("修改"),this.purequest(e,t,this.Urls.m().modifyshop))},purequest:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(e,r,n){var i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,new this.Request(n,this.$qs.stringify(e)).modepost();case 3:i=t.sent,200!=i.status?new this.mytitle(this.$message,"warning",i.data.msg).funtitle():(new this.mytitle(this.$message,"success",i.data.msg).funtitle(),localStorage.setItem("company",this.name),"提交"==r?this.$router.push({name:"index"}):this.$router.push({name:"set-up"})),this.load=!1,t.next=12;break;case 8:t.prev=8,t.t0=t["catch"](0),this.load=!1,new this.mytitle(this.$message,"error","服务器发生错误,请重试").funtitle();case 12:case"end":return t.stop()}}),t,this,[[0,8]])})));function e(e,r,n){return t.apply(this,arguments)}return e}()},created:function(){var t=this.$route.params.data;console.log(t),void 0==t?(this.whether=!1,this.setup="设置店铺信息",this.butn="提交"):(this.whether=!0,this.setup="修改店铺信息",this.butn="提交修改",this.id=t._id,this.name=t.name,this.address=t.address,this.logo=t.logo)}}),c=s,u=(r("0981"),r("2877")),l=Object(u["a"])(c,n,i,!1,null,"e9e102e8",null);e["default"]=l.exports},"96cf":function(t,e,r){var n=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,i="function"===typeof Symbol?Symbol:{},o=i.iterator||"@@iterator",a=i.asyncIterator||"@@asyncIterator",s=i.toStringTag||"@@toStringTag";function c(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch($){c=function(t,e,r){return t[e]=r}}function u(t,e,r,n){var i=e&&e.prototype instanceof v?e:v,o=Object.create(i.prototype),a=new T(n||[]);return o._invoke=j(t,r,a),o}function l(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch($){return{type:"throw",arg:$}}}t.wrap=u;var h="suspendedStart",f="suspendedYield",d="executing",p="completed",g={};function v(){}function m(){}function y(){}var w={};c(w,o,(function(){return this}));var b=Object.getPrototypeOf,x=b&&b(b(N([])));x&&x!==r&&n.call(x,o)&&(w=x);var L=y.prototype=v.prototype=Object.create(w);function _(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function E(t,e){function r(i,o,a,s){var c=l(t[i],t,o);if("throw"!==c.type){var u=c.arg,h=u.value;return h&&"object"===typeof h&&n.call(h,"__await")?e.resolve(h.__await).then((function(t){r("next",t,a,s)}),(function(t){r("throw",t,a,s)})):e.resolve(h).then((function(t){u.value=t,a(u)}),(function(t){return r("throw",t,a,s)}))}s(c.arg)}var i;function o(t,n){function o(){return new e((function(e,i){r(t,n,e,i)}))}return i=i?i.then(o,o):o()}this._invoke=o}function j(t,e,r){var n=h;return function(i,o){if(n===d)throw new Error("Generator is already running");if(n===p){if("throw"===i)throw o;return S()}r.method=i,r.arg=o;while(1){var a=r.delegate;if(a){var s=k(a,r);if(s){if(s===g)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===h)throw n=p,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=d;var c=l(t,e,r);if("normal"===c.type){if(n=r.done?p:f,c.arg===g)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n=p,r.method="throw",r.arg=c.arg)}}}function k(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator["return"]&&(r.method="return",r.arg=e,k(t,r),"throw"===r.method))return g;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return g}var i=l(n,t.iterator,r.arg);if("throw"===i.type)return r.method="throw",r.arg=i.arg,r.delegate=null,g;var o=i.arg;return o?o.done?(r[t.resultName]=o.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,g):o:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,g)}function O(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function C(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function T(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(O,this),this.reset(!0)}function N(t){if(t){var r=t[o];if(r)return r.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var i=-1,a=function r(){while(++i<t.length)if(n.call(t,i))return r.value=t[i],r.done=!1,r;return r.value=e,r.done=!0,r};return a.next=a}}return{next:S}}function S(){return{value:e,done:!0}}return m.prototype=y,c(L,"constructor",y),c(y,"constructor",m),m.displayName=c(y,s,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===m||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,c(t,s,"GeneratorFunction")),t.prototype=Object.create(L),t},t.awrap=function(t){return{__await:t}},_(E.prototype),c(E.prototype,a,(function(){return this})),t.AsyncIterator=E,t.async=function(e,r,n,i,o){void 0===o&&(o=Promise);var a=new E(u(e,r,n,i),o);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},_(L),c(L,s,"Generator"),c(L,o,(function(){return this})),c(L,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){while(e.length){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=N,T.prototype={constructor:T,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(C),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function i(n,i){return s.type="throw",s.arg=t,r.next=n,i&&(r.method="next",r.arg=e),!!i}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],s=a.completion;if("root"===a.tryLoc)return i("end");if(a.tryLoc<=this.prev){var c=n.call(a,"catchLoc"),u=n.call(a,"finallyLoc");if(c&&u){if(this.prev<a.catchLoc)return i(a.catchLoc,!0);if(this.prev<a.finallyLoc)return i(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return i(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return i(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var i=this.tryEntries[r];if(i.tryLoc<=this.prev&&n.call(i,"finallyLoc")&&this.prev<i.finallyLoc){var o=i;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=t,a.arg=e,o?(this.method="next",this.next=o.finallyLoc,g):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),g},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),C(r),g}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var i=n.arg;C(r)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:N(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),g}},t}(t.exports);try{regeneratorRuntime=n}catch(i){"object"===typeof globalThis?globalThis.regeneratorRuntime=n:Function("r","regeneratorRuntime = r")(n)}}}]);
//# sourceMappingURL=chunk-00551e1f.0854c49d.js.map