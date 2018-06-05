<template>
  <div v-if="list.length>0">
    <div class="order-detail--goods" v-for="item in list" :key="item.id" :callback='func' @click='calls(item)'>
      <img class="goods-logo" alt="商品缩略图" :src="item.sku.image">
      <div class="goods-content">
        <span class="goods-name">{{item.sku.item.name}}</span>
        <div class="goods-msg">
          <span>&yen;{{fmoney(item.sku.price)}}</span>
          <span>x{{item.quantity}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import {formatTime, formatMoney} from "common/js/function.js";
export default {
  data() {
    return {
      items: []
    };
  },
  props: {
    // 数据
    list: {
      type: Array,
      twoWay: true
    },
    // 点击回调
    func: {
      type: Function,
      default: null
    },
    // 点击扩展
    expand: {
      type: Function,
      default: null
    }
  },
  created() {
    console.log(this.list);
    this.initData();
  },
  methods: {
    initData: () => {
      //   let tempList = JSON.parse(JSON.stringify(this.list));
      this.items = this.list;
    },
    calls: m => {
      if (typeof this.func === "function") {
        this.func.call(null, m);
      } else {
        console.log(m);
      }
    },
    fmoney: function(s, n) {
      return formatMoney(s,n)
    }
  },
  update() {
    this.initData();
  },
  mounted() {
    Vue.nextTick(() => {
      this.initData();
    });
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../common/css/mixin";
.order-detail--goods {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.1rem 0.10rem;
  border-bottom: 0.02rem solid #ebeced;
}
.goods-logo {
  display: inline-block;
  width: 0.77rem;
  height: 0.77rem;
  padding-right: 0.1rem;
}
.goods-content {
  height: 0.77rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  .goods-name {
    line-height: 0.17rem;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }
  .goods-msg {
    display: flex;
    justify-content: space-between;
    color: #5a6066;
  }
}
</style>
