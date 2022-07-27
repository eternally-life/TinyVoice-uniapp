<template>
	<view class="container">
		<u-toast ref="uToast"></u-toast>
		<view class="tip" v-if="!shopList.length">商品详情加载中...</view>
		<block v-else>
			<view class="header">
				<image class="background" :src="shopDetail.image" mode="aspectFill"></image>
				<view class="top">
					<view class="name">
						<view class="one">
							<view class="left">
								<u-tag text="物品名"></u-tag>
							</view>{{shopDetail.name ? shopDetail.name : '无'}}
						</view>
					</view>
					<view class="name">
						<view class="one">
							<view class="left">
								<u-tag text="物品介绍"></u-tag>
							</view>{{shopDetail.content ? shopDetail.content : '无'}}
						</view>
					</view>
				</view>
			</view>
			<view class="content">
				<u-subsection :list="parmes" :current="current" @change="sectionChange"></u-subsection>
				<view class="parmes">
					<view class="title">
						<u-tag text="规格参数" icon="tags-fill" type="warning"></u-tag>
					</view>
					<view class="type">
						<view class="one">
							<view class="left">
								<u-tag text="服务内容"></u-tag>
							</view>{{parmesList.specification ? parmesList.specification : '无'}}
						</view>
						<view class="one">
							<view class="left">
								<u-tag text="单价"></u-tag>
							</view>{{parmesList.price ? parmesList.price / 100 : '0'}}
						</view>
						<view class="one">
							<view class="left">
								<u-tag text="库存"></u-tag>
							</view>{{parmesList.inventory ?parmesList.inventory : '0'}}
						</view>
						<view class="one">
							<view class="left">
								<u-tag text="购买数量"></u-tag>
							</view>
							<u-number-box v-model="value" @change="valChange" :min="1" :max="parmesList.inventory">
							</u-number-box>
						</view>
					</view>
				</view>
			</view>
			<view class="bot">
				<view class="notice"></view>
				<view class="pay">
					<view class="bg">
						<view class="price" @click="toShoppingCart()">
							￥{{parseFloat(price).toFixed(2)}}</view>
						<button class="btn1"
							@click="addShoppingCart(parmesList.commodityId,parmesList.skuId)">加入购物车</button>
						<button class="btn" @click="toDetail(parmesList)">立即购买</button>
					</view>
				</view>
			</view>

		</block>
	</view>
</template>

<script>
	import {
		payTinymallGetSku_Get,
		payTinymallCreateOrder_Post,

	} from '@/api/商城模块/商品信息下单.js'
	import {
		payTinymallshoppingSave_Post
	} from '@/api/商城模块/购物车测通.js'
	export default {
		data() {
			return {
				shopDetail: {},
				shopList: [],
				parmes: [],
				price: 0,
				current: 0,
				parmesList: {},
				isLoading: true,
				value: 1
			}
		},
		onLoad(opt) {
			this.shopDetail = JSON.parse(opt.shopDetail)
			this.getSku()
			uni.showLoading({
				title: '正在加载'
			})
		},
		methods: {
			valChange(e) {
				this.value = e.value
				this.price = e.value * (this.parmesList.price / 100)
			},
			sectionChange(index) {
				this.current = index
				this.value = 1
				this.parmesList = this.shopList[index]
				this.price = this.parmesList.price / 100
			},
			toDetail(parmesList) {
				uni.navigateTo({
					url: '/subpages_shop/orderDetail/orderDetail?orderDetail=' + JSON.stringify(parmesList) +
						'&num=' + this.value
				})
			},
			toShoppingCart() {
				uni.navigateTo({
					url: '/subpages_shop/ShoppingCart/ShoppingCart'
				})
			},
			async addShoppingCart(commodityId, skuId) {
				if (this.parmesList.inventory === 0) {
					this.selfMsg('库存一点都不剩了', 'warning')
					return
				}
				const res = await payTinymallshoppingSave_Post({
					quantity: this.value,
					commodityId: commodityId,
					skuId: skuId,
				})
				console.log(res);
				if (res.data.code === 200) {

					this.selfMsg('添加成功，购物车等亲~', 'success')
				} else {
					this.selfMsg(res.data.msg, 'warning')
				}

			},
			async getSku() {
				const res = await payTinymallGetSku_Get({
					commodityId: this.shopDetail.commodityId
				})
				if (res.data.code === 200) {
					this.shopList = res.data.data
					// let newarr = [];
					let newarr1 = [];
					for (let i = 0; i < this.shopList.length; i++) {
						// let temp = {
						// 	"name": this.shopList[i]["specification"]
						// };
						// newarr.push(temp);
						let temp1 = this.shopList[i]["specification"]
						newarr1.push(temp1);
					}
					this.parmes = newarr1
					this.parmesList = this.shopList[0]
					this.isLoading = false
					this.price = this.parmesList.price / 100
					uni.hideLoading()
				} else {
					this.selfMsg(res.data.msg, 'warning')
				}
				console.log(res);
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

<style scoped lang="scss">
	.container {
		.tip {
			font-size: 28rpx;
			color: #aaa;
			width: 100%;
			margin-top: 50rpx;
			text-align: center;
		}

		.header {
			background-color: #ffffff;

			.background {
				width: 100%;
				height: 350rpx;
			}

			.top {
				padding: 20rpx;

				.name {
					padding: 10rpx 0;

					.one {
						display: flex;

						.left {
							padding: 0 20rpx 20rpx 0;
						}
					}
				}
			}
		}

		.content {
			position: relative;
			background-color: #fff;
			padding: 40rpx;
			margin: 50rpx 30rpx;
			border-radius: 30rpx;
			box-shadow: 10rpx 10rpx 10px #ccc;

			.parmes {
				padding-top: 10rpx;

				.title {
					padding: 20rpx 0;
					width: 200rpx;
				}

				.type {
					.one {
						display: flex;

						.left {
							padding: 0 20rpx 20rpx 0;
						}
					}

				}
			}
		}

		.bot {
			position: absolute;
			bottom: 0rpx;
			left: 0;
			width: 100%;
			background-color: #fff;

			.notice {
				font-size: 25rpx;
				padding: 0 50rpx 10rpx;
				color: #60c5ba;
			}

			.pay {
				padding: 0 20rpx 90rpx;

				.bg {
					position: relative;
					border-radius: 50rpx;
					background-color: #fff;
					height: 100rpx;

					.price {
						position: absolute;
						font-size: 38rpx;
						color: #60c5ba;
						height: 100rpx;
						line-height: 100rpx;
						margin-left: 20rpx;
					}

					.btn1 {
						position: absolute;
						right: 250rpx;
						font-size: 35rpx;
						border-radius: 50rpx 0 0 50rpx;
						background-color: orange;
						color: #fff;
						width: 250rpx;
						height: 100rpx;
						line-height: 100rpx;
					}

					.btn {
						position: absolute;
						right: 0;
						font-size: 35rpx;
						border-radius: 0 50rpx 50rpx 0;
						background-color: #60c5ba;
						color: #fff;
						width: 250rpx;
						height: 100rpx;
						line-height: 100rpx;
					}
				}
			}
		}
	}
</style>
