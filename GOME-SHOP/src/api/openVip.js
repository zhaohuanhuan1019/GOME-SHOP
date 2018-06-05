import fetch from '@/config/fetch'
import urls from './urls.js'
import { adaptFetch } from '@/config/adapt'

// export let fetchCMSModule = (options) => {
// 	let res = adaptFetch('cmsModule', options, {}, {
// 		headers: {
// 			'Content-Type': 'application/json'
// 		}
// 	})
// 	return res
// }
export let getVipInfo = (options) => {
	let res = adaptFetch('queryVipInfoByPointUserId', options)
	return res
}

export let checkvipStatus = (options) => {
	let res = adaptFetch('checkvipStatus', options)
	return res
}