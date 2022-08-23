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
				<u-form-item label="学号">
					<view class=""><u-input v-model="us" inputAlign="left"></u-input></view>
				</u-form-item>
				<!-- 密码 -->
				<u-form-item label="密码">
					<view class=""><u-input v-model="pwd" inputAlign="left"></u-input></view>
				</u-form-item>
			</u-form>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			us: '191602020513',
			pwd: '1916020205613',
			tp: 0,
			selectRadio:'教师',
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
}
</style>
