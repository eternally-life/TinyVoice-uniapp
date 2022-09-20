export default {
	online: false, //教务允许接入状态
	calendarType: 1, // 课表类型 0日 1周 2月
	timeNode: 0, //开学第一天 每86400一天
	nowTime: new Date(),
	// 时间
	eduTime: {
		year: null,
		month: null,
		date: null,
		weekSeq: null,
		weekDay: null
	},
	// 周数临时时间
	tempEduTime2: null,
	//时间显示 标记周课表
	week2TimeFlage: false,
	// 单周数据
	oneWeekCourse: [],
	// 月份最大日期
	monthType: {
		'olympic': [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
		'normal': [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
	},
	/** transferType 数据中转类型
	 * -1 	默认		
	 * 0-	数据包含：学年、学期		适用查成绩、英语均分
	 * 1-	数据包含：学年、学期、实选、累计	适用学分绩
	 * 2-	数据包含：学号、学年、学期	适用代查
	 * */
	transferType: 0,
	// 星期汉字表示
	week_GB: ['一', '二', '三', '四', '五', '六', '日'],
	// 当月最大日期
	monthMaxDay: 0,
	// 当月前填充
	fillDay: 0,
	rank: ['（大一）', '（大二）', '（大三）', '（大四）', '（大五）', '（大六）', '（大七）', '（大八）'],
	// 课表显示时间
	coureTimeList: [
		['第1节：8:25-9:10', '第2节：9:20-10:05'],
		['第3节：10:25-11:10', '第4节：11:20-12:05'],
		['第5节：15:00-15:45', '第6节：15:55-16:40'],
		['第7节：17:00-17:45', '第8节：17:55-18:40'],
		['第9节：19:40-20:25', '第10节：20:35-21:20'],
		['第11节：21:30-22:15'],
	],
	// 学生信息
	eduInfo: null,
	// 课表背景前、后缀
	bgPrefix: 'https://tinyvoice.oss-cn-guangzhou.aliyuncs.com/material/edu/past_',
	bgSuffix: '.png',
	// 课表背景匹配色
	colorList: ['#accce8', '#e9af94', '#b4c3d0', '#eacfa9', '#5c80b6', '#949595'],
	modelShow: false, //课程详情模态框
	courseDetails: null, //课程详情模态框参数
	eduSwitch: { //教务相关开关
		firstOpen: false, //初始页显示教务开关
		animateState_course_details: true, //课程详情动画开关
		animateState_course: true, //课表动画开关
		animateState_edu: true, //教务动画
		awkwardText: true, //尴尬的选项
		sensitivity: 60, //课表滑动灵敏度
		auto_Refresh: false, //自动更新开关
		auto_Refresh_time: 5 //自动更新间隔 天数
	}
}
