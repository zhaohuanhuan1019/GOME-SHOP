<template>
  <div id="app">
    <sysheader v-if="hasHeader" :titleName="titleName"></sysheader>
    <div class="equity">
      <div class="equity-tab">
        <div class="vip" @click="switchType('VIP')" >
          <span :class="this.type == 'VIP' ? 'on' : ''">VIP权益</span>
        </div>
        <div class="svip" @click="switchType('SVIP')" >
          <span :class="this.type == 'SVIP' ? 'on' : ''">SVIP权益</span>
        </div>
      </div>
      <div class="tab-content">
        <div class="content-vip" v-show="this.type == 'VIP'">
          <p class="info">VIP级别可获得高于普通店主的多项权益，在佣金等方面获得更高收益。</p>
          <ul class="content-list">
            <li>
              <i class="icon icon-rebate"></i>
              <div class="list-info">
                <p class="info-title">高额返利</p>
                高于普通店主的返利额度
              </div>
            </li>
            <li>
              <i class="icon icon-commission"></i>
              <div class="list-info">
                <p class="info-title">佣金叠加</p>
                佣金阶梯式叠加
              </div>
            </li>
            <li>
              <i class="icon icon-vip "></i>
              <div class="list-info">
                <p class="info-title">VIP大礼包</p>
                开通即送超值礼品
              </div>
            </li>
            <li>
              <i class="icon icon-envelope240"></i>
              <div class="list-info">
                <p class="info-title">240元红包</p>
                专享优惠券大礼包
              </div>
            </li>
            <li>
              <i class="icon icon-mentor"></i>
              <div class="list-info">
                <p class="info-title">专属导师</p>
                手把手教你赚钱
              </div>
            </li>
            <li>
              <i class="icon icon-exclusive"></i>
              <div class="list-info">
                <p class="info-title">专享价格</p>
                专属成本价格
              </div>
            </li>
            <li>
              <i class="icon icon-withdrawal"></i>
              <div class="list-info">
                <p class="info-title">随时提现</p>
                随时提现极速到账
              </div>
            </li>
            <li>
              <i class="icon icon-apply"></i>
              <div class="list-info">
                <p class="info-title">试用特权</p>
                美店商品优先试用
              </div>
            </li>
          </ul>
        </div>
        <div class="content-svip" v-show="this.type == 'SVIP'">
          <p class="info">SVIP级别享有专属管理补贴，更多途径获取高额佣金奖励。</p>
          <ul class="content-list">
            <li>
              <i class="icon icon-withdrawal"></i>
              <div class="list-info">
                <p class="info-title">高额返利</p>
                高于普通店主的返利额度
              </div>
            </li>
            <li>
              <i class="icon icon-subsidy"></i>
              <div class="list-info">
                <p class="info-title">管理补贴</p>
                享受SVIP专属管理奖励
              </div>
            </li>
            <li>
              <i class="icon icon-mentor"></i>
              <div class="list-info">
                <p class="info-title">专属导师</p>
                手把手教你赚钱
              </div>
            </li>
            <li>
              <i class="icon icon-exclusive"></i>
              <div class="list-info">
                <p class="info-title">专享价格</p>
                专属成本价格
              </div>
            </li>
            <li>
              <i class="icon icon-cash"></i>
              <div class="list-info">
                <p class="info-title">随时提现</p>
                随时提现极速到账
              </div>
            </li>
            <li>
              <i class="icon icon-apply"></i>
              <div class="list-info">
                <p class="info-title">试用特权</p>
                美店商品优先试用
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {env, system} from '@/common/js/env';
import sysheader from '@/components/sysheader';
import { getVipInfo } from '@/api/manageInfo'
export default {
  data() {
    return {
      type: 'VIP',
      hasHeader: !env.wechat,
      titleName: '权益说明'
    }
  },
  async created(){
    let vipInfo = await getVipInfo()
    let vipType = vipInfo.data.data.vipType.toLowerCase();
    if (vipType === 'svip'){
      this.switchType('SVIP');
    } else if(vipType === 'vip'){
      this.switchType('VIP');
    }
  },
  // mounted(){
  //   if(env.wechat){
  //     document.getElementById('headerTop').style.display = 'none';
  //     document.getElementById('main').style.top = 0;
  //   }
  // },
	components: {
		sysheader
  },
  methods: {
    switchType(type){
      this.type = type;
    }
  }
};
</script>

<style type="text/css" lang="scss" scoped>
  @import '../../../common/css/reset';
  @import '../../../common/css/mixin';
  $imgUrl: '../../../common/images/';
  #app {
    border-top: 1px solid #ddd;
    background-color: #fff;
    .equity{
    	.equity-tab{
    		background: #fff;
        display: flex;
        text-align: center;
        .vip,
        .svip{
          flex: 1;
    			padding: 0 .6rem;
      		span{
      			display: block;
      			font-size: .15rem;
      			color: #333;
      			height: .4rem;
      			line-height: .4rem;
      			border-bottom: 1px solid transparent;
            box-sizing: border-box;
        		&.on{
        			color: #C48922;
        			border-bottom: 1px solid #C48922;
        		}
      		}
    		}
    	}
    	.tab-content{
        padding: 0 .15rem;
        background-color: #f3f4f5;
    	}
    	.info{
    		padding: .1rem 0;
    		font-size: .12rem;
    		color: #666;
    	}
      .info{
        padding: .1rem 0;
      }
    	.content-svip{
    		.info{
    			padding: 0;
          line-height: .54rem;
    		}
    	}
    	.content-list{
    		padding: .2rem;
    		height: 4.22rem;
    		background: #fff;
    		border: 1px solid #ddd;
    		border-radius: 5px;
        font-size: .13rem;
        color: #999;
    		li{
          display: flex;
    			margin-bottom: .15rem;
          align-items: center;
          &:nth-last-child(1){
            margin-bottom: 0;
          }
          .list-info{
            flex: 1;
          }
      		.info-title{
      			font-size: .14rem;
      			color: #333;
      			padding-bottom: .02rem;
      		}
      		.icon{
      			width: .28rem;
      			height: .28rem;
      			margin-right: .15rem;
            background-size: cover;
        		&.icon-rebate{
              @include bg-image($imgUrl + 'highMoney');
        		}
        		&.icon-commission{
              @include bg-image($imgUrl + 'commission');
        		}
        		&.icon-vip{
              @include bg-image($imgUrl + 'vipPackage');
        		}
        		&.icon-envelope240{
              @include bg-image($imgUrl + 'redEnvelopes');
        		}
        		&.icon-mentor{
              @include bg-image($imgUrl + 'tutor');
        		}
        		&.icon-exclusive{
              @include bg-image($imgUrl + 'price');
        		}
        		&.icon-withdrawal{
              @include bg-image($imgUrl + 'subsidy');
        		}
        		&.icon-apply{
              @include bg-image($imgUrl + 'try');
        		}
        		&.icon-subsidy{
              @include bg-image($imgUrl + 'commission');
        		}
        		&.icon-cash{
              @include bg-image($imgUrl + 'cash');
        		}
      		}
    		}
    	}
    }
  }
</style>
