import { adaptFetch } from '@/config/adapt'

export let fetchSelectRebate = (options) => {
	let res = adaptFetch('selectRebate', options);
	return res
}

