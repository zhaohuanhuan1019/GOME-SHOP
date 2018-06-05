import Vue from 'vue'

import 'common/css/reset.css'
import rem from 'common/js/rem'
import vui from 'vui'
import 'vui/lib/theme-chalk/index.css'
import App from './App'

Vue.use(vui)
new Vue({
	//store,
	render: h => h(App)
}).$mount('#app')
