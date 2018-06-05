<template>
	<div class="container">
		<broheader :titleName="titleName"></broheader>
		<div :class="inWechat ? 'container-inwechat' : 'container-notwechat'">
			<!--标题说明-->
			<p class="title">SVIP级别享有专属管理补贴，更多途径获取高额佣金奖励。</p>
			<!--权利说明-->
			<div class="rights-box">
				<ul class="rights-list">
					<li v-for="(item,i) in rightsList" :key="i" class="right-item">
						<div class="item-left" :class="'bg'+(i+1)"></div>
						<div class="item-right">
							<p class="item-title">{{item.title}}</p>
							<p class="item-explain">{{item.explain}}</p>
						</div>
					</li>
				</ul>
			</div>
			<!--是否同意协议-->
			<!-- <div class="agreement" v-if="!this.isRequired">
				<span class="agree-btn" @click="agreeOrNot" :class="{'agree-btn-selected':isChecked}"></span>
				<span class="agree-content">阅读并同意<a href="/static/staticPage/vip-shop.html">《平台推广服务协议》</a></span>
			</div> -->
			<!--未达要求-->
			<div class="not-required" v-if="this.isRequired">
				<p class="invitation-num">您还需要邀请<span class="em">{{needNum}}</span>位VIP好友</p>
				<p class="invitation-explain">成功邀请{{isRequiredNum}}位VIP好友，即可升级为SVIP</p>
			</div>
			<!--立即邀请或升级按钮-->
		</div>
		<vu-button class="upgrade-btn" :class="{'upgrade-btn-disabled':disabled}" @click="inviteOrUpgrade" :disabled="disabled">{{upgradeBtnMsg}}</vu-button>
	</div>
</template>
<script type="text/javascript">
	import {checkSvipStatus,promoteSvip,getInviterCount} from '@/api/inviteList'
	import { getVipInfo } from '@/api/manageInfo'
	import broheader from 'components/broheader'
	import { env } from '@/common/js/env'
	import { errorHandle } from '@/common/js/utils'
	export default {
		components:{broheader},
		data(){
			return {
				isRequired:false,//是否达到升级为svip的条件 true-需要邀请其他人
				isChecked:true,//是否选中会员服务协议
				disabled:false,//按钮是否可用
				upgradeBtnMsg:'升级为SVIP',//升级按钮文案
				isRequiredNum:20,//成为svip需要邀请的人数
				rightsList:[
					{
						title:'高额返利',
						explain:'高于普通店主的返利额度'
					},
					{
						title:'管理补贴',
						explain:'享受SVIP专属管理奖励'
					},
					{
						title:'专属导师',
						explain:'手把手教你赚钱'
					},
					{
						title:'专享价格',
						explain:'专属成本价格'
					},
					{
						title:'随时提现',
						explain:'随时提现极速到账'
					},
					{
						title:'试用特权',
						explain:'美店商品优先试用'
					}
				],
				needNum:0,//还需要邀请的vip好友数
				titleName:'升级为SVIP',
				inWechat:false//判断是否在微信，false-不在微信 true-在微信
			}
		},
		async created(){
			let vipInfo = await getVipInfo()
			let vipType = vipInfo.data.data.vipType.toLowerCase();
			
			if (vipType === 'svip') {
				location.href="/views/vipPrivilegeManage/vipPrivilegeManage.html"
			} else if (vipType === 'normal') {
				location.href="/views/vipPrivilegeOpen/vipPrivilegeOpen.html"
			}
			//请求接口判断是否有升级资格
			this.checkSvipStatus();
			//查询配置的升级为svip需要邀请的人数
			this.needVipNum();
		},
		mounted(){
			if(env.wechat){
				this.inWechat=true
			}
		},
		methods:{
			
			agreeOrNot(){
				this.isChecked=!this.isChecked
				this.disabled=this.isChecked ? false : true
			},
			/**
			* 验证用户是否有升级vip的资格
			*/
			async checkSvipStatus(){
				let result=await checkSvipStatus();
				if(result.data.code == 0){
					if(result.data.data.status == true){
						this.isRequired=false;
						this.upgradeBtnMsg='升级为SVIP'
						this.disabled=this.isChecked ? false : true
					}else{
						this.needNum=result.data.data.count;
						this.isRequired=true;
						this.upgradeBtnMsg='立即邀请'
						this.disabled=false;
					}
				}else{
					errorHandle(location.href,result)
				}
			},
			/**
			* 按钮的点击事件
			*/
			inviteOrUpgrade(){
				if(!this.isRequired){
					//升级
					if(!this.disabled){
						this.promoteSvip();
					}else{
						return false;
					}
				}else{
					window.location.href="/views/inviteVIP/inviteVIP.html";
				}
			},
			//升级
			async promoteSvip(){
				let result=await promoteSvip();
				if(result.data.code === 0){
					location.href="/views/upgradeSuccess/upgradeSuccess.html";
				}else{
					errorHandle(location.href,result)
				}
			},
			//配置的升级为svip需要的人数
			async needVipNum(){
				let result=await getInviterCount();
				if(result.data.code === 0){
					this.isRequiredNum=result.data.data;
				}else{
					errorHandle(location.href,result)
				}
			}
		}
	}
