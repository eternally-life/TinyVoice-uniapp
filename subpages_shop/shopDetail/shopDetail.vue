<template>
	<view class="container">
		<u-toast ref="uToast"></u-toast>
		<view class="tip" v-if="!shopList.length">商品详情加载中或重进...</view>
		<block v-else>
			<view class="header">
				<!-- <image class="background" :src="shopDetail.image" mode="aspectFill"></image> -->
				<view class="swp">
					<u-swiper :list="shopDetail.imgList.length ? shopDetail.imgList : shopDetail.image"
						@change="e => currentNum = e.current" :autoplay="false" indicatorStyle="right: 20px"
						@click="btnImg()" height="160">
						<view slot="indicator" class="indicator-num">
							<text
								class="indicator-num__text">{{ currentNum + 1 }}/{{ shopDetail.imgList.length }}</text>
						</view>
					</u-swiper>
				</view>
				<view class="top">
					<view class="name">
						<view class="one">
							<view class="left">
								<u-tag text="商品名称"></u-tag>
							</view>
							<view class="tisp">{{shopDetail.name ? shopDetail.name : '无'}}</view>
						</view>
					</view>
					<view class="name">
						<view class="one">
							<view class="left">
								<u-tag text="商品介绍"></u-tag>
							</view>
							<view class="parse_detail">
								<!-- <rich-text :nodes="shopDetail.content"></rich-text> -->
								<!-- <u-parse :content="shopDetail.content ? shopDetail.content : '无'" :tagStyle="style">
								</u-parse> -->
								<u-parse :content="content" :tagStyle="style"></u-parse>
							</view>
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
				<view class="notice" @click="showAgreement">{{noticeData.noticeTitle}}</view>
				<view class="pay">
					<view class="bg">
						<view class="price">
							￥{{parseFloat(price).toFixed(2)}}</view>
						<button class="btn1"
							@click="addShoppingCart(parmesList.commodityId,parmesList.skuId)">加入购物车</button>
						<button class="btn" @click="toDetail(parmesList)">立即购买</button>
					</view>
				</view>
			</view>

		</block>
		<u-modal :show="isAgreement" :title="noticeData.noticeTitle" @confirm="confirmAgreement" confirmText="不再显示"
			cancelText="确定" @cancel="cancelAgreement" showCancelButton cancelColor="#2979ff" confirmColor="#000000"
			buttonReverse>
			<view class="slot-content">
				<rich-text :nodes="noticeData.noticeContent"></rich-text>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import {
		payTinymallGetSku_Get,
		payTinymallCreateOrder_Post,
		shopDetailById_Get
	} from '@/api/商城模块/商品信息下单.js'
	import {
		payTinymallshoppingSave_Post
	} from '@/api/商城模块/购物车测通.js'
	import {
		systemParamsNoteList_Get,
		systemParamsNotenoticeId_Get
	} from '@/api/SYSTEM/参数字典公告.js'
	const graceRichText = require('../../utils/richtext.js');
	export default {
		data() {
			return {
				shopDetail: {},
				shopList: [],
				parmes: [],
				price: 0,
				current: 0,
				parmesList: {},
				isAgreement: false, // 展示协议
				isTrue: false, // 判断用户是否点了协议
				value: 1,
				noticeData: {},
				commodityId: null,
				content: ``,
				style: {
					// 字符串的形式
					// p: 'font-size:32rpx',
					// img: 'width:200rpx;height200rpx;'
				},
				shhopPicList: [
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
				],
				currentNum: 0
			}
		},
		onLoad(opt) {
			this.commodityId = opt.commodityId
			this.getShopDetailById()
			this.getNoticeByNoticeID()
			// this.shopDetail = JSON.parse(decodeURIComponent(opt.shopDetail))
			// this.getSku()
		},
		methods: {
			async getShopDetailById() {
				const res = await shopDetailById_Get({
					commodityId: this.commodityId
				})
				if (res.data.code === 200) {
					this.shopDetail = res.data.commodity
					// 调用richtext.js的处理方法
					this.content = graceRichText.format(res.data.commodity.content);


					this.shopList = res.data.sku
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
					this.price = this.parmesList.price / 100
				}
				console.log(res);
			},
			btnImg(curt) {
				// if (toString(this.shopDetail.imgList[curt]) == undefined) {
				// 	return this.$ShowToastNone('图片不可预览，图片数据已失效')
				// }
				uni.previewImage({
					// 为当前显示图片的链接/索引值，
					current: curt,
					// 需要预览的图片链接列表
					urls: [this.shopDetail.imgList[curt]],
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},

					}
				})
			},
			showAgreement() {
				this.isAgreement = true
			},
			confirmAgreement() { // 不再显示协议的回调
				this.isAgreement = false
				this.isTrue = true
				uni.setStorageSync('isTrue', true)
			},
			cancelAgreement() {
				this.isTrue = true
				this.isAgreement = false
			},
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
				if (this.parmesList.inventory === 0) {
					this.selfMsg('库存一点都不剩了', 'warning')
					return
				}
				let istrue = uni.getStorageSync('isTrue')
				if (!istrue && !this.isTrue) {
					return this.selfMsg('请阅读下单购买协议', 'warning')
				}
				uni.navigateTo({
					url: '/subpages_shop/orderDetail/orderDetail?skuId=' + this.parmesList.skuId +
						'&num=' + this.value
				})
			},
			async addShoppingCart(commodityId, skuId) {
				if (this.parmesList.inventory === 0) {
					this.selfMsg('库存一点都不剩了', 'warning')
					return
				}
				let istrue = uni.getStorageSync('isTrue')
				if (!istrue && !this.isTrue) {
					return this.selfMsg('请阅读下单购买协议', 'warning')
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
			// async getSku() {
			// 	const res = await payTinymallGetSku_Get({
			// 		commodityId: this.commodityId
			// 	})
			// 	if (res.data.code === 200) {
			// 		this.shopList = res.data.data
			// 		let newarr1 = [];
			// 		for (let i = 0; i < this.shopList.length; i++) {
			// 			let temp1 = this.shopList[i]["specification"]
			// 			newarr1.push(temp1);
			// 		}
			// 		this.parmes = newarr1
			// 		this.parmesList = this.shopList[0]
			// 		this.price = this.parmesList.price / 100
			// 	} else {
			// 		this.selfMsg(res.data.msg, 'warning')
			// 	}
			// },
			async getNoticeByNoticeID() {
				const res = await systemParamsNotenoticeId_Get({
					noticeId: 14
				})
				this.noticeData = res.data.data
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
	.data-v-451425b3 {
		image {
			width: 300rpx;
			height: 200rpx;
		}
	}

	.container {
		position: relative;

		.tip {
			font-size: 28rpx;
			color: #aaa;
			width: 100%;
			margin-top: 50rpx;
			text-align: center;
		}

		.header {
			background-color: #ffffff;

			.swp {
				.indicator-num {
					padding: 2px 0;
					background-color: rgba(0, 0, 0, 0.35);
					border-radius: 100px;
					width: 35px;
					@include flex;
					justify-content: center;

					&__text {
						color: #FFFFFF;
						font-size: 12px;
					}
				}
			}

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
						align-items: baseline;

						.left {
							display: flex;
							flex-wrap: nowrap;
							margin: 0 30rpx 20rpx 0;
							width: 150rpx;

							.u-tag-wrapper {
								align-items: center;
							}

						}

						.tisp {
							font-size: 30rpx;
							flex: 1;
							color: rgb(56, 56, 56);
							word-break: break-all;
							text-overflow: ellipsis;
							display: -webkit-box;
							/** 对象作为伸缩盒子模型显示 **/
							-webkit-box-orient: vertical;
							/** 设置或检索伸缩盒对象的子元素的排列方式 **/
							-webkit-line-clamp: 2;
							/** 显示的行数 **/
							overflow: hidden;
							/** 隐藏超出的内容 **/
						}

						.parse_detail {
							padding: 20rpx 0rpx;
							color: #4a4a4a;
							flex: 1;

							text {
								display: inline-block;
							}
						}
					}
				}
			}
		}

		.content {
			position: relative;
			background-color: #fff;
			padding: 40rpx;
			margin: 50rpx 30rpx 260rpx;
			border-radius: 30rpx;
			box-shadow: 10rpx 10rpx 10px #ccc;

			.parmes {
				padding-top: 10rpx;

				.title {
					display: flex;
					flex-wrap: nowrap;
					padding: 20rpx 0;
					width: 200rpx;
				}

				.type {
					.one {
						display: flex;
						align-items: baseline;

						.left {
							padding: 20rpx 20rpx 20rpx 0;


						}
					}

				}
			}
		}

		.bot {
			position: fixed;
			bottom: 0rpx;
			z-index: 99;
			padding-top: 20rpx;
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
