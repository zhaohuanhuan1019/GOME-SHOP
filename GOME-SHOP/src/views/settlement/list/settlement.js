import Vue from 'vue'
import App from './settlement.vue'
import 'common/css/reset.css'
import rem from 'common/js/rem'
import vui from 'vui'
import 'vui/lib/theme-chalk/index.css'

Vue.use(vui)
new Vue({
	//store,
	render: h => h(App)
}).$mount('#app')
