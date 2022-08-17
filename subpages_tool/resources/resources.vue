<template>
	<view class="wrap">
		<view class="wrap_background">
			<view class="bac_logo">
				<u--image :showLoading="true" :src="logo" width="80rpx" height="80rpx">
				</u--image>
			</view>
		</view>
		<view class="searchBox">
			<view class="searchInput">
				<u--input placeholder="搜索你感兴趣的内容" prefixIcon="search" v-model="searchMsg"
					prefixIconStyle="font-size: 22px;color: #909399">
				</u--input>
				<!-- <uni-search-bar class="search" placeholder="搜索" cancelButton="none" bgColor="#EEEEEE" @input="search" /> -->
			</view>
			<view class="searchButtom">
				<u-button @click="search(searchMsg)">搜索</u-button>
			</view>
		</view>

		<view class="wrap_block" v-for="(item,index) in resourceData" :key="index">
			<view class="block_content">
				<view class="res_name" @click="enterResourcesUrl(index)">
					{{item.name}}
				</view>
				<view class="res_msg" @click="enterResourcesUrl(index)">
					{{$u.timeFormat(item.createTime, 'yyyy-mm-dd')}}
					下载数：{{item.downNum}}
					所需积分：{{item.integral}}
				</view>
				<view class="res_size">
					文件大小{{item.size > 1048576? parseInt(item.size/1024/1024)+ "m" : parseInt(item.size/1024) + "kb"}}
				</view>
				<view class="download_btn">
					<u-button shape="circle" color="linear-gradient(to right,rgb(12,235,235), rgb(32,227,178), rgb(41,255,198))"
						@click="filedownload(item.resourceId,item.url)">下载</u-button>
				</view>
			</view>
		</view>
		<view class="loadmore_wrap" v-if="resourceData.length !== 0">
			<text>{{ isNoMore ? '到底啦' : '' }}</text>
		</view>
		<view class="uploading" @click="uploading">
			 <u-button icon="plus" size="large" shape="circle" iconColor="#31b6c3" @click="openPopup"></u-button>
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
			uploading(){
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
			height: 200rpx;
			width: 100%;
			background-color: #60C5BA;
			border-radius: 5rpx;

			.bac_logo {
				padding-left: 30rpx;
				padding-top: 30rpx;
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

		.wrap_block {
			margin: 30rpx auto;
			width: 700rpx;
			height: 200rpx;
			border-radius: 15rpx;
			box-shadow: 0rpx 0rpx 10rpx #ccc;
			background-color: #ffffff;
			position: relative;

			.block_content {
				.res_name {
					position: absolute;
					left: 24rpx;
					top: 20rpx;
					width: 415rpx;
					height: 118rpx;
					display: block;
					box-sizing: border-box
				}

				.res_msg {
					position: absolute;
					left: 10rpx;
					top: 154rpx;
					width: 438rpx;
					height: 42rpx;
					display: block;
					box-sizing: border-box;
					font-size: 24rpx;
					color: #888888;
				}

				.res_size {
					position: absolute;
					right: 0rpx;
					top: 154rpx;
					width: 222rpx;
					height: 42rpx;
					display: block;
					box-sizing: border-box;
					font-size: 28rpx;
					color: #888888;
				}

				.download_btn {
					position: absolute;
					left: 488rpx;
					top: 55rpx;
					width: 174rpx;
					height: 66rpx;
					display: block;
					box-sizing: border-box;
				}
			}
		}

		.loadmore_wrap {
			width: 750rpx;
			text-align: center;
			font-size: 24rpx;
			color: #888888;
			background: #f1f1f1;
			padding: 10rpx 0 20rpx 0;
		}
		.uploading{
			position: fixed;
			bottom: 60rpx;
			right: 60rpx;
			width: 50px;
		}
	}
</style>
