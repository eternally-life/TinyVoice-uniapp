<!-- 体测计算 -->
<template>
	<view>
		<u-toast ref="uToast"></u-toast>
		<u-modal :show="show" title="单 项 得 分" @confirm="showModleChange()">
			<view class="slot-content"><rich-text :nodes="content"></rich-text></view>
		</u-modal>
		<!-- 顶部成绩区块 -->
		<view class="result_container">
			<view class="box">
				<view class="tit">成绩</view>
				<view class="result">{{ score_all }}{{ extraPoints }}</view>
			</view>
			<view class="box">
				<view class="tit">BMI</view>
				<view class="result">{{ BMI_result }}</view>
			</view>
		</view>
		<!-- 中间表单域 -->
		<!-- 注意  不遍历 是因为存在特殊输入框，切遍历后  存在输入异常 -->
		<view class="from_container">
			<view class="input_list" style="display: block !important;">
				<u-subsection :list="gradeList" :current="grade" @change="sectionChange" activeColor="#60c5ba" mode="subsection"></u-subsection>
			</view>
			<view class="input_list" @click="gender = !gender" hover-class="hoverStyle" hover-start-time="100">
				<view class="tit">性别</view>
				<view class="input_container">{{ getStr_Gender }} 生</view>
			</view>
			<view class="input_list">
				<view class="tit">50米</view>
				<view class="input_container">
					<view class="run_input">
						<view class="input_control">
							<u-input @blur="lostFocus()" type="digit" inputAlign="center" border="bottom" v-model="val_obj.val_50" placeholder="0"></u-input>
						</view>
						秒
					</view>
				</view>
			</view>
			<view class="input_list">
				<view class="tit">{{ getStr_diffProject }}</view>
				<view class="input_container">
					<view class="nomal_input">
						<u-input @blur="lostFocus()" type="number" inputAlign="right" border="bottom" v-model="val_obj.diff_ProjectValue" placeholder="0"></u-input>
					</view>
					个
				</view>
			</view>
			<view class="input_list">
				<view class="tit">{{ getStr_longRun }}米</view>
				<view class="input_container">
					<view class="run_input">
						<view class="input_control">
							<u-input @blur="lostFocus()" type="number" inputAlign="center" border="bottom" v-model="val_obj.m_8h_1k" placeholder="0"></u-input>
						</view>
						分
						<view class="input_control">
							<u-input @blur="lostFocus()" type="number" inputAlign="center" border="bottom" v-model="val_obj.s_8h_1k" placeholder="0"></u-input>
						</view>
						秒
					</view>
				</view>
			</view>
			<view class="input_list">
				<view class="tit">身高</view>
				<view class="input_container">
					<view class="nomal_input">
						<u-input @blur="lostFocus()" type="digit" inputAlign="right" border="bottom" v-model="val_obj.height" placeholder="0"></u-input>
					</view>
					{{ getStr_height }}
				</view>
			</view>
			<view class="input_list">
				<view class="tit">体重</view>
				<view class="input_container">
					<view class="nomal_input">
						<u-input @blur="lostFocus()" type="digit" inputAlign="right" border="bottom" v-model="val_obj.weight" placeholder="0"></u-input>
					</view>
					千克
				</view>
			</view>
			<view class="input_list">
				<view class="tit">肺活量</view>
				<view class="input_container">
					<view class="nomal_input">
						<u-input @blur="lostFocus()" type="digit" inputAlign="right" border="bottom" v-model="val_obj.vitalCapacity" placeholder="0"></u-input>
					</view>
					毫升
				</view>
			</view>
			<view class="input_list">
				<view class="tit">立定跳远</view>
				<view class="input_container">
					<view class="nomal_input">
						<u-input @blur="lostFocus()" type="digit" inputAlign="right" border="bottom" v-model="val_obj.longJump" placeholder="0"></u-input>
					</view>
					厘米
				</view>
			</view>
			<view class="input_list">
				<view class="tit">坐位体前屈</view>
				<view class="input_container">
					<view class="nomal_input">
						<u-input @blur="lostFocus()" type="digit" inputAlign="right" border="bottom" v-model="val_obj.sittingBodyFlex" placeholder="0"></u-input>
					</view>
					厘米
				</view>
			</view>
		</view>
		<!-- 底部按钮区 -->
		<view class="btn_view">
			<view class="btn_list"><u-button type="error" text="清空所有" shape="circle" @click="restart()"></u-button></view>
			<view class="btn_list"><u-button type="primary" text="查看分数详情" shape="circle" @click="showModleChange()"></u-button></view>
		</view>
	</view>
