<template>
	<view>
		<!-- 空空如也 -->
		<view class="empty" v-if="active">
			<u-empty mode="search" icon="clock" iconSize="130" text="空空如也"></u-empty>
			<view class="tohome" @click="toHome">去首页制作证件照</view>
		</view>
		<!-- 我下载过的照片 -->
		<scroll-view v-else class="scroll-view-y" scroll-y="true">
			<view class="content">
				<view class="item" v-for="(item,index) in photoRecords" :key="index">
					<view class="itemTop">
						<view class="photo">
							<image class="img" :src="item.photosUrl"></image>
						</view>
						<view class="text">
							<view class="title">{{ item.photosName }}</view>
							<view class="detail"></view>
							<view class="time">{{ item.createTime }}</view>
						</view>
					</view>
					<view class="itemBottom">
						<view class="icon" @click="toDelete(item.photosId)">
							<u-icon name="trash" size="30"></u-icon>
						</view>
						<view class="download" @click="toDownload(item.photosUrl)">去下载</view>
					</view>
				</view>
				<!-- 底部分页 -->
				<view class="paging">
					<view @click="backPage">上一页</view>
					<text class="pageNum">第{{ getPhotoData.pageNum }}页</text>
					<view @click="nextPage">下一页</view>
				</view>
			</view>
		</scroll-view>
		<!-- 底部tabbar -->
		<view class="tabbar">
			<view class="tabbarItem" @click="toHome">
				<u-icon v-if="isTabbar.home" name="home-fill" size="25" color="#2979ff"></u-icon>
				<u-icon v-else name="home" size="25" color="#2979ff"></u-icon>
				<text class="tabbarText">首页</text>
			</view>
			<view class="tabbarItem" @click="toMe">
				<u-icon v-if="isTabbar.me" name="account-fill" size="25" color="#2979ff"></u-icon>
				<u-icon v-else name="account" size="25" color="#2979ff"></u-icon>
				<text class="tabbarText">我的</text>
			</view>
		</view>
		<!-- 提示消息 -->
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import { 
		getPhotoData_get,
		deletePhotoById_delete
	} from '@/api/工具模块/证件照.js'
	export default {
		data() {
			return {
				active: false,	//控制显示空白或内容列表
				isTabbar:{		// tabbar导航控制
					home: false,
					me: true
				},
				getPhotoData:{  // 分页获取我的证件照的参数
					pageNum: 1,
					pageSize: 10,
				},
				photoRecords: [],  // 分页获取我的证件照的结果
				
				totalPage: null,	// 总页数

			};
		},
		onLoad(){
			this.getIdPhotoData(this.getPhotoData)
		},
		methods:{
			// 分页获取证件照-----------------------------------------------------------------------------
			async getIdPhotoData(params){
				const res = await getPhotoData_get(params)
				if(res.data.code == 200){
					// this.photoRecords = res.data.data.records
					const results =  res.data.data.records
					this.photoRecords = results.reverse()
					this.totalPage = Math.ceil(res.data.data.total/this.getPhotoData.pageSize)
					console.log(this.totalPage)
					// 转换时间格式
					for(let i=0;i<this.photoRecords.length;i++){
						var date = new Date(this.photoRecords[i].createTime);
						this.photoRecords[i].createTime = this.dateFormat(date)
					}
					// 是否展示 空页面
					if(this.photoRecords.length !==0){
						this.active = false
					}else{
					this.active = true
					}
				}
				
			},
			// 删除的处理函数-----------------------------------------------------------------------------
			toDelete(photosId){
				const _this = this
				uni.showModal({
					title: '提示',
					content: '确定删除这张照片吗',
					confirmColor: '#0099ff',
					cancelColor: '#000000',
					success: function (res) {
						if (res.confirm) {
							_this.deleteIdPhotoById(photosId)
						} else if (res.cancel) {
						}
					}
				});
			},
			async deleteIdPhotoById(photosId){
				const res = await deletePhotoById_delete([photosId])
				console.log(res.data)
				if(res.data.code == 200){
					this.getIdPhotoData(this.getPhotoData)
					uni.showModal({
						content: '删除成功！',
						showCancel: false
					});
				}else{
					this.selfMsg("删除失败", "warning")
				}
				
			},
			// 下载的处理函数-----------------------------------------------------------------------------
			toDownload(filePath){
				uni.downloadFile({ //下载文件资源到本地,返回文件的本地临时路径
					url: filePath, //网络图片路径
					success: (res) => {
						var imageUrl = res.tempFilePath; //临时文件路径
						uni.saveImageToPhotosAlbum({
							filePath: imageUrl,
							success: function() {
								uni.showModal({
									content: '保存成功！',
									showCancel: false
								});
							}
						});
					}
				})
			},
			// 上一页-----------------------------------------------------------------------------
			backPage() {
				
				if (this.getPhotoData.pageNum == 1) { // 当处于第一页时不允许在进行上一页操作
					return this.selfMsg("已经是第一页了哦", "warning")
				}
				this.getPhotoData.pageNum -= 1
				this.hotType = [] // 置空原数组
				this.getIdPhotoData(this.getPhotoData)
			},
			// 下一页-----------------------------------------------------------------------------
			nextPage() {
				this.hotType = [] // 置空原数组
				if (this.getPhotoData.pageNum == this.totalPage) {
					return this.selfMsg("已经是最后一页了哦", "warning")
				}
				this.getPhotoData.pageNum += 1
				this.getIdPhotoData(this.getPhotoData)
			},
			
			// tabbar 首页-----------------------------------------------------------------------------
			toHome(){
				this.isTabbar.home = true
				this.isTabbar.me = false
				uni.redirectTo({
					url: '/subpages_tool/id_photo/IdPhoto'
				});
			},
			// tabbar 我的-----------------------------------------------------------------------------
			toMe(){
				this.isTabbar.home = false
				this.isTabbar.me = true
			},
			// 定义格式化时间的方法-----------------------------------------------------------------------------
			dateFormat(dtStr){
			    const dt = new Date(dtStr)
			
			    const y = dt.getFullYear()
			
			    const m = this.padZero(dt.getMonth() + 1)
			
			    const d = this.padZero(dt.getDate() )
			
			    const hh = this.padZero(dt.getHours())
			
			    const mm = this.padZero(dt.getMinutes())
			
			    const ss = this.padZero(dt.getSeconds())
			
			    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
			},
			
			// 定义补零的函数-----------------------------------------------------------------------------
			padZero(n){
			    return n > 9? n: '0'+n
			},
			// 提醒弹框消息-----------------------------------------------------------------------------
			selfMsg(msg, mod) {
				this.$refs.uToast.show({
					type: mod,
					message: msg
				})
			}
		}
	}
