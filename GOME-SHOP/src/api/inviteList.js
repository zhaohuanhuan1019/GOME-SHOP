import { adaptFetch } from '@/config/adapt'

/*我的邀请记录*/
export let getMyInviteList = (options) => {
	let res = adaptFetch('queryMyInviteList',options)
	return res
}

/*我的团队信息*/
export let queryMyTeamList = (options) => {
	let res = adaptFetch('queryMyTeamList',options)
	return res
}

/*我的导师信息*/
export let queryMyTeacherWechatNumber = (options) => {
	let res = adaptFetch('queryMyTeacherWechatNumber',options)
	return res
}

/*查询vip信息*/
export let queryVipInfo = (options) => {
	let res = adaptFetch('queryVipInfo',options)
	return res
}

/*校验用户升级svip的资格*/
export let checkSvipStatus = (options) => {
	let res = adaptFetch('checkSvipStatus',options)
	return res
}

/*升级svip*/
export let promoteSvip = (options) => {
	let res = adaptFetch('promoteSvip',options)
	return res
}

/*配置的升级为svip需要的人数*/
export let getInviterCount = (options) => {
	let res = adaptFetch('getInviterCount',options)
	return res
}