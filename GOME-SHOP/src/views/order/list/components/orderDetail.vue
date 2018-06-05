<style lang="scss">
//
//1.6rem-1.2rem 1.45rem
@import "../../../../common/css/mixin";
.order-detail--container {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: #f3f5f7;
  font-size: 12px;
  color: #262c32;
  .order-detail--time {
    flex: 1;
    padding: 0.05rem 0.1rem;
    color: #919599;
    line-height: 0.26rem;
    font-size: 11px;
    border-top: 0.02rem solid #ebeced;
    background-color: #ffffff;
  }
}
.order-detail {
  .order-detail--item {
    margin-top: 0.05rem;
    background-color: #ffffff;
    &:nth-child(1) {
      margin-top: 0;
    }
  }
  .order-detail--title,
  .order-detail--address,
  .order-detail--msg,
  .order-detail--price {
    padding: 0 0.1rem;
  }
  .order-detail--title {
    display: flex;
    justify-content: space-between;
    line-height: 0.4rem;
    border-bottom: 0.02rem solid #ebeced;
    color: #262c32;
    font-size: 14px;
    .order-detail--status {
      color: #f20c59;
    }
  }
  .order-detail--delivery {
    border: none;
  }
  .order-detail--address {
    display: flex;
    line-height: 0.48rem;
    align-items: center;
    font-size: 12px;
    color: #5a6066;
    .order-detail--pos {
      width: 0.15rem;
      height: 0.246rem;
      margin-right: 0.115rem;
      @include bg-image("/static/img/order-detail-pos");
      background-size: 100% 100%;
    }
  }
  .order-detail--cline {
    height: 0.05rem;
    @include bg-image("/static/img/order-detail-cline");
    background-size: 100% 100%;
  }
  .order-detail--msg {
    display: flex;
    justify-content: space-between;
    line-height: 0.27rem;
    padding: 0.05rem 0.1rem;
    font-size: 12px;
    color: #5a6066;
  }
  .order-detail--price {
    line-height: 0.32rem;
    color: #5a6066;
  }
  .goods-paid {
    span + span {
      padding-left: 0.1rem;
    }
  }
  .order-msg {
    color: #5a6066;
    line-height: 17px;
    margin-top: 10px;
  }
  .order-msg,
  .goods-paid,
  .goods-commission {
    display: flex;
    justify-content: space-between;
  }
  .goods-paid--sum,
  .goods-commission--sum {
    color: #f20c59;
  }
  .order-detail--info {
    margin-top: 0.05rem;
    background-color: #ffffff;
  }
}
.order-nodata {
  text-align: center;
  .order-nodata-logo {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    margin-top: 1.28rem;
    @include bg-image("/static/img/no-order");
    background-size: 100% 100%;
  }
  .order-nodata-tip {
    margin-top: 0.4rem;
    font-size: 14px;
    color: #919599;
  }
}
</style>

