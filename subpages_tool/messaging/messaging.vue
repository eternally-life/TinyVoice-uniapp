<template>
	<view class="wrap">
		<view class="wrap_message">
			<view class="message_name">
				<u--input placeholder="输入Ta的名字或暗号" inputAlign="center" border="bottom" v-model="toName"></u--input>
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
	} from "@/api/工具模块/留言板.js"
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
			//	校验后发送请求
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
	page {
		background: url('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.huabanimg.com%2F9874f8e54542c8906b3b27040f12ce983f1ef9a510c227-PdgL2X_fw658&refer=http%3A%2F%2Fhbimg.huabanimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663305128&t=9a6634539d52ea2946947a3760ccc791');
		background-size: cover;
		padding-bottom: 200rpx;
	}
	
	.wrap {
		margin: 300rpx auto;
		width: 600rpx;
		height: 500rpx;
		border-radius: 30rpx;
		box-shadow: 0rpx 0rpx 10px #ccc;
		background-color: #ffffff;

		.wrap_message {
			.message_name {
				width: 350rpx;
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
			bottom: 360rpx;
			left: 20rpx;
			right: 20rpx;
		}
	}
</style>
