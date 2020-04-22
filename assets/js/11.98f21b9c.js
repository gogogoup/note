(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{331:function(t,e,n){"use strict";n.r(e);var a=n(33),s=Object(a.a)({},(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"_2019-11-11"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_2019-11-11"}},[t._v("#")]),t._v(" 2019-11-11")]),t._v(" "),n("h2",{attrs:{id:"利用解构设置函数参数默认值的问题"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#利用解构设置函数参数默认值的问题"}},[t._v("#")]),t._v(" 利用解构设置函数参数默认值的问题")]),t._v(" "),n("p",[t._v("尝试了两种方式：")]),t._v(" "),n("ul",[n("li",[n("p",[n("code",[t._v("function test1(option = {a: 1, b: 2}) {...}")]),n("br"),t._v("\n其实不能正确的进行默认值设置，只有当不传入参数，a和b会取到默认值；当传入参数中没有对应属性时，a/b是undefined")])]),t._v(" "),n("li",[n("p",[n("code",[t._v("function test2({a = 1, b = 2} = {}) {...}")]),n("br"),t._v("\n第二种，能正确处理传入的对象中没有对应属性时的赋值。当不写后面默认的空对象，会在不传入参数的时候报undefined")])])]),t._v(" "),n("p",[t._v("综上，第二种是正确写法")])])}),[],!1,null,null,null);e.default=s.exports}}]);