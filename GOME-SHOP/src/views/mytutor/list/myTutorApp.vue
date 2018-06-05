<template>
	<div class="container">
		<!--标题-->
		<broheader :titleName="titleName"></broheader>
		<div :class="inWechat ? 'container-inwechat' : 'container-notwechat'">
			<!--显示微信号-->
			<div class="wx-box">
				<div class="tutor-info">
					<div class="tutor-image">
						<img :src="tutorInfo.headImg"/>
					</div>
					<div class="tutor-name">
						<nobr><span class="tutor-name-info">{{tutorInfo.username}}</span></nobr>
						<span class="tutor-flag"></span>
					</div>
				</div>
				<div class="wx-num">
					<div class="wx-num-left">微信号:</div>
					<div class="wx-num-right" :class="{'wx-num-none':!hasWx}">
						<span v-if="hasWx">{{tutorInfo.wxnumber}}</span>
						<span v-else>{{noMessage}}</span>
					</div>
				</div>
			</div>
			<!--复制按钮-->
			<vu-button class="wx-btn" :class="{'wx-btn-disabled':!hasWx}" @click="copyWX">复制微信号</vu-button>
			<!--补充说明-->
			<div class="wx-explain">
				<!-- <p class="wx-explain-text">添加我微信，朋友圈会不定期分享美店精选商品，</p>
				<p class="wx-explain-text">可以享受更多福利哦~</p> -->
				<p class="wx-explain-text">添加导师微信，可与导师直接沟通，了解更多美店精选商品信息，迅速获取平台更新活动政策，接受导师专业指导哦~</p>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import { queryMyTeacherWechatNumber } from '@/api/inviteList'
	import { env,system } from '@/common/js/env'
	import broheader from 'components/broheader'
	import { errorHandle } from '@/common/js/utils'
	export default {
		components:{broheader},
		data(){
			return {
				tutorInfo:{
					headImg:'',
					username:'',
					wxnumber:''
				},
				noMessage:'您的导师暂未上传微信号',//微信号不存在时显示的信息
				hasWx:true,//是否有微信号 默认有微信号
				titleName:'我的导师',
				inWechat:false//判断是否在微信，false-不在微信 true-在微信
			}
		},
		mounted(){
			if(env.wechat){
				this.inWechat=true
			}
		},
		async created(){
			//请求接口
			let res=await queryMyTeacherWechatNumber();
			if(res.data.code === 0){
				let resultInfo=res.data.data
				if(Object.keys(resultInfo).length){
					this.tutorInfo.headImg=resultInfo.teacherImage;
					this.tutorInfo.username=resultInfo.teacherNickName;
					if(resultInfo.teacherWxCode){
						this.tutorInfo.wxnumber=resultInfo.teacherWxCode
					}else{
						this.hasWx=false;
					}
				}else{
					this.tutorInfo.headImg="/static/img/mdicon.png"
					this.tutorInfo.username="官方培训导师"
					this.tutorInfo.wxnumber="meidiandabai"
				}
				
			}else{
				errorHandle(location.href,res)
			}
		},
		/**
		* 复制微信号到剪切板
		*/
		methods:{
			copyWX(e){
				if(!this.hasWx){
					return false;
				}
				var input = document.createElement('input');
		        input.type = 'text';
		        input.style.position = 'fixed';
		        input.style.top = '-999px';
		        input.value = this.tutorInfo.wxnumber;
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
		position: relative;
		overflow: hidden;
		background: #f3f5f7;
		font-size: 0;
		font-family: 'Microsoft Yahei'
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
		top: 0.44rem;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
	}
	.wx-box{
		width: 3.45rem;
		height: 1.49rem;
		margin: 0.15rem 0.15rem 0;
		background: #FFFFFF;
		border: 1px solid #DDDDDD;
		border-radius: 5px;
		.tutor-info{
			width: 100%;
			height: 0.75rem;
			border-bottom: 1px solid #D8D8D8;
			.tutor-image{
				width: 0.77rem;
				height: 0.75rem;
				float: left;
				img{
					width: 0.45rem;
					height: 0.45rem;
					border-radius: 0.225rem;
					margin: 0.15rem 0.16rem;
				}
			}
			.tutor-name{
				overflow: hidden;
				height: 100%;
				.tutor-name-info{
					float: left;
					overflow: hidden;
					max-width: 2.12rem;
					text-overflow:ellipsis;
					font-size: 0.16rem;
					color: #333333;
					margin-top: 0.265rem;
				}
				.tutor-flag{
					float: left;
					width: 0.36rem;
					height: 0.15rem;
					@include bg-image('../images/tutor_flag');
					background-size: 100%;
					margin-top: 0.3rem;
					margin-left: 0.05rem;
				}
			}
		}
		.wx-num{
			width: 100%;
			.wx-num-left{
				float: left;
				width: 0.79rem;
				padding: 0.255rem 0 0 0.15rem;
				font-size: 0.16rem;
				color: #333333;
			}
			.wx-num-right{
				overflow: hidden;
				max-width: 2.51rem;
				height: 0.73rem;
				word-wrap: break-word;
				word-break: normal;
				font-size: 0.16rem;
				color: #333333;
				display: flex;
				align-items:center;
			}
			.wx-num-none{
				color: #999999;
			}
		}
	}
	.wx-btn{
		width: 3.35rem;
		height: 0.5rem;
		margin: 0.2rem 0.2rem 0 0.2rem;
		background-image: linear-gradient(225deg, #F0CF8A 0%, #D9A95A 100%);
		border-radius: 100px;
		font-size: 0.16rem;
		color: #2F3245;
	}
	.wx-btn-disabled{
		background-image: linear-gradient(225deg, #FEEECD 0%, #FFE4B7 100%);
		color: #fff;
	}
	.wx-explain{
		margin-top: 0.2rem;
		.wx-explain-text{
			// width: 100%;
			padding: 0 0.2rem;
			margin: 0;
			text-align: center;
			font-size: 0.12rem;
			color: #666666;
			line-height: 0.17rem;
		}
	}
</style>