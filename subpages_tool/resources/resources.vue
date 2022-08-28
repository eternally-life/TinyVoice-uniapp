<template>
	<view class="wrap">
		<!-- //	Logo -->
		<view class="wrap_background">
			<view class="bac_logo">
				<u--image :showLoading="true" :src="logo" width="80rpx" height="80rpx">
				</u--image>

				<view class="bac_content">
					微音资源共享
				</view>
			</view>
		</view>
		<!-- //	索引 -->
		<!-- <view class="searchBox">
			<view class="searchInput">
				<u--input placeholder="搜索你感兴趣的内容" prefixIcon="search" v-model="searchMsg"
					prefixIconStyle="font-size: 22px;color: #909399">
				</u--input>
			</view>
			<view class="searchButtom">
				<u-button @click="search(searchMsg)">搜索</u-button>
			</view>
		</view> -->
		<!-- //	资源列表 -->
		<view class="block">
			<view class="wrap_block" v-for="(item,index) in resourceData" :key="index">
				<view class="block_content">
					<view class="res_name" @click="enterResourcesUrl(index)">
						{{item.name}}
					</view>
					<view class="res_describe" @click="enterResourcesUrl(index)">
						 <view style="color: rgba(170, 170, 170, 0.8);">
							描述：{{item.describe}}
						</view> 
					</view>
					<view class="res_msg" @click="enterResourcesUrl(index)">
						{{$u.timeFormat(item.createTime, 'yyyy-mm-dd')}}
						下载数：{{item.downNum}}
						所需积分：{{item.integral}}
					</view>
					<view class="res_size">
						文件大小{{item.size > 1048576? parseInt(item.size/1024/1024)+ "m" : parseInt(item.size/1024) + "kb"}}
					</view>
					<view class="viewComment_btn">
						<u-button shape="circle"
							color="linear-gradient(to right,rgb(12,235,235), rgb(32,227,178), rgb(41,255,198))"
							@click="enterResourcesUrl(index)">评论</u-button>
					</view>
					<view class="download_btn">
						<u-button shape="circle"
							color="linear-gradient(to right,rgb(12,235,235), rgb(32,227,178), rgb(41,255,198))"
							@click="filedownload(item.resourceId,item.url)">下载</u-button>
					</view>
				</view>
			</view>
		</view>

		<!-- //	底部 -->
		<view class="loadmore_wrap" v-if="resourceData.length !== 0">
			<text>{{ isNoMore ? '到底啦' : '' }}</text>
		</view>
		<!-- //	资源上传跳转 -->
		<view class="uploading" @click="uploading">
			<u-button icon="plus" size="large" shape="circle" iconColor="#31b6c3"></u-button>
		</view>
	</view>
</template>

<script>
	import {
		communityTinyserveresourceDown_Get,
		communityTinyserveresourcePage_Get
	} from "@/api/工具模块/资源共享.js"
	import {
		systemParamsNoteList_Get,
		systemParamsNotenoticeId_Get
	} from '@/api/SYSTEM/参数字典公告.js'
	export default {
		data() {
			return {
				logo: getApp().globalData.logo, //全局logo
				windowHeight: null,
				searchMsg: "", //搜索关键字
				resourceData: [], //数据列表
				currentPageNumber: 1, //页号
				isloading: false,
				isNoMore: false,
				id: '',
			};
		},
		onLoad(options) {
			this.id = options.id
			// this.search(this.keyword)
		},
		mounted() {
			this.windowHeight = getApp().globalData.windowHeight
			this.getResourcesMessage() //	挂载完成加载第一页内容

			// uni.$on('refresh', () => {
			// 	this.currentPageNumber = 1
			// 	this.resourceData = []
			// 	this.getResourcesMessage()
			// })
		},
		methods: {
			//	获取资源
			async getResourcesMessage() {
				try {
					const res = await communityTinyserveresourcePage_Get({
						pageNum: this.currentPageNumber,
						pageSize: 10,
						//tatol 服务器内总共资源数
					})
					var datas = res.data.data
					// console.log(typeof(datas));
					this.datas = datas
					console.log(this.datas);
					if (res.data.msg === "还没有资源快来第一个上传吧~") {
						this.isNoMore = true
					}
					// console.log(res.data.msg);
					this.currentPageNumber++
					this.resourceData = [...this.resourceData, ...datas.records]
					// this.fileUlrList = [...this.fileUlrList, ...datas.url]
					// console.log(this.fileUlrList);
					this.isLoading = false

				} catch (error) {
					//处理异常
					console.log(error);
				}
			},
			//	文件内容跳转  可改模态框
			enterResourcesUrl(index) {
				uni.navigateTo({
					url: '/subpages_tool/resourcesDetail/resourcesDetail',
					success: (res) => {
						res.eventChannel.emit('acceptResourcesData', {
							data: this.resourceData[index]
						})
					}
				})
			},
			//	资源下载
			filedownload(id, url) {

				if (true) {
					communityTinyserveresourceDown_Get({
						id: id,
					})
					uni.downloadFile({
						url,
						success: (res) => {
							if (res.statusCode === 200) {
								this.handleFile(res.tempFilePath)
								console.log(222, 'down1', res)
							}
						}
					})

				} else {
					uni.showModal({
						content: '您的积分还不够哦！',
						showCancel: false
					});
				}


			},

			// 对不同文件的处理
			handleFile(filePath) {
				const filetype = filePath.split('.')[1],
					typeObj = {
						gif: 'img',
						GIF: 'img',
						png: 'img',
						PNG: 'img',
						jpg: 'img',
						JPG: 'img',
						jpeg: 'img',
						mp4: 'video',
						doc: 'doc',
						docx: 'doc',
						xls: 'doc',
						xlsx: 'doc',
						ppt: 'doc',
						pptx: 'doc',
						pdf: 'doc'
					},
					result = (ok = '成功保存到相册', no = '保存失败') => {
						return {
							filePath,
							success: res => {
								uni.showToast({
									title: ok
								})
							},
							fail: err => {
								uni.showToast({
									title: no
								})
							}
						}
					}

				if (typeObj[filetype] === 'video') {
					// 保存视频到系统相册:mp4
					uni.saveVideoToPhotosAlbum(result())
				} else if (typeObj[filetype] === 'img') {
					// 保存图片到系统相册:gif,jpg,jpeg,png,GIF,JPG,PNG
					uni.saveImageToPhotosAlbum(result())
				} else {
					// 打开文件:doc,docx,xls,xlsx,ppt,pptx,pdf
					uni.openDocument({
						...result('打开文档成功', '打开文档失败'),
						showMenu: true //showMenu是否显示右上角菜单
					});
				}
			},
			//跳转上传页
			uploading() {
				uni.navigateTo({
					url: '/subpages_tool/resourcePublishing/resourcePublishing'
				})
			},
			//	资源搜索
			search(keyword) {
				uni.showToast({
					title: '搜索：' + keyword,
					icon: 'none'
				})
			},
			//	触底加载新页面
			onReachBottom() {
				if (this.isNoMore) {
					return
				} else {
					uni.showLoading()
					setTimeout(() => {
						this.getResourcesMessage()
						uni.hideLoading()
					}, 100);
				}
			},

		}
	}
