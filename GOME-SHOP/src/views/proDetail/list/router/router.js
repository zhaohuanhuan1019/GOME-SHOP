import Vue from "vue";
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 商品介绍页面组件
/*import Product from '../../components/product';
import Detail from '../../components/detail';*/

const routes = [{
	path: '/',
	//component: Product,
	component: resolve => require(['../../components/product'], resolve), // 路由懒加载
}, {
	path: '/detail',
	//component: Detail,
	component: resolve => require(['../../components/detail'], resolve), // 路由懒加载
}, ]

var router = new VueRouter({ //路由默认使用hash模式
	routes
})
export default router;