<template>
	<!--详情信息-->
	<div class="product-details" id="productDetails">
		<!-- <vu-loadmore :top-method="loadTop" ref="loadmore"> -->
    <div :class="['detail-tabs', 'tabs-fixed']">
    	<div class="detail-tab--container">
    		<span @click="changeTab(index)" :class="['detail-tab--item', index === tabIndex ? 'active' : '']" v-for="(tab, index) in tabs">
    			{{ tab.title }}
    		</span>
    	</div>
    	<div class="detail-title">
    		<hr class="detail-line" />
    		<div class="detail-name">{{ selectedTab.title }}</div>
    	</div>
    </div>
    <div class="detail-content">
    	<template v-if="tabIndex === 0">
    		<div class="item-box" v-html="productDetail"></div>
    	</template>
    	<template v-else-if="tabIndex === 1">
    		<div class="item-box">
					<ul v-for="(spec, key, index) in specListObj" class="spec-list">
						<li class="spec-item" :class="index == 0 ? 'first-level':''">
							<span class="spec-first-level">{{spec.value}}</span>
						</li>
						<li v-for="sub in spec.subs" class="spec-item">
							<span class="spec-key">
								{{sub.key}}
							</span>
							<span class="spec-value" :class="sub.value !='' ? 'hasValue':'' ">
								{{sub.value}}
							</span>
						</li>
					</ul>
				</div>
    	</template>
    	<template v-else-if="tabIndex === 2">
    		<p class="item-box" v-html="productPack"></p>
    	</template>
    	<template v-else-if="tabIndex === 3">
    		<div class="item-box">
					<p class="service-content">{{productService}}</p>
					<div class="price-desc">
						<div class="price-title">
							<hr class="line"/>
							<span class="name">价格说明</span>
						</div>
						<p class="price-content">1.未划线价格： 该价格是商品的销售标价，最终成交价格可能会因使用优惠券等原因而发生变化，请以订单结算页面价格为准</p>
						<p class="price-content">2.划线价格： 该价格是商品的参考价，可能是商品的厂商指导价、正品零售价、商品吊牌价、品牌专柜价，或者是在国美平台上曾经展示过的销售价等价格,仅供您选购商品时参考。</p>
						<p class="price-content">3.其他： 商品促销信息以商品详情页促销栏目中的信息为准；如您发现活动商品售价或促销信息有异常，请购买前先联系销售商咨询。</p>
					</div>
				</div>
    	</template>
    </div>
		<!--<div slot="top" class="vu-loadmore__top">
	    	<span><img src=""/></span>
	  		<span>下拉返回商品详情</span>
	    </div>
		</vu-loadmore> -->
	</div>
