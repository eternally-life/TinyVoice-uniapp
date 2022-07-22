<template>
	<view class="context">
		<view class="center">
			<ul class="monthUl">
				<!-- 这个月前面空出几天 -->
				<li v-for="(item, index) in fDay" :key="index" class="monthLi"></li>
				<li v-for="(item, index) in mDays" :key="index" class="monthLi" @click="changeDayFlag(index + 1)">
					<text v-if="index + 1 !== flagDate" :class="[dayStyle(index + 1)]">{{ index + 1 }}</text>
					<view v-else class="choolItem">{{ index + 1 }}</view>
				</li>
			</ul>
		</view>
	</view>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
const manageData = require('@/utils/manageData.js');
export default {
	name: 'edu-calendar-month',
	data() {
		return {
			year: null,
			month: null,
			// 第一天星期几
			fDay: null,
			// 对应月有几天
			mDays: null,
			//标记的日期
			flagDate: null
		};
	},
	methods: {
		...mapMutations('edu', ['setMonthMaxDay']),
		/**更新日历排布
		 * 统一调度更新日期序列
		 * */
		reStart() {
			this.dayStart(this.eduTime.month, this.eduTime.year);
			this.daysMonth(this.eduTime.month, this.eduTime.year);
		},

		/**获取当月的第一天
		 * */
		dayStart(month, year) {
			var tmpDate = new Date(year, month, 1);
			this.fDay = tmpDate.getDay() - 1;
		},

		/**计算某年是不是闰年
		 * 获取当月最大日期
		 * 并设置全局日期状态
		 * */
		daysMonth(month, year) {
			const month_olympic = this.monthType.olympic,
				month_normal = this.monthType.normal;
			if (year % 4 == 0) {
				this.mDays = month_olympic[month];
			} else {
				this.mDays = month_normal[month];
			}
			this.setMonthMaxDay(this.mDays);
			// this.$store.commit('edu/setMonthMaxDay', this.mDays);
		},

		/**日期点击事件
		 * 更新日期标记
		 * 并调起月类型课表事件
		 * */
		changeDayFlag(date) {
			// console.log(date + '日');
			if (date == this.flagDate) return;
			this.flagDate = date;
			let [...click_data_Obj] = [...this.getTimeValue(date), date];
			//调起课表切换事件
			uni.$emit('changeMonthNum', click_data_Obj);
		},
		/* fn() {
			console.log(this.fDay, this.mDays, this.eduTime);
		} */

		/**日期点击事件
		 * 返回点击的日期参数
		 * */
		getTimeValue(dayIndex) {
			console.log('dayIndex: ', dayIndex);
			let temp = new Date(this.eduTime.year, this.eduTime.month, dayIndex);
			return manageData.timeAnalysis(this.timeNode, temp);
		}
	},
	computed: {
		...mapState('edu', ['timeNode', 'monthType', 'eduTime']),
		// ...mapGetters('edu', ['eduTime']),
		dayStyle() {
			return index => {
				if (index == this.eduTime.date) {
					return 'today';
					return '';
				} else return '';
			};
		}
	},
	watch: {
		/**全局来看，次方法仅执行一次
		 **/
		eduTime(newValue, oldValue) {
			this.reStart();
			// 默认第一次标记今日
			this.flagDate = this.eduTime.date;
		}
	},
	mounted() {
		// this.reStart();
		//初始化日期标记
		// this.flagDate = this.eduTime.date;
		// this.fn();
	}
};
</script>

<style scoped lang="scss">
li {
	list-style: none;
	color: #8a8989;
}
@mixin flag_item {
	width: 65%;
	height: 60%;
	color: #ffffff;
	font-weight: bolder;
	font-size: 24rpx;
	line-height: 60rpx;
	text-align: center;
	border-radius: 100%;
}
.context {
	font-family: arial;
	width: 90%;
	height: 90%;
	color: #666666;
	margin: 0 auto;
	padding-bottom: 5rpx;
	.center {
		width: 100%;
		margin: 0;
		padding: 0;
		.monthUl {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;
			.monthLi {
				width: 14.28%;
				height: 102rpx;
				margin-top: 5rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				// font-size: 24rpx;
				font-weight: 700;
				color: #8a8989;
				line-height: 36rpx;
				.choolItem {
					@include flag_item;
					background-color: #60c5ba;
				}
				.today {
					@include flag_item;
					background-color: #d4ecee;
				}
			}
		}
	}
}
</style>
