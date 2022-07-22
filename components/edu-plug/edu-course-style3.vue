<template>
	<view class="month_style">
		<view class="course_day fadeInRight" :class="[isOpenAnimat('course')]" v-for="(day_item, day_index) in showData" :key="day_index">
			<view class="old_time">星期{{ getGBWeek(day_index) }}</view>
			<view class="course_table">
				<!-- 遍历该日课程 -->
				<view class="course_list" v-for="(item, index) in day_item" :key="index" :style="[getBgImg(index)]" @click="courseDataTap(item)">
					<view class="time">{{ timeList[item.Seq - 1] }}</view>
					<view class="course_name">{{ item.Cname }}</view>
					<view class="teach">{{ item.Name }}</view>
					{{ item.CroomNo }}
				</view>
			</view>
			<!-- 全天无课 -->
			<view class="noData" v-if="day_item == 0" :style="'background-image:url(' + prf + ');background-color:' + colorList[5] + ';'">这天没课~</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
const manageData = require('@/utils/manageData.js');
export default {
	name: 'edu-course-style3',
	data() {
		return {
			prf: 'https://tinyvoice.oss-cn-guangzhou.aliyuncs.com/material/edu/will_1.png',
			previewNum: 3,
			timeList: ['8:25', '10:25', '15:00', '17:00', '19:40', '21:30'],
			otherWeekData_cache: null, //非store内的另外一周换缓存
			lastClickIndex_cache: null, //上一次点击 缓存周数索引
			calendarIndex: null, //存储日期的索引
			showData: null,
			disposable: true,
			oldDataShow: false
		};
	},
	methods: {
		// 课程点击详情
		courseDataTap(para) {
			this.$store.commit('edu/setCourseDetails', para);
		},
		changeMonthNum(dayObj) {
			let tempDate = {
				weekSeq: null,
				weekDay: null,
				date: null
			};
			// console.log(dayObj);
			if (dayObj.length == 3) {
				// console.log('点击触发');
				[tempDate.weekSeq, tempDate.weekDay, tempDate.date] = dayObj;
			} else {
				// console.log('挂载完成触发');
				[tempDate.weekSeq, tempDate.weekDay, tempDate.date] = [dayObj.weekSeq, dayObj.weekDay, dayObj.date];
			}
			this.fillShowData(tempDate);
		},

		/**填充显示数组
		 * 遍历最大预览值
		 * 根据指定天数 依次遍历所有天数课程
		 * */
		fillShowData(clickPara) {
			let singleData = null,
				timeIndexContainer = [],
				showTempContainer = [];
			for (var i = 0; i < this.previewNum; i++) {
				let temp = {
					weekDay: clickPara.weekDay + i,
					weekSeq: clickPara.weekSeq,
					date: clickPara.date + i
				};
				// 超过当月跳出遍历
				if (temp.date > this.monthMaxDay) break;
				try {
					// console.log('尝试遍历的对象', temp);
					singleData = this.packageData(temp);
					//同步记录该日课程
					showTempContainer.push(manageData.dayDataUnpacking(singleData));
					// 同步记录该日日期索引
					timeIndexContainer.push({ date: temp.date, weekDay: temp.weekDay });
				} catch (e) {
					// console.warn('缓存读取异常');
				}
			}
			this.showData = showTempContainer;
			this.calendarIndex = timeIndexContainer;
		},

		// 获得单日课程
		packageData(timePara) {
			let timeArr = timePara;
			// 当天星期天往  后为下周周一
			if (timeArr.weekDay > 6) {
				timeArr.weekDay -= 7;
				timeArr.weekSeq += 1;
			}
			if (timeArr.weekSeq == this.eduTime.weekSeq) {
				// 与store缓存周匹配
				console.warn('与store缓存周课表匹配');
				return manageData.getSingleDayData(this.oneWeekCourse, timeArr.weekDay);
			} else if (timeArr.weekSeq == this.lastClickIndex_cache) {
				//与最后点击周匹配
				console.warn('与最后点击周课表缓存匹配');
				return manageData.getSingleDayData(this.otherWeekData_cache, timePara.weekDay);
			} else {
				//均不匹配   更改周课表缓存
				console.warn('均不匹配，更改周课表缓存');
				// 读取所有课表缓存
				const valueCache = uni.getStorageSync(getApp().globalData.courseKEY);
				// 获取新一周数据
				this.otherWeekData_cache = manageData.dataDeposit(valueCache, timeArr.weekSeq);
				//更改最后标记周
				this.lastClickIndex_cache = timePara.weekSeq;
				return manageData.getSingleDayData(this.otherWeekData_cache, timePara.weekDay);
			}
		},

		// 挂载完毕后仅运行一次
		_single_render_() {
			if (!this.disposable) return;
			this.disposable = false;
			console.log('单次渲染执完毕');
			this.changeMonthNum(this.eduTime);
		}
	},
	computed: {
		...mapGetters('edu', ['getBgImg', 'isOpenAnimat']),
		...mapState('edu', ['eduTime', 'oneWeekCourse', 'calendarType', 'week_GB', 'monthMaxDay', 'colorList', 'bgPrefix', 'bgSuffix']),
		/**返回星期的中文形式
		 * looopIndex为插值遍历的index
		 * 遍历calendarIndex取出当日星期的索引值
		 * */
		getGBWeek(loopIndex) {
			return loopIndex => {
				if (this.disposable) return ' ';
				let weekIndex = this.calendarIndex[loopIndex].weekDay;
				return this.week_GB[weekIndex];
			};
		},
		/**loopIndex 参数点击的日期
		 * 根据全局eduTime的年份月份
		 * 构建new 获取该日的农历字符
		 * 返回全汉字结构的字符串
		 * */
		getLunarGB(loopIndex) {
			return loopIndex => {
				if (this.disposable) return ' ';
				let str = this.oldLunar(loopIndex);
				this.oldDataShow = str.indexOf('undefined') == -1 ? true : false;
				return str;
			};
		}
	},
	watch: {
		/*由于style3采用了读取缓存以支持预览的模式
		 * 所以 起始显示的 必须是sty1或2 这些初次读取仅需要oneWeekCourse的样式
		 * 且 仅在切换至 sty3 时才渲染
		 * */
		calendarType(newVale) {
			if (newVale == 2) {
				this._single_render_();
			}
		}
	},
	created() {
		uni.$on('changeMonthNum', dayObj => {
			console.log('点击传参', dayObj);
			this.changeMonthNum(dayObj);
		});
	},
	// 卸载
	onUnload() {
		uni.$off('changeMonthNum');
	}
};
</script>

