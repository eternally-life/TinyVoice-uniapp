<template>
	<view class="body">
		<scroll-view class="scroll-view-y" scroll-y>
			<view class="topText">
				<text class="topText_1">微音智能转换</text>
				<text class="topText_2">——在线绘图 提高你的效率——</text>
			</view>
			<!-- 主体区 -->
			<view class="contenter">
				<!-- 搜索区 -->
				<view class="searchBox" @click="toSearchPhotoSpec">
					<u-search shape="round" borderColor="#a39d95" placeholder="搜索需要的证件照" :showAction="false" disabled></u-search>
				</view>
				<!-- 热门类型 -->
				<view class="comments_title">
					<view class="comments_border"></view>
					<text class="title">热门类型</text>
					<view class="diySpec" @click="toDiySpec">
						<u-icon name="edit-pen" color="#2979ff" size="28"></u-icon>
						<text class="diySpecText">自定义规格</text>
					</view>
				</view>
				<!-- 规格列表 -->
				<view class="list">
					<view class="item" v-for="(option,index) in hotType" :key="index" @tap="chooseSpec(option.id,option.color)">
						<text class="photoType">{{ option.titleName }}</text>
						<text class="detail">{{ option.photoSize }}</text>
						<text class="detail">{{ option.spec }}</text>
					</view>
				</view>
				<!-- 底部分页 -->
				<view class="paging">
					<view @click="backPage">上一页</view>
					<text class="pageNum">第{{ getSpecData.pageNum }}页</text>
					<view @click="nextPage">下一页</view>
				</view>
			</view>
		</scroll-view>
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
			<!-- 自定义规格遮罩 -->
		<u-overlay :show="show">
			<view class="warp">
				<view class="rect" @tap.stop>
					<view class="diyHead">
						<text class="diyHeadText">请输入规格参数</text>
						<view @click="show = false"><u-icon name="close" size="30" color = "#2979ff"></u-icon></view>
					</view>
					<view class="diyContent">
						<view class="diyContentItem">
							<text class="diyContentText">宽(像素)：</text>
							<view class="diyContentInput">
								<u--input
									:placeholder="diyLimitSpec.minWide+'~'+diyLimitSpec.maxWide"
									border="surround"
									v-model="diySpec.photowide">
								</u--input>
							</view>
						</view>
						<view class="diyContentItem">
							<text class="diyContentText">高(像素)：</text>
							<view class="diyContentInput">
								<u--input
									:placeholder="diyLimitSpec.minHigh+'~'+diyLimitSpec.maxHigh"
									border="surround"
									v-model="diySpec.photohigh"
								  ></u--input>
							</view>
						</view>
						<view class="diyContentItem">
							<text class="diyContentText">美颜系数：</text>
							<view class="diyContentInput">
								<u--input
									:placeholder="diyLimitSpec.minBeauty_degree+'~'+diyLimitSpec.maxBeauty_degree"
									border="surround"
									v-model="diySpec.beauty_degree"
								  ></u--input>
							</view>
						</view>
					</view>
					<view class="diySubmit" @click="diySubmit(diySpec.id,diySpec.color,diySpec.photowide,diySpec.photohigh,diySpec.beauty_degree)">
						<u-button type="primary" text="确定"></u-button>
					</view>
				</view>
			</view>
		</u-overlay>
		<!-- 提示消息 -->
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		getTinyPhotoSpec_get
	} from '@/api/工具模块/证件照.js'
	export default {
		data() {
			return {
				hotType: [], // 热门类型的数据
				getSpecData: { // 分页获取微音证件照规格参数
					pageNum: 1, // 第几页
					pageSize: 10, // 页码大小
					sort: 2, // 排序方式 1-默认 2-下载量 3-热门
				},
				totalPage: 22, // 返回数据的总页数 total/pageSize
				
				show: false,		//自定义规格遮罩控制
				diySpec:{
					id:null,
					color:[],
					photowide: null,//自定义照片宽
					photohigh: null,//自定义照片高
					beauty_degree: null//自定义照片美颜系数
				},
				diyLimitSpec:{		// 自定义限制用户输入规格系数
					maxWide: 800, 	// 最大宽度
					minWide: 50, 	// 最小宽度
					maxHigh: 800, 	// 最大高度
					minHigh: 50, 	// 最小高度
					maxBeauty_degree: 5.0, 	// 最大美颜系数
					minBeauty_degree: 1.0, 	// 最小美颜系数
				},
				isTabbar:{		// tabbar导航控制
					home: true,
					me: false
				}
			}
		},
		onLoad() {
			this.getTinyPhotospec(this.getSpecData)
		},
		methods: {
			// 选择类型-----------------------------------------------------------------------------
			chooseSpec(id,color) {
				uni.navigateTo({
					url: '/subpages_tool/id_photo/photoHandle?specid=' + id + '&color=' + color
				});
			},
			// 分页获取微音证件照规格-----------------------------------------------------------------------------
			async getTinyPhotospec(getSpecData) {
				const res = await getTinyPhotoSpec_get(getSpecData)
				if (res.data.code !== 200) {
					this.selfMsg("获取规格数据失败，请重试", "warning")
				}

				// this.totalPage = Math.floor(res.data.data.total / this.getSpecData.pageSize)
				// const specArr = res.data.data.records
				const specArr = res.data.data
				for (let i = 0; i < specArr.length; i++) {
					if (specArr[i].id !== '12'){// 剔除id为12对象，12为自定义规格不需要渲染
						this.hotType.push(specArr[i])
					}else{
						this.diySpec.id = specArr[i].id
						this.diySpec.color = specArr[i].color
					}
						
				}
			},
			// 上一页-----------------------------------------------------------------------------
			backPage() {
				if (this.getSpecData.pageNum == 2) { //当在第二页进行上一页操作时，需要将页面大小改为10，因为第一页需要剔除返回数据的第一个自定义元素，所以剔除后还有9个需要渲染
					this.getSpecData.pageSize = 10
				} else {
					this.getSpecData.pageSize = 9
				}
				if (this.getSpecData.pageNum == 1) { // 当处于第一页时不允许在进行上一页操作
					return this.selfMsg("已经是第一页了哦", "warning")
				}
				this.getSpecData.pageNum -= 1
				this.hotType = [] // 置空原数组
				this.getTinyPhotospec(this.getSpecData)
			},
			// 下一页-----------------------------------------------------------------------------
			nextPage() {
				this.hotType = [] // 置空原数组
				if (this.getSpecData.pageNum == this.totalPage) {
					return this.selfMsg("已经是最后一页了哦", "warning")
				}
				this.getSpecData.pageSize = 9
				this.getSpecData.pageNum += 1
				this.getTinyPhotospec(this.getSpecData)
			},
			// 点击搜索框-----------------------------------------------------------------------------
			toSearchPhotoSpec() {
				uni.navigateTo({
					url: '/subpages_tool/id_photo/searchPhotoSpec'
				});
			},
			// 点击自定义规格-----------------------------------------------------------------------------
			toDiySpec(){
				this.show = true
			},
			// 提交自定义照片规格-----------------------------------------------------------------------------
			diySubmit(id,color,photowide,photohigh,beauty_degree){
				// console.log({id,color,photowide,photohigh,beauty_degree})
				if(photowide<this.diyLimitSpec.minWide || photowide>this.diyLimitSpec.maxWide || photohigh<this.diyLimitSpec.minHigh || photohigh>this.diyLimitSpec.maxHigh){
					this.selfMsg("宽和高必须为50~800之间哦", "warning")
				}else if(beauty_degree<this.diyLimitSpec.minBeauty_degree || beauty_degree>this.diyLimitSpec.maxBeauty_degree){
					this.selfMsg("美颜系数1.0~5.0之间哦", "warning")
				}else{
					uni.navigateTo({
						url: `/subpages_tool/id_photo/photoHandle?specid=${id}&color=${color}&photowide=${photowide}&photohigh=${photohigh}&beauty_degree=${beauty_degree}`
					});
				}
				
			},
			// tabbar 首页-----------------------------------------------------------------------------
			toHome(){
				this.isTabbar.home = true
				this.isTabbar.me = false
			},
			// tabbar 我的-----------------------------------------------------------------------------
			toMe(){
				this.isTabbar.home = false
				this.isTabbar.me = true
				
				uni.redirectTo({
					url: '/subpages_tool/id_photo/myIdPhoto'
				});
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

<style scoped lang="scss">
	.scroll-view-y{
	width: 100%;
	height: 1400rpx;
	}
	.topText {
		width: 100%;
		height: 220rpx;
		background-color: #c6c6f0;
		padding-top: 60rpx;
		text-align: center;

		.topText_1 {
			display: block;
			width: 100%;
			font-size: 70rpx;
			color: white;
		}

		.topText_2 {
			display: block;
			font-size: 35rpx;
			color: white;
		}
	}

	.contenter {
		width: 100%;
		position: absolute;

		.searchBox {
			width: 90%;
			height: 80rpx;
			margin: 10rpx auto;
			display: flex;
			flex-direction: row;
			align-items: center;
		}

		.comments_title {
			display: flex;
			align-items: center;
			padding: 20rpx;

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

			.diySpec {
				width: 300rpx;
				height: 50rpx;
				display: flex;
				flex-direction: row;

				.diySpecText {
					display: block;
					margin-top: 10rpx;
					color: #2979ff;
				}
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
				padding: 10rpx;
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
	.warp {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		.rect {
			width: 60%;
			height: 500rpx;
			background-color: #c6c6f0;
			border-radius: 10%;
			padding: 20rpx;
			.diyHead {
				width: 100%;
				height: 50rpx;
				font-size: 40rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				.diyHeadText{
					display: block;
				}
			}
			.diyContent {
				width: 100%;
				margin: 25rpx 0;
				.diyContentItem{
					width: 100%;
					height: 80rpx;
					margin-bottom: 20rpx;
					display: flex;
					flex-direction: row;
					align-items: center;
					.diyContentText {
						display: block;
						width: 150rpx;
					}
					.diyContentInput {
						width: 200rpx;
						height: 80rpx;
					}
				}
			}
			.diySubmit {
				width: 300rpx;
				margin: 0 auto;
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
