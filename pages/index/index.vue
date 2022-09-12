<!-- index开屏页 -->
<script>
import { systemTinytabbarPage_Get } from '@/api/SYSTEM/tabbar页面.js';
import { tabbar_mixins } from '@/components/mixins/tabbar.js';
import { tabbar_default } from './default';
import { systemParamsConfigKeyconfigKey_Get } from '@/api/SYSTEM/参数字典公告.js';
const basePath = '/static/tabBar/';
export default {
	mixins: [tabbar_mixins],
	data() {
		return {
			appName: getApp().globalData.appName
		};
	},
	methods: {
		// open开屏页结束
		openOver() {
			// 索引指向 user/user
			const current = this.__tabbar_list.findIndex(val => val.pagePath.indexOf('user/user') != -1);
			this.tabbarChange(current);

			setTimeout(() => {
				uni.switchTab({
					url: '/pages/user/user'
				});
			}, 1500);
		},
		async setEduOpenTime() {
			const timeNodeRes = await systemParamsConfigKeyconfigKey_Get({
				configKey: 'system:edu:opentime'
			});
			console.log('获取开学时间', timeNodeRes);
			if (timeNodeRes.data.code == 200) {
				this.$store.commit('edu/setTimeNode', Number(timeNodeRes.data.msg));
			}
		},
		// 异常时 使用默认数据
		netErr(e) {
			console.log('请求异常，使用默认tabbar数据');
			const dedfData = tabbar_default();
			this.setTabbarList(dedfData);
			this.openOver();
		}
	},
	onLoad() {
		this.setEduOpenTime();
		// #ifdef MP-QQ
		const type = '2';
		// #endif

		// #ifdef MP-WEIXIN
		const type = '1';
		// #endif

		systemTinytabbarPage_Get({ type })
			.then(res => {
				console.log(type, 'tabbar请求数据', res);
				if (res.data.code == 200) {
					const list = res.data.data.filter((v, i) => i < 5);
					const tabbarData = list.map(val => ({
						pagePath: val.path,
						text: val.name,
						iconPath: basePath + val.unCheckedIcon,
						selectedIconPath: basePath + val.checkedIcon
					}));
					console.log('解析tabbar', tabbarData);
					this.setTabbarList(tabbarData);
					this.openOver();
				} else {
					console.log('tabbar请求异常', res);
					this.netErr(res);
				}
			})
			.catch(err => {
				console.log('网络请求异常', err);
				this.netErr(err);
			});
	}
};
</script>
<template>
	<view class="open"><u-loading-page :loading="true" :loading-text="appName"></u-loading-page></view>
</template>
