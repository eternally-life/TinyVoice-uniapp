<template>
	<view>
		<view class="ufrom">
			<u-form :rules="rules" ref="uForm" :model="formData">
				<!-- 身份 -->
				<u-form-item label="身份">
					<u-radio-group v-model="tp" placement="row">
						<!-- 						<u-radio activeColor="red" label="学生"></u-radio>
						<u-radio activeColor="red" label="老师"></u-radio> -->
						<u-radio-group v-model="selectRadio">
							<u-radio
								:customStyle="{ marginRight: '16px' }"
								v-for="(item, index) in radiolist1"
								:key="index"
								:label="item.name"
								:name="item.name"
							></u-radio>
						</u-radio-group>
					</u-radio-group>
				</u-form-item>
				<!-- 学号 -->
				<u-form-item label="学号" prop="us">
					<u-input v-model="formData.us" placeholder="请输入学号"></u-input>
				</u-form-item>
				<!-- 密码 -->
				<u-form-item label="密码" prop="pwd">
					<u-input v-model="formData.pwd" placeholder="请输入密码" :password="!pwdShow">
						<view class="" style="width: 5vw;" slot="suffix" @click="pwdShow = !pwdShow">
							<u-icon :name="pwdShow ? 'eye-fill' : 'eye-off'" size="24"></u-icon>
						</view>
					</u-input>
				</u-form-item>
			</u-form>
			<view class="btn"><u-button type="primary" text="进行认证" @click="submit"></u-button></view>
		</view>
	</view>
</template>

<script>
import { eduGuetVerifyCommon_Post } from '@/api/GUET/教务开放接口.js';
import { systemTinyuserGetInfo_Get } from '@/api/SYSTEM/用户信息.js';
import { setGloalDataUserInfo } from '@/utils/loginUtil.js';
export default {
	data() {
		return {
			formData: {
				us: '',
				pwd: ''
			},
			tp: 0,
			pwdShow: false,
			selectRadio: '教师',
			radiolist1: [
				{
					name: '教师',
					tp: 1
				},
				{
					name: '学生',
					tp: 2
				}
			],
			rules: {
				us: {
					type: 'string',
					required: true,
					message: '请填写学号',
					trigger: ['blur', 'change']
				},
				pwd: {
					type: 'string',
					required: true,
					message: '请填写密码',
					trigger: ['blur', 'change']
				}
			}
		};
	},
	methods: {
		submit() {
			this.$refs.uForm
				.validate()
				.then(res => {
					uni.showLoading({ title: '认证中~' });
					this.ac();
					// this.type == 0 ? this.add() : this.edit();
				})
				.catch(errors => {
					uni.$u.toast('请完善信息');
				});
		},
		ac() {
			const tp = this.radiolist1.filter(val => val.name == this.selectRadio)[0].tp;
			const para = {
				...this.formData,
				tp
			};
			console.log('提交参数', para);
			eduGuetVerifyCommon_Post(para).then(async res => {
				console.log('认证请求结果', res);
				if (res.data.code == 200) {
					uni.showToast({ icon: 'success', title: res.data.msg });
					await setGloalDataUserInfo();
					setTimeout(() => {
						uni.navigateBack({ delta: 1 });
					}, 1000);
				} else {
					uni.showToast({ icon: 'none', title: res.data.msg });
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.ufrom {
	width: 70vw;
	margin: 20vh auto;
	.btn {
		margin-top: 10vh;
		width: 100%;
	}
}
</style>