<template>
  <div class="order-detail--container">
    <template v-show="show">
    <ul class="order-detail">
      <li class="order-nodata">
        {{msg}}
      </li>
    </ul>
    </template>
    <template v-if="data.id && id">
    	<ul class="order-detail">
        <li class="order-detail--item">
          <div class="order-detail--title">
            <span>美店订单号：{{id}}</span>
            <span class="order-detail--status">{{data.statusDesc}}</span>
          </div>
          <div class="order-detail--title order-detail--delivery">
            <span>收货人：{{data.consignee.name}}</span>
            <span>{{data.consignee.mobile}}</span>
          </div>
          <div class="order-detail--address">
            <i class="order-detail--pos"></i>{{data.consignee.address}}	    	
          </div>
          <div class="order-detail--cline"></div>
          <div class="order-detail--title">
            <span>买家信息</span>
          </div>
          <div class="order-detail--msg">
            <span>买家昵称：</span>
            <span>{{data.buyer.name}}</span>
          </div>
          <div class="order-detail--msg">
            <span>买家手机号码：</span>
            <span>{{data.buyer.mobile}}</span>
          </div>
          <div class="order-detail--msg">
            <span>支付方式</span>
            <span>{{data.payTypeDesc}}</span>
          </div>
        </li>
        <li class="order-detail--item" v-if='data.orderItems.length>0'>
          <div class="order-detail--title">
            <span>商品信息</span>
          </div>
          <vue-items :list.sync="data.orderItems" :func='nodeClick'></vue-items>
        </li>
        <li class="order-detail--info">
          <div class="order-detail--price">
            <div class="goods-paid">
              <span>实付金额(含运费)：</span>
              <span class="goods-paid--sum">&yen;{{fmoney(data.paymentAmount+data.shippingCost)}}</span>
            </div>
            <div class="goods-commission">
              <span>佣金：</span>
              <span class="goods-commission--sum">&yen;{{fmoney(data.mshopCommission)}}</span>
            </div>
          </div>
        </li>
    	</ul>
      <div class="order-detail--time">
        <div v-if="data.orderTime">下单时间:{{ftime(data.orderTime)}}</div>
        <div v-if="data.deliveryTime">发货时间:{{ftime(data.deliveryTime)}}</div>
        <div v-if="data.confirmationTime">确认时间:{{ftime(data.confirmationTime)}}</div>
      </div>
    </template>

    <template v-if="data.id && mshopId">
  		<ul class="order-detail">
        <li class="order-detail--item">
          <div class="order-detail--title">
            <span>{{data.typeDesc}}单号：{{returnRequestId}}</span>
          <span class="order-detail--status">{{data.statusDesc}}</span>
          </div>
          <div class="order-detail--title">
            <span>商品信息</span>
          </div>
          <vue-items :list.sync="data.orderItems" :func='nodeClick'></vue-items>
        </li>
        <li class="order-detail--item">
          <div class="order-detail--title">
            <span>{{data.typeDesc}}信息</span>
          </div>
          <div class="order-detail--msg">
            <span>{{data.typeDesc}}订单号：</span><span>{{data.id}}</span>
          </div>
          <div class="order-detail--msg">
            <span>{{data.typeDesc}}数量：</span><span>{{data.quantity}}</span>
          </div>
          <div class="order-detail--msg">
            <span>{{data.typeDesc}}金额：</span><span>&yen;{{fmoney(data.refundAmount)}}</span>
          </div>
          <div class="order-detail--msg">
            <span>{{data.typeDesc}}原因：</span><span>{{data.reason}}</span>
          </div>
          <div class="order-detail--msg">
            <span>{{data.typeDesc}}说明：</span><span>{{data.memo}}</span>
          </div>
        </li>
        <li class="order-detail--item">
          <div class="order-detail--title order-detail--delivery">
            <span>收货人：{{data.consignee.name}}</span>
            <span>{{data.consignee.mobile}}</span>
          </div>
          <div class="order-detail--address">
            <i class="order-detail--pos"></i>{{data.consignee.address}}       
          </div>
          <div class="order-detail--cline"></div>
        </li>
        <li class="order-detail--item">
          <div class="order-detail--title">
            <span>买家信息</span>
          </div>
          <div class="order-detail--msg">
            <span>买家昵称：</span>
            <span>{{data.buyer.name}}</span>
          </div>
          <div class="order-detail--msg">
            <span>买家手机号码：</span>
            <span>{{data.buyer.mobile}}</span>
          </div>
          <div class="order-detail--msg">
            <span>支付方式</span>
            <span>{{data.payTypeDesc}}</span>
          </div>
        </li>
      <div style="clear:both"></div>
      <div class="order-detail--time">
        <div v-if="data.applyTime">申请时间:{{ftime(data.applyTime)}}</div>
        <div v-if="data.acceptanceTime">{{data.typeDesc}}受理:{{ftime(data.acceptanceTime)}}</div>
        <div v-if="data.confirmationTime">{{data.typeDesc}}完成:{{ftime(data.confirmationTime)}}</div>
      </div>
  	  </ul>
    </template>
	</div>
