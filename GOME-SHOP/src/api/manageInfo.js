import { adaptFetch } from '@/config/adapt'

/*查询vip的信息*/
export let getVipInfo = (options) => {
	let res = adaptFetch('queryVipInfo',options)
	return res
}

/*保存微信号码*/
export let saveChatNumber = (options) => {
	let res = adaptFetch('editHeadWechatNumber',options,{
		headers: {
			'Content-Type': 'application/json'
		}
	})
	return res
}

