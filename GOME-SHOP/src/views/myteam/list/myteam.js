import Vue from 'vue'
import App from './myTeamApp'
import 'common/css/reset.css';
import rem from '@/common/js/rem'
import vui from 'vui'
import 'vui/lib/theme-chalk/index.css'
Vue.use(vui)

function initVueApp () {
	new Vue({
	  render: h => h(App)
	}).$mount('#app')
}

initVueApp()