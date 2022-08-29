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
	state: {
		__saveSize:0,
		__current_Index: 0, //tabbar当前激素索引
		// 内置默认数据
		__tabbar_list: [{
			pagePath: "pages/user/user",
			text: "我的",
			iconPath: "/static/tabBar/unchecked_my.png",
			selectedIconPath: "/static/tabBar/select_my.png"
		}]
	},
	mutations: {
		/* 修改当前tabbar数据 */
		tabbarChange(state, index) {
			state.__current_Index = index
		},
		/* 修改全局tabbar列表 */
		setTabbarList(state, newValue) {
			state.__tabbar_list = newValue
		}
	}
})
