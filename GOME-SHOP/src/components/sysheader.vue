<template>
  <div class="headWarpper">
      <i class="back" @click="back"></i>
	    {{titleName}}
      <i class="share" v-if="shareDate" @click="share(shareDate)"></i>
  </div>
</template>

<script>
import share from 'components/share';
export default {
  props: ['titleName', 'shareDate', 'backCb'],
  data() {
    return {
    }
  },
  methods:{
    share (product) {
       console.log(product);
        share(product);
    },
    back () {
      if(this.backCb){
        this.backCb();
        return;
      }
      window.history.back();//返回上一页
      //this.$router.go(-1)
    }
  }
}
</script>

<style lang='scss' rel="stylesheet/scss" type="text/css" scoped>
  @import '../common/css/mixin';
  .headWarpper{
    background-color: #fff;
    width:100%;
    height: 0.44rem;
    line-height: 0.44rem;
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 0.18rem;
    color: #333333;
    letter-spacing: 0;
    .back{
      display:inline-block;
      width:0.22rem;
      height:0.22rem;
      background-size: 100%;
      @include bg-image('../common/images/back');
      position: absolute;
      left: 0.12rem;
      top:0.1rem;
    }
    .share{
      display:inline-block;
      width:0.22rem;
      height:0.22rem;
      background-size: 100%;
      @include bg-image('../common/images/shareButton');
      position: absolute;
      right: 0.15rem;
      top:0.1rem;
    }
  }

</style>
