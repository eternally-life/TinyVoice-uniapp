export default {
	/* 此方法有问题？  等待修复？ */
	eduTime(state) {
		return {
			year: state.nowTime.getFullYear(),
			month: state.nowTime.getMonth(),
			date: state.nowTime.getDate(),
			weekSeq: null,
			weekDay: null

		}
	},

	/* 学期序号，日序号依据课程数据的seq，周序号依据数组序号0开始 */
	/* 获取奇数序号 */
	getSingular(state, index) {
		return index => {
			if (state.calendarType == 0) {

				return index * 2 - 1;
			} else if (state.calendarType == 1) {

				return (index + 1) * 2 - 1;
			}
		}
	},

	/* 获取偶数序号 */
	getEvenNum(state, index) {
		return index => {
			if (state.calendarType == 0) {

				return index * 2;
			} else if (state.calendarType == 1) {

				return (index + 1) * 2 == 12 ? ' ' : (index + 1) * 2;
			}
		}
	},

	/* 获取日历标记样式 返回今日\选择日期 */
	dayStyle() {
		return index => {
			if (index != this.flagItem && index == this.flagItem_static) {
				return 'today';
			} else if (index == this.flagItem) {
				return 'selectDay';
			}
		};
	},

	/* 获取课表背景地址 */
	getBgImg(state, index) {
		return index => ({
			"background-color": state.colorList[index],
			'background-image': 'url(' + state.bgPrefix + (index + 1) + state.bgSuffix + ')'
		});
	},

	/* 是否开启动画
	 * 返回 animated 这个类 以显示动画
	 * 接收type String类型，否则返回
	 * 判断依据 eduSwitch 下的设置值
	 * */
	isOpenAnimat(state, type) {
		return type => {
			switch (type) {
				case 'course':
					if (state.eduSwitch.animateState_course) {
						return 'animated'
					}
					break;
				case 'course_details':
					if (state.eduSwitch.animateState_course_details) {
						return 'animated'
					}
					break;
				case 'edu':
					if (state.eduSwitch.animateState_edu) {
						return 'animated'
					}
					break;
				default:
					console.error("【动画调用】未知参数：", type);
					return ''
					break;
			}
		}
	}

}
