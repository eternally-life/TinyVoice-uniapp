<template>
	<view>
		<!-- 轮播图 -->
		<view class="banner">
			<u-swiper
				:list="list"
				previousMargin="30"
				nextMargin="30"
				circular
				:autoplay="false"
				radius="5"
				bgColor="#ffffff"
			></u-swiper>
			 <view class="centerInfo">
		 	<view class="myItem" @click="navItemClick(item.path)" v-for="(item, index) in navs" :key="index">
		 		<view class="myIcon">
		 			<!-- <image :src="item.img"  mode="widthFix" /> -->
		 			<view class="fix" :class="item.icon"></view>
		 		</view>
		 		<text>{{ item.title }}</text>
		 	</view>
		 </view>
		<view class="center">
			<view>
				更多功能开发中，敬请期待!
			</view>
		</view>
		</view>
	</view>
</template>

<script>
import { systemSyscarouselPage_Get } from '@/api/SYSTEM/轮播图.js';
export default {
	data() {
		return {
			list: [
				'https://cdn.uviewui.com/uview/swiper/swiper1.png',
				'https://cdn.uviewui.com/uview/swiper/swiper2.png',
				'https://cdn.uviewui.com/uview/swiper/swiper3.png'
			],
			navs: [{
										icon: 'iconfont icon-fabu1',
										title: '留言板',
										path: '/subpages_tool/message_bored/message'
									},
									{
										icon: 'iconfont icon-dingdan',
										title: '证件照',
										path: '/subpages_tool/id_photo/IdPhoto'
									},
									{
										icon: 'iconfont icon-ruzhu1',
										title: '资源共享',
										path: '/subpages_tool/resources/resources'
									},
									{
										icon: 'iconfont icon-wodedianpu3',
										title: '体测计算',
										path: '/subpages_edu/test_physical/test_physical'
									}
								],
		};
	},
	methods: {
		getBanner() {
			systemSyscarouselPage_Get({
				pageNum: 1 /** 第几页    string required:false */,
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
	},
	onReady() {
		this.getBanner();
	}
};
</script>

<style scoped lang="scss">
.swiper {
	height: 20vh;
	width: 100%;
}
.center{
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
		justify-content: space-around;
		background-color: #fff;
		border-radius: 30rpx;
		padding: 20rpx 10rpx 40rpx;
		margin: 0 40rpx 50rpx;
		margin-top: 50rpx;
		.myItem {
			// 5个区域 每个占25%
			text-align: center;

			.myIcon {
				width: 100rpx;
				height: 100rpx;
				line-height: 100rpx;
				border-radius: 50%;
				// // 图片居中
				margin: 10rpx auto;
	
				// 修改图标颜色大小
				background-image: linear-gradient(45deg, #3dc0d2, #43e3bd);
	
				.fix {
					color: #fff;
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
</style>
