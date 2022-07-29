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

					</view>
				</scroll-view>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		payTinymallPageOrder_Get
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
					name: '待发货'
				}, {
					name: '待收货'
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
			},
			async getShopOrder() {
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
				background-color: #fff;
				padding: 40rpx 30rpx 0rpx;
				margin: 50rpx 30rpx;
				border-radius: 30rpx;
				box-shadow: 10rpx 10rpx 10px #ccc;
			}
		}
	}
</style>
