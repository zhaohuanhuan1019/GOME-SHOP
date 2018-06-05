import { adaptFetch } from '@/config/adapt'

export let queryPayChannel = (options) => {
	let res = adaptFetch('queryPayChannel', options);
	return res
}

export let orderPay = (options) => {
	let res = adaptFetch('orderPay', options);
	return res
}
