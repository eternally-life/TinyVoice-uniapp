<template>
	<view>
		<view class="empty" v-if="!goods.length">
			<u-empty mode="car" icon="http://cdn.uviewui.com/uview/empty/car.png" text="购物车竟然是空的">
			</u-empty>

		</view>
		<view v-else>
			<scroll-view scroll-y="true">
				<view class="goods-detail" v-for="(item,index) in goods" :key="index">
					<view class="detail-left">
						<view class="goods-left">
							<checkbox-group @change="selected(item)">
								<label>
									<checkbox class="selected" color="#555555" :checked="checked" /><text></text>
								</label>
							</checkbox-group>
						</view>
						<view class="size">
							<text style="font-size: 25rpx;">{{item.commodityName}}-{{item.specificationName}}</text>
							<text class="goods-price">￥{{parseFloat(item.unitPrice / 100 ).toFixed(2)}}/单价</text>
						</view>
					</view>
					<view class="detail-right">
						<!-- <u-number-box v-model="value" @change="valChange(item)" @click="reduce(item)" :min="1"
							:max="10"></u-number-box> -->
						<text class="subtract" @click="reduce(item)">-</text>
						<text class="num">{{item.quantity}}</text>
						<text @click="add(item)" class="add">+</text>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="end">
			<view class="end-left">
				<checkbox-group @change="selectgoods()">
					<label>
						<checkbox :checked="allchecked" />全选
					</label>
				</checkbox-group>
				<view>
					总计：<text style="color: #f00;font-weight: bold;">￥ {{parseFloat(totalPrice).toFixed(2)}}</text>
				</view>
			</view>
			<view class="end-right" @click="allPay(totalNum)">
				结算({{totalNum}})
			</view>


		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		payTinymallshoppingDeleteAll_Delete,
		payTinymallshoppingUpdate_Put,
		payTinymallshoppingPage_Get
	} from '@/api/商城模块/购物车测通.js'
	import {
		payTinymallCreateOrder_Post
	} from '@/api/商城模块/商品信息下单.js'
	export default {
		data() {
			return {
				value: 1,
				show: true,
				allchecked: true,
				checked: true,
				goods: [],
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
					},
				},
				mapGoods: []
			}
		},
		onLoad() {
			this.getShoppingCartData()
		},
		methods: {
			async getShoppingCartData() {
				const res = await payTinymallshoppingPage_Get()
				if (res.data.code === 200) {
					this.goods = res.data.data.records
				} else {
					this.selfMsg(res.data.msg, 'warning')
				}
			},
			async allDelShoppingCart() {
				const res = await payTinymallshoppingDeleteAll_Delete()
				if (res.data.code === 200) {
					this.selfMsg('清空成功', 'success')
				} else {
					this.selfMsg(res.data.msg, 'warning')
				}
				console.log(res);
			},
			async allPay(num) {
				console.log(num);
				if (num == 0) {
					return this.selfMsg('未选择商品', 'warning')
				}
				this.mapGoods = []
				this.orderParmes.orderData.commodityIds = []
				this.orderParmes.orderData.skuIdAndQuantity = {}
				this.goods.map((item) => {
					if (item.flag === true) {
						this.mapGoods.push({
							'commodityIds': item.commodityId,
							'skuId': item.skuId,
							'quantity': item.quantity
						})
					}
				})
				this.orderParmes.addrId = 1
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
			selected(item) {
				item.flag = !item.flag
				if (!item.flag) {
					this.allchecked = false

				} else {
					const a = this.goods.forEach((item) => {
						return item.flag === true
					})
					if (a) {
						this.allchecked = true
					} else {
						this.allchecked = false
					}
				}
			},
			selectgoods() {
				this.allchecked = !this.allchecked
				if (this.allchecked) {
					this.goods.map(item => {
						this.checked = true
						item.flag = true
					})
				} else {
					this.checked = false
					this.goods.map(item => {
						item.flag = false
					})
				}
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
			selfMsg(msg, mod) {
				this.$refs.uToast.show({
					type: mod,
					message: msg
				})
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
		}
	}
</script>

<style lang="scss">
	.goods {
		line-height: 80rpx;
		background-color: #FFFFFF;

		&-detail {
			display: flex;
			padding: 30rpx 15rpx 30rpx 30rpx;
			background-color: #fff;
			justify-content: space-between;
			border-bottom: 5rpx solid #F1F1F1;
			align-items: center;
			margin-bottom: 10rpx;

			.detail-left {
				display: flex;

				.goods-left {
					display: flex;
					align-items: center;
				}
			}

			.size {
				display: flex;
				justify-content: space-around;
				flex-direction: column;
				margin-left: 30rpx;

				.goods-price {
					font-size: 25rpx;
					color: #F44545;
					padding-top: 10rpx;
				}
			}

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
	}

	.empty {

		position: relative;
		top: 220rpx;
		text-align: center;
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.end {
		width: 100%;
		height: 90rpx;
		background-color: #fff;
		position: fixed;
		bottom: 100rpx;
		left: 0;
		display: flex;
		align-items: center;

		&-left {
			width: 70%;
			display: flex;
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
			background-color: #F44545;
			text-align: center;
			color: #fff;
		}
	}
</style>
