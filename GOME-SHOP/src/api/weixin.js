/**  
 * 提供  调用微信功能的 初始化 数据
 *
 * options： 
 * 
 *	ctl 固定为  weixin
 *
 *  act 固定为  weixinShareHandler
 *
 *  url ： 使用微信功能页面的  完成url (包括？后面， #后面，) encode之后的值 
 *
 * 	soruce 固定为 GomeMeidian
 */

import { adaptFetch } from '@/config/adapt'

export let getWeiXinInfo = (options) => {
	let res = adaptFetch('weixinInfo', options)
	return res
}