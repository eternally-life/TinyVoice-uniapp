<template>
	<view>
		<view v-if="audit=='false'" class="ufrom">
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
		<view class="notic">
			<view class="notic_title">{{ notice.title }}</view>
			<u-parse :content="notice.noticeContent"></u-parse>
		</view>
	</view>
</template>

<script>
import { setGloalDataUserInfo } from '@/utils/loginUtil.js';
import { eduGuetVerifyCommon_Post } from '@/api/GUET/教务开放接口.js';
import { systemParamsNotenoticeId_Get,systemParamsConfigKeyconfigKey_Get } from '@/api/SYSTEM/参数字典公告.js';

export default {
	data() {
		return {
			audit:'true',
			notice: {
				title: '校园微音公告标题',
				noticeContent: '校园微音公告标题内容'
			},
			formData: {
				us: '',
				pwd: ''
			},
			eduInfo: {},
			tp: 0,
			pwdShow: false,
			selectRadio: '学生',
			radiolist1: [
				{
					name: '学生',
					tp: 2
				},
				{
					name: '教师',
					tp: 1
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
	created() {
		this.getParam()
	},
	methods: {
		getParam(){
			systemParamsConfigKeyconfigKey_Get({configKey:"system:show:audit"})
			.then(res=>{
				this.audit = res.data.msg
				console.log(res);
			})
		},
		submit() {
			// this.ac();
			// return;
			// 暂时跳过检测
			this.$refs.uForm
				.validate()
				.then(res => {
					uni.showLoading({ title: '认证中~' });
					this.ac();
					// if (this.eduInfo.studentNumber != this.formData.us) {
					// } else {
					// 	uni.$u.toast('请勿重复绑定同一身份信息');
					// }
				})
				.catch(errors => {
					console.log(errors);
					if (errors.length > 0) {
						uni.$u.toast(errors[0].message);
					} else {
						uni.$u.toast('校验异常');
					}
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
	},
	onShow() {
		this.eduInfo = getApp().globalData.eduInfo;
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	},
	onLoad() {
		systemParamsNotenoticeId_Get({ noticeId: 20 }).then(res => {
			console.log('公告数据', res);
			if (res.data.code == 200) {
				this.notice.title = res.data.data.noticeTitle;
				this.notice.noticeContent = res.data.data.noticeContent;
			}
		});
	}
};
</script>

<style lang="scss" scoped>
$com_w: 70vw;
.ufrom {
	width: $com_w;
	margin: 20vh auto;
	.btn {
		margin-top: 10vh;
		width: 100%;
	}
}
.notic {
	width: $com_w;
	padding: 10px;
	margin: 0 auto;
	border-radius: 10px;
	background-color: #fcbd71;
	&_title {
		width: 100%;
		margin-top: 10rxp;
		margin-bottom: 10rxp;
		font-size: 16px;
		text-align: center;
		font-weight: bolder;
	}
}
</style>
