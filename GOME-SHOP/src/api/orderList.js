import fetch from '@/config/fetch'
import urls from './urls.js'
import { adaptFetch } from '@/config/adapt'

export let fetchList = (options) => {
	let res = adaptFetch('orderList', options)
	return res
}

export let fetchFinishedList = (options) => {
	let res = adaptFetch('orderFinishedList', options)
	return res
}