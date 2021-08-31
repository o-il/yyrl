import Vue from 'vue'
import App from './App.vue'
import router from '../router/index.js'
import VueAxios from 'vue-axios'
import axios from 'axios'
import qs from 'qs';
import Vuesession from 'vue-session'
import store from '../store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import _ from 'lodash'
import Video from 'video.js'
import 'video.js/dist/video-js.css'

Vue.prototype.$video = Video
Vue.prototype._ = _
Vue.prototype.$http = axios
Vue.prototype.$qs = qs

// 加载全局样式文件
import '../style/index.css'
// 加载自定义字体
import './assets/font/font.css'

Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.use(qs)
Vue.use(Vuesession)
Vue.config.productionTip = false

//配置请求的根路径
axios.defaults.baseURL = 'http://39.105.160.191:7001'

// 路由拦截
router.beforeEach((to, from, next) => {
	if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
		if (window.localStorage.token) {
			next();
		} else {
			next({
				path: '/index',
				query: {
					redirect: to.fullPath
				} // 将跳转的路由path作为参数，登录成功后跳转到该路由
			})
		}
	} else {
		next();
	}
})

//请求拦截
axios.interceptors.request.use((config) => {
	if (store.state.token) {
		config.headers.common['token'] = store.state.token
	}
	return config;
}, function(error) {
	return Promise.reject(error);
});




new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
