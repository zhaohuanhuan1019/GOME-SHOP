<template>
	<div class="reward-container">
		<div v-if="taskOff">
			<sysheader v-if="hasHeader" :titleName="titleName"></sysheader>
			<offline-activity v-if='isOff' class="no-content"></offline-activity>
			<expired-activity v-else class="no-content" :url='InvalidUrl'></expired-activity>
		</div>
		<template v-else>
			<sysheader v-if="hasHeader" :titleName="titleName" :shareDate="wapShareInfo"></sysheader>
			<div class="reward-item" v-if="cmsResult && cmsResult.templetList && cmsResult.templetList.length > 0" v-for="(item, index) in cmsResult.templetList" :key="item.templetId">
				<template v-if="index===1">
					<div class="reward-item" v-if="item.textMarkTemplet && item.textMarkTemplet.textMarkList && item.textMarkTemplet.textMarkList.length > 0">
						<div class="reward-item--content custom-floor" v-if="status > -1">
							<vu-button @click.stop.prevent="involve" :style="activityStyle(item)" class="custom-floor--operate" data-code="sdClick-01">{{ activityTxt(0) }}</vu-button>
							<div class="custom-floor--tip">{{ activityTxt(1) }}</div>
						</div>
					</div>
				</template>
				<template v-else>
					<component v-if="item.templetCode !== 'focusPhotoListTemplet'" :is="currentView(item.templetCode)" :data="item">
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
		      <template v-else>
		      	<vu-swipe :autoplay="3000">
			        <vu-swipeItem v-for="(image, index) in item.focusPhotoListTemplet" :key="index">
			          <a :href="image.scheme" :data-code="item.templetId + '_' + index">
			          	<img :src="image.imageUrl" />
			          </a>
			        </vu-swipeItem>
			      </vu-swipe>
		      </template>
				</template>
			</div>
		</template>		
	</div>
