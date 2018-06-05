<template>
  <div class="center">
    <button class="buttonOpen" id="btn-o" @click="btnClick" data-code="yqkdClick-01">{{data.desc}}</button>
    <div class="buttonBottom" @click="btnClick" v-show="BarFixed" data-code="yqkdClick-01">{{data.desc}}</div>
    <div v-show="data.login"><a href="javascript:;" class="linkA" @click="logout">切换账号</a></div>
  </div>
</template>

<script>
import Vue from "vue";
import { getPosition,getUrlStr,setCookie,getCookie,clearCookie,toast} from "common/js/function";
export default {
  data() {
    return {
      BarFixed:false
    }
  },
  props: ['data'],
  created() {
    
  },
  methods: {
    btnClick() {
      this.$emit("creates")
    },
    logout() {
      clearCookie("userid")
      this.data.login = 0
      this.data.desc = '立即开通'
      window.location.reload()
    },
    handleScroll() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop

      let offsetTop = document.querySelector('#btn-o').offsetTop + document.querySelector('#btn-o').offsetHeight
      if (scrollTop > offsetTop) {
        this.BarFixed = true
      } else {
        this.BarFixed = false
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
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
