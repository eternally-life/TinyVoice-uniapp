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
		__current_Index: 0, //tabbar当前激素索引
		// 内置默认数据
		__tabbar_list: [{
				pagePath: "pages/edu/edu",
				text: "学习",
				iconPath: "/static/tabBar/unchecked_home.png",
				selectedIconPath: "/static/tabBar/select_home.png"
			},
			{
				pagePath: "pages/shop/shop",
				text: "商城",
				iconPath: "/static/tabBar/unchecked_shopping.png",
				selectedIconPath: "/static/tabBar/select_shopping.png"
			},
			{
				pagePath: "pages/community/community",
				text: "微音",
				iconPath: "/static/tabBar/unchecked_tinyVoice.png",
				selectedIconPath: "/static/tabBar/select_tinyVoice.png"
			},
			{
				pagePath: "pages/appliance/appliance",
				text: "服务",
				iconPath: "/static/tabBar/unchecked_tool.png",
				selectedIconPath: "/static/tabBar/select_tool.png"
			},
			{
				pagePath: "pages/user/user",
				text: "我的",
				iconPath: "/static/tabBar/unchecked_my.png",
				selectedIconPath: "/static/tabBar/select_my.png"
			}
		]
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
