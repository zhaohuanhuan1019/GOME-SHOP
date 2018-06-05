<template>
  <div id="app">
    <sysheader v-if="hasHeader" :titleName="titleName"></sysheader>
    <div class="pay-detail">
      <div class="pay-time">
        支付剩余时间：<span>{{surplusTime}}</span>
      </div>
      <div class="pay-num">
        ￥<span>{{price}}</span>
      </div>
    </div>
    <div class="pay-way">
      <ul>
        <li v-for="(item, index) in payTypes" @click="switchType(item.bankCode)" :class="type == item.bankCode ? 'pay-item on' : 'pay-item'">
          <em class="icon-check"></em>
          <em :class="item.bankCode === 'WEIXINPAY' ? 'icon icon-wx' : 'icon icon-zfb'" class="icon icon-wx"></em>
          <div class="text">
            <p :class="item.bankCode === 'WEIXINPAY' ? '' : 'zfb'">{{item.bankCode == 'WEIXINPAY' ? '微信' : '支付宝支付'}}</p>
            <span v-if="item.bankCode === 'WEIXINPAY'">推荐安装微信5.0及以上版本使用</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="pay-btn" @click="payFor">
      确认支付 ￥<span>{{price}}</span>
    </div>
  </div>
</template>

<script>
import {orderPay} from '@/api/settlement';
import {env, system} from '@/common/js/env';
import {toast} from '@/common/js/function.js';
import sysheader from '@/components/sysheader';
function getDataFromUrl(){
     var str = window.location.search.substring(1),
          data = {},
          reg = /([^&=]+)=([^&=]+)/g;
     str.replace(reg,function () {
          data[(arguments[1])] = (arguments[2]);
     });
     return data;
}
export default {
  data() {
    return {
      type: env.wechat ? 'WEIXINPAY' : 'ALIPAYSM',
      surplusTime: '00:00:00',
      price: 299,
      payTypes: null,
      orderNo: '',
      titleName: '选择支付方式',
      hasHeader: !env.wechat,
      inviterUserId:'',//邀请人的userid
    }
  },
	components: {
		sysheader
  },
  created() {
    let payType;
    if(env.wechat){
      payType = JSON.parse(localStorage.getItem('payType'));
    }else{
      payType = JSON.parse(decodeURIComponent(getDataFromUrl().payType));
    }
    this.orderNo = payType.orderNo;
    this.payTypes = JSON.parse(payType.payModeList);
    this.tick();
    this.timer = setInterval(this.tick, 1000);
    this.inviterUserId = getDataFromUrl().inviterUserId;
	},
  methods: {
    switchType(type){
      this.type = type;
    },
    backCb(){
      // window.location.href = `${window.location.origin}/views/settlement/settlement.html${this.getOpenId().openid ? `?openid=${this.getOpenId().openid}` : ''}`;
    },
    isTimeout(s){
      return s < 0;
    },
    toFixedZero(n){
      return n >= 10 ? '' + n : '0' + n;
    },
    tick(){
      // if(!window.localStorage)return;
      let t = env.wechat ? localStorage.getItem('payTime') : JSON.parse(getDataFromUrl().payTime); // parseInt(localStorage.getItem('payTime'));
      let times = new Date().getTime();
      let s = 0;
      let h = 0;
      let m = 0;
      s = parseInt((t - times)/1000);
      if(this.isTimeout(s)){
        clearInterval(this.timer);
        this.surplusTime = '00:00:00';
        return;
      }
      h = parseInt(s / 3600);
      s -= h * 3600;
      m = parseInt(s / 60);
      s -= m * 60;
      this.surplusTime = `${this.toFixedZero(h)}:${this.toFixedZero(m)}:${this.toFixedZero(s)}`;
    },
    getOpenId(){
      let str = location.search.substring(1);
      let data = {};
      str.replace(/([^=?&]+)=([^=?&]+)/g, (...arg)=>{
        data[arg[1]] = arg[2];
      });
      return data;
    },
    // mounted(){
    //   if(env.wechat){
    //     document.getElementById('headerTop').style.display = 'none';
    //     document.getElementById('main').style.top = 0;
    //   }
    // },
    payFor(){
      if(this.surplusTime != '00:00:00'){
        if(this.type == 'ALIPAYSM'){
          let {payTal} = this.payTypes.filter(item => item.bankCode == 'ALIPAYSM')[0];
          orderPay({
            payTal,
            orderNo: this.orderNo,
            backUrl: `${window.location.origin}/views/openSuccess/openSuccess.html`,
            inviteUserId: this.inviterUserId ? this.inviterUserId : ''
          }).then((res)=>{
            let {code, data, msg} = res.data;
            if(code != 0){
              toast(msg);
            }else{
              //window.location = `${window.location.origin}/views/openSuccess/openSuccess.html`
              window.location = data;
            }
          });
        }else if(this.type == 'WEIXINPAY'){
          let {openid} = this.getOpenId();
          let {payTal, orderNo} = this.payTypes.filter(item => item.bankCode == 'WEIXINPAY')[0];
          orderPay({
            openId: openid,
            payTal,
            orderNo: this.orderNo,
            inviteUserId: this.inviterUserId ? this.inviterUserId : '',
            backUrl: `${window.location.origin}/views/openSuccess/openSuccess.html`
          }).then((res)=>{
            let {code, data, msg} = res.data;
            if(code != 0){
              toast(msg);
            }else{
              data = JSON.parse(data);
              function onBridgeReady(){
                WeixinJSBridge.invoke('getBrandWCPayRequest', data, (res)=>{
                  let {err_msg} = res;
                  if(err_msg == 'get_brand_wcpay_request:ok') {
                    // toast('get_brand_wcpay_request:ok');
                    window.location.href = `${window.location.origin}/views/openSuccess/openSuccess.html`;
                  }else if(err_msg == 'get_brand_wcpay_request:cancel' || err_msg == 'get_brand_wcpay_request:fail'){
                    // toast('fail or cancel');
                  }
                });
              }
              if(typeof WeixinJSBridge == 'undefined'){
                if(document.addEventListener){
                  document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                }else if(document.attachEvent){
                  document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                  document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                }
              }else{
                onBridgeReady();
              }
            }
          });
        }
      }else{
        toast('订单已超时，请返回上一页面重新支付');
      }
    }
  },
  computed: {

  }
};
</script>

