<template>
	<view class="container">
		<!-- <view
			style="display: flex; justify-content: space-between; padding-left: 50rpx; padding: 30rpx 40rpx;background-color: #ffffff;">
			请选择收货地址<text class="iconfont icon-dayuhao"></text>
		</view> -->
		<select-address :addressInfo="addressInfo" :wxName="wxUserInfo.name"></select-address>
		<scroll-view scroll-y="true">
			<view class="content" v-for="(item,index) in goods" :key="index">
				<view class="left">
					<view class="name">
						<!-- {{item.commodityName}}- -->{{item.specificationName}}
					</view>
					<view class="num">x {{item.quantity}}</view>
				</view>
				<view class="mid">￥{{parseFloat(item.unitPrice / 100 ).toFixed(2)}}/单价</view>
				<view class="right">
					<u-number-box v-model="value" @change="valChange" :min="1" :max="invoryMax"></u-number-box>
				</view>
			</view>
		</scroll-view>
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
				addressInfo: {}
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
			valChange(e) {
				console.log(e);

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
				if (!this.orderParmes.addrId) {
					return this.selfMsg('请先选择收货地址', 'warning')
				}
				this.orderParmes.addrId = 1
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
