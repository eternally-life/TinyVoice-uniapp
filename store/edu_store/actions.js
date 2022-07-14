export default {
	/**更新全局 周数seq、星期
	 * */ 
	setWeek(state, newValue) {
		console.log(state.getters.eduTime, newValue);
		let tempData = state.getters.eduTime;
		[tempData.weekSeq, tempData.weekDay] = newValue;
		state.commit('setEduTime', tempData);
	},
	/*设置周课表数据
	 * 用于日显示、月初显示读取
	 * */
	actoneWeekCourse(state, newValue) {
		state.commit('setOneWeekCourse', newValue);
	}
}
