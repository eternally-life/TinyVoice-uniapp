import Details from "./scoreDetails.js";

/**体测总成绩各项目占比依据
	15%		BMI	
	15% 	肺活量	
	10% 	坐位体前屈	
	10% 	立定跳远	
	20% 	50m	
	20%+ 	8h/1km	
	10%+	引体向上/仰卧起坐	
 其中 长跑、引体、仰卧起坐 是单独在总成绩上加分，不计入单项分数
*/

/**所有计算方法统一参数
 * gender	性别			true-男	false-女
 * grade	年级		0 - 大一大二		1 - 大三大四
 * value	输入的数值
 * 所有计算方法调用的判断，均先 年级、再性别
 * */

/* 合并时间转换为秒 */
function getTime(minute, second) {
	return Number(minute * 60) + Number(second);
}

export default {
	/* 田径类	加分 */
	getExtraPoints_run(gender, grade, minute, second) {
		let value = getTime(minute, second);
		if (value == 0) {
			return 0;
		}
		if (grade == 0) {
			return gender ? Details.plus_run1000(197, value) : Details.plus_run800(198, value);
		} else if (grade == 1) {
			return gender ? Details.plus_run1000(195, value) : Details.plus_run800(196, value);
		}
		return 0;
	},

	/* 力量类	加分 */
	getExtraPoints_power(gender, grade, value) {
		if (grade == 0) {
			return gender ? Details.plus_pullUp(value, 19) : Details.plus_abdominalCurl(value, 56);
		} else if (grade == 1) {
			return gender ? Details.plus_pullUp(value, 20) : Details.plus_abdominalCurl(value, 57);
		}
		return 0;
	},

	/* BMI分数 */
	getScore_BMI(gender, value) {
		if (gender) {
			return Details.BMI_male(value);
		} else {
			return Details.BMI_female(value)
		}
		return 0;
	},

	/* 跳远分数 */
	getScore_longJump(gender, grade, value) {
		if (grade == 0) {
			return gender ? Details.longJump_male_12(value) : Details.longJump_female_12(value);
		} else if (grade == 1) {
			return gender ? Details.longJump_male_34(value) : Details.longJump_female_34(value);
		}
		return 0;
	},

	/* 肺活量分数 */
	getScore_vitalCapacity(gender, grade, value) {
		if (grade == 0) {
			return gender ? Details.vitalCapacity_male_12(value) : Details.vitalCapacity_female_12(value);
		} else if (grade == 1) {
			return gender ? Details.vitalCapacity_male_34(value) : Details.vitalCapacity_female_34(value);
		}
		return 0;
	},

	/* 短跑分数 */
	getScore_shortRun(gender, grade, value) {
		if (grade == 0) {
			return gender ? Details.run50_male_12(value) : Details.run50_female_12(value);
		} else if (grade == 1) {
			return gender ? Details.run50_male_34(value) : Details.run50_female_34(value);
		}
		return 0;
	},

	/* 长跑分数 */
	getScore_longRun(gender, grade, minute, second) {
		let value = getTime(minute, second);
		if (grade == 0) {
			return gender ? Details.run1000_male_12(value) : Details.run800_female_12(value);
		} else if (grade == 1) {
			return gender ? Details.run1000_male_34(value) : Details.run800_female_34(value);
		}
		return 0;
	},

	/* 坐位体前屈分数 */
	getScore_sittingBodyFlex(gender, grade, value) {
		if (grade == 0) {
			return gender ? Details.sittingBodyFlex_male_12(value) : Details.sittingBodyFlex_female_12(value);
		} else if (grade == 1) {
			return gender ? Details.sittingBodyFlex_male_34(value) : Details.sittingBodyFlex_female_34(value);
		}
		return 0;
	},

	/* 特殊项目分数 */
	getScore_diff_ProjectValue(gender, grade, value) {
		if (grade == 0) {
			return gender ? Details.pullUp_12(value) : Details.abdominalCurl_12(value);
		} else if (grade == 1) {
			return gender ? Details.pullUp_34(value) : Details.abdominalCurl_34(value);
		}
		return 0;;
	}

}
