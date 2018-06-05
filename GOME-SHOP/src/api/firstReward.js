import { adaptFetch } from '@/config/adapt'

export let fetchRewardStatus = (options) => {
	let res = adaptFetch('firstRewardStatus', options)
	return res
}

export let fetchRewardInvolve = (options) => {
	let res = adaptFetch('firstRewardInvolve', options)
	return res
}

export let fetchRewardTemplets = (options) => {
	let res = adaptFetch('firstRewardTemplets', options)
	return res
}

export let fetchIsShopKeeper = (options) => {
	let res = adaptFetch('firstRewardIsShopKeeper', options)
	return res
}

export let fetchUserInfo = (options) => {
	let res = adaptFetch('firstRewardUserInfo', options)
	return res
}

export let fetchGoodsPuton = (options) => {
	let res = adaptFetch('firstRewardGoodsPuton', options)
	return res
}

export let fetchShareinfo = (options) => {
	let res = adaptFetch('firstRewardShareinfo', options)
	return res
}

export let fetchKid = (options) => {
	let res = adaptFetch('getKid', options)
	return res
}