</script>

<style lang="scss">
	.wrap {
		background: #f1f1f1;
		height: 100%;

		.wrap_background {
			height: 500rpx;
			width: 100%;
			// background-color: #3c9cff;
			// border-radius: 15rpx;

			.bac_logo {
				padding-left: 30rpx;
				padding-top: 50rpx;
				align-items: center;

			}

			.bac_content {
				margin-left: 130rpx;
				margin-top: -60rpx;
			}

		}

		.searchBox {
			margin: 20rpx auto;
			width: 700rpx;
			height: 166rpx;
			border-radius: 15rpx;
			box-shadow: 0rpx 0rpx 10rpx #ccc;
			position: relative;
			background-color: #ffffff;

			.searchInput {
				position: absolute;
				left: 43rpx;
				top: 49rpx;
				width: 479rpx;
				height: 77rpx;
				display: block;
				box-sizing: border-box
			}

			.searchButtom {
				position: absolute;
				left: 550rpx;
				top: 49rpx;
				width: 116rpx;
				height: 77rpx;
				display: block;
				box-sizing: border-box
			}
		}

		.block {
			margin-top: -350rpx;

			.wrap_block {
				margin: 30rpx auto;
				width: 700rpx;
				height: 250rpx;
				border-radius: 15rpx;
				box-shadow: 0rpx 0rpx 10rpx #ccc;
				background-color: #ffffff;
				position: relative;
				z-index: 1;

				.block_content {
					.res_name {
						position: absolute;
						left: 24rpx;
						top: 20rpx;
						width: 415rpx;
						height: 42rpx;
						display: block;
						box-sizing: border-box
					}

					.res_describe {
						position: absolute;
						left: 24rpx;
						top: 72rpx;
						width: 415rpx;
						height: 110rpx;
						display: block;
						box-sizing: border-box
					}

					.res_msg {
						position: absolute;
						left: 24rpx;
						top: 196rpx;
						width: 438rpx;
						height: 42rpx;
						display: block;
						box-sizing: border-box;
						font-size: 24rpx;
						color: #888888;
					}

					.res_size {
						position: absolute;
						left: 492rpx;
						top: 196rpx;
						width: 222rpx;
						height: 42rpx;
						display: block;
						box-sizing: border-box;
						font-size: 28rpx;
						color: #888888;
					}

					.viewComment_btn {
						position: absolute;
						width: 180rpx;
						left: 492rpx;
						top: 15rpx;
						font-size: 10px;
						height: 65rpx;
					}

					.download_btn {
						position: absolute;
						left: 492rpx;
						top: 110rpx;
						width: 180rpx;
						font-size: 10px;
						height: 65rpx;
						display: block;
						box-sizing: border-box;
					}
				}
			}
		}


		.loadmore_wrap {
			width: 750rpx;
			text-align: center;
			font-size: 24rpx;
			color: #888888;
			background: #f1f1f1;
			padding: 0 0 50rpx 0;
			margin-top: 50rpx;
		}

		.uploading {
			position: fixed;
			bottom: 80rpx;
			right: 80rpx;
			width: 100rpx;
			z-index: 2;
		}
	}
</style>
