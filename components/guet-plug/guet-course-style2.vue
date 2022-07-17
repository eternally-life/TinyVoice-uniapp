<template>
	<view class="week_style">
		<!-- 8列 -->
		<!-- 左侧序号 -->
		<view class="day_column">
			<view v-for="(item, index) in 6" :key="index" class="item_grid seq_num_self" :style="[getSeqBg(index)]" @click="showTime(index)">
				<view class="numItem">{{ getSingular(index) }}</view>
				<view class="numItem">{{ getEvenNum(index) }}</view>
			</view>
		</view>
		<!-- 右侧课程 -->
		<view v-for="(item_day, index_day) in courseData" :key="index_day" class="day_column">
			<view
				v-for="(item_grid, index_grid) in item_day"
				:key="index_grid"
				class="item_grid course_self zoomIn"
				:class="[isEmpty(item_grid) ? '' : 'empty_container', isOpenAnimat('course')]"
				@click="courseDataTap(item_grid)"
				:style="[getCourseBg(item_grid, index_day, index_grid)]"
			>
				<!-- 课程冲突样式 -->
				<view v-if="item_grid.length > 1" class="course_name">存在冲突课程！</view>
				<!-- 课程正常样式 -->
				<view v-else class="course_name">{{ item_grid.Cname }}</view>
				<!-- 根据课程内容判断是否显示教室 -->
				<text v-if="item_grid.CroomNo != undefound">{{ item_grid.CroomNo }}</text>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
	name: 'guet-course-style2',
	props: ['courseData'],
	data() {
		return {
			baseColorArrays: []
		};
	},
	methods: {
		// 点击显示时间
		showTime(index) {
			let str1 = this.coureTimeList[index][0],
				str2 = this.coureTimeList[index][1];
			uni.showModal({
				title: '上 课 时 间',
				content: str2 == undefined ? str1 : str1 + '\r\n' + str2,
				showCancel: false
			});
		},
		// 课程点击详情
		courseDataTap(para) {
			if (para.length == 0) return;
			else if (para.length > 1) {
				console.log('多课程冲突', para);
				uni.showModal({
					title: '重修冲突提示',
					content: '此时段存在冲突课程，\r\n请切换至 日/月 类型课表查看',
					showCancel: false
				});
			} else {
				console.log('单科', para);
				this.$store.commit('edu/setCourseDetails', para);
			}
		},
		/* 打乱背景色 */
		randColor() {
			let baseColorArrays = [],
				temp = this.colorList;
			for (let i = 0; i < 7; i++) {
				baseColorArrays.push([]);
				for (let j = 0; j < 6; j++) {
					baseColorArrays[i].push(temp[j]);
				}
				//填充完再乱序  防止对象引用 导致源数据被修改，影响其他组件的调用结果
				this.$u.randomArray(baseColorArrays[i]);
			}
			this.baseColorArrays = baseColorArrays;
		}
	},
	watch: {
		/* 监听传入的数组变化，数据变化时调用颜色乱序 */
		courseData() {
			this.randColor();
		}
	},
	computed: {
		...mapState('edu', ['colorList', 'coureTimeList']),
		...mapGetters('edu', ['getEvenNum', 'getSingular', 'isOpenAnimat']),
		getSeqBg(index) {
			return index => ({
				'background-color': this.colorList[index]
			});
		},
		// 获取课程背景色
		getCourseBg(item_grid, index_day, index_grid) {
			return (item_grid, index_day, index_grid) => {
				let tempArr = this.baseColorArrays;
				if (this.isEmpty(item_grid)) {
					return {
						'background-color': tempArr[index_day][index_grid]
					};
				}
				return {};
			};
		},
		//判断课程是否为空
		isEmpty(item_grid) {
			return item_grid => {
				return item_grid.length > 1 || item_grid.Cname ? true : false;
			};
		}
	},
	created() {
		// 课表背景乱序
		this.randColor();
	}
};
</script>

<style scoped lang="scss">
$item_height: 154rpx;
$item_width: 74rpx;
$empty_style: transparent !important;
.week_style {
	width: 90%;
	margin: 10rpx auto;
	display: flex;
	color: #ffffff;
	align-items: center;
	justify-content: space-between;
	.seq_num_self {
		font-size: 26rpx;
		.numItem {
			text-align: center;
			height: $item_height/2;
			line-height: $item_height/2;
		}
	}
	.day_column {
		width: $item_width;
		height: auto;
		.item_grid {
			width: 100%;
			height: $item_height;
			margin-bottom: 14rpx;
			border-radius: 20rpx;
		}
	}
	.course_self {
		font-size: 20rpx;
		display: inline-flex;
		text-align: center;
		flex-direction: column;
		justify-content: center;
		// background-color: #8a8a8a;
		.course_name {
			// max-height: 80rpx;
			// height: 84rpx;
			margin: 0 2rpx;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 3;
			overflow: hidden;
		}
	}
	/* 空课直接透明 */
	.empty_container {
		color: $empty_style;
		background-color: $empty_style;
	}
}
</style>
