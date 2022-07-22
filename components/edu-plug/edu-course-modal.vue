<!-- 组件模板 -->
<template>
	<view class="modal_mark" @touchmove.stop.prevent @click="clos" v-if="modelShow">
		<view class="modal_view ">
			<!-- 模态框标题 -->
			<view class="modal_tit rotateInDownLeft" :class="[isOpenAnimat('course_details')]"><view class="tit">课 程 详 细 信 息</view></view>
			<!-- 模态框数据容器 -->
			<view class="modal_container   flipInX" :class="[isOpenAnimat('course_details')]" @click.stop.prevent>
				<view class="data_list">
					<view class="item_left">课程名称</view>
					<view class="item_right">{{ courseDetails.Cname }}</view>
				</view>
				<view class="data_list">
					<view class="item_left">教 室</view>
					<view class="item_right">{{ courseDetails.CroomNo }}</view>
				</view>
				<view class="data_list">
					<view class="item_left">教师姓名</view>
					<view class="item_right">{{ courseDetails.Name }}</view>
				</view>
				<view class="data_list">
					<view class="item_left">课程序号</view>
					<view class="item_right">{{ courseDetails.Courseno }}</view>
				</view>
				<view class="data_list">
					<view class="item_left">课程代码</view>
					<view class="item_right">{{ courseDetails.CourseId }}</view>
				</view>
				<view class="data_list">
					<view class="item_left">课程性质</view>
					<view class="item_right">{{ courseDetails.Tname }}</view>
				</view>
				<view class="data_list">
					<view class="item_left">开课时间</view>
					<view class="item_right">第 {{ courseDetails.StartWeek }} ~ {{ courseDetails.EndWeek }} 周</view>
				</view>
			</view>
			<!-- 模态框底部确认 -->
			<view class="btn rotateInUpRight" :class="[isOpenAnimat('course_details')]" hover-class="hoveStyle" hover-stay-time="100">确 定</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
export default {
	name: 'edu-course-modal',
	data() {
		return {};
	},
	methods: {
		...mapMutations('edu', ['setModelShow', 'setCourseDetails']),
		// 关闭模态框  并清除数据
		clos(e) {
			this.setModelShow(false);
			this.setCourseDetails(null);
		}
	},
	computed: {
		...mapState('edu', ['modelShow', 'courseDetails']),
		...mapGetters('edu', ['isOpenAnimat'])
	}
};
</script>

<style scoped lang="scss">
$container_w: 300px;
$bodre_rad_size: 10px;
$tit_h: 44px;
$btn_h: 44px;
$item_margin: 20px;

@mixin com_all {
	width: $container_w;
	background-color: #ffffff;
	margin: 0 auto;
}
@mixin top_radiu {
	border-radius: $bodre_rad_size $bodre_rad_size 0px 0px;
}
$all_wh: 100%;
.modal_mark {
	width: $all_wh;
	height: $all_wh;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 20;
	background-color: rgba(12, 12, 12, 0.5);
	.modal_view {
		animation-duration: 1s;
		position: relative;
		top: 20vh;
		.modal_tit {
			@include com_all;
			@include top_radiu;
			.tit {
				width: 100%;
				height: $tit_h;
				line-height: $tit_h;
				color: #4cbbb9;
				font-size: 16px;
				font-weight: bold;
				text-align: center;
				background-color: #d4ecee;
				@include top_radiu;
			}
		}
		.modal_container {
			@include com_all;
			padding-top: $item_margin/2;
			border-bottom: 1px solid #d4ecee;
			.data_list {
				margin-bottom: $item_margin;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				font-size: 14px;
				.item_left {
					width: 60px;
					color: #7f7f7f;
					margin-left: $item_margin;
					margin-right: $item_margin;
				}
				.item_right {
					color: #000;
					width: 180px;
					margin-right: $item_margin;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}
			}
		}
		.btn {
			@include com_all;
			height: $btn_h;
			line-height: $btn_h;
			text-align: center;
			font-size: 14px;
			font-weight: bold;
			border-radius: 0 0 $bodre_rad_size $bodre_rad_size;
		}
		.hoveStyle {
			background-color: #d4ecee;
			line-height: $btn_h + 2px;
		}
	}
}
</style>
