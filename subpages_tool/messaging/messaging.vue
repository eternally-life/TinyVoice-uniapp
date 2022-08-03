<template>
	<view class="wrap">
		<view class="wrap_message">
			<view class="message_name">
				<u--input placeholder="输入Ta的名字或暗号" inputAlign="center" border="bottom" v-model="toName" @change="change"></u--input>
			</view>
			<view class="message_content">
				<u--textarea v-model="messages" placeholder="给Ta的留言" border="none"></u--textarea>
			</view>
		</view>
		<view class="publish_btn">
			<u-button type="primary" @click="pushMessage" text="发送" :customStyle="customStyle" loadingText="发布中" round>
			</u-button>
		</view>
	</view>
</template>

<script>
	import {
		communityTinyservenoteSave_Post
	} from "@/api/社区模块/留言板.js"
	export default {
		data() {
			return {
				toName: "",
				messages: ""
			};
		},
		props: {
			customStyle: {
				type: Object,
				default: {
					background: '#EFF9F8',
					border: 'none',
					color: '#60C5BA',
					borderRadius: '40rpx',
				},
			},
		},
		methods: {
			pushMessage() {
				if ( this.toName == "" ) {
					uni.showModal({
						content: '请输入完整信息',
						showCancel: false
					});
				} else if ( this.messages == ""){
					uni.showModal({
						content: '请输入完整信息',
						showCancel: false
					});
				} else{
					communityTinyservenoteSave_Post({
						name: this.toName,
						content: this.messages
					}).then(res =>{
						console.log(this.toName);
						console.log(this.messages.length);
						if(res.statusCode === 200){
							uni.showModal({
								content: '发送成功',
								showCancel: false,
							});
						}else{
							uni.showModal({
								content: '发送失败',
								showCancel: false
							});
						}
					})
				}
				
			}
		}
	}
</script>

<style lang="scss">
	.wrap {
		margin: 300rpx auto;
		width: 600rpx;
		height: 500rpx;
		border-radius: 30rpx;
		box-shadow: 10rpx 10rpx 10px #ccc;
		background-color: #ffffff;

		.wrap_message {
			.message_name {
				width: 300rpx;
				margin: 0 auto;
				background-color: #ffffff;
			}

			.message_content {
				margin-top: 30rpx;
				height: 300rpx;
				background-color: #ffffff;
			}
		}

		.publish_btn {
			position: fixed;
			bottom: 60rpx;
			left: 20rpx;
			right: 20rpx;
		}
	}
</style>