</template>
<script>
	import weixinShare from '@/common/js/weixin'
	import { env, system } from 'common/js/env'
	import { getCookie, encode, urlSearch } from '@/common/js/utils'
	import { fetchCMSModule } from '@/api/cmsModule'
	import { fetchRewardTemplets, fetchRewardStatus, fetchRewardInvolve, fetchIsShopKeeper, fetchUserInfo, fetchGoodsPuton, fetchShareinfo, fetchKid } from '@/api/firstReward'
	import share from 'components/share'
	import sysheader from '@/components/sysheader'
	import goods from 'components/goods/trebleGoods'
	import focusPhotoList from '@/components/carousel/carousel'
	import offlineActivity from '@/components/OfflineActivity'
  	import expiredActivity from '@/components/ExpiredActivity'
	import floorPhoto from '@/components/floorPhoto/floorPhoto'
	import tagGoodsList from 'components/tagGoodsList/trebleTagGoodsList'
	export default {
		components: {
			sysheader,
			goods,
			floorPhoto,
			tagGoodsList,
			focusPhotoList,
			offlineActivity,
			expiredActivity
		},
		metaInfo () {
			return {
				title: this.titleName
			}
		},
		data () {
			let title = '首单奖励'
			let desc = '美店分享首单获取奖励'
			let url = location.href// 'https://www.gome.com.cn'
			let imgUrl = 'https://css.gomein.net.cn/gmpro/1.0.0/public/1.0.0/css/i/logo.png'
			return {
				hasHeader: !(env.app && env.gomeplus),
				userId: -1, // 用户Id
				cmsResult: {},
				appShareInfo: {
					title: title,
					shareDesc: desc,
					shareUrl: url,
					shareImageUrl: imgUrl,
					platform:['WeiBo','Wechat','WechatMoments','QQ','QZone','GomeMyFriends','GomeMoments','CopyLink']
				},
				wapShareInfo: {
					title: title,
					desc: desc,
					link: url,
					imgUrl: imgUrl
				},
				status: -1, // 用户首单奖励状态
				taskId: -1, // 任务Id
				taskOff: false, // 任务是否失效
				isOff: false, // 失效或过期
				shopKeeper: false // 是否为新美店主
			}
		},
		async created() {
			weixinShare(this.wapShareInfo)
			this.taskId = urlSearch()['taskId'] || -1
			// 活动失效
			if (this.taskId < 0) {
				this.taskOff = true
				this.isOff = true
				return false
			}
			// 请求用户登录信息
			await this.getUserInfo()
			// 活动页面去掉登录信息
			// if (this.userId < 0) {
			// 	this.toLogin()
			// 	return false
			// }
			
			await this.rewardStatus()
			await this.fetchData()

			let u = navigator.userAgent;
			let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			if(isAndroid && localStorage.getItem("firstRewardTop")!==null){
				this.$nextTick(function(){
					let firstRewardTop = localStorage.getItem("firstRewardTop");
					
					setTimeout(() => {
						localStorage.removeItem("firstRewardTop");
						document.querySelector('body').scrollTop=firstRewardTop;
					},500)
				});
			}
			
			
			// 请求是否为新美店主
			// await this.isShopKeeper()
		},
		methods: {
			/*
			 * 团抢文案
			 */
			shortWord (product) {
				if (product.shortWord === '抢购' || product.shortWord === '团购') {
					return product.shortWord
				} else if (!product.shortWord && product.goodsType === 1) {
					return '抢购'
				} else if (!product.shortWord && product.goodsType === 2) {
					return '团购'
				}
				return ''
			},
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
			/*
			 * 获取用户信息
			 */
			async getUserInfo () {
				let { data } = await fetchUserInfo()
				if (data.code === 0) {
					this.userId = data.data.userId
					this.shopKeeper = data.data.openShop
				} else {
					// 返回错误
	      	// this.showBadNetwork(data.msg)
				}
			},
			/*
			 * 判定是否为美店主
			 */
			async isShopKeeper () {
				let { data } = await fetchIsShopKeeper()
				if (data.code === 0) {
					this.shopKeeper = data.data.status === 0
				} else {
					// 返回错误
	      	// this.showBadNetwork(data.msg)
				}
			},
			/*
			 * 根据环境调用不同的分享组件
			 */
			share (shareInfo) {
				if (env.app && env.gomeplus) {
					GomeJSBridge.callShareComp((data) => {
						let cookie = document.cookie;
						let firstRewardTop =document.body.scrollTop;
						localStorage.setItem("firstRewardTop",firstRewardTop);
						
						let u = navigator.userAgent;
						let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
						if(isAndroid && data.shareResult!=='3' && data.platform=='WeiBo'){
							console.log('cookie丢失，需要强刷页面');
							location.replace(window.location.protocol+"//"+window.location.host+'/api-meidian-app/task/path/v1/firstRewardUrl');
							// location.reload();
							// window.location.href = window.location.protocol+"//"+window.location.host+'/api-meidian-app/task/path/v1/firstRewardUrl'
						}
					}, (err) => {
						console.log(err)
					}, shareInfo || this.appShareInfo)
				} else if (!env.app) {
					shareInfo = shareInfo || this.wapShareInfo
					share(shareInfo)
				}
			},
			/*
			 * 根据楼层名称解析对应的CMS组件名称
			 * floor {String} 楼层名称
			 */
			currentView (floor) {
				let temp = floor.replace(/Templet/g, '')
				temp = temp.replace(/([A-Z])/g, '-$1').toLowerCase()
				return temp
			},
	    	/*
			 * 根据用户首单奖励状态解析活动按钮文案和提示文案
			 * index {int} 0：按钮文案，1：提示文案
			 */
			activityTxt (index) {
				try {
					let content = this.cmsResult.templetList[1].textMarkTemplet.textMarkList[0].text.split('#')
					let statusTxt = content[this.status]
					return statusTxt.split('*')[index]
				} catch (e) {
					return ''
				}
				
			},
			/*
			 * 根据用户首单奖励状态解析活动按钮文案背景色和字体颜色
			 */
			activityStyle (item) {
				// CMS未配置颜色就使用UI默认颜色
				let tmpColor = ''
				let tmpBg = {}
				if (this.status !== 0) {
					tmpColor = item.templateBgColor || '#000'; 
					tmpBg = { 'backgroundColor': '#FFFFFF', borderColor: tmpColor }
				} else {
					tmpColor = '#FFFFFF'
					if (!item.templateBgColor) {
						tmpBg = { 'backgroundImage': 'linear-gradient(-90deg, #FA1E8C 0%, #FC1E56 100%)' }
					} else {
						tmpBg = { 'backgroundColor': item.templateBgColor }
					}
					tmpColor = item.templateContentFontColor || tmpColor
				}
				return { 'color': tmpColor, ...tmpBg }
			},
			/*
			 * 设置gomeapp的header
			 */
			setHeadBar () {
                let u = navigator.userAgent;
				let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
				if (isAndroid) {
					GomeJSBridge.ready(() => {
						let param = {
							title: this.titleName,
							titleColor: '333333',
							menus: {
								isShowCloseMenu: 'N',
								rightMenus: [{
									type: 'callback',
									title: '回调',
									icon: 'file://share',
									data: {}
								}]
							}
						} 
						GomeJSBridge.setHeadBar((data) => {
						//console.log(data)
						}, (err) => {
						//console.log(err)
						}, param)
					}, null)
					
					GomeJSBridge.onCallback((data) => {
                        this.share(this.appShareInfo)
                    })
				} else {
					let param = {
						title: this.titleName,
						titleColor: '333333',
						menus: {
							isShowCloseMenu: 'Y',
							rightMenus: [{
								type: 'share',
								title: '分享',
								icon: 'file://share',
								shareInfo: this.appShareInfo,
							}]
						}
					} 
					GomeJSBridge.setHeadBar((data) => {
					//console.log(data)
					}, (err) => {
					//console.log(err)
					}, param)
				}
				
			},
			removeHeadBar () {
				let param = {
				  title: this.titleName,
				  titleColor: '333333',
				  menus: {
						isShowCloseMenu: 'Y',
						rightMenus: []
				  }
				} 
				GomeJSBridge.setHeadBar((data) => {
				  //console.log(data)
				}, (err) => {
				  //console.log(err)
				}, param)
			},
			/*
			 * 拉取CMS配置信息
			 */
			async fetchData () {
				let { data } = await fetchRewardTemplets({
					"keyProms": "channeloaSju39TFLM",
					"gpsLongitude": "",
					"gpsLatitude": ""
				})
				if (data.code === 0) {
					// 调整自定义按钮的楼层位置
					let res = this.cmsResult = data.data
					let custom = res.templetList.shift()
					res.templetList.splice(1, 0, custom)

					// 更新分享内容
					this.updateShareInfo(res.pageInfo)
				} else {
					// 返回错误
					this.showBadNetwork(data.msg)
				}	      
			},
			/*
			 * 更新分享内容
			 * res {Object} CMS返回内容
			 */
			updateShareInfo (res) {
				let sharePromo = res.sharePromo.split('#')
				this.wapShareInfo.title = sharePromo[0]
				this.wapShareInfo.desc = sharePromo[1]
				this.wapShareInfo.link = window.location.href
				this.wapShareInfo.imgUrl = res.shareImgUrl

				weixinShare(this.wapShareInfo)

				this.appShareInfo.title = sharePromo[0]
				this.appShareInfo.shareDesc = sharePromo[1] || '发现了超值活动，速来围观！'
				this.appShareInfo.shareUrl = window.location.href
				this.appShareInfo.shareImageUrl = this.completeUrl(res.shareImgUrl)
			},
			/*
			 * 用户首单奖励状态
			 */
			async rewardStatus () {
				let { data } = await fetchRewardStatus({
					"taskId": this.taskId
				})
				if (data.code === 0) {
					// 返回成功
					if (env.app && env.gomeplus) {
						this.setHeadBar()
					}
					return this.status = data.data.status || 0
				} else if (data.code === 10102) {
					// 活动失效
					let res = data.data
					this.taskOff = true
					if (res && res.taskId) {
						if (!res.taskId) {
							this.isOff = true
						} else {
							this.isOff = false
							this.InvalidUrl = location.href.split('?')[0] + '?taskId=' + res.taskId
						}
					} else {
						this.isOff = true
					}
					if (env.app && env.gomeplus) {
						this.removeHeadBar()
					}
				} else {
					// 未登录或非新美店主或其它错误
					if (env.app && env.gomeplus) {
						this.setHeadBar()
					}
					// this.showBadNetwork(data.msg)
					return this.status = 0
				}
			},
			/*
			 * 用户首单奖励参加活动
			 */
			async involve () {
				// 不可参加活动
				if (this.status !== 0) {
					return false
				}

				// 验证失败
				if (!this.validIdentity()) {
					return false
				}
				

				let { data } = await fetchRewardInvolve({
					"taskId": this.taskId
				})
				//增加数据埋点
        		gomeClicki('send', 'event', 'click', '{data-page}', '{data-code}');
				if (data.code === 0) {
					// 已领取
					this.status = 1
				} else {
					// 返回错误
					this.showBadNetwork(data.msg)
				}
			},
			/*
			 * 验证用户身份信息
			 */
			validIdentity () {				
				if (this.userId < 0) {
					this.toLogin()
					return false
				} else if (!this.shopKeeper) {
					this.toMeidian()
					return false
				}
				return true
			},
			/*
			 * 跳转到用户登录页
			 */
			toLogin () {
				if (env.app && env.gomeplus) {
					GomeJSBridge.login(null, null, { refresh: true })
				} else if (!env.app) {
					location.href = 'http://login.m.atguat.com.cn/login.html?return_url=' + encode(location.href)
				}
			},
			/*
			 * 跳转到美店开通页
			 */
			toMeidian () {
				location.href = 'http://shop.m.atguat.com.cn/mshop_setting.html?return_url=' + encode(location.href)
			},
			/*
			 * 分享商品
			 * goods {Object}：商品信息
			 */
			shareGoods (goods) {
				if (!this.validIdentity()) {
					return false
				}
				// 不可参加活动
				if (this.status !== 0) {
					this.shareGoodsAction(goods)
					return false
				}

				let scrollTop = document.scrollingElement.scrollTop;
				document.body.classList.add('modal-open');
				document.body.style.top = -scrollTop + 'px';
				this.$dialog.confirm({
					title: '首单领好礼',
					message: '马上参与活动，即可赢取奖励',
					confirmButtonText: '马上参与',
					cancelButtonText: '直接分享',
					confirmButtonStyle: {
						'background-image': '',
						'background': '#FFFFFF',
						'color': '#39a9ed'
					}
				}).then(() => {
					document.body.classList.remove('modal-open');
					document.scrollingElement.scrollTop = scrollTop;
					this.involve()
				}).catch(() => {
					this.shareGoodsAction(goods)
					document.body.classList.remove('modal-open');
					document.scrollingElement.scrollTop = scrollTop;
				})
			},
			/*
			 * 商品分享动作
			 */
			async shareGoodsAction (goods) {
				// 上架
				let { data } = await fetchGoodsPuton({
					'productId': goods.goodsBean.productID,
					'skuId': goods.goodsBean.skuID,
					'action': true,
					'taskId': this.taskId
				})
				if (data.code !== 0) {
					// 返回错误
					this.showBadNetwork('商品上架失败：' + data.msg)
					return false
				}

	      		// 上架成功
				let info = await fetchShareinfo({
					'taskId': this.taskId
				})
				let res = info.data
				if (res.code !== 0) {
					// 返回错误
					this.showBadNetwork('分享信息获取失败：' + res.msg)
					return false
				}
				// 分享
				this.share(this.goodsShareInfo(goods, res.data))
				//增加数据埋点
				// gomeClicki('send', 'event', 'click', '{data-page}', '{data-code}')
			},
			/*
			 * 获取完整URL
			 * url {string} 地址
			 */
			completeUrl (url) {
				try {
					return url.indexOf(':') > - 1 ? url : 'http:' + url
				} catch (e) {
					return ''
				}
				
			},
			/*
			 * 商品分享信息
			 */
			goodsShareInfo (goods, info) {
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
				// 	callform: callfrom,
				// 	channel: 0,
				// 	flow: '1',
				// 	url: this.completeUrl(goods.scheme),
				// 	shareKey: '',
				// 	skuId: goods.goodsBean.skuID,
				// 	itemId: goods.goodsBean.productID,
				// 	distSaleId: '',
				// 	merchantId: '',
				// 	userId: this.userId
				// })
				// console.log('kid', kid)
				let kid = `USER_${this.userId}`;
				let shareInfo = {}
				let shareUrl = this.completeUrl(goods.scheme) + `?mid=${info.shopId}` + (info.isStaff ? `&stid=${info.stId}` : '') + `&kid=${kid}`
				if (env.app && env.gomeplus) {
					shareInfo = {
						title: goods.goodsBean.skuName,
						shareDesc: '这是我国美找到的好东西，就知道你会喜欢。',
						shareUrl: shareUrl,
						shareImageUrl: this.completeUrl(goods.goodsBean.skuThumbImgUrl),
						channel: 'product',
						productInfo: {
							uid: this.userId,  //线上会员id
							stid: info.stId,  //门店id
							mid: info.shopId,   //美店id
							kid: kid,  //返利id
							skuid: goods.goodsBean.skuID,// 商品skuid
							shopid: goods.shopId,//店铺Id
							productName: goods.goodsBean.skuName,// 商品名称
							productId: goods.goodsBean.productID//商品id
						},
						qrCodeInfo : {
							QRCodeTitle: goods.goodsBean.skuName,
							QRCodePrice: '¥' + goods.goodsBean.customPrice,
							QRCodeDescription: '',
							QRCodearrGoodsImages: [this.completeUrl(goods.goodsBean.skuThumbImgUrl)],
						},
						platform:['WeiBo','Wechat','WechatMoments','QQ','QZone','CopyLink','GomeMoments','GomeMyFriends','GomeMyCircle','GomeQRCode']
					}
				} else if (!env.app) {
					shareInfo = {
						title: goods.goodsBean.skuName,
						desc: '这是我国美找到的好东西，就知道你会喜欢。',
						link: shareUrl,
						imgUrl: this.completeUrl(goods.goodsBean.skuThumbImgUrl)
					}
				}
				return shareInfo
			},
			async getKid(options) {
				var res = await fetchKid(options);
				return res.data.data.kid;
			}
		},
		computed: {
			titleName () {
				let name = this.cmsResult.pageInfo && this.cmsResult.pageInfo.promoName
				return name || '首单领好礼'
			}
		}
	}
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
<style lang="scss" scoped>
	@import '../../../../common/css/mixin';
	@mixin product-channel($color, $lSpacing, $radius){
		display: inline-block;
		margin-right: .03rem;
		line-height: .12rem;
		text-align: center;
		font-size: .1rem;
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
		background-color: #F3F5F7;
		.reward-item {
			margin-bottom: .1rem;
			&:last-child {
				margin: 0;
			}
			.product-buytype {
				transform: translateX(-100%);
				margin-left: -.15rem;
				padding: 0 .08rem;
				line-height: .16rem;
				position: absolute;
				top: 0;
				background-image: linear-gradient(-90deg, #FF5C5C 0%, #F20C59 100%);
				color: #FFFFFF;
				font-size: 12px;
				letter-spacing: -0.36px;
				text-align: center;
			}
			.product-title {
				display: flex;
				align-items: center;
			}
			.product-name {
				font-size: .14rem;
				flex: 1;
				@include omi-content(1);
			}
			.product-channel--self {
				@include product-channel(#F20C59, -0.3px, 1.5px);
				border: 1px solid #F20C59;
				width: .26rem;				
			}
			.product-channel--store {
				@include product-channel(#FFFFFF, 0, 1px);
				background-image: linear-gradient(-90deg, #60CEFF 0%, #24B6FF 100%);
				width: .26rem;
			}
			.product-channel--abroad {
				@include product-channel(#903DD8, -0.3px, 1.5px);
				border: 1px solid #903DD8;
				width: .38rem;
			}
			.product-subtitle {
				font-size: .1rem;
				color: #F20C59;
				letter-spacing: -0.3px;
				height: .17rem;
				line-height: .17rem;
				@include omi-content(1);
			}
			.product-price {
				font-size: .14rem;
				color: #5A6066;
				margin-bottom: .04rem;
				height: .2rem;
				line-height: .2rem;
			}
			.product-commission {
				display: flex;
				height: .12rem;
				line-height: .12rem;
				font-size: 0;
				color: #FF8D2B;
				letter-spacing: -0.3px;				
				margin-bottom: .03rem;				
				border-radius: 1.5px;
				text-align: center;
			}
			.product-commission--text {
				border: 1px solid #FF8D2B;
				width: .28rem;
				background-color: #FF8D2B;
				font-size: .1rem;
				color: #FFFFFF;
			}
			.product-commission--price {
				border: 1px solid #FF8D2B;
				border-left: 0;
				padding: 0 .015rem;				
				font-size: .1rem;
			}
			.product-operate {
				text-align: right;
			}
			.product-share {
				width: .8rem;
				height: .26rem;
				line-height: .26rem;				
				background-image: linear-gradient(-90deg, #FA1E8C 0%, #FC1E56 100%);
				border-radius: 1rem;
				font-size: .13rem;
				color: #FFFFFF;
				letter-spacing: 0;
			}
			.product-share--icon {
				position: absolute;
				width: .12rem;
				height: .12rem;
				margin-top: .07rem;
				@include bg-image('../../../../common/images/share_btn_icon');
				background-size: 100% 100%;
			}
			.product-share--text {
				margin-left: .16rem;
			}
		}
		.reward-item--content {
			background-color: #FFFFFF;
			text-align: center;
			font-size: 14px;
		}
		.custom-floor {
			padding: .2rem 0;
			.custom-floor--operate {
				width: 2.7rem;
				border-radius: 1rem;
				font-size: 16px;
				color: #FFFFFF;
				letter-spacing: 0;
			}
			.custom-floor--tip {
				padding-top: .1rem;
				font-size: 14px;
				color: #5A6066;
				letter-spacing: 0;
			}
		}
	}
</style>
<style>
	body.modal-open {
		position: fixed;
		width: 100%;
	}
</style>
