<style lang="scss" scoped>
@import "../../../../common/css/mixin";
@mixin omi-content($line) {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: $line;
  /* autoprefixer: off */
  -webkit-box-orient: vertical; 
  /* autoprefixer: on */
  word-break: break-all;
}
.owner-detail--wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.1rem 0.15rem;font-size: 12px;
}
.owner-img {
  display: inline-block;
  width: 0.54rem;
  height: 0.54rem;
  padding-right: 0.15rem;
}
.owner-content {
  height: 0.54rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  .owner-name {
    line-height: 0.22rem;
    color: #262c32;
    height: 0.22rem;
    font-size: 0.16rem;
    @include omi-content(1);
  }
  .owner-msg {
    line-height: 0.18rem;
    height: 0.36rem;
    color: #919599;
    font-size: 0.13rem;
    @include omi-content(2);
  }
}
</style>

<template>
  <div class="owner-detail--wrap">
    <img class="owner-img" alt="缩略图" :src="myInfo.userImage">
    <div class="owner-content">
      <span class="owner-name" style="-webkit-box-orient: vertical;">{{myInfo.nickName}}</span>
      <span class="owner-msg" style="-webkit-box-orient: vertical;">{{myInfo.msg}}</span>
    </div>
  </div>
</template>
<script>

import Vue from "vue";
export default {
  props: ['data','myInfo'],
  created() {
    
  }
};
</script>
