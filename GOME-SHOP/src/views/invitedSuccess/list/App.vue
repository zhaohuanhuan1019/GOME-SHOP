<template>
	<div id="inviteWarpper">
		<template v-if="taskOff">
			<offline-activity v-if='isOff' class="no-content"></offline-activity>
			<expired-activity v-else class="no-content" :url='InvalidUrl'></expired-activity>
		</template>
		<template v-else>
			<sysheader v-if="state" id="headerTitle" :titleName="titleName"></sysheader>
      <div id="inviteMain" class="reward-container">
        <div v-if="states" id="headerTip">您访问的活动已过期，下面是最新活动！<i class="f-close" @click="closetip"></i></div>
			  <div class="reward-item" v-if="data && data.templetList && data.templetList.length > 0" v-for="(item) in data.templetList" :key="item.templetId">
					<component :is="currentView(item.templetCode)" :data="item" :myInfo="myInfo" @creates="btnClick">
		        <template v-if="item.templetCode ==='tagGoodsListTemplet'" slot="content" slot-scope="props">
              <div v-if="props.product.goodsBean.customPrice>0">
		        	<div class="product-buytype">{{ shortWord(props.product) }}</div>
							<div class="product-title">
								<template v-if="props.product.goodsType === 0">
									<template v-if="props.product.isBBC === 'Y'">
										<span class="product-channel--store">门店</span>
									</template>
									<template v-else-if="props.product.isBBC === 'N'">
										<span class="product-channel--self">自营</span>
									</template>
								</template>
								<template v-else-if="props.product.goodsType === 28">
									<span class="product-channel--abroad">海外购</span>
								</template>
								<span class="product-name" style="-webkit-box-orient: vertical;">{{ props.product.goodsBean.skuName }}</span>
							</div>
							<div class="product-subtitle" style="-webkit-box-orient: vertical;">{{ props.product.promoWord }}</div>
							<div class="product-price">{{ '¥' + parseFloat(props.product.goodsBean.customPrice) }}</div>
							<div class="product-commission">
								<template v-if="item.tagGoodsListTemplet.showRebateFlag === 1 && props.product.goodsBean.rebatePriceDesc">
									<span class="product-commission--text">佣金</span>
									<span class="product-commission--price">{{ props.product.goodsBean.rebatePriceDesc }}</span>
								</template>
							</div>
							<div class="product-operate">
								<vu-button class="product-share" @click.stop.prevent="shareGoods(props.product)" :data-code="'sdShare-'+props.product.goodsBean.skuID">
									<i class="product-share--icon"></i>
									<span class="product-share--text">分享</span>
								</vu-button>
							</div>
							</div>
						</template>
		      </component>
			</div>
      <div class="center" style="height:50px;"></div>
      </div>
		</template>		
	</div>
</template>

<script>
import { env, system } from "common/js/env";
import { getCookie, encode, urlSearch } from "@/common/js/utils";
import { getPosition, getUrlStr } from "common/js/function";
import { fetchCreate,fetchInvite,fetchUserInfo,fetchpage,fetchGoodsPuton,fetchShareinfo, fetchKid } from "@/api/invited";
import { openApp } from "common/js/openApp";

