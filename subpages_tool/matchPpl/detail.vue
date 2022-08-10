<template>
	<view :class="showShare ? 'fixed' : ''">
		<navigator class="back" openType="redirect" url="index">继续配对</navigator>
		<view class="head flex">
			<view class="show-head">
				<image class="image-show" :src="xzList[indexNan].image"></image>
				<image class="shadow" src="../../static/match/shadow.png"></image>
				<view class="name-show">{{ replaceTest('男') }}</view>
			</view>
			<view class="middle"><image class="love" src="../../static/match/match.png"></image></view>
			<view class="show-head">
				<image class="image-show" :src="xzList[indexNv].image"></image>
				<image class="shadow" src="../../static/match/shadow.png"></image>
				<view class="name-show">{{ replaceTest('女') }}</view>
			</view>
		</view>
		<view class="comment-box">
			{{ peidui.comment }}
			<image class="image-border" :src="border"></image>
		</view>
		<view class="detail-container">
			<view class="title">
				<image class="image-point" src="../../static/match/point.png"></image>
				配对指数
			</view>
			<view class="flex font-size-14">
				<view class="flex-item">
					<view class="flex margin-bottom-10">
						<view class="color-6">配对指数</view>
						<view class="color-3 margin-left-10">{{ peidui.score }}</view>
					</view>
					<view class="flex margin-bottom-10">
						<view class="color-6">配对比重</view>
						<view class="color-3 margin-left-10">{{ peidui.rate }}</view>
					</view>
				</view>
				<view class="flex-item">
					<view class="flex margin-bottom-10">
						<view class="color-6">两情相悦指数</view>
						<view class="color-3 margin-left-10">{{ peidui.num1 }}</view>
					</view>
					<view class="flex margin-bottom-10">
						<view class="color-6">天长地久指数</view>
						<view class="color-3 margin-left-10">{{ peidui.num2 }}</view>
					</view>
				</view>
			</view>
			<view class="title">
				<image class="image-point" src="../../static/match/point.png"></image>
				恋爱建议
			</view>
			<view class="advice">{{ peidui.advice }}</view>
			<view class="title">
				<image class="image-point" src="../../static/match/point.png"></image>
				注意事项
			</view>
			<view class="note">{{ peidui.note }}</view>
		</view>
		<view class="ad-box" v-if="version == 3 && showAdd && peidui != null">
			<view class="title">
				<image class="image-point" src="../../static/match/point.png"></image>
				相关推荐测
			</view>
			<view
				@tap="gotoFun"
				class="ad-item flex flex-center"
				:data-id="item.AppId"
				:data-path="item.Path"
				v-for="(item, index) in adList"
				:key="index"
			>
				<view class="ad-image"><image :src="item.ImageUrl"></image></view>

				<view class="ad-title">{{ item.Title }}</view>
			</view>
		</view>
		<navigator
			appId="wx2543189951584897"
			class="ad-left"
			target="miniProgram"
			version="develop"
			v-if="version == 3 && peidui != null"
		>
			<image src="../../static/match/test.png"></image>
			<view>专业测</view>
		</navigator>
		<!-- <navigator appId="wx3e971a14238dc8d3 " class="ad-right" target="miniProgram" version="develop" v-if="peidui != null">
            <image src="../../static/match/play.png"></image>
            <view>继续玩</view>
        </navigator> -->
		<view class="modal-container" v-if="!auth">
			<view class="modal-overlay"></view>
			<view class="modal-modal-auth">
				<view class="modal-title">提示</view>
				<view class="modal-des">需要获取您的头像昵称</view>
				<button @getuserinfo="bindGetUserInfo" @tap="hideAuth" class="btn-confirm" openType="getUserInfo">
					确定
				</button>
			</view>
		</view>
		<view @tap="showShareFun" class="shareButton" v-if="showBtn">分享配对</view>
		<!-- <view :class="'modal-container ' + (showShare ? '' : 'hide')">
            <view class="modal-overlay"></view>
            <view @tap="hideShare" class="modal-close">
                <image class="img-block" mode="widthFix" src="../../static/match/wrong.png"></image>
            </view>
            <view class="modal-modal">
                <canvas @tap="viewImage" canvasId="canvas-result"></canvas>
            </view>
            <button class="modal-btn1" openType="share">分享</button>
            <button @tap="saveImage" class="modal-btn2">保存</button>
        </view> -->
	</view>
