import Vue from 'vue'
import Vuex from 'vuex'
// 导入教务模块
import edu from './edu_store'
import sys from './system'
Vue.use(Vuex);


export default new Vuex.Store({
	modules: {
		edu,
		sys
	},
	state: {},
	mutations: {},
	actions: {},
	getters: {}
})
