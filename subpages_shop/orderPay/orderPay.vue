<template>
	<view class="container">

		<view class="tip" v-if="!goods.length">订单加载中...</view>
		<block v-else>
			<select-address :addressInfo="addressInfo" :wxPhone="wxUserInfo.phonenumber" :MultipleOrder="MultipleOrder">
			</select-address>
			<scroll-view scroll-y="true">
				<view class="content" v-for="(item,index) in goods" :key="index">
					<view class="left">
						<view class="name">
							{{item.commodityName}}-{{item.specificationName}}
						</view>
						<view class="num">x {{item.quantity}}</view>
					</view>
					<view class="mid">￥{{parseFloat(item.unitPrice / 100 ).toFixed(2)}} / 件</view>
					<view class="detail-right">
						<text class="subtract" @click="reduce(item)">-</text>
						<text class="num">{{item.quantity}}</text>
						<text @click="add(item)" class="add">+</text>
					</view>
				</view>
			</scroll-view>

			<view class="end">
				<view class="end-left">
					<view class="" style="color: #333;">
					</view>
					<view style="color: #000;font-weight: bold;">
						共 {{totalNum}} 件 合计:<text style="color: #f00;">￥</text> <text
							style="color: #f00;font-size: 55rpx;">
							{{parseFloat(totalPrice).toFixed(2)}}</text>
					</view>
				</view>
				<view class="end-right" @click="$u.throttle(confirmPayOrder,500)">
					提交订单
				</view>
			</view>
		</block>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import selectAddress from '@/components/selectAddress/selectAddress.vue'
	import {
		payTinymallCreateOrder_Post,
	} from '@/api/商城模块/商品信息下单.js'
	import {
		payTinymallshoppingPage_Get,
	} from '@/api/商城模块/购物车测通.js'
	import {
		systemSysaddrById_Get
	} from '@/api/SYSTEM/收货地址.js';
	export default {
		components: {
			"select-address": selectAddress
		},
		data() {
			return {
				value: 1,
				price: 0,
				invoryMax: 10,
				MultipleOrder: true,
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
				mapGoods: [],
				goods: [],
				addrId: '',
				addressInfo: {},
				wxUserInfo: {}
			}
		},
		computed: {
			totalNum() {
				let totalNum = 0;
				this.goods.map(item => {
					item.flag ? totalNum += item.quantity : totalNum += 0
				})
				return totalNum
			},
			totalPrice() {
				let totalPrice = 0;
				this.goods.map(item => {
					item.flag ? totalPrice += item.quantity * item.unitPrice : totalPrice += 0
				})
				return totalPrice / 100
			}
		},
		onLoad(opt) {
			this.addrId = opt.addrId
			this.getShoppingCartData()
			this.wxUserInfo = getApp().globalData.wxUserInfo
			console.log(opt);
			this.getAddressIdData()
		},
		methods: {
			getAddressIdData() { // 根据address页面传过来的地址ID 获取数据
				if (!this.addrId) return
				console.log('111');
				systemSysaddrById_Get({
					sysAddrId: this.addrId
				}).then(res => {
					this.addressInfo = res.data.data
				})
			},
			reduce(item) {
				let num = item.quantity
				if (num > 1) {
					num -= 1
				} else if (num = 1) {
					this.selfMsg("该宝贝不能减少了哟~", 'warning')
				}
				item.quantity = num
			},
			add(item) {
				let num = item.quantity
				item.quantity = num + 1

			},
			async getShoppingCartData() {
				this.goods = []
				const res = await payTinymallshoppingPage_Get({
					pageSize: 100
				})
				if (res.data.code === 200) {
					this.goods = res.data.data.records
				} else {
					this.selfMsg(res.data.msg, 'warning')
				}
			},
			async confirmPayOrder() {
				this.mapGoods = []
				this.orderParmes.orderData.commodityIds = []
				this.orderParmes.orderData.skuIdAndQuantity = {}
				this.orderParmes.addrId = this.addrId
				if (!this.orderParmes.addrId) {
					return this.selfMsg('请先选择收货地址', 'warning')
				}
				this.goods.map((item) => {
					if (item.flag === true) {
						this.mapGoods.push({
							'commodityIds': item.commodityId,
							'skuId': item.skuId,
							'quantity': item.quantity
						})
					}
				})

				// 从对象数组里取出某个值生成新的数组方法 ：
				//第一种方法 如果相同的值只会输出一个
				// const newArr = this.mapGoods.reduce((pre, cur) => Array.from(new Set([...pre.commodityIds] || pre,...cur.commodityIds)))
				// console.log(newArr);
				/**第二种方法 相同的值都会输出
				let arr1 = this.mapGoods.map(item => item.commodityIds).join(",")
				console.log(arr1);*/
				let arr5 = []
				arr5 = this.mapGoods.map(x => {
					return x.commodityIds
				})
				console.log(arr5);
				this.orderParmes.orderData.commodityIds = arr5
				let obj = {}
				this.mapGoods.forEach(item => {
					obj[item.skuId] = item.quantity
				})
				this.orderParmes.orderData.skuIdAndQuantity = obj
				const res = await payTinymallCreateOrder_Post(this.orderParmes)
				if (res.data.code === 200) {
					this.wxPay(res)
				} else {
					this.selfMsg(res.data.msg, 'warning')
				}
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
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/shop/shop'
							})
						}, 1000)
					},
					fail: res => {
						this.selfMsg('可在我的订单重新支付', 'error')
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
		.tip {
			font-size: 28rpx;
			color: #aaa;
			width: 100%;
			margin-top: 50rpx;
			text-align: center;
		}

		.content {
			padding: 20rpx 40rpx;
			margin: 20rpx 0;
			background-color: #ffffff;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.left {
				.name {
					max-width: 200rpx; // 允许最宽400rpx
					font-weight: bolder;
					color: #60C5BA;
					margin-bottom: 10rpx;

					font-size: 26rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					/*设置对其模式*/
					-webkit-line-clamp: 2;
				}

				.num {
					text-align: center;
				}
			}

			.mid {}

			.detail-right {
				text {
					width: 50rpx;
					line-height: 50rpx;
					text-align: center;
					display: inline-block;
					background-color: #F7F7F7;
					margin-right: 10rpx;
				}

				.add {
					color: #FA4305;
					border-radius: 10rpx 30rpx 30rpx 10rpx;
					margin-right: 20rpx;
				}

				.subtract {
					border-radius: 30rpx 10rpx 10rpx 30rpx;
				}
			}
		}

		.bot {
			position: fixed;
			bottom: 0;
			right: 0;
			left: 0;
			z-index: 1000;
			background-color: #ffffff;
			padding: 50rpx 20rpx 60rpx;
			align-items: center;

			.nextStep {
				.btn {
					background-color: #60C5BA;
					color: #fff;
					font-weight: bold;
				}
			}

		}

		.end {
			width: 100%;
			height: 100rpx;
			background-color: #fff;
			position: fixed;
			bottom: 0rpx;
			left: 0;
			right: 0;
			padding: 20rpx 0rpx 100rpx;
			display: flex;
			align-items: baseline;

			&-left {
				width: 70%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 30rpx;

				.end-flex {
					display: flex;
					align-items: center;
				}
			}

			&-right {
				width: 30%;
				line-height: 90rpx;
				background-color: #60C5BA;
				text-align: center;
				color: #fff;
			}
		}
	}
</style>
