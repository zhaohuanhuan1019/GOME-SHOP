webpackJsonp([8],{137:function(t,e,n){n(329),n(328);var i=n(0)(n(249),n(395),"data-v-0c67bdbd",null);t.exports=i.exports},209:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),o=n(137),r=n.n(o),s=(n(25),n(3)),a=(n.n(s),n(5)),c=(n.n(a),n(2)),u=n.n(c),f=n(4);n.n(f);i.default.use(u.a),new i.default({render:function(t){return t(r.a)}}).$mount("#app")},22:function(t,e,n){"use strict";n.d(e,"a",function(){return i});var i="GET_MSG"},23:function(t,e,n){"use strict";function i(t){M&&(t._devtoolHook=M,M.emit("vuex:init",t),M.on("vuex:travel-to-state",function(e){t.replaceState(e)}),t.subscribe(function(t,e){M.emit("vuex:mutation",t,e)}))}function o(t,e){Object.keys(t).forEach(function(n){return e(t[n],n)})}function r(t){return null!==t&&"object"==typeof t}function s(t){return t&&"function"==typeof t.then}function a(t,e,n){if(e.update(n),n.modules)for(var i in n.modules){if(!e.getChild(i))return;a(t.concat(i),e.getChild(i),n.modules[i])}}function c(t,e){return e.indexOf(t)<0&&e.push(t),function(){var n=e.indexOf(t);n>-1&&e.splice(n,1)}}function u(t,e){t._actions=Object.create(null),t._mutations=Object.create(null),t._wrappedGetters=Object.create(null),t._modulesNamespaceMap=Object.create(null);var n=t.state;p(t,n,[],t._modules.root,!0),f(t,n,e)}function f(t,e,n){var i=t._vm;t.getters={};var r=t._wrappedGetters,s={};o(r,function(e,n){s[n]=function(){return e(t)},Object.defineProperty(t.getters,n,{get:function(){return t._vm[n]},enumerable:!0})});var a=k.config.silent;k.config.silent=!0,t._vm=new k({data:{$$state:e},computed:s}),k.config.silent=a,t.strict&&_(t),i&&(n&&t._withCommit(function(){i._data.$$state=null}),k.nextTick(function(){return i.$destroy()}))}function p(t,e,n,i,o){var r=!n.length,s=t._modules.getNamespace(n);if(i.namespaced&&(t._modulesNamespaceMap[s]=i),!r&&!o){var a=g(e,n.slice(0,-1)),c=n[n.length-1];t._withCommit(function(){k.set(a,c,i.state)})}var u=i.context=l(t,s,n);i.forEachMutation(function(e,n){d(t,s+n,e,u)}),i.forEachAction(function(e,n){var i=e.root?n:s+n,o=e.handler||e;m(t,i,o,u)}),i.forEachGetter(function(e,n){v(t,s+n,e,u)}),i.forEachChild(function(i,r){p(t,e,n.concat(r),i,o)})}function l(t,e,n){var i=""===e,o={dispatch:i?t.dispatch:function(n,i,o){var r=y(n,i,o),s=r.payload,a=r.options,c=r.type;return a&&a.root||(c=e+c),t.dispatch(c,s)},commit:i?t.commit:function(n,i,o){var r=y(n,i,o),s=r.payload,a=r.options,c=r.type;a&&a.root||(c=e+c),t.commit(c,s,a)}};return Object.defineProperties(o,{getters:{get:i?function(){return t.getters}:function(){return h(t,e)}},state:{get:function(){return g(t.state,n)}}}),o}function h(t,e){var n={},i=e.length;return Object.keys(t.getters).forEach(function(o){if(o.slice(0,i)===e){var r=o.slice(i);Object.defineProperty(n,r,{get:function(){return t.getters[o]},enumerable:!0})}}),n}function d(t,e,n,i){(t._mutations[e]||(t._mutations[e]=[])).push(function(e){n.call(t,i.state,e)})}function m(t,e,n,i){(t._actions[e]||(t._actions[e]=[])).push(function(e,o){var r=n.call(t,{dispatch:i.dispatch,commit:i.commit,getters:i.getters,state:i.state,rootGetters:t.getters,rootState:t.state},e,o);return s(r)||(r=Promise.resolve(r)),t._devtoolHook?r.catch(function(e){throw t._devtoolHook.emit("vuex:error",e),e}):r})}function v(t,e,n,i){t._wrappedGetters[e]||(t._wrappedGetters[e]=function(t){return n(i.state,i.getters,t.state,t.getters)})}function _(t){t._vm.$watch(function(){return this._data.$$state},function(){},{deep:!0,sync:!0})}function g(t,e){return e.length?e.reduce(function(t,e){return t[e]},t):t}function y(t,e,n){return r(t)&&t.type&&(n=e,e=t,t=t.type),{type:t,payload:e,options:n}}function b(t){k&&t===k||(k=t,$(k))}function w(t){return Array.isArray(t)?t.map(function(t){return{key:t,val:t}}):Object.keys(t).map(function(e){return{key:e,val:t[e]}})}function x(t){return function(e,n){return"string"!=typeof e?(n=e,e=""):"/"!==e.charAt(e.length-1)&&(e+="/"),t(e,n)}}function C(t,e,n){return t._modulesNamespaceMap[n]}/**
 * vuex v2.5.0
 * (c) 2017 Evan You
 * @license MIT
 */
var $=function(t){function e(){var t=this.$options;t.store?this.$store="function"==typeof t.store?t.store():t.store:t.parent&&t.parent.$store&&(this.$store=t.parent.$store)}if(Number(t.version.split(".")[0])>=2)t.mixin({beforeCreate:e});else{var n=t.prototype._init;t.prototype._init=function(t){void 0===t&&(t={}),t.init=t.init?[e].concat(t.init):e,n.call(this,t)}}},M="undefined"!=typeof window&&window.__VUE_DEVTOOLS_GLOBAL_HOOK__,O=function(t,e){this.runtime=e,this._children=Object.create(null),this._rawModule=t;var n=t.state;this.state=("function"==typeof n?n():n)||{}},E={namespaced:{configurable:!0}};E.namespaced.get=function(){return!!this._rawModule.namespaced},O.prototype.addChild=function(t,e){this._children[t]=e},O.prototype.removeChild=function(t){delete this._children[t]},O.prototype.getChild=function(t){return this._children[t]},O.prototype.update=function(t){this._rawModule.namespaced=t.namespaced,t.actions&&(this._rawModule.actions=t.actions),t.mutations&&(this._rawModule.mutations=t.mutations),t.getters&&(this._rawModule.getters=t.getters)},O.prototype.forEachChild=function(t){o(this._children,t)},O.prototype.forEachGetter=function(t){this._rawModule.getters&&o(this._rawModule.getters,t)},O.prototype.forEachAction=function(t){this._rawModule.actions&&o(this._rawModule.actions,t)},O.prototype.forEachMutation=function(t){this._rawModule.mutations&&o(this._rawModule.mutations,t)},Object.defineProperties(O.prototype,E);var j=function(t){this.register([],t,!1)};j.prototype.get=function(t){return t.reduce(function(t,e){return t.getChild(e)},this.root)},j.prototype.getNamespace=function(t){var e=this.root;return t.reduce(function(t,n){return e=e.getChild(n),t+(e.namespaced?n+"/":"")},"")},j.prototype.update=function(t){a([],this.root,t)},j.prototype.register=function(t,e,n){var i=this;void 0===n&&(n=!0);var r=new O(e,n);if(0===t.length)this.root=r;else{this.get(t.slice(0,-1)).addChild(t[t.length-1],r)}e.modules&&o(e.modules,function(e,o){i.register(t.concat(o),e,n)})},j.prototype.unregister=function(t){var e=this.get(t.slice(0,-1)),n=t[t.length-1];e.getChild(n).runtime&&e.removeChild(n)};var k,P=function(t){var e=this;void 0===t&&(t={}),!k&&"undefined"!=typeof window&&window.Vue&&b(window.Vue);var n=t.plugins;void 0===n&&(n=[]);var o=t.strict;void 0===o&&(o=!1);var r=t.state;void 0===r&&(r={}),"function"==typeof r&&(r=r()||{}),this._committing=!1,this._actions=Object.create(null),this._actionSubscribers=[],this._mutations=Object.create(null),this._wrappedGetters=Object.create(null),this._modules=new j(t),this._modulesNamespaceMap=Object.create(null),this._subscribers=[],this._watcherVM=new k;var s=this,a=this,c=a.dispatch,u=a.commit;this.dispatch=function(t,e){return c.call(s,t,e)},this.commit=function(t,e,n){return u.call(s,t,e,n)},this.strict=o,p(this,r,[],this._modules.root),f(this,r),n.forEach(function(t){return t(e)}),k.config.devtools&&i(this)},G={state:{configurable:!0}};G.state.get=function(){return this._vm._data.$$state},G.state.set=function(t){},P.prototype.commit=function(t,e,n){var i=this,o=y(t,e,n),r=o.type,s=o.payload,a=(o.options,{type:r,payload:s}),c=this._mutations[r];c&&(this._withCommit(function(){c.forEach(function(t){t(s)})}),this._subscribers.forEach(function(t){return t(a,i.state)}))},P.prototype.dispatch=function(t,e){var n=this,i=y(t,e),o=i.type,r=i.payload,s={type:o,payload:r},a=this._actions[o];if(a)return this._actionSubscribers.forEach(function(t){return t(s,n.state)}),a.length>1?Promise.all(a.map(function(t){return t(r)})):a[0](r)},P.prototype.subscribe=function(t){return c(t,this._subscribers)},P.prototype.subscribeAction=function(t){return c(t,this._actionSubscribers)},P.prototype.watch=function(t,e,n){var i=this;return this._watcherVM.$watch(function(){return t(i.state,i.getters)},e,n)},P.prototype.replaceState=function(t){var e=this;this._withCommit(function(){e._vm._data.$$state=t})},P.prototype.registerModule=function(t,e,n){void 0===n&&(n={}),"string"==typeof t&&(t=[t]),this._modules.register(t,e),p(this,this.state,t,this._modules.get(t),n.preserveState),f(this,this.state)},P.prototype.unregisterModule=function(t){var e=this;"string"==typeof t&&(t=[t]),this._modules.unregister(t),this._withCommit(function(){var n=g(e.state,t.slice(0,-1));k.delete(n,t[t.length-1])}),u(this)},P.prototype.hotUpdate=function(t){this._modules.update(t),u(this,!0)},P.prototype._withCommit=function(t){var e=this._committing;this._committing=!0,t(),this._committing=e},Object.defineProperties(P.prototype,G);var S=x(function(t,e){var n={};return w(e).forEach(function(e){var i=e.key,o=e.val;n[i]=function(){var e=this.$store.state,n=this.$store.getters;if(t){var i=C(this.$store,"mapState",t);if(!i)return;e=i.context.state,n=i.context.getters}return"function"==typeof o?o.call(this,e,n):e[o]},n[i].vuex=!0}),n}),A=x(function(t,e){var n={};return w(e).forEach(function(e){var i=e.key,o=e.val;n[i]=function(){for(var e=[],n=arguments.length;n--;)e[n]=arguments[n];var i=this.$store.commit;if(t){var r=C(this.$store,"mapMutations",t);if(!r)return;i=r.context.commit}return"function"==typeof o?o.apply(this,[i].concat(e)):i.apply(this.$store,[o].concat(e))}}),n}),I=x(function(t,e){var n={};return w(e).forEach(function(e){var i=e.key,o=e.val;o=t+o,n[i]=function(){if(!t||C(this.$store,"mapGetters",t))return this.$store.getters[o]},n[i].vuex=!0}),n}),N=x(function(t,e){var n={};return w(e).forEach(function(e){var i=e.key,o=e.val;n[i]=function(){for(var e=[],n=arguments.length;n--;)e[n]=arguments[n];var i=this.$store.dispatch;if(t){var r=C(this.$store,"mapActions",t);if(!r)return;i=r.context.dispatch}return"function"==typeof o?o.apply(this,[i].concat(e)):i.apply(this.$store,[o].concat(e))}}),n}),T=function(t){return{mapState:S.bind(null,t),mapGetters:I.bind(null,t),mapMutations:A.bind(null,t),mapActions:N.bind(null,t)}},H={Store:P,install:b,version:"2.5.0",mapState:S,mapMutations:A,mapGetters:I,mapActions:N,createNamespacedHelpers:T};e.a=H},248:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(2);n.n(i),n(23);e.default={props:["tabcontents"],data:function(){return{activeIndex:null}},computed:{},create:function(){},methods:{toggle:function(t){this.activeIndex!==t?this.activeIndex=t:this.activeIndex=null}}}},249:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(442),o=n.n(i),r=n(2);n.n(r),n(23);e.default={components:{Tab:r.Tab,helpCenterContent:o.a},data:function(){return{tabs:["美店运营","商品管理","佣金&提现","返利帮助"],tabcontents:[{"什么是美店":"用户在国美平台上开通的小店，上架平台商品，获取佣金，无需用户自己处理订单、仓储、物流。平台货源，无需囤货，商家跟进，售后无忧。","开美店的条件":"所有国美用户均可开通美店，全民均可参与其中。","关于美店设置":"通过我的美店进入美店设置，在美店设置中，店主可以随时根据当前的运营需要调整美店logo、设置美店介绍","哪里查看订单":"在我的美店中点击订单管理，进入订单管理页面，在订单管理页面可以查看待出库、已出库、已完成、售后订单列表，点击相应的订单可以查看该订单的订单详情。","如何查看我的美店效果":"在我的美店中点击美店预览，进入美店预览页面，即查看美店内所有商品，可选择按分类、上新顺序查看。","有哪些运营方法":"积极分享商品和美店，提高商品和美店的曝光度哦~","销售技巧：怎样分享商品不被朋友屏蔽/拉黑？":"建议把朋友圈进行用户群分组，根据不同属性的组别分享相应商品，每日可更新分享2-6个商品，分享时间间隔5个小时以上，这样朋友既不会感觉刷屏，同时能让朋友定时关注到您的商品。","销售技巧：什么文案能吸引点击？":"推广文案可以结合当下热门新鲜事件、网络用词等，同时也可以用自己平时说话的语气，提高与朋友互动性，这样效果会倍增。","销售技巧：如何提高转化？":"1）塑造自己的风格店铺，切忌对同一个用户群组什么商品都推广，捉住用户需求。（例如学生群体：刚发完四件套又发大家电，捉不住用户需求，转化自然不好。）2）朋友圈信息不能全是推广商品，同时需要推送风景、人物照片/热门新鲜事件等信息，让用户知道您是有生活情调的，不只是推广员，建议个人生活分享和商品分享的比例为3:7。3）提高与用户的互动性，如朋友圈评论、点赞、安慰、问候等，要相信只有和用户建立起信任关系，用户才会依赖于您，订单量自然节节上升。","如何挑选正确的推广商品?":"1、分析用户的需求 <br/> 您可以根据性别、年龄端，结婚、职业等因素划分你的朋友，进行用户群分组归类推广，同时配合自己独特的审美选择货品。<br/>2、根据季节性选择商品<br/> 要有针对性的选择商品，也可以根据最新时尚话题和当季季节来选择商品，提高转化。","一定要先上架商品到美店才能分享商品吗?":"不需要，添加商品时直接分享也可以赚取佣金。"},{"商品都从哪里来":"美店可上架商品均来自国美平台，仓储物流均由专业平台完成，十分可靠哦！","如何上架商品":"在我的美店点击“添加商品至美店”进入好货推荐频道，精选好货直接上架，或者进入商品管理，选择“添加商品”，直接搜索想要上架的商品，精准查找。","如何挑选商品":"好货推荐频道从最热、最新、佣金最高多个维度为您推荐优质商品，无需逐个操作，可将优质商品一键上架至美店，方便快捷。或者通过搜索精准寻找，搜索结果可以按销量、佣金排序，帮你挑选高佣金好口碑的优质商品。","美店商品该如何分享":"美店商品可以通过商品管理与商品详情页的分享控件分享至站内及其他社交平台","商品分类管理":"上架商品时，会带入商品原有分类，自动区分不同种类的商品。通过商品管理→分类管理，可以对分类进行编辑，自定义分类名称、调整商品所在分类、新增分类、设置首页展示。用心管理分类，美店首页大不一样哦~","商品是否有正品保障":"商品经由国美或其商家提供货源、发货、正品保证。","美店可以支持上架自有商品吗":"不可以，目前美店只支持上架国美APP商品。","添加的商品是否有数量限制":"没有数量限制","美店的挑货中心多久上架一次新货":"好货推荐页面精选标签每天更新，banner活动每周更新","商品的佣金是否不会改变":"会修改，商品佣金也是有周期的，偷偷告诉你，大促期间部分商品佣金会比较高哦。"},{"关于商品退换货":"美店订单产生退换货，佣金即失效","佣金是如何计算的":"商品标注佣金为最高可赚取的分享佣金，有顾客直接通过美店或分享链接购买，店主即可获得分享佣金","关于佣金返利模式":"美店店主可享受分享佣金、购买返利；举个栗子1：小明将该商品上架到美店，好友通过他的美店购买，小明即可获得分享佣金；举个栗子2：小明将该商品上架到美店，自己购买了美店商品，获得的就是分享佣金和购买返利之和。","关于佣金到账时间":"顾客在美店中购买商品，商品妥投后7天，佣金就进到美店账户里啦~商品妥投后即将拿到的佣金可以在“待入账佣金”中查看，小钱钱就在路上，不用着急呦~","关于美店账户":"美店账户中可以查看近7天收入、待入账、历史总额。近7天收入：最近一周入账佣金，跟上周比比看有没有进步。待入账：妥投后7天，佣金就进账啦，小钱钱就在路上，不用着急呦~历史总额：从开店起赚得的所有佣金，加油赚多多！","为什么实际获得佣金与跟页面显示不一致":"佣金=商品销售金额×佣金比例，同一型号、款式的商品也可能因为某一时段参与促销价格有所调整，从而导致实际获得佣金与页面显示不一致。","到哪里可以看见自己的返利金额":"在我的店铺页面和我的钱包页面可以看到我的金额","自己购买自己美店的商品也能获得佣金吗":"可以","关于数据统计。":"我的美店首页进入数据统计，可以查看前一天、过去7天以及过去30天的订单量、访客数和佣金，协助店主观测美店数据，调整运营方法。","为什么会有“已失效”的返利？":"国美大部分管理都是与订单挂钩的，因用户自己或者他人下单购买商品而产生； 已失效即待入账的返利对应订单发生取消、退换货行为，返利就会变成已失效状态，这部分钱平台会收回，用户无法获得。"},{"什么是“国美币”":"国美币是国美APP的虚拟货币，1国美币=1元人民币，可用于提现。","“国美币”可提现吗？":"可以","什么是“返利”？":"国美为会员提供的一种赚外快的途径——赚“返利”，在国美平台上，你可以通过很多途径赚到“返利”。“返利”以国美币的形式发放，会直接打入用户的国美币账户（1国美币=1元），你可以直接提现","获得返利的途径":"分享商品给朋友，如果商品有返利标示，朋友购买后，你可以得到返利。","怎样分享商品返利":"“直接分享”和“间接分享”商品，都可以获得返利。<br/>直接分享：你将商品（有返利标示）分享给小美，小美购买了，你可以获得返利。<br/>间接分享：你将商品（有返利标示）分享给小美，小美又分享给小明，小明购买了，这笔返利，你和小美两人按比例瓜分。<br/>注：直接分享和间接分享，你能获得的返利金额不同，具体以实际到账金额为准","是什么美店返利":"美店可以上架很多商品，如果商品带有佣金标示，每卖出一个商品，你都可以获得返利。<br/>美店可以进行个性化装修，有更强的号召力，是时候展示自己的个人魅力啦~"}]}},computed:{},create:function(){}}},25:function(t,e,n){"use strict";var i=n(1),o=n(23),r=n(38),s=n(39),a=(n.n(s),n(40));i.default.use(o.a);var c=new o.a.Store({getters:s,actions:r,modules:{messages:a.a}});e.a=c},328:function(t,e){},329:function(t,e){},372:function(t,e){},38:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),n.d(e,"fun",function(){return o});var i=n(22),o=function(t,e){(0,t.commit)(i.a,e)}},39:function(t,e){},395:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("div",{staticClass:"tabBox"},[n("vu-tabs",{attrs:{sticky:"",color:"#F20C59",height:"0.44rem"}},t._l(t.tabs,function(e,i){return n("vu-tab",{key:t.tabs.index,attrs:{title:e}},[n("helpCenterContent",{attrs:{tabcontents:t.tabcontents[i]}})],1)}))],1)])},staticRenderFns:[]}},40:function(t,e,n){"use strict";var i=n(75),o=n.n(i),r=n(22),s={msg:"我是原始数据"},a=o()({},r.a,function(t,e){t.msg=e}),c={msg:function(t){return t.msg}};e.a={state:s,mutations:a,getters:c}},430:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",t._l(t.tabcontents,function(e,i,o){return n("div",{staticClass:"helpContentBox"},[n("div",{staticClass:"titleBox",on:{click:function(e){t.toggle(o)}}},[n("span",{staticClass:"helpTitle",class:{activeText:o===t.activeIndex}},[t._v(t._s(i))]),n("span",{staticClass:"helpIconDown",class:{activeIcon:o===t.activeIndex}})]),t._v(" "),n("p",{directives:[{name:"show",rawName:"v-show",value:o===t.activeIndex,expression:"index === activeIndex"}],staticClass:"helpContent",domProps:{innerHTML:t._s(e)}})])}))},staticRenderFns:[]}},442:function(t,e,n){n(372);var i=n(0)(n(248),n(430),"data-v-a7acc366",null);t.exports=i.exports}},[209]);