</template>

<script>
import computeUtil from './scoreCalculation.js';
export default {
	data() {
		return {
			key: getApp().globalData.storageKey.sportKey,
			show: false,
			gender: true,
			grade: 0,
			gradeList: ['大 一 / 大 二', '大 三 / 大 四'],
			val_obj: {
				weight: '', //体重
				height: '', //身高
				longJump: '', //立定跳远
				vitalCapacity: '', //肺活量
				sittingBodyFlex: '', //坐位体前屈
				diff_ProjectValue: '', //不同的项目 （引体、仰卧起坐）
				val_50: '', //50米跑
				m_8h_1k: '', //分钟-800/100米
				s_8h_1k: '' //秒-800/1000米
			}
		};
	},
	methods: {
		/* 组件方法 切换年级*/
		sectionChange(index) {
			this.grade = index;
			this.saveStorageInput();
		},

		/* 切换 显示/隐藏 模态框 */
		showModleChange() {
			this.show = !this.show;
		},

		/* 输入框失去焦点时 存储*/
		lostFocus() {
			this.saveStorageInput();
		},

		/* 存储当前输入 */
		saveStorageInput() {
			try {
				uni.setStorageSync(this.key, this.getPageInput());
				this.$refs.uToast.show({ type: 'success', message: '成绩存储成功', duration: 1000 });
			} catch (e) {
				this.$refs.uToast.show({ type: 'error', message: '数据存储失败', duration: 1000 });
			}
		},

		/* 读取输入缓存 */
		getStorageInput() {
			try {
				const value = uni.getStorageSync(this.key);
				if (value) {
					this.$refs.uToast.show({ type: 'success', message: '记录读取成功', duration: 1000, position: 'bottom' });
					this.setPageInput(value);
				} else {
					this.$refs.uToast.show({ type: 'error', message: '没有输入记录', duration: 1000, position: 'bottom' });
				}
			} catch (e) {
				// error
			}
		},

		/* 获取当前页面输入内容 */
		getPageInput() {
			let other = { gender: this.gender, grade: this.grade };
			let tempAllData = { ...other, ...this.val_obj };
			return tempAllData;
		},

		/* 缓存替换页面数据 */
		setPageInput(value) {
			let { gender, grade, ...val_obj } = value;
			this.gender = gender;
			this.grade = grade > 1 ? 1 : grade;
			this.val_obj = val_obj;
		},

		/* 清空所有输入框	并清除缓存 */
		restart() {
			this.val_obj = {
				weight: '', //体重
				height: '', //身高
				longJump: '', //立定跳远
				vitalCapacity: '', //肺活量
				sittingBodyFlex: '', //坐位体前屈
				diff_ProjectValue: '', //不同的项目 （引体、仰卧起坐）
				val_50: '', //50米跑
				m_8h_1k: '', //分钟-800/100米
				s_8h_1k: '' //秒-800/1000米
			};
			uni.removeStorageSync(this.key);
			this.$refs.uToast.show({ type: 'success', message: '重置成功', duration: 1000, position: 'bottom' });
		}
	},
	onReady() {
		this.getStorageInput();
	},
	computed: {
		/* 获取性别文本 */
		getStr_Gender() {
			return this.gender ? '男' : '女';
		},
		getStr_longRun() {
			return this.gender ? '1000' : '800';
		},
		getStr_diffProject() {
			return this.gender ? '引体向上' : '仰卧起坐';
		},
		getStr_height() {
			return this.val_obj.height > 3 ? '厘米' : '米';
		},
		// 总成绩
		score_all() {
			return Number(
				(
					this.score_BMI * 0.15 +
					this.score_vitalCapacity * 0.15 +
					this.score_sittingBodyFlex * 0.1 +
					this.score_longJump * 0.1 +
					this.score_longRun * 0.2 +
					this.score_shortRun * 0.2 +
					this.score_diff_ProjectValue * 0.1
				).toFixed(2)
			);
		},

		/* 模态框数据 */
		content() {
			return `
				(15%) BMI			：${this.score_BMI} 分<br>
				(20%) 50米		：${this.score_shortRun} 分<br>
				(20%) ${this.getStr_longRun}米	：${this.score_longRun} 分<br>
				(15%) 肺活量 		：${this.score_vitalCapacity} <br>
				(10%) ${this.getStr_diffProject}	：${this.score_diff_ProjectValue} 分<br>
				(10%) 立定跳远		：${this.score_longJump} 分<br>
				(10%) 坐位体前屈	：${this.score_sittingBodyFlex} 分<br>
				`;
		},

		/* 额外加分 */
		extraPoints() {
			let val_run = computeUtil.getExtraPoints_run(this.gender, this.grade, this.val_obj.m_8h_1k, this.val_obj.s_8h_1k),
				val_power = computeUtil.getExtraPoints_power(this.gender, this.grade, this.val_obj.diff_ProjectValue);
			let val = val_run + val_power;
			if (val != 0 && typeof val == 'number') {
				return ' + ' + val;
			} else {
				return '';
			}
		},

		/* BMI指数 */
		BMI_result() {
			let weight = this.val_obj.weight,
				height = this.val_obj.height > 3 ? this.val_obj.height / 100 : this.val_obj.height;
			//身高单位自适应判断 不应该有高于3m的人
			height = Math.pow(height, 2);
			if (weight && height) {
				let aaa = Number((weight / height).toFixed(1));
				return aaa;
			} else {
				return 0;
			}
		},

		/* BMI分数 */
		score_BMI() {
			return computeUtil.getScore_BMI(this.gender, this.BMI_result);
		},

		/* 跳远分数 */
		score_longJump() {
			return computeUtil.getScore_longJump(this.gender, this.grade, this.val_obj.longJump);
		},

		/* 肺活量分数 */
		score_vitalCapacity() {
			return computeUtil.getScore_vitalCapacity(this.gender, this.grade, this.val_obj.vitalCapacity);
		},

		/* 短跑分数 */
		score_shortRun() {
			return computeUtil.getScore_shortRun(this.gender, this.grade, this.val_obj.val_50);
		},

		/* 长跑分数 */
		score_longRun() {
			return computeUtil.getScore_longRun(this.gender, this.grade, this.val_obj.m_8h_1k, this.val_obj.s_8h_1k);
		},

		/* 坐位体前屈分数 */
		score_sittingBodyFlex() {
			return computeUtil.getScore_sittingBodyFlex(this.gender, this.grade, this.val_obj.sittingBodyFlex);
		},

		/* 特殊选项分数 引体向上/仰卧起坐 */
		score_diff_ProjectValue() {
			return computeUtil.getScore_diff_ProjectValue(this.gender, this.grade, this.val_obj.diff_ProjectValue);
		}
	}
};
</script>

