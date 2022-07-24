<template>
	<view>
		测试 tabbar3 图片上传示例
		<ty-file-upload @upPara="getImgData" paraGetMethods="active" />
		
		//微音发表跳转按钮
		<view class="publish_btn">
		  <u-button icon="plus" shape="circle" iconColor="#31B6C3" @click="publishVoice"></u-button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		getImgData(e) {
			console.log('页面接收到的组件返回数据', e, '总长' + e.length);
		},
		//发表跳转
		publishVoice() {
		  uni.navigateTo({
		    url: '/pages/community-pub/community-pub',
		  })
		}
	}
};
</script>

<style lang="scss">
.publish_btn{
	border-radius: 50%;
	width: 150rpx;
	height: 50rpx;
	
}
</style>
