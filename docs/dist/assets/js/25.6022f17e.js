(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{815:function(t,n,e){"use strict";e.r(n);var o=e(29),i=e(48),a=e(116),s=e(115),l=e(393),c=e(394),u=function(t){Object(a.a)(e,t);var n=Object(s.a)(e);function e(){var t;return Object(o.a)(this,e),(t=n.apply(this,arguments)).show=!1,t.add={show:!1},t.loading=!1,t}return Object(i.a)(e,[{key:"footer",get:function(){var t=this;return[{title:"确认",loading:this.loading,callback:function(){t.loading=!0,setTimeout((function(){t.$notify({title:"提交成功",message:"成功添加一条运单",type:"success"}),t.loading=!1,t.add.show=!1}),1e3)}}]}}]),e}(c.f),r=u=Object(l.a)([c.a],u),d=e(47),f=Object(d.a)(r,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("el-button",{on:{click:function(n){t.show=!0}}},[t._v("查看详情")]),t._v(" "),e("el-button",{on:{click:function(n){t.add.show=!0}}},[t._v("添加")]),t._v(" "),e("biu-dialog",{attrs:{title:"订单详情",visible:t.show,footer:""},on:{"update:visible":function(n){t.show=n}}},[e("pre",[t._v("            哈哈哈\n            哈哈哈\n            哈哈哈\n            哈哈哈\n            哈哈哈\n            哈哈哈\n        ")])]),t._v(" "),e("biu-dialog",{attrs:{title:"添加",visible:t.add.show,footer:t.footer},on:{"update:visible":function(n){return t.$set(t.add,"show",n)}}},[e("pre",[t._v("            你可以\n\n            展示\n\n            你想展示的\n        ")])])],1)}),[],!1,null,null,null);n.default=f.exports}}]);