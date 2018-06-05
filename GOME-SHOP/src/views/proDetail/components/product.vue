<template>
  <div id="productWarpper">
		<div class='topWarpper'>
			<head-top :isArriveDeatail='isArriveDeatail' @clickProduct="clickProduct" @clickDetail="clickDetail"></head-top>
		</div>
		<div class="productMain" id='productMain' v-if="state == 0">
			<div class="carousel" @click="showImagePreview(index)">
				<i class="seat"></i>
				<vu-swipe @change="change" :endFunction="endFunction">
					<vu-swipe-item v-for="(image, index) in proInfo.images" :key="index">
						<img v-lazy="image" width="100%" height="100%"/>
					</vu-swipe-item>
				</vu-swipe>
				<span class="showIndex" v-if='imagesIsArray && proInfo.images.length!==0'>{{ index + 1 }}/{{ proInfo.images.length }}</span>
			</div>
			<info :proInfo="proInfo" :userInfo="userInfo" :gradePrice="gradePrice" class='proInfo'></info>
		</div>
		<!--详情信息-->
		<div class="productDetail" v-else>
			<detail :proInfo="proInfo"></detail>
		</div>
		<div class='productBottom'>
			<foot :proInfo="proInfo" :userInfo="userInfo" :skuId="skuId" :productId="productId" @changePutOn="changePutOn"></foot>
		</div>
  </div>
</template>

