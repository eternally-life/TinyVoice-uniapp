<template>
	<view class="container">
		<view class="nav">
			<u-sticky bgColor="#fff">
				<u-tabs :list="orderNav" @click="btnNav" :scrollable="false" :current="orderCurrent"
					lineColor="#5db4ab"></u-tabs>
			</u-sticky>
		</view>
		<view class="order">
			<u-empty v-if="!orderList.length" mode="order" icon="http://cdn.uviewui.com/uview/empty/order.png">
			</u-empty>
			<view class="all" v-else>
				<scroll-view scroll-y="true" enable-flex class="scrollView" @scrolltolower="handleTolower()"
					style="height: calc(100vh - 90rpx);" refresher-enabled :refresher-triggered="isRefresh"
					@refresherrefresh="handleRefresh">
					<view class="orderItem" v-for="(item,index) in orderList" :key="index">
						<view class="top">
							<view class="left">
								<view class="title">微音店铺</view>
								<view class="wxPayNumber">
									订单编号：{{item.orderId == null ? '未付款' : item.orderId}}
								</view>
							</view>
							<view class="orderStatus">
								{{item.status == '0' ? '已退款' : item.status == '1' ? '待付款' : item.status == '2' ? '已付款' : item.status == '3' ? '待配送' : item.status == '4' ? '配送中' : item.status == '5' ? '已完成' : '退款' }}
							</view>
						</view>
						<view class="mid" v-for="(i,idx) in item.orderDataList" :key="idx">
							<image :src="i.image" mode=""></image>
							<view class="center">
								<text class="name">{{i.commodityName}}
								</text>
								<text class="desc">{{i.content}}</text>
							</view>
							<view class="right">
								<text class="price">￥{{i.totalPrice/100}}</text>
								<text class="num">共{{i.quantity}}件</text>
							</view>
						</view>
						<view class="bot">
							<u-collapse :border="false">
								<u-collapse-item title="其他信息" name="Docs guide" align="right">
									<view class="bottom">
										<view class="left">
											<view class="remak">备注：{{item.remark == '' ? '用户无备注' : item.remark}}
											</view>
											<view class="time">
												下单时间：{{$u.timeFormat(item.createTime, 'mm月dd日-hh点MM分')}}</view>
										</view>
										<view class="right">
											<u-tag text="付款" size="large" v-if="item.status == 1"
												@click="rePayMall(item.orderId)">
											</u-tag>
											<u-tag text="退款" size="large" v-if="item.status == 2" type="success"
												@click="refundMall(item.orderId)">
											</u-tag>
											<u-tag text="售后" size="large" v-if="orderCurrent == 4" type="success">
											</u-tag>
										</view>
									</view>
								</u-collapse-item>
							</u-collapse>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		payTinymallPageOrder_Get,
		payTinymallReloadPay_Get,
		payTinymallRefund_Get
	} from '@/api/商城模块/商品信息下单.js'
	export default {
		data() {
			return {
				orderList: [],
				pgSize: 10,
				status: "",
				orderCurrent: 0,
				orderNav: [{
					name: '全部',
				}, {
					name: '待付款',
				}, {
					name: '已付款'
				}, {
					name: '已完成'
				}, {
					name: '售后'
				}]
			}
		},
		onLoad() {
			this.getShopOrder()
		},
		methods: {
			btnNav(item) {
				console.log(item);
				this.orderCurrent = item.index
				if (item.index == 0) {
					this.status = ""
					this.getShopOrder()
				} else if (item.index == 1) {
					this.status = item.index
					this.getShopOrder()
				} else if (item.index == 2) {
					this.status = item.index
					this.getShopOrder()
				} else if (item.index == 3) {
					this.status = 4
					this.getShopOrder()
				} else {
					this.status = 6
					this.getShopOrder()
				}
			},
			async rePayMall(id) {
				const res = await payTinymallReloadPay_Get({
					tinyMallOrderId: id
				})
				console.log(res);
				if (res.data.code === 200) {
					this.wxPay(res)
				} else {
					this.selfMsg(res.data.msg, 'warning')
				}
			},
			async refundMall(id) {
				const res = await payTinymallRefund_Get({
					tinyMallOrderId: id
				})
				console.log(res);
				if (res.data.code === 200) {
					this.selfMsg('申请成功，注意退款到账通知', 'success')
					this.pgSize = 10
					this.getShopOrder()
				} else {
					this.selfMsg('退款失败，请联系客服', 'error')
				}
			},
			async getShopOrder() {
				this.orderList = []
				const res = await payTinymallPageOrder_Get({
					screenTime: 365,
					pageSize: this.pgSize,
					status: this.status,
				})
				if (res.data.code === 200) {
					this.orderList = res.data.data.records
				} else {
					this.selfMsg(res.data.msg, 'warning')
				}
				console.log(res);
			},
			// 自定义上拉加载
			async handleTolower() {
				if (this.orderList.length) { // 订单有数据才允许执行加载
					let len = this.orderList.length
					console.log(len);
					this.pgSize = this.orderList.length + 5
					const num = 1
					this.getShopOrder()(num)
				}
			},
			// 下拉刷新
			handleRefresh() {
				// 在使用前要先在scroll-view标签开启自定义下拉刷新refresher-enabled
				uni.showLoading({
					title: '正在刷新'
				})
				this.pgSize = 10
				setTimeout(() => {
					this.getShopOrder()()
					uni.hideLoading()
					this.$ShowToastNone('刷新成功~')
				}, 1000)
				this.isRefresh = true
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
		.order {
			.all {
				.orderItem {
					background-color: #fff;
					padding: 40rpx 30rpx 0rpx;
					margin: 50rpx 30rpx;
					border-radius: 30rpx;
					box-shadow: 10rpx 10rpx 10px #ccc;

					.top {
						display: flex;
						color: #99999f;
						padding-bottom: 30rpx;
						align-items: center;
						justify-content: space-between;

						.left {
							.title {
								font-weight: bold;
								color: #222222;
								font-size: 38rpx;
							}

							.wxPayNumber {
								font-size: 20rpx;
							}
						}
					}

					.mid {
						display: flex;
						justify-content: space-between;
						align-items: center;
						color: #7d7d7d;
						margin-bottom: 20rpx;

						image {
							width: 100rpx;
							height: 100rpx;
							border-radius: 10rpx;
						}

						.center {
							display: flex;
							flex-direction: column;
							padding: 0 20rpx;

							.name {
								padding-bottom: 20rpx;
								color: #707070;
								max-width: 400rpx;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
								/*省略号代替*/

							}

							.desc {
								font-size: 24rpx;
								color: #8e8e8e;
							}
						}

						.right {
							display: flex;
							flex-direction: column;
							align-items: center;

							.price {
								color: #707070;
							}

							.num {
								color: #8e8e8e;
								font-size: 22rpx;
							}
						}
					}

					.bot {
						.u-cell__body {
							padding: 30rpx 0;
						}

						.bottom {
							display: flex;
							align-items: center;
							justify-content: space-between;

							.left {
								.remak {
									color: #9b9b9b;
									font-size: 26rpx;
									max-width: 350rpx;
									overflow: hidden;
									text-overflow: ellipsis;
									display: -webkit-box;
									-webkit-box-orient: vertical;
									/*设置对其模式*/
									-webkit-line-clamp: 2;
								}

								.time {
									color: #9b9b9b;
									font-size: 26rpx;
								}
							}

							.right {
								.u-tag-wrapper {
									margin-bottom: 20rpx;
								}

								.u-tag {
									height: 50rpx;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
