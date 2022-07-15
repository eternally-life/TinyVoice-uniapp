<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{ title }}</text>
		</view>
		测试页 tabber1
		<u-button type="primary" icon="map" text="uView组件"></u-button>
		<view class="">
			icon引入测试
			<view class="iconfont icon-chengji"></view>
		</view>
		<view class="">
			彩色icon引入测试
			<view class="t-icon t-icon-xuefen fix-t-icon"></view>
		</view>
		<!-- <view class="iconfont icon-xxx"></view> -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: 'Hello'
		};
	},
	onLoad() {},
	methods: {}
};
</script>

<style>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.logo {
	height: 200rpx;
	width: 200rpx;
	margin-top: 200rpx;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 50rpx;
}

.text-area {
	display: flex;
	justify-content: center;
}

.title {
	font-size: 36rpx;
	color: #8f8f94;
}
.fix-t-icon {
	color: aqua;
	width: 60rpx;
	height: 60rpx;
}
</style>
