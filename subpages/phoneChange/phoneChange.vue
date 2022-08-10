<template>
	<view class="page">
		<view class="userLoginForm">
			<view class="UserLoginItem " v-if="current == 0">
				<view class="title"><view class="iconfont icon-shouji"></view></view>
				<input
					type="text"
					style="width: 100%;"
					placeholder="请输入手机号"
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
					<view class="get" v-if="disabled" @click="getVerificationCode()">获取验证码</view>
					<view class="reget" v-else>重新获取{{ timer }}s</view>
				</view>
			</view>
		</view>
		<view class="" v-if="current == 2">
			<u-empty mode="list" :text="'手机号修改成功,将在' + backTime + '秒 后自动返回'"></u-empty>
		</view>
		<view class="btn_container">
			<view class="btn_group" v-if="current == 0">
				<view class="btn"><u-button type="primary" text="获取验证码" @click="next"></u-button></view>
			</view>
			<view class="btn_group" v-if="current == 1">
				<view class="btn"><u-button class="btn" type="primary" text="上一步" @click="back"></u-button></view>
				<view class="btn"><u-button class="btn" type="primary" text="完 成" @click="next"></u-button></view>
			</view>
		</view>

		<u-steps :current="current">
			<u-steps-item title="新手机号"></u-steps-item>
			<u-steps-item title="验证码"></u-steps-item>
			<u-steps-item title="修改完成"></u-steps-item>
		</u-steps>
		<!-- Toast 消息提示框 -->
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
import { authLoginregisterVerificationCode_Get } from '@/api/SYSTEM/登录注册.js'; //获取验证码
import { systemTinyuserUpdatePhonenumber_Post } from '@/api/SYSTEM/用户信息.js'; //修改手机号
export default {
	data() {
		return {
			current: 0,
			timer: 60,
			backTime: 3,
			disabled: true,
			newPhoneNumber: '', //新手机号
			verificationCode: '' //验证码
		};
	},
	methods: {
		// 下一步
		next() {
			uni.login({
				success: function(loginRes) {
					console.log('code', loginRes);
				}
			});
			return;
			let netFun = () => {},
				para = {};

			if (this.current == 0) {
				if (!uni.$u.test.mobile(this.newPhoneNumber)) {
					return this.selfMsg('请填写正确手机号码', 'warning');
				}
				netFun = authLoginregisterVerificationCode_Get;
				para = {
					phonenumber: this.newPhoneNumber
				};
			} else if (this.current == 1) {
				netFun = systemTinyuserUpdatePhonenumber_Post;
				para = {
					phonenumber: this.newPhoneNumber,
					/** 手机号    string required:false */
					code: this.verificationCode,
					/**     string required:false */
					wxCode: null
				};
			}
			netFun(para).then(res => {
				console.log(`current = ${this.current}`, res);
			});
			this.changeStep(1);
		},
		// 上一步
		back() {
			this.changeStep(-1);
		},
		// 步骤状态修改
		changeStep(e) {
			this.current += e;
		},
		// 获取验证码
		getVerificationCode() {},
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