<style type="text/css" lang="scss" scoped>
@import '../../../common/css/reset';
@import '../../../common/css/mixin';
*{
  padding: 0;
  margin: 0;
}
#app{
  border-top: 1px solid #ddd;
  .pay-detail{
      font-size: .13rem;
      text-align: center;
      color: #333;
      background: #fff;
      margin-bottom: .1rem;
      .pay-time{
          line-height: .18rem;
          padding-top: .15rem;
      }
      .pay-num{
          font-size: .18rem;
          line-height: .25rem;
          padding: .1rem 0;
      }
  }
  .pay-way{
    background: #fff;
    padding-left: .15rem;
    box-sizing: border-box;
    .pay-item{
      display: flex;
      align-items: center;
      font-size: .13rem;
      width: 100%;
      height: 0.64rem;
      border-bottom: 1px solid #ddd;
      &:last-child{
        border: 0;
      }
      .icon-check{
        width: .18rem;
        height: .18rem;
        @include bg-image('../../../common/images/icon-check');
        background-size: cover;
      }
      .icon{
        width: .22rem;
        height: .22rem;
        @include bg-image('../../../common/images/pay-wx');
        background-size: 100% auto;
        margin: 0 .15rem 0 .2rem;
        &.icon-zfb{
          @include bg-image('../../../common/images/pay-zhb');
        }
      }
      .text{
        flex: 1;
        p{
          line-height: .18rem;
        }
        span{
          line-height: .16rem;
          color: #999;
          font-size: .11rem;
        }
      }
      &.on{
        .icon-check{
          @include bg-image('../../../common/images/icon-check-on');
        }
      }
    }
  }
  .pay-btn{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: .5rem;
    background-image: linear-gradient(-225deg, #F0CF8A 0%, #D9A95A 100%);
    text-align: center;
    font-size: .16rem;
    line-height: .5rem;
    color: #2F3245;
  }
}
</style>
