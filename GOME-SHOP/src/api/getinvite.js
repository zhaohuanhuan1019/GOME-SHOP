import { adaptFetch } from '@/config/adapt'

export let fetchTaskInviting = (options) => {
	let res = adaptFetch('taskInviting', options)
	return res
}
export let fetchTaskInvited = (options) => {
	let res = adaptFetch('taskInvited', options)
	return res
}
export let fetchGetRewardList = (options) => {
	let res = adaptFetch('getRewardList', options)
	return res
}
export let fetchInviteUrl = (options) => {
	let res = adaptFetch('inviteUrl', options)
	return res
}
export let fetchUserInfo = (options) => {
	let res = adaptFetch('firstRewardUserInfo', options)
	return res
}