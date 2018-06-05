<template>
	<div>
		<div class="noactivity-content">
			<div class="noactivity-content-icon"></div>
			<p class="noactivity-content-text">您来晚了！</p>
			<p class="noactivity-content-text text-margin-top">快去查看新的活动吧~</p>
			<vu-button type="default" class="noactivity-content-btn" @click="toLatestActivity">查看最新活动</vu-button>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		props:['url'],
		methods:{
			toLatestActivity(){
				location.href=this.url
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import '../common/css/mixin';
	.noactivity-content{
		position: absolute;
		width: 100%;
		top: 1.49rem;
		.noactivity-content-icon{
			width: 1.6rem;
			height: 1.6rem;
			position: absolute;
			left:50%;
			margin-left:-0.8rem;
			@include bg-image("../common/images/noactivity")
			background-size: 100% 100%;
		}
		.noactivity-content-text{
			width: 100%;
			height: 0.18rem;
			text-align: center;
			color: #919599;
			font-size: 0.13rem;
			position: absolute;
			top: 1.6rem;
			padding: 0;
			margin: 0;
		}
		.text-margin-top{
			margin-top: 0.18rem;
		}
		.noactivity-content-btn{
			width: 1.79rem;
			height: 0.37rem;
			text-align: center;
			background-image: linear-gradient(-90deg, #FA1E8C 0%, #FC1E56 100%);
			border-radius: 100px;
			font-size: 0.14rem;
			color: #fff;
			position: absolute;
			top: 2.08rem;
			line-height: 0.37rem;
			left: 50%;
			margin-left: -0.895rem
		}
	}
</style>