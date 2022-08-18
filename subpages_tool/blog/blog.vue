<template>
	<view>
		<web-view src="https://blog.glowxq.com" @message="handleMessage"></web-view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			handleMessage(evt) {
				console.log('接收到的消息：' + JSON.stringify(evt.detail.data));
			}
		}

	}
</script>

<style lang="scss">

</style>
