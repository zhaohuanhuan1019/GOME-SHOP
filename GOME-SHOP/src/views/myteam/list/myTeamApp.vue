<template>
	<div class="records-box">
		<!--标题-->
		<broheader :titleName="titleName"></broheader>
		<div :class="inWechat ? 'container-inwechat' : 'container-notwechat'">
			<!--总记录数-->
			<div class="records-num-box" v-if="recordList.length>0">
				<div class="records-num">
					<span>直属下级 ({{totalRecords}})</span>
				</div>
			</div>
			<!--内容-->

			<div class="records-content" :class="inWechat ? 'records-content-inwechat' : 'records-content-notwechat'" v-if="recordList.length>0">
				<!--记录列表-->
				<vu-loadmore :auto-fill=false :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmoreTeamMembers" @bottom-status-change="handleBottomChange" :bottom-pull-text="bottomPullText" :bottom-drop-text="bottomDropText" :bottom-loading-text="bottomLoadingText" class="loadmore-component">
					<ul class="records-list">
					<li v-for="item in recordList" class="record-item" :key="item.userId">
						<div class="record-img-box">
							<img class="record-img" :src="item.headImage" />
						</div>
						<div class="record-info">
							<p class="record-name">
								<nobr><span class="name">{{item.username}}</span></nobr>
								<span v-if="item.level.toLowerCase() === 'vip'" class="vip-flag"></span>
								<span v-else class="svip-flag"></span>
								<span v-if="item.directFlag" class="direct-invitation-flag"></span>
							</p>
							<p class="record-time">邀请时间&nbsp;{{item.time}}</p>
						</div>
					</li>
					</ul>
				</vu-loadmore>
			</div>
			<!--记录数为空的情况-->
			<div class="no-records" v-if="recordList.length == 0">
				<div class="no-icon"></div>
				<p class="no-content">暂无团队成员，快去邀请吧~</p>
				<vu-button class="no-btn" @click="invite">立即邀请</vu-button>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import { queryMyTeamList } from '@/api/inviteList'
	import broheader from 'components/broheader'
	import { env } from '@/common/js/env'
	import { errorHandle } from '@/common/js/utils'
	export default{
		components:{broheader},
		data(){
			return {
				recordList:[],
				bottomStatus:'',
				allLoaded:false,//列表是否全部加载完毕 false-未全部加载完毕
				bottomPullText:'上拉加载更多',
				bottomDropText:'释放更新',
				bottomLoadingText:'加载中...',
				totalRecords:0,//总记录数
				pageNo:0,//当前页码
				pageSize:20,//每页返回的条数
				titleName:'我的团队',
				inWechat:false//判断是否在微信，false-不在微信 true-在微信
			}
		},
		async created(){
			//请求数据
			this.getMyTeamList();
			// this.testGetList()
		},
		mounted(){
			if(env.wechat){
				this.inWechat=true
			}
		},
		methods:{
			timestampToDate(timestamp){
				if(timestamp.length === 17){
					timestamp=timestamp.substr(0,13)
				}
				let date = new Date(Number(timestamp));
				let year = date.getFullYear(),
					month = (date.getMonth()+1) < 10 ? '0'+(date.getMonth()+1) : (date.getMonth()+1),
					day = date.getDate() < 10 ? ('0'+date.getDate()) : date.getDate(),
					hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
					minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
					// seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
				return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes
			},
			loadBottom(){
				//加载数据
				if(this.recordList.length < this.totalRecords){
					// this.testGetList();	
					this.getMyTeamList();
				}
				this.$refs.loadmoreTeamMembers.onBottomLoaded();
			},
			async getMyTeamList(){
				let res=await queryMyTeamList({
					pageNo:this.pageNo+1,
					pageSize:this.pageSize
				})
				if(res.data.code === 0){
					let resultList=res.data.data.myTeamInfoVOList;
					let pageInfo=res.data.data.pageBean;
					for(let i=0,length=resultList.length;i<length;i++){
						resultList[i].time=this.timestampToDate(resultList[i].inviteTime.toString())
						this.recordList.push(resultList[i])
					}
					this.pageNo=pageInfo.currentPage;
					this.totalRecords=pageInfo.totalCount
				}else{
					errorHandle(location.href,res)
				}
				if(this.recordList.length >= this.totalRecords){
					this.bottomPullText='数据已全部加载完毕';
					this.bottomDropText='数据已全部加载完毕';
					this.bottomLoadingText='数据已全部加载完毕';
				}
			},
			//测试方法增加数据
			testGetList(){
				for(let i=0;i<40;i++){
					let record={
						headImage:"http://gfs11.atguat.net.cn/T1o4KTBTWQ1RCvBVdK.png",
						inviteRebate:"1000",
						inviteTime:this.timestampToDate('13256484919159116'),
						level:"vip",
						username:"first"+i
					}
					this.recordList.push(record);
				}
				if(this.recordList.length >= this.totalRecords){
					this.bottomPullText='数据已全部加载完毕';
					this.bottomDropText='数据已全部加载完毕';
					this.bottomLoadingText='数据已全部加载完毕';
				}
				
			},
			
			handleBottomChange(status){
				this.bottomStatus=status;	
			},
			/**
			* 点击立即邀请按钮的事件
			*/
			invite(){
				location.href="/views/inviteVIP/inviteVIP.html"
			}
		}
	}
