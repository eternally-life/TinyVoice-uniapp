import Vue from 'vue'
import Vuex from 'vuex'
// 导入教务模块
import edu from './edu_store/store_edu.js'
Vue.use(Vuex);


export default new Vuex.Store({
	modules: {
		edu
	},
	state: {},
	mutations: {},
	actions: {},
	getters: {}
})
