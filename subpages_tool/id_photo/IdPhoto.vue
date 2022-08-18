<template>
	<view>
		<view class="topText">
			<text class="topText_1">微音智能转换</text>
			<text class="topText_2">——在线绘图 提高你的效率——</text>
		</view>
		<!-- 主体区 -->
		<view class="contenter">
			<!-- 热门类型 -->
			<text class="title">热门类型</text>
			<view class="list">
				<view class="item" v-for="(option,index) in hotType" :key="index" @tap="chooseType(option.id)">
					<text class="photoType">{{ option.photoType }}</text>
					<text class="detail">{{ option.detail_1 }}</text>
					<text class="detail">{{ option.detail_2 }}</text>
				</view>
			</view>
			<!-- 考试证件照 -->
			<text class="title">考试证件照</text>
			<view class="list">
				<view class="item" v-for="(option,index) in testType" :key="index" @tap="chooseType(option.id)">
					<text class="photoType">{{ option.photoType }}</text>
					<text class="detail">{{ option.detail_1 }}</text>
					<text class="detail">{{ option.detail_2 }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list1: [	// 轮播图 图片地址
					
				],
				hotType: [ // 热门类型的数据
					{
						id: 6,
						photoType: '一寸',
						detail_1: '25×35mm',
						detail_2: '295×413px'
					},
					{
						id: 7,
						photoType: '二寸',
						detail_1: '35×53mm',
						detail_2: '413×579px'
					},
					{
						id: 1,
						photoType: '教师资格证',
						detail_1: '15×20mm',
						detail_2: '180×240px'
					},
				],
				testType: [{
						id: 2,
						photoType: '计算机等级考试',
						detail_1: '35×53mm',
						detail_2: '413×579px'
					},
					{
						id: 3,
						photoType: '普通话考试',
						detail_1: '33×48mm',
						detail_2: '390×567px'
					},
					{
						id: 4,
						photoType: '英语四六级',
						detail_1: '33×48mm',
						detail_2: '390×567px'
					},
					{
						id: 5,
						photoType: '考研',
						detail_1: '33×48mm',
						detail_2: '390×567px'
					},
				]

			}
		},
		methods: {
			chooseType(type) {
				uni.navigateTo({
					url: '/subpages_tool/id_photo/photo_handle?type=' + type
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.topText {
		width: 100%;
		height: 220rpx;
		background-color: #c6c6f0;
		padding-top: 70rpx;
		text-align: center;
		.topText_1{
			display: block;
			width: 100%;
			font-size: 70rpx;
			color: white;
		}
		.topText_2{
			display: block;
			font-size: 35rpx;
			color: white;
		}
	}
	

	.contenter {
		width: 100%;
		height: auto;
		.title {
			font-size: 40rpx;
			display: block;
			width: 100%;
			padding-left: 10rpx;
			margin-top: 20rpx;
		}

		.list {
			width: 100%;
			height: 235rpx;
			display: flex;
			flex-direction: row;
			// justify-content:space-around;
			flex-wrap: wrap;

			.item {
				width: 220rpx;
				height: 220rpx;
				background-color: #eaedee;
				margin: 20rpx 0 10rpx 25rpx ;
				border-radius: 10%;
				text-align: center;

				.photoType {
					font-size: 35rpx;
					display: block;
					margin: 20rpx auto;
				}

				.detail {
					display: block;
					font-size: 30rpx;
				}
			}
		}
	}
</style>
