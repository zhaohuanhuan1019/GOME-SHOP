<template>
  <div class="privilege-box">
    <sysheader v-if="hasHeader" :titleName="titleName"></sysheader>
		<div :class="{ 'privilege-content': true, 'noTop': hasHeader}" id="main">
			<div class="privilege-header" v-if='isFromInvite'>
				<div class="privilege-headbox">
					<img :src="vipInfo.headImage" alt="" >
				</div>
				<div class="privilege-info"><div>来自</div><div class="person" v-if="vipInfo.nickName">{{vipInfo.nickName}}</div>的分享<span v-if="vipInfo.vipType=='vip'" class="vip-icon"></span><span v-if="vipInfo.vipType=='svip'" class="svip-icon"></span>
				</div>
				<div class="privilege-chat" @click="lookWxBtn">
					<span>查看微信号码</span>
				</div>
			</div>

			<floorPhoto v-show="cmsData.length>0" v-for="(item, index) in cmsData" :key="index" :data="item"></floorPhoto>

		</div>
		<div class="privilege-footer" @click="checkvip">
			一键开通美店VIP
		</div>
		<div class="popUp" v-if="wxPopUpKey">
            <div class="infoWarpper">
                <div class="photo"><img :src="vipInfo.headImage" alt=""></div>
				<div class="nameWarpper"><span class="name">{{vipInfo.nickName}}</span><span class="tutor-flag" ></span></div>
				<div class="wxWarpper"><i></i><span v-if='vipInfo.wxCode'>{{vipInfo.wxCode}}</span><span v-else>您的导师暂未上传微信号</span></div>
				<div id="copyBtn" :class="{ 'cancopy': isCanCopy, 'nocopy': !isCanCopy}" @click="copyInfo($event)">复制微信号</div>
				<div class="close" @click="closeVipInfo"></div>
            </div>
        </div>
		<div class="popUp" v-if="alreadyKey">
            <div class="alreadyWarpper">
                <div class="tipOne">您已是VIP</div>
				<div class="tipTwo">您已经开通VIP服务，快去享受权益吧</div>
				<div class="sure" @click="closeAlreadyVip">确定</div>
            </div>
        </div>
	</div>
</template>

