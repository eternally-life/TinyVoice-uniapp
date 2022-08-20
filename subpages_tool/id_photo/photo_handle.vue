<template>
	<view class="content">
		<!-- 图片区 -->
		<view class="preview" @click="choosePhoto">
			<!-- <u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple :maxCount="1"
				width="320rpx" height="320rpx"></u-upload> -->
			<view v-if="!imgUrl">
				<u-icon name="camera" color="#e0dee4" size="120"></u-icon>
			</view>
			<image class="img" :src="imgUrl" v-else></image>
		</view>
		<!-- 选择底色 -->
		<view class="comments_title">
			<view class="comments_border"></view>
			<view class="comments_content">选择底色</view>
		</view>
		<view class="button">
			<button @click="backColor(1)"
				:style="baseColor===1? 'background-color:#fd0101;color:#ffffff;' : ''">红</button>
			<button @click="backColor(2)"
				:style="baseColor===2? 'background-color:#026afd;color:#ffffff;' : ''">蓝</button>
			<button @click="backColor(3)" :style="baseColor===3? 'background-color:#fefefe;' : ''">白</button>
		</view>
		<!-- 提交 -->
		<view class="submit_photo">
			<u-button shape="circle" customStyle=" fontSize:28rpx" type="primary" @click="submit_btn(handleType,baseColor,imgUrl)">
				下载证件照
			</u-button>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>


</template>

<script>
	import {
		submitIdPhoto_post
	} from '@/api/工具模块/证件照.js'
	export default {
		data() {
			return {
				imgUrl: '', // 图片地址 

				handleType: 1, // 处理类型

				baseColor: 1, // 底色
				str: '',
				afterImage: ''
			}
		},
		onLoad(options) {
			this.handleType = parseInt(options.type)
		},
		methods: {
			choosePhoto() {
				let _this = this
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success: function(res) {
						_this.imgUrl = res.tempFilePaths[0]
					}
				});
			},
			async submit_btn(type, color, file) {
				if (file == '') {
					return this.selfMsg("照片别忘了选", "warning")
				}
				// uni.showLoading({
				// 	title: '正在加载'
				// })
				const res = await submitIdPhoto_post({
					type,
					color
				}, file)
				let ps = {}
				ps = JSON.parse(res.data)
				if (ps.code === 200) { //请求成功
					this.afterImage = ps.data.afterImage
					// 预览图片
					const _this = this
					uni.navigateTo({
						url: `/subpages_tool/id_photo/previewPhoto?imgUrl=${_this.afterImage}`
					})


				} else {
					return this.selfMsg(ps.msg, "warning")
				}

			},
			// 选择底色
			backColor(i) {
				this.baseColor = parseInt(i)
				// console.log(this.baseColor)
			},
			selfMsg(msg, mod) {
				this.$refs.uToast.show({
					type: mod,
					message: msg
				})
			}
		}

	}
</script>
<style scoped lang="scss">
	.content {
		width: 100%;
		height: auto;

		.preview {
			margin: 0rpx auto;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 20rpx auto;
			border-radius: 30rpx;
			background-color: rgb(220, 240, 255);
			height: 600rpx;
			width: 90%;

			.img {
				// <<<<<<< HEAD
				width: 320rpx;
				height: 448rpx;
				// =======
				// 				width: 100%;
				// 				height: 100%;
				// >>>>>>> d268c1ba91a72cc2560b9ac6fdf56c7c9f7d96a9
			}
		}

		.comments_title {
			display: flex;
			align-items: center;
			padding: 30rpx;
			margin-top: 30rpx;

			.comments_border {
				width: 8rpx;
				height: 50rpx;
				background: #2dc1cf;
				border-top-left-radius: 10rpx;
				border-top-right-radius: 10rpx;
				border-bottom-left-radius: 10rpx;
				border-bottom-right-radius: 10rpx;
			}

			.comments_content {
				color: #4a4a4a;
				margin-left: 10rpx;
			}
		}

		.button {
			display: flex;
			align-items: center;
			padding: 20rpx 0;

			button {
				background-color: #bbb;
				width: 200rpx;
			}
		}
		.submit_photo{
			width: 60%;
			margin: 180rpx auto;
			
		}
	}
</style>
