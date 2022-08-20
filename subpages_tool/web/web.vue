<template>
	<view>
		<web-view :src="URL" @message="handleMessage"></web-view>
	</view>
</template>

<script>
	export default {
		onLoad(e) {
			this.URL = e.url
			console.log(e);
		},
		data() {
			return {
				URL: ''
			};
		}
	}
</script>

<style lang="scss">

</style>
