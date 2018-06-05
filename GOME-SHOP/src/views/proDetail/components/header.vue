<template>
  <div id="headerWarpper">
    <!--<vu-iconButton name="arrow-left" class="iconButton" @click="backNative"/>-->
    <div class="tabWarpper">
      <span :class="{'isChecked': !isCheckedDetail}" @click="clickProduct">商品</span><span @click="clickDetail" :class="{'isChecked': isCheckedDetail}">详情</span>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'app',
    props: ['isDetail', 'isArriveDeatail'],
    data(){
      return {
        isCheckedDetail: this.isDetail,
      }
    },
    watch: {
      isArriveDeatail (curVal, oldVal) {
        if (curVal == true && oldVal == false) {
          this.isCheckedDetail = true;
        } else if (curVal == false && oldVal == true) {
          this.isCheckedDetail = false;
        }
　　　},
      isDetail (newIsDetail) {
        this.isCheckedDetail = newIsDetail;
      }
　  },
    methods: {
      /*
      backNative () {
        let obj={
          "code": 0,
          "msg": "",
          "data": {
            "backType": -1 //0是关闭页面  1是返回到上次h5页面 -1无法判断
          }
        };
        window.WebViewJavascriptBridge.callHandler('jsToNativeGoBack', obj, function() {});
      },*/
      clickProduct () {
        this.$emit('clickProduct');
        this.isCheckedDetail = false;
      },
      clickDetail () {
        this.$emit('clickDetail');
        this.isCheckedDetail = true;
      }
    }
  }
</script>

<style lang='scss' rel="stylesheet/scss" type="text/css" scoped>
@import '../../../common/css/mixin';
  #headerWarpper {
    height: 0.42rem;
    background-color: #FFFFFF;
    border: 0 solid #DDDDDD;
    font-size: 0.16rem;
    text-align: center;
    position: relative;
    @include border-bottom(#CCCCCC);
    .tabWarpper {
      line-height:0.4rem;
      span{
        font-family: PingFangSC-Regular;
        color: #333333;
        display: inline-block;
        width: 0.41rem;
        letter-spacing: 0;
        &:nth-child(1) {
          margin-right: 0.09rem;
        }
      }
      .isChecked{
        color: #FF5C5C;
        @include border-bottom(#FF5C5C);
      }
    }
  }
</style>
