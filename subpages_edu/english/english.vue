<!-- 英语均分 -->
<template>
	<view>
		<u-toast ref="uToast"></u-toast>
		<u-modal :show="modalShow" @confirm="confirm">
			<view class="slot-content"><rich-text :nodes="modStr"></rich-text></view>
		</u-modal>
		<!-- 仅用于获取自适应学期参数  不做显示 -->
		<guet-datarelay v-show="false" ref="datarelay"></guet-datarelay>
		<view class="top_contaoner fadeInDown" :class="[isOpenAnimat('edu')]" v-if="tabShow">
			<view class="subitem">课程</view>
			<view class="subitem" v-show="showStyle"></view>
			<view class="subitem">成绩</view>
		</view>
		<view class="data_container zoomIn" :class="[isOpenAnimat('edu')]" v-if="tabShow">
			<view class="data_list" :class="item.isSelect ? 'selectBg' : ''" @click="selectChange(index)" v-for="(item, index) in ableData">
				<view class="subitem CName">{{ item.CName }}</view>
				<view class="subitem" v-show="showStyle">
					<u-icon :name="item.isSelect ? 'checkmark-circle-fill' : 'checkmark-circle'" :color="item.isSelect ? '#60C5BA' : '#606266'"></u-icon>
				</view>
				<view class="subitem">{{ item.Zpcj }}</view>
			</view>
		</view>
		<view class="count_container fadeInUp" :class="[bgStyle, isOpenAnimat('edu')]" v-if="tabShow">
			<view>总 分：{{ getCountScore }}</view>
			<view>平均分：{{ getAverageScore }}</view>
		</view>
		<view class="help_container" @click="toHelp" v-if="tabShow">
			<text style="margin-right: 6px; color:#60C5BA">有疑问</text>
			<u-icon name="question-circle" color="#60C5BA"></u-icon>
		</view>
	</view>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
