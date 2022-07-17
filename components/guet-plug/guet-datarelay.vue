<!-- 教务数据选择模块 -->
<template>
	<view class="zoomIn" :class="[isOpenAnimat('edu')]">
		<view class="top_title">选 择 学 期</view>
		<view class="container">
			<!-- 学号 -->
			<view class="item_option flex_input" hover-class="item_hover" hover-stay-time="100" v-if="transferType == 2">
				<text class="iconfont icon_style">&#xe6c0;</text>
				<input type="number" v-model="studentId" :placeholder="placeholderStr" class="inpu_style " @focus="placeholderFlage = true" @blur="placeholderFlage = false" />
			</view>
			<!-- 学年 -->
			<view class="item_option" hover-class="item_hover" hover-stay-time="100" @click="tapEventControl('yearChange')">
				<text class="iconfont icon_style">&#xe63b;</text>
				{{ yearStr }}
			</view>
			<!-- 学期 -->
			<view class="item_option" hover-class="item_hover" hover-stay-time="100" @click="tapEventControl('semesterChange')">
				<text class="iconfont icon_style">&#xe63b;</text>
				{{ semesterStr }}
			</view>
			<view class="item_option" hover-class="item_hover" hover-stay-time="100" @click="tapEventControl('stypeChange')" v-if="transferType == 1">
				<text class="iconfont icon_style">&#xe63b;</text>
				按{{ stypeStr }}选 课程计算
			</view>
			<view class="item_check" @click="tapEventControl('checkChang')" v-if="transferType == 1">
				<text class="check" :class="checkClass">√</text>
				累加 到全部学期
			</view>
		</view>
		<view class="btn" hover-class="checkActive" hover-stay-time="100" @click="tapEventControl('getPara')">查 询</view>
	</view>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
	name: 'guet-datarelay',
	data() {
		return {
			placeholderFlage: false, //输入框默认标记
			outFlag: false, //大于8年的老生 禁止显示
			yearStrArr: [],
			termArr: [],
			termIndex: 0,
			studentId: '',
			Index_Semester: 1, //学期索引
			stype: 0, //1-应选， 0-实选
			check: 0 //1-单个学期，0-累计学期
		};
	},
	methods: {
		/**点击事件控制
		 * 集中处理所有事件触发条件
		 * */
		tapEventControl(evenName) {
			if (this.outFlag) {
				console.error('参数获取异常');
				return;
			}
			switch (evenName) {
				case 'getPara':
					this.getPara();
					break;
				case 'yearChange':
					this.yearChange();
					break;
				case 'semesterChange':
					this.semesterChange();
					break;
				case 'checkChang':
					this.checkChang();
					break;
				case 'stypeChange':
					this.stypeChange();
					break;
			}
		},

		/* 点击传输参数 */
		getPara() {
			let term_pre = this.termArr[this.termIndex].toString(),
				term_sub = this.Index_Semester.toString();
			let termObj = {
				str: this.yearStr + this.semesterStr,
				term: term_pre + term_sub
			};
			if (this.transferType == 0) {
				//transferType = 0 传递普通参数
				// console.log('传递普通数据 trem', termObj);
				this.$emit('getEduPara', termObj);
			} else if (this.transferType == 1) {
				//transferType = 1 传递学分绩参数
				let allObj = {
					...termObj,
					stid: this.eduInfo.stid.toString(),
					stype: this.stype.toString(),
					chk: this.check.toString()
				};
				// console.log('传递学分绩参数', allObj);
				this.$emit('getEduPara', allObj);
			} else if (this.transferType == 2) {
				//transferType = 2 传递代查参数
				let allObj = {
					...termObj,
					studentId: this.studentId.toString()
				};
				this.$emit('getEduPara', allObj);
			}
		},

		/* 学年 切换 */
		yearChange() {
			if (this.termIndex < this.termArr.length - 1) {
				this.termIndex++;
			} else {
				this.termIndex = 0;
			}
		},

		/* 学期 切换 */
		semesterChange() {
			this.Index_Semester = this.Index_Semester == 1 ? 2 : 1;
		},

		/* 累计 切换 */
		checkChang() {
			this.check = this.check == 0 ? 1 : 0;
		},

		/* 实选 切换 */
		stypeChange() {
			this.stype = this.stype == 0 ? 1 : 0;
		},

		/* 学期自适应 */
		termAdapt() {
			let joinYear = Number(this.eduInfo.grade),
				date = this.nowTime;
			let nowYear = date.getFullYear();
			let nowMonth = date.getMonth() + 1;
			var yearStrArr = [],
				termArr = [];
			let step = 0;
			let flag;
			//判断在校时间
			if (nowYear - joinYear >= 8) {
				console.log('大八了还没毕业？');
				step = 8;
			} else if (nowYear - joinYear <= 8 && nowYear - joinYear >= 0) {
				step = nowYear - joinYear;
				console.log('在校' + step + '年');
			} else {
				console.warn('年份自适应判断异常');
				console.warn('nowYear：' + nowYear, 'joinYear：' + joinYear);
				this.outFlag = true;
				return;
			}
			// 判断上下半年 以确定是否为新学期的9月
			if (nowMonth < 8) {
				console.log(nowYear + '上半年，第二学期');
				this.Index_Semester = 2;
				flag = nowYear;
			} else {
				console.log(nowYear + '下半年，第一学期');
				this.Index_Semester = 1;
				flag = nowYear + 1;
			}
			for (let i = joinYear, j = 0; i < flag; i++, j++) {
				if (this.rank[j] == undefined) break; //终止异常参数
				let str = i + ' - ' + (i + 1) + this.rank[j];
				console.log(str);
				yearStrArr.push(str);
				termArr.push(i);
			}
			this.termArr = termArr.reverse(); //tem拼接
			this.yearStrArr = yearStrArr.reverse(); //显示字符串
			// console.log(this.termArr, this.yearStrArr);
		}
	},
	onReady() {
		console.log('用户信息', this.eduInfo);
		this.termAdapt();
	},
	computed: {
		/* 动态默认字符串 */
		placeholderStr() {
			return this.placeholderFlage ? '' : '输入学号';
		},
		semesterStr() {
			return (this.Index_Semester == 1 ? '上 ' : '下 ') + '学期';
		},
		checkClass() {
			return this.check == 0 ? 'check_active' : 'check_no';
		},
		stypeStr() {
			return this.stype == 0 ? ' 实' : ' 应';
		},
		yearStr() {
			return this.yearStrArr[this.termIndex];
		},
		...mapGetters('edu', ['isOpenAnimat']),
		...mapState('edu', ['nowTime', 'transferType', 'rank', 'eduInfo'])
	}
};
</script>

