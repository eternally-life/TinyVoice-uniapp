<!-- 文件上传组件 支持图片、视频-->
<!-- @upPara 触发事件  返回缓存对象 -->
<template>
	<view>
		<!-- 上传图片 -->
		<view v-if="fileType" class="flx">
			<u-upload
				:fileList="imgList"
				@afterRead="afterRead"
				@delete="deletePic"
				name="1"
				:multiple="true"
				:maxCount="imgMaxCount"
				:previewFullImage="!avatarFlag"
			></u-upload>
		</view>
		<!-- 上传视频 -->
		<view v-else>
			<u-upload
				:fileList="videoList"
				@afterRead="afterRead"
				@delete="deletePic"
				name="2"
				:multiple="true"
				:maxCount="1"
				accept="video"
			></u-upload>
		</view>
	</view>
</template>

<script>
export default {
	name: 'ty-file-upload',
	props: {
		/* 是否图片，否则为视频 */
		isImg: {
			type: Boolean,
			default: true
		},
		/** 参数获取方式
		 * @param (string){paraGetMethods} = 'active'  通过upPara事件回传数据
		 * @param (string){paraGetMethods} = 'passive' 外部同ref调用上传（缺省）
		 * */
		paraGetMethods: {
			type: String,
			default: 'passive'
		},
		/* 初始传入已有图片  适用于编辑、审查时传入参数*/
		initData: {
			type: Array,
			default: []
		},
		/** 初始传入  自定义的上传路径
		 * 构成： parent/children1/children2...
		 * !!前后不带路径分隔符，仅节点间带有分隔符 */
		iniTopPath: {
			type: String,
			default: ''
		},
		/* 外部调节图片数量 */
		iniCount: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			imgList: [], //缓存图片列表（用于显示）
			videoList: [], //缓存视频列表（用于显示）
			isInit: false, //是否存在初始输入数据
			fileType: true, //true-图片、false-视频
			avatarFlag: false, //true上传单张头像, false-上传多张
			uploadedFileList: [] //已上传完成的文件列表（回传数据）
		};
	},
	computed: {
		/**上传首路径
		 * 视频则 video
		 * 图片 images
		 * 自定义 this.iniTopPath
		 * */
		ossBasePath() {
			return this.fileType == false ? 'video' : this.iniTopPath == '' ? 'images' : this.iniTopPath;
		},
		/* 动态计算文件选择个数  */
		imgMaxCount() {
			return this.iniCount != 0 ? this.iniCount : this.avatarFlag ? 1 : 10;
		},
		/* 返回当前时间的字符串 防止意外情况小图片重名*/
		toDayStr() {
			return (
				'_' +
				getApp()
					.globalData.myDate.getFullYear()
					.toString() +
				'_' +
				getApp()
					.globalData.myDate.getMonth()
					.toString() +
				'_' +
				getApp()
					.globalData.myDate.getDate()
					.toString()
			);
		}
	},
	watch: {
		/* 动态更新 选中类型 */
		isImg: {
			immediate: true,
			handler(newVale) {
				this.fileType = newVale;
			}
		},

		/* 动态监控传入数据 */
		initData: {
			// immediate: true,
			handler(newVale) {
				if (this.fileType) {
					this.imgList = newVale.map(value => {
						return {
							url: value,
							done: true
						};
					});
					console.log('初始化图片数据', this.imgList);
				} else {
					this.videoList = newVale.map(value => {
						return {
							url: value,
							done: true
						};
					});
					console.log('初始化视频数据', this.videoList);
				}
				if (newVale) {
					this.isInit = true;
					console.log('-------存在初始传入数据');
					this.uploadedFileList = this.reGetData();
					if (this.paraGetMethods == 'active') {
						//主动触发
						this.returnData();
					}
				}
			}
		}
	},
	methods: {
		/**点击 删除文件
		 * fileType 判断参数
		 * 	|- true 删除图片
		 * 	|- false 删除文件*/
		deletePic(event) {
			if (this.fileType) {
				this.imgList.splice(event.index, 1);
			} else {
				this.videoList.splice(event.index, 1);
			}
			// 初始传入数据  但是并没有上传新图片
			if (this.isInit && this.uploadedFileList.length == 0) {
				this.uploadedFileList = this.reGetData();
			} else {
				this.uploadedFileList.splice(event.index, 1);
			}

			if (this.paraGetMethods == 'active') {
				//主动触发
				this.returnData();
			}
		},

		/**上传事件	用于外部调用触发
		 * 图片列表为空	返回空数组
		 * 否则	返回已上传的数组列表
		 * 方法返回上传成功的链接列表 uploadedFileList，也可以通过ref获取
		 * */
		upData() {
			/* 未选中图片、视频 */
			if ((this.imgList.length == 0 && this.fileType) || (this.videoList.length == 0 && !this.fileType)) {
				return [];
			}

			this.uploadedFileList = [];
			[].concat(this.fileType ? this.imgList : this.videoList).map(async (item, index) => {
				console.log('遍历的图片数据', item, item.type);

				if (item.type == undefined) {
					console.log('过滤一个 <初始传入> 的图片', item);
					this.uploadedFileList.push(item.url);
				} else if (item.done && item.okUrl != '') {
					console.log('过滤一个 <已上传> 的图片', item);
					this.uploadedFileList.push(item.okUrl);
				} else {
					await this.uploadFilePromise(item.url, index);
				}
			});

			console.log('---临时图片列表', this.imgList);
			console.log('---返回图片列表', this.uploadedFileList);

			if (this.paraGetMethods == 'active') {
				//主动触发数据返回
				this.returnData();
			} else {
				// 外部被动返回数据
				return this.uploadedFileList;
			}
		},

		/**选择文件后触发 生成临时文件（选择好文件后执行）
		 * 	先获取oss签名
		 * 	再将选中的文件添加进文件文件列表
		 * */
		async afterRead(event) {
			uni.showLoading({ title: '图片加载中' });
			if (Object.keys(this.ossToken).length == 0) {
				const netResult = await this.getOssToken();
				/* 当前无法获取OSS签名 */
				if (netResult === false) {
					console.error('获取不到OSS签名，当前无法上传文件', netResult);
					return;
				} else {
					this.ossToken = netResult;
				}
			}
			new Promise((resolve, reject) => {
				[].concat(event.file).map(async (item, index) => {
					if (this.fileType) {
						const isSafe = true; //未启用风控时  使用这个。开启风控后解开下一行注释
						// const isSafe = await this.safe_dataContentCheck({ path: item.url, size: item.size }, 'img');
						// console.log('风控状态', isSafe);
						if (isSafe) {
							this.imgList.push({ ...item, done: false });
						}
					} else {
						this.videoList.push({ ...item, done: false });
					}

					/* 以上仅检测图片。  以下则图片、视频均检测  视频接口暂时没有*/
					// const isSafe = await this.safe_dataContentCheck({ path: item.url, size: item.size }, 'img');
					// if (isSafe) {
					// 	this.fileType
					// 		? this.imgList.push({ ...item, done: false })
					// 		: this.videoList.push({ ...item, done: false });
					// }

					if (index == event.file.length - 1) {
						// 遍历至最后一项才往下走
						resolve();
					}
				});
			})
				.then(res => {
					if (this.paraGetMethods == 'active') {
						// 判断是否由组件 主动调用上传
						this.upData();
					}
				})
				.finally(() => {
					uni.hideLoading();
				});
		},

		/** 上传文件
		 * path 临时文件的路径
		 * 		|-上传成功 返回 文件链接
		 * index 显示文件列表的索引
		 * */
		uploadFilePromise(path, index) {
			let ossTopPath = this.fileType ? this.ossBasePath : 'video',
				suffix = this.fileType ? '.jpg' : '.mp4';
			let fileName = ossTopPath + '/' + uni.$u.guid(10) + this.toDayStr + suffix;

			this.ossToken.key = fileName;
			this.uploadedFileList.push(this.ossToken.host + '/' + fileName);
			return new Promise((resolve, reject) => {
				uni.uploadFile({
					url: this.ossToken.host,
					filePath: path,
					name: 'file',
					formData: this.ossToken,
					success: res => {
						this.addOkUrl(index, this.ossToken.host + '/' + fileName);
						resolve(this.ossToken.host + '/' + fileName);
					}
				});
			});
		},

		/**增加上传成功的标记（用于显示的列表）
		 * 	index		对应数组的索引
		 * 	url-okUrl	上传成功的路径
		 * 	done		标记状态
		 * */
		addOkUrl(index, url) {
			if (this.fileType) {
				this.imgList[index]['okUrl'] = url;
				this.imgList[index].done = true;
			} else {
				this.videoList[index]['okUrl'] = url;
				this.videoList[index].done = true;
			}
		},
		/**重新获取url数据
		 * 	根据已有的临时文件列表获取
		 * 	--用于审查时 只删文件没有增加的情况
		 *
		 */
		reGetData() {
			if (this.fileType) {
				return this.imgList.map(value => {
					if (value.okUrl) {
						return value.okUrl;
					} else {
						return value.url;
					}
				});
			} else {
				return this.videoList.map(value => {
					if (value.okUrl) {
						return value.okUrl;
					} else {
						return value.url;
					}
				});
			}
		},

		/* 主动回调数据列表 */
		returnData() {
			// console.log('触发回调');
			this.$emit('upPara', this.uploadedFileList);
		}
	}
};
</script>

<style lang="scss"></style>
