import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../src/index/index.vue'
import Login from '../src/login/index.vue'
import Map from '../src/map/index.vue'
import Regist from '../src/regist/index.vue'
import Musical from '../src/map/musical/index.vue'
import Tools from '../src/map/component/tools.vue'
import Viewing from '../src/map/viewing/index.vue'
import Demo from '../src/map/viewing/component/vedio.vue'
import Stage from '../src/map/stage/index.vue'
import Begin from '../src/map/stage/begin.vue'
import Game1 from '../src/map/stage/game.vue'
import Teach from '../src/map/teach/index.vue'
import Helpcenter from '../src/map/helpcenter/index.vue'
import Museum from '../src/map/museum/index.vue'
import Pass from '../src/map/pass/index.vue'
import Shop from '../src/map/shop/index.vue'
import Shop2 from '../src/map/shop2/index.vue'
import Dress from '../src/map/dressing/index.vue'

Vue.use(VueRouter)

// 解决vue router路由重复触发导致的报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
	if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
	return originalPush.call(this, location).catch(err => err);
};


// 路由配置表
const routes = [{
	path: '/',
	redirect: 'index',
},{
	path: '/demo',
	component: Demo,
}, {
	path: '/map',
	component: Map,
	meta: {
		requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
	},
}, {
	path: '/login',
	component: Login
}, {
	path: '/regist',
	component: Regist
},{
	path: '/index',
	component: Index
},{
	path: '/musical',
	component: Musical,
	meta: {
		requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
	},
},{
	path: '/teach',
	component: Teach,
	meta: {
		requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
	},
},{
	path: '/viewing',
	component: Viewing,
	meta: {
		requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
	},
},{
	path: '/helpcenter',
	component: Helpcenter,
	meta: {
		requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
	},
},{
	path: '/museum',
	component: Museum,
	meta: {
		requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
	},
},{
	path: '/pass',
	component: Pass,
	meta: {
		requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
	},
},{
	path: '/shop',
	component: Shop,
	meta: {
		requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
	},
},{
	path: '/shop2',
	component: Shop2,
	meta: {
		requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
	},
},{
	path: '/dress',
	component: Dress,
	meta: {
		requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
	},
},{
	path: '/stage',
	component: Stage,
	redirect: '/stage/begin',
	meta: {
		requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
	},
	children:[
		{
			path:'begin',
			component:Begin
		},{
			path:'game',
			component:Game1
		}
	]
}]

const router = new VueRouter({
	mode: 'history',
	routes
})

export default router