<style scoped lang="scss">
$main_w: 290px;

@mixin currency {
	width: $main_w;
	margin: 0 auto;
	background-color: #ffffff;
}

@mixin box_mar_pad {
	margin-left: 16px;
}
@mixin item {
	font-weight: bold;
}

@mixin check_about {
	font-size: 10px;
	line-height: 10px;
}

.top_title {
	@include currency;
	font-size: 20px;
	color: #aeaeae;
	font-weight: bold;
	line-height: 43px;
	text-align: center;
	margin-top: 22vh;
	border-radius: 10px 10px 0px 0px;
	border-bottom: 1px solid hsla(0, 0%, 44%, 0.1);
}
.container {
	@include currency;
	opacity: 1;
	padding-top: 16px;
	padding-bottom: 16px;
	.flex_input {
		display: flex;
		align-items: center;
		/deep/ .inpu_style {
			height: 100%;
			font-size: 14px;
		}
	}
	.item_option {
		height: 44px;
		@include box_mar_pad;
		margin-right: 16px;
		margin-bottom: 10px;
		color: #a2a2a2;
		font-size: 14px;
		@include item;
		background-color: #f5f5f5;
		padding-left: 10%;
		line-height: 44px;
		border-radius: 10px;
		.icon_style {
			margin-right: 5%;
		}
	}
	.item_hover {
		background-color: #ebebeb;
	}
	.item_check {
		@include item;
		@include box_mar_pad;
		@include check_about;
		padding-left: 10px;
		color: #979797;

		.check {
			display: inline-block;
			width: 10px;
			height: 10px;
			margin-right: 8px;
			border-radius: 50%;
			color: #fff;
			font-weight: bold;
			@include check_about;
		}
		.check_active {
			background-color: #60c5ba;
			border: 1px solid transparent;
		}
		.check_no {
			border: 1px solid #bababa;
			background-color: #ffffff;
		}
	}
}
.btn {
	width: 290px;
	height: 44px;
	margin: 0 auto;
	background-color: #60c5ba;
	border-radius: 0px 0px 10px 10px;
	line-height: 44px;
	text-align: center;
	font-size: 14px;
	font-weight: 400;
	color: #fff;
}
.checkActive {
	background-color: #5dbfb4;
}
</style>
