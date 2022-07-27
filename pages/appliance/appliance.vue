<template>
	<view>
		<!-- 轮播图 -->
		<view class="banner">
			<u-swiper
				:list="list"
				previousMargin="30"
				nextMargin="30"
				circular
				:autoplay="false"
				radius="5"
				bgColor="#ffffff"
			></u-swiper>
		</view>
	</view>
</template>

<script>
import { systemSyscarouselPage_Get } from '@/api/SYSTEM/轮播图.js';
export default {
	data() {
		return {
			list: [
				'https://cdn.uviewui.com/uview/swiper/swiper1.png',
				'https://cdn.uviewui.com/uview/swiper/swiper2.png',
				'https://cdn.uviewui.com/uview/swiper/swiper3.png'
			]
		};
	},
	methods: {
		getBanner() {
			systemSyscarouselPage_Get({
				pageNum: 1 /** 第几页    string required:false */,
				pageSize: 6 /** 页码大小    string required:false */
			}).then(res => {
				console.log('结果', res);
				if (res.data.code == 200 && res.data.data.records.length > 0) {
					let temp = []
						.concat(res.data.data.records)
						.concat(res.data.data.records)
						.concat(res.data.data.records);
					this.list = temp.map(value => value.url);
				}
			});
		}
	},
	onReady() {
		this.getBanner();
	}
};
</script>

<style scoped lang="scss">
.swiper {
	height: 20vh;
	width: 100%;
}
</style>
