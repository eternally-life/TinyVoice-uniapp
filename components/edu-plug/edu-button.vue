<!-- 教务入口 -->
<template>
	<view class="school">
		<u-scroll-list :indicator="false" indicatorColor="#ffffff" indicatorActiveColor="#cfcfcf">
			<view
				v-for="(item, index) in educaList"
				:key="index"
				@click="schoolTap(item)"
				hover-class="hove_style"
				hover-stay-time="500"
			>
				<view class="schoolItem"><view class="t-icon fix-t-icon" :class="item.icon"></view></view>
				{{ item.name }}
			</view>
		</u-scroll-list>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
const prf = 't-',
	urlPrf = '/subpages_edu/';
export default {
	name: 'edu-button',
	data() {
		return {
			educaList: [
				{
					name: '成绩',
					icon: prf + 'icon-chengji',
					src: 'final_exam',
					transferType: 0
				},
				{
					name: '已选课程',
					icon: prf + 'icon-yixuankecheng',
					src: 'selected_courses',
					transferType: 0
				},
				{
					name: '学分',
					icon: prf + 'icon-xuefen',
					src: 'credit',
					transferType: -1
				},
				{
					name: '学分绩',
					icon: prf + 'icon-xuefenji',
					src: 'gpa',
					transferType: 1
				},
				{
					name: '体测自算',
					icon: prf + 'icon-ticejisuan',
					src: 'test_physical',
					transferType: -1
				},
				{
					name: '英语均分',
					icon: prf + 'icon-yingyupingjunfen',
					src: 'english',
					transferType: -1
				},
				// {
				// 	name: '代查',
				// 	icon: prf + 'icon-pingjiao',
				// 	src: 'substitute_query_menu',
				// 	transferType: -1
				// }
				/*{
					name: '空教室',
					icon: prf + 'icon-pingjiao',
					src: '',
					transferType: -1
				} */
				/* {
					name: '选课',
					icon: prf + 'icon-pingjiao',
					src: '',
					transferType: -1
				},
				{
					name: '退课',
					icon: prf + 'icon-pingjiao',
					src: '',
					transferType: -1
				} */
			]
		};
	},
	methods: {
		// 教务入口点击
		schoolTap(para) {
			if (para.src == '') {
				this.$refs.uToast.show({ message: para.name + ' 功能暂未开放', type: 'success', duration: 1000 });
			} else {
				this.transferTypeChange(para.transferType);
				//此处 补全路径
				let aaa = urlPrf + para.src + '/' + para.src;
				this.toUrl(aaa);
			}
		},
		toUrl(srcPara) {
			uni.navigateTo({
				url: srcPara,
				fail(err) {
					console.log(err);
				}
			});
		},

		/* 修改跳转类型 */
		transferTypeChange(type) {
			if (type == -1) return;
			else {
				this.$store.commit('edu/setTransferType', type);
			}
		}
	}
};
</script>

<style scoped lang="scss">
$item_siz: 60rpx;
$icon_size: 54rpx;

.school {
	// margin-top: 40rpx;
	text-align: center;
	font-size: 24rpx;
	.schoolItem {
		width: $item_siz;
		height: $item_siz;
		margin: 0 28rpx;
		.fix-t-icon {
			width: $icon_size;
			height: $icon_size;
		}
	}
	.hove_style {
		background-color: #e7e7e7;
	}
}
</style>