</script>
<style type="text/css">
	html,body{
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}
</style>
<style type="text/css" lang="scss" scoped>
	@import '../../../common/css/mixin';
	.container{
		width: 100%;
		height: 100%;
		background: #f3f5f7;
		position: relative;
		font-family: 'Microsoft Yahei';
		.title{
			font-size: 0.12rem;
			color: #666666;
			padding: 0.1rem 0.15rem;
			margin: 0;
			height:0.18rem;
			line-height: 0.18rem;
		}
	}
	.container-inwechat{
		width: 100%;
		position: absolute;
		bottom:  0.5rem;
		top: 0;
		-webkit-overflow-scrolling: touch;
	}
	.container-notwechat{
		width: 100%;
		position: absolute;
		bottom:  0.5rem;
		top: 0.45rem;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
	}
	.rights-box{
		width: 92%;
		height: 4rem;
		margin: 0 4%;
		background: #FFFFFF;
		border: 1px solid #DDDDDD;
		border-radius: 5px;
		.rights-list{
			padding-top: 0.2rem;
			.right-item{
				padding-left: 0.176rem;
				margin-bottom: 0.15rem;
			}
			.item-left{
				width: 0.28rem;
				height: 0.28rem;
				float: left;
				background-size: 100%;
			}
			.bg1{
				@include bg-image('../images/high_rebate');
			}
			.bg2{
				@include bg-image('../images/subsidy');
			}
			.bg3{
				@include bg-image('../images/tutor');
			}
			.bg4{
				@include bg-image('../images/exclusive_price');
			}
			.bg5{
				@include bg-image('../images/withdrawals');
			}
			.bg6{
				@include bg-image('../images/trial_privilege');
			}
			.item-right{
				overflow: hidden;
				padding-left: 0.126rem;
			}
			.item-title{
				font-size: 0.14rem;
				color: #333333;
				padding: 0;
				margin: 0;
			}
			.item-explain{
				font-size: 0.13rem;
				color: #999999;
				padding: 0;
				margin: 0;
				margin-top: 0.02rem;
			}
			
		}
	}
	.not-required{
		width: 100%;
		height: 0.94rem;
		background: #fff;
		border-top: 1px solid #DDD;
		margin-top: 0.11rem;
		margin-bottom: 0.5rem;
		padding-top: 0.25rem;
		box-sizing:border-box;
		.invitation-num{
			padding: 0;
			margin: 0;
			font-size: 0.15rem;
			line-height: 0.21rem;
			color: #333333;
			text-align: center;
			.em{
				color: #F20C59;
			}
		}
		.invitation-explain{
			padding: 0;
			margin: 0;
			margin-top: 0.04rem;
			width: 100%;
			font-size: 0.13rem;
			line-height: 0.18rem;
			color: #999999;
			text-align: center;
		}
	}
	.agreement{
		font-size: 0;
		overflow: hidden;
		.agree-btn{
			width: 0.18rem;
			height: 0.18rem;
			float: left;
			margin-left: 0.15rem;
			@include bg-image('../images/unchecked');
			background-size: 100%;
			margin-top: 0.1rem;
		}
		.agree-btn-selected{
			@include bg-image('../images/checked');
		}
		.agree-content{
			float: left;
			font-size: 0.11rem;
			line-height: 0.18rem;
			color: #333333;
			margin: 0.1rem 0.05rem;
			a{
				color: #1B84F5
			}
		}
	}
	.upgrade-btn{
		position: absolute;
		width:100%;
		height: 0.5rem;
		line-height: 0.5rem;
		bottom: 0;
		font-size: 0.16rem;
		color: #333333;
		background-image: linear-gradient(-225deg, #F0CF8A 0%, #D9A95A 100%);
		border: none;
	}
	.upgrade-btn-disabled{
		background-image: linear-gradient(-225deg, #FEEECD 0%, #FFE4B7 100%);
		color: #fff;
	}

</style>