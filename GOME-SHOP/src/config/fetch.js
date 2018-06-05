import axios from 'axios'
import {toast} from '../common/js/function.js'
import jsBridge from '../common/js/jsbridge.js'
import {env, system} from 'common/js/env';
import {encode} from 'common/js/utils.js';

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
						window.WebViewJavascriptBridge.callHandler('jsToNativenLackLoginParameters', {}, function() {});
						throw new Error('SCN参数为空');
					}
					break;
				}
			}			
		}	
	}
	if(!/^http/.test(req.url)){
		var reg = RegExp(/api-meidian-app/);
		if(!req.url.match(reg)){
			req.url = '/api-meidian-app' + req.url
		}
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
	/*
	var url = res.config.url;
	let code = res.data.code
	var regTask = RegExp(/task/);
	var regCms = RegExp(/cms/);
	if(regTask.test(url) || regCms.test(url)){//美店任务一期(非cms)和cms接口
		console.log('关于美店任务一期的借口统一拦截处理');
	}else {
		if('1102'==""+code||'1103'==""+code||'1104'==""+code){
			if(window.WebViewJavascriptBridge){
				jsBridge.accountLogin()
				console.log(jsBridge)
				return
			}
		}
	}
	*/
	return res
}, (err) => {
	if (err=='Error: SCN参数为空') {
		return false
	} else {
		toast('亲，你的手机网络不太顺畅喔~')
	}
	return Promise.reject(err)
})

export default axios
