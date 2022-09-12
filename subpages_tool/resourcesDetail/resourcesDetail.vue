<template>
	<view class="wrap">
		<view class="wrap_box">
			<view class="box_data">
				{{datas.name}}
				<view class="data_msg">
					{{$u.timeFormat(datas.createTime, 'yyyy-mm-dd')}}
					下载数：{{datas.downNum}}
					所需积分：{{datas.integral}}
				</view>
			</view>
			<view class="box_msg">
				{{datas.describe}}
			</view>
		</view>
		<view class="box_comment">
			<view class="comments_title">
				<view class="comments_border"></view>
				<view class="comments_content">评论</view>
			</view>
			<view class="not_reply" v-if="comments.length === 0">暂无评论</view>
			<view class="item_comment" v-for="(item,index) in comments" :key="index">
				<!-- {{item.avatar}} -->
				<view class="comment_left">
					<view class="item_img">
						<u-image shape="circle" :src="item.avatar" width="80rpx" height="80rpx" mode=""></u-image>
					</view>
				</view>
				<view class="comment_right">
					<view class="item_name">{{item.replyName}}</view>
					<view class="item_time">
						{{$u.timeFormat(item.createTime, 'yyyy-mm-dd')}}
					</view>
					<view class="item_content">
						{{item.content}}
					</view>
				</view>
			</view>
			<view class="comments_input">
				<u-input class="input" placeholder="快留下对资源的看法吧" border="botton" clearable shape="circle"
					placeholderStyle="color:#60C5BA" color="#60C5BA" maxlength="100" @confirm="sendVoiceReply"
					v-model="replyMessage">
					<template slot="suffix">
						<view class="input_right">
							<u-button :customStyle="customStyle" size="small" @click="sendMessage">发送</u-button>
						</view>
					</template>
				</u-input>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		communityTinyserveresourceByResourceId_Get,
		communityTinyserveresourceSaveReply_Post
	} from "@/api/工具模块/资源共享.js"
	export default {
		data() {
			return {
				eventChannel: null,
				// describe: '',
				datas: {},
				comments: {},
				replyMessage: ''
			};
		},
		//	发送框样式
		props: {
			customStyle: {
				type: Object,
				default: {
					background: '#60C5BA',
					color: '#fff',
					borderRadius: '40rpx',
				},
			},
		},
		onLoad(option) {
			//	获取资源详情
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('acceptResourcesData', data => {
				this.datas = data.data
				// console.log(this.datas);
				console.log(this.datas);
			});
		},
		// onUnload() {
		// 	this.eventChannel.off('login');
		// },
		mounted() {
			this.getResourcesMessage()
		},
		methods: {
			getResourcesMessage(){
				// 获取资源评论
				communityTinyserveresourceByResourceId_Get({
					resourceId: this.datas.resourceId
				}).then(res => {
					let datas = res.data.data;
					this.comments = datas
					console.log(this.comments);
				})
			},
			//	发送留言
			async sendMessage() {
				if (this.replyMessage === '') {
					uni.showToast({
						title: '消息不能为空',
						icon: 'none'
					})
					return
				}

				const res = await communityTinyserveresourceSaveReply_Post({
					resourceId: this.datas.resourceId,
					content: this.replyMessage
				})
				console.log(res);
				if (res.data.code === 200) {
					uni.showModal({
						content: '留言成功',
						showCancel: false
					});
					
					this.getResourcesMessage(res => {
						this.comments = [res.data.data , ...this.comments]
					})
					this.replyMessage = ''
					
				}
			}
		},

	}
</script>

<style lang="scss">
	.wrap {
		background: #f1f1f1;
		height: 100%;

		.wrap_box {
			padding: 30rpx;
			box-shadow: 0rpx 0rpx 10rpx #ccc;
			position: relative;
			background-color: #ffffff;

			.box_data {
				.data_name {
					font-size: 38rpx;
				}

				.data_msg {
					display: block;
					box-sizing: border-box;
					font-size: 24rpx;
					color: #888888;
				}
			}

			.box_msg {
				margin: 50rpx auto;
			}
		}

		.box_comment {
			padding: 30rpx;
			box-shadow: 0rpx 0rpx 5rpx #ccc;
			position: relative;
			background-color: #ffffff;
			margin: 30rpx auto;
			.not_reply {
				margin: 30rpx;
			}

			.comments_title {
				display: flex;
				align-items: center;

				.comments_border {
					width: 8rpx;
					height: 50rpx;
					background: #2dc1cf;
					border-top-left-radius: 10rpx;
					border-top-right-radius: 10rpx;
					border-bottom-left-radius: 10rpx;
					border-bottom-right-radius: 10rpx;
				}

				.comments_content {
					color: #4a4a4a;
					margin-left: 10rpx;
				}
			}

			.item_comment {
				display: flex;
				align-items: flex-start;
				min-height: 140rpx;
				padding: 20rpx;
				margin: 60rpx auto;

				.comment_left {
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.comment_right {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					margin-left: 30rpx;
					.item_name{
						
					}
					.item_time{
						font-size: 20rpx;
						color: #a8a8a8;
					}
					.item_content{}
				}
			}

			.comments_input {
				padding: 10rpx 30rpx;
				position: fixed;
				bottom: 0rpx;
				left: 0;
				right: 0rpx;
				z-index: 99;
				background: #EFF9F8;

				i {
					color: #69c8be;
					font-size: 60rpx;
				}

				.input_right {
					display: flex;
					align-items: center;
				}
			}
		}

	}
</style>
