<!-- 开屏页 -->
<script>
import { systemParamsConfigKeyconfigKey_Get } from '@/api/SYSTEM/参数字典公告.js';
import { tabbar_mixins } from '@/components/mixins/tabbar.js';
import { tabbar_default } from './default';
export default {
	mixins: [tabbar_mixins],
	data() {
		return {
			src: getApp().globalData.log,
			appName: getApp().globalData.appName
		};
	},
	methods: {
		// open开屏页结束
		openOver() {
			// 索引指向最后一个
			if (this.__tabbar_list.length > 0) {
				this.tabbarChange(this.__tabbar_list.length - 1);
			}
			setTimeout(() => {
				uni.switchTab({
					url: '/pages/user/user'
				});
			}, 1500);
		},
		// 异常时 使用默认数据
		netErr(e) {
			console.log('请求异常，使用默认tabbar数据');
			this.setTabbarList(tabbar_default());
			this.openOver();
		}
	},
	onLoad() {
		uni.hideTabBar();
		const basePath = '/static/tabBar/';
		systemParamsConfigKeyconfigKey_Get({
			configKey: 'sys.tabbar'
		})
			.then(res => {
				if (res.data.code == 200 && res.data.msg != '') {
					try {
						const tabbarData = JSON.parse(res.data.msg).map(val => ({
							pagePath: val.p,
							text: val.t,
							iconPath: basePath + val.i,
							selectedIconPath: basePath + val.si
						}));
						console.log('解析tabbar', tabbarData);
						this.setTabbarList(tabbarData);
						this.openOver();
					} catch (e) {
						console.log('tabbar数据解析异常', res);
						console.log('异常报错', e);
						this.openOver();
					}
				} else {
					console.log('异常', res);
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
	<view class="open"><u-loading-page :loading="true" :image="src" :loading-text="appName"></u-loading-page></view>
</template>
