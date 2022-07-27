<template>
	<view>
		<view class="empty" v-if="show==false">
			<u-empty mode="car" icon="http://cdn.uviewui.com/uview/empty/car.png" text="空空如也的购物车">
			</u-empty>
			<!-- <image
				src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F01%2F82%2F40%2F596fa6dc00bb4_610.jpg&refer=http%3A%2F%2Fpic.51yuansu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1633499781&t=d37222e32213957ddbdd01d62e071309"
				mode="widthFix" style="width: 400rpx;"></image>
			<view class="empty-text">空空如也的购物</view> -->
			<view class="empty-button" @click="goshopping">去选购</view>
		</view>
		<view v-if="show==true">
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
							<text style="font-size: 25rpx;">尺码：{{item.size}}</text>
							<text class="goods-price">￥{{item.price}}/件</text>
						</view>
					</view>
					<view class="detail-right">
						<!-- <u-number-box v-model="value" @change="valChange(item)" @click="reduce(item)" :min="1"
							:max="10"></u-number-box> -->
						<text class="subtract" @click="reduce(item)">-</text>
						<text class="num">{{item.num}}</text>
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
					总计：<text style="color: #f00;font-weight: bold;">￥ {{totalPrice}}</text>
				</view>
			</view>
			<view class="end-right">
				结算({{totalNum}})
			</view>


		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: 1,
				show: true,
				allchecked: true,
				checked: true,
				goods: [{
						size: "女款-M",
						num: 1,
						flag: true,
						price: 149,
						goodsImage: "https://img0.baidu.com/it/u=4158246207,3235707994&fm=26&fmt=auto&gp=0.jpg",
					},
					{
						size: "女款-xs",
						num: 1,
						flag: true,
						price: 219,
						goodsImage: "https://img0.baidu.com/it/u=811765333,1656843554&fm=11&fmt=auto&gp=0.jpg",
					},
					{
						size: "女款-L",
						num: 1,
						flag: true,
						price: 240,
						goodsImage: "https://img1.baidu.com/it/u=233755383,2522308225&fm=26&fmt=auto&gp=0.jpg",
					},
					{
						size: "女款-XXL",
						num: 1,
						flag: true,
						price: 410,
						goodsImage: "https://img0.baidu.com/it/u=3894000947,2570065196&fm=26&fmt=auto&gp=0.jpg",
					},
					{
						size: "女款-XXL",
						num: 1,
						flag: true,
						price: 500,
						goodsImage: "https://img2.baidu.com/it/u=1001625387,3275765924&fm=26&fmt=auto&gp=0.jpg",
					},
				],
			}
		},
<<<<<<< HEAD
=======
		onLoad() {
			this.getShoppingCartData()
		},
>>>>>>> hcy
		methods: {
			goshopping() {
				uni.navigateTo({
					url: '../contact/contact'
				})
			},
			change(e) {
				console.log(e)
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
				let num = item.num
				if (num > 1) {
					num -= 1
				} else if (num = 1) {
					uni.showToast({
						title: "该宝贝不能减少了哟~"
					})
				}


				item.num = num
			},
			add(item) {
				let num = item.num
				item.num = num + 1
			}
		},
		computed: {
			totalNum() {
				let totalNum = 0;
				this.goods.map(item => {
					item.flag ? totalNum += item.num : totalNum += 0
				})
				return totalNum
			},

			totalPrice() {
				let totalPrice = 0;
				this.goods.map(item => {
					item.flag ? totalPrice += item.num * item.price : totalPrice += 0
				})
				return totalPrice
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

		&-text {
			color: #808080;
			margin-bottom: 50rpx;
		}

		&-button {
			width: 300rpx;
			height: 90rpx;
			color: orange;
			border: 1rpx solid orange;
			text-align: center;
			line-height: 90rpx;
			border-radius: 48rpx;
		}
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
