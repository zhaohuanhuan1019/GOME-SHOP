<template>
<div id="app">
    <div id="purseHeaderWarpper">
      <div class="num-box">
        <span class="text" @click="onClickAlertText">国美币</span><span class="big-num" @click="onClickAlertText">{{bigNum}}</span><span class="small-num" @click="onClickAlertText">{{smallNum}}</span>
      </div>
    </div>
    <div id="purseFooterWarpper">
        <span class="withdraw" ><div class="cashIcon" @click="onClickAlertCash"></div><span class="cashText" @click="onClickAlertCash">如何提现？</span></span>
    </div>
</div>
</template>

<script>

import vui from 'vui'
import { Dialog } from 'vui';
import { Toast } from 'vui';
import { mapGetters } from 'vuex'
import { fetchPurseSelect } from '@/api/purseSelect'
import jsBridge from 'common/js/jsbridge.js'; 
export default {
  data() {
    return {
    	sum : ''
    }
  },
  created() {
    this.getSelect()
  },
  computed:{
    bigNum() {
      console.log(this.sum)
      return this.sum ? this.sum.split('.')[0] : '0'
    },
    smallNum() {
      return this.sum ? '.' + this.sum.split('.')[1] : '.00'
    }
  },
  methods:{
    async getSelect () {
      let myInfo = await jsBridge.getMyInfo();
      console.log(123,myInfo)
      let { data } = await fetchPurseSelect({
        userId: Number(myInfo.userId),
        shopId: Number(myInfo.shopId),
        loginName: myInfo.loginName
      })
      console.log(data)
      this.sum = data.data.withdrawMoney === undefined ? 0.00 : (Number(data.data.withdrawMoney)/100).toFixed(2)
    },
    onClickAlertText() {
      this.$dialog.alert({
        title: '什么是国美币',
        message: '<p style="text-align:justify;text-indent:2em" >国美币是您在国美的个人专属账户，您可以在国美上享受到国美币带来的各种返利、红包等优惠，而且获得的国美币可以直接提现至您的银行卡。当您的国美币账户实名认证通过后，则可以进行充值和提现。当您办理退货、取消订单产生的退款不支持原路返回时，退款将以国美币形式退至您的账户中。红包、返利金额也会返还到您的国美币账户中，国美币账户服务（账户开立、充值、提现、实名认证、绑卡）由银盈通提供技术及运营支持。</p>',
        confirmButtonText: '知道了'
      });
    },
    onClickAlertCash() {
      this.$dialog.confirm({
        title: '如何提现',
        message: '登录美店网页版，进入我的订单-国美币，进行提现<a id="sumAddress" style="color: #1B84F5;">http://myhome.gome.com.cn</a>',
        confirmButtonText: '知道了',
        cancelButtonText: '复制'
      }).then ( () => {
        console.log('点击知道了')
      }).catch ( () => {
        let sumAddress = document.getElementById("sumAddress").innerHTML
        console.log('点击复制',sumAddress)
        this.$toast('网址复制成功');
        
        const timer = setInterval(() => {
            clearInterval(timer);
            this.$toast.clear();
        }, 1000);
        jsBridge.copyText({
          "code": 0,
          "msg": "",
          "data": {
            "content": sumAddress
          }
        });
    })
    }
  }
}
</script>

<style lang='scss' rel="stylesheet/scss" type="text/css" scoped>
@import '../../../common/css/mixin';
#purseHeaderWarpper{
  height:2.39rem;
  background-image: linear-gradient(-16deg, #FF0027 0%, #EF1057 51%, #E02086 100%);
  display:flex;
  justify-content: center;
  position: relative;
  overflow: hidden;

  div.num-box{
    font-family: PingFangSC-Regular;
    color: #FFFFFF;
    position: absolute;
    bottom:0.52rem;
    left: 0;
    right: 0;
    display:flex;
    align-items:baseline;
    justify-content: center;
    
    .text{
      font-size: 0.2rem;
      line-height: 0.30rem;
      margin-right: 0.10rem;
      height: 0.3rem;
      flex-shrink: 0;
    }
    .big-num{
      font-size: 0.70rem;
      line-height: 0.70rem;
      height: 0.7rem;
    
    }
    .small-num{
      font-size: 0.40rem;
      line-height: 0.40rem;
      height: 0.4rem;
    }
  }
}

#purseFooterWarpper{
  width: 100%;
  position: absolute;
  bottom: 0.42rem;

  .cashIcon{
    width: 0.18rem;
    height: 0.18rem;
    display: inline-block;
    @include bg-image('/static/img/help') ;
    background-size: 0.18rem 0.18rem;
    vertical-align: -0.03rem;
    margin-right: 0.05rem;
  }

  .withdraw{
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #F20C59;
      letter-spacing: 0;
      line-height: 0.14rem;
      text-align: center;
      display:block;
    }
  
}


</style>
