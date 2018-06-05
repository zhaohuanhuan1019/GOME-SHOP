
import urls from './urls.js'
import { adaptFetch } from '@/config/adapt'

function fetchCreate(options) {
	let res = adaptFetch('createShop', options)
	return res
}
function fetchInvite(options) {
	let res = adaptFetch('InviterInfo', options)
	return res
}
function fetchUserInfo(options) {
	let res = adaptFetch('firstRewardUserInfo', options)
	return res
}
function fetchpage(options) {
	let res = adaptFetch('cmsModule', options, {}, {
		headers: {
			'Content-Type': 'application/json'
		}
	})
	return res
}
function fetchGoodsPuton(options) {
	let res = adaptFetch('IvGoodsPuton', options)
	return res
}
function fetchShareinfo(options) {
	let res = adaptFetch('IvShareinfo', options)
	return res
}
function fetchKid(options) {
	let res = adaptFetch('getKid', options)
	return res
}
export {
	fetchCreate,fetchInvite,fetchUserInfo,fetchpage,fetchGoodsPuton,fetchShareinfo,fetchKid
}