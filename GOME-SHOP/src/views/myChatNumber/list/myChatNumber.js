import Vue from 'vue'
import App from './myChatNumberApp'
import rem from '@/common/js/rem'
import vui from 'vui'
import 'vui/lib/theme-chalk/index.css'
import 'common/css/reset.css';
Vue.use(vui)

function initVueApp () {
	new Vue({
	  render: h => h(App)
	}).$mount('#app')
}

initVueApp()