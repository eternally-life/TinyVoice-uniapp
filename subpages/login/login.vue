<template>
	<view class="content">
		<view class="login">
			<view class="userLoginForm">

				<view class="UserLoginItem ">
					<view class="title">
						<view class="iconfont icon-shouji"></view>
					</view>
					<input type="text" style="width: 100%;" placeholder="请输入手机号" v-model="phonenumber"
						id="phonenumber" />
				</view>
				<view class="UserLoginItem ">
					<view class="title">
						<view class="iconfont icon-yanzhengma1"></view>
					</view>
					<input style="width: 100%;" placeholder="请输入验证码" v-model="verificationCode" id="verificationCode" />
					<view class="right-icon">
						<view class="" v-if="disabled"
							style="font-size: 24rpx;width: 140rpx;padding: 20rpx 0;color: #60c5ba;"
							@tap="GetVerificationCode(phonenumber)">获取验证码</view>
						<view class="" v-else style="font-size: 24rpx;width: 140rpx;padding: 20rpx 0;">重新获取{{timer}}s
						</view>
					</view>
				</view>
				<view class="fogetPassword" @click="showMsg = true">
					忘记密码？
				</view>
				<view class="loginBtn">
					<!-- <text class="btnValue">登 录</text> -->
					<button class="btn" @click="confirmUserLogin" hover-class="background-color:#fff;"
						hover-stay-time="1000">验证登录</button>
				</view>
				<view class="regist">
					还没有账号？<text @tap="toRegist">立即注册</text>
				</view>
				<!-- #ifdef MP-WEIXIN -->
				<u-divider height="80" fontSize="26" half-width="200" border-color="#6d6d6d" text="第三方登录"></u-divider>
				<!-- #endif -->
				<view class="thirdPartyLogin">
					<!-- #ifdef MP-WEIXIN -->
					<view class="wxLogin" @click="wxLogin">
						<!-- <i class="iconfont iconwx">&#xe6b9;</i> -->
						<view class="t-icon-weixindenglu" style="width: 60rpx; height: 60rpx;"></view>
						<br />微信
					</view>
					<!-- #endif -->
					<!-- #ifdef MP-QQ -->
					<view class="qqLogin" @tap="qqLogin">
						<view class="t-icon-QQdenglu" style="width: 60rpx; height: 60rpx;"></view>
						<br />QQ
					</view>
					<!-- #endif -->
					<view class="wxLogin" @click="judgesLogin" v-if="showJugdesButton">
						<view class="t-icon-zhanghao" style="width: 60rpx; height: 60rpx;"></view>
						<br />评委
					</view>
					<view class="visit" @tap="visit">
						<view class="t-icon-zhanghao" style="width: 60rpx; height: 60rpx;"></view>
						<br />游客
					</view>
				</view>
			</view>
		</view>
		<!-- Toast 消息提示框 -->
		<u-toast ref="uToast"></u-toast>
		<u-modal :show="showMsg" title="温馨提示" :content='content' :closeOnClickOverlay="true" @confirm="showMsg = false"
			@close="showMsg = false"></u-modal>
		<u-modal :show="showTips" title="温馨提示" :content='contentTips' :closeOnClickOverlay="true"
			@confirm="showTips = false" @close="showTips = false"></u-modal>
		<u-popup :show="showBindPhone" @close="showBindPhone = false" mode="center" :round="10">
			<view class="sales">
				<view class="salesItem">
					<view class="name">未绑定手机号，绑定即可微信登录</view>
					<!-- <view class="content">
						<u--input placeholder="请输入绑定的手机号" border="surround" clearable v-model="bindPhoneNumber">
						</u--input>
					</view> -->
					<view class="content ">
						<view class="title">
							<view class="iconfont icon-shouji"></view>
						</view>
						<input type="text" style="width: 100%;" placeholder="请输入手机号" v-model="bindPhoneNumber" />
					</view>
					<view class="content ">
						<view class="title">
							<view class="iconfont icon-yanzhengma1"></view>
						</view>
						<input style="width: 100%;" placeholder="请输入验证码" v-model="bindCode" />
						<view class="right-icon">
							<view class="" v-if="disabled"
								style="font-size: 24rpx;width: 140rpx;padding: 20rpx 0;color: #60c5ba;"
								@tap="GetVerificationCode(bindPhoneNumber)">获取验证码</view>
							<view class="" v-else style="font-size: 24rpx;width: 140rpx;padding: 20rpx 0;">
								重新获取{{timer}}s
							</view>
						</view>
					</view>
				</view>
				<view class="nextStep">
					<button class="btn" @click="cancelBindPhone">确定绑定</button>
				</view>
			</view>
		</u-popup>
		<u-notify ref="uNotify"></u-notify>
	</view>