<script>
	import floorPhoto from 'components/floorPhoto/floorPhoto.vue'; // 引入单图楼层组件
	import {getVipInfo,checkvipStatus} from '../../../api/openVip.js';
	import {fetchCMSModule} from '../../../api/cmsModule.js';
	import common from 'common/js/common.js';
	import {encode} from 'common/js/utils.js';
	import {env, system} from 'common/js/env';
	import { fail } from 'assert';
  import sysheader from '@/components/sysheader';

	export default {
		props: [],
		data(){
			return {
				titleName:'VIP特权开通',
        hasHeader: !env.wechat,
				vipInfo:'',
				inviterUserId:'',
				wxPopUpKey:false,
				alreadyKey:false,
				isFromInvite:false,
				cmsData:'',
			}
		},
		computed:{
			isCanCopy(){
				if(this.vipInfo.wxCode ==null){
					return false;
				}else {
					return true;
				}
			}
		},
		components:{
			sysheader,
			floorPhoto
    },
		async created(){
			sessionStorage.removeItem("isToast");//清空记录的toast记录

			await this.fetchCMSModule();//获取cms配置的单图楼层数据

			let getRequest=await common.getRequest();//获取地址栏传过来的taskId
			this.inviterUserId = getRequest.inviterUserId;

			if(this.inviterUserId!=='' && this.inviterUserId !== undefined){
				this.isFromInvite = true;
				console.log(this.inviterUserId)
				await this.getVipInfo();//请求邀请人vip的用户信息
			}else {
				this.isFromInvite = false;
			}
		},
		methods:{
			async getVipInfo(){
				let res = await getVipInfo({
					userId: this.inviterUserId
				});
				res=res.data;
				//console.log(res);
				if(res.code ==0){
					this.vipInfo = res.data;
					this.vipInfo.vipType = this.vipInfo.vipType.toLowerCase();
				}else {
					this.toast();
				}
			},
			async checkvip(){
				let res = await checkvipStatus();
				res=res.data;
				console.log(res);
				if(res.code==0){
					if(res.data.status){//true代表允许进去结算页面
						let url = '/views/settlement/settlement.html';
						if(this.inviterUserId){
							window.location.href = url + "?inviterUserId=" + this.inviterUserId;
						}else{
							window.location.href = url;
						}
					}else {
						this.alreadyKey = true;//代表已经是vip并且有效期不满11个月（不允许进结算页面）
					}
				}else if(res.code==1104){
					let host = window.location.host;
                    let reg = RegExp(/atguat/);
                    //let reg2 = RegExp(/gome|gomeplus/);
                    if(reg.test(host)){
                        window.location.href='http://login.m.atguat.com.cn/login.html?return_url='+encode(window.location.href)
                    }else{
                        window.location.href='http://login.m.gome.com.cn/login.html?return_url='+encode(window.location.href)
                    }
				}else {
					this.toast();
				}
			},
			async fetchCMSModule(){
				let res = await fetchCMSModule({
                    keyProms: 'channelbk0FLXLG9aT',
                    gpsLongitude:"",
                    gpsLatitude: "",
				});
				res=res.data;
				//console.log(res);
				if(res.code==0){
					this.cmsData=res.data.templetList;
					//console.log(this.cmsData)
				}else {
					this.toast();
				}
			},
			copyInfo(e){
				if(this.isCanCopy){
					var input = document.createElement('input');
					input.type = 'text';
					input.style.position = 'fixed';
					input.style.top = '-999px';
					input.value = this.vipInfo.wxCode;
					document.body.appendChild(input);
					if(system.ios){
						input.disabled=true;
					}
					input.focus();
					input.setSelectionRange(0, input.value.length);
					document.execCommand('copy');
					document.body.removeChild(input);
					this.$toast({
						duration: 2000,       // 持续展示 toast
						forbidClick: true, // 禁用背景点击
						message: '复制成功',
						position: 'bottom'
					})
					// e.preventDefault();
		        	// return false;
				}else {
					return;
				}
			},
			lookWxBtn(){
				this.wxPopUpKey = true;
			},
			closeVipInfo(){
				this.wxPopUpKey = false;
			},
			closeAlreadyVip(){
				this.alreadyKey = false;
			},
			toast(){
                if (sessionStorage.getItem('isToast')) {
                    return;
                }
				sessionStorage.setItem('isToast', 1);
                this.$toast({
                    duration: 2000,       // 持续展示 toast
                    forbidClick: true, // 禁用背景点击
                    message: '服务器开小差，请稍后再试!',
				});
            }
		},
		mounted(){
			if(env.wechat){
                //alert('我的运行环境是微信--我的头部要隐藏掉');
                document.getElementById('headerTop').style.display='none';//头部隐藏
                document.getElementById('main').style.top=0;
			}
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
	@import '../../../common/css/mixin';
	.privilege-box{
		width:100%;
		height: 100%;
		-webkit-overflow-scrolling:touch;
		// position: relative;
		#headerTop{
			width: 100%;
			position: absolute;
			top:0;
			left: 0;
			z-index: 100;
			background: #fff;
			border-bottom: 0.01rem solid #DDDDDD;
		}
		.privilege-content{
			width: 100%;
			position: absolute;
			left: 0;
			top: 0;
			bottom: 0.5rem;
			overflow-y: scroll;
			background-color:#fff;
			-webkit-overflow-scrolling: touch;
      &.noTop{
        top: 0.44rem;
      }
			&::-webkit-scrollbar {/*滚动条整体样式*/
				width: 0;
			}
			.privilege-header{
				width: 100%;
				height: 0.35rem;
				background-color: #2F3245;
				.privilege-headbox{
					width: 0.25rem;
					height: 0.25rem;
					border-radius: 50%;
					border:1px solid #F0CF8A;
					background-color: #F0CF8A;
					float: left;
					margin-left:0.14rem;
					margin-top:0.04rem;
					img{
						width: 100%;
						height: 100%;
						border-radius: 50%;
						display: block;
					}
				}
				.privilege-info{
					float: left;
					margin: 0 0.05rem 0 0.1rem;
					font-size: 0.13rem;
					color: #F0CF8A;
					height:0.35rem;
					line-height:0.35rem;
					div{
						float: left;
					}
					.person{
						padding: 0 0.03rem;
						display:inline;
						max-width: 1.05rem;
						overflow:hidden;
						text-overflow:ellipsis;
						white-space:nowrap;
					}
					span{
						&.vip-icon{
							display: inline-block;
							width: 0.36rem;
							height: 0.15rem;
							@include bg-image('../images/VIP');
							background-size: 100%;
							vertical-align: middle;
							margin-top: -0.03rem;
							margin-left:0.05rem;
						}
						&.svip-icon{
							display: inline-block;
							width: 0.43rem;
							height: 0.15rem;
							@include bg-image('../images/SVIP');
							background-size: 100%;
							vertical-align: middle;
							margin-top: -0.03rem;
							margin-left:0.05rem;
						}
					}
				}
				.privilege-chat{
					float: right;
					height:0.35rem;
					line-height:0.35rem;
					font-size: 0.11rem;
					color: #B0B0B0;
					margin-right: 0.1rem;
					// display: inline-block;
				}
			}
			.imgWarpper{
				display: inline-block;
				width: 100%;
				#external-frame{
					width: 100%;
				}
			}
		}
		.privilege-footer{
			width: 100%;
			height: 0.5rem;
			position: absolute;
			bottom: 0;
			font-size: 0.16rem;
			color: #2F3245;
			line-height: 0.5rem;
			text-align: center;
			background-image: linear-gradient(225deg, #F0CF8A 0%, #D9A95A 100%);
		}
		.popUp{
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.70);
            position: fixed;
            top:0;
			left:0;
			z-index: 1000;
            .infoWarpper{
                width: 2.7rem;
                height: 2.05rem;
                background: #FFFFFF;
                border-radius: 0.08rem;
                font-family: PingFangSC-Regular;
                font-size: 0.14rem;
                color: #5A6066;
                letter-spacing: 0;
                margin:2.46rem auto 0;
				text-align: center;
				position: relative;
				.photo{
					font-size: 0;
					width: 0.6rem;
					height: 0.6rem;
					border-radius:50%;
					position: absolute;
					left:50%;
					top:-0.3rem;
					margin-left:-0.3rem;
					img{
						width: 0.6rem;
						height: 0.6rem;
						border-radius:50%;
					}
				}
				.nameWarpper{
					padding-top:0.41rem;
					font-family: PingFangSC-Regular;
					font-size: 16px;
					color: #333333;
					letter-spacing: 0;
					line-height: 0.22rem;
					height: 0.22rem;
					.name{
						position: relative;
						.tutor{
							position: absolute;
							right: -0.41rem;
							top: 0.015rem;
							line-height: 0.15rem;
							padding: 0 0.07rem;
							border: 0.01rem solid #FF6A00;
							border-radius: 100px;
							font-family: PingFangSC-Regular;
							font-size: 0.11rem;
							color: #FF6A00;
							letter-spacing: 0;
						}
					}
					.tutor-flag{
						width: 0.36rem;
						height: 0.15rem;
						@include bg-image('../images/tutor_flag');
						background-size: 100%;
						margin-left: 0.05rem;
						display: inline-block;
						vertical-align: -0.03rem;
					}
				}
				.wxWarpper{
					margin: 0.22rem 0.32rem 0 0.32rem;
					padding-bottom: 0.07rem;
					box-sizing: border-box;
					border-bottom: 0.01rem solid #DDDDDD;
					display: -webkit-flex; /* Safari */
					display: flex;
					flex-flow:row wrap;
					justify-content:flex-start;
					align-content:space-between;
					i{
						display: inline-block;
						width: 0.24rem;
						height: 0.24rem;
						margin-right: 0.1rem;
						// background: forestgreen;
						background-size: 100%;
						@include bg-image('../images/wxNumber');
					}
					span{
						display: inline-block;
						width: 1.65rem;
						height: 0.24rem;
						line-height: 0.24rem;
						// background:dodgerblue;
						text-align: center;
					}
					
				}
				#copyBtn{
					margin:0.22rem auto 0;
					width: 2.06rem;
					height: 0.37rem;
					line-height: 0.37rem;
					border-radius: 100px;
					font-family: PingFangSC-Regular;
					font-size: 0.16rem;
					&.cancopy{
						background-image: linear-gradient(225deg, #F0CF8A 0%, #D9A95A 100%);
						color: #2F3245;
					}
					&.nocopy{
						background-image: linear-gradient(225deg, #FEEECD 0%, #FFE4B7 100%);
						color: #fff;
					}

				}
			}
			.alreadyWarpper{
				width: 2.7rem;
                height: 1.53rem;
                background: #FFFFFF;
                border-radius: 0.1rem;
                margin:2.57rem auto 0;
				text-align: center;
				.tipOne{
					line-height: 0.21rem;
					padding:0.2rem 0 0.1rem 0;
					font-family: PingFangSC-Medium;
					font-size: 0.15rem;
					color: #333333;
					letter-spacing: 0;
				}
				.tipTwo{
					font-family: PingFangSC-Regular;
					font-size: 0.13rem;
					color: #333333;
					letter-spacing: 0;
					padding:0 0.25rem 0.2rem 0.25rem;
					border-bottom: 0.01rem solid #DDDDDD;
				}
				.sure{
					line-height: 0.44rem;
					font-family: PingFangSC-Regular;
					font-size: 0.15rem;
					color: #F20C59;
					letter-spacing: 0;
				}
			}
		}
		.close{
			width: 0.2rem;
			height: 0.2rem;
			background-size: 100%;
			@include bg-image('../images/close');
			position: absolute;
			top:0.1rem;
			right: 0.12rem;
		}
	}
</style>
