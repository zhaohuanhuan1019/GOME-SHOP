import fetch from '@/config/fetch'
import urls from './urls.js'
import { adaptFetch } from '@/config/adapt'

export let fetchCMSModule = (options) => {
	let res = adaptFetch('cmsModule', options, {}, {
		headers: {
			'Content-Type': 'application/json'
		}
	})
	return res
}
export let fetchTextIndex = (options) => {
	let res = adaptFetch('textIndex', options)
	return res
}
