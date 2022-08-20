<template>
	<view class="page">
		<view class="userLoginForm">
			<view class="UserLoginItem " v-if="current == 0">
				<view class="title"><view class="iconfont icon-shouji"></view></view>
				<input
					type="text"
					style="width: 100%;"
					placeholder="请输新入手机号"
					v-model="newPhoneNumber"
					id="phonenumber"
				/>
			</view>
			<view class="UserLoginItem " v-if="current == 1">
				<view class="title"><view class="iconfont icon-yanzhengma1"></view></view>
				<input
					style="width: 100%;"
					placeholder="请输入验证码"
					v-model="verificationCode"
					id="verificationCode"
				/>
				<view class="right-icon">
					<view class="get" v-if="codeTimer <= 0" @click="getVerificationCode(newPhoneNumber)">
						获取验证码
					</view>
					<view class="reget" v-else>{{ codeTimer }}s重新获取</view>
				</view>
			</view>
		</view>

		<view class="btn_container">
			<view class="btn_group" v-if="current == 0">
				<view class="btn">
					<u-button
						type="primary"
						text="获取验证码"
						@click="nextStep"
						:disabled="inputStatu_phone"
					></u-button>
				</view>
			</view>
			<view class="btn_group" v-if="current == 1">
				<view class="btn">
					<u-button class="btn" type="primary" text="上一步" @click="backStep"></u-button>
				</view>
				<view class="btn">
					<u-button
						class="btn"
						type="primary"
						text=" 完 成 "
						@click="nextStep"
						:disabled="inputStatu_code"
					></u-button>
				</view>
			</view>
		</view>
		<view class="step">
			<u-steps :current="current">
				<u-steps-item title="新手机号"></u-steps-item>
				<u-steps-item title="验证码"></u-steps-item>
				<u-steps-item title="修改完成"></u-steps-item>
			</u-steps>
		</view>
		<!-- Toast 消息提示框 -->
		<u-toast ref="uToast"></u-toast>
		<u-notify ref="uNotify"></u-notify>
	</view>
</template>

<script>
import { authLoginregisterVerificationCode_Get } from '@/api/SYSTEM/登录注册.js'; //获取验证码
import { systemTinyuserUpdatePhonenumber_Post } from '@/api/SYSTEM/用户信息.js'; //修改手机号
import { setGloalDataUserInfo_static } from '@/utils/loginUtil.js';
export default {
	data() {
		return {
			current: 0,
			backTime: 3,
			authTimer: -1, //验证码定时器
			codeTimer: 60, //验证码倒计时
			inputStatu_phone: true, //手机号输入框状态
			inputStatu_code: true, //验证码输入框状态
			verificationCode: '', //验证码
			newPhoneNumber: '', //新手机号
			oldPhonenumber: getApp().globalData.wxUserInfo.phonenumber
		};
	},
	methods: {
		// 下一步
		async nextStep() {
			let res;
			if (this.current == 0) {
				if (!uni.$u.test.mobile(this.newPhoneNumber)) {
					return this.selfMsg('请填写正确的手机号码', 'warning');
				}
				if (this.oldPhonenumber == this.newPhoneNumber) {
					return this.selfMsg('新手机号不能与旧手机号相同', 'warning');
				}
				res = await this.getVerificationCode(this.newPhoneNumber);
			} else if (this.current == 1) {
				res = await this.changePhone();
			}
			if (!res) {
				this.selfMsg('服务器异常，请稍后重试', 'warning');
				return;
			}
			this.changeStep(1);
		},
		// 上一步
		backStep() {
			this.newPhoneNumber = '';
			this.verificationCode = '';
			clearInterval(this.authTimer);
			this.changeStep(-1);
		},
		// 步骤状态修改
		changeStep(e) {
			this.current += e;
		},
		// 获取验证码
		async getVerificationCode(phone) {
			const res = await authLoginregisterVerificationCode_Get({
				phonenumber: phone
			});
			console.log('验证码获取结果', res);
			if (res.data.code === 200) {
				this.codeCountDown();
				return true;
			} else {
				return false;
			}
		},
		// 修改手机号
		async changePhone() {
			const wxCode = await new Promise((resolve, reject) => {
				uni.login({
					success(loginRes) {
						resolve(loginRes.code);
					}
				});
			});
			const res = await systemTinyuserUpdatePhonenumber_Post({
				wxCode,
				phonenumber: this.newPhoneNumber,
				code: this.verificationCode
			});
			if (res.data.code === 200) {
				return true;
			} else {
				return false;
			}
		},
		// 验证码倒计时
		codeCountDown() {
			this.codeTimer = 60;
			this.authTimer = setInterval(() => {
				this.codeTimer--;
				if (this.codeTimer <= 0) {
					clearInterval(this.authTimer);
				}
			}, 1000);
		},
		//消息提示
		selfMsg(msg, mod) {
			this.$refs.uToast.show({
				type: mod,
				message: msg,
				position: 'top'
			});
		},
		//返回提示
		openNotify() {
			let notifyData = {
				message: `手机号修改成功，将在${this.backTime}秒后自动返回`,
				type: 'success',
				color: '#ffffff',
				fontSize: 20,
				duration: 1000
			};
			this.$refs.uNotify.show(notifyData);
			const backTimer = setInterval(() => {
				if (this.backTime == 0) {
					clearInterval(backTimer);
					uni.navigateBack({ delta: 1 });
				} else {
					notifyData.message = `手机号修改成功，将在${--this.backTime}秒后自动返回`;
					this.$refs.uNotify.show(notifyData);
				}
			}, 1000);
		}
	},
	watch: {
		current(newValue) {
			if (newValue == 2) {
				this.openNotify();
				getApp().globalData.wxUserInfo.phonenumber = this.newPhoneNumber;
				setGloalDataUserInfo_static(getApp().globalData.wxUserInfo);
			}
		},
		newPhoneNumber(inputValue) {
			this.inputStatu_phone = inputValue ? false : true;
		},
		verificationCode(inputValue) {
			this.inputStatu_code = inputValue ? false : true;
		}
	}
};
</script>

<style scoped lang="scss">
.page {
	width: 100%;
	height: 100vh;
	background-color: #fff;

	.userLoginForm {
		border-radius: 30rpx;
		padding: 200rpx 45rpx;
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
			.right-icon {
				.get {
					font-size: 24rpx;
					width: 140rpx;
					padding: 20rpx 0;
					color: #60c5ba;
				}
				.reget {
					font-size: 24rpx;
					width: 140rpx;
					padding: 20rpx 0;
				}
			}
		}
	}
	.btn_container {
		width: 60%;
		margin: 0 auto;
		margin-bottom: 180rpx;
		.btn_group {
			display: flex;
			justify-content: space-around;
			font-weight: bold;
			.btn {
				margin: 0 10rpx;
			}
		}
	}
}
</style>
