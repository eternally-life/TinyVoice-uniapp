export default {
	/* 设置教务状态 */
	setOnlineState(state, statu) {
		state.online = statu;
	},

	/* 修改日期\课表类型 */
	setCalendarType(state, type) {
		state.calendarType = type;
	},

	/* 设置教务基准时间 */
	setEduTime(state, newValue) {
		state.eduTime = newValue;
		// 将临时时间同步为当前最新时间
		// 此处分开赋值 是为了防止 引用锁 带来的数据串扰
		state.tempEduTime2 = {
			year: newValue.year,
			month: newValue.month,
			date: newValue.date,
			weekSeq: newValue.weekSeq,
			weekDay: newValue.weekDay
		};
	},

	/* 设置单周数据 */
	setOneWeekCourse(state, newValue) {
		state.oneWeekCourse = newValue;
	},

	/* 设置本月前面空的日期 */
	setFillDay(state, emptNum) {
		state.fillDay = emptNum;
	},

	/* 设置本月最大日期 */
	setMonthMaxDay(state, max) {
		state.monthMaxDay = max;
	},

	/* 修改教务数据中转类型 */
	setTransferType(state, type) {
		state.transferType = type;
	},

	/* 设置个人教务数据 */
	setEduInfo(state, paar) {
		state.eduInfo = paar;
	},

	/* 设置课程模态框开关状态 */
	setModelShow(state, flag) {
		state.modelShow = flag;
	},

	/* 设置课程模态框数据 */
	setCourseDetails(state, para) {
		state.courseDetails = para;
		if (para) {
			//传入不为空 则打开模态框
			state.modelShow = true;
		}
	},

	/* 修改课周数显示标记 */
	setWeek2TimeFlage(state, para) {
		state.week2TimeFlage = para;
	},

	/* 修改周数所用的临时时间 */
	setTempEduTime2(state, newValue) {
		state.tempEduTime2 = newValue;
	},

	/* 设置家务开关状态 */
	setEduSwitch(state, newValue) {
		state.eduSwitch = newValue;
	}
}
