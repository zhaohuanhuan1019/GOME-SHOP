<template>
	<div class="order-list--item">
		<template v-if="list && list.length > 0">
			<template v-if="tabIndex !== 3">
				<vu-loadmore :autoFill="false" :bottom-method="moreList" ref="loadmore">
					<vu-list :list="list">
						<template slot-scope="order">
				      <div class="order-list--title">
				        <span>美店订单号：{{ order.listItem.orderItems.length > 1 ? order.listItem.mergerId : order.listItem.id }}</span>
				        <span class="order-list--status">{{ order.listItem.statusDesc }}</span>
				      </div>
				      <div @click="gotoDetail(order.listItem)" class="order-list--goods" v-for="good in order.listItem.orderItems">
				        <img class="goods-logo" :src="good.sku.image" alt="商品缩略图">
				        <div class="goods-content">
				          <span class="goods-name">{{ good.sku.item.name }}</span>
				          <div class="goods-msg">
				            <span>&yen;{{ (Number(good.sku.price)/100).toFixed(2) }}</span>
				            <span>x{{ good.quantity }}</span>
				          </div>
				        </div>
				      </div>
				      <div class="order-list--price">
				        <div class="goods-paid">
				          <span>共<span class="goods-paid--count">{{ order.listItem.quantity }}</span>件商品</span>
				          <span>实付：<span class="goods-paid--sum">&yen;{{ (Number(order.listItem.paymentAmount)/100).toFixed(2) }}</span></span>
				        </div>
				        <div class="goods-commission">
				          <span>佣金：<span class="goods-commission--sum">&yen;{{ (Number(order.listItem.mshopCommission)/100).toFixed(2) }}</span></span>
				        </div>
				      </div>
						</template>
					</vu-list>
				</vu-loadmore>
			</template>
			<template v-else>
				<vu-loadmore :autoFill="false" :bottom-method="moreList" ref="loadmore">
					<vu-list :list="list">
						<template slot-scope="order">
				      <div class="order-list--title">
				        <span>{{ serviceType(order.listItem.type) }}单号：{{ order.listItem.id }}</span>
				        <span class="order-list--status">{{ order.listItem.statusDesc }}</span>
				      </div>
				      <div @click="gotoDetail(order.listItem)" class="order-list--goods" v-for="good in order.listItem.orderItems">
				        <img class="goods-logo" :src="good.sku.image" alt="商品缩略图">
				        <div class="goods-content">
				          <span class="goods-name">{{ good.sku.item.name }}</span>
				          <div class="goods-msg">
				            <span>&yen;{{ (Number(good.sku.price)/100).toFixed(2) }}</span>
				            <span>x{{ good.quantity }}</span>
				          </div>
				        </div>
				      </div>
				      <div class="order-list--price">
				        <div class="goods-paid">
				          <span>
				          	{{ serviceType(order.listItem.type) }}数量：
				          	<span class="goods-paid--count">{{ order.listItem.quantity }}</span>
				          </span>
				          <span>
				          	{{ serviceType(order.listItem.type) }}金额：
				          	<span class="goods-paid--sum">&yen;{{ (Number(order.listItem.refundAmount)/100).toFixed(2) }}</span>
				          </span>
				        </div>
				      </div>
						</template>
					</vu-list>
				</vu-loadmore>
			</template>
		</template>		
	</div>
</template>
<script>
	export default {
		name: 'orderListItem',
		props: {
			list: {
        type: Array,
        default () {
        	return []
        }
      },
      tabIndex: {
      	type: Number,
      	default: 0
      },
      userInfo: {
      	type: Object,
      	default () {
      		return {}
      	}
      }
		},
		data () {
			return {

			}
		},
		methods: {
			serviceType (type) {
				if (type === 2) {
					return '退货'
				} else if (type === 3) {
					return '换货'
				}
				return ''
			},
			moreList () {
				this.$emit('next-page', this.$refs.loadmore)
			},
			gotoDetail (order) {
				let routeQuery = {}
				if (this.tabIndex === 3) {
					routeQuery  = {
						'mshopId': this.userInfo.shopId,//1965,
						'returnRequestId': order.id
					}
				} else {
					routeQuery  = {
						'id': order.id,
						'shopType': 2
					}
				}
				this.$router.push({
					path: 'detail',
					query: routeQuery
				})
			}
		}
	}
</script>
<style lang="scss">
	.order-list--item .vu-list {
		.vu-list__wrapper {
			border-top:1px solid transparent;
		}
		.vu-list__item {
			background-color: #FFF;
			padding: 0 .10rem;
			margin-top: .05rem;
		}
	}
</style>
<style lang="scss" scoped>
	.order-list--item {
		background-color: #F3F5F7;
	  margin-top: .05rem;
	  &:nth-child(2) {
			margin-top: .46rem;
		}
	  .order-list--title {
		  display: flex;
		  justify-content: space-between;
		  line-height: .37rem;
		  border-bottom: .02rem solid #EBECED;
		}
		.order-list--status {
		  color: #F20C59;
		}
		.order-list--goods {
		  display: flex;
		  justify-content: space-between;
		  align-items: center;
		  padding: .10rem 0;
		  border-bottom: .02rem solid #EBECED;
		}
		.goods-logo {
		  display: inline-block;
		  width: .77rem;
		  height: .77rem;
		  padding-right: .10rem;
		}
		.goods-content {
		  height: .77rem;
		  display: flex;
		  flex-direction: column;
		  justify-content: space-between;
		  flex: 1;
		  .goods-name {
		    line-height: .17rem;
		    overflow: hidden;
		    display: -webkit-box;
		    -webkit-line-clamp: 2;
		    -webkit-box-orient: vertical;
		    word-break: break-all;
		  }
		  .goods-msg {
		    display: flex;
		    justify-content: space-between;
		    color: #5A6066;
		    &:last-child {
		      color: #666666;
		    }
		  }
		}
		.order-list--price {
		  text-align: right;
		  line-height: .32rem;
		  color: #5A6066;
		}
		.goods-paid {
		  span + span {
		    padding-left: .10rem;
		  }
		}
		.goods-paid--sum, .goods-commission--sum {
		  color: #F20C59;
		}
	}
	
</style>