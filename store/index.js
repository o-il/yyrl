import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = { // 全局管理的数据存储
	ser: null,
	token: localStorage.getItem('token') ? localStorage.getItem('token') : '', // token
	account:localStorage.getItem('account') ? localStorage.getItem('account') : '',//account
};

export default new Vuex.Store({
	state,
	getters: { // 监听数据变化的
		getStorage(state) { // 获取本地存储的登录信息
			if (!state.token) {
				state.token = JSON.parse(localStorage.getItem('token'))
			}
			return state.token
		}
	},
	mutations: {
		$_setToken(state, value) { // 设置存储token
			state.token = value;
			localStorage.setItem('token', value);
		},
		$_removeStorage(state, value) { // 删除token
			localStorage.removeItem('token');
		},
		$_setaccount(state,value) { // 储存用户的账户
			localStorage.setItem('account', value);
		},
		$_removeaccount(state,value) { // 储存用户的账户
			localStorage.removeItem('account');
		}
	},
	actions: {},
	modules: {}
})
