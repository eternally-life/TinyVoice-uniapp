<template>
	<view class="wrap">
		<!-- 轮播图 -->
		<view class="banner">
			<u-swiper :list="list" indicator indicatorMode="dot" height="160" previousMargin="30" nextMargin="30" circular
				:autoplay="false" radius="5"></u-swiper>
		</view>
		<!-- 应用列表 -->
		<view class="comments_title">
			<view class="comments_border"></view>
			<view class="comments_content">是工具呀</view>
		</view>
		<view class="centerInfo" v-if="navs.length > 0">
			<view class="myItem" @click="navItemClick(item.jumpUrl)" v-for="(item, index) in navs" :key="index">
				<view class="myIcon">
					<!-- <image :src="item.img"  mode="widthFix" /> -->
					<view class="fix" :class="item.icon"></view>
				</view>
				<text>{{ item.name }}</text>
			</view>
		</view>
		<u-divider>更多功能开发中，敬请期待!</u-divider>
	</view>
</template>

<script>
	import {
		systemSyscarouselPage_Get,
		toolsList_Get
	} from '@/api/SYSTEM/轮播图.js';
	export default {
		data() {
			return {
				list: [],
				navs: []
			};
		},
		methods: {
			getBanner() {
				systemSyscarouselPage_Get({
					pageNum: 1 /** 第几页    string required:false */ ,
					pageSize: 6 /** 页码大小    string required:false */
				}).then(res => {
					console.log('结果', res);
					if (res.data.code == 200 && res.data.data.records.length > 0) {
						let temp = []
							.concat(res.data.data.records)
							.concat(res.data.data.records)
							.concat(res.data.data.records);
						this.list = temp.map(value => value.url);
					}
				});
			},
			navItemClick(path) {
				console.log(path);
				uni.navigateTo({
					url: path
				});
			},
			async getTool () {
				const res = await toolsList_Get()
				// this.$ShowToastNone('刷新成功~')
				if (res.data.code === 200 && res.data.data.length > 0){
					setTimeout(() => {
						uni.stopPullDownRefresh()
					}, 1000)
					this.navs = res.data.data
					this.isLoading = false
				}
			}
		},
		onReady() {
			this.getBanner();
			this.getTool();
		},
		onPullDownRefresh() {
			//重新发起请求：请求发送成功以后传入一个回调函数，回调函数停止下拉刷新
			this.getTool()
		},
	};
</script>

<style scoped lang="scss">
	.wrap {
		.banner {
			margin: 30rpx 0;
		}

		.comments_title {
			display: flex;
			align-items: center;
			padding: 30rpx;
			margin-top: 30rpx;

			.comments_border {
				width: 8rpx;
				height: 50rpx;
				background: #2dc1cf;
				border-top-left-radius: 10rpx;
				border-top-right-radius: 10rpx;
				border-bottom-left-radius: 10rpx;
				border-bottom-right-radius: 10rpx;
			}

			.comments_content {
				color: #4a4a4a;
				margin-left: 10rpx;
			}
		}

		.center {
			flex: auto;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			background: white;
		}

		.centerInfo {
			// 横排显示
			display: flex;
			flex-wrap: wrap; 
    		justify-content: flex-start;
			background-color: #fff;
			border-radius: 30rpx;
			padding: 20rpx 10rpx 40rpx;
			margin: 10rpx 50rpx;

			.myItem {
				// 5个区域 每个占25%
				text-align: center;
				margin: 0 20rpx;

				.myIcon {
					width: 100rpx;
					height: 100rpx;
					line-height: 100rpx;
					// border-radius: 15rpx;
					// // 图片居中
					margin: 10rpx auto;
					border-bottom: #8a8a8a;
					// 修改图标颜色大小
					background-image: linear-gradient(45deg, #ffffff, #ffffff);

					.fix {
						// color: #fff;
						font-size: 50rpx;
					}
				}

				// 设置所有图标大小
				.iconfont {
					font-size: 55rpx;
				}

				text {
					font-size: 26rpx;
					align-items: center;
				}
			}
		}
	}
</style>
