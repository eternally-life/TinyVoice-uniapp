<template>
	<view class="wrap">
		<view class="wrap_box">
			<view class="box_data">
				{{describe}}
			</view>
			<view class="box_msg">

			</view>
			<view class="box_comment">

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				eventChannel: null,
				describe: ''
			};
		},
		onLoad(option) {
			console.log(option.query);
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('acceptResourcesData', data => {
				let datas = data.data
				this.describe = datas.describe
			});

			console.log(this.describe);
		},
		onUnload() {
			this.eventChannel.off('login');
		},

	}
</script>

<style lang="scss">
	.wrap {
		background: #f1f1f1;
		height: 100%;

		.wrap_box {
			margin: 20rpx auto;
			padding: 30rpx;
			width: 700rpx;
			height: 566rpx;
			border-radius: 7rpx;
			box-shadow: 0rpx 0rpx 10rpx #ccc;
			position: relative;
			background-color: #ffffff;
			.box_data {}

			.box_msg {}

			.box_comment {}
		}
	}
</style>
