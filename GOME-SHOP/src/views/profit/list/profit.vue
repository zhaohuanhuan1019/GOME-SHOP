<template>
  <div id="app">
    <div class="md-profit-details" v-if="showPage">
      <vu-tabs :active="active" @click="handleTabClick" type="card">

        <vu-tab  :title="getHtmlTitle(tab.title, tab.total)" v-for="(tab, index) in tabs" :key="index">

          <ul v-if="container.length">
            <li v-for="item in container">
              <vu-cell :title=" '' + item.orderItemTime" :label="'订单号：' + item.orderId">
				  <template slot="content">
					  <span class="van-cell-text">{{ '返现' }}</span><span class="van-cell-text" style="color: #F20C59;">+{{ item.money }}国美币</span>
				  </template>
			  </vu-cell>

            </li>
          </ul>

          <div class="no-profit" v-else>
            <span>尚未赚到钱</span>
            <span>赚到的佣金会展示在这里，去分销商品赚取佣金吧!</span>

            <vu-button @click="toFindGoods" type="default" size="normal">去分销赚钱</vu-button>

          </div>
        </vu-tab>
      </vu-tabs>

      <div class="footer-tip" v-if="container.length && showPage">
		  已经是全部了
      </div>
    </div>
  </div>
</template>

<script>
	import { fetchSelectRebate } from '@/api/profit';
	import jsBridge from 'common/js/jsbridge';
	
export default {
  data() {
    return {
      active: '',
		showPage: false,
	  tabs: [
        {title: '待入账', total: ''},
        {title: '已入账', total: ''}
      ],
		accounted: [],
		waitAccount: [],
		container:[],
		myInfo: {
			userId: '',
			shopId: ''
		},
		options: {
			userId: '',
			shopId: '',
			status: '',  // 1.待入账，2.已入账
			pageNum: 1,
			pageSize: 10000
		}
    };
  },
    async created () {
      // hash :#0 待入账， #1 已入账
  	  let profitHash =  window.location.hash;
	  let index = Number(profitHash.substring(1));
	   
	   this.waitAccount = await this.getApiProfitData(0);
	   this.accounted = await this.getApiProfitData(1);
	   this.active = index;
	},
	watch: {
		active (val) {
			if (val === 0) {
				this.container =  this.waitAccount;
			}
			if (val === 1) {
				this.container =  this.accounted;
			}
		}
	},
  methods: {
	  toFindGoods () {
		  jsBridge.findGoods().then((res) => {
			
		  }).catch((err) => {
			  console.log('err--find goods:', err);
		  })
		  
	  },
	  async getApiProfitData (index) {
		  if (index === 0 || index === 1) {
			  this.options.status = index + 1;
		  }
  		  if (!(this.options.userId && this.options.shopId)) {
			  console.log('start',index);
			  let jsbridgeInfo = await jsBridge.getMyInfo();
			  console.log('end',index);
			  this.options.userId = jsbridgeInfo.userId;
			  this.options.shopId = jsbridgeInfo.shopId;
		  }
		  
		 //  fetchSelectRebate(this.options).then((res) => {
			// if (res.data.code === 0) {
			// 	this.showPage = true;
			// 	let money=this.getTotalMoney(res.data.data.rebateDetails);

			// 	this.tabs[index].total = Number(money) ? (Number(money)/100).toFixed(2) : '0.00';
			// 	return res.data.data.rebateDetails;
			// } else {
			// 	this.showPage = false;
				
			// 	console.log('err1:', res.data.msg);
			// }
		 //  }).catch((err) => {
		 //  	console.log('err:', err);
		 //  })
		 let res=await fetchSelectRebate(this.options);
		 if (res.data.code === 0) {
				this.showPage = true;
				let money=this.getTotalMoney(res.data.data.rebateDetails);

				this.tabs[index].total = Number(money) ? (Number(money)/100).toFixed(2) : '0.00';
				let resultArr=[];
				if(res.data.data.rebateDetails.length>0){
					for(let i=0;i<res.data.data.rebateDetails.length;i++){
						let result=res.data.data.rebateDetails[i];
						result.money=Number(result.money) ? (Number(result.money)/100).toFixed(2) : '0.00';
						result.orderItemTime=this.timestampToTime(result.orderItemTime)
						resultArr.push(result);

					}

				}
				return resultArr;
			} else {
				this.showPage = false;
				
				console.log('err1:', res.data.msg);
				return [];
			}
	  },
      async handleTabClick(index) {
      	let data = await this.getApiProfitData(index);
		  if (index === 0) {
				this.waitAccount = data;
			} else if (index === 1) {
				this.accounted = data;
			}
		this.active=index;
	  },
	  getTotalMoney (arr) {
	  	if (arr.length) {
	  		return arr.reduce(function(sum, value) {
				return sum + value.money;
			}, 0);
		} else {
	  		return 0;
		}
	  },
	  timestampToTime(str){
	  	let date;
	  	if(str.length===10){
			date = new Date(str * 1000);
	  	}else{
	  		date = new Date(str );
	  	}
       let Y = date.getFullYear() + '-';
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate())+ ' ';
        // let h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
        // let m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
        // let s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
        return Y+M+D;
	  },
	  getHtmlTitle (title, money) {
		  return `<span class="vu-tab--title">${title}</span>
          <span class="vu-tab--money">(${money})</span>`;
	  }
  }
};
</script>