</template>
<script>
import { fetchDetail, fetchasDetail } from "@/api/orderDetail";
import jsBridge from "common/js/jsbridge.js";
import {formatTime, formatMoney} from "common/js/function.js";
import VueItems from "./vue-items";
export default {
  data() {
    return {
      id: 0,
      shopType: 2,
      mshopId: 0,
      returnRequestId: "",
      data: {},
      show: true,
      msg: ""
    };
  },
  ready() {
    console.log("id: " + this.$route.params.id);
    console.log("shopType: " + this.$route.params.shopType);
  },
  created() {
    // 添加是否为一级页面标识
    sessionStorage.setItem('orderOneLevel', 2)
    let _self = this,
      id = this.$route.query.id ? this.$route.query.id : 0,
      mshopId = this.$route.query.mshopId ? this.$route.query.mshopId : 0,
      returnRequestId = this.$route.query.returnRequestId,
      shopType = this.$route.query.shopType ? this.$route.query.shopType : 2;

    this.showMsg("loading...");
    if (/^\d+$/.test(id) && /^\d+$/.test(shopType) && id != 0) {
      this.setMytitle("订单详情");
      _self.id = id;
      _self.shopType = shopType;
      fetchDetail({
        id: _self.id,
        shopType: _self.shopType
      })
        .then(function(result) {
          let res = result.data;
          if (res.code == 0) {
            _self.show = false;
            _self.data = res.data;
          } else {
            _self.showMsg(res.msg);
          }
        })
        .catch(err => {
          _self.showMsg(err);
        });
    } else if (
      /^\d+$/.test(mshopId) &&
      returnRequestId !== "" &&
      mshopId != 0
    ) {
      _self.mshopId = mshopId;
      _self.returnRequestId = returnRequestId;
      fetchasDetail({
        mshopId: _self.mshopId,
        returnRequestId: _self.returnRequestId
      })
        .then(function(result) {
          let res = result.data;
          if (res.code == 0) {
            _self.show = false;
            _self.data = res.data;
            let str = ''+res.data.typeDesc;
            str = str.split('单')[0]
            _self.data.typeDesc = str
            _self.setMytitle(str+'详情');
            // 售后单状态： 默认为0(0:审核中；-1："未知状态"；-101：退货待处理；-117：换货待处理；-115：退货完成； -131："退换货已取消"；-103：退换货审核通过；-124：换货完成；)。
          } else {
            _self.showMsg(res.msg);
            _self.setMytitle("售后详情");
          }
        })
        .catch(err => {
          _self.showMsg(err);
        });
    } else {
      this.setMytitle("订单详情");
      this.showMsg("参数不合法!");
    }
  },
  methods: {
    async setMytitle(str) {
      await jsBridge.setTitle(str);
    },
    filters: res => {
      // result 遍历和适配
      /*
		res.name = res.hasOwnProperty('name') ? res.name : res.deptName
        res.children = res.children || []
		*/
      // 过滤适配完毕，开始赋值,
      let states = {
        "0": "审核中",
        "-1": "未知状态",
        "-101": "退货待处理",
        "-117": "换货待处理",
        "-115": "退货完成",
        "-131": "'退换货已取消'",
        "-103": "退换货审核通过",
        "-124": "换货完成"
      }
      this.data = res;
    },
    showMsg: str => {
      this.show = true;
      this.msg = str;
    }, // 点击节点
    nodeClick: m => {
      console.log(JSON.parse(JSON.stringify(m)));
    },
    // 2击事件
    dbClick: m => {
      //   this.$emit('showMenu', 'dept')
    },
    ftime: function(str) {
      return formatTime(str)
    },
    fmoney: function(s, n) {
      return formatMoney(s,n)
    },
    getDetail: () => {
      let res = {
        code: 0,
        msg: "OK",
        data: {
          id: 2512866516,
          status: 1,
          statusDesc: "待出库",
          payType: 1,
          payTypeDesc: "在线支付",
          orderType: 1,
          shop: { id: 1965, name: "国美月宝贝⬆小店" },
          seller: { id: 100037436516, name: "" },
          buyer: { id: 100037510486, name: "小金牛", mobile: "135****2750" },
          consignee: {
            name: "lw测试",
            mobile: "135****9777",
            phone: "",
            address: "北京北京市朝阳区朝外街道",
            idCard: ""
          },
          delivery: {
            timeType: 0,
            timeTypeDesc: "",
            needConfirmation: false,
            memo: ""
          },
          invoice: {
            type: 0,
            typeDesc: "",
            titleType: 0,
            title: "",
            content: ""
          },
          hasInvoice: 0,
          hasLogistics: true,
          quantity: 1,
          orderAmount: 50000,
          paymentAmount: 50000,
          shippingCost: 0,
          orderTime: 1500608837467,
          paymentTime: 0,
          deliveryTime: 0,
          confirmationTime: 0,
          platformCouponMoney: 0,
          shopCouponMoney: 0,
          shopDiscountMoney: 0,
          onePurchaseMoney: 0,
          gomeMoney: 0,
          mshopCommission: 108,
          splitType: 1,
          orderItems: [
            {
              id: 2512866516,
              quantity: 1,
              hasComment: true,
              orderAmount: 50000,
              paymentAmount: 50000,
              sku: {
                id: "sku20910020",
                image: "http://img.atguat.net.cn/image/sku20910020_80.jpg",
                price: 50000,
                item: {
                  id: "sku20910020",
                  name:
                    "华为（HUAWEI）mate9/Mate9 全网通 移动联通电信4G手机 5.9英寸大屏 八核 双卡双待/华为mate9(月光银 全网通版)"
                },
                attributes: []
              },
              mshop: { id: 1965, name: "国美月宝贝⬆小店" },
              activities: []
            }
          ]
        }
      };
      this.data = res.data;
    }
  },
  components: {
    VueItems
  }
};
</script>
