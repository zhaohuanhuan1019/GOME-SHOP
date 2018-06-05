<template>
	<div class="order-list--container">
		<vu-tabs :active="tabIndex" color="#F20C59" @click="changeTabs" class="order-tabs">
	    <vu-tab :title="tab.title" v-for="tab in tabs" :key="tab.index">
	    </vu-tab>
	  </vu-tabs>
	  <template v-if="tabs[tabIndex].list && tabs[tabIndex].list.length > 0">
	  	<order-list-item @next-page="nextList" :userInfo="userInfo" :tabIndex="tabIndex" :list="tabs[tabIndex].list"></order-list-item>
    </template>
    <template v-else>
    	<div class="order-nodata">
		    <i class="order-nodata-logo"></i>
		    <div class="order-nodata-tip">您还没有相关订单</div>
		  </div>
    </template>
	</div>
</template>
<script>
import orderListItem from './orderListItem'
import jsBridge from 'common/js/jsbridge.js'
import { fetchList, fetchFinishedList } from '@/api/orderList'
export default {
  components: {
    orderListItem
  },
  beforeCreate () {
    jsBridge.setTitle(''+document.title);
  },
  created () {
    // 添加是否为一级页面标识
    if(!sessionStorage.getItem('orderOneLevel')){
      sessionStorage.setItem('orderOneLevel', 1)
    }
    let title = ['待出库', '已出库', '已完成', '售后']
    for (let i = 0; i < 4; i++) {
      this.tabs.push({
        index: i + 2,
        title: title[i],
        pageNum: 1,
        pageSize: 20,
        total: 0,
        list: []
      })
    }
    this.tabReady()
    window.WebViewJavascriptBridge.registerHandler("nativeToJsGoBack", (data) => {
      if (sessionStorage.getItem('orderOneLevel') === '1') {
        jsBridge.backNative(0)
      }
      sessionStorage.setItem('orderOneLevel', 1)
    }) 
  },
  methods: {
    async getUserInfo () {
      this.userInfo = await jsBridge.getMyInfo()
    },
    async getList () {
    	let tab = this.tabs[this.tabIndex]
    	let { data } = await fetchList({
        mshopId: this.userInfo.shopId,//1965,
        orderStatus: tab.index,
        pageNum: tab.pageNum,
        pageSize: tab.pageSize
      })
      if (tab.pageNum === 1) {
        tab.list = []
      }
      data = data.data
      if (!data) {
        return false
      }
      if (data.total) {
        tab.total = data.total || 0
      } else {
        tab.total = 0
      }
      if(data.orders && data.orders.length > 0) {
        tab.list = tab.list.concat(data.orders)
      } else {
        tab.list = []
      }
    },
    async finishedList () {
      let tab = this.tabs[this.tabIndex]
      let { data } = await fetchFinishedList({
        mshopId: this.userInfo.shopId,//1965,
        pageNum: tab.pageNum,
        pageSize: tab.pageSize
      })
      if (tab.pageNum === 1) {
        tab.list = []
      }
      data = data.data
      if (!data) {
        return false
      }
      if (data.pageInfo && data.pageInfo.totalRecords) {
        tab.total = data.pageInfo.totalRecords || 0
      } else {
        tab.total = 0
      }
      if (data.orders && data.orders.length > 0) {
        tab.list = tab.list.concat(data.orders)
      } else {
        tab.list = []
      }
    },
    async nextList (loadmore) {
    	let tab = this.tabs[this.tabIndex]
    	if (tab.pageNum * tab.pageSize > tab.total) {
    		loadmore.onBottomLoaded()
    		return true
    	}
    	tab.pageNum += 1
      
    	if (this.tabIndex !== 3) {
    		this.getList()
    	} else {
				this.finishedList()
    	}
    	loadmore.onBottomLoaded()
      return true
    },
    changeTabs (index) {
      if (this.tabIndex === index) {
        return false
      }
      this.tabIndex = index
      this.$router.push({
        path: '/',
        query: {
          type: index
        }
      })
    },
    async tabReady () {
      let type = 0
      let query = this.$route.query
      if (query && query.type) {
        let temp = parseInt(query.type)
        type = isNaN(temp) ? 0 : temp
      }
      this.tabIndex = (type < 0 || type > 3) ? 0 : type
      await this.getUserInfo()
      // this.tabs[this.tabIndex].list = []
      this.tabs[this.tabIndex].pageNum = 1
      if (type < 3) {
        await this.getList()
      } else {
        await this.finishedList()
      }
    }
  },
  watch: {
    $route (curVal) {
      this.tabReady()
    },
    /*
  	tabIndex (curVal, oldVal) {
      if (oldVal === -1) {
        return false
      }
  		if (this.tabIndex === 3) { // 售后列表
  			this.finishedList()
  			return false
  		}
  		this.getList() // 非售后列表
  	}*/
  },
  data() {
    return {
    	tabs: [],
    	tabIndex: -1,
      userInfo: {}
    }
  }
}
</script>
<style lang="scss" >
  .order-list--container {
    .order-tabs .vu-tabs__wrap {
      height: .44rem;
    }
  }
</style>
<style lang="scss" scoped>
	@import '../../../../common/css/mixin';
	div.vu-tabs--line {
	  padding-top: .04rem;
	}
	.order-list--container {
		width: 100%;
	  position: absolute;
	  top: 0;
	  bottom: 0;
	  font-size: 12px;
	  color: #262C32;
	  div.order-tabs {
			position: fixed;
	    top: 0;
	    left: 0;
	    right: 0;
	    background-color: #FFFFFF;
	    z-index: 10;

		}
	  .order-nodata {
		  text-align: center;
		  .order-nodata-logo {
		    display: inline-block;
		    width: 1.50rem;
		    height: 1.50rem;
		    margin-top: 1.28rem;
		    @include bg-image('/static/img/no-order');
		    background-size: 100% 100%;
		  }
		  .order-nodata-tip {
		    margin-top: .40rem;
		    font-size: 14px;
		    color: #919599;
		  }
		}
	}	
</style>