<template>
	<view class="contact">
		<u-sticky>
			<u-notice-bar :text="noticeTitle"></u-notice-bar>
		</u-sticky>
		<view class="scroll">
			<!-- 左侧滚动区域 -->
			<scroll-view class="left" scroll-y>
				<view @click="btnColor(index,i.mallId)" :class="active === index ? 'active' : ''"
					v-for="(i,index) in commodityCate" :key="i.mallId">
					{{i.name}}
				</view>
			</scroll-view>
			<!-- 右侧滚动区域 -->
			<scroll-view class="right" scroll-y>
				<view class="rightItem">
					<view class="listItem" v-for="item in commodityList" :key="item.commodityId">
						<view class="list" @click="toShopDetails(item)">
							<image class="cover" :src="item.image"></image>
							<text class="title">{{item.name}}</text>
						</view>
					</view>
					<u-empty v-if="!commodityList.length" mode="data"
						icon="http://cdn.uviewui.com/uview/empty/data.png">
					</u-empty>
				</view>
			</scroll-view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		payTinymallPageMallType_Get,
		payTinymallPageMallCommodity_Get
	} from '@/api/商城模块/商品信息下单.js'
	import {
		systemParamsNoteList_Get,
		systemParamsNotenoticeId_Get
	} from '@/api/SYSTEM/参数字典公告.js'
	export default {
		data() {
			return {
				// 左侧数据
				commodityCate: [],
				// 判断选中哪个高亮哪个
				active: 0,
				// 右侧数据
				commodityList: [],
				img_url: 'http://www.itcast.cn/2018czydz/images/gywmban.jpg',
				isLoading: true,
				noticeTitle: ''
			}
		},
		onLoad() {
			this.getcommodityCate()
			this.getNoticeByNoticeID()
			// uni.$emit('refresh')
		},
		onPullDownRefresh() {
			//重新发起请求：请求发送成功以后传入一个回调函数，回调函数停止下拉刷新
			this.getcommodityCate()
		},
		methods: {
			// 获取图片分类
			async getcommodityCate() {
				const res = await payTinymallPageMallType_Get()
				this.$ShowToastNone('刷新成功~')
				if (res.data.code === 200) {
					setTimeout(() => {
						uni.stopPullDownRefresh()
					}, 1000)
					this.commodityCate = res.data.data.records
					this.isLoading = false

				} else {
					this.selfMsg(res.data.msg, 'warning')
				}
				// 默认进来获取数据
				this.btnColor(0, this.commodityCate[0].mallId)
			},

			async btnColor(index, id) {

				this.active = index
				// 获取选中分类的右侧数据
				const res = await payTinymallPageMallCommodity_Get({
					mallId: id
				})
				if (res.data.code === 200) {
					this.commodityList = res.data.data.records
				} else {
					this.selfMsg(res.data.msg, 'warning')
				}
			},
			toShopDetails(item) {
				console.log(item);
				uni.navigateTo({
					url: '/subpages_shop/shopDetail/shopDetail?shopDetail=' + JSON.stringify(item)
				})
			},
			// 预览图片
			btnImg(curt) {
				uni.showToast({
					title: '图片不可预览，图片数据已失效'
				})
				// uni.previewImage({
				// 	// 为当前显示图片的链接/索引值，
				// 	current:curt,
				// 	// 需要预览的图片链接列表
				// 	urls:this.img_url,
				// 	// 底部指示器  APP上才能用
				// 	// indicator:"number"
				// })
			},
			async getNoticeByNoticeID() {
				const res = await systemParamsNotenoticeId_Get({
					noticeId: 13
				})
				this.noticeTitle = res.data.data.noticeTitle
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

<style lang="scss">
	page {
		height: 100%;
	}

	.contact {
		height: 100%;

		.scroll {
			height: 100%;
			display: flex;

			// position: absolute;
			.left {
				width: 200rpx;
				height: 100%;
				border-right: 2rpx solid #ffffff;
				background-color: #f0f0f0;

				view {
					height: 120rpx;
					line-height: 120rpx;
					color: #333;
					text-align: center;
					font-size: 30rpx;
					border-top: 2rpx solid #eee;
				}

				.active {
					background: #ffffff;
					color: rgb(42, 183, 149);
				}
			}

			.right {
				flex: 1;
				padding: 20rpx 40rpx;
				background-color: #eeeeee;

				.rightItem {
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;

					.listItem {
						width: 46%;
						text-align: center;
						background-color: #ffffff;
						margin-bottom: 25rpx;
						border-radius: 10rpx;

						.list {
							padding: 20rpx 10rpx;

							.cover {
								width: 180rpx;
								height: 180rpx;
							}

							.title {
								font-size: 26rpx;
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
						}
					}


				}

			}
		}
	}
</style>
