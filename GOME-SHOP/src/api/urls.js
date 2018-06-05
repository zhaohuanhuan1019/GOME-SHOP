import _ from 'underscore'
let config = {
	'noticeList': {
		url: '/notice/queryNoticeStaffInfo',
		method: 'get',
		keys: ['pageNo', 'pageSize']
	},
	'noticeDetail': {
		url: '/notice/queryUserNoticeById/',
		method: 'get',
		pathById: 'noticeId'
	},
	'orderList': {
		url: '/shopowner/order/v1/orderList',
		method: 'get',
		keys: ['mshopId', 'orderStatus', 'pageNum', 'pageSize']
	},
	'orderDetail': {
		url: '/shopowner/order/v1/orderDetail',
		method: 'get',
		keys: ['id', 'shopType']
	},
	'asaleDetail': {
		url: '/shopowner/order/v1/afterSaleOrderDetail',
		method: 'get',
		keys: ['mshopId', 'returnRequestId']
	},
	'orderFinishedList': {
		url: '/shopowner/order/v1/afterSaleOrderList',
		method: 'get',
		keys: ['mshopId', 'returnRequestId', 'pageNum', 'pageSize']

	},
	'productDetail': { //获取商品详情信息
		url: '/shopowner/product/v1/getProductInfo',
		method: 'get',
		keys: ['productId', 'skuId', 'areaId', 'shopId']
	},
	'productPutOn': { //商品上下架
		url: '/shopowner/product/v1/putOn',
		method: 'post',
		keys: ['productId', 'shopId', 'action', 'skuId']
	},
	'productDetailUserInfo': {
		url: '/shopowner/vipmanager/v1/queryVipInfo',
		method: 'get',
		keys: []
	},
	'productDetailImagesInfo': {
		url: '/shopowner/vip/v1/getBodyText',
		method: 'get',
		keys: ['url']
	},
	'productDetailGradePrice': {
		url: '/shopowner/vip/v1/getGradePrice',
		method: 'post',
		paramsFormat: true,
		keys: ['gradePriceVos']
	},
	'purseSelect': {
		url: '/shopowner/amount/v1/select',
		method: 'get',
		keys: ['userId', 'shopId', 'loginName']
	},
	'selectRebate': {
		url: '/shopowner/amount/v1/selectRebate',
		method: 'get',
		keys: ['userId', 'shopId', 'status', 'pageNum', 'pageSize']
	},
	'createShop': {
		url: '/task/invite/v1/createShop',
		method: 'post',
		keys: ['inviteUserId', 'taskId']
	},
	'InviterInfo': {
		url: '/task/invite/v1/getInviterInfo',
		method: 'get',
		keys: ['inviteUserId', 'taskId']
	},
	'IvGoodsPuton': {
		url: '/task/invite/v1/putOn',
		method: 'post',
		keys: ['productId', 'skuId', 'action', 'taskId']
	},
	'IvShareinfo': {
		url: '/task/invite/v1/getShareInfo',
		method: 'get',
		keys: ['taskId']
	},
	//以下是美店任务体系一期的相关接口
	'taskInviting': { //任务完成中
		url: '/task/invite/v1/getInvitingList',
		method: 'get',
		keys: ['taskId', 'userId', 'pageNum', 'pageSize']
	},
	'taskInvited': { //任务已完成
		url: '/task/invite/v1/getInvitedList',
		method: 'get',
		keys: ['taskId', 'userId', 'pageNum', 'pageSize']
	},
	'getRewardList': {//广告播报列表
		url: '/task/invite/v1/getRewardList',
		method: 'get',
		keys: ['taskId']
	},
	'inviteUrl': {//跳转进邀请页接口
		url: '/task/path/v1/inviteUrl',
		method: 'get',
		keys: []
	},
	'textIndex': {//cms获取全部文本数据
		url: '/cms/home/v1/textIndex',
		method: 'get',
		keys: ['keyProms']
	},
	'cmsModule': {//cms获取页面模块数据
		url: '/cms/home/v1/taskIndex',
		method: 'post',
		paramsFormat: true,
		keys: ['keyProms', 'gpsLongitude', 'gpsLatitude']
	},
	'selectRebate': {
		url: '/shopowner/amount/v1/selectRebate',
		method: 'get',
		keys: ['userId', 'shopId', 'status', 'pageNum', 'pageSize']
	},
	'firstRewardStatus': {
		url: '/task/firstReward/v1/queryRewardStatus',
		method: 'get',
		keys: ['taskId']
	},
	'firstRewardInvolve': {
		url: '/task/firstReward/v1/getActivityReward',
		method: 'post',
		keys: ['taskId']
	},
	'firstRewardTemplets': {
		url: '/cms/home/v1/rewardIndex',
		method: 'post',
		paramsFormat: true,
		keys: ['keyProms', 'gpsLongitude', 'gpsLatitude']
	},
	'firstRewardIsShopKeeper': {
		url: '/cms/home/v1/checkUserStatus',
		method: 'get',
		keys: []
	},
	'firstRewardUserInfo': {
		url: '/task/user/v1/getUserInfo',
		method: 'get',
		keys: []
	},
	'firstRewardGoodsPuton': {
		url: '/task/firstReward/v1/putOn',
		method: 'post',
		keys: ['productId', 'skuId', 'action', 'taskId']
	},
	'firstRewardShareinfo': {
		url: '/task/firstReward/v1/getShareInfo',
		method: 'get',
		keys: ['taskId']
	},
	'weixinInfo': {
		url: '//m.gome.com.cn/index.php',
		method: 'get',
		keys: ["ctl", "act", "url", "soruce"]
	},
	'getKid': {
		url: '/task/user/v1/shareUrlByKid',
		method: 'POST',
		paramsFormat: true,
		keys: ['callfrom', 'channel', 'flow', 'url', 'shareKey', 'skuId', 'itemId', 'distSaleId', 'merchantId', 'userId']
	},
	/*vip用户-我的邀请记录*/
	'queryMyInviteList':{
		url: '/shopowner/vipmanager/v1/queryMyInviteList',
		method: 'GET',
		keys: ['pageNo','pageSize']
	},
	/*svip用户-我的团队信息*/
	'queryMyTeamList':{
		url: '/shopowner/vipmanager/v1/queryMyTeamList',
		method: 'GET',
		keys: ['pageNo','pageSize']
	},
	/*查询我的导师信息*/
	'queryMyTeacherWechatNumber':{
		url: '/shopowner/vipmanager/v1/queryMyTeacherWechatNumber',
		method: 'GET'
	},
	/*获取支付渠道*/
	'queryPayChannel':{
		url: '/shopowner/vip/v1/getOrderPay',
		method: 'POST',
		keys: ['deviceType', 'browserType', 'userName', 'phoneNum', 'address', 'productInfo', 'payMoney','inviteUserId','wareId','backUrl']
	},
	/*支付*/
	'orderPay':{
		url: '/shopowner/vip/v1/orderPay',
		method: 'POST',
		keys: ['payTal', 'openId', 'backUrl', 'orderNo','inviteUserId']
	},
	'queryVipInfo':{
		url: '/shopowner/vipmanager/v1/queryVipInfo',
		method: 'GET'
	},
	/*检查用户升级SVIP资格*/
	'checkSvipStatus':{
		url: '/shopowner/vip/v1/checkSvipStatus',
		method: 'GET'
	},
	/*配置的升级为svip需要的人数*/
	'getInviterCount':{
		url: '/shopowner/vipmanager/v1/getInviterCount',
		method: 'GET'
	},
	/*升级svip*/
	'promoteSvip': {
		url: '/shopowner/vip/v1/promoteSvip',
		method: 'POST'
	},
	/*vip开通页面-校验用户vip信息*/
	'checkvipStatus':{
		url: '/shopowner/vip/v1/checkvipStatus',
		method: 'GET',
	},
	/*vip开通页面-指定userId查询vip信息*/
	'queryVipInfoByPointUserId':{
		url: '/shopowner/vipmanager/v1/queryVipInfoByPointUserId',
		method: 'GET',
		keys: ['userId']
	},
	'editHeadWechatNumber':{
		url: '/shopowner/vipmanager/v1/editHeadWechatNumber',
		method: 'POST',
		keys: ['weChatNumber']
	}
}
let custom = {}

// if (process.env.DATA_ENV === 'online') {
// 	custom = {
// 		'staffList': {
// 			method: 'post'
// 		}
// 	}
// } else if (process.env.NODE_ENV === 'production') {
// 	custom = {
// 		'staffList': {
// 			method: 'post'
// 		}
// 	}
// }
/*
 * 用自定义配置项 扩展+覆盖 基础配置项
 * source 基础配置项
 * target 自定义配置项
 */
function merge(source, target) {
	if (!(source && Object.keys(source).length > 0)) {
		throw new TypeError('source is not an object')
	}
	if (!(target && Object.keys(target).length > 0)) {
		return source
	}
	let tarKeys = Object.keys(target)
	for (let key in source) {
		if (tarKeys.indexOf(key) === -1) {
			continue
		}
		for (let k in target[key]) {
			source[key][k] = target[key][k]
		}
	}
	return source
}
export default merge(config, custom)