</script>
<style type="text/css" lang="scss">
	html,body{
		width: 100%;
		height: 100%;
		padding: 0;
		margin: 0;
	}
	.loadmore-component{
		background: #f3f5f7;
		.vu-loadmore__bottom{
			font-size: 0.12rem;
		}
	}
</style>
<style type="text/css" lang="scss" scoped>
@import '../../../common/css/mixin';
	.records-box{
		width: 100%;
		height: 100%;
		position: fixed;
	}
	.container-inwechat{
		width: 100%;
		height: 100%;
		overflow: hidden;
		// overflow: auto;
		// -webkit-overflow-scrolling: touch;
	}
	.container-notwechat{
		width: 100%;
		position: absolute;
		bottom: 0;
		top: 0.45rem;
		overflow: hidden;
		// overflow: auto;
		// -webkit-overflow-scrolling: touch;
	}
	.records-num-box{
		width: 100%;
		height: 0.5rem;
		position: fixed;
		z-index: 100;
		background: #f3f5f7;
		.records-num{
			width: 100%;
			height: 0.4rem;
			margin-top: 0.1rem;
			line-height: 0.4rem;
			font-size: 0.14rem;
			color: #999;
			border-bottom: 1px solid #ddd;
			padding-left: 0.15rem;
			box-sizing:border-box; 
			background: #fff;
			border-top: 1px solid #ddd;	
		}
	}
	.records-content-inwechat{
		top: 0.5rem;
	}
	.records-content-notwechat{
		top: 0.94rem;
	}
	.records-content{
		width: 100%;
		position: absolute;
		top: 0.5rem;
		bottom: 0;
		background: #fff;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		.records-list{
			background: #fff;
			.record-item{
				border-bottom: 1px solid #eee;
				// position: relative;
				overflow: hidden;
				clear: both;
				margin-left: 0.15rem;
			}
			.record-img-box{
				width: 0.45rem;
				height: 0.45rem;
				float: left;
				margin: 0.11rem 0 0.11rem 0rem;
				.record-img{
					width: 100%;
					height: 100%;
					float: left;
					border-radius: 0.225rem;
				}
			}
			.record-info{
				overflow: hidden;
				padding-top: 0.11rem;
				padding-left: 0.1rem;
				.record-name{
					padding: 0;
					margin: 0;
					font-size: 0.16rem;
					color: #333333;
					.name{
						display: inline-block;
						overflow: hidden;
						max-width: 2.01rem;
						text-overflow:ellipsis;
						vertical-align:middle;
					}
					.vip-flag{
						display: inline-block;
						width: 0.36rem;
						height: 0.15rem;
						@include bg-image('../images/VIP');
						background-size: 100%;
						vertical-align: middle;
					}
					.svip-flag{
						display: inline-block;
						width: 0.43rem;
						height: 0.15rem;
						@include bg-image('../images/SVIP');
						background-size: 100%;
						vertical-align: middle;
					}
					.direct-invitation-flag{
						display: inline-block;
						width: 0.36rem;
						height: 0.15rem;
						@include bg-image('../images/directInvitation');
						background-size: 100%;
						vertical-align: middle;
					}
				}
				.record-time{
					font-size: 0.13rem;
					color: #999999;
					margin: 0.08rem 0 0.08rem 0;
				}
			}
			.record-money{
				// width: 0.61rem;
				height: 0.45rem;
				line-height: 0.45rem;
				font-size: 0.13rem;
				color: #F20C59;
				float: right;
				margin: 0.11rem 0.2rem 0.11rem 0;
			}
		}
	}
	.no-records{
		.no-icon{
			width: 1.6rem;
			height: 1.6rem;
			@include bg-image('../images/norecords')
			background-size: 100%;
			margin: 1rem auto 0;
		}
		.no-content{
			font-family: PingFangSC-Regular;
			font-size: 0.14rem;
			color: #666666;
			width: 100%;
			text-align: center;
			margin-top: 0.3rem;		
		}
		.no-btn{
			background-image: linear-gradient(225deg, #F0CF8A 0%, #D9A95A 100%);
			border-radius: 100px;
			margin:0.2rem auto;
			font-family: PingFangSC-Regular;
			font-size: 0.16rem;
			color: #2F3245;
			width: 2.06rem;
			height: 0.37rem;
			display: block;
			text-align: center;
			line-height: 0.37rem;
		}
	}
</style>