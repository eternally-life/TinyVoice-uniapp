<template>
	<view>
		<view class="calenderNav">
			<text v-show="calendarType == 0">{{ showTime.month + 1 }} 月</text>
			<text v-show="calendarType == 1" @click="goBack">第 {{ showTime.weekSeq + 1 }} 周</text>
			<text v-show="calendarType == 1" @click="goBack" class="smText">{{ goBackStr }}</text>
			<text v-show="calendarType == 2">{{ showTime.year }} 年 {{ showTime.month + 1 }} 月</text>
		</view>
		<edu-calendar-week ref="weekStyle" />
		<edu-calendar-month v-show="calendarType == 2" />
	</view>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
export default {
	name: 'eduCalendarControl',
	data() {
		return {};
	},
	methods: {
		...mapMutations('edu', ['setWeek2TimeFlage', 'setTempEduTime2']),

		/**修改周数临时显示时间
		 * direction 滑动方向
		 * 根据滑动方向，决定
		 *	method	设置缘由
		 * 		|-	true  滑动引起切换
		 * 		|-	false 返回本周引起切换
		 * */
		setTempTime(direction, method) {
			let tempTime = this.tempEduTime2;

			if (method && direction !== null) {
				tempTime.weekSeq = direction ? ++tempTime.weekSeq : --tempTime.weekSeq;
				this.$refs.weekStyle.ref_changeData(direction);
			} else {
				tempTime.weekSeq = this.eduTime.weekSeq;
			}

			this.setTempEduTime2(tempTime);
		},

		/* 返回当前周 */
		goBack() {
			if (this.eduTime.weekSeq !== this.showTime.weekSeq) {
				this.setTempTime(null, false);
				uni.$emit('goBack');
			}
		}
	},
	computed: {
		...mapState('edu', ['calendarType', 'eduTime', 'week2TimeFlage', 'eduTime', 'tempEduTime2']),
		showTime() {
			if (this.week2TimeFlage) {
				return this.tempEduTime2;
			} else {
				return this.eduTime;
			}
		},

		/** 显示 返回显示
		 * */
		goBackStr() {
			return this.eduTime.weekSeq == this.showTime.weekSeq ? '' : '（点此返回第 ' + (this.eduTime.weekSeq + 1) + ' 周）';
		}
	},
	created() {
		uni.$on('dataChange', direction => {
			//开启tempTime显示标记 仅开启一次
			if (this.week2TimeFlage === false) {
				this.setWeek2TimeFlage(true);
			}
			this.setTempTime(direction, true);
		});
	},
	onUnload() {
		uni.$off('dataChange');
	}
};
</script>

<style scoped lang="scss">
.calenderNav {
	color: #8a8989;
	font-size: 36rpx;
	margin: 10rpx 60rpx;
	.smText {
		color: #68c5c3;
		line-height: 26rpx;
		font-size: 28rpx;
	}
}
</style>
