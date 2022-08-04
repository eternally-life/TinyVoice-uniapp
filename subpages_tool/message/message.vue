<template>
	<view class="wrap">
		<view class="wrap_input">
			<view class="input">
				<u--input placeholder="快输入Ta的名字或你的名字看看吧!" @change="inputChange()" border="bottom" vale="userName"
					v-model="userName"></u--input>
			</view>
			<view class="button">
				<u-button @click="getMessageContent(userName)">查看留言</u-button>
			</view>
		</view>

		<view class="wrap_show" v-if="isShow">
			这是给Ta的留言
			<view v-for="(item,index) in messageList" :key="index">

				<view class="item_list">
					<view class="item_time">
						{{$u.timeFormat(item.createTime,'yyyy-mm-dd')}}
					</view>
					<u-gap height="1" bg-color="#bbb"></u-gap>
					<view class="item_content">
						{{item.content}}
					</view>

				</view>
			</view>
		</view>

		<view class="publish_btn">
			<view class="publish_content">
				<view class="iconfont icon-liuyan" fontSize="24px" @click="toMessaging"></view>
				留言
			</view>
		</view>
	</view>
</template>

<script>
	import {
		communityTinyservenoteByName_Get
	} from "@/api/社区模块/留言板.js"
	export default {
		data() {
			return {
				userName: "",
				messageList: [],
				isShow: false
			};
		},
		methods: {
			toMessaging() {
				uni.navigateTo({
					url: "/subpages_tool/messaging/messaging"
				})
			},
			inputChange() {
				this.isShow = false
			},
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
	.wrap {
		position: relative;
		background-color: #fff;
		margin: 20rpx 20rpx;
		height: var(--window-top);
		border-radius: 15rpx;
		// box-shadow: 10rpx 10rpx 10px #ccc;


		.wrap_input {
			position: relative;
			background-color: #fff;
			padding: 40rpx;
			margin: 20rpx 20rpx;
			border-radius: 30rpx;
			box-shadow: 5rpx 5rpx 5px #ccc;

			.input {}

			.button {
				margin: 30rpx 30rpx;
				width: 80%;

				u-button {
					background-color: #82ffcf;
				}
			}
		}

		.wrap_show {

			position: relative;
			background-color: #fff;
			padding: 40rpx;
			margin: 20rpx 0rpx;
			border-radius: 30rpx;
			box-shadow: 5rpx 5rpx 5px #ccc;

			.feedback_btn {
				position: absolute;
				bottom: 60rpx;
				right: 60rpx;
				width: 50px;
			}

			.item_list {
				height: 150rpx;
				box-shadow: #d5d5d5 3rpx ;
				display: flex;
				flex-direction: column;
				margin: 60rpx 10rpx;

				.item_time {
					display: flex;
					justify-content: flex-end;
					font-size: 25rpx;
					color: #ccc;
				}

				.item_content {}
			}

		}

		.publish_btn {
			position: fixed;
			bottom: 100rpx;
			right: 60rpx;
			width: 100rpx;


			.publish_content {
				display: flex;
				flex-direction: column;
				justify-content: center;

				.icon-liuyan {
					right: 60rpx;
					width: 50px;
					font-size: 66rpx
				}
			}

		}

		&.show {
			animation: showLayer 0.2s linear both;
		}
	}
</style>
