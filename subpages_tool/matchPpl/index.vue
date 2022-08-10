<template>
	<view>
		<view @tap="hideSave" class="saveBox" v-if="showSave">
			<view class="closeSave">×</view>
			<view>添加到我的小程序</view>
			<view>随时玩随时测</view>
		</view>
		<view class="show-nan">
			<image class="image-show" :src="xzList[indexNan].image"></image>
			<image class="shadow" src="../../static/match/shadow.png"></image>
			<view @tap="showPopupFun" class="name-show">{{ replaceTest('男') }} ⇌</view>
		</view>
		<image class="love" src="../../static/match/love.png"></image>
		<view class="show-nv">
			<image class="image-show" :src="xzList[indexNv].image"></image>
			<image class="shadow" src="../../static/match/shadow.png"></image>
			<view @tap="showPopupFun" class="name-show">{{ replaceTest('女')  }} ⇌</view>
		</view>
		<navigator class="link" :url="'detail?indexNan=' + indexNan + '&&indexNv=' + indexNv">星座配对</navigator>
		<view @tap="hidePopup" class="model-mask" v-if="showPopup"></view>
		<view :animation="animationData" class="choose-model" v-if="showPopup">
			<view class="image-title">
				<image src="../../static/match/popup.png"></image>
				<view @tap="hidePopup" class="close-popup">确认</view>
			</view>
			<view class="popup-title">选择星座</view>
			<view class="flex side-title">
				<view class="flex-item">男生</view>
				<view class="flex-item">女生</view>
			</view>
			<view class="flex scroll-container">
				<view class="scroll-fa">
					<scroll-view @scroll="scrollNan" class="scroll-box" :scrollTop="scrollTopNan"
						:scrollWithAnimation="true" :scrollX="false" :scrollY="true">
						<view class="scroll-item"></view>
						<view @tap="changeNan" :class="'scroll-item ' + (index == indexNan ? 'active nan' : '')"
							:data-index="index" v-for="(item, index) in nanList" :key="index">
							<image class="xz-image" :src="item.image"></image>

							<view class="xz-name">{{ item.name }}</view>
						</view>
						<view class="scroll-item"></view>
					</scroll-view>
				</view>
				<view class="peidui-image">
					<image class="peidui" src="../../static/match/match.png"></image>
				</view>
				<view class="scroll-fa">
					<scroll-view @scroll="scrollNv" class="scroll-box" :scrollTop="scrollTopNv"
						:scrollWithAnimation="true" :scrollX="false" :scrollY="true">
						<view class="scroll-item"></view>
						<view @tap="changeNv" :class="'scroll-item ' + (index == indexNv ? 'active nv' : '')"
							:data-index="index" v-for="(item, index) in nvList" :key="index">
							<image class="xz-image" :src="item.image"></image>

							<view class="xz-name">{{ item.name }}</view>
						</view>
						<view class="scroll-item"></view>
					</scroll-view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	var app = getApp();
	export default {
		data() {
			return {
				xzList: [{
						image: '../../static/match/by.png',
						name: '白羊座',
						time: '3.21-4.19'
					},
					{
						image: '../../static/match/jn.png',
						name: '金牛座',
						time: '4.20-5.20'
					},
					{
						image: '../../static/match/sz.png',
						name: '双子座',
						time: '5.21-6.21'
					},
					{
						image: '../../static/match/jx.png',
						name: '巨蟹座',
						time: '6.22-7.22'
					},
					{
						image: '../../static/match/shizi.png',
						name: '狮子座',
						time: '7.23-8.22'
					},
					{
						image: '../../static/match/cn.png',
						name: '处女座',
						time: '8.23-9.22'
					},
					{
						image: '../../static/match/tc.png',
						name: '天秤座',
						time: '9.23-10.23'
					},
					{
						image: '../../static/match/tx.png',
						name: '天蝎座',
						time: '10.24-11.22'
					},
					{
						image: '../../static/match/ss.png',
						name: '射手座',
						time: '11.23-12.21'
					},
					{
						image: '../../static/match/mj.png',
						name: '魔羯座',
						time: '12.22-1.19'
					},
					{
						image: '../../static/match/sp.png',
						name: '水瓶座',
						time: '1.20-2.18'
					},
					{
						image: '../../static/match/sy.png',
						name: '双鱼座',
						time: '2.19-3.20'
					}
				],

				nanList: [{
						image: '../../static/match/nan/by.png',
						name: '白羊座',
						time: '3.21-4.19'
					},
					{
						image: '../../static/match/nan/jn.png',
						name: '金牛座',
						time: '4.20-5.20'
					},
					{
						image: '../../static/match/nan/sz.png',
						name: '双子座',
						time: '5.21-6.21'
					},
					{
						image: '../../static/match/nan/jx.png',
						name: '巨蟹座',
						time: '6.22-7.22'
					},
					{
						image: '../../static/match/nan/shizi.png',
						name: '狮子座',
						time: '7.23-8.22'
					},
					{
						image: '../../static/match/nan/cn.png',
						name: '处女座',
						time: '8.23-9.22'
					},
					{
						image: '../../static/match/nan/tc.png',
						name: '天秤座',
						time: '9.23-10.23'
					},
					{
						image: '../../static/match/nan/tx.png',
						name: '天蝎座',
						time: '10.24-11.22'
					},
					{
						image: '../../static/match/nan/ss.png',
						name: '射手座',
						time: '11.23-12.21'
					},
					{
						image: '../../static/match/nan/mj.png',
						name: '魔羯座',
						time: '12.22-1.19'
					},
					{
						image: '../../static/match/nan/sp.png',
						name: '水瓶座',
						time: '1.20-2.18'
					},
					{
						image: '../../static/match/nan/sy.png',
						name: '双鱼座',
						time: '2.19-3.20'
					}
				],

				nvList: [{
						image: '../../static/match/nv/by.png',
						name: '白羊座',
						time: '3.21-4.19'
					},
					{
						image: '../../static/match/nv/jn.png',
						name: '金牛座',
						time: '4.20-5.20'
					},
					{
						image: '../../static/match/nv/sz.png',
						name: '双子座',
						time: '5.21-6.21'
					},
					{
						image: '../../static/match/nv/jx.png',
						name: '巨蟹座',
						time: '6.22-7.22'
					},
					{
						image: '../../static/match/nv/shizi.png',
						name: '狮子座',
						time: '7.23-8.22'
					},
					{
						image: '../../static/match/nv/cn.png',
						name: '处女座',
						time: '8.23-9.22'
					},
					{
						image: '../../static/match/nv/tc.png',
						name: '天秤座',
						time: '9.23-10.23'
					},
					{
						image: '../../static/match/nv/tx.png',
						name: '天蝎座',
						time: '10.24-11.22'
					},
					{
						image: '../../static/match/nv/ss.png',
						name: '射手座',
						time: '11.23-12.21'
					},
					{
						image: '../../static/match/nv/mj.png',
						name: '魔羯座',
						time: '12.22-1.19'
					},
					{
						image: '../../static/match/nv/sp.png',
						name: '水瓶座',
						time: '1.20-2.18'
					},
					{
						image: '../../static/match/nv/sy.png',
						name: '双鱼座',
						time: '2.19-3.20'
					}
				],

				indexNan: 0,
				indexNv: 0,
				showPopup: false,
				animationData: {},
				ratio: app.globalData.ratio,
				scrollTopNan: 0,
				scrollTopNv: 0,
				showSave: true,
				image: ''
			};
		},
		onLoad: function(e) {
			var that = this;
			setTimeout(function() {
				that.hideSave();
			}, 60000);
		},
		onShow: function() {},
		onShareAppMessage: function() {},
		methods: {
			replaceTest: function(sex) {
				console.log(this.indexNan,'this.indexNan');
				if (sex == '男') return this.xzList[this.indexNan].name.substr(0, this.xzList[this.indexNan].name.length - 1) + sex
				else return this.xzList[this.indexNv].name.substr(0, this.xzList[this.indexNv].name.length - 1) + sex
			},
			showPopupFun: function() {
				var that = this;
				var a = uni.createAnimation({
					duration: 200,
					timingFunction: 'linear',
					delay: 0
				});
				this.animation = a;
				a.translateY(500).step();
				this.setData({
					animationData: a.export(),
					showPopup: true
				});
				setTimeout(function() {
					a.translateY(0).step();
					that.setData({
						animationData: a.export()
					});
				}, 100);
			},

			hidePopup: function() {
				var e = this.indexNan;
				var a = this.indexNv;
				var n = this.ratio;
				var i = uni.createAnimation({
					duration: 200,
					timingFunction: 'linear',
					delay: 0
				});
				this.animation = i;
				i.translateY(500).step();
				this.setData({
					animationData: i.export()
				});
				setTimeout(
					()=>{
						i.translateY(0).step();
						this.setData({
							animationData: i.export(),
							showPopup: false,
							scrollTopNan: e * n * 220,
							scrollTopNv: a * n * 220
						});
					},
					100
				);
			},

			scrollNan: function(e) {
				var that = this;
				var n = 220 * that.ratio;
				var i = e.detail.scrollTop;
				var t = parseInt(i / n + 0.5);
				if (t > 11) {
					t = 11;
				} else {
					t = t;
				}

				that.setData({
					indexNan: t
				});
			},

			scrollNv: function(e) {
				var that = this;
				var n = 220 * that.ratio;
				var i = e.detail.scrollTop;
				var t = parseInt(i / n + 0.5);
				if (t > 11) {
					t = 11;
				} else {
					t = t;
				}

				that.setData({
					indexNv: t
				});
			},

			changeNan: function(e) {
				var that = this;
				var n = that.ratio;
				var i = that.indexNan;
				var t = e.currentTarget.dataset.index;
				if (i != t) {
					that.setData({
						indexNan: t,
						scrollTopNan: t * n * 220
					});
				}
			},

			changeNv: function(e) {
				var that = this;
				var n = that.ratio;
				var i = that.indexNv;
				var t = e.currentTarget.dataset.index;
				if (i != t) {
					that.setData({
						indexNv: t,
						scrollTopNv: t * n * 220
					});
				}
			},

			hideSave: function() {
				this.setData({
					showSave: false
				});
			}
		}
	};
</script>
<style>
	@import './index.css';
</style>
