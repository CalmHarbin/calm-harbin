(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{820:function(e,t,n){"use strict";n.r(t);var r=n(394),o=n(395),i=n(392),l=n.n(i);function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function f(e){return function(e){if(Array.isArray(e))return d(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return d(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return d(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function p(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function b(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function m(e,t){return(m=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function y(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=v(e);if(t){var o=v(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return h(this,n)}}function h(e,t){if(t&&("object"===a(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function v(e){return(v=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var g=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&m(e,t)}(i,e);var t,n,r,o=y(i);function i(){var e;return p(this,i),(e=o.apply(this,arguments)).tableData=[{packing:"apple",goodsName:"苹果",number:999,weight:666,volume:888,length:10,width:10,height:10,netWeight:500,remark:"大苹果"},{goodsName:"橘子"},{goodsName:"梨"}],e.packingOptions=[{label:"苹果apple",value:"apple"},{label:"橘子orange",value:"orange"},{label:"梨pear",value:"pear"}],e.mode="1",e.modeOptions=[{label:"编辑按钮",value:"1"},{label:"点击行",value:"2"},{label:"点击单元格",value:"3"}],e.editAction=!0,e}return t=i,(n=[{key:"columns",get:function(){var e=this;return this.$createElement,[{label:"商品编码",id:"packing",editable:!0,render:function(t,n){var r,o=n.row,i=n.col;return t("div",[(null===(r=e.packingOptions.find((function(e){return e.value===o[i.id]})))||void 0===r?void 0:r.label)||o[i.id]])},editRender:function(t,n){var r=n.row,o=n.col;return t("biu-form-item",{attrs:{formType:"select",options:e.packingOptions,size:"mini"},style:"width: 100%",model:{value:r[o.id],callback:function(t){e.$set(r,o.id,t)}}})}},{label:"商品名称",id:"goodsName",width:150,editable:!0},{label:"总数量",id:"number",editable:!0,required:!0},{label:"总重量(KG)",id:"weight",editable:!0,editRender:function(t,n){var r=n.row,o=n.col;return t("el-input-number",{style:"width: 100%",attrs:{min:0,precision:3,controls:!1,size:"mini"},model:{value:r[o.id],callback:function(t){e.$set(r,o.id,t)}}})}},{label:"总体积(m³)",id:"volume"},{label:"长(cm)",id:"length",editable:!0,editRender:function(t,n){var r=n.row,o=n.col,i=n.$index;return t("el-input-number",{style:"width: 100%",attrs:{min:0,precision:2,controls:!1,size:"mini"},on:{change:function(){return e.setVolume(r,i)}},model:{value:r[o.id],callback:function(t){e.$set(r,o.id,t)}}})}},{label:"宽(cm)",id:"width",editable:!0},{label:"高(cm)",id:"height",editable:!0,editRender:function(t,n){var r=n.row,o=n.col,i=n.$index;return t("el-input-number",{style:"width: 100%",attrs:{min:0,precision:2,controls:!1,size:"mini"},on:{change:function(){return e.setVolume(r,i)}},model:{value:r[o.id],callback:function(t){e.$set(r,o.id,t)}}})}},{label:"净重",id:"netWeight"},{label:"备注",id:"remark",width:200}]}},{key:"editConfig",get:function(){return"2"===this.mode?{trigger:"click",mode:"row"}:"3"===this.mode?{trigger:"click",mode:"cell"}:{trigger:"manual",mode:"row"}}},{key:"setVolume",value:function(e,t){var n=new l.a(e.length||0).times(e.width||0).times(e.height||0).dividedBy(1e6).toNumber();this.tableData=[].concat(f(this.tableData.slice(0,t)),[u(u({},e),{},{volume:n})],f(this.tableData.slice(t+1)))}},{key:"plus",value:function(e){return u(u({},e),{},{packing:"apple"})}}])&&b(t.prototype,n),r&&b(t,r),i}(o.f),w=g=Object(r.a)([o.a],g),O=n(47),k=Object(O.a)(w,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("biu-form-item",{attrs:{formType:"select",options:e.modeOptions,size:"mini"},model:{value:e.mode,callback:function(t){e.mode=t},expression:"mode"}}),e._v(" "),n("el-button",{on:{click:function(t){e.editAction=!e.editAction}}},[e._v(e._s(e.editAction?"隐藏":"显示")+"加减行按钮")]),e._v(" "),n("biu-table",{attrs:{columns:e.columns,"table-data":e.tableData,virtual:!1,"max-height":300,"edit-config":e.editConfig,"edit-action":e.editAction,plus:e.plus},scopedSlots:e._u([{key:"width-edit",fn:function(t){var r=t.row,o=t.col,i=t.$index;return[n("el-input-number",{staticStyle:{width:"100%"},attrs:{min:0,precision:2,controls:!1,size:"mini"},on:{change:function(){return e.setVolume(r,i)}},model:{value:r[o.id],callback:function(t){e.$set(r,o.id,t)},expression:"row[col.id]"}})]}}])})],1)}),[],!1,null,null,null);t.default=k.exports}}]);