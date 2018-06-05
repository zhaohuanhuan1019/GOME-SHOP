import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './orderApp'
import 'common/css/reset.css'
import rem from 'common/js/rem'
import initJsbridge from 'common/js/initJsbridge'
import jsBridge from 'common/js/jsbridge.js'

import vui from 'vui'
import 'vui/lib/theme-chalk/index.css'
Vue.use(vui)

import orderList from './components/orderList'
import orderDetail from './components/orderDetail'

const routes = [{
	path: '/',
	component: orderList
},{
	path: '/detail',
	component: orderDetail
}]

Vue.use(VueRouter)

const router = new VueRouter({
	routes: routes
})

async function initVueApp () {
	await jsBridge.getHeader()
	new Vue({
		router: router,
	  render: h => h(App)
	}).$mount('#app')
}
// initVueApp()

// 获取客户端(安卓/苹果)信息
let ua = navigator.userAgent
let isAndroid = ua.match(/(Android);?[\s\/]+([\d.]+)?/)

if (isAndroid) {
	initJsbridge.connectWebViewJavascriptBridge(function(bridge) {
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
} else {
	initJsbridge.setupWebViewJavascriptBridge(function(bridge) {
		initVueApp()		
	})
}