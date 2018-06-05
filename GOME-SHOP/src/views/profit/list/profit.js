import Vue from 'vue'
import App from './profit.vue'
import 'common/js/rem'
import 'common/css/reset.css';
import vui from 'vui'
import 'vui/lib/theme-chalk/index.css'
import initJsbridge from 'common/js/initJsbridge'
import jsBridge from 'common/js/jsbridge.js'; // 引入jsBridge

Vue.use(vui);

initJsbridge.connectWebViewJavascriptBridge(initApp);
initJsbridge.setupWebViewJavascriptBridge(initApp);

async function initApp () {
	await jsBridge.getHeader();
	
	new Vue({
		render: h => h(App)
	}).$mount('#app');
}