import offlineActivity from "@/components/OfflineActivity";
import expiredActivity from "@/components/ExpiredActivity";
import share from "components/share";
import sysheader from "components/sysheader";
import goods from "components/goods/trebleGoods";
import focusPhotoList from "components/carousel/carousel";
import floorPhoto from "components/floorPhoto/floorPhoto";
import tagGoodsList from "components/tagGoodsList/trebleTagGoodsList";
export default {
  data() {
    return {
      taskId: 0,
      userId: 0,
      data: {},
      hasM: false,
      login: 0,
      desc: "GOME 打开国美",
      taskOff: false, // 任务是否失效
      isOff: false, // 失效或过期
      status: 1,
      state: 1,
      states: 0,
      titleName: window.document.title,
      appShareInfo: {
        title: "免费开店当老板",
        shareDesc: "免费开店当老板",
        shareUrl:
          "http://prom.m.atguat.com.cn/html/prodhtml/topics/201803/5/channelMWhjGIvmmDD.html",
        shareImageUrl:
          "https://css.gomein.net.cn/gmpro/1.0.0/public/1.0.0/css/i/logo.png",
        platform: [
          "WeiBo",
          "Wechat",
          "WechatMoments",
          "QQ",
          "QZone",
          "GomeMyFriends",
          "GomeMyCircle",
          "GomeMoments",
          "ScanQRCode",
          "MyContacts",
          "CopyLink"
        ]
      },
      wapShareInfo: {
        title: "免费开店当老板",
        desc: "免费开店当老板",
        link: "https://www.gome.com.cn",
        imgUrl:
          "https://css.gomein.net.cn/gmpro/1.0.0/public/1.0.0/css/i/logo.png"
      },
      InvalidUrl: "",
      crd: {}
    };
  },
  async created() {
    this.state = (env.app && (env.gome || env.gomeplus || env.meidian)) ? 0 : 1;
    let task = Number(getUrlStr("taskId")),
      user = Number(getUrlStr("userId"));
    this.taskId = isNaN(task) ? 0 : task;
    this.userId = isNaN(user) ? 0 : user;
    if (!this.taskId && /^\d+$/.test(this.taskId)) {
      this.showBadNetwork("参数错误，请核实！")
      this.taskOff = true
      this.isOff = true
    } else if (!this.userId && /^\d+$/.test(this.userId)) {
      this.showBadNetwork("参数错误，请核实！")
      this.taskOff = true
      this.isOff = true
    } else {
      await this.getPage()
      await this.getStatus()
    }
    if (!this.state) {
      this.getUserInfoFromApp()
    }

    let u = navigator.userAgent;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    if(isAndroid && localStorage.getItem("inviteSuccessTop")!==null){
      this.$nextTick(function(){
        let inviteSuccessTop = localStorage.getItem("inviteSuccessTop");
        setTimeout(() => {
          localStorage.removeItem("inviteSuccessTop");
          document.querySelector('#inviteMain').scrollTop=inviteSuccessTop;
        },500)
      });
    }
  },
  methods: {
    shortWord(product) {
      if (product.shortWord === "抢购" || product.shortWord === "团购") {
        return product.shortWord;
      } else if (!product.shortWord && product.goodsType === 1) {
        return "抢购";
      } else if (!product.shortWord && product.goodsType === 2) {
        return "团购";
      }
      return "";
    },
    async getStatus() {
      let _v = this,
        { data } = await fetchInvite({
          inviteUserId: this.userId,
          taskId: this.taskId
        });

      if (data.code == 0) {
        let res = data.data;
        this.login = 1
        if (data.data.taskStatus) {
          if (data.data.shopStatus == 0) {
            _v.hasM = 1
          } else {
            _v.hasM = 0
          }
        } else {
          if (data.data.hasOwnProperty("taskId")&&parseFloat(data.data.taskId)>0) {
            _v.taskId = data.data.taskId
            this.showBadNetwork("您访问的原活动已过期！")
            location.href = "../invitedNew/invited_new.html?taskId=" + data.data.taskId + '&userId=' + this.userId
          } else {
            location.href = "https://shop.m.gome.com.cn/mshop_setting.html"
          }
        }
      } else if (data.code == 1104) {
        this.showBadNetwork("请登录！")
        this.login = 0
        this.toLogin()
      } else if (data.code == 10102) {
        this.login = 1
        if (data.data.hasOwnProperty("taskId")&&parseFloat(data.data.taskId)>0) {
          this.showBadNetwork("您访问的原活动已过期！")
          location.href = "../invitedNew/invited_new.html?taskId=" + data.data.taskId + '&userId=' + this.userId
        } else {
          location.href = "https://shop.m.gome.com.cn/mshop_setting.html"
        }
      } else {
        this.showBadNetwork("错误，" + data.msg);
      }
    },
    async getPage() {
      let { data } = await fetchpage({
        keyProms: "channelbDDMM3w3zwQ",
        gpsLongitude: "",
        gpsLatitude: ""
      });
      if (data.code == 0) {
        this.data = data.data
        this.titleName = window.document.title = data.data.pageInfo.promoName
        if (!this.state) {
          this.setHeadBar()
          document.getElementById('inviteMain').style.top = 0
        }
        //this.updateShareInfo(data.data.pageInfo);
      } else {
        this.showBadNetwork("错误，" + data.msg);
      }
    },
    btnClick() {
      openApp();
    },
    closetip() {
      this.states = false;
    },
    /*
		 * 跳转到用户登录页
		 */
    toLogin() {
      if (env.app && env.gomeplus) {
        GomeJSBridge.login(null, null, { refresh: true });
      } else if (!env.app) {
        location.href = env.uat?"http://login.m.atguat.com.cn/login.html?return_url=":"http://login.m.gome.com.cn/login.html?return_url=" + encode(location.href);
      }
    },
    /*
      * 更新分享内容
      * res {Object} CMS返回内容
      */
    updateShareInfo(res) {
      let sharePromo = res.sharePromo.split("#");
      this.wapShareInfo.title = sharePromo[0];
      this.wapShareInfo.desc = sharePromo[1];
      this.wapShareInfo.link = window.location.href;//res.shareUrl;
      this.wapShareInfo.imgUrl = res.shareImgUrl;

      this.appShareInfo.title = sharePromo[0];
      this.appShareInfo.shareDesc = sharePromo[1];
      this.appShareInfo.shareUrl = window.location.href;//res.shareUrl;
      this.appShareInfo.shareImageUrl = res.shareImgUrl;
    },
    /*
      * 根据环境调用不同的分享组件
      */
    share(shareInfo) {
      if (env.app && env.gomeplus) {
        GomeJSBridge.callShareComp(
          data => {
						let inviteSuccessTop = document.querySelector('#inviteMain').scrollTop;
						localStorage.setItem("inviteSuccessTop",inviteSuccessTop);
						
						let u = navigator.userAgent;
						let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
						if(isAndroid && data.shareResult!=='3' && data.platform=='WeiBo'){
							console.log('cookie丢失，需要强刷页面');
							location.reload();
						}
          },
          err => {
            console.log(err);
          },
          shareInfo || this.appShareInfo
        );
      } else if (!env.app) {
        shareInfo = shareInfo || this.wapShareInfo;
        share(shareInfo);
      }
    },
    /*
      * 分享商品
      * goods {Object}：商品信息
      */
    async shareGoods(goods) {
      if (!this.validIdentity()) {
        return false;
      }
      // 上架
      let { data } = await fetchGoodsPuton({
        productId: goods.goodsBean.productID,
        skuId: goods.goodsBean.skuID,
        action: true,
        taskId: this.taskId
      });
      if (data.code !== 0) {
        // 返回错误
        this.showBadNetwork("商品上架失败：" + data.msg);
        return false;
      }

      // 上架成功
      let info = await fetchShareinfo({
        taskId: this.taskId
      });
      let res = info.data;
      if (res.code !== 0) {
        // 返回错误
        this.showBadNetwork("分享信息获取失败：" + res.msg);
        return false;
      }
      // 分享
      this.share(this.goodsShareInfo(goods, res.data));
      //增加数据埋点
      gomeClicki("send", "event", "click", "{data-page}", "{data-code}");
    },
    /*
			 * 商品分享信息
			 */
    goodsShareInfo(goods, info) {
      let callfrom
      if (env.app) {
        callfrom = 10
      } else {
        if (env.weixin) {
          callfrom = 12
        } else {
          callfrom = 20
        }
      }

      let kid = `USER_${this.userId}`;
      let shareInfo = {};
      let shareUrl =
        window.location.protocol +
        goods.scheme +
        `?mid=${info.shopId}` +
        (info.isStaff ? `&stid=${info.stId}` : "") +
        `&kid=${kid}`;
      if (env.app && env.gomeplus) {
        shareInfo = {
          title: goods.goodsBean.skuName,
          shareDesc: "这是我国美找到的好东西，就知道你会喜欢。",
          shareUrl: shareUrl,
          shareImageUrl: goods.goodsBean.skuThumbImgUrl,
          channel: "product",
          productInfo: {
            uid: this.userId, //线上会员id
            stid: info.stId, //门店id
            mid: info.shopId, //美店id
            kid: kid, //返利id
            skuid: goods.goodsBean.skuID, // 商品skuid
            shopid: goods.shopId, //店铺Id
            productName: goods.goodsBean.skuName, // 商品名称
            productId: goods.goodsBean.productID //商品id
          },
          qrCodeInfo: {
            QRCodeTitle: goods.goodsBean.skuName,
            QRCodePrice: '¥' + goods.goodsBean.customPrice,
            QRCodeDescription: "",
            QRCodearrGoodsImages: ["http:" + goods.goodsBean.skuThumbImgUrl]
          },
          platform: [
            "WeiBo",
            "Wechat",
            "WechatMoments",
            "QQ",
            "QZone",
            "CopyLink",
            "GomeMoments",
            "GomeMyFriends",
            "GomeMyCircle",
            "GomeQRCode"
          ]
        };
      } else if (!env.app) {
        shareInfo = {
          title: goods.goodsBean.skuName,
          desc: "这是我国美找到的好东西，就知道你会喜欢。",
          link: shareUrl,
          imgUrl: goods.goodsBean.skuThumbImgUrl
        };
      }
      return shareInfo;
    },
    showBadNetwork(msg) {
      this.$toast({
        duration: 2000,
        forbidClick: true,
        message: msg || "亲，你的手机网络不太顺畅喔~"
      });
    },
    validIdentity() {
      if (!this.login) {
        this.toLogin();
        return false;
      } else if (!this.hasM) {
        location.href =
          "../invitedNew/invited_new.html?taskId=" +
          data.data.taskId +
          "&userId=" +
          this.userId;
        return false;
      }
      return true;
    },
    setHeadBar() {
      let param = {
        title: this.titleName,
        titleColor: "333333",
        menus: {
          isShowCloseMenu: "Y",
          rightMenus: []
        }
      };
      GomeJSBridge.setHeadBar(
        data => {
          //console.log(data)
        },
        err => {
          //console.log(err)
        },
        param
      );
    },
    getUserInfoFromApp() {
      let self = this;
      GomeJSBridge.isLogin(
        function(data) {
          if (data.isLogined == "Y") {
            GomeJSBridge.getUserInfo(function(data) {
              self.userId = data.profileId;
            });
          } else {
            GomeJSBridge.login(null, null, { refresh: false });
          }
        },
        function(data) {
          console.log("error" + data);
        }
      );
    },
    currentView(m) {
      let temp = m.replace(/Templet/g, "");
      temp = temp.replace(/([A-Z])/g, "-$1").toLowerCase();
      return temp;
    },
    currentClass(m) {
      let temp = "";
      if (m != "detail") {
        temp = "bb10";
      }
      return temp;
    },
    async getKid(options) {
      var res = await fetchKid(options);
      return res.data.data.kid;
    }
  },
  components: {
    sysheader,
    floorPhoto,
    tagGoodsList,
    goods,
    focusPhotoList,
    offlineActivity,
    expiredActivity
  }
};
</script>
<style lang="scss">
.reward-container {
  .tag-goods-container .product {
    height: auto;
    display: flex;
    align-items: center;
    a {
      position: relative;
      align-items: center;
      flex: 1;
    }
    .content {
      flex: 1;
    }
    .vu-button__text {
      position: relative;
    }
  }
}
</style>
<style lang='scss' scoped>
@import "../../../common/css/mixin";
@mixin product-channel($color, $lSpacing, $radius) {
  display: inline-block;
  margin-right: 0.03rem;
  line-height: 0.12rem;
  text-align: center;
  font-size: 0.1rem;
  color: $color;
  letter-spacing: $lSpacing;
  border-radius: $radius;
}
@mixin omi-content($line) {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: $line;
  /* autoprefixer: off */
  -webkit-box-orient: vertical; 
  /* autoprefixer: on */
  word-break: break-all;
}
.reward-container {
  font-size: 12px;
  background-color: #f3f5f7;
  .reward-item {
    margin-bottom: 0.1rem;
    &:last-child {
      margin: 0;
    }
    .product-buytype {
      transform: translateX(-100%);
      margin-left: -0.15rem;
      padding: 0 0.08rem;
      line-height: 0.16rem;
      position: absolute;
      top: 0;
      background-image: linear-gradient(-90deg, #ff5c5c 0%, #f20c59 100%);
      color: #ffffff;
      font-size: 12px;
      letter-spacing: -0.36px;
      text-align: center;
    }
    .product-title {
      display: flex;
      align-items: center;
    }
    .product-name {
      font-size: 0.14rem;
      flex: 1;
      @include omi-content(1);
    }
    .product-channel--self {
      @include product-channel(#F20C59, -0.3px, 1.5px);
      border: 1px solid #f20c59;
      width: 0.26rem;
    }
    .product-channel--store {
      @include product-channel(#FFFFFF, 0, 1px);
      background-image: linear-gradient(-90deg, #60ceff 0%, #24b6ff 100%);
      width: 0.26rem;
    }
    .product-channel--abroad {
      @include product-channel(#903dd8, -0.3px, 1.5px);
      border: 1px solid #903dd8;
      width: 0.38rem;
    }
    .product-subtitle {
      font-size: 0.1rem;
      color: #f20c59;
      letter-spacing: -0.3px;
      height: .17rem;
			line-height: .17rem;
      @include omi-content(1);
    }
    .product-price {
      font-size: 0.14rem;
      color: #5a6066;
      margin-bottom: 0.04rem;
      height: 0.2rem;
      line-height: 0.2rem;
    }
    .product-commission {
      display: flex;
      height: 0.12rem;
      line-height: 0.12rem;
      font-size: 0;
      color: #ff8d2b;
      letter-spacing: -0.3px;
      margin-bottom: 0.03rem;
      border-radius: 1.5px;
      text-align: center;
    }
    .product-commission--text {
      border: 1px solid #ff8d2b;
      width: 0.28rem;
      background-color: #ff8d2b;
      font-size: 0.1rem;
      color: #ffffff;
    }
    .product-commission--price {
      border: 1px solid #ff8d2b;
      border-left: 0;
      padding: 0 0.015rem;
      font-size: 0.1rem;
    }
    .product-operate {
      text-align: right;
    }
    .product-share {
      width: 0.8rem;
      height: 0.26rem;
      line-height: 0.26rem;
      background-image: linear-gradient(-90deg, #fa1e8c 0%, #fc1e56 100%);
      border-radius: 1rem;
      font-size: 0.13rem;
      color: #ffffff;
      letter-spacing: 0;
    }
    .product-share--icon {
      position: absolute;
      width: 0.12rem;
      height: 0.12rem;
      margin-top: 0.07rem;
      @include bg-image("../../../common/images/share_btn_icon");
      background-size: 100% 100%;
    }
    .product-share--text {
      margin-left: 0.16rem;
    }
  }
  .reward-item--content {
    background-color: #ffffff;
    text-align: center;
    font-size: 14px;
  }
  .custom-floor {
    padding: 0.2rem 0;
    .custom-floor--operate {
      width: 2.7rem;
      border-radius: 1rem;
      font-size: 16px;
      color: #ffffff;
      letter-spacing: 0;
    }
    .custom-floor--tip {
      padding-top: 0.1rem;
      font-size: 14px;
      color: #5a6066;
      letter-spacing: 0;
    }
  }
}
#inviteWarpper {
  width: 100%;
  height: 100%;
  font-size: 12px;
  background-color: #f3f5f7;
  #headerTitle {
    position: fixed;
    top: 0;
    left: 0;
  }
  #inviteMain {
    width: 100%;
    position: fixed;
    top: 0.44rem;
    bottom: 0;
    left: 0;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 0;
    }
    #headerTip {
      position: relative;
      height: 0.31rem;
      background: #ffecf2;
      line-height: 0.31rem;
      font-size: 0.14rem;
      color: #c85f82;
      letter-spacing: 0;
      text-align: center;
    }
    .f-close {
      position: absolute;
      top: 0.11rem;
      right: 0.11rem;
      width: 0.12rem;
      height: 0.12rem;
      @include bg-image("../../../common/images/Group");
      background-size: 100% 100%;
    }
  }
}
</style>
