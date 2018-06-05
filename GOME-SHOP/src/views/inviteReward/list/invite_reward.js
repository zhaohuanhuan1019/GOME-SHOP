import Vue from 'vue'
import App from './inviteApp'


import rem from 'common/js/rem'
import 'common/css/reset.css';

import vui from 'vui'
import 'vui/lib/theme-chalk/index.css'

Vue.use(vui)


new Vue({
	render: h => h(App)
}).$mount('#app')

