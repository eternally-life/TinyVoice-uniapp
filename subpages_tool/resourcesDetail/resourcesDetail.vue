<template>
	<view class="wrap">
		<view class="wrap_box">
			<view class="box_data">
				{{datas.name}}
				<view class="data_msg">
					{{$u.timeFormat(datas.createTime, 'yyyy-mm-dd')}}
					下载数：{{datas.downNum}}
					所需积分：{{datas.integral}}
				</view>
			</view>
			<view class="box_msg">
				{{datas.describe}}
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
				// describe: '',
				datas: {}
			};
		},
		onLoad(option) {
			console.log(option.query);
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('acceptResourcesData', data => {
				// let datas = data.data
				this.datas = data.data
				// this.describe = datas.describe
			});

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
			margin: 30rpx auto;
			padding: 30rpx;
			width: 650rpx;
			height: 566rpx;
			border-radius: 15rpx;
			box-shadow: 0rpx 0rpx 10rpx #ccc;
			position: relative;
			background-color: #ffffff;

			.box_data {
				.data_name {
					font-size: 38rpx;
				}

				.data_msg {
					display: block;
					box-sizing: border-box;
					font-size: 24rpx;
					color: #888888;
				}
			}

			.box_msg {
				margin: 50rpx auto;
			}

			.box_comment {}
		}
	}
</style>
