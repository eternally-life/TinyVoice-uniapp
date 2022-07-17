<template>
	<view class="weekApp">
		<view class="container" v-show="calendarType == 0">
			<!-- 日 带有点击事件  可切换查看单日数据 -->
			<view class="weekUl">
				<!-- <view class="weekLi" @click="toHelp()"><i class="iconfont font-fix">&#xed19;</i></view> -->
				<view class="weekLi" @click="toHelp()"><view class="t-icon font-fix" :class="icon"></view></view>

				<view v-for="(item, index) in showWeek_static" :key="index" class="weekLi" @click="changeFlag(index)">
					<view class="dayItem " :class="[dayStyle(index)]">{{ item }}</view>
				</view>
			</view>
		</view>
		<view class="container" v-show="calendarType == 1">
			<!-- 周 不可点击切换单日数据 -->
			<view class="weekUl_static">
				<!-- <view class="weekLi_static" @click="toHelp()"><i class="iconfont font-fix">&#xed19;</i></view> -->
				<view class="weekLi_static" @click="toHelp()"><view class="t-icon font-fix" :class="icon"></view></view>
				<view v-for="(item, index) in showWeek_dynamic" :key="index" class="weekLi_static" @click="weekStrFlage_CN = !weekStrFlage_CN">
					<view class="dayItem_static" :class="[getNowStyle(index)]">{{ item }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
let dayjs = require('dayjs');
import { mapState, mapMutations } from 'vuex';
export default {
	name: 'guet-calendar-week',
	data() {
		return {
			weekStrFlage_CN: false,
			year: null,
			month: null,
			date: null,
			week: null,
			nowWeekNum: null,
			maxDay: null, //本月最大天数
			lastMaxDay: null, //上月最大天数
			dynamic_dayjs: dayjs(),
			dynamic_week: null, //动态
			dynamic_maxDay: null, //动态
			dynamic_lastMaxDay: null, //动态
			flagItem: 0,
			flagItem_static: 0,
			icon: 't-' + 'icon-kongxinwenhao'
		};
	},
	methods: {
		...mapMutations('edu', ['setTempEduTime2']),
		toHelp() {
			uni.navigateTo({
				url: '/pages/edu_help_setting/edu_help_setting'
			});
		},
		/* 点击切换标记	日期使用 */
		changeFlag(index) {
			// 防抖 禁止重复触发 并修改日期显示类型
			if (this.flagItem == index) {
				this.weekStrFlage_CN = !this.weekStrFlage_CN;
				return;
			}

			this.flagItem = index;
			uni.$emit('changeWeekNum', index);
		},

		/* 时间初始化 */
		initData() {
			let tempDate = this.nowTime;
			this.year = tempDate.getFullYear();
			this.month = tempDate.getMonth();
			this.date = tempDate.getDate();
			this.nowWeekNum = tempDate.getDay();
			// 三元判断  getDay()得到0为周日 将修复为index=6 其余自减1
			this.flagItem = tempDate.getDay() == 0 ? 6 : tempDate.getDay() - 1;
			this.flagItem_static = this.flagItem;
			// 设置最本月、上月最大日期
			[this.maxDay, this.lastMaxDay] = this.getMaxDay(this.year, this.month);
		},

		// 填充日期
		weekSort() {
			let tempDate = this.week2TimeFlage ? this.dynamic_dayjs : this.nowTime,
				maxDay = this.week2TimeFlage ? this.dynamic_maxDay : this.maxDay,
				lastMaxDay = this.week2TimeFlage ? this.dynamic_lastMaxDay : this.lastMaxDay;
			let startDate = this.week2TimeFlage ? tempDate.day() : tempDate.getDay(),
				num = this.week2TimeFlage ? tempDate.date() : tempDate.getDate(),
				// 周数补0
				weekArrayContainer = new Array(7).fill(0);
			// 修正周日的索引
			startDate = startDate == 0 ? 7 : startDate;
			// 顺序填写

			for (let i = startDate; i <= weekArrayContainer.length; i++, num++) {
				if (num > maxDay) {
					//填充下个月
					weekArrayContainer[i - 1] = num - maxDay;
				} else {
					//正常增加
					weekArrayContainer[i - 1] = num;
				}
				// console.log(i, num, weekArrayContainer[i - 1]);
			}
			//倒序补充
			num = this.week2TimeFlage ? tempDate.date() : tempDate.getDate();
			for (let i = startDate; i > 0; i--, num--) {
				//重复的跳过不填充
				if (weekArrayContainer[i - 1] != 0) continue;
				if (num <= 0) {
					weekArrayContainer[i - 1] = num + lastMaxDay;
				} else {
					weekArrayContainer[i - 1] = num;
				}
				// console.log(i, num, weekArrayContainer[i - 1]);
			}
			return weekArrayContainer;
		},

		/**获取本月、上月最大日期
		 * 接收参数
		 * 	year:年		month:月
		 * 依据闰年判断
		 * 返回一个数组 [本月最大日期, 上月最大日期]
		 * */
		getMaxDay(year, month) {
			if (year < 2000 || month > 12) {
				console.error('传参错误——', 'year:' + year, 'month:' + month);
				return [null, null];
			}
			let nowMaxDay = null,
				lastMaxday = null,
				month_olympic = this.monthType.olympic,
				month_normal = this.monthType.normal;
			if (year % 4 == 0) {
				nowMaxDay = month_olympic[month];
				lastMaxday = this.getLastMaxDay(month, month_olympic);
			} else {
				nowMaxDay = month_normal[month];
				lastMaxday = this.getLastMaxDay(month, month_normal);
			}
			// console.log('当月最大天数——' + nowMaxDay, '上个月最大天数——' + lastMaxday);
			return [nowMaxDay, lastMaxday];
		},

		/**获取指定月份的上个月最大天数
		 * 	month	指定的月份
		 * 	monthType	指定月份的类型数组
		 * 		|-需要先判断是否闰年
		 * */
		getLastMaxDay(month, monthType) {
			// 特殊月修正  此判断不影响润平年的2月
			if (month == 0) {
				//1月的上月是12月
				return monthType[11];
			} else {
				//2-12月正常-1
				return monthType[month - 1];
			}
		},
		/**获取新时间
		 * 根据传入的滑动方向 +/-去指定修改Dayjs对象信息
		 * 并返回一个新的 Dayjs对象
		 * */
		getNewTime(direction) {
			let tempDayjs = this.dynamic_dayjs;
			if (direction) {
				tempDayjs = tempDayjs.add(7, 'day');
			} else {
				tempDayjs = tempDayjs.subtract(7, 'day');
			}
			return tempDayjs;
		},
		/*=== 外部ref方法 ===*/
		/**修改日期
		 * direction 划定方向
		 *	修改vuex中的tempEduTime2
		 *  修改组件中的dayjs对象
		 *  修改其他动态时间dynamic_maxDay、dynamic_lastMaxDay、dynamic_week
		 * */
		ref_changeData(direction) {
			//修改dayjs对象
			this.dynamic_dayjs = this.getNewTime(direction);
			//修改临时时间对象
			let tempTime = this.tempEduTime2;
			tempTime.year = this.dynamic_dayjs.year();
			tempTime.month = this.dynamic_dayjs.month();
			tempTime.date = this.dynamic_dayjs.date();
			this.setTempEduTime2(tempTime);
			//修改动态时间
			[this.dynamic_maxDay, this.dynamic_lastMaxDay] = this.getMaxDay(tempTime.year, tempTime.month);
			this.dynamic_week = this.weekSort();
		},
		/* 左右滑动 切换单日 */
		ref_changeStyle_1_Date(direction) {
			let index = this.flagItem;
			if (direction) {
				if (index == 6) return;
				this.changeFlag(++index);
			} else {
				if (index == 0) return;
				this.changeFlag(--index);
			}
		}
	},
	computed: {
		...mapState('edu', ['calendarType', 'nowTime', 'monthType', 'week2TimeFlage', 'eduTime', 'tempEduTime2','week_GB']),
		/** 日期样式
		 * 
		 * 
		 * */
		dayStyle(index) {
			return index => {
				if (index != this.flagItem && index == this.flagItem_static) {
					return 'today';
				} else if (index == this.flagItem) {
					return 'selectDay';
				}
			};
		},
		
		/**动态显示的周数
		 * 依据 weekStrFlage_CN 判断是否显示星期
		 * 根据	全局 week2TimeFlage时间状态 显示当前周 或其他周的日期
		 * */
		showWeek_dynamic() {
			return this.weekStrFlage_CN ? this.week_GB : this.week2TimeFlage ? this.dynamic_week : this.week;
		},
		
		/**静态显示周数
		 * 显示单周日期 或 星期
		 * */
		showWeek_static() {
			return this.weekStrFlage_CN ? this.week_GB : this.week;
		},
		
		/* 本区动态周样式 */
		getNowStyle(index) {
			return index => {
				if (this.tempEduTime2.weekSeq === this.eduTime.weekSeq) {
					return index == this.flagItem_static ? 'selectDay' : '';
				} else if (this.tempEduTime2.weekSeq !== this.eduTime.weekSeq && this.week2TimeFlage == false) {
					return index == this.flagItem_static ? 'selectDay' : '';
				} else {
					return 'noWeek';
				}
			};
		}
	},
	created() {
		// 挂载切日事件
		uni.$on('changeDate', direction => {
			this.ref_changeStyle_1_Date(direction);
		});
	},
	// 挂载
	onReady() {
		this.initData();
		this.week = this.weekSort();
	},
	// 卸载
	onUnload() {
		uni.$off('changeDate')
	}
};
</script>

<style scoped lang="scss">
$item_width: 74rpx;
$icon_size: 46rpx;
@mixin com_date_style {
	border-radius: 50%;
	color: #8a8989;
}
@mixin flag {
	color: #fff;
	background-color: #60c5ba;
}

@mixin font-fix {
	width: $icon_size;
	height: $icon_size;
}

.weekApp {
	width: 90%;
	margin: 15rpx auto;
	font-weight: bolder;
	.container {
		.weekUl {
			display: flex;
			justify-content: flex-end;
			.weekLi {
				width: 70rpx;
				height: 70rpx;
				margin-left: 10rpx;
				.font-fix {
					@include font-fix;
					margin-top: 8rpx;
				}
				.dayItem {
					width: 90%;
					height: 90%;
					line-height: 60rpx;
					text-align: center;
					@include com_date_style;
				}
				.selectDay {
					@include flag;
				}
				.today {
					color: #fff;
					background-color: #d4ecee;
				}
			}
		}
		.weekUl_static {
			display: flex;
			align-items: center;
			justify-content: space-between;
			.weekLi_static {
				width: $item_width;
				height: $item_width;
				text-align: center;
				line-height: $item_width;
				.font-fix {
					@include font-fix;
					margin-top: 13rpx;
				}
				.dayItem_static {
					@include com_date_style;
				}
				.noWeek {
					color: #8a89895e;
				}
				.selectDay {
					@include flag;
				}
			}
		}
	}
}
</style>
