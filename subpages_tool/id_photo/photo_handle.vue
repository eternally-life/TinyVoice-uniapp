<template>
	<view class="content">
		<!-- 图片区 -->
		<view class="preview">
			<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple :maxCount="1"
				width="320rpx" height="320rpx"></u-upload>
		</view>
		<!-- 选择底色 -->
		<view class="button">
			<button @click="backColor(1)" :style="baseColor===1? 'background-color:#fd0101;' : ''">红底</button>
			<button @click="backColor(2)" :style="baseColor===2? 'background-color:#026afd;' : ''">蓝底</button>
			<button @click="backColor(3)" :style="baseColor===3? 'background-color:#fefefe;' : ''">白底</button>
		</view>   
		<!-- 提交 -->
		<view class="submit_photo">
			<u-button type="primary" @click="submit_btn">确定</u-button>
		</view>
	</view>


</template>

<script>
	import {
		photo_post
	} from '@/api/工具模块/photo.js'
	export default {
		data() {
			return {
				handleType: null,
				fileList1: [],
				baseColor: 1,
				
			}
		},
		onLoad(options){
			console.log(options);
			this.handleType = options.type
		},
		methods: {
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			// 上传文件
			
			// 选择底色
			backColor(i) {
				this.baseColor = i
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
			padding: 20rpx 0;
			border: 1rpx gray solid;
			
		}
		.button {
			display: flex;
			align-items: center;
			
			padding: 20rpx 0;
			button{
				background-color: #bbb;
				border:1rpx solid #ccc;
			}
			}
	}

	

	
</style>
