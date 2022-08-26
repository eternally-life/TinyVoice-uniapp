<template>
	<view class="home_wrap">
		<u-toast ref="uToast"></u-toast>
		<!-- 教务滑块  此处阻止事件偏移 影响点击-->
		<view @click.native.stop="toucheEnd()"><edu-button /></view>

		<!-- 日期&课表  类型切换 -->
		<view class="typeSwitch">
			<u-subsection
				:list="calenTypeList"
				:current="calendarType"
				@change="typetap"
				activeColor="#60c5ba"
			></u-subsection>
		</view>

		<!-- 滑动检测 -->
		<view @touchstart.native.prevent="touchStart" @touchend.native.prevent="toucheEnd" :style="[getDynamicHeight]">
			<!-- 日期模块 -->
			<eduCalendarControl />

			<!-- 课块区域 -->
			<eduCourseControl ref="course" />
		</view>

		<!-- 课程详情模态框 -->
		<edu-course-modal />
	</view>
</template>

<script>
import eduCalendarControl from './eduCalendarControl.vue';
import eduCourseControl from './eduCourseControl.vue';
import { mapState, mapMutations } from 'vuex';
export default {
	components: {
		eduCalendarControl,
		eduCourseControl
	},
	data() {
		return {
			calenTypeList: ['日', '周', '月'],
			positionInfo: {
				startX: 0,
				startY: 0,
				endX: 0,
				endY: 0,
				intervalX: 0,
				intervalY: 0
			},
			lastTimeKEY: getApp().globalData.storageKey.courseFTimeKEY
		};
	},
	methods: {
		...mapMutations('edu', ['setCalendarType', 'setModelShow', 'setCourseDetails']),
		//课表类型点击切换
		typetap(clickTypeID) {
			// 防抖 禁止重复触发
			if (this.calendarType == clickTypeID) return;

			this.setCalendarType(clickTypeID);
		},

		/**滑动事件组
		 * 	touchStart()触摸开始 获取起始按下坐标X Y
		 * 	toucheEnd() 触摸结束 获取结束抬手坐标X Y
		 * 	positionHandle() 处理上述俩结果  并 位置初始化
		 * */
		touchStart(e) {
			if (e == undefined) return;
			this.positionInfo.startX = e.changedTouches[0].clientX;
			this.positionInfo.startY = e.changedTouches[0].clientY;
		},
		toucheEnd(e) {
			if (e == undefined) return;
			this.positionInfo.endX = e.changedTouches[0].clientX;
			this.positionInfo.endY = e.changedTouches[0].clientY;
			this.positionInfo.intervalX = parseInt(this.positionInfo.endX - this.positionInfo.startX);
			this.positionInfo.intervalY = parseInt(this.positionInfo.endY - this.positionInfo.startY);
			// console.log('滑动结束', this.positionInfo);
			this.positionHandle();
		},
		/**滑动事件定性
		 * minThreshold 最小边界阈值
		 * maxThreshold 最大边界阈值
		 * direction 滑动方向
		 *		|-true  : <<左<-右<<
		 * 		|-false : >>左->右>>
		 * 		|-null 	: 无效滑动(无位移)
		 * 滑动作用域
		 * | 切日月 | 切周 | 无效域 | 切周 | 切日月 |
		 * 切周 ∈ (最小边界,最大边界)
		 * 切日月∈ (最大边界,+∞)
		 * */
		positionHandle() {
			let minThreshold = this.eduSwitch.sensitivity,
				maxThreshold = this.eduSwitch.sensitivity == 150 ? 240 : 200,
				positionInfo = this.positionInfo,
				direction = positionInfo.intervalX < 0 ? true : positionInfo.intervalX > 0 ? false : null;

			if (direction === true) {
				// console.log('<<<左滑动<<<');
			} else if (direction === false) {
				// console.log('>>>右滑动>>>');
			} else {
				console.log('无效滑动');
				this.reSetPosition();
				return 0;
			}

			// 根据滑动范围 处理事件
			if (this.getAbsState(positionInfo, minThreshold) && !this.getAbsState(positionInfo, maxThreshold)) {
				// 小范围滑动  切换日/周次
				if (this.calendarType == 0) {
					uni.$emit('changeDate', direction);
				} else if (this.calendarType == 1) {
					this.$refs.course.ref_WeekDataChange(direction);
				}
			} else if (this.getAbsState(positionInfo, maxThreshold)) {
				// 大范围滑动 切换课表类型
				this.calenderChange(direction);
			} else {
				console.warn('无效滑动范围', 'x：' + positionInfo.intervalX, 'Y：' + positionInfo.intervalY);
			}
			this.reSetPosition();
		},

		/* 滑动切换课表类型 */
		calenderChange(direction) {
			let tempTtype = this.calendarType;
			if (direction) {
				tempTtype = tempTtype == 2 ? 0 : ++tempTtype;
			} else {
				tempTtype = tempTtype == 0 ? 2 : --tempTtype;
			}
			this.setCalendarType(tempTtype);
		},

		/* 重置滑动参数 */
		reSetPosition() {
			let tempPara = {
				startX: 0,
				startY: 0,
				endX: 0,
				endY: 0,
				intervalX: 0,
				intervalY: 0
			};
			this.positionInfo = tempPara;
		}
	},
	computed: {
		...mapState('edu', ['calendarType', 'eduSwitch']),
		/**距离滑动绝对值判断
		 * positionInfo 自定义的距离数据对象
		 * limit 范围阈值
		 * 滑动绝对值 > limit  返回true  反之false
		 * */
		getAbsState(positionInfo, limit) {
			return (positionInfo, limit) => {
				if (Math.abs(positionInfo.intervalX) > limit && Math.abs(positionInfo.intervalY) < 90) {
					return true;
				} else {
					return false;
				}
			};
		},

		/**动态设置填充块高度
		 * 确保有足够的区域用于 触发滑动事件
		 * */
		getDynamicHeight() {
			return {
				width: 100 + '%',
				minHeight: 80 + 'vh'
			};
		},

		/* 获取课程类型选项卡样式 */
		getTabStyle(type) {
			return type => {
				return type == this.calendarType ? 'selectType' : '';
			};
		},

		/* 判断是否允许刷新 */
		isCantRefresh(nowTime, lastTime) {
			return (nowTime, lastTime) => {
				return nowTime - lastTime > 3600 ? true : false;
			};
		}
	},
	// 用户点击右上角分享
	onShareAppMessage(res) {
		// #ifdef MP-QQ
		qq.showShareMenu({
			showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment']
		});
		// #endif
		console.log(res);
	},
	//切换tabbar关闭模态框
	onHide() {
		this.setModelShow(false);
		this.setCourseDetails(null);
	},
	onReady() {
		try {
			const value = uni.getStorageSync('eduInfo');
			if (value) {
				this.$store.commit('edu/setEduInfo', value);
			} else {
				throw '获取eduInfo缓存数据为' + value;
			}
		} catch (e) {
			console.warn(e);
		}
	},
	// 允许下拉刷新
	onPullDownRefresh() {
		let key = this.lastTimeKEY;
		let lastTime = uni.getStorageSync(key),
			nowTime = parseInt(new Date().valueOf() / 1000);
		//符合条件  通过ref调用组件内的课表刷新方法
		if (this.isCantRefresh(nowTime, lastTime)) {
			this.$refs.uToast.show({
				type: 'success',
				message: '尝试更新课表数据',
				duration: 1000,
				position: 'bottom'
			});
			this.$refs.course.getCourse();

			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 2000);
		} else {
			this.$refs.uToast.show({
				type: 'error',
				message: '距离上次更新还没过1小时，请稍后再试',
				duration: 1500,
				position: 'bottom'
			});
			uni.stopPullDownRefresh();
		}
	}
};
</script>

<style scoped lang="scss">
@mixin sti_top {
	position: -webkit-sticky;
	position: sticky;
	top: 0;
}
.home_wrap {
	.typeSwitch {
		$pad_lr: 5%;
		@include sti_top;
		z-index: 10;
		padding-left: $pad_lr;
		padding-right: $pad_lr;
	}
}
</style>
