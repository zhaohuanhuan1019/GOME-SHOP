import Vue from 'vue'
import VueRouter from 'vue-router'
import {env, system} from 'common/js/env'

import App from './firstRewardApp'
import '@/common/css/reset.css'
import rem from '@/common/js/rem'

import vui from 'vui'
import 'vui/lib/theme-chalk/index.css'
Vue.use(vui)

import MetaInfo from 'vue-meta-info'
Vue.use(MetaInfo)

import reward from './components/reward'

// const routes = [{
// 	path: '*',
// 	component: reward,
// }]

// Vue.use(VueRouter)

// const router = new VueRouter({
// 	routes: routes
// })

async function initVueApp () {
	new Vue({
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





