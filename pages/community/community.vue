<template>
	<view>
		<!-- <ty-file-upload @upPara="getImgData" paraGetMethods="active" /> -->
		<SmallVoice ref="smallVoice" />
		<!-- 微音发表跳转按钮 -->
		<!-- <view class="publish_btn">
      <u-button icon="plus" size="large" shape="circle" iconColor="#31b6c3" @click="openPopup"></u-button>
    </view>
    <u-popup :safeAreaInsetBottom="true" :safeAreaInsetTop="true" :show="show" :round="popupData.round"
      :overlay="popupData.overlay" :closeOnClickOverlay="popupData.closeOnClickOverlay" @close="close" @open="open">
      <u-grid col="3" :customStyle="{ paddingBottom: 199 + 'rpx' }">
        <u-grid-item :customStyle="{ paddingTop: 99 + 'rpx' }" v-for="(item, index) in publishList" :key="index"
          @click="publishVoice(index)">
          <image class="item_img" :src="item.icon" mode=""></image>
          <text class="item_text">{{ item.msg }}</text>
        </u-grid-item>
      </u-grid>
    </u-popup> -->
		<!-- #ifdef MP-QQ -->
		<ty-tabbar></ty-tabbar>
		<!-- #endif -->
	</view>
</template>

<script>
import smallVoice from './smallVoice.vue';
import { tabbar_hid } from '@/components/mixins/tabbar.js';
const bbs = require('@/api/社区模块/微音论坛.js');
export default {
	mixins: [tabbar_hid],
	data() {
		return {
			show: false,
			popupData: {
				overlay: true,
				// borderRadius: '',
				closeOnClickOverlay: true,
				// mode: 'bottom',
				round: 10
			},
			publishList: [
				{
					icon: '/static/Popup/shuoshuo.png',
					msg: '说说'
				},
				{
					icon: '/static/Popup/ershou.png',
					msg: '二手发布'
				},
				{
					icon: '/static/Popup/shiwuzhaoling.png',
					msg: '失物招领'
				},
				{
					icon: '/static/Popup/biaobai.png',
					msg: '表白'
				},
				{
					icon: '/static/Popup/guangfang.png',
					msg: '官方'
				},
				{
					icon: '/static/Popup/niming.png',
					msg: '匿名'
				}
			]
		};
	},
	onLoad() {
		this.getBbsList();
	},
	methods: {
		// 获取微音数据
		async getBbsList() {
			let communityTinybbsPage_Param = {
				pageNum: null /** 第几页    string required:false */,
				pageSize: null /** 页码大小    string required:false */,
				keyword: null /**     string required:false */,
				userId: null /** 根据用户ID筛选,可为空默认不筛选 可用于查询自己的微音,别人的微音    string required:false */,
				targetId: null /** 根据微音ID筛选,用于跳转目标    string required:false */,
				type: null /** 微音类型,可为空 默认不筛选 1-微音,2-二手市场,,3-失物招领,4-表白,5-官方,6-匿名    string required:false */,
				sort: null /** 排序类型,可为空 默认不筛选 1-热度,2-点赞,3-回复,4-时间    string required:false */,
				screenTime: null /** 时间筛选-可为空 默认筛选3天 值为筛选第 n 天内微音    string required:false */
			};

			const bbsDataList = await bbs.communityTinybbsPage_Get(communityTinybbsPage_Param);
			this.bbsList = bbsDataList.data.records;
		},
		getImgData(e) {
			console.log('页面接收到的组件返回数据', e, '总长' + e.length);
		},

		// 弹出层
		openPopup(popupData) {
			console.log('asdasd');
			this.popupData = popupData;
			uni.$u.sleep().then(() => {
				this.show = !this.show;
			});
		},
		open() {
			// console.log('open');
		},
		close() {
			this.show = false;
			// console.log('close');
		},
		onPullDownRefresh() {
			this.$refs.smallVoice.pullDownRefresh();
		},

		// 发表跳转
		publishVoice(index) {
			// console.log(index);
			if (index == 0) {
				uni.navigateTo({
					url: '/subpages_publish/publishVoice/publishVoice'
				});
			}
			if (index == 1) {
				uni.navigateTo({
					url: '/subpages_publish/fleaMarket/fleaMarket'
				});
			}
			if (index == 2) {
				uni.navigateTo({
					url: '/subpages_publish/lostFound/lostFound'
				});
			}
			if (index == 3) {
				uni.navigateTo({
					url: '/subpages_publish/speakNow/speakNow'
				});
			}
			if (index == 4) {
				uni.navigateTo({
					url: '/subpages_publish/publishVoice/publishVoice'
				});
			}
			if (index == 5) {
				uni.navigateTo({
					url: '/subpages_publish/publishVoice/publishVoice'
				});
			}
		}
	},
	components: {
		smallVoice
	}
};
</script>

<style lang="scss">
.publish_btn {
	position: fixed;
	bottom: 60rpx;
	right: 60rpx;
	width: 50px;
}

.item_img {
	height: 77rpx;
	width: 77rpx;
}

.item_text {
	font-size: 22rpx;
}
</style>
