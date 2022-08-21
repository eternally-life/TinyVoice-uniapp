<template>
	<view class="wrap">
		<!-- 轮播图 -->
		<view class="banner">
			<u-swiper :list="list" indicatorInactiveColor="rgba(255,255,255,0.7)"
				indicatorActiveColor="rgba(45,193,207,0.7)" indicator indicatorMode="dot" height="150"
				previousMargin="30" nextMargin="30" circular :autoplay="false" radius="5"></u-swiper>
		</view>
		<!-- 应用列表 -->
		<view class="column_title">
			<view class="column_border"></view>
			<view class="column_content">快来看看 \(￣︶￣*\))</view>
		</view>
		<view class="centerInfo" v-if="navs.length > 0">
			<view class="myItem" @click="navItemClick(item.jumpUrl,item.appId,item.jumpType)" v-for="(item, index) in navsWeb"
				:key="index">
				<view class="myIcon">
					<view class="fix" v-if="item.iconType == 1" :class="item.icon"></view>
					<view class="fix" v-if="item.iconType == 2">
						<image :src="item.image" mode="widthFix" />
					</view>
				</view>
				<text>{{ item.name }}</text>
			</view>
		</view>
		<!-- 应用列表 -->
		<view class="column_title">
			<view class="column_border"></view>
			<view class="column_content">是工具呀 →_→</view>
		</view>
		<view class="centerInfo" v-if="navs.length > 0">
			<view class="myItem" @click="navItemClick(item.jumpUrl,item.appId,item.jumpType)"
				v-for="(item, index) in navsTool" :key="index">
				<view class="myIcon">
					<view class="fix" v-if="item.iconType == 1" :class="item.icon"></view>
					<view class="fix" v-if="item.iconType == 2">
						<image :src="item.image" mode="widthFix" />
					</view>
				</view>
				<text>{{ item.name }}</text>
			</view>
		</view>
		<u-divider text="更多功能开发中，敬请期待!"></u-divider>
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
				navs: [],
				navsWeb: [],
				navsTool: []
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
							.concat(res.data.data.records);
						this.list = temp.map(value => value.url);
					}
				});
			},
			navItemClick(path, appId, jumpType) {
				// jumpType跳转类型：1.普通页面,2.tabbar页面,3.网页,4.小程序
				console.log(path);
				console.log(jumpType);
				switch (jumpType) {
					case 1:
						uni.navigateTo({
							url: path
						});
						break;
					case 2:
						uni.switchTab({
							url: path
						});
						break;
					case 3:
						console.log(path)
						console.log(123132)
						uni.navigateTo({
							url: '/subpages_tool/web/web?url=' + path
						});
						break;
					case 4:
						uni.navigateToMiniProgram({
							appId: appId,
						});
						break;
					default:
						uni.navigateTo({
							url: path
						});
						break;
				}
			},
			async getTool() {
				const res = await toolsList_Get()
				// this.$ShowToastNone('刷新成功~')
				if (res.data.code === 200 && res.data.data.length > 0) {
					setTimeout(() => {
						uni.stopPullDownRefresh()
					}, 1000)
					this.navs = res.data.data
					this.navsWeb = res.data.data.filter(e => e.jumpType == 3)
					this.navsTool = res.data.data.filter(e => e.jumpType != 3)

					this.isLoading = false
					console.log(res.data.data)
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
		.column_title{
			margin: 30rpx;
			border-left: 10rpx solid #2dc1cf;
			padding-left: 15rpx;
			.column_border{
			
			}
			.column_content{
				
				// font-weight: bold;
			}
		}

		.centerInfo {
			// 横排显示
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;
			background-color: #fff;
			border-radius: 30rpx;
			padding: 20rpx 10rpx 35rpx;
			margin: 10rpx 50rpx;

			.myItem {
				// 5个区域 每个占25%
				text-align: center;
				width: 25%;

				.myIcon {
					width: 100rpx;
					height: 100rpx;
					line-height: 100rpx;
					// border-radius: 15rpx;
					// // 图片居中
					margin: 20rpx auto;
					border-bottom: #8a8a8a;
					// 修改图标颜色大小
					background-image: linear-gradient(45deg, #ffffff, #ffffff);

					.fix {
						// color: #fff;
						width: 100%;
						height: 100%;
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
