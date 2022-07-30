<template>
	<view class="container">
		<select-address :addressInfo="addressInfo" :wxPhone="wxUserInfo.phonenumber" :singleOrder="singleOrder"
			:skuId="skuId">
		</select-address>
		<view class="content">
			<view class="left">
				<view class="name">{{orderDetail.specification}}</view>
				<view class="num">x {{value == 0 ? 1 : value}}</view>
			</view>
			<view class="mid">￥{{price ? parseFloat(price).toFixed(2) : parseFloat(orderDetail.price / 100).toFixed(2)}}
			</view>
			<view class="right">
				<u-number-box v-model="value" @change="valChange" :min="1" :max="invoryMax"></u-number-box>

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
	import selectAddress from '@/components/selectAddress/selectAddress.vue'
	import {
		payTinymallCreateOrder_Post,
		payskuId_Get
	} from '@/api/商城模块/商品信息下单.js'
	import {
		systemSysaddrById_Get
	} from '@/api/SYSTEM/收货地址.js';
	export default {
		components: {
			"select-address": selectAddress
		},
		data() {
			return {
				orderDetail: {},
				value: 1,
				price: 0,
				invoryMax: 10,
				singleOrder: true,
				skuId: null,
				orderParmes: {
					phonenumber: null,
					/** 联系方式=电话   string required: */
					addrId: null,
					/** 地址ID   integer required: */
					/** 订单数据   object required: */
					orderData: {
						commodityIds: [

						],
						skuIdAndQuantity: {

						}
					}
				},
				addressInfo: {},
				wxUserInfo: {}
			}
		},
		onLoad(opt) {
			this.skuId = opt.skuId
			this.getSkuIdPames()
			this.addrId = opt.addrId
			this.value = opt.num
			this.invoryMax = this.orderDetail.inventory
			this.wxUserInfo = getApp().globalData.wxUserInfo
			this.getAddressIdData()
		},
		methods: {
			async getSkuIdPames() {
				const res = await payskuId_Get({
					skuId: this.skuId
				})
				this.orderDetail = res.data.data
				this.price = this.orderDetail.price / 100 * this.value
			},
			getAddressIdData() { // 根据页面传过来的地址ID 获取数据
				if (!this.addrId) return
				console.log('111');
				systemSysaddrById_Get({
					sysAddrId: this.addrId
				}).then(res => {
					this.addressInfo = res.data.data
				})
			},
			valChange(e) {
				console.log(e);
				this.price = e.value * (this.orderDetail.price / 100)

			},
			async confirmPayOrder() {
				this.orderParmes.addrId = this.addrId
				if (!this.orderParmes.addrId) {
					return this.selfMsg('请先选择收货地址', 'warning')
				}
				this.orderParmes.orderData.commodityIds = [this.orderDetail.commodityId]
				// Object.assign(this.orderParmes.orderData.skuIdAndQuantity, this.orderDetail.skuId, this.orderDetail
				// 	.inventory)
				let obj = {}
				let key = this.orderDetail.skuId

				let value = this.value
				obj[key] = value
				this.orderParmes.orderData.skuIdAndQuantity = obj
				const res = await payTinymallCreateOrder_Post(this.orderParmes)
				if (res.data.code === 200) {
					this.wxPay(res)
				} else {
					this.selfMsg(res.data.msg, 'warning')
				}
				console.log(res);
			},
			wxPay(res) { // 微信支付
				uni.requestPayment({
					timeStamp: res.data.data.timeStamp,
					nonceStr: res.data.data.nonceStr,
					appId: res.data.data.appId,
					package: res.data.data.package,
					signType: 'RSA',
					paySign: res.data.data.paySign,
					success: res => {
						this.selfMsg('支付成功！', 'success')
					},
					fail: res => {
						this.selfMsg('支付失败', 'error')
					}
				})

			},
			selfMsg(msg, mod) {
				this.$refs.uToast.show({
					type: mod,
					message: msg
				})
			}
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
