webpackJsonp([26],{138:function(i,t,s){s(326);var a=s(0)(s(250),s(393),"data-v-079b60e4",null);i.exports=a.exports},210:function(i,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s(1),n=s(138),l=s.n(n),c=s(5),e=(s.n(c),s(3)),v=(s.n(e),s(2)),o=s.n(v),_=s(4);s.n(_);a.default.use(o.a),new a.default({render:function(i){return i(l.a)}}).$mount("#app")},250:function(i,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s(8),n=s(14),l=s.n(n);t.default={data:function(){return{type:"VIP",hasHeader:!a.b.wechat,titleName:"权益说明"}},components:{sysheader:l.a},methods:{switchType:function(i){this.type=i}}}},326:function(i,t){},393:function(i,t){i.exports={render:function(){var i=this,t=i.$createElement,s=i._self._c||t;return s("div",{attrs:{id:"app"}},[i.hasHeader?s("sysheader",{attrs:{titleName:i.titleName}}):i._e(),i._v(" "),s("div",{staticClass:"equity"},[s("div",{staticClass:"equity-tab"},[s("div",{staticClass:"vip",on:{click:function(t){i.switchType("VIP")}}},[s("span",{class:"VIP"==this.type?"on":""},[i._v("VIP权益")])]),i._v(" "),s("div",{staticClass:"svip",on:{click:function(t){i.switchType("SVIP")}}},[s("span",{class:"SVIP"==this.type?"on":""},[i._v("SVIP权益")])])]),i._v(" "),s("div",{staticClass:"tab-content"},[s("div",{directives:[{name:"show",rawName:"v-show",value:"VIP"==this.type,expression:"this.type == 'VIP'"}],staticClass:"content-vip"},[s("p",{staticClass:"info"},[i._v("VIP级别可获得高于普通店主的多项权益，在佣金等方面获得更高收益。")]),i._v(" "),i._m(0)]),i._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:"SVIP"==this.type,expression:"this.type == 'SVIP'"}],staticClass:"content-svip"},[s("p",{staticClass:"info"},[i._v("SVIP级别享有专属管理补贴，更多途径获取高额佣金奖励。")]),i._v(" "),i._m(1)])])])],1)},staticRenderFns:[function(){var i=this,t=i.$createElement,s=i._self._c||t;return s("ul",{staticClass:"content-list"},[s("li",[s("i",{staticClass:"icon icon-rebate"}),i._v(" "),s("div",{staticClass:"list-info"},[s("p",{staticClass:"info-title"},[i._v("高额返利")]),i._v("\n              高于普通店主的返利额度\n            ")])]),i._v(" "),s("li",[s("i",{staticClass:"icon icon-commission"}),i._v(" "),s("div",{staticClass:"list-info"},[s("p",{staticClass:"info-title"},[i._v("佣金叠加")]),i._v("\n              佣金阶梯式叠加\n            ")])]),i._v(" "),s("li",[s("i",{staticClass:"icon icon-vip "}),i._v(" "),s("div",{staticClass:"list-info"},[s("p",{staticClass:"info-title"},[i._v("VIP大礼包")]),i._v("\n              开通即送超值礼品\n            ")])]),i._v(" "),s("li",[s("i",{staticClass:"icon icon-envelope240"}),i._v(" "),s("div",{staticClass:"list-info"},[s("p",{staticClass:"info-title"},[i._v("240元红包")]),i._v("\n              专享优惠券大礼包\n            ")])]),i._v(" "),s("li",[s("i",{staticClass:"icon icon-mentor"}),i._v(" "),s("div",{staticClass:"list-info"},[s("p",{staticClass:"info-title"},[i._v("专属导师")]),i._v("\n              手教你赚钱\n            ")])]),i._v(" "),s("li",[s("i",{staticClass:"icon icon-exclusive"}),i._v(" "),s("div",{staticClass:"list-info"},[s("p",{staticClass:"info-title"},[i._v("专享价格")]),i._v("\n              专属成本价格\n            ")])]),i._v(" "),s("li",[s("i",{staticClass:"icon icon-withdrawal"}),i._v(" "),s("div",{staticClass:"list-info"},[s("p",{staticClass:"info-title"},[i._v("随时提现")]),i._v("\n              随时提现极速到账\n            ")])]),i._v(" "),s("li",[s("i",{staticClass:"icon icon-apply"}),i._v(" "),s("div",{staticClass:"list-info"},[s("p",{staticClass:"info-title"},[i._v("试用特权")]),i._v("\n              美店商品优先试用\n            ")])])])},function(){var i=this,t=i.$createElement,s=i._self._c||t;return s("ul",{staticClass:"content-list"},[s("li",[s("i",{staticClass:"icon icon-withdrawal"}),i._v(" "),s("div",{staticClass:"list-info"},[s("p",{staticClass:"info-title"},[i._v("高额返利")]),i._v("\n              高于普通店主的返利额度\n            ")])]),i._v(" "),s("li",[s("i",{staticClass:"icon icon-subsidy"}),i._v(" "),s("div",{staticClass:"list-info"},[s("p",{staticClass:"info-title"},[i._v("管理补贴")]),i._v("\n              享受SVIP专属管理奖励\n            ")])]),i._v(" "),s("li",[s("i",{staticClass:"icon icon-mentor"}),i._v(" "),s("div",{staticClass:"list-info"},[s("p",{staticClass:"info-title"},[i._v("专属导师")]),i._v("\n              手教你赚钱\n            ")])]),i._v(" "),s("li",[s("i",{staticClass:"icon icon-exclusive"}),i._v(" "),s("div",{staticClass:"list-info"},[s("p",{staticClass:"info-title"},[i._v("专享价格")]),i._v("\n              专属成本价格\n            ")])]),i._v(" "),s("li",[s("i",{staticClass:"icon icon-cash"}),i._v(" "),s("div",{staticClass:"list-info"},[s("p",{staticClass:"info-title"},[i._v("随时提现")]),i._v("\n              随时提现极速到账\n            ")])]),i._v(" "),s("li",[s("i",{staticClass:"icon icon-apply"}),i._v(" "),s("div",{staticClass:"list-info"},[s("p",{staticClass:"info-title"},[i._v("试用特权")]),i._v("\n              美店商品优先试用\n            ")])])])}]}}},[210]);