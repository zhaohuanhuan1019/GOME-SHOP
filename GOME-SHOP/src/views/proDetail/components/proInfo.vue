<template>
  <div id="proInfoWarpper">
		<p class="name"><span class="proSign" v-show="proInfo.self">自营</span><span class='proName'>{{proInfo.productTitle}}</span></p>
		<div class='price' v-if="proInfo.price">
			<span>&yen;</span><span>{{proInfo.price}}</span>
			<template v-if="!isVIP">
				<span class="earn-tip">最高赚&yen;{{ proInfo.shareRebate }}</span>
			</template>
			<template v-else>
				<span class="earn-tip">VIP最高赚&yen;{{ gradePrice }}</span>
			</template>
		</div>
		<div class='price' v-else><span>&yen;暂无报价</span></div>
  </div>
</template>
<script>
export default {
  props: ['proInfo', 'userInfo', 'gradePrice'],
  data () {
  	return {
  		rebate: 0
  	}
  },
  computed: {
  	isVIP () {
  		return this.userInfo && this.userInfo.vipType && (this.userInfo.vipType.toLowerCase() === 'vip' || this.userInfo.vipType.toLowerCase() === 'svip');
  	}
  }
}
</script>
<style lang='scss' rel="stylesheet/scss" type="text/css" scoped>
	#proInfoWarpper {
		font-size: 0.12rem;
		padding: 0 0.1rem;
		.name {
			text-align: left;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
			.proSign{
				border:0.01rem solid #FF5C5C;
				border-radius: 0.01rem;
				margin-right:0.08rem;
				font-family: PingFangSC-Regular;
				font-size: 0.1rem;
				color: #FF5C5C;
				letter-spacing: -0.003rem;
				line-height: 0.2rem;
				vertical-align: middle;
			}
			.proName {
				font-family: PingFangSC-Regular;
				font-size: 0.165rem;
				color: #333333;
				letter-spacing: 0;
				line-height: 0.23rem;
				vertical-align: middle;
			}
		}
		.price{
			font-family: PingFangSC-Regular;
			color: #FF5C5C;
			letter-spacing: 0;
			margin-top: 0.25rem;
			span {
				&:nth-child(1) {
					font-size: 0.17rem;
					margin-right:0.05rem;
					line-height: 0.24rem;
				}
				&:nth-child(2) {
					font-size: 0.24rem;
					line-height: 0.33rem;
				}
			}
			.earn-tip {
				margin-left: .08rem;
				font-size: .11rem;
			}
		}
	}
</style>
