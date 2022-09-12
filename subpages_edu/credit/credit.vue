<!-- 学分查询 -->
<template>
	<view class="all_view">
		<u-toast ref="uToast"></u-toast>
		<view class="top_tit">
			<view class="item item_left">课 程</view>
			<view class="item item_middle">计划学分</view>
			<view class="item item_right">获得学分</view>
		</view>
		<view class="data_list" v-for="(item, index) in creditData" :key="index">
			<view class="list_item item_left">{{ str(item.tname) }}</view>
			<view class="list_item item_middle">{{ str(item.jhxf) }}</view>
			<view class="list_item item_right">{{ str(item.hdxf) }}</view>
		</view>
	</view>
</template>

<script>
import { eduGuetCreditPoints_Post } from '@/api/GUET/教务开放接口';
export default {
	name: 'EduCredit',
	data() {
		return {
			creditData: [],
			watchDogID: 0
		};
	},
	methods: {
		// 获取教务数据
		getData() {
			eduGuetCreditPoints_Post({ token: getApp().globalData.token })
				.then(val => {
					if (val.data.code != 200) {
						return;
					}
					if (val.data.data.length == 0) {
						return;
					}
					if (val.data.code == 500) {
						return Promise.reject(val);
					}
					this.creditData = val.data.data;
					console.log('正常请求流', val);
					this.killWatchDog();
					uni.stopPullDownRefresh();
				})
				.then(
					val => {},
					err => {
						console.warn('异常promise', err);
					}
				)
				.catch(e => {
					console.warn('异常promise', e);
					this.$refs.uToast.show({ type: 'error', message: '获取失败，请下拉刷新', duration: 1000 });
					uni.stopPullDownRefresh();
				});
		},
		/* ======请求守护进程====== */
		/* 生成看门狗 */
		creatWatchDog() {
			console.log('看门狗出现了');
			this.watchDogID = setTimeout(() => {
				this.$refs.uToast.show({ type: 'error', message: '服务器异常', duration: 1000 });
				console.log('看门狗把你咬死了');
			}, 3000);
		},

		/* 清除看门狗 */
		killWatchDog() {
			clearTimeout(this.watchDogID);
			console.log('看门狗击杀成功');
		}
	},
	computed: {
		str(para) {
			return para => {
				return para == null ? '暂无' : para;
			};
		}
	},
	onLoad() {
		this.creatWatchDog();
		this.getData();
	},
	onPullDownRefresh() {
		// console.log('刷新');
		this.getData();
	}
};
</script>

<style scoped lang="scss">
$container_w: 335px;
$container_h: 50px;
$item_mar: 16px;
$border_radius_size: 10px;

@mixin share_container {
	width: $container_w;
	height: $container_h;
	display: flex;
	justify-content: space-around;
	align-items: center;
}
@mixin share_item {
	flex: 1;
}
@mixin three_part {
	.item_left {
		text-align: left;
		margin-left: $item_mar;
	}
	.item_middle {
		text-align: center;
	}
	.item_right {
		text-align: right;
		margin-right: $item_mar;
	}
}

.all_view {
	width: $container_w;
	margin: 20px auto;
	border-radius: $border_radius_size;
	background-color: #fff;
	.top_tit {
		@include share_container;
		background-color: #60c5ba;
		border-top-left-radius: $border_radius_size;
		border-top-right-radius: $border_radius_size;
		color: #fff;
		font-size: 15px;
		@include three_part;
		.item {
			@include share_item;
		}
	}

	.data_list {
		@include share_container;
		@include three_part;
		.list_item {
			font-size: 16px;
			@include share_item;
		}
		.item_left {
			color: #aeaeae;
		}
	}
}
</style>
