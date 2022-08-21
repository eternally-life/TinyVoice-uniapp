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
			<!-- <view class="not_reply" v-if="this.comments.length === 0 || this.comments">暂无评论</view> -->
			<view class="item_comment" v-for="(item,index) in comments" :key="index">
				<!-- {{item.avatar}} -->
				<view class="comment_left">
					<view class="item_img">
						<u-image shape="circle" :src="item.avatar" width="80rpx" height="80rpx" mode=""></u-image>
					</view>
				</view>
				<view class="comment_right">
					<view class="">{{item.replyName}}</view>
					<view class="">
						{{$u.timeFormat(item.createTime, 'yyyy-mm-dd')}}
					</view>
					<view class="">
						{{item.content}}
					</view>
				</view>
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
				comments: {}
			};
		},
		onLoad(option) {
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('acceptResourcesData', data => {
				this.datas = data.data
				// console.log(this.datas);
				console.log(this.datas.resourceId);
			});
			communityTinyserveresourceByResourceId_Get({
				resourceId: this.datas.resourceId
			}).then(res => {
				let datas = res.data.data;
				this.comments = datas
				console.log(this.comments);
			})

		},
		onUnload() {
			this.eventChannel.off('login');
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
			box-shadow: 0rpx 0rpx 10rpx #ccc;
			position: relative;
			background-color: #ffffff;

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

				.comment_left {}

				.comment_right {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					margin-left: 30rpx;

				}
			}
		}
	}
</style>
