<template>
	<view>
		测试 tabbar3 图片上传示例
		<ty-file-upload @upPara="getImgData" paraGetMethods="active" />

		
		
		<!-- 微音发表跳转按钮 -->
		<view class="publish_btn">
			<u-button icon="plus" size="large" shape="circle" iconColor="#31B6C3" @click="openPopup"></u-button>
		</view>
		<u-popup :safeAreaInsetBottom="true" :safeAreaInsetTop="true" :show="show" :round="popupData.round"
			:overlay="popupData.overlay" :closeOnClickOverlay="popupData.closeOnClickOverlay" @close="close"
			@open="open">
			<u-grid col="3" :customStyle="{paddingBottom:199+'rpx'}">
				<u-grid-item :customStyle="{paddingTop:99+'rpx'}" 
					v-for="(item,index) in publishList" :key="index" @click="publishVoice(index)">
					<image class="item_img" :src="item.icon" mode=""></image>
					<text class="item_text">{{item.msg}}</text>
				</u-grid-item>
			</u-grid>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				popupData: {
					overlay: true,
					// borderRadius: '',
					closeOnClickOverlay: true,
					// mode: 'bottom',
					round: 10,
				},
				publishList: [{
					icon: "/static/Popup/shuoshuo.png",
					msg: "说说"
				}, {
					icon: "/static/Popup/ershou.png",
					msg: "二手发布"
				}, {
					icon: "/static/Popup/shiwuzhaoling.png",
					msg: "失物招领"
				}, {
					icon: "/static/Popup/biaobai.png",
					msg: "表白"
				}, {
					icon: "/static/Popup/guangfang.png",
					msg: "官方"
				}, {
					icon: "/static/Popup/niming.png",
					msg: "匿名"
				}],
			}
		},
		methods: {
			getImgData(e) {
				console.log('页面接收到的组件返回数据', e, '总长' + e.length);
			},

			// 弹出层
			openPopup(popupData) {
				console.log('asdasd');
				this.popupData = popupData
				uni.$u.sleep().then(() => {
					this.show = !this.show
				})
			},
			open() {
				// console.log('open');
			},
			close() {
				this.show = false
				// console.log('close');
			},


			// 发表跳转
			publishVoice(index) {
				console.log(index);
				if(index == 0){
					uni.navigateTo({
						url:"/subpages_publish/publishVoice/publishVoice"
					})
				}
				if(index == 1){
					uni.navigateTo({
						url:"/subpages_publish/fleaMarket/fleaMarket"
					})
				}
				if(index == 2){
					uni.navigateTo({
						url:"/subpages_publish/lostFound/lostFound"
					})
				}
				if(index == 3){
					uni.navigateTo({
						url:"/subpages_publish/speakNow/speakNow"
					})
				}
				if(index == 4){
					uni.navigateTo({
						url:"/subpages_publish/publishVoice/publishVoice"
					})
				}
				if(index == 5){
					uni.navigateTo({
						url:"/subpages_publish/publishVoice/publishVoice"
					})
				}
			}

		}
	};
</script>

<style lang="scss">
	.publish_btn {
		position: absolute;
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
