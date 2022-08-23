<!-- 已选课程 -->
<template>
	<view>
		<u-toast ref="uToast"></u-toast>
		<edu-datarelay @getEduPara="transmit_data" v-show="isSelectorShow" />
		<view class="table_container" v-show="!isSelectorShow">
			<view class="top_term" @click="openSelect()">
				{{ titStr }}
				<text class="iconfont" style="margin-left: 50rpx;">&#xe63b;</text>
			</view>
			<view class="banner">
				<view class="item_l">课程名称</view>
				<view class="item_m">课程类型</view>
				<view class="item_r">学分</view>
			</view>
			<view class="data_item" v-for="(item, index) in selectData" :key="index" :class="index != aaa.length ? 'item_boder' : ''">
				<view class="item_l">{{ item.CName }}</view>
				<view class="item_m">{{ item.TName }}</view>
				<view class="item_r">{{ item.Xf }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import { eduGuetSelectedCourse_Post } from '@/api/GUET/教务开放接口.js';
export default {
	name: 'EduSelectedCourses',
	data() {
		return {
			isSelectorShow: true,
			selectData: null,
			titStr: null
		};
	},
	methods: {
		transmit_data(para) {
			console.log('父组件接收', para);
			this.titStr = para.str;
			this.getData(para);
		},
		//点击关闭
		openSelect() {
			this.isSelectorShow = true;
			this.selectData = null;
		},
		getData(para) {
			let that = this;
			eduGuetSelectedCourse_Post({ term: para.term })
				.then(val => {
					console.log(val);
					if (val.data.data.length == 0) {
						//学期无数据
						console.log('空数据');
						that.selfMsg('这个学期没有数据');
						// GDPublic.selfMsg(this.$refs.uToast, '没有这个学期的数据', 'error');
						return;
					} else if (val.data.code == 200) {
						that.selectData = val.data.data;
					} else {
						that.selfMsg('教务异常，稍后再试');
					}
				})
				.catch(err => {
					console.warn('err: ', err);
					// GDPublic.selfMsg(this.$refs.uToast, '教务请求异常', 'error');
				});
		},
		selfMsg(msg) {
			this.$refs.uToast.show({ type: 'error', message: msg, duration: 1000 });
		}
	},
	watch: {
		selectData(newValue) {
			if (newValue != null) {
				this.isSelectorShow = false;
			} else {
				this.isSelectorShow = true;
			}
		}
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
	// justify-content: space-between;
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
		font-weight: bold;
		font-size: 15px;
		line-height: $top_h;
		text-align: center;
		color: $tit_color;
		position: sticky;
		top: 0;
		z-index: 10;
		background-color: #ffffff;
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
</style>