<style lang="scss">

  #app {
	  width: 100%;
	  height: 100%;
	  background-color: #F3F5F7;

	  .md-profit-details {
		  display: flex;
		  flex-direction: column;
			width: 100%;
		    min-height: 100%;
			background-color: #F3F5F7;
	  }
      
      .no-profit {
        margin-top: 1.04rem;
        text-align: center;
        font-size: .14rem;
        color: #919599;
        line-height: .2rem;
        
        span {
          display: block;
        }
        
        .vu-button--normal {
          margin-top: .72rem;
          width: 1.28rem;
          height: .37rem;
          background-image: linear-gradient(-90deg, #FA1E8C 0%, #FC1E56 100%);
          border-radius: 1rem;
          color: #ffffff;
          font-size: .14rem;
          line-height: .14rem;
        }
      }

	  .vu-tabs__nav--card {

	  .vu-tab {
		  border-right: none;
		  font-size: .14rem;
		  line-height: .16rem;
		  color: #919599;
		  padding: .05rem 0;

		  &.vu-tab--active {
			   color: #fff;
			   background-image: linear-gradient(-90deg, #FA1E8C 0%, #FC1E56 100%);

		   }
		}
	  }
  
	  .vu-tabs__nav--card,
	  .vu-tabs__nav {
		background: #FFFFFF;
		border-radius: .21rem;
		height: 100%;
		border: none;
		margin: 0;
		overflow: hidden;
	  }
	  
	  .vu-tabs--card {
		  flex: 1;
		  padding-top: .72rem;

        .vu-tabs__wrap {
		   height: .42rem;
			width: 2.14rem;
			margin: .15rem auto;
		}

		.vu-tab__pane {
		  padding: 0;
		}
	  }
  
	  .vu-cell {
		height: .48rem;
		margin-bottom: .05rem;
		padding: 0 .14rem;
		font-size: .11rem;
		color: #5A6066;
	  }

	  .vu-cell__title {
		display: table-cell;
		text-align: left;
	  }

	  .vu-cell__value {
		display: table-cell;
		vertical-align: top;
	  }

	  .footer-tip {
		  flex: 0 0 1.12rem;
		  box-sizing: border-box;
		  height: 1.12rem;
		  width: 100%;
		  text-align: center;
		  font-size: .12rem;
		  color: #CACCCF;
		  padding-top: .27rem;
	  }
  }
</style>
