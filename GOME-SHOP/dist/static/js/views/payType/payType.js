webpackJsonp([19],{153:function(e,t,i){i(375);var a=i(0)(i(269),i(432),"data-v-c1895af8",null);e.exports=a.exports},223:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i(1),n=i(153),o=i.n(n),s=i(5),r=(i.n(s),i(3)),c=(i.n(r),i(2)),l=i.n(c),u=i(4);i.n(u);a.default.use(l.a),new a.default({render:function(e){return e(o.a)}}).$mount("#app")},269:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i(29),n=(i.n(a),i(86)),o=i(8),s=i(21),r=i(14),c=i.n(r);t.default={data:function(){return{type:o.b.wechat?"WEIXINPAY":"ALIPAYSM",surplusTime:"00:00:00",price:299,payTypes:null,orderNo:"",titleName:"选择支付方式",hasHeader:!o.b.wechat,inviterUserId:""}},components:{sysheader:c.a},created:function(){var e=window.localStorage&&JSON.parse(localStorage.getItem("payType"));this.orderNo=e.orderNo,this.payTypes=JSON.parse(e.payModeList),this.saveTime(),this.tick(),this.timer=setInterval(this.tick,1e3);var t=location.search.substr(1),i=t.split("=")[1];i&&(this.inviterUserId=i)},methods:{switchType:function(e){this.type=e,console.log(e)},isTimeout:function(e){return e<0},toFixedZero:function(e){return e>=10?""+e:"0"+e},saveTime:function(){if(!window.localStorage||!localStorage.getItem("payTime")){var e=new Date;e.setMinutes(e.getMinutes()+30),window.localStorage&&localStorage.setItem("payTime",e.getTime())}},tick:function(){var e=window.localStorage&&parseInt(localStorage.getItem("payTime")),t=(new Date).getTime(),i=0,a=0,n=0;if(i=parseInt((e-t)/1e3),this.isTimeout(i))return clearInterval(this.timer),this.surplusTime="00:00:00",void(window.localStorage&&localStorage.removeItem("payTime"));a=parseInt(i/3600),i-=3600*a,n=parseInt(i/60),i-=60*n,this.surplusTime=this.toFixedZero(a)+":"+this.toFixedZero(n)+":"+this.toFixedZero(i)},getOpenId:function(){var e=location.search.substring(1),t={};return e.replace(/([^=?&]+)=([^=?&]+)/g,function(){for(var e=arguments.length,i=Array(e),a=0;a<e;a++)i[a]=arguments[a];t[i[1]]=i[2]}),t},payFor:function(){if("00:00:00"!=this.surplusTime)if("ALIPAYSM"==this.type){var e=this.payTypes.filter(function(e){return"ALIPAYSM"==e.bankCode})[0].payTal;i.i(n.b)({payTal:e,orderNo:this.orderNo,backUrl:"http://baidu.com",inviteUserId:this.inviterUserId}).then(function(e){var t=e.data,a=t.code,n=(t.data,t.msg);if(0==a)return void(window.location=window.location.origin+"/views/openSuccess/openSuccess.html");i.i(s.a)(n)})}else if("WEIXINPAY"==this.type){var t=this.getOpenId(),a=t.openid,o=this.payTypes.filter(function(e){return"WEIXINPAY"==e.bankCode})[0],r=o.payTal;o.orderNo;i.i(n.b)({openId:a,payTal:r,orderNo:this.orderNo}).then(function(e){var t=e.data,a=t.code,n=(t.data,t.msg);if(0==a){return void(window.location=window.location.origin+"/views/openSuccess/openSuccess.html")}i.i(s.a)(n)})}}},computed:{}}},375:function(e,t){},432:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"app"}},[e.hasHeader?i("sysheader",{attrs:{titleName:e.titleName}}):e._e(),e._v(" "),i("div",{staticClass:"pay-detail"},[i("div",{staticClass:"pay-time"},[e._v("\n      支付剩余时间："),i("span",[e._v(e._s(e.surplusTime))])]),e._v(" "),i("div",{staticClass:"pay-num"},[e._v("\n      ￥"),i("span",[e._v(e._s(e.price))])])]),e._v(" "),i("div",{staticClass:"pay-way"},[i("ul",e._l(e.payTypes,function(t,a){return i("li",{class:e.type==t.bankCode?"pay-item on":"pay-item",on:{click:function(i){e.switchType(t.bankCode)}}},[i("em",{staticClass:"icon-check"}),e._v(" "),i("em",{staticClass:"icon icon-wx",class:"WEIXINPAY"===t.bankCode?"icon icon-wx":"icon icon-zfb"}),e._v(" "),i("div",{staticClass:"text"},[i("p",{class:"WEIXINPAY"===t.bankCode?"":"zfb"},[e._v(e._s("WEIXINPAY"==t.bankCode?"微信":"支付宝支付"))]),e._v(" "),"WEIXINPAY"===t.bankCode?i("span",[e._v("推荐安装微信5.0及以上版本使用")]):e._e()])])}))]),e._v(" "),i("div",{staticClass:"pay-btn",on:{click:e.payFor}},[e._v("\n    确认支付 ￥"),i("span",[e._v(e._s(e.price))])])],1)},staticRenderFns:[]}},86:function(e,t,i){"use strict";i.d(t,"a",function(){return n}),i.d(t,"b",function(){return o});var a=i(10),n=function(e){return i.i(a.a)("queryPayChannel",e)},o=function(e){return i.i(a.a)("orderPay",e)}}},[223]);