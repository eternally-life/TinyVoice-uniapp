<template>
	<view>
		<view class="ufrom">
			<u-form>
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
				<u-form-item label="学号"><u-input v-model="us" placeholder="请输入学号"></u-input></u-form-item>
				<!-- 密码 -->
				<u-form-item label="密码">
					<u-input v-model="pwd" placeholder="请输入密码" :password="!pwdShow">
						<view class="" style="width: 5vw;" slot="suffix" @click="pwdShow = !pwdShow">
							<u-icon :name="pwdShow ? 'eye-fill' : 'eye-off'" size="24"></u-icon>
						</view>
					</u-input>
				</u-form-item>
			</u-form>
			<view class="btn"><u-button type="primary" text="进行认证"></u-button></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			us: '',
			pwd: '',
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
			]
		};
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
