<template>
	<view>
		测试 tabbar3 图片上传示例
		<ty-file-upload @upPara="getImgData" paraGetMethods="active" />
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		getImgData(e) {
			console.log('页面接收到的组件返回数据', e);
		}
	}
};
</script>

<style lang="scss"></style>
