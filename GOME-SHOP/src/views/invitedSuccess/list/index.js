import Vue from 'vue'

import 'common/css/reset.css'
import rem from 'common/js/rem'
import vui from 'vui'
import 'vui/lib/theme-chalk/index.css'
import App from './App'

Vue.use(vui)

let u = navigator.userAgent;   
let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 || u.indexOf('android') > -1; //android终端   

new Vue({
el: '#app',
template: '<App></App>',
components: { App }
})

/* eslint-disable no-new */
async function initVueApp() {
	new Vue({
		//store,
		render: h => h(App)
	}).$mount('#app')
}