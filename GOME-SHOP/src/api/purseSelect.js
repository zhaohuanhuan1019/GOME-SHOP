import fetch from '@/config/fetch'
import urls from './urls.js'
import { adaptFetch } from '@/config/adapt'

export let fetchPurseSelect = (options) => {
	let res = adaptFetch('purseSelect', options)
	return res
}

