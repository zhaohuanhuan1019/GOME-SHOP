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
						</template>
		      </component>
			</div>
      <div class="center" style="height:50px;"></div>
      </div>
		</template>		
	</div>
</template>

<script>
import weixinShare from "@/common/js/weixin";
import { getPosition, getUrlStr } from "common/js/function";
import {
  fetchCreate,
  fetchInvite,
  fetchUserInfo,
  fetchpage,
  fetchGoodsPuton,
  fetchShareinfo,
  fetchKid
} from "@/api/invited";
import { fetchTextIndex } from "@/api/cmsModule";
import { env, system } from "common/js/env";
import { getCookie, encode, urlSearch } from "@/common/js/utils";
import { openApp } from "common/js/openApp";

import offlineActivity from "@/components/OfflineActivity";
import expiredActivity from "@/components/ExpiredActivity";
import share from "components/share";
import sysheader from "components/sysheader";
import vueItems from "./components/nonet";
import detail from "./components/detail";
import goods from "components/goods/trebleGoods";
import focusPhotoList from "components/carousel/carousel";
import floorPhoto from "components/floorPhoto/floorPhoto";
import tagGoodsList from "components/tagGoodsList/trebleTagGoodsList";
export default {
  data() {
    return {
      taskId: 0,
      userId: 0,
      taskOff: false, // 任务是否失效
      isOff: false, // 失效或过期
      data: {},
      myInfo: {
        desc: "立即免费开店",
        hasM: false,
        login: false,
        nickName: "",
        userImage: "",
        shopStatus: 1,
        taskStatus: true,
        status: 1
      },
      status: 1,
      state: 1,
      states: false,
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
  beforeCreate() {
    /*
    1.已登：直接检测开通美店状态
    点击按钮“已经开通美店 去国美APP”，跳转到App下载页-》进入app直接打开《频道页》，
    点击切换账号，注销用户，并刷新页面。
    2.未登：需要登录并开通
    M站登录
    */
  },
  async created() {
    this.state = (env.app && (env.gome || env.gomeplus || env.meidian)) ? 0 : 1;
    let task = Number(getUrlStr("taskId")),
      user = Number(getUrlStr("userId"));
    this.taskId = isNaN(task) ? 0 : task;
    this.userId = isNaN(user) ? 0 : user;
    // this.getPoi();
    /*if (!this.taskId && /^\d+$/.test(this.taskId)) {
      this.showBadNetwork("参数错误，请核实！");
      this.taskOff = true;
      this.isOff = true;
    } else */ if (
      !this.userId &&
      /^\d+$/.test(this.userId)
    ) {
      this.showBadNetwork("参数错误，请核实！");
      this.taskOff = true;
      this.isOff = true;
    } else {
      await this.getStatus()
      await this.getShareWord()
    }
    if (!this.state) {
      this.getUserInfoFromApp()
    }

    let u = navigator.userAgent;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    if(isAndroid && localStorage.getItem("inviteNewTop")!==null){
      this.$nextTick(function(){
        let inviteNewTop = localStorage.getItem("inviteNewTop");
        setTimeout(() => {
          localStorage.removeItem("inviteNewTop");
          document.querySelector('#inviteMain').scrollTop=inviteNewTop;
        },500)
      });
    }
  },
  methods: {
    showBadNetwork(msg) {
      this.$toast({
        duration: 2000,
        forbidClick: true,
        message: msg || "亲，你的手机网络不太顺畅喔~"
      });
    },
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
    async createM() {
      if (!this.myInfo.login) {
        this.toLogin();
        return false;
      }
      let { data } = await fetchCreate({
          inviteUserId: this.userId,
          taskId: this.taskId
        }),
        res = data;
      //code：0为开通成功的新用户，10102过期，1104为未登录
      if (res.code == 0) {
        this.myInfo.hasM = 1;
        location.href =
          "../invitedSuccess/index.html?taskId=" +
          this.taskId +
          "&userId=" +
          this.userId;
      } else if (res.code == 1104) {
        this.toLogin();
        this.showBadNetwork("请登录！");
      } else if (res.code == 10102) {
        this.showBadNetwork("活动已过期！");
        this.taskOff = 1;
      } else {
        this.showBadNetwork(res.msg);
      }
    },
    async getStatus() {
      let _v = this,
        { data } = await fetchInvite({
          inviteUserId: this.userId,
          taskId: this.taskId
        });

      if (data.code == 0 || data.code == 1104) {
        let res = data.data;
        _v.myInfo.nickName = res.nickName;
        _v.myInfo.userImage = res.userImage;
        _v.myInfo.shopStatus = res.shopStatus;
        _v.myInfo.taskStatus = res.taskStatus;
        _v.myInfo.login = data.code == 1104?0:1;
        if (data.data.taskStatus) {
          if (data.data.shopStatus == 0) {
            _v.myInfo.hasM = 1;
            _v.myInfo.desc = _v.myInfo.login
              ? "已开通美店，速去挑好货>"
              : "立即免费开店";
          } else {
            _v.myInfo.hasM = 0;
            _v.myInfo.desc = "立即免费开店";
          }
        } else {
          if (data.data.hasOwnProperty("taskId")&&parseFloat(data.data.taskId)>0) {
            _v.states = true
            _v.taskId = data.data.taskId
            location.href = location.href.split('?')[0] + '?taskId=' + data.data.taskId + '&userId=' + this.userId
          } else {
            this.showBadNetwork("您访问的原活动已过期！")
            location.href = "https://shop.m.gome.com.cn/mshop_setting.html"
          }
        }
      } else if (data.code == 10102) {
        if (data.data.hasOwnProperty("taskId")&&parseFloat(data.data.taskId)>0) {
          _v.states = true
          _v.taskId = data.data.taskId
          location.href = location.href.split('?')[0] + '?taskId=' + data.data.taskId + '&userId=' + this.userId
        } else {
          // _v.taskOff = true
          // _v.isOff = true
          this.showBadNetwork("您访问的原活动已过期！")
          location.href = "https://shop.m.gome.com.cn/mshop_setting.html"
        }
      } else {
        this.showBadNetwork("错误，" + data.msg)
      }
      this.getPage()
    },
    async getShareWord() {
      let { data } = await fetchTextIndex({
        keyProms: "channeldL4PRZBdl2c"
      })
      console.log(data.data)
      if (data.code == 0) {
        this.myInfo.msg = data.data.templetList[1].dataList[0].remark
      }
    },
    async getPage() {
      let { data } = await fetchpage({
        keyProms: "channelHaxQYx3pW3V",
        gpsLongitude: "",
        gpsLatitude: ""
      });
      this.data = data.data;

      if (data.code == 0) {
        window.document.title = data.data.pageInfo.promoName
        this.titleName = data.data.pageInfo.promoName
        if (!this.state) {
          this.setHeadBar()
          document.getElementById('inviteMain').style.top = 0
        }
        data.data.templetList.splice(1, 0, {
          templetCode: "detail"
        });
        data.data.templetList.splice(3, 0, {
          templetCode: "vueItems",
          status: 1
        });
        //this.updateShareInfo(data.data.pageInfo);
      } else {
        this.showBadNetwork("错误，" + data.msg);
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
      this.wapShareInfo.link = window.location.href;//res.shareUrl
      this.wapShareInfo.imgUrl = res.shareImgUrl;

      this.appShareInfo.title = sharePromo[0];
      this.appShareInfo.shareDesc = sharePromo[1];
      this.appShareInfo.shareUrl = window.location.href;//res.shareUrl;
      this.appShareInfo.shareImageUrl = res.shareImgUrl;
    },
    share(shareInfo) {
      if (env.app && env.gomeplus) {
        GomeJSBridge.callShareComp(
          data => {
						let inviteNewTop = document.querySelector('#inviteMain').scrollTop;
						localStorage.setItem("inviteNewTop",inviteNewTop);
						
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
    async shareGoods(goods) {
      if (this.validIdentity()) {
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
        // gomeClicki("send", "event", "click", "{data-page}", "{data-code}");
      }
    },
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
      // let kid = await this.getKid({
      //   callform: callfrom,
      //   channel: 0,
      //   flow: '1',
      //   url: window.location.protocol + goods.scheme,
      //   shareKey: '',
      //   skuId: goods.goodsBean.skuID,
      //   itemId: goods.goodsBean.productID,
      //   distSaleId: '',
      //   merchantId: '',
      //   userId: this.userId
      // })
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
    /*
      * 验证用户身份信息
      */
    validIdentity() {
      if (!this.myInfo.login) {
        this.toLogin();
        return false;
      } else if (!this.myInfo.hasM) {
        this.createM();
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
    btnClick() {
      if (!this.myInfo.login) {
        this.showBadNetwork("请登录！");
      } else if (!this.myInfo.hasM) {
        this.createM();
        //增加数据埋点
        gomeClicki("send", "event", "click", "{data-page}", "{data-code}");
      } else {
        if (!this.state) {
          location.href = "gomeplusapp://m.gome.com.cn/mshop_channel.html";
        } else {
          openApp();
        }
      }
    },
    closetip() {
      this.states = false;
    },
    getPoi() {
      let _v = this,
        poi = getPosition();
      if (typeof poi != "boolean" && typeof poi != "undefined") {
        _v.crd = { latitude: poi.Latitude, longitude: poi.Longitude };
      } else {
        _v.crd = { Latitude: "39.9584481679", Longitude: "116.4647914600" };
      }
    },
    async checkUser() {
      let { data } = await fetchUserInfo();
      if (data.code == 0) {
        this.myInfo.login = data.data.id;
      } else if (data.code == 10404) {
        this.myInfo.login = 0;
      }
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
            //GomeJSBridge.login(null, null, { refresh: false });
          }
        },
        function(data) {
          console.log("error" + data);
        }
      );
    },
    /*
		 * 跳转到用户登录页
		 */
    toLogin() {
      if (env.app && env.gomeplus) {
        GomeJSBridge.login(null, null, { refresh: true });
      } else if (!env.app) {
        console.log(env.uat)
        location.href = env.uat?"http://login.m.atguat.com.cn/login.html?return_url=":"http://login.m.gome.com.cn/login.html?return_url=" + encode(location.href);
      }
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
    currentShow(m) {
      let temp = "";
      if (m.indexOf("focusPhotoList") > -1) {
        temp = "mtit";
      }
      return temp;
    },
    async getKid(options) {
      var res = await fetchKid(options);
      return res.data.data.kid;
    }
  },
  components: {
    detail,
    vueItems,
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
  position: relative;
  font-size: 12px;
  background-color: #f3f5f7;
  #headerTitle {
    position: absolute;
    top: 0;
    left: 0;
  }
  #inviteMain {
    width: 100%;
    position: absolute;
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