</template>
<script>
var e = require('./data.js');

var a = require('../../utils/account.js');

var t = require('../../utils/promise.util.js');

var i = t.promisify(uni.getImageInfo);
var n = t.promisify(uni.canvasToTempFilePath);
var s = uni.createCanvasContext('canvas-result');
var app = getApp();
import { getXZList } from './detail_data.js';
export default {
	data() {
		return {
			xzData: e.data,

			xzList: getXZList(),

			indexNan: 0,
			indexNv: 0,
			version: 4,
			auth: true,
			showBtn: true,
			showShare: false,
			ratio: app.globalData.ratio,
			backImage: '../../static/match/back.png',
			loveImage: '../../static/match/match.png',
			border: '../../static/match/border.png',
			showAdd: false,
			adList: '',

			peidui: {
				score: '',
				rate: '',
				num1: '',
				num2: '',
				advice: '',
				note: ''
			},

			image: ''
		};
	},
	onLoad: function(e) {
		var that = this;
		e => {
			var t = e.data;
			console.log(e);

			if (void 0 != t && t.length > 0) {
				for (var i in t) {
					t[i].Path = 'index?url=' + encodeURIComponent(t[i].Path);
				}

				console.log(t);
				that.setData({
					showAdd: true,
					adList: t
				});
			}
		};
		e => {
			console.log(e.data.version);
			that.setData({
				version: e.data.version
			});
		};

		if (void 0 != e.indexNan) {
			that.setData({
				indexNan: e.indexNan
			});
		}

		if (void 0 != e.indexNv) {
			that.setData({
				indexNv: e.indexNv
			});
		}

		var t = that.xzData;
		var i = that.indexNan;
		var n = that.indexNv;
		var s = t[i][n];
		that.setData({
			peidui: s
		});
	},
	onReady: function() {},
	onShow: function() {},
	onHide: function() {},
	onUnload: function() {},
	onShareAppMessage: function() {
		var that = this;
		return {
			title: '星座配对',
			path: 'detail?indexNan=' + that.indexNan + '&indexNv=' + that.indexNv
		};
	},
	methods: {
		gotoFun: function(e) {
			var a = e.currentTarget.dataset.id;
			var t = e.currentTarget.dataset.path;
			uni.navigateToMiniProgram({
				appId: a,
				envVersion: 'develop',
				path: t
			});
		},
		replaceTest: function(sex) {
			console.log(this.indexNan, 'this.indexNan');
			if (sex == '男')
				return this.xzList[this.indexNan].name.substr(0, this.xzList[this.indexNan].name.length - 1) + sex;
			else return this.xzList[this.indexNv].name.substr(0, this.xzList[this.indexNv].name.length - 1) + sex;
		},

		showShareFun: function() {
			var that = this;
			var t = a.getName();
			var i = a.getImage();
			if (t && void 0 != i && '' != i) {
				that.paint(i, t);
			} else {
				uni.getSetting({
					success: function(t) {
						if (t.authSetting['scope.userInfo']) {
							uni.getUserInfo({
								success: function(t) {
									var i = t.userInfo.nickName;
									var n = t.userInfo.avatarUrl;
									a.setName(i);
									a.setImage(n);
									that.paint(n, i);
								}
							});
						} else {
							that.setData({
								auth: false
							});
						}
					},
					fail: function(e) {
						uni.navigateBack({
							delta: 0
						});
					}
				});
			}
		},

		hideShare: function() {
			this.setData({
				showBtn: true,
				showShare: false
			});
		},

		hideAuth: function() {
			this.setData({
				auth: true
			});
		},

		bindGetUserInfo: function(e) {
			var that = this;

			if ('getUserInfo:fail auth deny' == e.detail.errMsg) {
			} else {
				var i = e.detail.userInfo.nickName;
				var n = e.detail.userInfo.avatarUrl;
				a.setName(i);
				a.setImage(n);
				that.paint(n, i);
			}
		},

		viewImage: function() {
			n(
				{
					canvasId: 'canvas-result'
				},
				this
			).then(function(e) {
				uni.previewImage({
					urls: [e.tempFilePath]
				});
			});
		},

		saveImage: function() {
			n(
				{
					canvasId: 'canvas-result'
				},
				this
			).then(function(e) {
				uni.saveImageToPhotosAlbum({
					filePath: e.tempFilePath,
					success: function(e) {
						uni.showToast({
							title: '保存成功'
						});
					},
					fail: function(e) {
						uni.getSetting({
							success: function(e) {
								if (0 == e.authSetting['scope.writePhotosAlbum']) {
									uni.showModal({
										title: '是否授权保存至相册',
										content: '需要获取相册权限，请确认授权，或者点击图片长按保存至相册',
										success: function(e) {
											if (e.confirm) {
												uni.openSetting({});
											}
										}
									});
								}
							}
						});
					}
				});
			});
		},

		paint: function(e, a) {
			var that = this;
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			var n = this;
			var o = n.ratio;
			var r = n.peidui;
			var g = n.indexNan;
			var m = n.indexNv;
			var l = n.xzList;
			var d = l[g];
			var c = d.name.replace('座', '男');
			var u = l[m];
			var f = u.name.replace('座', '女');
			i({
				src: e
			})
				.then(function(e) {
					s.drawImage(n.backImage, 0, 0, 590 * o, 920 * o);
					s.drawImage(n.loveImage, 152 * o, 260 * o, 290 * o, 70 * o);
					s.drawImage(d.image, 50 * o, 200 * o, 160 * o, 160 * o);
					s.drawImage(u.image, 386 * o, 200 * o, 160 * o, 160 * o);
					s.save();
					s.setTextBaseline('top');
					s.setTextAlign('center');
					s.setFontSize(30 * o);
					s.setFillStyle('#ffffff');
					s.fillText(a, 295 * o, 132 * o);
					s.setFontSize(36 * o);
					s.fillText(r.comment, 295 * o, 464 * o);
					s.setFontSize(30 * o);
					s.setFillStyle('#1e1459');
					s.fillText(c, 130 * o, 390 * o);
					s.fillText(f, 466 * o, 390 * o);
					s.setTextAlign('left');
					s.setFontSize(28 * o);
					s.setFillStyle('#666666');
					s.fillText('配对指数', 50 * o, 590 * o);
					s.fillText('配对比重', 50 * o, 650 * o);
					s.fillText('两情相悦指数', 320 * o, 590 * o);
					s.fillText('天长地久指数', 320 * o, 650 * o);
					s.setFillStyle('#333333');
					s.fillText(r.score, 186 * o, 590 * o);
					s.fillText(r.rate, 186 * o, 650 * o);
					s.fillText(r.num1, 510 * o, 590 * o);
					s.fillText(r.num2, 510 * o, 650 * o);
					s.arc(295 * o, 75 * o, 50 * o, 0, 2 * Math.PI);
					s.clip();
					s.drawImage(e.path, 245 * o, 25 * o, 100 * o, 100 * o);
					s.draw();
					that.setData({
						showBtn: false,
						showShare: true
					});
					setTimeout(function() {
						uni.hideLoading();
					}, 200);
				})
				.catch(function(e) {
					uni.hideLoading();
					uni.showToast({
						title: '图片生成失败,请重试',
						icon: 'none'
					});
				});
		}
	}
};
</script>
<style>
@import './detail.css';
</style>
