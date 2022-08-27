<template>
	<view class="wrap">
		<view class="wrap_box">
			<u-form ref="uForm" :rules="formRules" :model="formData" class="form" labelPosition="left" :labelWidth="80">
				<u-form-item label="音符" prop="integral" borderBottom>
					<u--input placeholder="下载所需音符数" border=none v-model="formData.integral"></u--input>
				</u-form-item>
				<u-form-item label="名称" prop="name" borderBottom>
					<u--input placeholder="资源名称" border=none maxlength="10" v-model="formData.name"></u--input>
				</u-form-item>
				<u-form-item label="描述" prop="describe" borderBottom>
					<u-textarea placeholder="资源描述" maxlength="100" v-model="formData.describe"></u-textarea>
				</u-form-item>



			</u-form>


			<view class="add-btn" @click="openFile">
				<!-- <u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple :maxCount="1"
					width="320rpx" height="320rpx"></u-upload> -->
				<view v-if="!fileUrl">
					<u-icon name="plus" color="#e0dee4" size="100"></u-icon>

				</view>

				<image class="img" :src="fileUrl" v-else></image>
			</view>
			文件资源:{{showName}}

		</view>
		<view class="submit_photo">
			<u-button shape="circle" type="primary" @click="submit(fileUrl)">确定
			</u-button>
		</view>
	</view>
</template>

<script>
	import {
		communityTinyserveresourceSave_Post
	} from "@/api/工具模块/资源共享.js";
	
	import {
		getRule
	} from './rules.js';
	export default {
		data() {
			return {
				showName: '',
				fileUrl: '',
				formData: {
					integral: '',
					name: '',
					describe: '',
				},
				formRules: getRule()
			};
		},
		methods: {
			// 打开文件选择器
			openFile() {
				let _this = this
				uni.chooseMessageFile({
					count: 1, //默认100
					extension: ['.zip', '.doc', '.xls', '.pdf', 'docx', '.rar', '.7z', '.jpg', '.png', '.jpeg'],
					success: (res) => {
						console.log(res);
						if (res.tempFiles[0].size / 1024 / 1024 > 20) {
							this.$refs.uToast.show({
								title: '附件大小不能超过20M',
								type: 'warning',
							})
							return;
						}
						_this.fileUrl = res.tempFiles[0].path
						_this.showName = res.tempFiles[0].name
						console.log(_this.showName);
					}
				});
			},
			// 选取的文件路径获取后回调
			submit(url) {
				this.$refs.uForm
					.validate()
					.then(res => {
						uni.showLoading({
							title: '加载中'
						});
						this.resultPath(url)
					})
					.catch(errors => {
						uni.$u.toast('请完善信息');
					});
			},
			
			//	添加资源
			resultPath(file) {
				console.log(this.showName);
				communityTinyserveresourceSave_Post({
				...this.formData
				}, file).then(res => {
					let json = JSON.parse(res.data);
					if (json.code == 200) {
						uni.$u.toast('添加资源成功');
						this.goBack()
					};
				})
				
			},
			goBack(){
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					});
				}, 1000);
			}
		},
	}
</script>

<style lang="scss">
	.wrap {
		background: #f1f1f1;
		height: 100%;

		.wrap_box {
			margin: 30rpx auto;
			padding: 30rpx;
			width: 650rpx;

			border-radius: 15rpx;
			box-shadow: 0rpx 0rpx 10rpx #ccc;
			position: relative;
			background-color: #ffffff;

			.add-btn {
				margin: 30rpx auto;

				.img {
					width: 200rpx;
					height: 200rpx;
				}
			}
		}

		.submit_photo {
			width: 80%;
			margin: 50rpx auto;
		}
	}
</style>
