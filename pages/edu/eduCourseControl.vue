<!-- 课表样式总控 -->
<template>
	<view>
		<u-toast ref="uToast"></u-toast>
		<edu-course-style1 v-show="calendarType == 0" />
		<edu-course-style2 v-show="calendarType == 1" :courseData="oneWeekCourse" />
		<edu-course-style3 v-show="calendarType == 2" />
	</view>
</template>

<script>
import { mapState, mapMutations, mapAction } from 'vuex';
import { eduGuetCourseTable_Post } from '@/api/GUET/教务开放接口';
const manageData = require('@/utils/manageData.js');
export default {
	name: 'eduCourseControl',
	data() {
		return {
			all_course_data: null,
			oneWeekCourse: [],
			timeInfo: {
				weekActiveFlag: 0, //用于显示的周数
				nowWeek: 0, //当前周
				nowNum: 0 //今日周几
			},
			onecFlag: true,
			watchDogID: 0, //看门狗ID
			lastTimeKEY: getApp().globalData.storageKey.courseFTimeKEY,
			nowTimeNode: new Date().valueOf() / 1000
		};
	},
	computed: {
		...mapState('edu', ['calendarType', 'eduTime', 'tempEduTime2', 'week2TimeFlage', 'eduSwitch'])
	},
	methods: {
		// 读取本地课表缓存
		getStroCourse() {
			try {
				const value = uni.getStorageSync(getApp().globalData.storageKey.courseKEY);
				//有缓存 直接获取
				if (value) {
					// this.selfMsg('加载成功', 'success');
					// console.log(value);
					this.all_course_data = value;

					this.weekRender(this.timeInfo.weekActiveFlag);
				} else {
					// this.selfMsg('正在验证', 'warning');
					console.warn('无课表数据缓存，通过token获取接口数据');
					this.getCourse();
				}
			} catch (e) {
				console.error('课表键缓存读取错误', e);
			}
		},

		/**渲染一周数据
		 * 特殊判断：
		 * 		传入时间超出最大数据长度时 直接渲染数据index为0的数据。并提示放假
		 * */
		weekRender(week) {
			try {
				//传入周数 > 最大数据长度时 	渲染第一周
				if (week >= this.all_course_data.length) {
					this.oneWeekCourse = manageData.dataDeposit(this.all_course_data, 0);
					this.$refs.uToast.show({ type: 'success', message: '第1周课表加载成功', duration: 1000 });
				} else {
					//传入周数 < 最大数据长度时
					this.oneWeekCourse = manageData.dataDeposit(this.all_course_data, week);
					this.$refs.uToast.show({
						type: 'success',
						message: '第' + (week + 1) + '周课表加载成功',
						duration: 1000
					});

					// 单次渲染
					this._onceRender();
				}
			} catch (e) {
				console.error('数据渲染出错', e);
				this.$ShowToastErr('数据渲染异常，下拉刷新');
			}
		},
		/* 数据处理 组*/
		/** 数据分组
		 * data 为 数组 仅处理接口获取的所有数据
		 * */
		grouping(data) {
			if (data) {
				this.all_course_data = manageData.grouping(data);
				this.weekRender(this.timeInfo.weekActiveFlag);
				return this.all_course_data;
			} else {
				console.warn('无参数传递');
			}
		},

		/* 接口请求课表 */
		async getCourse() {
			let token = getApp().globalData.token;
			// console.log('token: ', token);
			if (token != null || token != undefined) {
				// 生成看门狗
				this.creatWatchDog();

				//判断是否离线
				let temp = await eduGuetCourseTable_Post({term: '20221'}).then(res => {
					console.log('课表请求', res);
					if (res.data.code == 200) {
						//清除看门狗
						this.killWatchDog();

						// 缓存当前刷新时间戳
						this.setNewRefreshTime();

						// this.selfMsg('验 证 成 功\n正在获取课表', 'success');
						this.$ShowToastSuc('验证成功，正在获取课表');

						// 获取到新课表数据时  开启store单周数据锁
						this.onecFlag = true;
						return this.grouping(res.data.data);
					} else {
						// this.$ShowToastErr('课表请求异常');
						this.$refs.uToast.show({
							type: 'error',
							message: '课表请求异常：' + res.data.code,
							duration: 1000,
							position: 'bottom'
						});
					}
				});
				// 存储数据
				this.saveCourse(temp);
			} else {
				// this.isOnline = false; //离线状态
				// this.$ShowToastErr('token异常');
				this.$refs.uToast.show({ type: 'error', message: 'token异常', duration: 1000, position: 'bottom' });
			}
			return 0;
		},

		// 存储课表数据
		saveCourse(para) {
			let key = getApp().globalData.storageKey.courseKEY;
			// console.log(this.all_course_data);
			let saveStatu = manageData.saveData(key, para);
			if (saveStatu) {
				console.warn(key + '数据缓存成功');
			} else {
				console.error(key + '缓存错误');
				// this.$ShowToastErr('缓存错误，教务异常');
				this.$refs.uToast.show({
					type: 'error',
					message: '缓存错误，教务异常',
					duration: 1000,
					position: 'bottom'
				});
			}
		},

		/**单次渲染
		 * 仅渲染当前一周数据
		 * 将数据写入store
		 **/
		_onceRender() {
			if (!this.onecFlag) return;
			this.onecFlag = !this.onecFlag;
			this.$store.dispatch('edu/actoneWeekCourse', this.oneWeekCourse);
		},

		/* 更新缓存中的最后刷新时间 */
		setNewRefreshTime() {
			let key = this.lastTimeKEY,
				newValue = parseInt(this.nowTimeNode);
			uni.setStorageSync(key, newValue);
		},

		/* 自动更新课表  */
		autoRefrsh() {
			let nowTime = this.nowTimeNode;
			let flag = this.eduSwitch.auto_Refresh,
				timeRange = this.eduSwitch.auto_Refresh_time;
			// 当自动更新关闭时
			if (!flag) {
				console.warn('课表自动更新---关闭');
				return 0;
			}
			// 自动更新开启时  获取缓存的时间
			const value = uni.getStorageSync(this.lastTimeKEY);
			if (value) {
				let diffDay = Number(((nowTime - value) / 86400).toFixed(2));
				console.log(diffDay, typeof diffDay);
				//差值超过  则尝试更新
				if (diffDay > timeRange) {
					console.warn(diffDay, '超过', timeRange);
					this.getCourse();
				}
			} else {
				//没有数据 则记录当前时间
				this.setNewRefreshTime();
			}
		},

		/*=== 外部ref方法 ===*/
		/**切换周次数据
		 * 接收方向参数 direction
		 * 	左<-右:true		取数组index右移+
		 * 	左->右:false		取数组index左移-
		 * */
		ref_WeekDataChange(direction) {
			let tempSeq = this.week2TimeFlage ? this.tempEduTime2.weekSeq : this.eduTime.weekSeq;
			//无数据  阻断操作
			if (this.all_course_data == null || this.all_course_data == undefined) {
				// this.selfMsg('当前课程无数据\n请检查登录状态', 'error');
				this.$ShowToastErr('没有课程数据~');
				return 0;
			}

			if (direction && tempSeq < this.all_course_data.length - 1) {
				uni.$emit('dataChange', direction);
				this.weekRender(++tempSeq);
			} else if (!direction && tempSeq > 0) {
				uni.$emit('dataChange', direction);
				this.weekRender(--tempSeq);
			} else {
				this.$refs.uToast.show({ type: 'error', message: '课表到头了~', duration: 1000 });
			}
		},

		/* ======请求守护进程====== */
		/* 生成看门狗 */
		creatWatchDog() {
			this.watchDogID = setTimeout(() => {
				// this.$ShowToastErr('服务器异常');
				this.$refs.uToast.show({ type: 'error', message: '服务器异常', duration: 1000, position: 'bottom' });
			}, 3000);
		},

		/* 清除看门狗 */
		killWatchDog() {
			clearTimeout(this.watchDogID);
		}
	},
	unmounted() {
		uni.$off('pull');
		uni.$off('goBack');
	},
	mounted() {
		// 触发外部刷新
		uni.$on('pull', () => {
			this.getCourse();
		});
		//返回本周
		uni.$on('goBack', () => {
			this.weekRender(this.eduTime.weekSeq);
		});
		// 挂载完成再操作
		try {
			[this.timeInfo.nowWeek, this.timeInfo.nowNum] = manageData.timeAnalysis(this.$store.state.edu.timeNode);
			this.timeInfo.weekActiveFlag = this.timeInfo.nowWeek;
			// 更新vuex中的时间公共数据
			this.$store.dispatch('edu/setWeek', [this.timeInfo.nowWeek, this.timeInfo.nowNum]);
			// console.log('时间分析', this.timeInfo);

			this.getStroCourse();
		} catch (e) {
			console.error(e);
		}
		/* 挂载完成进行自动更新判断 */
		this.autoRefrsh();
	}
};
</script>

<style scoped lang="scss"></style>
