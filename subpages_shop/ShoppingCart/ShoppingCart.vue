<template>
	<view class="container">
		<view class="header" :style="{ 'height' : navHeight + 'px','padding-top': statusBarHeight + 'rpx' }">
			<view class="goBack" @tap="handleGoBack">
				<text class="iconfont icon-fanhui"></text>
			</view>
			<view class="isRead" @click="allDelShoppingCart" v-if="goods.length">清空购物车</view>
			<view class="title">购物车</view>
		</view>
		<view class="empty" v-if="!goods.length">
			<u-empty mode="car" icon="http://cdn.uviewui.com/uview/empty/car.png" text="购物车竟然是空的">
			</u-empty>
		</view>
		<view class="goods" v-else>
			<scroll-view scroll-y="true">
				<view class="goods-detail" v-for="(item,index) in goods" :key="index"
					@longpress="longTap(item.shoppingId)">
					<view class="detail-left">
						<view class="goods-left">
							<checkbox-group @change="selected(item)">
								<label>
									<checkbox class="selected" :checked="checked" /><text></text>
								</label>
							</checkbox-group>
						</view>
						<view class="size">
							<text style="font-size: 25rpx;">{{item.commodityName}}-{{item.specificationName}}</text>
							<text class="goods-price">￥{{parseFloat(item.unitPrice / 100 ).toFixed(2)}}/单价</text>
						</view>
					</view>
					<view class="detail-right">
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
				<view class="del">
					<u-tag text="删除" size="large" type="error" @click="delByShopping(totalNum)"></u-tag>
				</view>
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
		payTinymallshoppingPage_Get,
		payTinymallshoppingDelete_Delete
	} from '@/api/商城模块/购物车测通.js'
	import {
		payTinymallCreateOrder_Post
	} from '@/api/商城模块/商品信息下单.js'
	export default {
		data() {
			return {
				value: 1,
				statusBarHeight: '',
				navHeight: '',
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
				mapGoods: [],
				delGoods: []
			}
		},
		onLoad() {
			this.getShoppingCartData()
			let {
				statusBarHeight,
				system
			} = uni.getSystemInfoSync()
			this.statusBarHeight = statusBarHeight
			this.navHeight = statusBarHeight + (system.indexOf('iOS') > -1 ? 44 : 48)
		},
		methods: {
			delByShopping(num) {
				uni.showModal({
					title: '是否删除选中商品？',
					confirmColor: '#0099ff',
					cancelColor: '#000000',
					success: async (res) => {
						if (res.confirm) {
							if (num == 0) {
								return this.selfMsg('请选择删除的商品', 'warning')
							}
							this.delGoods = []
							this.goods.map((item) => {
								if (item.flag === true) {
									this.delGoods.push({
										'shoppingId': item.shoppingId
									})
								}
							})
							let arr = []
							arr = this.delGoods.map(x => {
								return x.shoppingId
							})
							console.log(arr);
							const result = await payTinymallshoppingDelete_Delete(arr)
							if (result.data.code === 200) {
								this.getShoppingCartData()
								this.selfMsg('删除成功', 'success')
							}
						}
					}
				})
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
			handleGoBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			longTap(id) {
				console.log("长按触发事件?", id)
				uni.showModal({
					title: '是否删除此项商品？',
					confirmColor: '#0099ff',
					cancelColor: '#000000',
					success: async (res) => {
						if (res.confirm) {
							let deleteByIds = []
							deleteByIds.push(id)
							const result = await payTinymallshoppingDelete_Delete(deleteByIds)
							// console.log(result, id);
							if (result.data.code === 200) {
								this.getShoppingCartData()
								this.selfMsg('删除成功', 'success')
							}
						}
					}
				})
			},
			allDelShoppingCart() {
				uni.showModal({
					title: '是否全部清空购物车？',
					confirmColor: '#0099ff',
					cancelColor: '#000000',
					success: async (res) => {
						if (res.confirm) {
							const result = await payTinymallshoppingDeleteAll_Delete()
							if (result.data.code === 200) {
								this.getShoppingCartData()
								this.selfMsg('清空成功', 'success')
							}
						}
					}
				})
			},
			allPay(num) {
				// console.log(num);
				if (num == 0) {
					return this.selfMsg('未选择商品', 'warning')
				}
				uni.navigateTo({
					url: '/subpages_shop/orderPay/orderPay'
				})

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
						this.selfMsg('可在我的订单重新支付', 'error')
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
			async reduce(item) {
				let num = item.quantity
				if (num > 1) {
					num -= 1
				} else if (num = 1) {
					this.selfMsg("该宝贝不能减少了哟~", 'warning')
				}
				item.quantity = num
				// const res = await payTinymallshoppingUpdate_Put({
				// 	shoppingId: item.shoppingId,
				// 	quantity: item.quantity,
				// 	commodityId: item.commodityId,
				// 	skuId: item.skuId,
				// })
				// console.log(res);
			},
			async add(item) {
				let num = item.quantity
				item.quantity = num + 1
				// const res = await payTinymallshoppingUpdate_Put({
				// 	shoppingId: item.shoppingId,
				// 	quantity: item.quantity,
				// 	commodityId: item.commodityId,
				// 	skuId: item.skuId,
				// })
				// console.log(res);
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

<style lang="scss" scoped>
	.container {

		radio::before,
		checkbox::before {
			font-family: 'cuIcon';
			content: '√';
			position: absolute;
			color: var(--white) !important;
			top: 50%;
			margin-top: -8px;
			right: 5px;
			font-size: 32rpx;
			line-height: 16px;
			pointer-events: none;
			-webkit-transform: scale(1, 1);
			transform: scale(1, 1);
			transition: all 0.3s ease-in-out 0s;
			z-index: 9;
			transition-duration: 0.3s;
			transition-timing-function: ease-in-out;
			transition-delay: 0s;
			transition-property: all;
		}

		.header {
			position: fixed;
			top: 0;
			right: 0;
			left: 0;
			z-index: 1000;
			background-color: #ffffff;
			display: flex;
			padding-left: 20rpx;
			align-items: center;

			.goBack {
				padding: 0 20rpx;

				.iconfong {
					font-size: 22rpx
				}
			}

			.isRead {
				padding-right: 120rpx;
				font-size: 26rpx;
				color: #a9a9a9;
			}

			.title {}
		}

		.goods {
			// line-height: 80rpx;
			// background-color: #FFFFFF;
			padding-top: 230rpx;

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
			height: 100rpx;
			background-color: #fff;
			position: fixed;
			bottom: 0rpx;
			left: 0;
			right: 0;
			padding: 20rpx 0rpx 100rpx;
			display: flex;
			align-items: baseline;


			.del {
				.u-tag-wrapper {
					margin-bottom: 20rpx;
				}

				.u-tag {
					height: 50rpx;
				}

				.u-tag--large.data-v-1481d46d {
					height: 50rpx;
					line-height: 50rpx;
					padding: 0 20rpx;
				}
			}

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
				background-color: #F44545;
				text-align: center;
				color: #fff;
			}
		}
	}
</style>
