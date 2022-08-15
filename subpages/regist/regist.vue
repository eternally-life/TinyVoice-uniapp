<template>
	<view class="container">
		<view class="userAvatar">
			<image :src="wxuserInfo.avatarUrl" mode="aspectFit"></image>
		</view>
		<view class="userInfo">
			<view class="userItem">
				<view class="left-icon">
					<view class="iconfont icon-zhanghao1"></view>
				</view>
				<view class="input__content">
					<input type="text" placeholder-class="input-placeholder" v-model="registInfo.nickName"
						placeholder="请输入昵称" id="nickname" />
				</view>
			</view>
			<view class="userItem">
				<view class="left-icon">
					<view class="iconfont icon-shouji"></view>
				</view>
				<view class="input__content">
					<input type="text" placeholder-class="input-placeholder" v-model="registInfo.phonenumber"
						placeholder="请输入手机号码" />
				</view>
			</view>
			<view class="userItem">
				<view class="left-icon">
					<view class="iconfont icon-yanzhengma1"></view>
				</view>
				<view class="input__content">
					<input type="text" placeholder-class="input-placeholder" v-model="registInfo.verificationCode"
						placeholder="请输入验证码" />
				</view>
				<view class="right-icon">
					<view class="" v-if="disabled"
						style="font-size: 24rpx;width: 140rpx;padding: 20rpx 0;color: #60c5ba;"
						@tap="GetVerificationCode">获取验证码</view>
					<view class="" v-else style="font-size: 24rpx;width: 140rpx;padding: 20rpx 0;color: #aaaaaa;">
						重新获取{{timer}}s</view>
				</view>
			</view>
			<view class="loginBtn">
				<view class="notice" @click="showExplain">{{noticeData.noticeTitle}}</view>
				<button class="btn" @click="submitRegist">验证注册</button>
			</view>
		</view>
		<!-- Toast 消息提示框 -->
		<u-toast ref="uToast"></u-toast>
		<u-modal :show="showAgreement" title="隐私说明" :closeOnClickOverlay="true" @confirm="showAgreement = false"
			@close="showAgreement = false">
			<view class="slot-content">
				<rich-text :nodes="noticeData.noticeContent"></rich-text>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import {
		authLoginregisterWxRegister_Post,
		authLoginregisterVerificationCode_Get,
		authLoginregisterWxLogin_Post,
	} from '@/api/SYSTEM/登录注册.js'

	import {
		systemParamsNoteList_Get,
		systemParamsNotenoticeId_Get
	} from '@/api/SYSTEM/参数字典公告.js'
	let timer = null;
	export default {
		data() {
			return {
				disabled: true,
				timer: 60,

				showTp: false, // 用于控制选择身份
				wxCode: '',
				wxuserInfo: {}, // 微信用户信息
				// 注册所用到的参数
				registInfo: {
					wxCode: null,
					/** 微信登录code   string required: */
					nickName: null,
					/** 用户昵称   string required: */
					sex: null,
					/** 用户性别  用户性别（0男 1女 2未知）   string required: */
					phonenumber: null,
					/** 手机号码   string required: */
					avatar: null,
					/** 用户头像url   string required: */
					email: null,
					/** 用户邮箱   string required: */
					verificationCode: null,
					/** 验证码   string required: */
				},
				showAgreement: false, // 显示隐私协议
				agreementNum: false, // 判断用户是否点了协议
				noticeData: {}
			};
		},

		onLoad(options) {
			this.wxuserInfo = JSON.parse(options.userInfo); // 字符串转对象
			this.registInfo.nickName = this.wxuserInfo.nickName;
			this.registInfo.avatar = this.wxuserInfo.avatarUrl;
			this.registInfo.sex = this.wxuserInfo.gender;
			this.getNoticeByNoticeID()
		},

		methods: {
			async getNoticeByNoticeID() {
				const res = await systemParamsNotenoticeId_Get({
					noticeId: 11
				})
				this.noticeData = res.data.data
			},
			showExplain() {
				// 点击协议的回调
				this.showAgreement = true;
				this.agreementNum = true;
			},
			async GetVerificationCode() {
				if (!uni.$u.test.mobile(this.registInfo.phonenumber)) {
					return this.selfMsg('请填写正确手机号码', 'warning');
				}
				const res = await authLoginregisterVerificationCode_Get({
					phonenumber: this.registInfo.phonenumber
				})
				if (res.data.code === 200) {
					this.selfMsg(res.data.data, 'success');
					this.disabled = false
					const authTimer = setInterval(() => {
						this.timer--
						if (this.timer <= 0) {
							this.disabled = true
							this.timer = 60
							clearInterval(authTimer)
						}
					}, 1000)
				} else {
					return this.selfMsg(res.data.data, 'warning');
				}
				console.log(res);

			},
			// 提交注册账号信息
			async submitRegist() {
				if (!this.registInfo.nickName) {
					return this.selfMsg('名称不能为空哦', 'warning');
				}
				if (!uni.$u.test.mobile(this.registInfo.phonenumber)) {
					return this.selfMsg('手机号格式错误', 'warning');
				}
				if (!this.registInfo.verificationCode) {
					return this.selfMsg('验证码不能为空', 'warning');
				}
				if (!this.agreementNum) {
					return this.selfMsg('请阅读《用户隐私说明》', 'warning');
				}
				uni.showLoading({
					title: '注册中',
					mask: true
				});
				if (timer !== null) {
					clearTimeout(timer);
				}
				timer = setTimeout(() => {
					uni.login({
						success: async res => {
							this.registInfo.wxCode = res.code;
							const result = await authLoginregisterWxRegister_Post(this.registInfo)
							console.log(result);
							if (result.data.code === 200) {
								this.selfMsg("注册成功", 'success');
								this.wxLogin()
								return;
							} else {
								return this.selfMsg(result.data.msg, 'warning');
							}
							uni.hideLoading();
						},
						fail(err) {
							console.log(err, '登录失败');
							uni.hideLoading();
						}
					});
				}, 300);
				// this.$refs.uUpload.upload()
			},
			wxLogin() {
				uni.showLoading({
					title: '正在登录',
					mask: true
				})
				if (timer !== null) {
					clearTimeout(timer)
				}
				timer = setTimeout(() => {
					uni.login({
						success: async (res) => {
							const reslut = await authLoginregisterWxLogin_Post({
								wxCode: res.code
							})
							console.log(reslut);
							if (reslut.data.code === 200) {
								// 存储全局 token
								getApp().globalData.token = reslut.data.data.access_token
								uni.setStorageSync("token", reslut.data.data.access_token)
								uni.reLaunch({
									url: '/pages/user/user',
									success: res => {
										this.$ShowToastNone('微信登录成功')
									}
								})
								return
							} else {
								return this.selfMsg("请30S后重试", 'warning')
							}
							uni.hideLoading()
						},
						fail: (err) => {
							uni.hideLoading()
							console.log(err, "登录失败");
						}
					})
				}, 300)
			},
			//消息提示
			selfMsg(msg, mod) {
				this.$refs.uToast.show({
					type: mod,
					message: msg
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.container {
		.userAvatar {
			width: 200rpx;
			margin: 50rpx auto;

			image {
				height: 200rpx;
				width: 200rpx;
				border-radius: 50%;
			}
		}

		.userInfo {
			background-color: #fff;
			border-radius: 30rpx;
			padding: 45rpx 50rpx;

			.userItem {
				border-radius: 50rpx;
				border: 1rpx solid #ccc;
				padding: 1rpx 30rpx;
				display: flex;
				align-items: center;
				min-height: 100rpx;
				margin: 40rpx 0;

				.left-icon {
					width: 10%;
					font-size: 44rpx;
					margin-left: 20rpx;

					.iconfont {
						font-size: 40rpx;
					}
				}

				.input__content {
					width: 80%;
					padding: 10rpx;

					&--verify-code {
						width: 56%;
					}

					input {
						font-size: 30rpx;
						// color: #60c5ba;;
						// letter-spacing: 0.1em;
					}
				}

			}

			.loginBtn {
				padding: 40rpx 0rpx;

				.notice {
					font-size: 25rpx;
					padding: 0 20rpx 10rpx;
					color: #60c5ba;
				}

				.btn {
					border-radius: 50rpx;
					background-image: linear-gradient(45deg, #3dc0d2, #43e3bd);
					color: #fff;
					font-weight: bold;
				}

			}
		}
	}
</style>
