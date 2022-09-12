<template>
	<view>
		<!-- 搜索区 -->
		<view class="searchBox">
			<u-search @search="toSearch" shape="round" borderColor="#a39d95"
			 placeholder="搜索需要的证件照" v-model="searchSpecData.name"
			 @custom="toSearch" 
			 ></u-search>
		</view>
		<!-- 内容主体区 -->
		<!-- 空内容 -->
		<view class="empty" v-if="active">
			<u-empty mode="search" icon="clock" iconSize="130" text="空空如也"></u-empty>
		</view>
		<!-- 搜索结果 -->
		<view class="contenter" v-else>
			<view class="comments_title">
				<view class="comments_border"></view>
				<text class="title">搜索结果：</text>
			</view>
			<!-- 规格列表 -->
			<view class="list">
				<view class="item" v-for="(option,index) in rearchResult" :key="index" @tap="chooseSpec(option.id,option.color)">
					<text class="photoType">{{ option.titleName }}</text>
					<text class="detail">{{ option.photoSize }}</text>
					<text class="detail">{{ option.spec }}</text>
				</view>
			</view>
			<!-- 底部分页 -->
			<view class="paging">
				<view @click="backPage">上一页</view>
				<text class="pageNum">第{{ currentPageNum }}页</text>
				<view @click="nextPage">下一页</view>
			</view>
		</view>
		<!-- 提示消息 -->
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		searchPhotoSpec_get
	} from '../../api/工具模块/证件照.js'
	export default {
		data() {
			return {
				active: true,	
				searchSpecData: { // 搜索证件照规格的参数
					pageNum: 1, // 第几页
					pageSize: 9, // 页码大小
					name: '', // 排序方式 1-默认 2-下载量 3-热门
				},
				rearchResult:[], 	//返回数据结果
				currentPageNum: 1, // 当前页
			}
		},
		methods: {
			// 点击搜索-----------------------------------------------------------------------------
			toSearch() {
				this.rearchResult = []
				this.searchSpecData.pageNum = 1
				if(this.searchSpecData.name !== ''){
					this.getSearchResult(this.searchSpecData)
				}

			},
			// 获取搜索结果的函数-----------------------------------------------------------------------------
			async getSearchResult(params){
				const res = await searchPhotoSpec_get(params)
				const specArr = res.data.data
				if(specArr.length > 0){
					this.rearchResult = [] // 置空原数组
					for (let i = 0; i < specArr.length; i++) {
						if (specArr[i].id !== '12'){ // 剔除id为12对象，12为自定义规格不需要渲染
							this.rearchResult.push(specArr[i])
						}
					}
					this.active = false
					this.currentPageNum = this.searchSpecData.pageNum
				}else{
					this.searchSpecData.pageNum = this.searchSpecData.pageNum-1
					if(this.rearchResult.length != 0){
						return this.selfMsg("已经是最后一页了哦", "warning")
					}
					
				}
				
			},
			// 选择规格-----------------------------------------------------------------------------
			chooseSpec(specid,color){
				uni.navigateTo({
					url: '/subpages_tool/id_photo/photoHandle?specid=' + specid + '&color=' + color
				});
			},
			// 上一页-----------------------------------------------------------------------------
			backPage() {
				
				if (this.currentPageNum == 1) { // 当处于第一页时不允许在进行上一页操作
					return this.selfMsg("已经是第一页了哦", "warning")
				}
				this.searchSpecData.pageNum -= 1
				this.getSearchResult(this.searchSpecData)
			},
			// 下一页-----------------------------------------------------------------------------
			nextPage() {
				this.searchSpecData.pageNum += 1
				this.getSearchResult(this.searchSpecData)
			},
			// 消息提示-----------------------------------------------------------------------------
			selfMsg(msg, mod) {
				this.$refs.uToast.show({
					type: mod,
					message: msg
				})
			}
		}
	}
</script>

<style lang="scss">
	.searchBox {
		width: 100%;
		height: 80rpx;
		margin: 50rpx auto;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.empty {
		width: 100%;
		margin-top: 200rpx;
	}

	.contenter {
		width: 100%;
		position: absolute;
		.comments_title {
			display: flex;
			align-items: center;
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
			.title {
				font-size: 40rpx;
				display: block;
				width: 100%;
				padding-left: 10rpx;
				margin-top: 5rpx;
			}
		}
		.list {
			width: 100%;
			height: 726rpx;
			display: flex;
			flex-direction: row;
			// justify-content:space-around;
			flex-wrap: wrap;
			.item {
				width: 220rpx;
				height: 220rpx;
				background-color: white;
				margin: 15rpx 0 7rpx 25rpx;
				border-radius: 10%;
				text-align: center;
				overflow:hidden;
				.photoType {
					font-size: 30rpx;
					display: block;
					margin: 20rpx auto;
					display: -webkit-box;
					text-overflow: ellipsis;
					overflow: hidden;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;//当属性值为3，表示超出3行隐藏
				}
				
				.detail {
					display: block;
					font-size: 27rpx;
					display: -webkit-box;
					text-overflow: ellipsis;
					overflow: hidden;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;//当属性值为3，表示超出3行隐藏
				}
			}
		}
		.paging {
			width: 100%;
			height: 100rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			align-items: center;
			color: #2979ff;
			font-size: 35rpx;
		
			.pageNum {
				font-size: 28rpx;
				display: block;
				color: black;
			}
		}
	}
</style>
