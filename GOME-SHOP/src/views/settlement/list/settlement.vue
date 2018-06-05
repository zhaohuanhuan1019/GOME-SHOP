<template>
  <section id="app">
    <sysheader v-if="hasHeader" :backCb="backCb" :titleName="titleName"></sysheader>
    <div class="vip-membership">
      <i class="icon icon-vip"></i>
      <span class="vip-mem-des">VIP资格会员年限</span>
      <span>1年</span>
    </div>
    <div class="flex-box">
      <div class="choose-gift">
        <p>选择赠品</p>
        <div class="gift-items">
          <ul>
            <li v-for="(item, index) in lists" @click="switchType(index)">
              <i :class="index == (curIndex-1) ? 'icon-radio on' : 'icon-radio'"></i>
              <img :src="item.imgSrc" />
              <span>{{item.text}}</span>
              <em>{{item.dex}}</em>
            </li>
          </ul>
        </div>
      </div>
      <div class="address-fill">
        <p class="address-tips">请务必正确填写收货信息，用于接收礼包发放！</p>
        <div class="address-inputs">
          <ul>
            <li>
              <span>收货人：</span>
              <input type="text" maxlength="20" @change="handleChange" v-model="perName" placeholder="收货人姓名" />
            </li>
            <li>
              <span>手机号码：</span>
              <input type="text" maxlength="11" @change="handleChange" v-model="cellphone" placeholder="收货人手机号码" />
            </li>
            <li>
              <span>收货地址：</span>
              <input type="text" maxlength="50" @change="handleChange" v-model="address" placeholder="详细地址（省市区、门牌号等）" />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="btns">
      <div class="agree-protocol" @click="changeRead">
        <i :class="isRead ? 'icon-checkbox on' : 'icon-checkbox'"></i>
        <label>阅读并同意</label>
        <a href="/static/staticPage/svip-shop.html">《美店VIP订购协议》</a>
      </div>
      <div class="pays">
        <div class="pay-mount">应付金额：<span>￥299</span></div>
        <div :class="isRead ? 'pay-for on' : 'pay-for'" @click="payFor">立即支付</div>
      </div>
    </div>
  </section>
</template>

<script>
import {queryPayChannel} from '@/api/settlement';
import {env, system} from '@/common/js/env';
import {encode} from '@/common/js/utils';
import common from 'common/js/common.js';
import {toast} from '@/common/js/function.js';
import sysheader from '@/components/sysheader';
import { Dialog } from 'vui';
export default {
  data() {
    return {
      curIndex: 0,
      perName: '',
      cellphone: '',
      address: '',
      chooseFift: false,
      inputFills: false,
      inviterUserId:'',//邀请人的userId
      // curIndex: 1,
      // perName: 'aa',
      // cellphone: '13718327740',
      // address: 'bb',
      // chooseFift: true,
      // inputFills: true,
      isRead: true,
      lists: [
        {
          id: 1,
          text: '法国波尔多干红葡萄酒750ml',
          dex: '赠品',
          imgSrc: '../../../../static/img/gift2.png'
        },
        {
          id: 2,
          text: '百雀羚草本精萃惊喜四件套装',
          dex: '赠品',
          imgSrc: '../../../../static/img/gift1.png'
        },
        {
          id: 3,
          text: '每日坚果混合什锦礼盒540克',
          dex: '赠品',
          imgSrc: '../../../../static/img/gift3.png'
        },
        {
          id: 4,
          text: '蛰伏家居床品四件套装（美好时光）',
          dex: '赠品',
          imgSrc: '../../../../static/img/gift4.png'
        }
      ],
      hasHeader: !env.wechat,
      titleName: '结算',
      invitedSearch: ''//从开通页面传递过来的参数 直接传递给开通页面
    }
  },
	components: {
		sysheader
  },
  async created(){
    this.invitedSearch = location.search || '?';
    this.curIndex = 0;
    this.perName = '';
    this.cellphone = '';
    this.address = '';
    let getRequest = await common.getRequest();//获取地址栏传过来的taskId
    if(getRequest.inviterUserId){
      this.inviterUserId = getRequest.inviterUserId;
    }
  },
  methods: {
    backCb(){
      if(this.curIndex || this.perName || this.cellphone || this.address){
        this.$dialog.confirm({
          title: '确认离开此页面?',
          confirmButtonText: '取消',
          cancelButtonText: '离开'
        }).then ( () => {
          // 点取消
        }).catch ( () => {
          window.history.back();
        });
      }else{
        window.history.back();
      }
    },
    switchType(index){
      this.curIndex = index + 1;
      this.chooseFift = true;
    },
    handleChange(){
      this.inputFills = !!this.perName && /^1\d{10}$/.test(this.cellphone) && !!this.address;
    },
    changeRead(e){
      let target = e.target;
      if(target.tagName != 'LABEL' && target.tagName != 'I')return;
      this.isRead = !this.isRead;
    },
    // mounted(){
    //   if(env.wechat){
    //     document.getElementById('headerTop').style.display = 'none';
    //     document.getElementById('main').style.top = 0;
    //   }
    // },
    payFor(){
      if(!this.curIndex){
        toast('请选择赠品');
        return;
      }else if(!this.inputFills){
        toast('请正确填写收货信息');
        return;
      }

      let host = window.location.host;
      let reg = RegExp(/atguat/);
      let payMoney = 0;
      if(reg.test(host)){
        payMoney = 0.01;
      }else{
        payMoney = 299;
      }
      if(this.isRead){
        queryPayChannel({
          browserType: env.wechat ? 'wxllq' : 'wap',
          deviceType: system.android ? 'android' : 'ios',
          userName: this.perName,
          phoneNum: this.cellphone,
          address: this.address,
          productInfo: this.curIndex,
          wareId: this.curIndex,
          payMoney,
          inviteUserId:this.inviterUserId ? this.inviterUserId : '',
          backUrl:`${window.location.origin}/views/openSuccess/openSuccess.html`
        }).then((res)=>{
          let {code, data, msg} = res.data;
          if(code == 0){
            let newTime = new Date();
            newTime.setMinutes(newTime.getMinutes() + 30);
            // newTime.setDate(newTime.getDate() + 1);
            let href = '';
            if(env.wechat){
              href = `http://wx.gome.com.cn/Service1314/auth/authOpenid?url=` + encodeURI(`${window.location.origin}/views/payType/payType.html${this.invitedSearch}`);
              if(window.localStorage){
                localStorage.setItem('payType', JSON.stringify(data));
                localStorage.setItem('payTime', newTime.getTime());
              }
            }else{
              href = `${window.location.origin}/views/payType/payType.html${this.invitedSearch}&payType=${(JSON.stringify(data))}&payTime=${newTime.getTime()}`;
            }
            window.location = href;
          }else if(code == 1104){
            if(reg.test(host)){
                window.location.href = 'http://login.m.atguat.com.cn/login.html?return_url=' + encode(window.location.href)
            }else{
                window.location.href = 'http://login.m.gome.com.cn/login.html?return_url=' + encode(window.location.href)
            }
          }else if(code == 10999){
            toast(msg);
          }else{
            toast('您已是vip,您已开通vip特权，快去享受您的权益吧~');
          }
        });
      }else{
        // console.log('未读');
      }
    }
  }
};
</script>

