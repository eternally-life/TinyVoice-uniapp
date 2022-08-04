<template>
	<view class="wrap">
		<view class="searchBox">
			<view class="searchInput">
				<u--input placeholder="搜索你感兴趣的内容" prefixIcon="search" prefixIconStyle="font-size: 22px;color: #909399">
				</u--input>
			</view>
			<view class="searchButtom">
				<u-button @click="getResourcesMessage()">搜索</u-button>
			</view>
		</view>

		<view class="wrap_block" v-for="(item,index) in resourceData" :key="index" @click="enterResourcesUrl">
			<view class="block_content">
				文件名：{{item.name}}
				下载数：{{item.downNum}}
				所需积分：{{item.intergral}}
				文件大小{{item.size}}
			</view>
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
				resourceData: [],
				currentPageNumber: 1,

				setIntegral: '',
				setName: '',
				setDescribe: '',
				seturl: '',
			};
		},
		mounted() {
			this.windowHeight = getApp().globalData.windowHeight
			console.log(this.windowHeight);
			//获取资源数据
			this.resourceData = []
			this.currentPageNumber = 1
			this.getResourcesMessage()

		},
		methods: {
			async getResourcesMessage() {
				try {
					const res = await communityTinyserveresourcePage_Get({
						pages: this.currentPageNumber,
						size: 10,
						//tatol 服务器内总共资源数
					})
					let datas = res.data.data
					console.log(datas);
					this.resourceData = [...this.resourceData, ...datas.records]
					console.log(this.resourceData);
				} catch (error) {
					//处理异常
					console.log(error);
				}

			},
			enterResourcesUrl(index){
				uni.navigateTo({
					url: '/subpages_tool/resourcesDetail/resourcesDetail',
					success: (res) => {
						res.eventChannel.emit('acceptResourcesData',{
							data: this.resourceData[index]
						})
					}
				})
			}
			// getResourcesMessages() {
			// 	communityTinyserveresourcePage_Get({}).then(res => {
			// 		let datas = res.data.data;
			// 		console.log(datas);
			// 		this.allList = datas.records;
			// 		this.page = datas.pages;
			// 		console.log(this.allList);
			// 		console.log(this.page);
			// 	})
			// },
			// getExport() {
			// 	uni.showLoading()
			// 	this.resourceList = this.getpage(this.page, this.allList)
			// 	console.log(resourceList);
			// 	uni.hideLoading()
			// },
			// getpage(page, resourceList) {
			// 	let sindex = (parseInt(page) - 1) * 15
			// 	let eindex = parseInt(page) * 15
			// 	let newList = resourceList.slice(sindex, eindex)
			// 	console.log(sindex);
			// 	console.log(eindex);
			// 	console.log(newList);
			// 	return newList
			// },
			// onReachBottom() {
			// 	console.log("123");
			// 	this.page += 1
			// 	uni.showLoading({})
			// 	setTimeout(() => {
			// 		this.resourceList = [...this.list, ...this.getpage(this.page, this.allList)]
			// 		uni.hideLoading()
			// 	}, 500);
			// },
			// onLoad() {
			// 	getExport()
			// }
		}
	}
</script>

<style lang="scss">
	.wrap {
		background: #f5f5f5;

		.searchBox {
			margin: 20rpx auto;
			width: 700rpx;
			height: 200rpx;
			border-radius: 30rpx;
			box-shadow: 3rpx 3rpx 3rpx #ccc;

			.searchInput {}

			.searchInput {}
		}

		.wrap_block {
			margin: 20rpx auto;
			width: 700rpx;
			height: 200rpx;
			border-radius: 30rpx;
			box-shadow: 3rpx 3rpx 3rpx #ccc;
			background-color: #ffffff;

			.block_content {}
		}
	}
</style>
