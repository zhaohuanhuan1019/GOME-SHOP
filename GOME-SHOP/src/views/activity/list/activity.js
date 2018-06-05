import Vue from 'vue'
import App from './App'
import rem from 'common/js/rem'

function initVueApp() {
	// 统一获取用户登录信息
	new Vue({
		render: h => h(App)
	}).$mount('#app')
}
initVueApp ();