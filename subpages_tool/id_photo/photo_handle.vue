<template>
	<view class="content">
		<!-- 图片区 -->
		<view class="preview" @click="choosePhoto">
			<!-- <u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple :maxCount="1"
				width="320rpx" height="320rpx"></u-upload> -->
			<view v-if="!imgUrl">
				<u-icon name="camera" color="#e0dee4" size="100"></u-icon>
			</view>
			<image class="img" :src="imgUrl" v-else></image>
		</view>
		<!-- 选择底色 -->
		<view class="button">
			<button @click="backColor(1)" :style="baseColor===1? 'background-color:#fd0101;color:#ffffff;' : ''">红底</button>
			<button @click="backColor(2)" :style="baseColor===2? 'background-color:#026afd;color:#ffffff;' : ''">蓝底</button>
			<button @click="backColor(3)" :style="baseColor===3? 'background-color:#fefefe;' : ''">白底</button>
		</view>
		<!-- 提交 -->
		<view class="submit_photo">
			<u-button type="primary" @click="submit_btn(handleType,baseColor,imgUrl)">确定</u-button>
		</view>
	</view>


</template>

<script>
	import {
		submitIdPhoto_post
	} from '@/api/工具模块/证件照.js'
	export default {
		data() {
			return {
				imgUrl: '',	// 图片地址
				handleType: 1, // 处理类型
				baseColor: 1, // 底色
			}
		},
		onLoad(options) {
			this.handleType = parseInt(options.type)
			console.log(this.handleType);
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
			async submit_btn(type,color,file){
				if(file == '') {
					uni.showModal({
							title: '提示',
							content: '照片别忘了选',
							success: function(res) {
							if (res.confirm) {
							    // 执行确认后的操作
							} 
							else {
								// 执行取消后的操作
							}
						}
					})		
					return 
				}
				uni.showLoading({
					title: '正在加载'
				})
				
				
				console.log({type,color,file});
				console.log("hahahahahahah");
				const res = await submitIdPhoto_post({type,color},file)
				console.log(res)
			},
			// 选择底色
			backColor(i) {
				this.baseColor = parseInt(i)
				console.log(this.baseColor)
			},
		}

	}
</script>
<style scoped lang="scss">
	.content {
		width: 100%;
		height: auto;

		.preview {
			margin: 0rpx auto;
			width: 322rpx;
			height: 322rpx;
			border: 1rpx gray solid;
			display: flex;
			align-items: center;
			justify-content: center;

			.img {
				width: 320rpx;
				height: 320rpx;
			}
		}

		.button {
			display: flex;
			align-items: center;
			padding: 20rpx 0;

			button {
				background-color: #bbb;
				border: 1rpx solid #ccc;
			}
		}
	}
</style>
