webpackJsonp([6],{150:function(t,e,s){s(366);var a=s(0)(s(264),s(424),null,null);t.exports=a.exports},151:function(t,e,s){s(346),s(347);var a=s(0)(s(265),s(408),"data-v-29258c8d",null);t.exports=a.exports},152:function(t,e,s){s(353);var a=s(0)(s(268),s(413),"data-v-31fe362d",null);t.exports=a.exports},201:function(t,e,s){"use strict";s.d(e,"a",function(){return i}),s.d(e,"b",function(){return n});var a=(s(27),s(19),s(10)),i=function(t){return s.i(a.a)("orderDetail",t)},n=function(t){return s.i(a.a)("asaleDetail",t)}},202:function(t,e,s){"use strict";s.d(e,"a",function(){return i}),s.d(e,"b",function(){return n});var a=(s(27),s(19),s(10)),i=function(t){return s.i(a.a)("orderList",t)},n=function(t){return s.i(a.a)("orderFinishedList",t)}},222:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s(7),i=s.n(a),n=s(6),r=s.n(n),o=s(1),d=s(26),c=s(152),l=s.n(c),u=s(5),v=(s.n(u),s(3)),p=(s.n(v),s(12)),m=s(9),_=s(2),f=s.n(_),g=s(4),h=(s.n(g),s(151)),y=s.n(h),C=s(150),I=s.n(C),b=function(){var t=r()(i.a.mark(function t(){return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,m.default.getHeader();case 2:new o.default({router:T,render:function(t){return t(l.a)}}).$mount("#app");case 3:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}();o.default.use(f.a);var x=[{path:"/",component:y.a},{path:"/detail",component:I.a}];o.default.use(d.a);var T=new d.a({routes:x});navigator.userAgent.match(/(Android);?[\s\/]+([\d.]+)?/)?p.default.connectWebViewJavascriptBridge(function(t){b(),t.init(function(t,e){console.log("JS got a message",t);var s={"Javascript Responds":"测试中文!"};console.log("JS responding with",s),e(s)})}):p.default.setupWebViewJavascriptBridge(function(t){b()})},264:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s(29),i=s.n(a),n=s(7),r=s.n(n),o=s(6),d=s.n(o),c=s(201),l=s(9),u=s(21),v=s(446),p=s.n(v),m=this;e.default={data:function(){return{id:0,shopType:2,mshopId:0,returnRequestId:"",data:{},show:!0,msg:""}},ready:function(){console.log("id: "+this.$route.params.id),console.log("shopType: "+this.$route.params.shopType)},created:function(){sessionStorage.setItem("orderOneLevel",2);var t=this,e=this.$route.query.id?this.$route.query.id:0,a=this.$route.query.mshopId?this.$route.query.mshopId:0,i=this.$route.query.returnRequestId,n=this.$route.query.shopType?this.$route.query.shopType:2;this.showMsg("loading..."),/^\d+$/.test(e)&&/^\d+$/.test(n)&&0!=e?(this.setMytitle("订单详情"),t.id=e,t.shopType=n,s.i(c.a)({id:t.id,shopType:t.shopType}).then(function(e){var s=e.data;0==s.code?(t.show=!1,t.data=s.data):t.showMsg(s.msg)}).catch(function(e){t.showMsg(e)})):/^\d+$/.test(a)&&""!==i&&0!=a?(t.mshopId=a,t.returnRequestId=i,s.i(c.b)({mshopId:t.mshopId,returnRequestId:t.returnRequestId}).then(function(e){var s=e.data;if(0==s.code){t.show=!1,t.data=s.data;var a=""+s.data.typeDesc;a=a.split("单")[0],t.data.typeDesc=a,t.setMytitle(a+"详情")}else t.showMsg(s.msg),t.setMytitle("售后详情")}).catch(function(e){t.showMsg(e)})):(this.setMytitle("订单详情"),this.showMsg("参数不合法!"))},methods:{setMytitle:function(t){var e=this;return d()(r.a.mark(function s(){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l.default.setTitle(t);case 2:case"end":return e.stop()}},s,e)}))()},filters:function(t){m.data=t},showMsg:function(t){m.show=!0,m.msg=t},nodeClick:function(t){console.log(JSON.parse(i()(t)))},dbClick:function(t){},ftime:function(t){return s.i(u.b)(t)},fmoney:function(t,e){return s.i(u.c)(t,e)},getDetail:function(){var t={code:0,msg:"OK",data:{id:2512866516,status:1,statusDesc:"待出库",payType:1,payTypeDesc:"在线支付",orderType:1,shop:{id:1965,name:"国美月宝贝⬆小店"},seller:{id:100037436516,name:""},buyer:{id:100037510486,name:"小金牛",mobile:"135****2750"},consignee:{name:"lw测试",mobile:"135****9777",phone:"",address:"北京北京市朝阳区朝外街道",idCard:""},delivery:{timeType:0,timeTypeDesc:"",needConfirmation:!1,memo:""},invoice:{type:0,typeDesc:"",titleType:0,title:"",content:""},hasInvoice:0,hasLogistics:!0,quantity:1,orderAmount:5e4,paymentAmount:5e4,shippingCost:0,orderTime:1500608837467,paymentTime:0,deliveryTime:0,confirmationTime:0,platformCouponMoney:0,shopCouponMoney:0,shopDiscountMoney:0,onePurchaseMoney:0,gomeMoney:0,mshopCommission:108,splitType:1,orderItems:[{id:2512866516,quantity:1,hasComment:!0,orderAmount:5e4,paymentAmount:5e4,sku:{id:"sku20910020",image:"http://img.atguat.net.cn/image/sku20910020_80.jpg",price:5e4,item:{id:"sku20910020",name:"华为（HUAWEI）mate9/Mate9 全网通 移动联通电信4G手机 5.9英寸大屏 八核 双卡双待/华为mate9(月光银 全网通版)"},attributes:[]},mshop:{id:1965,name:"国美月宝贝⬆小店"},activities:[]}]}};m.data=t.data}},components:{VueItems:p.a}}},265:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s(7),i=s.n(a),n=s(6),r=s.n(n),o=s(445),d=s.n(o),c=s(9),l=s(202);e.default={components:{orderListItem:d.a},beforeCreate:function(){c.default.setTitle(""+document.title)},created:function(){sessionStorage.getItem("orderOneLevel")||sessionStorage.setItem("orderOneLevel",1);for(var t=["待出库","已出库","已完成","售后"],e=0;e<4;e++)this.tabs.push({index:e+2,title:t[e],pageNum:1,pageSize:20,total:0,list:[]});this.tabReady(),window.WebViewJavascriptBridge.registerHandler("nativeToJsGoBack",function(t){"1"===sessionStorage.getItem("orderOneLevel")&&c.default.backNative(0),sessionStorage.setItem("orderOneLevel",1)})},methods:{getUserInfo:function(){var t=this;return r()(i.a.mark(function e(){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.default.getMyInfo();case 2:t.userInfo=e.sent;case 3:case"end":return e.stop()}},e,t)}))()},getList:function(){var t=this;return r()(i.a.mark(function e(){var a,n,r;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.tabs[t.tabIndex],e.next=3,s.i(l.a)({mshopId:t.userInfo.shopId,orderStatus:a.index,pageNum:a.pageNum,pageSize:a.pageSize});case 3:if(n=e.sent,r=n.data,1===a.pageNum&&(a.list=[]),r=r.data){e.next=9;break}return e.abrupt("return",!1);case 9:r.total?a.total=r.total||0:a.total=0,r.orders&&r.orders.length>0?a.list=a.list.concat(r.orders):a.list=[];case 11:case"end":return e.stop()}},e,t)}))()},finishedList:function(){var t=this;return r()(i.a.mark(function e(){var a,n,r;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.tabs[t.tabIndex],e.next=3,s.i(l.b)({mshopId:t.userInfo.shopId,pageNum:a.pageNum,pageSize:a.pageSize});case 3:if(n=e.sent,r=n.data,1===a.pageNum&&(a.list=[]),r=r.data){e.next=9;break}return e.abrupt("return",!1);case 9:r.pageInfo&&r.pageInfo.totalRecords?a.total=r.pageInfo.totalRecords||0:a.total=0,r.orders&&r.orders.length>0?a.list=a.list.concat(r.orders):a.list=[];case 11:case"end":return e.stop()}},e,t)}))()},nextList:function(t){var e=this;return r()(i.a.mark(function s(){var a;return i.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:if(a=e.tabs[e.tabIndex],!(a.pageNum*a.pageSize>a.total)){s.next=4;break}return t.onBottomLoaded(),s.abrupt("return",!0);case 4:return a.pageNum+=1,3!==e.tabIndex?e.getList():e.finishedList(),t.onBottomLoaded(),s.abrupt("return",!0);case 8:case"end":return s.stop()}},s,e)}))()},changeTabs:function(t){if(this.tabIndex===t)return!1;this.tabIndex=t,this.$router.push({path:"/",query:{type:t}})},tabReady:function(){var t=this;return r()(i.a.mark(function e(){var s,a,n;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return s=0,a=t.$route.query,a&&a.type&&(n=parseInt(a.type),s=isNaN(n)?0:n),t.tabIndex=s<0||s>3?0:s,e.next=6,t.getUserInfo();case 6:if(t.tabs[t.tabIndex].pageNum=1,!(s<3)){e.next=12;break}return e.next=10,t.getList();case 10:e.next=14;break;case 12:return e.next=14,t.finishedList();case 14:case"end":return e.stop()}},e,t)}))()}},watch:{$route:function(t){this.tabReady()}},data:function(){return{tabs:[],tabIndex:-1,userInfo:{}}}}},266:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"orderListItem",props:{list:{type:Array,default:function(){return[]}},tabIndex:{type:Number,default:0},userInfo:{type:Object,default:function(){return{}}}},data:function(){return{}},methods:{serviceType:function(t){return 2===t?"退货":3===t?"换货":""},moreList:function(){this.$emit("next-page",this.$refs.loadmore)},gotoDetail:function(t){var e={};e=3===this.tabIndex?{mshopId:this.userInfo.shopId,returnRequestId:t.id}:{id:t.id,shopType:2},this.$router.push({path:"detail",query:e})}}}},267:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s(1),i=s(21),n=this;e.default={data:function(){return{items:[]}},props:{list:{type:Array,twoWay:!0},func:{type:Function,default:null},expand:{type:Function,default:null}},created:function(){console.log(this.list),this.initData()},methods:{initData:function(){n.items=n.list},calls:function(t){"function"==typeof n.func?n.func.call(null,t):console.log(t)},fmoney:function(t,e){return s.i(i.c)(t,e)}},update:function(){this.initData()},mounted:function(){var t=this;a.default.nextTick(function(){t.initData()})}}},268:function(t,e){},333:function(t,e){},346:function(t,e){},347:function(t,e){},353:function(t,e){},355:function(t,e){},356:function(t,e){},366:function(t,e){},398:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.list.length>0?s("div",t._l(t.list,function(e){return s("div",{key:e.id,staticClass:"order-detail--goods",attrs:{callback:t.func},on:{click:function(s){t.calls(e)}}},[s("img",{staticClass:"goods-logo",attrs:{alt:"商品缩略图",src:e.sku.image}}),t._v(" "),s("div",{staticClass:"goods-content"},[s("span",{staticClass:"goods-name"},[t._v(t._s(e.sku.item.name))]),t._v(" "),s("div",{staticClass:"goods-msg"},[s("span",[t._v("¥"+t._s(t.fmoney(e.sku.price)))]),t._v(" "),s("span",[t._v("x"+t._s(e.quantity))])])])])})):t._e()},staticRenderFns:[]}},408:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"order-list--container"},[s("vu-tabs",{staticClass:"order-tabs",attrs:{active:t.tabIndex,color:"#F20C59"},on:{click:t.changeTabs}},t._l(t.tabs,function(t){return s("vu-tab",{key:t.index,attrs:{title:t.title}})})),t._v(" "),t.tabs[t.tabIndex].list&&t.tabs[t.tabIndex].list.length>0?[s("order-list-item",{attrs:{userInfo:t.userInfo,tabIndex:t.tabIndex,list:t.tabs[t.tabIndex].list},on:{"next-page":t.nextList}})]:[t._m(0)]],2)},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"order-nodata"},[s("i",{staticClass:"order-nodata-logo"}),t._v(" "),s("div",{staticClass:"order-nodata-tip"},[t._v("您还没有相关订单")])])}]}},413:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("router-view")],1)},staticRenderFns:[]}},415:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"order-list--item"},[t.list&&t.list.length>0?[3!==t.tabIndex?[s("vu-loadmore",{ref:"loadmore",attrs:{autoFill:!1,"bottom-method":t.moreList}},[s("vu-list",{attrs:{list:t.list},scopedSlots:t._u([{key:"default",fn:function(e){return[s("div",{staticClass:"order-list--title"},[s("span",[t._v("美店订单号："+t._s(e.listItem.orderItems.length>1?e.listItem.mergerId:e.listItem.id))]),t._v(" "),s("span",{staticClass:"order-list--status"},[t._v(t._s(e.listItem.statusDesc))])]),t._v(" "),t._l(e.listItem.orderItems,function(a){return s("div",{staticClass:"order-list--goods",on:{click:function(s){t.gotoDetail(e.listItem)}}},[s("img",{staticClass:"goods-logo",attrs:{src:a.sku.image,alt:"商品缩略图"}}),t._v(" "),s("div",{staticClass:"goods-content"},[s("span",{staticClass:"goods-name"},[t._v(t._s(a.sku.item.name))]),t._v(" "),s("div",{staticClass:"goods-msg"},[s("span",[t._v("¥"+t._s((Number(a.sku.price)/100).toFixed(2)))]),t._v(" "),s("span",[t._v("x"+t._s(a.quantity))])])])])}),t._v(" "),s("div",{staticClass:"order-list--price"},[s("div",{staticClass:"goods-paid"},[s("span",[t._v("共"),s("span",{staticClass:"goods-paid--count"},[t._v(t._s(e.listItem.quantity))]),t._v("件商品")]),t._v(" "),s("span",[t._v("实付："),s("span",{staticClass:"goods-paid--sum"},[t._v("¥"+t._s((Number(e.listItem.paymentAmount)/100).toFixed(2)))])])]),t._v(" "),s("div",{staticClass:"goods-commission"},[s("span",[t._v("佣金："),s("span",{staticClass:"goods-commission--sum"},[t._v("¥"+t._s((Number(e.listItem.mshopCommission)/100).toFixed(2)))])])])])]}}])})],1)]:[s("vu-loadmore",{ref:"loadmore",attrs:{autoFill:!1,"bottom-method":t.moreList}},[s("vu-list",{attrs:{list:t.list},scopedSlots:t._u([{key:"default",fn:function(e){return[s("div",{staticClass:"order-list--title"},[s("span",[t._v(t._s(t.serviceType(e.listItem.type))+"单号："+t._s(e.listItem.id))]),t._v(" "),s("span",{staticClass:"order-list--status"},[t._v(t._s(e.listItem.statusDesc))])]),t._v(" "),t._l(e.listItem.orderItems,function(a){return s("div",{staticClass:"order-list--goods",on:{click:function(s){t.gotoDetail(e.listItem)}}},[s("img",{staticClass:"goods-logo",attrs:{src:a.sku.image,alt:"商品缩略图"}}),t._v(" "),s("div",{staticClass:"goods-content"},[s("span",{staticClass:"goods-name"},[t._v(t._s(a.sku.item.name))]),t._v(" "),s("div",{staticClass:"goods-msg"},[s("span",[t._v("¥"+t._s((Number(a.sku.price)/100).toFixed(2)))]),t._v(" "),s("span",[t._v("x"+t._s(a.quantity))])])])])}),t._v(" "),s("div",{staticClass:"order-list--price"},[s("div",{staticClass:"goods-paid"},[s("span",[t._v("\n\t\t\t          \t"+t._s(t.serviceType(e.listItem.type))+"数量：\n\t\t\t          \t"),s("span",{staticClass:"goods-paid--count"},[t._v(t._s(e.listItem.quantity))])]),t._v(" "),s("span",[t._v("\n\t\t\t          \t"+t._s(t.serviceType(e.listItem.type))+"金额：\n\t\t\t          \t"),s("span",{staticClass:"goods-paid--sum"},[t._v("¥"+t._s((Number(e.listItem.refundAmount)/100).toFixed(2)))])])])])]}}])})],1)]]:t._e()],2)},staticRenderFns:[]}},424:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"order-detail--container"},[[s("ul",{staticClass:"order-detail"},[s("li",{staticClass:"order-nodata"},[t._v("\n        "+t._s(t.msg)+"\n      ")])])],t._v(" "),t.data.id&&t.id?[s("ul",{staticClass:"order-detail"},[s("li",{staticClass:"order-detail--item"},[s("div",{staticClass:"order-detail--title"},[s("span",[t._v("美店订单号："+t._s(t.id))]),t._v(" "),s("span",{staticClass:"order-detail--status"},[t._v(t._s(t.data.statusDesc))])]),t._v(" "),s("div",{staticClass:"order-detail--title order-detail--delivery"},[s("span",[t._v("收货人："+t._s(t.data.consignee.name))]),t._v(" "),s("span",[t._v(t._s(t.data.consignee.mobile))])]),t._v(" "),s("div",{staticClass:"order-detail--address"},[s("i",{staticClass:"order-detail--pos"}),t._v(t._s(t.data.consignee.address)+"\t    \t\n          ")]),t._v(" "),s("div",{staticClass:"order-detail--cline"}),t._v(" "),t._m(0),t._v(" "),s("div",{staticClass:"order-detail--msg"},[s("span",[t._v("买家昵称：")]),t._v(" "),s("span",[t._v(t._s(t.data.buyer.name))])]),t._v(" "),s("div",{staticClass:"order-detail--msg"},[s("span",[t._v("买家手机号码：")]),t._v(" "),s("span",[t._v(t._s(t.data.buyer.mobile))])]),t._v(" "),s("div",{staticClass:"order-detail--msg"},[s("span",[t._v("支付方式")]),t._v(" "),s("span",[t._v(t._s(t.data.payTypeDesc))])])]),t._v(" "),t.data.orderItems.length>0?s("li",{staticClass:"order-detail--item"},[t._m(1),t._v(" "),s("vue-items",{attrs:{list:t.data.orderItems,func:t.nodeClick},on:{"update:list":function(e){t.$set(t.data,"orderItems",e)}}})],1):t._e(),t._v(" "),s("li",{staticClass:"order-detail--info"},[s("div",{staticClass:"order-detail--price"},[s("div",{staticClass:"goods-paid"},[s("span",[t._v("实付金额(含运费)：")]),t._v(" "),s("span",{staticClass:"goods-paid--sum"},[t._v("¥"+t._s(t.fmoney(t.data.paymentAmount+t.data.shippingCost)))])]),t._v(" "),s("div",{staticClass:"goods-commission"},[s("span",[t._v("佣金：")]),t._v(" "),s("span",{staticClass:"goods-commission--sum"},[t._v("¥"+t._s(t.fmoney(t.data.mshopCommission)))])])])])]),t._v(" "),s("div",{staticClass:"order-detail--time"},[t.data.orderTime?s("div",[t._v("下单时间:"+t._s(t.ftime(t.data.orderTime)))]):t._e(),t._v(" "),t.data.deliveryTime?s("div",[t._v("发货时间:"+t._s(t.ftime(t.data.deliveryTime)))]):t._e(),t._v(" "),t.data.confirmationTime?s("div",[t._v("确认时间:"+t._s(t.ftime(t.data.confirmationTime)))]):t._e()])]:t._e(),t._v(" "),t.data.id&&t.mshopId?[s("ul",{staticClass:"order-detail"},[s("li",{staticClass:"order-detail--item"},[s("div",{staticClass:"order-detail--title"},[s("span",[t._v(t._s(t.data.typeDesc)+"单号："+t._s(t.returnRequestId))]),t._v(" "),s("span",{staticClass:"order-detail--status"},[t._v(t._s(t.data.statusDesc))])]),t._v(" "),t._m(2),t._v(" "),s("vue-items",{attrs:{list:t.data.orderItems,func:t.nodeClick},on:{"update:list":function(e){t.$set(t.data,"orderItems",e)}}})],1),t._v(" "),s("li",{staticClass:"order-detail--item"},[s("div",{staticClass:"order-detail--title"},[s("span",[t._v(t._s(t.data.typeDesc)+"信息")])]),t._v(" "),s("div",{staticClass:"order-detail--msg"},[s("span",[t._v(t._s(t.data.typeDesc)+"订单号：")]),s("span",[t._v(t._s(t.data.id))])]),t._v(" "),s("div",{staticClass:"order-detail--msg"},[s("span",[t._v(t._s(t.data.typeDesc)+"数量：")]),s("span",[t._v(t._s(t.data.quantity))])]),t._v(" "),s("div",{staticClass:"order-detail--msg"},[s("span",[t._v(t._s(t.data.typeDesc)+"金额：")]),s("span",[t._v("¥"+t._s(t.fmoney(t.data.refundAmount)))])]),t._v(" "),s("div",{staticClass:"order-detail--msg"},[s("span",[t._v(t._s(t.data.typeDesc)+"原因：")]),s("span",[t._v(t._s(t.data.reason))])]),t._v(" "),s("div",{staticClass:"order-detail--msg"},[s("span",[t._v(t._s(t.data.typeDesc)+"说明：")]),s("span",[t._v(t._s(t.data.memo))])])]),t._v(" "),s("li",{staticClass:"order-detail--item"},[s("div",{staticClass:"order-detail--title order-detail--delivery"},[s("span",[t._v("收货人："+t._s(t.data.consignee.name))]),t._v(" "),s("span",[t._v(t._s(t.data.consignee.mobile))])]),t._v(" "),s("div",{staticClass:"order-detail--address"},[s("i",{staticClass:"order-detail--pos"}),t._v(t._s(t.data.consignee.address)+"       \n          ")]),t._v(" "),s("div",{staticClass:"order-detail--cline"})]),t._v(" "),s("li",{staticClass:"order-detail--item"},[t._m(3),t._v(" "),s("div",{staticClass:"order-detail--msg"},[s("span",[t._v("买家昵称：")]),t._v(" "),s("span",[t._v(t._s(t.data.buyer.name))])]),t._v(" "),s("div",{staticClass:"order-detail--msg"},[s("span",[t._v("买家手机号码：")]),t._v(" "),s("span",[t._v(t._s(t.data.buyer.mobile))])]),t._v(" "),s("div",{staticClass:"order-detail--msg"},[s("span",[t._v("支付方式")]),t._v(" "),s("span",[t._v(t._s(t.data.payTypeDesc))])])]),t._v(" "),s("div",{staticStyle:{clear:"both"}}),t._v(" "),s("div",{staticClass:"order-detail--time"},[t.data.applyTime?s("div",[t._v("申请时间:"+t._s(t.ftime(t.data.applyTime)))]):t._e(),t._v(" "),t.data.acceptanceTime?s("div",[t._v(t._s(t.data.typeDesc)+"受理:"+t._s(t.ftime(t.data.acceptanceTime)))]):t._e(),t._v(" "),t.data.confirmationTime?s("div",[t._v(t._s(t.data.typeDesc)+"完成:"+t._s(t.ftime(t.data.confirmationTime)))]):t._e()])])]:t._e()],2)},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"order-detail--title"},[s("span",[t._v("买家信息")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"order-detail--title"},[s("span",[t._v("商品信息")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"order-detail--title"},[s("span",[t._v("商品信息")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"order-detail--title"},[s("span",[t._v("买家信息")])])}]}},445:function(t,e,s){s(355),s(356);var a=s(0)(s(266),s(415),"data-v-3b6fa7c0",null);t.exports=a.exports},446:function(t,e,s){s(333);var a=s(0)(s(267),s(398),"data-v-1186a1ba",null);t.exports=a.exports}},[222]);