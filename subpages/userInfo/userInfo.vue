<template>
	<view>
		<view class="avatar"><u-avatar :src="userInfo.avatar" size="90"></u-avatar></view>
		<u-cell-group>
			<u-cell
				v-for="(item, index) in cellList"
				:key="index"
				:title="item.title"
				:value="getValue(item.name)"
				:name="item.name"
				size="large"
				:isLink="true"
				:clickable="true"
				arrow-direction="right"
				@click="itemTap"
			></u-cell>
		</u-cell-group>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userInfo: {},
			cellList: [
				{
					title: '昵称',
					name: 'nickName'
				},
				{
					title: '性别',
					name: 'sex'
				},
				{
					title: '身份',
					name: 'std'
				},
				{
					title: '收货地址',
					name: 'add'
				}
			]
		};
	},
	filters: {
		genderString(sex) {
			switch (sex) {
				case 1:
					return '小哥哥';
				case 2:
					return '小姐姐';
				default:
					return '未知';
			}
		}
	},
	methods: {
		itemTap(e) {
			console.log('点击', e);
			uni.navigateTo({
				url: '/subpages/edit_userInfo/edit_userInfo'
			});
		},
		/* 获取参数 */
		getValue(para) {
			switch (para) {
				case 'nickName':
					return this.userInfo.nickName;
				case 'sex':
					return this.$options.filters['genderString'](this.userInfo.sex);
				case 'std':
					return '学生';
				case 'add':
					return '学校';
				default:
					return '异常的选项';
			}
		}
	},
	onLoad(option) {
		if (option.userInfo) {
			this.userInfo = JSON.parse(option.userInfo);
		}
	}
};
</script>

<style scoped lang="scss">
.avatar {
	margin: 6vh auto;
	display: flex;
	justify-content: center;
}
</style>
