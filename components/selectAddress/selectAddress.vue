<template>
	<view class="con">
		<view class="address" @click="toAdress">
			<view class="addressItem" v-if="addressInfo.phonenumber">
				<!-- <i class="iconfont left">&#xe64e;</i> -->
				<view class="center">
					<view class="left">
						<u-avatar :text="addressInfo.name | getNameFirstWord" fontSize="20" randomBgColor></u-avatar>
					</view>
					<view>
						<view class="centerName">
							<text class="name">{{addressInfo.name}}</text>
							<text class="phone">{{addressInfo.phonenumber}}</text>
						</view>
						<view class="centerAddress">
							{{ addressInfo.school }} {{ addressInfo.apartment }}# {{ addressInfo.dormitoryNumber }}
						</view>
					</view>
				</view>
				<text class="iconfont icon-dayuhao right"></text>
			</view>
			<view v-else style="display: flex; justify-content: space-between; padding-left: 50rpx;">
				请选择收货地址<text class="iconfont icon-dayuhao"></text>
			</view>


		</view>
	</view>
</template>

<script>
	export default {
		props: ['addressInfo', "wxPhone", "skuId", "singleOrder", "MultipleOrder"],
		data() {
			return {}
		},
		filters: {
			getNameFirstWord(name) {
				return name.substring(0, 1);
			}
		},
		onLoad() {},
		methods: {
			toAdress() {
				console.log('555');
				if (this.addressInfo.phonenumber) return
				if (this.singleOrder) {
					uni.navigateTo({
						url: '/subpages/receivAddress/receivAddress?openType=1&single=true&skuId=' + this.skuId
					})
				}
				if (this.MultipleOrder) {
					uni.navigateTo({
						url: '/subpages/receivAddress/receivAddress?openType=1&multipte=true'
					})
				}

			},
		}
	}
</script>

<style lang="scss">
	.con {
		.address {
			padding: 30rpx 40rpx;
			// border-radius: 30rpx;
			// margin: 20rpx 30rpx;
			background-color: #ffffff;

			.addressItem {
				display: flex;
				align-items: center;
				position: relative;
				justify-content: space-between;

				.left {
					margin-right: 20rpx;
				}

				.center {
					// margin: 0 25rpx;
					display: flex;
					align-items: center;

					.left {}

					.centerName {
						padding-bottom: 10rpx;

						.name {
							font-weight: bold;
							font-size: 35rpx;
							margin: 0 15rpx 10rpx 0;
						}

						.phone {
							color: #b9b9b9;
							font-size: 26rpx;
						}
					}

					.centerAddress {
						max-width: 400rpx;
						font-size: 28rpx;
					}
				}

				.right {
					position: absolute;
					right: 0;
					width: 80rpx;
					height: 70rpx;
					line-height: 70rpx;
					text-align: center;
					z-index: 99;
				}
			}
		}
	}
</style>
