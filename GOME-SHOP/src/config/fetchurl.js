import axios from 'axios'
import {toast} from '../common/js/function.js'
//axios超时设置
axios.defaults.timeout = 1000*30
//请求之前拦截处理
axios.interceptors.request.use((req) => {
	let urls =['/shopowner/product/v1/getProductInfo'];
	if(urls.indexOf(req.url) > -1) {
		console.log('此接口不需要header')
	} else {
		for (let key in window.headers) {
			if (key !== 'cookie') {
				req.headers[key] = window.headers[key]
				continue
			}
			let cookie = window.headers['cookie'].split(';');
			for (let i = 0, length = cookie.length; i < length; i ++) {
				let item = cookie[i].split('=')
				if (item[0] === 'SCN') {
					req.headers['SCN'] = item[1];					
					//cookie为空 跳转到登录页面
					if(!req.headers['SCN']){
						//window.WebViewJavascriptBridge.callHandler('jsToNativenLackLoginParameters', {}, function() {});
						throw new Error('SCN参数为空');
					}
					break;
				}
			}			
		}	
	}
	console.log(req)
	if(!/^http/.test(req.url)){
		req.url = '/api-meidian-app' + req.url
	}
	return req
}, (err) => {
	Message.err({
		message: '加载超时，请稍后重新尝试'
	})
	return Promise.reject(err)
})
//响应之后拦截处理
axios.interceptors.response.use((res) => {
	return res
}, (err) => {
	if(err=='Error: SCN参数为空'){
		return;
	}else{
		toast('服务器或网络异常，请稍后重新尝试')
	}
	return Promise.reject(err)
})
export default axios