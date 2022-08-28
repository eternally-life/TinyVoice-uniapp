<template>
	<view class="content">
		<!-- 图片区 -->
		<view class="preview" @click="choosePhoto">
			<view v-if="!photosFile">
				<u-icon name="camera" color="#e0dee4" size="120"></u-icon>
			</view>
			<image class="img" :src="photosFile" v-else></image>
		</view>
		<!-- 选择底色 -->
		<view class="chooseColor">
			<view class="comments_title">
				<view class="comments_border"></view>
				<view class="comments_content">选择底色:</view>
			</view>
			<view class="colorBlockBOx">
				<view class="colorBlock" v-for="(item,index) in choosedphotoSpecid.color" :key="index"
					@click="chooseBackColor(item)" :style="{'background-color': item}"></view>
			</view>
		</view>
		<!-- 预览底色 -->
		<view class="previewColor">
			<view class="previewColor_title">
				<view class="previewColor_border"></view>
				<view class="previewColor_content">您所选的底色：</view>
			</view>
			<view class="previewColorBlock" :style="{'background-color': previewColor}"></view>
		</view>
		<!-- 提交 -->
		<view class="submit_photo">
			<u-button shape="circle" customStyle=" fontSize:28rpx" type="primary"
				@click="creatIdPhoto(specid,color,photosFile)">
				下载证件照
			</u-button>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		creatIdPhoto_post,
		getPhotoSpecById_get
	} from '@/api/工具模块/证件照.js'
	export default {
		data() {
			return {
				// 照片规格参数
					specid: '', //证件照ID(必须)
					color: '', //照片底色(必须)
					photosFile: '', //照片文件
					photowide: '', //自定义像素宽
					photohigh: '', //自定义像素高
					// fileSize: '', //期望的文件大小 [最小值,最大值]单位(kb) 超过这个区间默认无效
					beauty_degree: '', //美颜系数 [1.0-5.0] 超过这个区间默认无效
				choosedphotoSpecid: { //父级页面跳转传过来的参数
					// specid: null,
					color: []
				},
				afterImage: '', // 处理后的图片

				isChooseColor: true, // 是否可选择底色

				previewColor: '',
			}
		},
		onLoad(options) {
			this.choosedphotoSpecid.color = this.changeColor(options.color) // 接收颜色参数 并转换成能渲染到页面的颜色格式

			// this.specid = parseInt(options.specid)   //规格类型id
			this.specid = options.specid.toString()
			console.log(typeof(this.specid))
			if (options.specid == 12) { // 接收自定义规格的参数
				this.photowide = options.photowide
				this.photohigh = options.photohigh
				this.beauty_degree = options.beauty_degree
			}
		},
		methods: {
			// 选择图片的处理函数------------------------------------------------------------------------------
			choosePhoto() {
				let _this = this
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success: function(res) {
						let imgUrl = res.tempFilePaths[0]
						let imgSuffix = imgUrl.substring(imgUrl.lastIndexOf('.') + 1) // 图片后缀名
						if (imgSuffix === 'gif') { // 禁选的图片格式
							return _this.selfMsg("请选择正确的图片格式哦", "warning")
						}
						_this.photosFile = imgUrl
					}
				});
			},
			// 创建证件照---------------------------------------------------------------------------
			async creatIdPhoto(specid,color, photosFile) {
				if (photosFile == '') {
					return this.selfMsg("照片别忘了选哦", "warning")
				}
				if (color == '') {
					return this.selfMsg("底色别忘了选哦", "warning")
				}
					const res = await creatIdPhoto_post({specid,color}, photosFile)
					// const res = await this.uploadFilePromise(specid,color,photosFile)
					console.log(res)
				console.log('++++++++++++++')
			// if (res.data.code === 200) { //请求成功
			// 	this.afterImage = res.data.photosUrl
			// 	// 预览图片
			// 	const _this = this
			// 	uni.navigateTo({
			// 		url: `/subpages_tool/id_photo/previewPhoto?imgUrl=${_this.afterImage}`
			// 	})
			// } else {
			// 	return this.selfMsg(ps.msg, "warning")
			// }
			},
			// 选择底色-----------------------------------------------------------------------------------
			chooseBackColor(color) {
				this.previewColor = color // 预览底色
				const backcolor = this.reChangeColor(color) //转换颜色格式
				this.color = backcolor
			},
			// //定义上传照片的函数----------------------------------------------------------------------------------------
			// uploadFilePromise(specid,color,fileUrl) {
			// 	return new Promise((resolve, reject) => {
			// 		let a = uni.uploadFile({
			// 			url: 'http://106.52.58.11:28080/community/tinyservephotos/save', // 仅为示例，非真实的接口地址
			// 			filePath: fileUrl,
			// 			name: 'photosFile',
			// 			formData: {
			// 				specid: specid,
			// 				color: color
			// 			},
			// 			success: (res) => {
			// 				setTimeout(() => {
			// 					resolve(res.data.data)
			// 				}, 1000)
			// 			}
			// 		});
			// 	})
			// },
			// 消息提示---------------------------------------------------------------------------------------
			selfMsg(msg, mod) {
				this.$refs.uToast.show({
					type: mod,
					message: msg
				})
			},
			// 转换颜色格式成前端能展示的颜色-----------------------------------------------------------------
			changeColor(str) {
				str = str.replace(/ /g, '')
				str = str.replace(/\[/g, '')
				str = str.replace(/]/g, '')
				let colorArr = str.split(',')
				for (let i = 0; i < colorArr.length; i++) {
					if (colorArr[i] == 'blue_grey') {
						colorArr[i] = '#20547c'
					} else if (colorArr[i] == 'blue_gradual') {
						colorArr[i] = '#6db8f2'
					} else if (colorArr[i] == 'gray_gradual') {
						colorArr[i] = '#a1a1a1'
					}
				}
				return colorArr;
			},
			// 转换颜色格式为后端接口需要的格式-----------------------------------------------------------------
			reChangeColor(str) {
				if (str == '#20547c') {
					str = 'blue_grey'
				} else if (str == '#6db8f2') {
					str = 'blue_gradual'
				} else if (str == '#a1a1a1') {
					str = 'gray_gradual'
				} else {
					str = str
				}
				return str
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

		.chooseColor {
			width: 100%;
			display: flex;
			flex-direction: row;

			.comments_title {
				width: 200rpx;
				height: 80rpx;
				display: flex;
				padding: 30rpx;

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
					width: 180rpx;
					height: 80rpx;
					margin: auto 0;
					color: #4a4a4a;
					margin-left: 10rpx;
				}
			}

			.colorBlockBOx {
				width: 100%;
				margin-top: 20rpx;
				display: flex;
				flex-wrap: wrap;
				align-items: center;

				.colorBlock {
					border-radius: 20%;
					border: #2dc1cf 0.5rpx solid;
					width: 100rpx;
					height: 60rpx;
					margin: 10rpx 30rpx;
				}
			}
		}

		.previewColor {
			width: 100%;
			height: 100rpx;
			margin-top: 30rpx;
			display: flex;
			flex-direction: row;
			align-items: center;

			.previewColor_title {
				width: 230rpx;
				height: 80rpx;
				margin-top: 30rpx;
				margin-left: 30rpx;
				display: flex;

				.previewColor_border {
					width: 8rpx;
					height: 50rpx;
					background: #2dc1cf;
					border-top-left-radius: 10rpx;
					border-top-right-radius: 10rpx;
					border-bottom-left-radius: 10rpx;
					border-bottom-right-radius: 10rpx;
				}

				.previewColor_content {
					width: 220rpx;
					height: 80rpx;
					margin: auto 0;
					color: #4a4a4a;
					margin-left: 10rpx;
				}
			}

			.previewColorBlock {
				border-radius: 20%;
				border: #2dc1cf 0.5rpx solid;
				margin-top: 50rpx;
				width: 100rpx;
				height: 60rpx;
				margin: 20rpx;
			}
		}

		.submit_photo {
			width: 60%;
			margin: 150rpx auto;

		}
	}
</style>
