<template>
	<view class="container">
		<view
			style="display: flex; justify-content: space-between; padding-left: 50rpx; padding: 30rpx 40rpx;background-color: #ffffff;">
			请选择收货地址<text class="iconfont icon-dayuhao"></text>
		</view>
		<view class="content">
			<view class="left">
				<view class="name">周卡</view>
				<view class="num">x {{value == 0 ? 1 : value}}</view>
			</view>
			<view class="mid">￥{{price}}</view>
			<view class="right">
				<u-number-box v-model="value" @change="valChange" :min="1" :max="10"></u-number-box>

			</view>
		</view>
		<view class="bot">
			<view class="nextStep">
				<button class="btn" @click="confirmPayOrder">提交订单</button>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderDetail: {},
				value: 1,
				price: 0
			}
		},
		onLoad(opt) {
			this.orderDetail = JSON.parse(opt.orderDetail)
			this.price = this.orderDetail.price
		},
		methods: {
			valChange(e) {
				console.log(e);
				this.price = e.value * this.orderDetail.price

			},

		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.content {
			padding: 40rpx;
			margin: 20rpx 0;
			background-color: #ffffff;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.left {
				.name {
					font-size: 48rpx;
					max-width: 200rpx; // 允许最宽400rpx
					white-space: nowrap; // 不允许换行
					font-weight: bolder;
					color: #60C5BA;
					margin-bottom: 10rpx;
				}

				.num {
					text-align: center;
				}
			}

			.mid {}

			.right {}
		}

		.bot {
			position: fixed;
			bottom: 0;
			right: 0;
			left: 0;
			z-index: 1000;
			background-color: #ffffff;
			padding: 50rpx 20rpx 100rpx;
			align-items: center;

			.nextStep {
				.btn {
					background-color: #60C5BA;
					color: #fff;
					font-weight: bold;
				}
			}

		}
	}
</style>
