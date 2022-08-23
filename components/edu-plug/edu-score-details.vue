<!-- 组件模板 -->
<template>
	<view class="mark" @touchmove.stop.prevent v-if="modelShow">
		<!-- 视图头部 -->
		<view class="view_heard fadeInDown" :class="[isOpenAnimat('edu')]"><view class="title">课 程 详 细 信 息</view></view>
		<!-- 数据容器 -->
		<view class="view_container zoomIn" :class="[isOpenAnimat('edu')]">
			<view class="data_container">
				<!-- 普通数据遍历 -->
				<view class="data_list" v-for="(valObj, keyObj) in key_text" :key="keyObj">
					<view class="data_tit">{{ valObj }}</view>
					<view class="data_content">{{ showData[keyObj] }}</view>
				</view>
				<!-- 特殊数据遍历 -->
				<view class="data_list" v-for="(valObj, keyObj) in specialKey" :key="keyObj" v-if="specialFlage">
					<view class="data_tit">{{ valObj }}</view>
					<view class="data_content" @click="openModal()">{{ getRealData(showData[keyObj]) }}</view>
				</view>
			</view>
		</view>
		<!-- 视图底部 -->
		<view class="view_foot fadeInUp" :class="[isOpenAnimat('edu')]" hover-class="btn_hover" hover-stay-time="100" @click="closBtnTap()">确 定</view>
		<u-toast ref="uToast"></u-toast>
		<u-modal
			:content="u_content"
			:show="u_modalShow"
			:confirmText="u_btnText('ok')"
			:cancelText="u_btnText('no')"
			@confirm="u_confirm()"
			@cancel="u_cancel()"
			ref="uModal"
			:showCancelButton="true"
			:asyncClose="true"
		></u-modal>
	</view>
</template>

<script>
import { eduGuetUsingTheIntegral_Post } from '@/api/GUET/教务开放接口';
import { mapState, mapGetters } from 'vuex';
export default {
	name: 'edu-score-details',
	props: ['scoreData', 'queryFlage'],
	data() {
		return {
			showData: {},
			realFlage: false,
			u_modalShow: false,
			modelShow: true,
			key_text: {
				//普通键值匹配文本
				Cno: '序 号',
				CName: '名 称',
				Courseid: '代 码',
				KcType: '类 型',
				Kslb: '类 别',
				Examt: '考试形式',
				Zpxs: '期末成绩'
			},
			specialKey: {
				//特殊键值匹配文本
				Pscj: '平时成绩',
				Khcj: '考核成绩',
				Score: '总 成 绩'
			},
			specialFlage: false
		};
	},
	/* "configKey": "edu:guet:queryScore" */
	methods: {
		/* 返回数据列表  并关闭数据显示*/
		clos() {
			uni.$emit('toDataList');
			this.realFlage = false;
		},
		/**点击下方确认事件
		 * 判断依据 realFlage
		 * 	|-true	已经显示隐藏分数，显示模态框
		 * 	|-false	未显示隐藏分数时，
		 * */
		closBtnTap() {
			if (this.realFlage) {
				this.u_modalShow = true;
			} else {
				this.clos();
			}
		},
		/* 点击打开模态框 */
		openModal() {
			// 显示了数据 不再显示模态框
			if (this.realFlage) return;
			this.u_modalShow = true;
		},
		/**模态框-确认事件
		 * 根据 realFlage进行判断
		 * 	|-true 	当前显示隐藏分数，点击确认关闭模态框、并返回数据列表、隐藏数据
		 * 	|-false	当前未显示隐藏分数，点击确认后异步显示分数、关闭模态框
		 * */
		u_confirm() {
			if (this.realFlage) {
				this.u_modalShow = false;
				this.clos();
			} else {
				//延时后自动关闭
				return new Promise((resolve, reject) => {
					eduGuetUsingTheIntegral_Post().then(res => {
						if (res.data.code == 200 && res.data.msg.indexOf('失败') != -1) {
							reject(res.data.msg);
						}
						if (res.data.code == 200 && res.data.msg.indexOf('失败') == -1) {
							resolve(res.data.msg);
						}
					});
				})
					.then(res => {
						this.u_modalShow = false;
						this.u_toat(true, res);
						this.realFlage = true;
					})
					.catch(err => {
						this.u_modalShow = false;
						this.u_toat(false, err + ' 无法查看');
						this.realFlage = false;
						console.warn('异常');
					});
			}
		},
		u_cancel() {
			this.u_modalShow = false;
		},
		u_toat(tyepState, msg) {
			this.$refs.uToast.show({ type: tyepState ? 'success' : 'error', message: msg, duration: 1000, position: 'top' });
		}
	},
	watch: {
		scoreData(newValue) {
			this.showData = newValue;
		},
		queryFlage(newValue) {
			this.specialFlage = newValue;
		}
	},
	computed: {
		...mapGetters('edu', ['isOpenAnimat', 'eduSwitch']),
		...mapState('edu', ['eduSwitch']),
		getRealData(para) {
			return para => {
				return this.realFlage ? para : '???点击查看隐藏内容';
			};
		},
		u_content() {
			if (this.realFlage) {
				return '音符已消耗，返回后需要消耗音符重新查看，确定要返回不看了么';
			} else {
				return '查看隐藏的成绩将消耗一定数量的音符（音符可以通过签到获取），确定要康一康么？';
			}
		},
		u_btnText(type) {
			if (this.eduSwitch.awkwardText) {
				return type => {
					if (this.realFlage) {
						return type == 'ok' ? '还看个勾八' : '再看两眼';
					} else {
						return type == 'ok' ? '消耗音符康康' : '强者不需要看';
					}
				};
			} else {
				return type => {
					return type == 'ok' ? '确定' : '取消';
				};
			}
		}
	}
};
</script>

<style scoped lang="scss">
$all_w: 335px;
$tit_h: 50px;
$list_mar: 30px;
$container_pading: 16px;
$border_radius_size: 12px;
@mixin com {
	width: $all_w;
	margin: 0 auto;
	background: #ffffff;
}
$mark_size: 100%;
.mark {
	width: $mark_size;
	height: $mark_size;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 20;
	background-color: rgba(12, 12, 12, 0.5);
	.view_heard {
		@include com;
		border-top-left-radius: $border_radius_size;
		border-top-right-radius: $border_radius_size;
		margin-top: 10vh;
		.title {
			height: $tit_h;
			text-align: center;
			line-height: $tit_h;
			font-weight: bold;
			font-size: 20px;
			border-bottom: 1px solid #e8e8e8;
		}
	}
	.view_container {
		@include com;
		.data_container {
			padding-top: $container_pading;
			padding-bottom: $container_pading;
			.data_list {
				font-size: 14px;
				margin-bottom: 12px;
				display: flex;
				align-items: center;
				margin-left: $list_mar;
				margin-right: $list_mar;
				.data_tit {
					width: 70px;
					height: 20px;
					color: #7f7f7f;
				}
				.data_content {
					max-width: 200px;
					margin-left: 10px;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					word-wrap: break-word;
					overflow: hidden;
				}
			}
		}
	}
	.view_foot {
		@include com;
		height: $tit_h;
		text-align: center;
		line-height: $tit_h;
		border-top: 1px solid #e8e8e8;
		border-bottom-left-radius: $border_radius_size;
		border-bottom-right-radius: $border_radius_size;
	}
	.btn_hover {
		background-color: #e8e8e8;
		font-weight: bold;
	}
}
</style>
