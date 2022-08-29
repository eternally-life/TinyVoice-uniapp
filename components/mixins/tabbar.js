/**全局自定义tabbar
 * 全局统一调用tabbar数据
 * */
//引入tabbar专用全局状态
import {
	mapState,
	mapMutations
} from 'vuex';

export const tabbar_mixins = {
	data() {
		return {}
	},
	methods: {
		...mapMutations(['tabbarChange', 'setTabbarList']),
		// 点击tabbar触发方法
		__tabbarTap({
			name,
			path
		}) {
			// console.log('点击方法触发', name, path);
			uni.switchTab({
				url: `/${path}`,
				success: (res) => {
					this.tabbarChange(name)
				}
			});
		},
	},
	computed: {
		//导出当前tabbar索引、tabbar列表
		...mapState(['__current_Index', '__tabbar_list'])
	}
}

// 统一隐藏tabbar
export const tabbar_hid = {
	onShow() {
		uni.hideTabBar();
	}
}