</script>

<style lang="less">
	.empty {
		width: 100%;
		margin-top: 200rpx;
		.tohome{
			width: 250rpx;
			height: 60rpx;
			margin: 100rpx auto;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #2979ff;
			color: white;
		}
	}
	.scroll-view-y{
		width: 100%;
		height: 1400rpx;
		// background-color: aqua;
		// -webkit-overflow-scrolling:touch;
		.content {
			width: 100%;
			.item {
				width: 90%;
				height: 350rpx;
				margin: 40rpx auto;
				border-radius: 5%;
				overflow: hidden;
				background-color: white;
				.itemTop {
					width: 100%;
					height: 250rpx;
					display: flex;
					flex-direction: row;
					.photo {
						width: 150rpx;
						height: 190rpx;
						margin: 30rpx 30rpx 30rpx 50rpx;
						border-radius: 10rpx;
						.img{
							width: 100%;
							height: 100%;
						}
					}
					.text {
						width: 400rpx;
						height: 210rpx;
						margin: 20rpx 0;
						display: flex;
						flex-direction: column;
						.title {
							font-size: 35rpx;
							margin-top: 30rpx;
						}
						.detail {
							width: 100%;
							margin: 20rpx 0;
							font-size: 30rpx;
						}
						.time {
							color: gray;
						}
					}
				}
				.itemBottom {
					width: 100%;
					height: 100rpx;
					border-top: #eee9f1 0.1rpx solid;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					.icon {
						width: 80rpx;
						height: 65rpx;
						background-color: #eee9f1;
						margin-left: 50rpx;
						border-radius: 10%;
						display: flex;
						align-items: center;
						justify-content: center;
					}
					.download {
						width: 130rpx;
						height: 65rpx;
						margin-right: 50rpx;
						background-color: #2979ff;
						color: white;
						border-radius: 10%;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
			}
		}
		.paging {
			width: 100%;
			height: 300rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			color: #2979ff;
			font-size: 35rpx;
		
			.pageNum {
				font-size: 28rpx;
				display: block;
				color: black;
			}
		}
	}
	
	.tabbar {
		position: fixed;
		bottom: -60rpx;
		width: 100%;
		height: 180rpx;
		padding-bottom: 80rpx;
		background-color: #c6c6f0;
		display: flex;
		justify-content: space-around;
		.tabbarItem {
			width: 200rpx;
			height: 90rpx;
			margin-top: 10rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.tabbarText {
				display: block;
			}
		}
	}
</style>