<style scoped lang="scss">
$text-margin: 25rpx;
$br: 14rpx;
$item_w: 100%;
$item_h: 88rpx;
$item_color: #fff;
$list_bootom: 20rpx;
/* 
 #949595
 #accce8
 #e9af94
 #b4c3d0
 #eacfa9
 #5c80b6
 */
@mixin bgConfig {
	background-size: 46%;
	background-repeat: no-repeat;
	background-position-x: 100%;
}

.month_style {
	width: 90%;
	margin: 0 auto;
	.course_day {
		.old_time {
			font-weight: bolder;
			color: #8a8989;
			font-size: 24rpx;
			margin-bottom: $text-margin/2;
		}
		.course_table {
			color: $item_color;
			font-size: 26rpx;
			.course_list {
				width: $item_w;
				height: $item_h;
				display: inline-flex;
				margin-bottom: 20rpx;
				align-items: center;
				font-size: 24rpx;
				@include bgConfig;
				border-radius: $br;
				.time {
					width: 84rpx;
					margin-left: $text-margin;
				}
				.course_name {
					margin-left: $text-margin;
					max-width: 260rpx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				.teach {
					margin-left: $text-margin;
					margin-right: $text-margin;
				}
			}
		}
		.noData {
			width: $item_w;
			height: $item_h;
			margin-bottom: $list_bootom;
			color: $item_color;
			border-radius: $br;
			text-align: center;
			font-size: 30rpx;
			line-height: $item_h;
			@include bgConfig;
			// background-color: rgba(103, 211, 199, 0.2);
		}
	}
}
</style>
