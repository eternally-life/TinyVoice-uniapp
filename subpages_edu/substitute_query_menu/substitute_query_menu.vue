<template>
	<view>
		<u-toast ref="uToast"></u-toast>
		<u-notice-bar :text="showStr" speed="60"></u-notice-bar>
		<view class="mainContainer"><u-button @click="toPage" type="primary" :plain="true" text="代 查 他 人 成 绩"></u-button></view>
	</view>
</template>

<script>
// import { systemUsermanageList, systemUsermanageGetInfo_Get } from '@/api/SYS/用户信息管理.js';
export default {
	data() {
		return {
			consume: 0, //显示音符消耗
			queryFlage_admin: false, //是否拥有特殊用户字段
			queryFlage_normal: false //后台是否开启查询标记
		};
	},
	computed: {
		//是否允许跳转标记 默认false
		othersQueryFlage() {
			return this.queryFlage_normal ? true : this.queryFlage_admin ? true : false;
		},

		// 顶部提示
		showStr() {
			return '当前每次查询微音消耗量：' + this.consume + ' 音符';
		}
	},
	methods: {
		/* 功能鉴权 */
		authentication() {
			systemUsermanageList()
				.then(res => {
					if (res.data.code == 200) {
						return res.data.rows;
					}
				})
				.then(val => {
					if (val.length > 0) {
						val.forEach((v, i) => {
							// 修改入口权限
							if (v.configKey == 'edu:guet:otherQueryScore') {
								this.queryFlage_normal = v.configValue == 'true' ? true : false;
							}
							// 修改音符消耗量
							if (v.configKey == 'edu:guet:integral') {
								this.consume = Number(v.configValue);
							}
						});
					}
				});
		},
		/* 角色鉴权 */
		getFlage_admin() {
			systemUsermanageGetInfo_Get()
				.then(res => {
					if (res.data.code == 200) {
						return res.data.roles;
					}
				})
				.then(val => {
					if (val.length > 0) {
						val.forEach((v, i) => {
							// console.log("角色列表",v);
							if (v === 'voice_edu_select') {
								this.queryFlage_admin = true;
								getApp().globalData.is_voiceEduSelect = true;
							}
						});
					}
				});
		},
		/* 跳转页面 */
		toPage() {
			if (this.othersQueryFlage == false) {
				this.selfMsg('此功能暂未开放');
				return;
			}
			this.$store.commit('edu/setTransferType', 2);
			uni.navigateTo({
				url: '/pages/edu_final_exam/edu_final_exam'
			});
		},

		/* 消息封装 */
		selfMsg(msg) {
			this.$refs.uToast.show({ type: 'error', message: msg, duration: 1000 });
		}
	},
	onReady() {
		this.authentication();
	}
};
</script>

<style lang="scss">
.mainContainer {
	width: 50%;
	margin: 40px auto;
}
</style>