<style type="text/css" lang="scss" scoped>
  @import '../../../common/css/reset';
  @import '../../../common/css/mixin';
  .icon-radio,
  .icon-checkbox{
    width: .18rem;
    height: .18rem;
    @include bg-image('../../../common/images/icon-check');
    background-repeat: no-repeat;
    background-size: cover;

  }
  .icon-radio.on{
    @include bg-image('../../../common/images/icon-check-on');
  }
  .icon-checkbox.on{
    @include bg-image('../../../common/images/checkbox-on');
  }
  #app {
    height: 100%;
    background-color: #F3F5F7;
    border-top: 1px solid #ddd;
    display: flex;
    flex-direction: column;
    .flex-box{
      flex: 1;
      overflow-y: auto;
      padding: .1rem 0 .2rem;
    }
    .vip-membership{
      display: flex;
      color: #755828;
      font-size: .15rem;
      height: .6rem;
      padding: 0 .3rem 0 .15rem;
      background-color: #FFF8EB;
      align-items: center;
      .icon-vip{
        width: .43rem;
        height: .18rem;
        margin-right: .15rem;
        @include bg-image('../../../../static/img/VIP');
        background-size: cover;
      }
      .vip-mem-des{
        flex: 1;
      }
    }
    .choose-gift{
      background-color: #fff;
      padding-left: .15rem;
      .gift-items{
        li{
          display: flex;
          align-items: center;
          border-bottom: 1px solid #ddd;
          height: .8rem;
          &:nth-last-child(1){
            border-bottom: none;
          }
          input{
            width: .18rem;
            height: .18rem;
            background-color: #ccc;
            border-radius:50%;
          }
          img{
            height: .5rem;
            width: .5rem;
            border: 1px solid #ccc;
            margin: 0 .15rem;
          }
          span{
            font-size: .13rem;
          }
          em{
            margin-left: .05rem;
            font-style: normal;
            font-size: .11rem;
            width: .36rem;
            height: .15rem;
            line-height: .15rem;
            text-align: center;
            color: #F20C59;
            border-radius: .08rem;
            border: 1px solid #F20C59;
          }
        }
      }
      p{
        font-size: .15rem;
        padding: .15rem 0;
        height: .21rem;
      }
    }
    .address-fill{
      font-size: .15rem;
      p{
        height: .38rem;
        line-height: .38rem;
        font-size: .13rem;
        text-indent: .15rem;
        color: #999;
      }
      .address-inputs{
        background-color: #fff;
        padding-left: .15rem;
        li{
          height: .5rem;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #ddd;
          &:nth-last-child(1){
            border-bottom: none;
          }
          span{
            width: .85rem;
          }
          input{
            flex: 1;
            margin-right: .22rem;
            color: #333;
            height: 100%;
            &::-webkit-input-placeholder{
              color: #ccc;
            }
          }
        }
      }
    }
    .agree-protocol{
      display: flex;
      align-items: center;
      background-color: #fff;
      height: .32rem;
      line-height: .32rem;
      padding-left: .15rem;
      font-size: .11rem;
      input{
        width: .18rem;
        height: .18rem;
        background-color: yellow;
        border-radius: 50%;
      }
      label{
        margin-left: .05rem;
        color: #333;
      }
      a{
        color: #1B84F5;
      }
    }
    .pays{
      font-size: .11rem;
      background-color: #fff;
      display: flex;
      height: .5rem;
      align-items: center;
      div{
        flex: 1;
      }
      .pay-mount{
        color: #999;
        padding-left: .15rem;
        font-size: .13rem;
        span{
          color: #F20C59;
          font-size: .15rem;
        }
      }
      .pay-for{
        background-image: linear-gradient(-225deg, #FEEECD 0%, #FFE4B7 100%);
        color: #fff;
        font-size: 16px;
        height: 100%;
        line-height: .5rem;
        text-align: center;
        &.on{
          background-image: linear-gradient(-225deg, #F0CF8A 0%, #D9A95A 100%);
          color: #2F3245;
        }
      }
    }
  }
</style>
