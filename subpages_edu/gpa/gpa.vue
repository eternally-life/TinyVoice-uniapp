<!-- 学分绩 -->
<template>
	<view>
		<edu-datarelay @getEduPara="transmit_data" v-show="isSelectorShow" />
		<view class="data_table" v-show="!isSelectorShow">
			<view class="list_item" v-for="(valObj, keyObj) in key_text" :key="keyObj">
				<view class="item_left">{{ valObj }}</view>
				<view class="item_right">{{ shoData[keyObj] }} {{ keyObj == 'Grade' ? '级' : '' }}</view>
			</view>
		</view>
		<view class="btn_container" v-show="!isSelectorShow"><u-button color="#60c5ba" text="查看其他学期学分绩" shape="circle" @click="reQuery"></u-button></view>
	</view>
</template>

<script>
// import { eduGuetSelectWeightedScore_Post } from '@/api/GUET/教务开放接口.js';
export default {
	data() {
		return {
			isSelectorShow: true,
			shoData: {},
			key_text: {
				Name: '姓名',
				Stid: '学号',
				DptName: '学院',
				Grade: '年级',
				Xfj: '学分绩'
			}
		};
	},
	methods: {
		transmit_data(para) {
			console.log('父组件接收', para);
			delete para.str;
			this.getData(para);
		},
		getData(para) {
			new Promise((resovle, rejiect) => {
				eduGuetSelectWeightedScore_Post(para).then(val => {
					if (val.data.code == 200) {
						resovle(val.data.data);
					} else {
						rejiect(val);
					}
				});
			})
				.then(val => {
					this.shoData = val;
					this.isSelectorShow = false;
				})
				.catch(err => {
					console.warn(err);
					this.selfMsg('教务异常，稍后再试');
				});
		},
		selfMsg(msg) {
			this.$refs.uToast.show({ type: 'error', message: msg, duration: 1000 });
		},
		// 重新显示查询页
		reQuery() {
			this.isSelectorShow = true;
		}
	}
};
</script>

<style scoped lang="scss">
$container_w: 335px;
$item_marg_size: 16px;
.data_table {
	width: $container_w;
	background: #ffffff;
	border-radius: 10px;
	margin: 20px auto;
	font-size: 14px;
	.list_item {
		height: 44px;
		width: $container_w;
		display: inline-flex;
		justify-content: space-between;
		align-items: center;
		.item_left {
			color: #7f7f7f;
			text-align: left;
			margin-left: $item_marg_size;
		}
		.item_right {
			color: #000;
			text-align: right;
			margin-right: $item_marg_size;
		}
	}
	.boder_item {
		border: 1px solid #7f7f7f;
	}
}
$btn_pad_lr: 20vw;
.btn_container {
	margin-top: 10vh;
	padding-left: $btn_pad_lr;
	padding-right: $btn_pad_lr;
}
</style>
