<template>
  <div>
    <div v-for="(tabcontent,key,index) of tabcontents" class="helpContentBox">
      <div class="titleBox" @click="toggle(index)"><span class="helpTitle" :class="{'activeText':index === activeIndex}">{{key}}</span><span class="helpIconDown" :class="{'activeIcon':index === activeIndex}"></span></div>
      <p v-show="index === activeIndex" class="helpContent" v-html='tabcontent'></p>
    </div>
  </div>
</template>

<script>
import vui from 'vui'
import {mapGetters} from 'vuex'

export default {
  props:['tabcontents'],
  data() {
    return {
    	activeIndex:null
    }
  },
  computed: {

  },
  create() {

  	
  },
  methods:{
    toggle(index) {
      if(this.activeIndex !== index){
        this.activeIndex = index;
      }else{
        this.activeIndex = null
      }
      
    }
  }
}
</script>

<style lang='scss' rel="stylesheet/scss" type="text/css" scoped>
@import '../../../common/css/mixin';
.helpContentBox:nth-child(1){
  margin-top: 0.10rem;
}

.helpContentBox{
  margin-bottom: 0.05rem;
  background-color: #fff;
}

.titleBox{
  height: 0.44rem;

  .helpTitle{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #666666;
    letter-spacing: 0;
    float:left;
    line-height: 0.44rem;
    padding-left: 0.14rem;
  }

  .activeText{
    color:#333333;
  }
  
  .helpIconDown{
    @include bg-image('/static/img/dropdown');
    float:right;
    background-size: 0.12rem 0.06rem;
    display: inline-block;
    width: 0.12rem;
    height: 0.06rem;
    margin-right: 0.16rem;
    margin-top: 0.19rem;
  }
  

  .activeIcon{
     @include bg-image('/static/img/pullup') ;
  }
    
}

.helpContent{
  font-family: PingFangSC-Regular;
  font-size: 15px;
  color: #333333;
  letter-spacing: 0;
  line-height: 0.22rem;
  padding: 0 0.14rem 0.12rem 0.14rem;
  text-align:justify;
}

</style>