</template>

<script>
	import {
		authLoginregisterVerificationCodeLogin_Post,
		authLoginregisterVerificationCode_Get,
		authLoginregisterWxLogin_Post,
		authLoginregisterLogin_Post
	} from '@/api/SYSTEM/登录注册.js'
	import {
		systemParamsNoteList_Get,
		systemParamsConfList_Get
	} from '@/api/SYSTEM/参数字典公告.js'
	import {
		systemTinyuserUpdatePhonenumber_Post
	} from '@/api/SYSTEM/用户信息.js'
	let timer = null
	export default {
		data() {
			return {
				disabled: true,
				timer: 60,
				phonenumber: '',
				verificationCode: '',
				showMsg: false, // 提示教务密码
				content: '很抱歉我们无法提供密码修改服务。\r\n\n修改密码请登录学校内网 192.168.5.26 进行修改。\r\n\n若是忘记密码，请咨询 [辅导员] 或联系 [教秘] 进行修改',
				showTips: false, // 用于提示QQ的登录问题
				contentTips: '暂不支持qq注册，敬请谅解。\r\n\n如想使用qq小程序，请先在微信小程序<<校园微音>>注册登录！',
				showJugdesButton: null,
				showBindPhone: false,
				bindPhoneNumber: "",
				bindCode: ""
			}
		},
		onLoad(opt) {
			if (opt.num) {
				this.showBindPhone = true
			}
			this.getPamesList()
		},
		methods: {
			async getPamesList() {
				const res = await systemParamsConfList_Get();
				if (res.data.code === 200) {
					console.log(res, '55');
					let pamesList = res.data.data;
					for (let i = 0; i < pamesList.length; i++) {
						if (pamesList[i].configKey === 'judges:experience:button') {
							pamesList[i].configValue == 'true' ? this.showJugdesButton = true : this.showJugdesButton =
								false
						}
					}
				}
			},
			// 存储公告和参数信息
			setNotic_Pamres() {
				systemParamsNoteList_Get().then(res => { // 存储公告信息
					if (res.data.code === 200) {
						uni.setStorageSync("noticeList", res.data.rows)
					}
				})
				systemParamsConfList_Get().then(res => { // 存储参数信息
					if (res.data.code === 200) {
						uni.setStorageSync("pamesList", res.data.rows)
					}
				})
			},
			judgesLogin() { // 评委登录
				authLoginregisterLogin_Post({
					password: 'admin123',
					username: 'admin'
				}).then(reslut => {
					if (reslut.data.code === 200) {
						this.setNotic_Pamres()
						// 存储全局 token
						getApp().globalData.token = reslut.data.data.access_token
						uni.setStorageSync("token", reslut.data.data.access_token)
						uni.reLaunch({
							url: '/pages/user/user',
							success: res => {
								this.$ShowToastNone('登录成功')
							}
						})
						return
					} else {
						return this.selfMsg(reslut.data.msg, 'warning')
					}
				}).catch(err => {
					console.log(err);
				})
			},
			// 跳转到注册页面
			toRegist() {
				// #ifdef MP-WEIXIN
				uni.getUserProfile({
					desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					lang: 'zh_CN',
					success(res) {
						// uni.setStorageSync("wxuserInfo",res.userInfo)
						var userInfo = JSON.stringify(res.userInfo);
						uni.navigateTo({
							url: '/subpages/regist/regist?userInfo=' + userInfo
						})
					},
					fail: err => {
						return this.selfMsg('取消注册', 'warning')
					}
				})
				// #endif
				// #ifdef MP-QQ
				this.showTips = true
				// #endif

			},
			async GetVerificationCode(phone) {
				if (!uni.$u.test.mobile(phone)) {
					return this.selfMsg('请填写正确手机号码', 'warning');
				}
				const res = await authLoginregisterVerificationCode_Get({
					phonenumber: phone
				})
				this.selfMsg(res.data.data, 'success');
				if (res.data.code === 200) {
					this.disabled = false
					const authTimer = setInterval(() => {
						this.timer--
						if (this.timer <= 0) {
							this.disabled = true
							this.timer = 60
							clearInterval(authTimer)
						}
					}, 1000)
				}
				console.log(res);

			},
			// 确定账户登录的回调
			confirmUserLogin() {
				if (!this.phonenumber) {
					return this.selfMsg('手机号不能为空', 'warning')
				}
				if (!uni.$u.test.mobile(this.phonenumber)) {
					return this.selfMsg('请填写正确手机号码', 'warning');
				}
				if (!this.verificationCode) {
					return this.selfMsg('验证码不能为空', 'warning')
				}
				uni.showLoading({
					title: '正在登录',
					mask: true
				})
				if (timer !== null) {
					clearTimeout(timer)
				}
				timer = setTimeout(() => {
					authLoginregisterVerificationCodeLogin_Post({
						phonenumber: this.phonenumber,
						verificationCode: this.verificationCode,
					}).then(res => {
						console.log(res);
						if (res.data.code === 200) {
							this.setNotic_Pamres()
							getApp().globalData.token = res.data.data.access_token
							uni.setStorageSync("token", res.data.data.access_token)
							// #ifdef MP-QQ
							uni.login({
								success: (resQQ) => {
									authTokenauthBindQQ_Post({
										password: this.password,
										username: this.username,
										qqCode: resQQ.code
									}).then(reslut => {
										if (reslut.data.code === 200) {
											return this.$ShowToastNone('绑定成功，可使用快捷登录')
										} else {
											return this.$ShowToastNone('请先去微信小程序注册！')
										}
										uni.hideLoading()
									})
								},
								fail: (erra) => {
									console.log(erra, 'qq登录');
								}
							})
							// #endif
							uni.reLaunch({
								url: '/pages/user/user',
								success: res => {
									// #ifdef MP-WEIXIN
									this.$ShowToastNone('登录成功')
									// #endif
								}
							})
							return
						} else {
							uni.showModal({
								title: '账号未注册',
								confirmText: '去注册',
								content: '账号密码来源于教务系统\r\n注册成功即可使用第三方快捷登录',
								cancelText: '暂不注册',
								confirmColor: '#0099ff',
								cancelColor: '#000000',
								success: (res) => {
									if (res.confirm) {
										uni.getUserProfile({
											desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
											lang: 'zh_CN',
											success: res => {
												// uni.setStorageSync("wxuserInfo",res.userInfo)
												var userInfo = JSON.stringify(res
													.userInfo);
												let loginData = {
													password: this.password,
													username: this.username,
												}
												uni.navigateTo({
													url: '/subpages/regist/regist?userInfo=' +
														userInfo +
														'&loginData=' +
														JSON.stringify(
															loginData)
												})
											},
											fail(err) {
												console.log(err);
											}
										})
									}
								},
							})
							return
						}
						uni.hideLoading()
					}).catch(err => {
						console.log(err);
					})
				}, 300)
			},
			qqLogin() { // qq登录
				uni.showLoading({
					title: '正在登录',
					mask: true
				})
				if (timer !== null) {
					clearTimeout(timer)
				}
				timer = setTimeout(() => {
					uni.login({
						success: (res) => {
							authTokenauthCommonLogin_Post({
								loginType: 3,
								qqCode: res.code
							}).then(reslut => {
								console.log(reslut);
								if (reslut.data.code === 8081) {
									return this.selfMsg('请先账号密码登录qq绑定', 'warning')
								}
								if (reslut.data.code === 200) {
									this.setNotic_Pamres()
									// 存储全局 token
									getApp().globalData.token = reslut.data.data.access_token
									uni.setStorageSync("token", reslut.data.data.access_token)
									uni.reLaunch({
										url: '/pages/user/user',
										success: res => {
											this.$ShowToastNone('QQ登录成功')
										}
									})
									return
								} else {
									return this.selfMsg('账号不存在，请先注册', 'warning')
								}
							})
							uni.hideLoading()
						},
						fail: (err) => {
							uni.hideLoading()
							console.log(err, "登录失败");
						}
					})
				}, 300)
			},

			// 微信登录
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
						success: (res) => {
							authLoginregisterWxLogin_Post({
								wxCode: res.code
							}).then(reslut => {
								console.log(reslut);
								if (reslut.data.code === 200) {
									this.setNotic_Pamres()
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
								} else if (reslut.data.code === 5555) {
									this.showBindPhone = true
								} else {
									return this.selfMsg(reslut.data.msg, 'warning')
								}
							})
							uni.hideLoading()
						},
						fail: (err) => {
							uni.hideLoading()
							console.log(err, "登录失败");
						}
					})
				}, 300)
			},

			async cancelBindPhone() {
				if (!this.bindPhoneNumber) {
					return this.selfNotify('手机号不能为空', 'warning')
				}
				if (!uni.$u.test.mobile(this.bindPhoneNumber)) {
					return this.selfNotify('请填写正确手机号码', 'warning')
				}
				if (!this.bindCode) {
					return this.selfNotify('验证码不能为空', 'warning')
				}
				getApp().globalData.loginNum = 1
				const res = await systemTinyuserUpdatePhonenumber_Post({
					code: this.bindCode,
					phonenumber: this.bindPhoneNumber
				})
				console.log(res);
				if (res.data.code === 200) {
					this.showBindPhone = false
					this.selfNotify('绑定成功', 'success')
					this.wxLogin()
				} else {
					this.selfNotify(res.data.msg, 'warning')
				}
			},
			// 游客模式
			visit() {
				uni.showModal({
					title: '当前为游客模式',
					content: '此模式将无法提供教务等个性化功能，确定不登录直接进入？',
					confirmText: '去登录',
					cancelText: '直接进入',
					confirmColor: '#0099ff',
					cancelColor: '#ff0000',
					success: res => {
						if (res.cancel) {
							// 点击取消 不登录 进入我的主页
							uni.reLaunch({
								url: '/pages/user/user',
							});
						}
					}
				});
			},
			//消息提示
			selfMsg(msg, mod) {
				this.$refs.uToast.show({
					type: mod,
					message: msg
				})
			},
			selfNotify(msg, mod) {
				this.$refs.uNotify.show({
					type: mod,
					message: msg,
					duration: 1000 * 2,
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		.sales {
			// padding: 20rpx 30rpx 0rpx;
			margin: 40rpx;

			.salesItem {

				.name {
					padding-bottom: 50rpx;
					font-weight: bold;
					text-align: center;
				}

				.content {
					border-radius: 50rpx;
					// background-color: #efefef;
					border: 1rpx solid #ccc;
					padding: 1rpx 30rpx;
					display: flex;
					align-items: center;
					min-height: 100rpx;
					margin: 30rpx 0;

					.title {
						.iconfont {
							padding: 0 15rpx;
							font-size: 38rpx;
						}

					}

					input {
						font-size: 30rpx;
					}
				}
			}

			.nextStep {
				padding-top: 20rpx;

				.btn {
					background-color: #60C5BA;
					color: #fff;
					font-weight: bold;
				}
			}
		}

		.login {
			background-color: #fff;
			border-radius: 30rpx;
			padding: 200rpx 45rpx;
			// margin: 100rpx 40rpx;

			.userLoginForm {
				.UserLoginItem {
					border-radius: 50rpx;
					// background-color: #efefef;
					border: 1rpx solid #ccc;
					padding: 1rpx 30rpx;
					display: flex;
					align-items: center;
					min-height: 100rpx;
					margin: 30rpx 0;

					.title {
						.iconfont {
							padding: 0 15rpx;
							font-size: 38rpx;
						}

					}

					input {
						font-size: 30rpx;
					}
				}

				// 忘记密码
				.fogetPassword {
					color: #ccc;
					font-size: 24rpx;
					text-align: right;
				}

				.loginBtn {
					padding: 20rpx 0rpx;

					.btn {
						border-radius: 50rpx;
						background-image: linear-gradient(45deg, #3dc0d2, #43e3bd);
						color: #fff;
						font-weight: bold;
					}
				}

				.regist {
					color: #ccc;
					font-size: 24rpx;
					text-align: center;
					margin: 20rpx 0;

					text {
						color: #51d3c6;
						padding: 20rpx 0;
					}
				}

				// 第三方登录样式
				.thirdPartyLogin {
					display: flex;
					justify-content: space-around;
					color: #aaa;

					/* #ifdef MP-WEIXIN */
					.wxLogin {
						text-align: center;

						.iconwx {
							font-size: 68rpx;
						}
					}

					/* #endif */
					.visit {
						text-align: center;

						.iconfont {
							font-size: 55rpx;
						}
					}

					/* #ifdef MP-QQ */
					.qqLogin {
						.iconfont {
							font-size: 55rpx;
						}
					}

					/* #endif */
				}
			}


		}
	}
</style>