<script>
import vui from 'vui'
import jsBridge from 'common/js/jsbridge.js'; // 引入jsBridge
import headTop from '../components/header'; // 引入header
import info from './proInfo'; // 引入proInfo
import foot from './footer'; // 引入footer
import detail from './detail';
import { fetchProductInfo, fetchProductUserInfo, fetchProductGradePrice } from '../../../api/productDetail'
export default {
  props: [],
  data () {
  	return {
  		index: '',
  		proInfo: {},
  		state: 0,
			isArriveDeatail: false,// 是否到达详情
			skuId: '',
			productId: '',
			userInfo: null,
			gradePrice: 0
  	}
  },
  components: {
		headTop,
  	info,
  	foot,
  	detail
  },
	computed: {
		imagesIsArray () {
			let arr = this.proInfo.images;
			return this.isArray(arr);
		}
	},
	created () {
		this.getProData();//调用商品详情接口
	},
  methods: {
  	/*
		 * 接口报错提示信息
		 * msg {String}：错误信息
		 */
		showBadNetwork (msg) {
			this.$toast({
				duration: 2000,
				forbidClick: true,
				message: msg || '亲，你的手机网络不太顺畅喔~'
			})
		},
		async getProData () {
			let shopId = '';

			let { skuId, productId, pageId } = await this.getRequest();
			let { data } = await fetchProductUserInfo();// 获取用户信息
			let userInfo = this.userInfo = data.data;
			
			if (data.code === 0) {
				shopId = data.data.shopId
			}
			
			let proInfo = await fetchProductInfo({
				productId: productId || 'A0000152630',
				skuId: skuId || 'pop8003761815',
				areaId: '11010000',
				shopId: shopId // 2355
			});
			let proData = proInfo.data;
			if (proData.code === 0) {
				this.proInfo = proData.data;
			} else {
				this.showBadNetwork('服务器异常，请稍后重新尝试');
				return false;
			}
			if (!(data.code === 0 && userInfo.vipType.toLowerCase() !== 'normal')) {
				return false;
			}
			// VIP用户返利价格
			let gradeType = '';
			if (userInfo.vipType.toLowerCase() === 'vip') {
				gradeType = 0;
			} else if (userInfo.vipType.toLowerCase() === 'svip') {
				gradeType = 1;
			}
			let gradePrice = await fetchProductGradePrice({
				'gradePriceVos': [{
					'gradeType': gradeType,
					'skuId': skuId || 'pop8003761815',
					'customPrice': this.proInfo.price
				}]
			});
			if (gradePrice.code === 0) {
				let gradePriceVos = gradePrice.data.gradePriceVos;
				this.gradePrice = gradePriceVos.length > 0 && gradePriceVos[0].gradePrice;
			}
		},
		isArray (o) {
			return Object.prototype.toString.call(o) === '[object Array]';
		},
		changePutOn () {
			this.proInfo.putOn = !this.proInfo.putOn;
		},
		clickProduct(){
			this.state = 0;
			/*
			(function smoothscroll(){
				let productMain=document.getElementById('productMain');
				let currentScroll = productMain.scrollTop;
				if (currentScroll > 0) {
					window.requestAnimationFrame(smoothscroll);
					productMain.scrollTo (0,currentScroll - (currentScroll/5));
				}
			})();*/
		},
		clickDetail(){
			this.state = 1;
			/*
			(function smoothscroll(){
				let productMain=document.getElementById('productMain');
				let currentScroll = productMain.scrollTop;
				let detailRange=document.getElementById('product-details').offsetTop;

				console.log("速度===="+(detailRange/5+currentScroll)+"detailRange===="+detailRange)
				if((detailRange/5)+currentScroll<=detailRange){
					window.requestAnimationFrame(smoothscroll);
					productMain.scrollTo (0,(detailRange/5)+currentScroll);
				}
			})();*/
		},
		scrollMain () {
			let productMain = document.getElementById('productMain');
			let detailRange = document.getElementById('product-details').offsetTop;
			productMain.addEventListener("touchmove",() => {
				if (productMain.scrollTop > detailRange) {
					this.isArriveDeatail = true;
				} else {
					this.isArriveDeatail = false;
				}
			})
		},
  	showImagePreview(position, timer) {
			if(this.proInfo.images.length!==0){
				const instance = vui.ImagePreview(this.proInfo.images, typeof position === 'number' ? position : 0);
				if (timer) {
					setTimeout(() => {
						instance.close();
					}, timer);
				}
			}
    },
    change (data) {
    	this.index = data;
    },
		endFunction () {
			console.log('滑动到最后一张触发的方法')
		},		
		changeShowInfo (type) {
			this.state = type;
		},
		getRequest () {
			return new Promise(function(resolve, reject) {
				var url = window.location.search; //获取url中"?"符后的字串 
				var theRequest = new Object(); 
				if (url.indexOf("?") != -1) { 
					var str = url.substr(1); 
					var strs = str.split("&"); 
					for (var i = 0; i < strs.length; i++) {
						theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
					} 
				} 
				resolve(theRequest); 
			});
		}
		/*
		changeState(state){
			this.state = state;
		},		
		loadBottom(){
			console.log('dddd');
			this.state = 1;
			// this.isDetail=true;
			this.$refs.loadmore.onBottomLoaded();
		}*/
  }
};
</script>
<style lang='scss' rel="stylesheet/scss" type="text/css" scoped>
@import '../../../common/css/mixin';
	#productWarpper {
		height: 100%;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		.topWarpper {
			height: 0.4rem; 
    }
		.productMain, .productDetail {
			position: relative;
			z-index: 1;
			flex: 1;
			&::-webkit-scrollbar {
				width: 0;
			}
			overflow-y: scroll;
			//-webkit-overflow-scrolling : touch;
			&:after {
				position: absolute;
				top: 0;
				content: '';
				min-height: calc(100% + 1px);
			}
			.carousel {
				min-height: 2.82rem;
				background: #F0F0F0;
				position: relative;
				.seat {
					display: inline-block;
					width: 0.44rem;
					height: 0.418rem;
					@include bg-image('../images/seat');
					background-size: 100% 100%;
					position: absolute;
					left: 0;
					top: 0;
					right: 0;
					bottom: 0;
					margin: auto;
				}
				.showIndex {
					display: inline-block;
					width:0.44rem;
					line-height:0.2rem;
					opacity: 0.2;
					background: #000000;
					border-radius: 100px;
					text-align: center;
					font-family: PingFangSC-Regular;
					font-size: 0.13rem;
					color: #FFFFFF;
					letter-spacing: 0;
					position: absolute;
					right: 0.14rem;
					bottom:-0.35rem;
					background:red;
					z-index:10000;
				}
			}
			.proInfo {
				margin-top: 0.52rem;
			}
			.vu-swipe {
				cursor: pointer;
				&-item {
					color: #FFFFFF;
					font-size: 0;
					text-align: center;
				}
				img {
					box-sizing: border-box;
					background-color: #FFFFFF;
					pointer-events: none;
					display: inline-block;
				}
				img[lazy="error"] {
					background-color: transparent;
				}
			}
			.vu-loadmore__bottom {
				position: absolute;
				bottom: 0;
				font-size: 0.12rem;
				color: #666;
				width: 100%;
				span {
			    display: inline-block;
			    transition: .2s linear;
			    vertical-align: middle;
				}
			}
			.vu-loadmore {
				height: 100%;
				.vu-loadmore__content {
					height: 100%;
				}
			}
		}
		.productBottom {
			height: 0.49rem;
			line-height: 0.49rem;
	  } 
	}
</style>
<style type="text/css" lang='scss'>
	.productMain{
		.vu-loadmore__content{
			height: 100%;
		}
	}
</style>
