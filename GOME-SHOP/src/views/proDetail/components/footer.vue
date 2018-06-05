<template>
  <div id="footerWarpper">
  	<div class="product-action" @click='isPut' >
		  <span v-if="proInfo.putOn">下</span><span v-else>上</span>架美店
	  </div>
	  <div class="product-action changeColor" @click="toShare">去分享</div>
  </div>
</template>

<script>
import { env } from 'common/js/env';
import share from 'components/share';
import { encode } from '@/common/js/utils';
import jsBridge from 'common/js/jsbridge.js'; // 引入jsBridge
import { modifyProductPutOn, fetchProductUserInfo } from '../../../api/productDetail';
export default {
  props: ['proInfo', 'skuId', 'productId', 'userInfo'],
	data(){
		return {
			toastTip: ''
		}
	},
	methods: {
    toShare () {
    	let title = this.proInfo.productTitle;
    	let imgUrl = location.protocol + this.proInfo.imageUrl;
    	if (env.app && env.gomeplus) {
				let appShareInfo = {
					"code": 0,
					"msg": "",
					"data": {
						"title": this.proInfo.productTitle,
						"shareType":"sp",// sp商品分享  dp店铺分享
						"kid":"",// 没有返回空
						"shopId": "",// 店铺id如果是店铺返回店铺id
						"skuId": this.skuId,
						"imgUrl": imgUrl,
						"pageId": "gmmd_detail"
					}
				};
				WebViewJavascriptBridge.callHandler('jsToNativeShare', appShareInfo, function() {});
			} else if (!env.app) {
				let wapShareInfo = {
					title: title,
					desc: '',
					link: location.href,
					imgUrl: imgUrl
				}
				share(wapShareInfo);
			}
    },
		async isPut () {
			let shopId = this.userInfo.shopId;
			let { data } = await fetchProductUserInfo();// 获取用户信息			
			if (data.code === 0) {
				shopId = data.data.shopId;
			}
			if (!shopId) {
				this.toLogin();
				return false;
			}
			let res = await modifyProductPutOn({
				productId: this.productId,
				shopId: shopId,
				action: !this.proInfo.putOn,
				skuId: this.skuId
			});			
			let resData = res.data;
			let status = resData.code === 0 ? '成功' : '失败';
			this.toastTip = this.proInfo.putOn ? ('下架' + status) : ('上架' + status);
			this.$toast({
				duration: 2000,// 持续展示 toast
				forbidClick: true,// 禁用背景点击
				message: this.toastTip
			});
			setTimeout(() => {
				let toast = document.querySelector('.vu-toast');
				let wrapper = document.querySelector('.vu-toast-wrapper');
				wrapper.style.position = 'fixed'
				toast.style.transform = 'translate(-50%,-50%)';
				toast.style.webkitTransform = 'translate(-50%,-50%)';
			}, 0);
			resData.code === 0 && this.$emit('changePutOn');
		},
		/*
		 * 跳转到用户登录页
		 */
		toLogin () {
			if (env.app && env.gomeplus) {
				WebViewJavascriptBridge.callHandler('jsToNativenLackLoginParameters', {}, function() {});
			} else if (!env.app) {
				let host = window.location.host;
				let reg = RegExp(/atguat/);
				//let reg2 = RegExp(/gome|gomeplus/);
				if(reg.test(host)){
					window.location.href='http://login.m.atguat.com.cn/login.html?return_url='+encode(window.location.href)
				}else{
					window.location.href='http://login.m.gome.com.cn/login.html?return_url='+encode(window.location.href)
				}
				//location.href = 'http://login.m.atguat.com.cn/login.html?return_url=' + encode(location.href);
			}
		},
  }
};
</script>
<style lang='scss' rel="stylesheet/scss" type="text/css" scoped>
	#footerWarpper {		
		font-size: 0;
		.product-action {
			display: inline-block;
			width: 50%;
			height: 100%;
			font-family: PingFangSC-Regular;
			font-size: 0.16rem;
			text-align: center;
			color: #666666;
			background-color: #FFFFFF;
			border-top: 1px solid #e4e4e4;
			box-sizing: border-box;
		}
		.changeColor{
			background-image: linear-gradient(90deg, #FA1E8C 0%, #FC1E56 100%);
			color: #FFFFFF;
			border-top: 1px solid #FA1E8C;
		}
	}
</style>
