<template>
  <div class="center">
    <button class="buttonOpen" data-code="yqkdClick-01
" id="btn-o" @click="btnClick">{{myInfo.desc}}</button>
    <div class="buttonBottom" data-code="yqkdClick-01
" @click="btnClick" v-show="BarFixed">{{myInfo.desc}}</div>
  </div>
</template>

<script>
//<div v-show="myInfo.login && 0"><a href="javascript:;" class="linkA">切换账号</a></div>
import Vue from "vue";
import { getPosition,getUrlStr,setCookie,getCookie,clearCookie,delCookie,toast} from "common/js/function";
export default {
  data() {
    return {
      BarFixed:false,
      dom:window
    }
  },
  props: ['data','myInfo'],
  created() {
    
  },
  methods: {
    btnClick() {
      this.$emit("creates")
    },
    logout() {
      delCookie("SSO_USER_ID")
      this.data.login = 0
      this.data.desc = '立即开通'
      //window.location.reload()
    },
    handleScroll() {
      let dom = document.getElementById('inviteMain')?document.getElementById('inviteMain'):window
      var scrollTop = dom.pageYOffset || dom.scrollTop
//console.log(scrollTop)
      let offsetTop = document.querySelector('#btn-o').offsetTop + document.querySelector('#btn-o').offsetHeight
      if (scrollTop > offsetTop) {
        this.BarFixed = true
      } else {
        this.BarFixed = false
      }
    }
  },
  mounted() {
    let dom = document.getElementById('inviteMain')?document.getElementById('inviteMain'):window
    dom.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    let dom = document.getElementById('inviteMain')?document.getElementById('inviteMain'):window
    dom.removeEventListener('scroll', this.handleScroll)
  }
};
</script>
<style scoped>
.linkA {
  display: inline-block;
  margin-top:.15rem;
  font-size: .13rem;
  color: #78bee9;
  text-decoration: underline;
}
.buttonOpen {
  background-image: linear-gradient(-90deg, #fa1e8c 0%, #fc1e56 100%);
  min-width: 270px;
  margin: 1px auto;
  color: #fff;
  border-radius: 100px;
  font-size: .16rem;
  line-height: .22rem;
  padding: 9px 45px;
  border: 0;
}

.buttonBottom {
  position: fixed;
  z-index:9999;
  left: 0;
  bottom: 0;
  border: 0;
  background-image: linear-gradient(-90deg, #fa1e8c 0%, #fc1e56 100%);
  width: 100%;
  color: #fff;
  font-size: 17px;
  line-height: 45px;
  padding: 11px auto 10px auto;
}
.center {
  width: 100%;
  margin: 0 auto;
  padding-top: 0.15rem;
  padding-bottom: 0.1rem;
  text-align: center;
  font-size: 0.12rem;
}
</style>
