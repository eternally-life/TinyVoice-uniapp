<template>
	<view class="wrap">
		<view class="wrap_input">
			<view class="input">
				<u--input placeholder="快输入Ta的名字或你的名字看看吧!" inputAlign="center" @change="inputChange()" border="bottom"
					vale="userName" v-model="userName"></u--input>
			</view>
			<view class="button">
				<u-button text="查看留言" color="#31b6c3" @click="getMessageContent(userName)"></u-button>
			</view>
		</view>


		<view class="wrap_show" v-if="isShow">
			<view class="show_icon">
				<u-icon name="arrow-down-fill" size="28"></u-icon>
			</view>

			<view v-for="(item,index) in messageList" :key="index">

				<view class="item_list">
					<view class="item_list_box">

						<!-- <u-gap height="1" bg-color="#bbb"></u-gap> -->
						<view class="item_content">
							{{item.content}}
						</view>
						<view class="item_time">
							{{$u.timeFormat(item.createTime,'yyyy-mm-dd')}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom" v-show="isShow">
			已经加载完啦
		</view>
		<view class="bottom" v-show="isShow">
			......
		</view>
		<view class="publish_btn">
			<view class="iconfont icon-liuyan" fontSize="16px" @click="toMessaging"></view>
		</view>
	</view>
</template>

<script>
	import {
		communityTinyservenoteByName_Get
	} from "@/api/工具模块/留言板.js"
	export default {
		data() {
			return {
				userName: "",
				messageList: [],
				isShow: false
			};
		},
		methods: {
			//	跳转“写留言”
			toMessaging() {
				uni.navigateTo({
					url: "/subpages_tool/messaging/messaging"
				})
			},
			//	监听输入，正在输入时留言内容取消渲染
			inputChange() {
				this.isShow = false
			},
			//	获取留言列表信息
			getMessageContent() {
				communityTinyservenoteByName_Get({
					userName: this.userName
				}).then(res => {
					// console.log('返回res如下：', res);
					let dataList = res.data.data
					if (dataList.length > 0) {
						this.isShow = true;
					} else if (this.userName = "") {
						uni.showModal({
							content: '还没输入哦',
							showCancel: false
						});
					} else {
						this.isShow = false
						uni.showModal({
							content: '还没有人给Ta留言哦',
							showCancel: false
						});
					}
					if (res.statusCode === 200) {
						for (let i = 0; i < dataList.length; i++) {
							console.log(dataList[i]);
							this.messageList = dataList
						}
					} else {
						console.log("服务器已经乌拉！");
					}
				})
			}
		},
	};
</script>

<style lang="scss">
	page {
		background: url('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.huabanimg.com%2F9874f8e54542c8906b3b27040f12ce983f1ef9a510c227-PdgL2X_fw658&refer=http%3A%2F%2Fhbimg.huabanimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663305128&t=9a6634539d52ea2946947a3760ccc791');
		background-size: cover;
		padding-bottom: 200rpx;
	}

	.wrap {
		position: relative;
		margin: 20rpx 20rpx;
		height: var(--window-top);
		border-radius: 15rpx;

		.wrap_input {
			opacity: 0.9;
			position: relative;
			background-color: #fff;
			padding: 40rpx;
			margin: 20rpx auto;
			backdrop-filter: blur(10px);

			.input {
				opacity: 1;
				margin: 30rpx auto;
				width: 80%;
			}

			.button {
				opacity: 1;
				margin: 30rpx auto;
				width: 80%;

			}
		}

		.wrap_show {

			position: relative;
			margin: 20rpx 0rpx;

			.show_icon {
				height: 28px;
				width: 28px;
				margin:  30rpx auto -30rpx;
			}

			.feedback_btn {
				position: absolute;
				bottom: 60rpx;
				right: 60rpx;
				width: 50px;
			}

			.item_list {

				// box-shadow: #d5d5d5 3rpx;
				// display: flex;
				// flex-direction: column;
				// margin: 60rpx 0rpx;

				.item_list_box {
					opacity: 0.9;
					position: relative;
					background-color: #fff;
					border-radius: 30rpx;
					box-shadow: 0rpx 0rpx 10px #ccc;
					// border: #82ffcf 1px solid;
					margin: 40rpx auto;
					// height: 150rpx;
					padding: 40rpx;

					.item_content {
						opacity: 1;
						margin-bottom: 50rpx;
					}

					.item_time {
						opacity: 1;
						position: absolute;
						font-size: 25rpx;
						color: #ccc;
						bottom: 30rpx;
						right: 30rpx;
					}
				}

			}

		}

		.bottom {
			margin: 30rpx auto;
			text-align: center;
			color: #545454;
		}

		.publish_btn {
			position: fixed;
			bottom: 100rpx;
			right: 60rpx;
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			background-color: #31b6c3;
			display: flex;
			justify-content: center;
			align-items: center;
			.icon-liuyan {
				height: 35rpx;
				width: 35rpx;
				font-size: 35rpx;
				color: #fff;
			}

		}

		&.show {
			animation: showLayer 0.2s linear both;
		}
	}
</style>
