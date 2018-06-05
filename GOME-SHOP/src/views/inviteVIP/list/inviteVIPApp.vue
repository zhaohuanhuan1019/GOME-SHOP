<template>
	<div class="container">
		<broheader :titleName="titleName"></broheader>
		<div :class="inWechat ? 'container-inwechat' : 'container-notwechat'">
			<div class="vip-box1">
			</div>
			<div class="vip-box2">
			</div>
			<div class="vip-box3">
				<!--立即邀请按钮-->
				<vu-button class="invite-btn" @click="toInvite">立即邀请</vu-button>
			</div>	
		</div>
	</div>
</template>
<script type="text/javascript">
	import { queryVipInfo } from '@/api/inviteList'
	import { env } from '@/common/js/env'
	import { encode,errorHandle } from '@/common/js/utils'
	import weixinShare from '@/common/js/weixin'
	import share from 'components/share'
	import broheader from 'components/broheader'

	export default {
		components:{broheader},
		data(){
			return {
				userId:'',//当前用户userId
				userType:'',//用户当前身份，可能取值为vip svip normal
				shareInfo:{},//分享的对象信息
				titleName:'邀请VIP',
				inWechat:false//判断是否在微信，false-不在微信 true-在微信
			}
		},
		created(){
			// //获取用户信息
			// this.getUserInfo();
		},
		mounted(){
			if(env.wechat){
				this.inWechat=true
			}
		},
		methods:{
			async toInvite(){
				// 1 先判断环境
				if(env.wap && !env.wechat){
					location.href="/views/nowx/nowx.html"
					return false;
				}
				// 2 判断是否登录
				await this.getUserInfo();
				// 3 判断用户是否为vip或svip用户 只有这两种用户才有资格邀请
				
				if(this.userType.toLowerCase() === 'vip' || this.userType.toLowerCase() === 'svip'){
					this.shareInfo.title = '我已经在美店帮你申请到VIP资格，现在邀请你一起赚钱'
					this.shareInfo.desc = '邀请你成为美店vip店主，立即获得240元优惠劵及大礼包，纵享高额佣金，分享赚钱月入过万！'
					this.shareInfo.link = window.location.protocol+"//"+window.location.host+"/views/vipPrivilegeOpen/vipPrivilegeOpen.html?inviterUserId="+this.userId
					this.shareInfo.imgUrl = window.location.protocol+"//"+location.host+'/static/img/mdicon.png'
					share(this.shareInfo)
					//封装分享的对象
					let shareObj={
						weixin_share_friend:this.shareInfo,
						qq:this.shareInfo,
						weixin_share_line:this.shareInfo,
						qq_zone:this.shareInfo
					}
					weixinShare(shareObj)
				}else{
					this.$toast({
						duration: 2000,       // 持续展示 toast
						forbidClick: true, // 禁用背景点击
						message: '您没有权限邀请，请先升级为vip',
						position: 'bottom'
					})
				}
				
			},
			/**
			* 获取当前用户的信息
			*/
			async getUserInfo(){
				let res=await queryVipInfo();
				if(res.data.code === 0){
					let result=res.data.data;
					this.userId=result.userId
					this.userType=result.vipType
				}else{
					errorHandle(location.href,res)
				}
			}
		}
	}
</script>
<style type="text/css" lang="scss" scoped>
	@import '../../../common/css/mixin';
	.container{
		width: 100%;
		height: 100%;
		background: #FAF6EA;
		overflow: hidden;
		position: relative;
		// position: relative;
	}
	.container-inwechat{
		width: 100%;
		height: 100%;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
	}
	.container-notwechat{
		width: 100%;
		position: absolute;
		bottom: 0;
		top: 0.45rem;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
	}
	.vip-box1{
		width: 100%;
		@include bg-image('/static/img/vip1');
		padding-bottom: 88%;
		background-size: 100%;
	}
	.vip-box2{
		width: 100%;
		@include bg-image('/static/img/vip2');
		padding-bottom: 88%;
		background-size: 100%;
	}
	.vip-box3{
		width: 100%;
		@include bg-image('/static/img/vip3');
		padding-bottom: 109.6%;
		background-size: 100%;
		position: relative;
	}
	.vu-button{
		background-image: linear-gradient(225deg, #F0CF8A 0%, #D9A95A 100%);
		border-radius: 100px;
		width: 78.7%;
		height: 0.5rem;
		line-height: 0.5rem;
		font-size: 0.16rem;
		color: #2F3245;
		position: absolute;
		left: 10.65%;
		top: 0.65rem;
	}
</style>