<template>
	<view>
		<view class="view_shadow">
			<u-form ref="uForm" :rules="formRules" :model="formData" labelPosition="left" :labelWidth="80">
				<u-form-item label="姓名" prop="name">
					<u-input v-model="formData.name" maxlength="10"></u-input>
				</u-form-item>
				<u-form-item label="手机号" prop="phonenumber">
					<u-input v-model="formData.phonenumber" maxlength="11"></u-input>
				</u-form-item>
				<u-form-item label="学校名" prop="school">
					<u-input v-model="formData.school" maxlength="10"></u-input>
				</u-form-item>
				<u-form-item label="公寓楼" prop="apartment">
					<u-input v-model="formData.apartment" maxlength="2">
						<u-text text="#" slot="suffix" margin="0 3px 0 3px" type="tips"></u-text>
					</u-input>
				</u-form-item>
				<u-form-item label="宿舍号" prop="dormitoryNumber">
					<u-input v-model="formData.dormitoryNumber" maxlength="10" placeholder="例：A101、B123"></u-input>
				</u-form-item>
				<u-form-item label="备注">
					<u-textarea v-model="formData.remark" maxlength="100"></u-textarea>
				</u-form-item>
			</u-form>
		</view>

		<view class="bottom_box">
			<view class="btn">
				<u-button
					type="primary"
					icon="edit-pen-fill"
					text="添加新地址"
					@click="submit"
					v-if="type == 0"
				></u-button>
				<u-button type="primary" icon="edit-pen-fill" text="确认保存" @click="submit" v-else></u-button>
			</view>
		</view>
	</view>
</template>

<script>
import {
	systemSysaddrSave_Post /* 新增 */,
	systemSysaddrUpdate_Put /* 修改*/,
	systemSysaddrById_Get /* 查询单个 */
} from '@/api/SYSTEM/收货地址.js';
import { getRule } from './rules.js';
export default {
	data() {
		return {
			type: 0, //当前编辑类型 0新增，1修改
			formData: {
				name: '' /** 姓名   string required: */,
				school: '' /** 学校名称   string required: */,
				phonenumber: '' /** 手机号   string required: */,
				apartment: '' /** 公寓楼   string required: */,
				dormitoryNumber: '' /** 宿舍号   string required: */,
				remark: '' /** 地址备注   string required: */,
				isStuType: 1 /** 是否学生地址,1-是,0-不是   integer required: */,
				addressJson: '' /** 其余地址=前端自建json类型   string required: */
			},
			formRules: getRule()
		};
	},
	methods: {
		submit() {
			this.$refs.uForm
				.validate()
				.then(res => {
					uni.showLoading({ title: '加载中' });
					this.type == 0 ? this.add() : this.edit();
				})
				.catch(errors => {
					uni.$u.toast('请完善信息');
				});
		},
		/* 添加地址 */
		add() {
			systemSysaddrSave_Post({ ...this.formData }).then(res => {
				if (res.data.code == 200) {
					uni.$emit('refreshAddr');
					uni.$u.toast('添加成功');
					this.goBack();
				}
			});
		},
		/* 修改地址信息 */
		edit() {
			systemSysaddrUpdate_Put({ ...this.formData }).then(res => {
				if (res.data.code == 200) {
					uni.$u.toast('修改成功');
					uni.$emit('changeAddr', this.formData);
					this.goBack();
				}
			});
		},
		goBack() {
			setTimeout(() => {
				uni.navigateBack({ delta: 1 });
			}, 1000);
		}
	},
	onLoad() {
		if (this.$store.state.sys.tempAddressInfo) {
			// console.log('编辑收货地址');
			this.formData = this.$store.state.sys.tempAddressInfo;
			this.type = 1;
		} else {
			// console.log('新增收货地址');
			this.type = 0;
		}
	}
};
</script>

<style scoped lang="scss">
@import '@/style/commonstyle/address.scss';
</style>
