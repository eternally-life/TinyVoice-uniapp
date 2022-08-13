<template>
	<view class="u-page">
		<u-cell-group v-for="item in IdPhotoList" :key="item.type">
			<u-cell :title="item.title" isLink url="/pages/componentsB/tag/tag"
				@click="toPhotoHandle(item.type)"></u-cell>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				IdPhotoList: [{
						title: '教师资格证',
						type: 1
					},
					{
						title: '计算机等级考试',
						type: 2
					},
					{
						title: '普通话考试',
						type: 3
					},
					{
						title: '英语四六级',
						type: 4
					},
					{
						title: '考研',
						type: 5
					},
					{
						title: '一寸照',
						type: 6
					},
					{
						title: '两寸照',
						type: 7
					}
				]
			}
		},

		methods: {
			toPhotoHandle(type) {
				uni.navigateTo({
					url: '/subpages_tool/id_photo/photo_handle?type=' + type
				});
			},

		}
	};
</script>

<style lang="scss">
</style>
