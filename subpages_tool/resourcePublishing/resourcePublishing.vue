<template>
	<view class="wrap">
		<view class="wrap_box">
			<view class="form">
				<u--input placeholder="下载所需音符" border="bottom" v-model="fileIntegral"></u--input>
				<u--input placeholder="资源名称" border="bottom" v-model="fileName"></u--input>
				<u--input placeholder="资源描述" border="bottom" v-model="fileDescribe"></u--input>
			</view>


			<view class="add-btn" @click="openFile">
				<!-- <u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple :maxCount="1"
					width="320rpx" height="320rpx"></u-upload> -->
				<view v-if="!fileUrl">
					<u-icon name="plus" color="#e0dee4" size="100"></u-icon>
					文件资源:{{this.showName}}
				</view>

				<image class="img" :src="fileUrl" v-else></image>
			</view>


		</view>
		<view class="submit_photo">
			<u-button type="primary" @click="resultPath(fileName,fileDescribe,fileIntegral,fileUrl)">确定</u-button>
		</view>
	</view>
</template>

<script>
	import {
		communityTinyserveresourceSave_Post
	} from "@/api/工具模块/资源共享.js"
	export default {
		data() {
			return {
				showName: "",
				fileIntegral: "",
				fileName: "",
				fileDescribe: "",
				fileUrl: '',
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
						this.showName = res.tempFiles[0].name
					}
				});
			},
			// 选取的文件路径获取后回调
			async resultPath(name, describe, integral, file) {
				uni.showLoading({
					title: '上传中...',
				});
				console.log(this.fileName);
				console.log(this.fileDescribe);
				console.log("==================");
				console.log(this.fileUrl);
				const res = await communityTinyserveresourceSave_Post({
					integral,
					name,
					describe
				}, file)
				console.log(res);
				uni.hideLoading()
			},
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
			height: 566rpx;
			border-radius: 15rpx;
			box-shadow: 0rpx 0rpx 10rpx #ccc;
			position: relative;
			background-color: #ffffff;

			.add-btn {
				margin: 30rpx auto;

				.img {
					width: 320rpx;
					height: 320rpx;
				}
			}
		}
	}
</style>