</template>
<script>
import { fetchProductImagesInfo } from '../../../api/productDetail';
export default {
  props: ['proInfo'],
  data () {
  	let list = ['商品详情', '规格参数', '包装清单', '售后服务']
  	let tabs = list.map((tab, index) => {
  		return {
  			id: index,
  			title: tab
  		}
  	})
  	return {
  		tabsFixed: false,
  		tabIndex: 0,
  		tabs: tabs,
  		specListObj: {},
  		specList: [],//规格参数
  		productImgUrl: '',//图文详情url地址
  		productService: '',//售后服务内容
  		productPack: '',//包装清单内容
  		productDetail: ''
  	}
  },
  async created () {
    this.productPack = this.proInfo.productPack;
		this.productImgUrl = this.proInfo.productDescription;
		this.productService = this.proInfo.productService;
		this.specList = this.proInfo.specList;
		this.specListHandler();
		let { data } = await fetchProductImagesInfo({
			'url': 'http:' + this.proInfo.productDescription// 'http://desc.gome.com.cn/html/bbchtml/productDesc/descHtml201803/desc04/A0006374255_mobile.html'
		})
		if (data.code === 0) {
			let reg = /\<body[^>]+\>\s+(.+)\s+\<\/body\>/g;
			let res = reg.exec(data.data.htmlConent);
			this.productDetail = res.length > 1 ? res[1] : '';
		}
  },
  methods: {
  	changeTab (index) {
  		this.tabIndex = index;
  	},
  	/**
		* 对规格清单数组进行数据处理
		*/
		specListHandler () {
			for(let i=0;i<this.specList.length;i++){
				//一级目录
				if(this.specList[i][1]==""){
					if(!this.specListObj[this.specList[i][2]]){
						this.specListObj[this.specList[i][2]]={
							value:this.specList[i][0],
							subs:[]
						}
					}
				}else{
					this.specListObj[this.specList[i][2]].subs.push({
						key:this.specList[i][0],
						value:this.specList[i][1]
					})
				}
			}
		},
		// loadTop(){
		// 	this.$emit('changeState',0);
		// 	this.$refs.loadmore.onTopLoaded();
		// },
		/**
		* 根据id获取元素
		*/
		getById (id) {
			return document.getElementById(id);
		}
  },
  computed: {
  	selectedTab () {
  		return this.tabs[this.tabIndex];
  	}
  },
  mounted () {
  	/*
  	let startY = 0;
  	let productDetail = document.querySelector('.productDetail');
  	let productDetails = document.getElementById('productDetails');
  	let distance = document.querySelector('.detail-tabs').offsetHeight;
  	productDetails.addEventListener("touchstart", (e) => {
  		let touch = e.touches[0];
			startY = touch.pageY;
		});
  	productDetails.addEventListener("touchmove", (e) => {
  		
  		let touch = e.touches[0];
			let deltaY = touch.pageY - startY;
			console.log(deltaY)
			if (Math.abs(deltaY) === 0) {
				console.log(productDetail.scrollTop, distance)
				return false
			}
			if (productDetail.scrollTop >= distance) {
				this.tabsFixed || (this.tabsFixed = true)
			} else {
				this.tabsFixed && (this.tabsFixed = false)
			}
		});
		*/
  }
};
</script>
<style lang='scss' scoped>
	.tabs-fixed {
		position: fixed;
		top: .4rem;
	}
	.detail-tabs {
		// position: sticky;
		// top: 0;
		width: 100%;
		background-color: #FFFFFF;
		height: .72rem;
		font-size: .14rem;
		color: #666666;
		letter-spacing: 0;
		.detail-tab--container {
			display: flex;			
			.detail-tab--item {
				position: relative;
				flex: 1;
				text-align: center;
				padding: .11rem 0;
				line-height: .19rem;
				box-sizing: border-box;
				&:after {
					position: absolute;
					right: 0;
					content: '';
					height: .19rem;
					border-left: 1px solid #DDDDDD;
				}
				&:last-child:after {
					border-left: none;
				}
				&.active {
					color: #F20C59;
					border-bottom: 1px solid #F20C59;
				}
			}
		}		
		.detail-title {
			position: relative;
			padding: .15rem .2rem .14rem;
			box-sizing: border-box;
			font-size: 0;
			.detail-line {
				height: 0;
				border: 0;
				border-bottom:1px solid rgba(221,221,221,0.50);
			}
			.detail-name {
				width: 0.8rem;
				position: absolute;
				left: 50%;
				top: 0.07rem;
				margin-left: -0.4rem;
				font-size: .12rem;
				color: #666666;
				background: #FFFFFF;
				text-align: center;
			}
		}
	}
	.detail-content {
		padding-top: .72rem;
		flex: 1;
		font-size: .14rem;
		color: #666666;
		letter-spacing: 0;		
		.item-box {
			width: 100%;
			min-height: calc(100% + 1px);
			padding: 0 0.2rem;
			box-sizing: border-box;
		}		
		.price-desc{
			width: 100%;
			padding-bottom:0.2rem;
			box-sizing: content-box;
			position: relative;
			.title{
				padding: 20px 0;
			}
			.price-content{
				font-size: 0.14rem;
				line-height: 0.24rem;
				color: #747474;
			}
		}
		.price-title{
			width: 100%;
			height: 0.3rem;
			position: relative;
			margin-top: 0.27rem;
			.line {
				width: 100%;
				height: 0;
				border: 0;
				border-bottom:1px solid rgba(221,221,221,0.50);
				position: absolute;
				top: 0.1rem;
			}
			.name {
				width: 0.8rem;
				display: block;
				position: absolute;
				left: 50%;
				top: 0.05rem;
				margin-left: -0.4rem;
				font-size: .12rem;
				color: #666666;
				background: #FFFFFF;
				text-align: center;
			}
		}
		.spec-list {
			width: 100%;
			.spec-item {
				width: 100%;
				font-size: 0;
				border: 1px solid #DADADA;
				border-top: 0;
				background-color: #EFEFEF;
			}
			.first-level{
				border: 1px solid #DADADA;
			}
			.spec-first-level {
				font-size: 0.14rem;
				color: #666;
				padding: .05rem .1rem;
				width: 100%;
				display: block;
				box-sizing: border-box;
			}
			.spec-key,
			.spec-value {
				font-size: 0.14rem;
				color: #666666;
				padding: .05rem .1rem;
				display: inline-block;
				width: 50%;
				box-sizing: border-box;
			}
			.hasValue {
				background-color: #FFFFFF;
				border-left: 1px solid #DADADA;
			}
		}
	}
</style>
<style lang='scss'>
.product-details {
	display: flex;
	position: relative;
	height: 100%;
	.detail-content {
		.item-box img {
			width:100%;
			height:auto;
		}
	}
	.vu-loadmore{
		height: 100%;
	}
	.vu-loadmore__top{
		font-size: 0.12rem;
		color: #666;
		width: 100%;
		span {
	    display: inline-block;
	    transition: .2s linear;
	    vertical-align: middle;
		}
	}
}	
</style>
