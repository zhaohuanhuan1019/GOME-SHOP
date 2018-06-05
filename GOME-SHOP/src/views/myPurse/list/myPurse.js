import Vue from 'vue'
import App from './myPurseApp'

import store from 'src/store'
import rem from 'common/js/rem'
import 'common/css/reset.css';

import vui from 'vui'
import 'vui/lib/theme-chalk/index.css'
import initJsbridge from 'common/js/initJsbridge'
import jsBridge from 'common/js/jsbridge.js'; // 引入jsBridge
Vue.use(vui)



let u = navigator.userAgent;   
let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 || u.indexOf('android') > -1; //android终端   

if(isAndroid){
	/*android 调用初始化方法*/
	initJsbridge.connectWebViewJavascriptBridge(function(bridge) {
		initVueApp();
		bridge.init(function(message, responseCallback) {
			console.log('JS got a message', message);
			var data = {
				'Javascript Responds': '测试中文!'
			};
			console.log('JS responding with', data);
			responseCallback(data);
		});
	});
}else {
	/*ios 调用初始化方法*/
	initJsbridge.setupWebViewJavascriptBridge(function(bridge) {
		initVueApp();
	});
}

/* eslint-disable no-new */
async function initVueApp() {
	await jsBridge.getHeader()
	new Vue({
		store,
		render: h => h(App)
	}).$mount('#app')
	// 统一获取用户登录信息
	
}

