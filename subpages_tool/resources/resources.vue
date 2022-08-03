<template>
	<view class="wrap">
		<view class="searchBox">
			<view class="searchInput">
				<u--input
					    placeholder="前置图标"
					    prefixIcon="search"
					    prefixIconStyle="font-size: 22px;color: #909399"
					></u--input>
			</view>
			<view class="searchButtom">
				<u-button @click= "postResourcesMessage">搜索</u-button>
			</view>
		</view>
		
		<view class="wrap_block" v-for="(item,index) in Data" :key="index">
			<view class="block_content">

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
				setIntegral : '',
				setName : '',
				setDescribe : '',
				seturl: '',
				
			};
		},
		methods: {
			async postResourcesMessage() {
				const res = await communityTinyserveresourceSave_Post()
				console.log(res);
			}
		},
		
	}
</script>

<style lang="scss">
.wrap{
	height: 100%;
	.searchBox{
		margin: 20rpx auto;
		width: 700rpx;
		height: 200rpx;
		border-radius: 30rpx;
		box-shadow: 10rpx 10rpx 10px #ccc;
	}
	.wrap_block{
		margin: 20rpx auto;
		width: 700rpx;
		height: 200rpx;
		border-radius: 30rpx;
		box-shadow: 10rpx 10rpx 10px #ccc;
		background-color: #ffffff;
		
		.block_content{
			
		}
	}
}
</style>
