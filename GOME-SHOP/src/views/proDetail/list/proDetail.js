import Vue from 'vue'
import App from './App'
import axios from 'axios';
import {env, system} from 'common/js/env'
//import router from './router/router'
import store from 'src/store'
import rem from 'common/js/rem'
import 'common/css/reset.css';
import vui from 'vui'
import 'vui/lib/theme-chalk/index.css'
import initJsbridge from 'common/js/initJsbridge'
import jsBridge from 'common/js/jsbridge.js'; // 引入jsBridge

Vue.use(vui)

async function initVueApp () {
	new Vue({
		store,
	  render: h => h(App)
	}).$mount('#app')
}

async function init () {
	if (env.gomeplus) {
		// let GomeJSBridge = await import('@/common/js/GomeJSBridge.js')
		// let gome_bridge = await import('@/common/js/gome-bridge.js')
		initVueApp()
	} else if (env.app) {
		let initJsbridge = await import('@/common/js/initJsbridge')
		let jsBridge = await import('@/common/js/jsbridge.js')
		if (system.android) {
			initJsbridge.connectWebViewJavascriptBridge(async function (bridge) {				
				await jsBridge.getHeader()
				initVueApp()
				//这个方法用于js接收oc发来的send，并使用responseCallback方法给OC回发消息
				bridge.init(function(message, responseCallback) {
					console.log('JS got a message', message)
					var data = {
						'Javascript Responds': '测试中文!'
					}
					console.log('JS responding with', data)
					responseCallback(data)
				})
			})
		} else if (system.ios) {
			initJsbridge.setupWebViewJavascriptBridge(async function (bridge) {
				await jsBridge.getHeader()
				initVueApp()
			})
		}	
	} else {
		initVueApp()
	}
}
init()