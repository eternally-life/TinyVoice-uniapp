<template>
	<view class="container">
		商城订单
	</view>
</template>

<script>
	import {
		payTinymallPageOrder_Get
	} from '@/api/商城模块/商品信息下单.js'
	export default {
		data() {
			return {
				orderList: []
			}
		},
		onLoad() {
			this.getShopOrder()
		},
		methods: {
			async getShopOrder() {
				const res = await payTinymallPageOrder_Get()
				console.log(res);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container []
</style>
