<template>
	<u-overlay :show="show">
		<view class="warp">
			<view class="rect" @tap.stop>
				<image :src="img"></image>
			</view>
			<view class="btn" @tap.stop>
				<button @click="cancel">取消</button>
				<button @click="savePhoto(img)">保存</button>
			</view>
		</view>
	</u-overlay>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
				img: ''
			}
		},
		onLoad(options) {
			this.img = options.imgUrl
			console.log(this.img)
		},
		methods: {
			cancel() {
				uni.navigateBack({})
			},
			savePhoto(filePath) {
				uni.downloadFile({ //下载文件资源到本地,返回文件的本地临时路径
					url: filePath, //网络图片路径
					success:(res) => {
						var imageUrl = res.tempFilePath; //临时文件路径
						uni.saveImageToPhotosAlbum({
							filePath: imageUrl,
							success: function () {
								uni.showModal({
									content: '保存成功！',
									showCancel: false
								});
							}
						});
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.rect {
		width: 100%;
		display: flex;
		align-items: center;

	}

	.rect:nth-child(1) {
		margin: 100rpx auto;
	}

	.btn {
		display: flex;
		align-items: center;

		button {
			background-color: #bbb;
			border: 1rpx solid #ccc;
		}
	}
</style>
