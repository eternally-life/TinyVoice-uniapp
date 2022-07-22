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
import { get_baseUrl, getHeader } from '@/utils/request.js';
export default {
	name: 'ty-file-upload',
	props: {
		/* 是否图片，否则为视频 */
		isImg: {
			type: Boolean,
			default: true
		},
		/** 参数获取方式
		 * @param (string){paraGetMethods} = 'active'  通过upPara事件回传数据 <同步>
		 * @param (string){paraGetMethods} = 'passive' 外部同ref调用upData方法上传（缺省）<异步>
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
		 * */
		ossBasePath() {
			return this.fileType == false ? 'video' : 'images';
		},
		/* 动态计算文件选择个数  */
		imgMaxCount() {
			let count = this.iniCount != 0 ? this.iniCount : this.avatarFlag ? 1 : 9;
			return count > 9 ? 9 : count;
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
							done: true //添加已存在标记
						};
					});
					console.log('初始化图片数据', this.imgList);
				} else {
					this.videoList = newVale.map(value => {
						return {
							url: value,
							done: true //添加已存在标记
						};
					});
					console.log('初始化视频数据', this.videoList);
				}
				if (newVale) {
					this.isInit = true;
					console.log('-------存在初始传入数据');
					this.uploadedFileList = this.reGetData();
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
			this.deletePr(event.index);

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

		/* 删除 预览图片*/
		deletePr(index) {
			if (this.fileType) {
				this.imgList.splice(index, 1);
			} else {
				this.videoList.splice(index, 1);
			}
		},

		/**上传事件	用于外部调用触发
		 * 图片列表为空	返回空数组
		 * 否则	返回已上传的数组列表
		 * 方法返回上传成功的链接列表 uploadedFileList，也可以通过ref异步获取获取
		 * */
		upData() {
			uni.showLoading({ title: '图片上传中' });
			/* 未选中图片、视频 */
			if ((this.imgList.length == 0 && this.fileType) || (this.videoList.length == 0 && !this.fileType)) {
				return [];
			}
			this.uploadedFileList = [];

			return new Promise(async (resolve, reject) => {
				let index = 0, //索引
					errCount = 0; //错误数
				for (let item of [].concat(this.fileType ? this.imgList : this.videoList)) {
					// console.log('遍历的图片数据', item, item.type, arr.length);
					if (item.type == undefined) {
						// console.log('过滤一个 <初始传入> 的图片', item);
						this.uploadedFileList.push(item.url);
					} else if (item.done && item.okUrl != '') {
						// console.log('过滤一个 <已上传> 的图片', item);
						this.uploadedFileList.push(item.okUrl);
					} else {
						// 上传图片 修改标记
						try {
							const url = await this.uploadFilePromise(item.url, index);
							this.addOkUrl(index - errCount, url);
							this.uploadedFileList.push(url);
							// console.log('返回数据', url);
						} catch (e) {
							errCount++;
							this.deletePr(index);
							console.log('图片检测异常');
						}
					}
					index++;
				}
				// this.filterList();
				resolve();
			})
				.then(() => {
					// console.log('---临时图片列表', this.imgList);
					// console.log('---返回图片列表', this.uploadedFileList);
					if (this.paraGetMethods == 'active') {
						//主动触发数据返回
						this.returnData();
					} else {
						// 外部被动返回数据
						return this.uploadedFileList;
					}
				})
				.finally(fin => {
					uni.hideLoading();
				});
		},

		/**选择文件后触发 生成临时文件（选择好文件后执行）
		 * 	先获取oss签名
		 * 	再将选中的文件添加进文件文件列表
		 * */
		async afterRead(event) {
			// console.log('选中图片', event);

			// 添加图片到临时预览列表
			[].concat(event.file).map(async (item, index) => {
				this.fileType
					? this.imgList.push({ ...item, done: false })
					: this.videoList.push({ ...item, done: false });
			});
			if (this.paraGetMethods == 'active') {
				// 判断是否由组件 主动调用上传
				this.upData();
			}
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

		// 过滤临时列表中的无用数据，并返回过滤后的数据
		filterList() {
			if (this.fileType) {
				this.imgList = this.imgList.filter(value => {
					return value.done;
				});
			} else {
				this.videoList = this.videoList.filter(value => {
					return value.done;
				});
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
			// console.log('触发回调', this.uploadedFileList);
			this.$emit('upPara', this.uploadedFileList);
		}
	}
};
</script>

<style lang="scss"></style>
