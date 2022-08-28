<!-- 体测计算 -->
<template>
	<view>
		<u-notify ref="uNotify" message="Hi uView"></u-notify>
		<u-modal :show="show" title="单 项 得 分 详 情" @confirm="show = false">
			<u-parse :content="content"></u-parse>
		</u-modal>
		<!-- 顶部成绩区块 -->
		<view class="result_container">
			<view class="box">
				<view class="tit">成绩</view>
				<view class="result">
					<u-count-to :startVal="baseScore" :endVal="score_all"></u-count-to>
					<text v-show="extraPoints">+</text>
					<u-count-to :startVal="baseExtraScore" :endVal="extraPoints" v-if="extraPoints"></u-count-to>
				</view>
			</view>
			<view class="box">
				<view class="tit">BMI</view>
				<view class="result">
					<u-count-to :startVal="baseBMI" :endVal="BMI_result" :decimals="2"></u-count-to>
				</view>
			</view>
		</view>
		<!-- 中间表单域 -->
		<view class="from">
			<view class="input_list" style="display: block !important;">
				<u-subsection
					:list="gradeList"
					:current="grade"
					@change="sectionChange"
					activeColor="#60c5ba"
					mode="subsection"
				></u-subsection>
			</view>
			<u-form labelPosition="left" :labelWidth="90">
				<u-form-item label="性别">
					<view class="inputStyle" @click="genderChange">
						<u-input
							:placeholder="getStr_Gender + ' 生 '"
							placeholderStyle="color:#000"
							inputAlign="center"
							disabled
						></u-input>
					</view>
				</u-form-item>
				<u-form-item label="50米">
					<view class="inputStyle" :class="focusInput == 'val_50' ? 'focusInput' : ''">
						<u-input
							type="digit"
							inputAlign="right"
							:suffixIconStyle="focusInput == 'val_50' ? { color: '#fff' } : ''"
							v-model="val_obj.val_50"
							@focus="focus({ value: val_obj.val_50, target: 'val_50' })"
							@blur="blur"
							placeholder="0"
						>
							<u-text text="秒" slot="suffix" margin="0 3px 0 3px"></u-text>
						</u-input>
					</view>
				</u-form-item>
				<u-form-item :label="getStr_diffProject">
					<view class="inputStyle" :class="focusInput == 'diff_ProjectValue' ? 'focusInput' : ''">
						<u-input
							inputAlign="right"
							type="number"
							v-model="val_obj.diff_ProjectValue"
							@focus="focus({ value: val_obj.diff_ProjectValue, target: 'diff_ProjectValue' })"
							@blur="blur"
							placeholder="0"
						>
							<u-text text="个" slot="suffix" margin="0 3px 0 3px"></u-text>
						</u-input>
					</view>
				</u-form-item>
				<u-form-item :label="getStr_longRun + '米'">
					<view class="inputStyle doubInput">
						<view :class="focusInput == 'm_8h_1k' ? 'focusInput' : ''">
							<u-input
								inputAlign="right"
								type="number"
								v-model="val_obj.m_8h_1k"
								@focus="focus({ value: val_obj.m_8h_1k, target: 'm_8h_1k' })"
								@blur="blur"
								placeholder="0"
							>
								<u-text text="分" slot="suffix" margin="0 3px 0 3px"></u-text>
							</u-input>
						</view>
						<view :class="focusInput == 's_8h_1k' ? 'focusInput' : ''">
							<u-input
								inputAlign="right"
								type="number"
								v-model="val_obj.s_8h_1k"
								@focus="focus({ value: val_obj.s_8h_1k, target: 's_8h_1k' })"
								@blur="blur"
								placeholder="0"
							>
								<u-text text="秒" slot="suffix" margin="0 3px 0 3px"></u-text>
							</u-input>
						</view>
					</view>
				</u-form-item>
				<u-form-item label="身高">
					<view class="inputStyle" :class="focusInput == 'height' ? 'focusInput' : ''">
						<u-input
							inputAlign="right"
							type="digit"
							v-model="val_obj.height"
							@focus="focus({ value: val_obj.height, target: 'height' })"
							@blur="blur"
							placeholder="0"
						>
							<u-text :text="getStr_height" slot="suffix" margin="0 3px 0 3px"></u-text>
						</u-input>
					</view>
				</u-form-item>
				<u-form-item label="体重">
					<view class="inputStyle" :class="focusInput == 'weight' ? 'focusInput' : ''">
						<u-input
							inputAlign="right"
							v-model="val_obj.weight"
							type="digit"
							@focus="focus({ value: val_obj.weight, target: 'weight' })"
							@blur="blur"
							placeholder="0"
						>
							<u-text text="千克" slot="suffix" margin="0 3px 0 3px"></u-text>
						</u-input>
					</view>
				</u-form-item>
				<u-form-item label="肺活量">
					<view class="inputStyle" :class="focusInput == 'vitalCapacity' ? 'focusInput' : ''">
						<u-input
							inputAlign="right"
							type="number"
							v-model="val_obj.vitalCapacity"
							@focus="focus({ value: val_obj.vitalCapacity, target: 'vitalCapacity' })"
							@blur="blur"
							placeholder="0"
						>
							<u-text text="毫升" slot="suffix" margin="0 3px 0 3px"></u-text>
						</u-input>
					</view>
				</u-form-item>
				<u-form-item label="立定跳远">
					<view class="inputStyle" :class="focusInput == 'longJump' ? 'focusInput' : ''">
						<u-input
							inputAlign="right"
							type="digit"
							v-model="val_obj.longJump"
							@focus="focus({ value: val_obj.longJump, target: 'longJump' })"
							@blur="blur"
							placeholder="0"
						>
							<u-text text="厘米" slot="suffix" margin="0 3px 0 3px"></u-text>
						</u-input>
					</view>
				</u-form-item>
				<u-form-item label="坐位体前屈">
					<view class="inputStyle" :class="focusInput == 'sittingBodyFlex' ? 'focusInput' : ''">
						<u-input
							type="digit"
							inputAlign="right"
							v-model="val_obj.sittingBodyFlex"
							@focus="focus({ value: val_obj.sittingBodyFlex, target: 'sittingBodyFlex' })"
							@blur="blur"
							placeholder="0"
						>
							<u-text text="厘米" slot="suffix" margin="0 3px 0 3px"></u-text>
						</u-input>
					</view>
				</u-form-item>
			</u-form>
		</view>

		<!-- 底部按钮区 -->
		<view class="btn_view">
			<view class="btn_list">
				<u-button type="error" text="清空所有" shape="circle" @click="restart()"></u-button>
			</view>
			<view class="btn_list">
				<u-button type="primary" text="查看分数详情" shape="circle" @click="showModleChange"></u-button>
			</view>
			<view class="btn_list">
				<u-button type="warning" text="分享成绩" shape="circle" open-type="share"></u-button>
			</view>
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
			focusInput: '', //聚焦的input
			oldValue: '', //旧的值
			baseBMI: 0, // BMI 基础、起始计算分数
			baseScore: 0, //总分 基础、起始计算分数
			baseExtraScore: 0, //加分 基础、起始计算分数
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
		/* 聚焦 设置临时输入值 */
		focus({ value, target }) {
			this.focusInput = target;
			this.oldValue = value;
		},
		/* 输入框失去焦点	 比较差异、存储  */
		blur(value) {
			this.focusInput = '';
			if (this.oldValue == value) return;
			this.saveStorageInput();
		},

		/* 组件方法 切换年级*/
		sectionChange(index) {
			this.grade = index;
			this.saveStorageInput();
		},
		/* 点击修改性别 */
		genderChange() {
			this.gender = !this.gender;
			this.saveStorageInput();
		},

		/* 切换 显示/隐藏 模态框 */
		showModleChange() {
			this.show = !this.show;
		},

		/* 存储当前输入  并提示*/
		saveStorageInput() {
			try {
				uni.setStorageSync(this.key, this.getPageInput());
				this.$refs.uNotify.show({ type: 'success', message: '成绩数据存储成功', duration: 1000 });
			} catch (e) {
				this.$refs.uNotify.show({ type: 'error', message: '成绩数据存储成功', duration: 1000 });
			}
		},

		/* 读取输入缓存 */
		getStorageInput() {
			try {
				const value = uni.getStorageSync(this.key);
				if (value) {
					this.setPageInput(value);
					this.$refs.uNotify.show({ type: 'primary', message: '记录读取成功', duration: 3000 });
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
			this.gender = true;
			this.grade = 0;
			uni.removeStorageSync(this.key);
			this.$refs.uNotify.show({ type: 'primary', message: '重置成功', duration: 2000 });
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
			return computeUtil.getRichText({
				score_BMI: this.score_BMI,
				score_shortRun: this.score_shortRun,
				name_longRun: this.getStr_longRun,
				score_longRun: this.score_longRun,
				score_vitalCapacity: this.score_vitalCapacity,
				name_diff_ProjectValue: this.getStr_diffProject,
				score_diff_ProjectValue: this.score_diff_ProjectValue,
				score_longJump: this.score_longJump,
				score_sittingBodyFlex: this.score_sittingBodyFlex
			});
		},

		/* 额外加分 */
		extraPoints() {
			let val_run = computeUtil.getExtraPoints_run(
					this.gender,
					this.grade,
					this.val_obj.m_8h_1k,
					this.val_obj.s_8h_1k
				),
				val_power = computeUtil.getExtraPoints_power(this.gender, this.grade, this.val_obj.diff_ProjectValue);
			let val = val_run + val_power;
			if (val != 0 && typeof val == 'number') {
				return val;
			} else {
				return 0;
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
	},
	watch: {
		score_all(newValue, oldValue) {
			this.baseScore = oldValue;
		},
		BMI_result(newValue, oldValue) {
			this.baseBMI = oldValue;
		},
		extraPoints(newValue, oldValue) {
			this.baseExtraScore = oldValue;
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

.from {
	padding: 2vh 10vw;
	padding-bottom: 10vh;
	background-color: #ffffff;

	.inputStyle {
		width: 100%;
	}
	.focusInput {
		background-color: #60c5ba38;
	}
	.doubInput {
		display: flex;
	}

	/deep/ .u-form-item {
		// padding: 0 0 30rpx;
		.u-form-item__body {
			padding: 10px 0 0 0;
		}
	}
}

.btn_view {
	width: 100%;
	padding: 10px;
	position: fixed;
	bottom: 0;
	z-index: 10;
	@include flex_box_father;
	justify-content: space-around;
	background-color: #ffffff;
	border-top: 1px solid #eaeaea;
	.btn_list {
	}
}
</style>
