<template>
	<view>
		修改手机
		<button @click="changeStep(-1)">上</button>
		<button @click="changeStep(1)">下</button>

		<view class="u-demo-block__content">
			<u-steps :current="current1">
				<u-steps-item title="已下单" desc="10:30"></u-steps-item>
				<u-steps-item title="已出库" desc="10:35"></u-steps-item>
				<u-steps-item title="运输中" desc="11:40"></u-steps-item>
			</u-steps>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			current: 0
		};
	},
	methods: {
		changeStep(e) {
			this.current += e;
		}
	}
};
</script>

<style scoped lang="scss"></style>
