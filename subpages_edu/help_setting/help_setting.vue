<!-- 教务帮助界面 -->
<template>
	<view>
		<!-- QA容器 -->
		<view class="app_container">
			<scroll-view :class="[getQAClass]" scroll-y="true" show-scrollbar="true">
				<view class="QAList" v-for="(item, index) in QAData" :key="index">
					<view class="QQQ">Q：{{ item.Q }}</view>
					<view class="AAA">A：{{ item.A }}</view>
				</view>
			</scroll-view>
		</view>
		<!-- 设置项 容器 -->
		<view class="app_container">
			<!-- 灵敏度滑块 -->
			<view>
				<u-slider v-model="value" :min="30" :max="150" :step="5" @change="valChange()" block-color="#60c5ba" activeColor="#60c5ba" inactiveColor="#d4ecee"></u-slider>
				<view class="swithList list_line">
					<view class="optionText">{{ textObj.sensitivity }}</view>
					<view><u-number-box v-model="value" :min="30" :max="150" integer @change="valChange()" :step="5" :disabledInput="true" bgColor="#d4ecee"></u-number-box></view>
				</view>
			</view>

			<!-- 设置开关配置项 -->
			<view class="swithList" v-for="(objVal, objKey) in switchList" :key="objKey" :class="[getLine(objKey)]">
				<!-- 根据对象键名 匹配对应的文字内容 -->
				<view class="optionText">{{ textObj[objKey] }}</view>
				<view class="swiItem"><u-switch v-model="switchList[objKey]" @change="change()" activeColor="#60c5ba" inactiveColor="#d4ecee"></u-switch></view>
			</view>

			<!-- 滑块+步进器 启用样式 -->
			<view v-show="switchList.auto_Refresh">
				<u-slider v-model="time" :min="1" :max="14" :step="1" @change="valChange()" block-color="#60c5ba" activeColor="#60c5ba" inactiveColor="#d4ecee"></u-slider>
				<view class="swithList">
					<view class="optionText">{{ textObj.auto_Refresh_time }}</view>
					<view><u-number-box v-model="time" integer :min="1" :max="14" @change="valChange()" :step="1" :disabledInput="true" bgColor="#d4ecee"></u-number-box></view>
				</view>
			</view>
		</view>
		<!-- 底部填充块 -->
		<view class="bottom_box"></view>
	</view>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
	data() {
		return {
			value: 30,
			time: 5,
			// switch数据项
			switchList: {},
			//键名匹配的文本项
			textObj: {
				firstOpen: '打开即课表',
				animateState_course: '课表过渡动画',
				animateState_course_details: '课程详情动画',
				animateState_edu: '教务过渡动画',
				awkwardText: '令人尴尬的教务选项',
				shortQA: '短小的Q&A帮助',
				sensitivity: '课表滑动灵敏度',
				auto_Refresh: '自动更新课表',
				auto_Refresh_time: '自动更新间隔时间(天)'
			},
			key: getApp().globalData.eduSwitchKEY
		};
	},
	methods: {
		...mapMutations('edu', ['setEduSwitch']),

		/**修改vuex教务状态
		 * 由于本地的this.switchList 缺少sensitivity参数
		 * 所以需要重新进行解构拼接数据*/
		change() {
			let aaa = { sensitivity: this.value, auto_Refresh_time: this.time };
			let eduSwitchPara = { ...aaa, ...this.switchList };

			this.setEduSwitch(eduSwitchPara);
			uni.setStorageSync(this.key, eduSwitchPara);
		},
		valChange() {
			/*必须进入微任务，防止值为改变 就写入 导致值修改失败*/
			setTimeout(() => {
				this.change();
			}, 0);
		}
	},
	computed: {
		...mapState('edu', ['eduSwitch']),

		/**获取下划线
		 * 非最后一项，返回 .list_line 下划线样式 */
		getLine(objKey) {
			return objKey => {
				if (objKey == 'auto_Refresh' && !this.switchList.auto_Refresh) {
					return '';
				} else {
					return 'list_line';
				}
			};
		},

		/* scroll 视窗高度 */
		getQAClass() {
			return this.switchList.shortQA ? 'scrollStyle' : '';
		},

		/* QA文本 */
		QAData() {
			return [
				{ Q: '想一打开小程序就看到课表？', A: '将下方的<' + this.textObj.firstOpen + '>设置项开启即可。（注：此选项默认为关闭状态）' },
				{ Q: '怎么别人课表有课，我的就没有？', A: '可以尝试下拉刷新课表。（不过有冷却时间）' },
				{
					Q: '那我懒得每次都手动刷新怎么办？',
					A: '手动开启下方的【' + this.textObj.auto_Refresh + '】配置项，并设置【自动更新间隔】即可。（基于课表是冷数据的考量，故此配置项默认关闭）'
				},
				{ Q: '不记得上课时间了怎么办？', A: '在【日/周】类型课表下，点击 对应课程左侧的课程序号，即可查看该课程上课起止时间。【月】类型课表仅显示课程开始时间。' },
				{ Q: '怎么看 上/下 一周的课？', A: '在【周】类型课表下，左右小幅度滑动即可。处于当前周时，日期数字将高亮，当天的日期将重点标注。' },
				{ Q: '怎么我滑动没反应？', A: '试试将下方的<课表滑动灵敏度>值调低。' },
				{ Q: '滑动有时候切日/周、有时候切类型分不清？', A: '直白的讲就是，小幅滑动切日/周，大幅度滑动切类型。' },
				{
					Q: '滑动灵敏度是什么？',
					A:
						'滑动灵敏度(或称：滑动最小无效范围)，该设置决定了小幅度滑动的滑动范围。灵敏度越小，切换上/下周课表响应所需的【手指滑动幅度】也会相应减小，切周也越方便。为防止误触，灵敏度最小值为30。'
				},
				{
					Q: '【日】类型课表只能看当周的课？',
					A: '是的。且一次显示单日课程，重修冲突的课程也会展开，方便重修的同学查看。'
				},
				{
					Q: '【月】类型课表只能看当月的课？',
					A: '是的，点击应日期可查看当天的课程，并提供指定日期后两天的预览。无法切换月份，否则会发生一些奇奇怪怪的事情。（之后也许能实现切月也说不定）'
				},
				{
					Q: '课程详情动画太生草，我尴尬症犯了怎么办？',
					A: '将下方的<' + this.textObj.animateState_course_details + '>设置项关闭即可。'
				},
				{ Q: '其他教务相关动画也尬得抠脚怎么办？', A: '同上，将相对应的动画设置项关闭即可。' },
				{ Q: '查成绩时看不懂选项啊！能不能说人话？', A: '能！将下方<' + this.textObj.awkwardText + '>设置项关闭即可。' },
				{
					Q: '为什么看【成绩】、【已选课程】和【学分绩】时，按返回键直接回到主页？',
					A: '这是特性~减少了性能的损耗，在低配手机上可以更快的加载，照顾低配手机用户，确实一定程度上造成了使用习惯上的问题。'
				},
				{
					Q: '那我想查看多个学期数据，但不想频繁因为返回键切回首页怎么办？',
					A: '【成绩】、【已选课程】可以点击上方的学期进行重新查询。【学分绩】则直接提供重新查询的按钮。'
				},
				{
					Q: '我已经改过设置了为什么还要重新改？',
					A: `原因1、<微信小程序版本>与<QQ小程序版本>上的设置数据不互通。原因2、清理手机上垃圾时，可能会将这些数据重置`
				},
				{ Q: '【微音】的QQ小程序版和微信小程序版有什么区别？', A: '几乎没有区别' },
				{ Q: 'Q&A好长啊，懒得划了能不能短点？', A: '能！将下方的<' + this.textObj.shortQA + '>配置项开启，即可将整体Q&A视窗缩小。' }
			];
		}
	},
	onLoad() {
		/**sensitivity、auto_Refresh_time设计时是Number类型  不是Boolean
		 * 不支持遍历到u-switch组件上，所以需要单独解构出来
		 * ！注意：对象解构赋值，单个属性 根据键值一一对应，余下所有键值对由展开运算符承接
		 * 当写入vuex缓存时，需要重修合并*/
		let { sensitivity, auto_Refresh_time, ...switchList } = this.eduSwitch;
		this.switchList = switchList;
		this.value = sensitivity;
		this.time = auto_Refresh_time;
	}
};
</script>

<style scoped lang="scss">
$item_pading_lr: 20rpx;
.app_container {
	width: 90%;
	margin: 30rpx auto;
	background-color: #fff;
	border-radius: 30rpx;
	box-shadow: 10rpx 10rpx 10px #ccc;
	padding: 20rpx 0 20rpx 0;
	.scrollStyle {
		max-height: 40vh;
	}
	.QAList {
		padding: $item_pading_lr;
		.QQQ {
			font-weight: bold;
			margin-bottom: 10rpx;
		}
		.AAA {
		}
	}
	.swithList {
		height: 80rpx;
		display: flex;
		padding: 0 $item_pading_lr 0 $item_pading_lr;
		justify-content: space-between;
		align-items: center;
		.optionText {
			width: 80%;
		}
	}
	.list_line {
		border-bottom: 1rpx solid #dcdcdd;
	}
}
.bottom_box {
	height: 6vh;
}
</style>
