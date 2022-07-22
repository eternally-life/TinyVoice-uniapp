<template>
	<view class="day_style">
		<view class="course_list fadeInLeft" :class="[isOpenAnimat('course')]" v-for="(item, index) in showData" :key="index">
			<view class="order_number" :style="[getBgImg(index)]" @click="showTime(item.Seq)">
				<view class="numItem">{{ getSingular(item.Seq) }}</view>
				<view class="numItem" v-if="item.Seq * 2 != 12">{{ getEvenNum(item.Seq) }}</view>
			</view>
			<view class="main_info" :style="[getBgImg(index)]" @click="courseDataTap(item)">
				<view class="data_container">
					<view class="course_name">{{ item.Cname }}</view>
					<view class="teach">{{ item.Name }}</view>
				</view>
				<view class="room_num">{{ item.CroomNo }}</view>
			</view>
		</view>
		<view class="noData" v-if="showData == null || showData.length == 0">今 日 没 课~</view>
	</view>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
const manageData = require('@/utils/manageData.js');
export default {
	name: 'edu-course-style1',
	data() {
		return {
			showData: null
		};
	},
	methods: {
		// 点击显示时间
		showTime(index) {
			let str1 = this.coureTimeList[index - 1][0],
				str2 = this.coureTimeList[index - 1][1];
			uni.showModal({
				title: '上 课 时 间',
				content: str2 == undefined ? str1 : str1 + '\r\n' + str2,
				showCancel: false
			});
		},

		// 点击课程显示模态框
		courseDataTap(para) {
			this.$store.commit('edu/setCourseDetails', para);
		},

		changeWeekNum(day) {
			try {
				let singleData = manageData.getSingleDayData(this.oneWeekCourse, day);

				this.showData = manageData.dayDataUnpacking(singleData);
			} catch (e) {
				//TODO handle the exception
				console.warn(e);
			}
		},
		// 挂载完毕后仅运行一次
		_single_render_() {
			this.changeWeekNum(this.eduTime.weekDay);
		}
	},
	computed: {
		...mapGetters('edu', ['getBgImg', 'getEvenNum', 'getSingular', 'isOpenAnimat']),
		...mapState('edu', ['eduTime', 'oneWeekCourse', 'colorList', 'bgPrefix', 'bgSuffix', 'coureTimeList'])
	},
	watch: {
		oneWeekCourse(newvalue) {
			// console.log(newvalue);
			this._single_render_();
		}
	},
	created() {
		uni.$on('changeWeekNum', day => {
			this.changeWeekNum(day);
		});
	},
	// 卸载
	onUnload() {
		uni.$off('changeWeekNum')
	}
};
</script>

<style scoped lang="scss">
$blackBorderRadius: 20rpx;
$blackHeight: 160rpx;
$margin-top-bottom: 5rpx;
@mixin bg_img {
	background-size: 100%;
	background-position: right;
}

@mixin item_border {
	border-radius: $blackBorderRadius;
}
.day_style {
	color: #fff;
	width: 90%;
	margin: 0 auto;
	.course_list {
		height: $blackHeight;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 30rpx;
		.order_number {
			width: 80rpx;
			height: $blackHeight;
			display: flex;
			flex-direction: column;
			@include item_border;
			.numItem {
				width: 100%;
				height: $blackHeight/2;
				text-align: center;
				line-height: 72rpx;
			}
		}
		.main_info {
			width: 570rpx;
			height: $blackHeight;
			font-size: 26rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			@include item_border;
			@include bg_img;
			.data_container {
				margin-left: 30rpx;
				margin-bottom: $margin-top-bottom;
				display: inline-flex;
				.course_name {
					max-width: 260rpx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				.teach {
					margin-left: 30rpx;
				}
			}
			.room_num {
				margin-top: $margin-top-bottom;
				margin-left: 50rpx;
			}
		}
	}
	.noData {
		width: 100%;
		height: $blackHeight;
		line-height: $blackHeight;
		font-size: 20px;
		text-align: center;
		@include bg_img;
		@include item_border;
		background-image: url('https://tinyvoice.oss-cn-guangzhou.aliyuncs.com/material/edu/will_1.png');
	}
}
</style>
