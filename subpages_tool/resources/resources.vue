<template>
	<view class="wrap">
		<view class="wrap_background">
			<view class="bac_logo">
				Logo <i class="iconfont "></i>
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

		<view class="wrap_block" v-for="(item,index) in resourceData" :key="index" @click="enterResourcesUrl(item.id)">
			<view class="block_content">
				<view class="res_name">
					{{item.name}}
				</view>
				<view class="res_msg">
					{{$u.timeFormat(item.createTime, 'yyyy-mm-dd')}}
					下载数：{{item.downNum}}
					所需积分：{{item.integral}}
				</view>
				<view class="res_size">
					文件大小{{item.size}}m
				</view>
				<view class="download_btn">
					<u-button color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))" @click="filedownload">下载</u-button>
				</view>
			</view>
		</view>
		<view class="loadmore_wrap" v-if="resourceData.length !== 0">
			<text>{{ isNoMore ? '到底啦' : '' }}</text>
		</view>
	</view>
</template>

<script>
	import {
		communityTinyserveresourceSave_Post,
		communityTinyserveresourceByResourceId_Get,
		communityTinyserveresourceDown_Get,
		communityTinyserveresourcePage_Get
	} from "@/api/社区模块/资源共享.js"
	export default {
		data() {
			return {
				windowHeight: null,
				searchMsg: "",
				resourceData: [],
				currentPageNumber: 1, //页号
				isloading: false,
				isNoMore: false,
				keyword: '',
				id: '',
				fileUlr: ''
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
					let datas = res.data.data
					if (res.data.msg === "还没有资源快来第一个上传吧~") {
						this.isNoMore = true
					}
					// console.log(res.data.msg);
					this.currentPageNumber++
					this.resourceData = [...this.resourceData, ...datas.records]
					this.isLoading = false
					
				} catch (error) {
					//处理异常
					console.log(error);
				}
			},
			//	文件内容跳转  后期可改模态框
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
			filedownload() {
				console.log("asad");
				
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
				uni.showLoading()
				setTimeout(() => {
					this.getResourcesMessage()
					uni.hideLoading()
				}, 500);
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
	}
</style>
