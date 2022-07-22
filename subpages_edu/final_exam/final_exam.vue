<!-- 成绩查询 -->
<template>
	<view>
		<u-toast ref="uToast"></u-toast>
		<edu-datarelay @getEduPara="transmit_data" v-show="showFlage == 0" />
		<view class="table_container" v-show="showFlage != 0">
			<view class="top_term " hover-class="item_hover" hover-stay-time="100" @click="openSelect()">
				<text v-show="transferType == 2">{{ stdName }}</text>
				{{ titStr }}
				<text class="iconfont" style="margin-left: 30rpx;">&#xe63b;</text>
			</view>
			<view class="banner">
				<view class="item_l">课程名称</view>
				<view class="item_m">学分</view>
				<view class="item_r">成绩</view>
			</view>
			<view class="data_item" v-for="(item, index) in showData" :key="index" :class="[getListStyle(index)]" @click="detaileTap(item)">
				<view class="item_l">{{ item.CName }}</view>
				<view class="item_m">{{ item.Xf }}</view>
				<view class="item_r">{{ item.Zpxs }}</view>
			</view>
		</view>
		<view class="bottom_box" v-show="showFlage != 0"></view>

		<edu-score-details :scoreData="detailsProp" :queryFlage="queryFlage" v-show="showFlage == 2" />
	</view>
</template>

<script>
import { mapState } from 'vuex';
// import { eduGuetSelectSource_Post, eduGuetInsteadCheckscore_Post } from '@/api/GUET/教务开放接口.js';
// import { systemUsermanageList, systemUsermanageGetInfo_Get } from '@/api/SYS/用户信息管理.js';
export default {
	name: 'EduFinalExam',
	data() {
		return {
			/**0 显示数据选择框
			 * 1 数据列表
			 * 2 单数据详情*/
			showFlage: 0,
			showData: null,
			detailsProp: {},
			titStr: null, //学年字符串
			stdName: null, //学生姓名
			queryFlage_admin: false, //是否拥有特殊用户字段
			queryFlage_normal: false //后台是否开启查询标记
		};
	},
	computed: {
		...mapState('edu', ['transferType']),
		getListStyle(index) {
			return index => {
				return index != this.showData.length ? 'item_boder' : '';
			};
		},

		/** 隐藏成绩 标记
		 * |- true	显示
		 * |- false	隐藏
		 * 先判断后台是否开启字段
		 * 再判断是否为特殊用户
		 * */
		queryFlage() {
			return this.queryFlage_normal ? true : this.queryFlage_admin ? true : false;
		}
	},
	methods: {
		/** 拼接数据 发起请求
		 * 由子组件触发，子组件需要参数
		 * para 为子组件传递的参数	类型为object
		 * transferType 调用方法依据
		 * 	|-0 查询个人成绩
		 * 	|-2 查询别人成绩
		 * */
		transmit_data(para) {
			this.titStr = para.str;
			if (this.transferType == 0) {
				this.getData(eduGuetSelectSource_Post, { term: para.term });
			} else if (this.transferType == 2) {
				if (para.studentId == '') {
					this.selfMsg('学号不能为空！');
					return;
				}
				this.getData(eduGuetInsteadCheckscore_Post, { studentId: para.studentId, term: para.term });
			}
		},
		//点击切换查询界面
		openSelect() {
			this.setShowFlage(0);
			this.selectData = null;
			this.detailsProp = {};
		},
		//切换回数据列表
		openDataList() {
			this.setShowFlage(1);
			this.detailsProp = {};
		},
		/* 点击获取详情 */
		detaileTap(para) {
			this.detailsProp = para;
			this.setShowFlage(2);
		},

		/* 修改显示标记 */
		setShowFlage(newValue) {
			this.showFlage = newValue;
		},

		/** 统一获取数据请求
		 * fn 需要执行的方法
		 * para执行方法所需的参数
		 * */
		getData(fn, para) {
			new Promise((resolve, reject) => {
				fn(para).then(value => {
					console.log(value);
					if (value.data.code == 500) {
						reject(value.data);
					} else if (value.data.code == 200) {
						console.log(value);
						resolve(value.data);
					}
				});
			})
				.then(val => {
					this.showData = val.data;
					console.log(val.data);
					if (this.transferType == 2) {
						this.stdName = val.data[0].Name + ' ';
						this.selfMsg('查询成功：消耗 ' + val.integral + ' 音符', 'success');
					}
					return Promise.resolve();
				})
				.then(() => {
					this.setShowFlage(1);
				})
				.catch(err => {
					console.warn(err);
					if (err.code == 500 && this.transferType == 2) {
						//代查接口出错
						this.selfMsg(err.msg);
					} else if (err.code == 500 && this.transferType != 2) {
						//普通查成绩出错
						this.selfMsg('该学期数据为空');
					} else {
						this.selfMsg('教务异常，稍后再试');
					}
				});
		},

		/* 通过后台 判断是否开启查看 */
		getFlage_normal() {
			systemUsermanageList()
				.then(res => {
					if (res.data.code == 200) {
						return res.data.rows;
					}
				})
				.then(val => {
					if (val.length > 0) {
						val.forEach((v, i) => {
							if (v.configKey == 'edu:guet:queryScore') {
								this.queryFlage_normal = v.configValue == 'true' ? true : false;
							}
						});
					}
				});
		},

		/* 拥有特殊用户字段 */
		authentication() {
			systemUsermanageGetInfo_Get()
				.then(res => {
					if (res.data.code == 200) {
						return res.data.roles;
					}
				})
				.then(val => {
					if (val.length > 0) {
						val.forEach((v, i) => {
							// console.log("角色列表",v);
							if (v === 'voice_edu_select') {
								this.queryFlage_admin = true;
								getApp().globalData.is_voiceEduSelect = true;
							}
						});
					}
				});
		},

		/* 消息封装 */
		selfMsg(msg, type) {
			this.$refs.uToast.show({ type: type == undefined ? 'error' : type, message: msg, duration: 1000 });
		}
	},

	created() {
		uni.$on('toDataList', () => {
			this.openDataList();
		});
	},
	onUnload() {
		uni.$off('toDataList');
	},
	onReady() {
		this.getFlage_normal();

		// 从代查跳转  无需再次鉴权
		if (this.transferType == 2) {
			this.queryFlage_admin = getApp().globalData.is_voiceEduSelect;
			return;
		}
		this.authentication();
	}
};
</script>