// import { eduGuetSelectSource_Post } from '@/api/GUET/教务开放接口.js';
export default {
	data() {
		return {
			titStr: ['课程', '', '成绩'],
			tremPara: [],
			ableData: [],
			modalShow: false,
			tabShow: false,
			contentStrFlage: 0
		};
	},
	computed: {
		...mapGetters('edu', ['isOpenAnimat']),
		/**显示模式
		 *	数据 >4 条 true
		 * 	否则 false
		 * */
		showStyle() {
			return this.ableData.length > 4 ? true : false;
		},

		/* 获取已选数量 */
		getSelectCount() {
			return this.ableData.reduce((previous, val) => (val.isSelect ? previous + 1 : previous), 0);
		},

		/**获取总分
		 * 数据大于4条 根据
		 * 否则直接计算*/
		getCountScore() {
			if (this.showStyle) {
				return this.ableData.reduce((previous, val) => (val.isSelect ? previous + val.Zpcj : previous), 0);
			} else {
				return this.ableData.reduce((previous, val) => previous + val.Zpcj, 0);
			}
		},

		/**获取平均分 算法总分*/
		getAverageScore() {
			let count = this.showStyle ? this.getSelectCount : this.ableData.length;
			return count == 0 ? 0 : (this.getCountScore / count).toFixed(2);
		},

		/* 根据平均分返回背景颜色 */
		bgStyle() {
			return this.getAverageScore == 0 ? '' : this.getAverageScore > 75 ? 'okBG' : 'noBG';
		},

		/* 模态框文本 */
		modStr() {
			return this.contentStrFlage == 0
				? '<p>当前存在<strong style="color: rgb(0, 102, 204);">多条</strong>成绩数据，</p><p>请根据需要点击对应的成绩进行选择性计算。</p><p>最多可以选择<strong style="color: rgb(0, 102, 204);">4条</strong>数据。</p>'
				: this.contentStrFlage == 1
				? '<p>\t平均分&gt;=75，显<strong style="color: rgb(102, 185, 102);">绿色</strong>表通过。</p><p>\t平均分&lt;75，显<strong style="color: rgb(230, 0, 0);">红色</strong>表未通过。</p> <p><br></p><p><strong>英语均分75分</strong>或<strong>英语四级通过</strong>，作为本科获取学士学位证的要求。</p><p><strong><u>英语四级通过的大佬请无视本功能的结果。</u></strong></p><p><br></p><p>\t<strong>功能初衷</strong>：为了<strong style="color: rgb(102, 163, 224);">方便快速查</strong>看各学期英语成绩并求得均分，以协助判断是否选择刷分。毕竟不是所有人都能过4级、英语够75分或想考4级。<s>主要是此功能作者也是个学渣，没过4级、英语均分也没够75分</s></p>'
				: '<p class="ql-align-center">意外的错误</p><p class="ql-align-center">检索不到《大学英语》的成绩</p>';
		}
	},
	methods: {
		/* 关闭模态框 并显示数据 */
		confirm() {
			this.modalShow = false;
			setTimeout(() => {
				this.tabShow = true;
			}, 300);
		},

		/* 打开帮助模态框 */
		toHelp() {
			this.contentStrFlage = 1;
			this.modalShow = true;
		},

		/* 点击切换选定状态  数据 > 4 时才响应*/
		selectChange(index) {
			if (this.showStyle) {
				// 当前4条数据 且点击未选中
				if (this.getSelectCount == 4 && this.ableData[index].isSelect == false) {
					this.selfToast(0, '最多选中 4 条数据');
				} else if (this.getSelectCount <= 4) {
					this.ableData[index].isSelect = !this.ableData[index].isSelect;
				}
			}
		},

		/* 获取学期参数数组 */
		getParaObjArr(termArr) {
			let tremPara = [];
			for (let i = 0; i < termArr.length; i++) {
				for (let j = 1; j <= 2; j++) {
					tremPara.push({
						term: String(termArr[i]) + j
					});
				}
			}
			return tremPara;
		},

		/* 数据处理 */
		async dataProcessing() {
			let validData = await this.getAllData();
			// 空数据  返回错误
			if (validData.length < 1) {
				this.selfToast(0, '无法获取到数据');
				return;
			}
			console.log(typeof validData);
			this.selfToast(1, '获取' + validData.length + '条数据\n正在过滤分析');
			this.filterData(validData);
		},

		/* 返回 接口请求数据 */
		async getAllData() {
			let arr = this.tremPara,
				validData = [],
				errStr = '', //错误文本
				errCount = 0; //错误次数
			//请求遍历所有学期期末成绩
			for (let i = 0; i < arr.length; i++) {
				let tempData;
				try {
					tempData = await eduGuetSelectSource_Post(arr[i])
						.then(val => {
							if (val.data.code == 200 && val.data.data.length > 0) {
								this.selfToast(1, '查询第' + (i + 1) + '次');
								return val.data.data;
							} else {
								console.warn(arr[i].term + '参数不可用', val);
								return undefined;
							}
						})
						.catch(err => {
							let str = '参数' + arr[i].term + '请求错误：' + err.errMsg;
							this.selfToast(0, '请求失败' + ++errCount);
							errStr += str;
							console.error(str);
							return undefined;
						});
				} catch (e) {
					console.warn('异常捕获：', e);
					tempData = undefined;
				}
				if (tempData != undefined) {
					//将期末成绩数据添加进数组
					tempData.forEach((v, i, arr) => {
						validData.push(v);
					});
				}
			}
			return validData;
		},

		/* 过滤数据、抽取英语成绩 */
		filterData(validData) {
			console.log('函数接收到数据', validData);
			let ableData = validData.filter(val => val.CName.indexOf('大学英语') !== -1);
			// 添加非点击标记
			ableData.forEach((value, index) => {
				value['isSelect'] = false;
			});
			console.log('可用数据', ableData, ableData.length);
			if (ableData.length < 1) {
				this.selfToast(0, '意外的错误，在获取到的 ' + validData.length + ' 条成绩数据中，检索不到《大学英语》的成绩');
				this.contentStrFlage = 3;
				this.modalShow = true;
				return;
			}
			this.ableData = ableData;
			//延时提示
			setTimeout(() => {
				this.selfToast(1, '成功过滤出' + ableData.length + '条数据');
				this.contentStrFlage = 0;
				setTimeout(() => {
					if (ableData.length > 4) {
						// 数据超过4条  含重修数据
						this.modalShow = true;
					} else {
						this.tabShow = true;
					}
				}, 500);
			}, 1500);
		},

		/**消息封装
		 * type
		 * 0 错误类型
		 * 1 成功类型*/
		selfToast(type, msg, time) {
			this.$refs.uToast.show({
				type: type == 0 ? 'error' : 'success',
				message: msg,
				position: 'bottom',
				duration: typeof time == 'number' ? time : 1000
			});
		}
	},
	onReady() {
		// 构建请求参数对象数组
		this.tremPara = this.getParaObjArr(this.$refs.datarelay.termArr.reverse());
		// 请求数据
		this.dataProcessing();
	}
};
</script>

<style lang="scss" scoped>
$comta_w: 335px;
$pad_tb: 10px;
$bord_rad_size: 10px;
@mixin flex_box {
	display: flex;
	justify-content: space-around;
	align-items: center;
}
@mixin container_box {
	width: $comta_w;
	margin: 0 auto;
}
@mixin minx_subItem {
	.subitem {
		flex: 1;
		text-align: center;
	}
	.CName {
		color: #aeaeae;
	}
}
.top_contaoner {
	@include container_box;
	padding: $pad_tb 0 $pad_tb 0;
	background-color: #60c5ba;
	border-radius: $bord_rad_size $bord_rad_size 0 0;
	position: sticky;
	top: 0;
	z-index: 10;
	margin-top: 20px;
	color: #fff;
	@include flex_box;
	@include minx_subItem;
}
.data_container {
	@include container_box;
	background-color: #fff;
	.data_list {
		padding-top: $pad_tb;
		padding-bottom: $pad_tb;
		@include flex_box;
		@include minx_subItem;
		border-bottom: 1px solid #cacaca;
	}
	.selectBg {
		background-color: #d4ecee;
	}
}
.count_container {
	@include container_box;
	@include flex_box;
	padding-top: $pad_tb;
	padding-bottom: $pad_tb;
	background-color: #fff;
	font-weight: bolder;
	border-radius: 0 0 $bord_rad_size $bord_rad_size;
}
.okBG {
	background-color: #71d5a1 !important;
	color: #18b566;
}
.noBG {
	color: #dd6161;
	background-color: #fab6b6 !important;
}

.help_container {
	width: $comta_w;
	color: #60c5ba;
	font-weight: bold;
	margin: 50px auto;
	@include flex_box;
	justify-content: flex-start;
}
</style>
