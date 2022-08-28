<!-- 教务帮助界面 -->
<template>
	<view>
		<!-- 设置项 容器 -->
		<view class="app_container">
			<!-- 灵敏度滑块 -->
			<view>
				<u-slider
					v-model="value"
					:min="30"
					:max="150"
					:step="5"
					@change="valChange()"
					block-color="#60c5ba"
					activeColor="#60c5ba"
					inactiveColor="#d4ecee"
				></u-slider>
				<view class="swithList list_line">
					<view class="optionText">{{ textObj.sensitivity }}</view>
					<view>
						<u-number-box
							v-model="value"
							:min="30"
							:max="150"
							integer
							@change="valChange()"
							:step="5"
							:disabledInput="true"
							bgColor="#d4ecee"
						></u-number-box>
					</view>
				</view>
			</view>

			<!-- 设置开关配置项 -->
			<view class="swithList" v-for="(objVal, objKey) in switchList" :key="objKey" :class="[getLine(objKey)]">
				<!-- 根据对象键名 匹配对应的文字内容 -->
				<view class="optionText">{{ textObj[objKey] }}</view>
				<view class="swiItem">
					<u-switch
						v-model="switchList[objKey]"
						@change="change()"
						activeColor="#60c5ba"
						inactiveColor="#d4ecee"
					></u-switch>
				</view>
			</view>

			<!-- 滑块+步进器 启用样式 -->
			<view v-show="switchList.auto_Refresh">
				<u-slider
					v-model="time"
					:min="1"
					:max="14"
					:step="1"
					@change="valChange()"
					block-color="#60c5ba"
					activeColor="#60c5ba"
					inactiveColor="#d4ecee"
				></u-slider>
				<view class="swithList">
					<view class="optionText">{{ textObj.auto_Refresh_time }}</view>
					<view>
						<u-number-box
							v-model="time"
							integer
							:min="1"
							:max="14"
							@change="valChange()"
							:step="1"
							:disabledInput="true"
							bgColor="#d4ecee"
						></u-number-box>
					</view>
				</view>
			</view>
		</view>

		<!-- QA容器 -->
		<view class="app_container">
			<view class="QAtitle">QA问答，解决你大部分疑惑</view>
			<u-collapse accordion>
				<view v-for="(item, index) in QAData" :key="index">
					<u-collapse-item :title="item.Q">
						<text class="u-collapse-content">{{ item.A }}</text>
					</u-collapse-item>
				</view>
			</u-collapse>
		</view>

		<!-- 底部填充块 -->
		<view class="bottom_box"></view>
		<u-back-top
			:scroll-top="scrollTop"
			top="300"
			:iconStyle="iconStyle"
			duration="500"
			:customStyle="{ backgroundColor: '#60c5ba' }"
		></u-back-top>
	</view>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { getQAtext } from './QAtext';
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
				sensitivity: '课表滑动灵敏度',
				auto_Refresh: '自动更新课表',
				auto_Refresh_time: '自动更新间隔时间(天)'
			},
			key: getApp().globalData.storageKey.eduSwitchKEY,
			scrollTop: 0, //页面滚动高度
			iconStyle: {
				color: '#fff',
				fontSize: '32rpx'
			}
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

		/* QA文本 */
		QAData() {
			return getQAtext(this.textObj);
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
	},
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
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
	.QAtitle {
		font-size: 40rpx;
		text-align: center;
		font-weight: bolder;
		padding-top: $item_pading_lr;
		padding-bottom: $item_pading_lr;
	}
	.u-collapse-content {
		text-indent: 2em;
		font-size: 30rpx;
		font-weight: bolder;
	}
	.swithList {
		display: flex;
		padding: 10rpx $item_pading_lr;
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
