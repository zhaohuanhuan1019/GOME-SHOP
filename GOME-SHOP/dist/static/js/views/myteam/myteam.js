webpackJsonp([16],{146:function(t,e,o){o(348),o(349);var a=o(0)(o(260),o(409),"data-v-2a998b37",null);t.exports=a.exports},218:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=o(1),s=o(146),n=o.n(s),i=o(5),r=(o.n(i),o(3)),c=(o.n(r),o(2)),l=o.n(c),d=o(4);o.n(d);a.default.use(l.a),function(){new a.default({render:function(t){return t(n.a)}}).$mount("#app")}()},260:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=o(7),s=o.n(a),n=o(6),i=o.n(n),r=o(36),c=o(65),l=o.n(c),d=o(8),u=o(11);e.default={components:{broheader:l.a},data:function(){return{recordList:[],bottomStatus:"",allLoaded:!1,bottomPullText:"上拉加载更多",bottomDropText:"释放更新",bottomLoadingText:"加载中...",totalRecords:120,pageNo:0,pageSize:20,titleName:"我的团队",inWechat:!1}},created:function(){var t=this;return i()(s.a.mark(function e(){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.getMyTeamList();case 1:case"end":return e.stop()}},e,t)}))()},mounted:function(){d.b.wechat&&(this.inWechat=!0)},methods:{timestampToDate:function(t){17===t.length&&(t=t.substr(0,13));var e=new Date(Number(t));return e.getFullYear()+"-"+(e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1)+"-"+(e.getDate()<10?"0"+e.getDate():e.getDate())+" "+(e.getHours()<10?"0"+e.getHours():e.getHours())+":"+(e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes())},loadBottom:function(){this.recordList.length<this.totalRecords&&this.getMyTeamList(),this.$refs.loadmoreTeamMembers.onBottomLoaded()},getMyTeamList:function(){var t=this;return i()(s.a.mark(function e(){var a,n,i,c,l;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.i(r.d)({pageNo:t.pageNo+1,pageSize:t.pageSize});case 2:if(a=e.sent,0===a.data.code){for(n=a.data.data.myTeamInfoVOList,i=a.data.data.pageBean,c=0,l=n.length;c<l;c++)n[c].time=t.timestampToDate(n[c].inviteTime.toString()),t.recordList.push(n[c]);t.pageNo=i.currentPage,t.totalRecords=i.totalCount}else o.i(u.b)(location.href,a);t.recordList.length>=t.totalRecords&&(t.bottomPullText="数据已全部加载完毕",t.bottomDropText="数据已全部加载完毕",t.bottomLoadingText="数据已全部加载完毕");case 5:case"end":return e.stop()}},e,t)}))()},testGetList:function(){for(var t=0;t<40;t++){var e={headImage:"http://gfs11.atguat.net.cn/T1o4KTBTWQ1RCvBVdK.png",inviteRebate:"1000",inviteTime:this.timestampToDate("13256484919159116"),level:"vip",username:"first"+t};this.recordList.push(e)}this.recordList.length>=this.totalRecords&&(this.bottomPullText="数据已全部加载完毕",this.bottomDropText="数据已全部加载完毕",this.bottomLoadingText="数据已全部加载完毕")},handleBottomChange:function(t){this.bottomStatus=t},invite:function(){location.href="/views/inviteVIP/inviteVIP.html"}}}},348:function(t,e){},349:function(t,e){},409:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"records-box"},[o("broheader",{attrs:{titleName:t.titleName}}),t._v(" "),o("div",{class:t.inWechat?"container-inwechat":"container-notwechat"},[t.recordList.length>0?o("div",{staticClass:"records-num-box"},[o("div",{staticClass:"records-num"},[o("span",[t._v("直属下级 ("+t._s(t.recordList.length)+")")])])]):t._e(),t._v(" "),t.recordList.length>0?o("div",{staticClass:"records-content"},[o("vu-loadmore",{ref:"loadmoreTeamMembers",staticClass:"loadmore-component",attrs:{"auto-fill":!1,"bottom-method":t.loadBottom,"bottom-all-loaded":t.allLoaded,"bottom-pull-text":t.bottomPullText,"bottom-drop-text":t.bottomDropText,"bottom-loading-text":t.bottomLoadingText},on:{"bottom-status-change":t.handleBottomChange}},[o("ul",{staticClass:"records-list"},t._l(t.recordList,function(e){return o("li",{staticClass:"record-item"},[o("div",{staticClass:"record-img-box"},[o("img",{staticClass:"record-img",attrs:{src:e.headImage}})]),t._v(" "),o("div",{staticClass:"record-info"},[o("p",{staticClass:"record-name"},[o("nobr",[o("span",{staticClass:"name"},[t._v(t._s(e.username))])]),t._v(" "),"vip"===e.level.toLowerCase()?o("span",{staticClass:"vip-flag"}):o("span",{staticClass:"svip-flag"}),t._v(" "),e.directFlag?o("span",{staticClass:"direct-invitation-flag"}):t._e()],1),t._v(" "),o("p",{staticClass:"record-time"},[t._v("邀请时间 "+t._s(e.time))])])])}))])],1):t._e(),t._v(" "),0==t.recordList.length?o("div",{staticClass:"no-records"},[o("div",{staticClass:"no-icon"}),t._v(" "),o("p",{staticClass:"no-content"},[t._v("暂无团队成员，快去邀请吧~")]),t._v(" "),o("vu-button",{staticClass:"no-btn",on:{click:t.invite}},[t._v("立即邀请")])],1):t._e()])],1)},staticRenderFns:[]}}},[218]);