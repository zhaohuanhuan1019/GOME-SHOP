<template>
	<div class="poster-container">
		<template v-if="posterUrl && qrCodeUrl">
			<span class="poster-close" @click="close" data-code="yqhbClose-01">关闭</span>
			<span class="poster-share" @click="share" data-code="yqhbShare-01">分享</span>
			<combineImg :imgUrl="posterUrl" :qrCodeUrl="qrCodeUrl"></combineImg>
		</template>
	</div>
</template>
<script>
	import weixinShare from '@/common/js/weixin'
	import { env } from 'common/js/env'
	import { urlSearch } from '@/common/js/utils'
	import { fetchCMSModule } from '@/api/cmsModule'
	import { fetchUserInfo } from '@/api/firstReward'
	import combineImg from '@/components/combineImg/combineImg.vue'
	export default {
		components: {
			combineImg
		},
		data () {
			let title = '邀请开店-海报分享页'
			let desc = '邀请开店-海报分享页'
			let url = location.href
			let imgUrl = 'https://css.gomein.net.cn/gmpro/1.0.0/public/1.0.0/css/i/logo.png'
			return {
				taskId: -1,
				posterUrl: '',
				qrCodeUrl: '',
				sharePromo: [],
				shareInfo: {
					title: title,
					desc: desc,
					link: url,
					imgUrl: imgUrl
				}
			}
		},
		async created () {
			if (env.app && env.gomeplus) {
				this.removeHeadBar();
			}
			
			weixinShare(this.shareInfo)
			this.taskId = urlSearch()['taskId']
			if (!this.taskId) {
				return false
			}

			// 请求用户登录信息
			await this.getUserInfo()
			// 活动页面去掉登录信息
			if (this.userId < 0) {
				this.toLogin()
				return false
			}
			
			// 地址
			this.qrCodeUrl = location.protocol + '//' + location.host + '/views/invitedNew/invited_new.html?taskId=' + this.taskId +'&userId=' + this.userId
			await this.fetchCMSData()
			this.shareInfo.title = this.sharePromo[0] || this.shareInfo.title
			this.shareInfo.desc = this.sharePromo[1] || this.shareInfo.desc
			// console.log(this.sharePromo, this.shareInfo)
			weixinShare(this.shareInfo)
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
			/*
			 * 获取用户信息
			 */
			async getUserInfo () {
				let { data } = await fetchUserInfo()
				if (data.code === 0) {
					this.userId = data.data.userId
				} else {
					// 返回错误
	      	this.showBadNetwork(data.msg)
				}
			},
			/*
			 * 获取CMS海报分享数据
			 */
			async fetchCMSData () {
				let { data } = await fetchCMSModule({
	        "keyProms": "channelvJWHRLUREUj",
	        "gpsLongitude": "",
	        "gpsLatitude": ""
	      })
	      let res = data.data
	      if (data.code === 0) {
	      	this.posterUrl = res.templetList[0].floorPhotoTemplet.imgList[0].imageUrl
	      	this.sharePromo = res.pageInfo.promoName.split('#')
	      } else {
	      	// 返回错误
	      	this.showBadNetwork(data.msg)
	      }
			},
			/*
			 * 跳转回邀请开店
			 */
			close () {
				//增加数据埋点
        gomeClicki('send', 'event', 'click', '{data-page}', '{data-code}')
				// location.href = '/views/inviteReward/invite_reward.html?taskId=' + this.taskId
				history.go(-1);
			},
			/*
			 * 分享弹窗提示
			 */
			share () {
				//增加数据埋点
	      gomeClicki('send', 'event', 'click', '{data-page}', '{data-code}')
				this.$dialog.alert({
	        message: '请使用手机截屏功能<br/>保存当前图片',
	        confirmButtonText: '知道了',
	        confirmButtonStyle: {
	        	'background': '#FFFFFF',
	        	'color': '#39a9ed'
	        }
	      }).then(() => {
	      	// console.log('点击了知道了')
	      })
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
			
			removeHeadBar () {
				let param = {
				  title: '',
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
		}
	}
</script>
<style lang="scss" scoped>
	.poster-container {
		font-size: 12px;
		background-color: #F3F5F7;
		.poster-close, .poster-share {
			position: absolute;
			width: .54rem;
			height: .27rem;
			line-height: .27rem;
			opacity: 0.5;
			background: #000000;
			border-radius: 100px;
			font-size: .16rem;
			text-align: center;
			color: #FFFFFF;
			z-index: 100;
			top: .15rem;
		}
		.poster-close {
			left: .15rem;
		}
		.poster-share {
			right: .15rem;
		}
	}
</style>