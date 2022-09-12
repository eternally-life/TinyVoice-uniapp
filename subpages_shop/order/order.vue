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
								<view class="title">{{item.addrName}} - {{item.addrPhone}}</view>
								<view class="wxPayNumber">
									订单编号：{{item.orderId == null ? '未付款' : item.orderId}}
								</view>
							</view>
							<view class="orderStatus">
								{{item.status == '0' ? '已退款' : item.status == '1' ? '待付款' : item.status == '2' ? '已付款' : item.status == '3' ? '出库' : item.status == '4' ? '订单完成' : item.status == '5' ? '退款成功' :  item.status == '6' ? '售后中' :'售后完成' }}
							</view>
						</view>
						<view class="mid" v-for="(i,idx) in item.orderDataList" :key="idx"
							:style="item.orderDataList.length == 1 ? '' : 'border-bottom: 1rpx solid #ddd7d9;'">
							<image :src="i.image" mode=""></image>
							<view class="center">
								<text class="name">{{i.commodityName}}
								</text>
								<!-- <text class="desc">
									{{i.content}}
								</text> -->
								<u-parse :content="i.content ? i.content : '无'" class="desc" :tagStyle="style">
								</u-parse>
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
											<view class="remak">备注：{{item.remark == null ? '用户无备注' : item.remark}}
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
											<u-tag text="申请售后" size="large" v-if="item.status == 4" type="success"
												@click="AfterSales()">
											</u-tag>
											<u-tag text="取消售后" size="large" v-if="item.status == 6" type="success"
												@click="CloseAfterSales(item.orderId)">
											</u-tag>
										</view>
									</view>
								</u-collapse-item>
							</u-collapse>
						</view>
						<u-popup :show="showAfterSales" @close="close" @open="open" mode="bottom" :round="10">
							<view class="sales">
								<view class="salesItem">
									申请原因：<u--input placeholder="请输入内容" border="surround" clearable
										v-model="AfterSalesList.reason">
									</u--input>
								</view>
								<view class="salesItem">
									申请需求：<u--input placeholder="请输入内容" border="surround" clearable
										v-model="AfterSalesList.demand">
									</u--input>
								</view>
								<view class="nextStep">
									<button class="btn" @click="cancelAfterSales(item.orderId)">确定申请</button>
								</view>
							</view>
						</u-popup>
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
	import {
		payTinymallafterPayAfter_Post,
		payTinymallafterCloseAfter_Get
	} from '@/api/商城模块/售后测通.js'

	const graceRichText = require('../../utils/richtext.js');
	export default {
		data() {
			return {
				orderList: [],
				pgSize: 10,
				pgNum: 1,
				status: "",
				orderCurrent: 0,
				isRefresh: false, // 标示scroll-view下拉刷新是否被触发
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
				}],
				showAfterSales: false,
				AfterSalesList: {
					reason: "",
					/** 原因   string required: */
					orderId: null,
					/** 订单ID   string required: */
					demand: "",
					/** 需求   string required: */
				},
				style: {
					p: 'font-size:32rpx',
					img: 'width:40%; margin:8rpx 0;'
				},
			}
		},
		onLoad() {
			this.getShopOrder()
		},
		methods: {
			btnNav(item) {
				console.log(item);
				this.orderCurrent = item.index
				this.orderList = []
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
					this.selfMsg(res.data.msg, 'warning')
					// this.selfMsg('退款失败，请联系客服', 'error')
				}
			},
			AfterSales() {
				this.showAfterSales = true
			},
			async cancelAfterSales(id) {
				this.AfterSalesList.orderId = id
				const res = await payTinymallafterPayAfter_Post(this.AfterSalesList)
				if (res.data.code === 200) {
					this.selfMsg("申请成功", 'success')
					this.showAfterSales = false
					this.getShopOrder()
				} else {
					this.selfMsg(res.data.msg, 'warning')
				}
				console.log(res);
			},
			async CloseAfterSales(id) {
				uni.showModal({
					title: '确定取消售后？',
					confirmColor: '#0099ff',
					cancelColor: '#000000',
					success: async (res) => {
						if (res.confirm) {
							const result = await payTinymallafterCloseAfter_Get({
								tinyMallOrderId: id,
							})
							if (result.data.code === 200) {
								this.selfMsg("取消成功", 'success')
								this.getShopOrder()
							} else {
								this.selfMsg(result.data.msg, 'warning')
							}
							console.log(result);
						}
					}
				})

			},
			async getShopOrder(num) {

				const res = await payTinymallPageOrder_Get({
					screenTime: 365,
					pageSize: this.pgSize,
					status: this.status,
				})
				if (res.data.data.total == this.orderList.length) {
					if (num) {
						return this.selfMsg('没有更多了~', 'warning')
					}
				}
				if (res.data.code === 200) {
					this.orderList = res.data.data.records
					uni.hideLoading()
					this.isRefresh = false
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
					this.getShopOrder(num)
				}
			},
			open() {
				// console.log('open');
			},
			close() {
				this.showAfterSales = false
				// console.log('close');
			},
			// 下拉刷新
			handleRefresh() {
				// 在使用前要先在scroll-view标签开启自定义下拉刷新refresher-enabled
				uni.showLoading({
					title: '正在刷新'
				})
				this.pgSize = 10
				setTimeout(() => {
					this.getShopOrder()
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
						this.selfMsg('两小时之内未支付订单无效', 'error')
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
		.sales {
			padding: 40rpx 30rpx 50rpx;
			margin: 40rpx;

			.salesItem {
				display: flex;
				padding-bottom: 20rpx;
			}

			.nextStep {
				padding-top: 20rpx;

				.btn {
					background-color: #60C5BA;
					color: #fff;
					font-weight: bold;
				}
			}
		}

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
						padding: 20rpx 0;

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
							width: 100rpx;

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
