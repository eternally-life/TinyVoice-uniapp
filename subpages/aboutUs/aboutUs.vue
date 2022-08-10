<template>
	<view class="container">
		<view class="bgColor"></view>
		<view class="top">
			<view class="title">
				<u--image :showLoading="true" radius="20rpx" :src="logo" width="80rpx" height="80rpx">
				</u--image>
				<text class="name">{{noticeData.noticeTitle}}</text>
			</view>
			<view class="content">
				<rich-text :nodes="noticeData.noticeContent"></rich-text>
			</view>

		</view>
		<!-- 	<view class="bot">
			<view class="title">
				<u--image :showLoading="true" radius="20rpx" :src="logo" width="60rpx" height="60rpx"></u--image>
				<text class="name">开发团队</text>
			</view>
			<view class="">
				<rich-text :nodes="content"></rich-text>
			</view>
		</view> -->
	</view>
</template>

<script>
	const prf = 't-';
	import {
		systemParamsNoteList_Get,
		systemParamsNotenoticeId_Get
	} from '@/api/SYSTEM/参数字典公告.js'
	export default {
		data() {
			return {
				logo: getApp().globalData.logo,
				noticeData: {}
			};
		},
		onLoad() {
			this.getNoticeByNoticeID()
		},
		methods: {
			async getNoticeByNoticeID() {
				const res = await systemParamsNotenoticeId_Get({
					noticeId: 18
				})
				this.noticeData = res.data.data
			},

			toDetail(index) {
				console.log(index);
			}
		}
	};
</script>

<style lang="scss">
	.container {
		.bgColor {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: #f5f5f5;
			z-index: -1;
		}

		.title {
			display: flex;
			text-align: center;
			height: 60rpx;
			line-height: 60rpx;
			margin-bottom: 30rpx;

			// border-bottom: 2rpx solid #f3f3f3;
			.name {
				margin-left: 30rpx;
				font-size: 38rpx;
				font-weight: bold;
			}
		}

		.top {
			padding: 30rpx 50rpx;
			border-radius: 30rpx;
			margin: 40rpx 30rpx;
			box-shadow: 10rpx 10rpx 10px #ccc;
			background-color: #ffffff;

			.content {
				color: #6c6c6c;
				font-size: 30rpx;
				text-indent: 2em;
			}
		}

		.center {
			padding: 30rpx 50rpx;
			border-radius: 30rpx;
			margin: 40rpx 30rpx;
			box-shadow: 10rpx 10rpx 10px #ccc;
			background-color: #ffffff;
			font-size: 28rpx;

			.join {
				display: flex;
				padding-bottom: 20rpx;
				border-bottom: 2rpx solid #ccc;
				margin-bottom: 10rpx;
				justify-content: space-between;

				.left {
					display: flex;

					.joinInfo {
						padding-left: 20rpx;
						line-height: 40rpx;
					}
				}

				.btn {
					padding-top: 10rpx;

					.u-tag {
						height: 50rpx;
						padding: 0 20rpx;

						.u-tag__text {
							font-size: 28rpx;
						}
					}
				}
			}

			.other {
				display: flex;
				align-items: center;

				.otherInfo {
					padding-left: 20rpx;
				}
			}
		}

		.bot {
			padding: 30rpx 50rpx;
			border-radius: 30rpx;
			margin: 40rpx 30rpx;
			box-shadow: 10rpx 10rpx 10px #ccc;
			background-color: #ffffff;

			.Scroll {
				.scrollItem {
					display: flex;
					margin: 40rpx 40rpx 40rpx 0;

					.iconSize {
						width: 120rpx;
						height: 120rpx;
					}

					.itemInfo {
						margin-left: 40rpx;
						color: #7d7d7d;
						line-height: 60rpx;

						.desc {
							font-size: 28rpx;
						}

						text {
							height: 50rpx;
							line-height: 50rpx;
							font-size: 28rpx;
							white-space: nowrap; // 不允许换行
						}
					}
				}
			}
		}
	}
</style>
