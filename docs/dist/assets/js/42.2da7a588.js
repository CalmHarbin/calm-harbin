(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{830:function(e,t,n){"use strict";n.r(t);var r=n(394),o=n(395);function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function u(e,t){return(u=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function c(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=p(e);if(t){var o=p(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return f(this,n)}}function f(e,t){if(t&&("object"===i(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function p(e){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var s=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&u(e,t)}(i,e);var t,n,r,o=c(i);function i(){var e;return a(this,i),(e=o.apply(this,arguments)).form={goodsName:""},e.tableData=[],e.packingOptions=[{label:"苹果apple",value:"apple"},{label:"橘子orange",value:"orange"},{label:"梨pear",value:"pear"}],e}return t=i,(n=[{key:"columns",get:function(){var e=this;return this.$createElement,[{formType:"slot",label:"商品编码",id:"packing",render:function(t,n){var r,o=n.row,i=n.col;return t("div",[(null===(r=e.packingOptions.find((function(e){return e.value===o[i.id]})))||void 0===r?void 0:r.label)||o[i.id]])},formAttr:{render:function(t,n){var r=n.col;return t("biu-form-item",{attrs:{formType:"select",options:e.packingOptions,size:"mini"},style:"width: 100%",model:{value:e.form[r.id],callback:function(t){e.$set(e.form,r.id,t)}}})}}},{formType:"input",label:"商品名称",id:"goodsName",width:150},{formType:"input",label:"总数量",id:"number"},{formType:"input",label:"总重量(KG)",id:"weight",render:function(e,t){return e("div",["custom-",t.row[t.col.id]])}},{formType:"input",label:"总体积(m³)",id:"volume"},{label:"长(m)",id:"length"},{label:"宽(m)",id:"width"},{label:"高(m)",id:"height"},{label:"净重",id:"netWeight"},{label:"备注",id:"remark",width:200}]}},{key:"created",value:function(){this.add(5)}},{key:"add",value:function(e){var t=this,n=this.tableData.length;new Array(e).fill("").forEach((function(e,r){t.tableData.push({id:n+r,packing:["apple","orange","pear"][~~(3*Math.random())],goodsName:["苹果","橘子","梨"][~~(3*Math.random())],number:~~(1e3*Math.random()),remark:"",weight:10,volume:1e3,length:10,width:10,height:10,netWeight:99.99})}))}},{key:"search",value:function(){console.log(this.form)}}])&&l(t.prototype,n),r&&l(t,r),i}(o.f),d=s=Object(r.a)([o.a],s),b=n(47),m=Object(b.a)(d,(function(){var e=this,t=e.$createElement;return(e._self._c||t)("biu-table",{attrs:{columns:e.columns,"table-data":e.tableData,"show-header-filter":"","max-height":500},on:{search:e.search},model:{value:e.form,callback:function(t){e.form=t},expression:"form"}})}),[],!1,null,null,null);t.default=m.exports}}]);