<style scoped lang="scss">
@mixin flex_box_father {
	display: flex;
	align-items: center;
}
.result_container {
	width: 90vw;
	height: 75px;
	margin: 20px auto;
	background-color: #fff;
	border-radius: 10px;
	@include flex_box_father;
	justify-content: space-around;
	position: sticky;
	top: 0;
	z-index: 10;
	.box {
		text-align: center;
		.tit {
			color: #707070;
			font-size: 14px;
		}
		.result {
			color: #4a4a4a;
			font-size: 20px;
		}
	}
}

$list_pad_tb: 4px;
@mixin list_box {
	width: 75vw;
	margin: 10px auto;
	padding-top: $list_pad_tb;
	padding-bottom: $list_pad_tb;
}
@mixin flex_box_right {
	@include flex_box_father;
	justify-content: flex-end;
}
@mixin input_bg {
	background-color: rgba(223, 248, 249, 0.3);
}
.from_container {
	width: 100%;
	background-color: #ffffff;
	padding-top: $list_pad_tb;
	padding-bottom: $list_pad_tb;
	.input_list {
		@include list_box;
		@include flex_box_father;
		justify-content: space-between;
		border-bottom: 1rpx solid #3333332e;
		.tit {
			color: #b3b3b3;
		}
		.input_container {
			@include flex_box_right;
			// 普通输入框
			.nomal_input {
				width: 100px;
				@include input_bg;
			}
			//跑步输入框样式
			.run_input {
				@include flex_box_right;
				// 输入框样式控制
				.input_control {
					max-width: 60px;
					@include input_bg;
				}
			}
		}
	}
	.hoverStyle {
		background-color: #f8f8f8;
	}
}
$btn_mar_tb: 20px;
.btn_view {
	@include flex_box_father;
	justify-content: space-around;
	margin: $btn_mar_tb;
	.btn_list {
	}
}
</style>