<style scoped lang="scss">
$tit_color: #aeaeae;
$item_font_size: 12px;
$contai_w: 335px;
$top_h: 53px;

@mixin flex-box-1 {
	width: $contai_w;
	font-size: $item_font_size;
	display: inline-flex;
	align-items: center;
}
@mixin box-left {
	width: 84px;
	margin-left: 14px;
	margin-right: 46px;
	text-align: left;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
}
@mixin box-middle {
	width: 50px;
	margin-right: 100px;
	text-align: center;
}
@mixin box-right {
	width: 24px;
	margin-right: 16px;
	text-align: right;
}
@mixin option {
	.item_l {
		@include box-left;
	}
	.item_m {
		@include box-middle;
	}
	.item_r {
		@include box-right;
	}
}
.table_container {
	margin: 20px auto;
	width: $contai_w;
	background-color: #ffffff;
	border-radius: 10px;
	.top_term {
		height: $top_h;
		line-height: $top_h;
		font-weight: bold;
		font-size: 15px;
		overflow: hidden;
		text-align: center;
		color: $tit_color;
		position: sticky;
		top: 0;
		z-index: 10;
		background-color: #ffffff;
	}
	.item_hover {
		background-color: #ebebeb;
	}
	.banner {
		position: sticky;
		top: $top_h;
		height: 44px;
		background-color: #60c5ba;
		color: #fff;
		@include flex-box-1;
		@include option;
	}
	.data_item {
		height: 50px;
		@include flex-box-1;
		@include option;
	}
	.item_boder {
		border-bottom: 1px solid #efefef;
	}
}
.bottom_box {
	width: 100%;
	height: 5vh;
}
</style>
