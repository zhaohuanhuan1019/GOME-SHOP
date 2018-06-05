import fetch from '@/config/fetch'
import urls from './urls.js'
import { adaptFetch } from '@/config/adapt'

export let fetchDetail = (options) => {
	let res = adaptFetch('orderDetail', options)
	return res
}
export let fetchasDetail = (options) => {
	let res = adaptFetch('asaleDetail', options)
	return res
}