/**全局mixins
 * 负责全局风控接入、图片上传oss统一获取
 * */

// import {
// 	apiBusinessNewCheckText_Get,
// } from '@/API/新接口.js'

import {
	systemFileUploadSignature_Get,
} from '@/api/SYSTEM/文件请求处理.js';
import {
	get_baseUrl,
	getHeader
} from '@/utils/request.js'

export const gMixins = {
	data() {
		return {}
	},
	methods: {
		/**内容风控检测
		 * @param {string || object} target = 'text' 	文本适用
		 * @param {object} target = {path:string,  size:number}  图片适用
		 * @param {string} type = 'str(@default) || string || img || imges'
		 * @returns boolean
		 */
		async safe_dataContentCheck(target, type = 'img') {
			console.log("----检测内容----", target, type);
			if (type == 'img' || type == 'imges') {
				// 图片路径异常
				if (target.path == null || target.path == undefined) {
					console.error('图片路径异常');
					return false
				}
				try {
					return await check_img(target);
				} catch (e) {
					errTip();
					return false
				}
			}
		},
		/** 上传文件
		 * path 临时文件的路径
		 * 		|-上传成功 返回 文件链接
		 * index 显示文件列表的索引
		 * */
		uploadFilePromise(newFilePath, index) {
			return new Promise((resolve, reject) => {
				uni.uploadFile({
					url: get_baseUrl() + '/system/file/upload/oss',
					name: 'file',
					filePath: newFilePath,
					header: getHeader(),
					success: res => {
						// console.log('后端回传', res);
						let respon = JSON.parse(res.data);
						console.log('结果---解析', respon);

						if (respon.code == 200) {
							resolve(respon.data.url);
						} else if (respon.code == 500) {
							errTip('图片');
							reject();
						}
					},
					fail: () => {
						// 接口挂了就直接通过
						resolve(true);
					}
				});
			});

			// let ossTopPath = this.fileType ? this.ossBasePath : 'video',
			// 	suffix = this.fileType ? '.jpg' : '.mp4';
			// let fileName = ossTopPath + '/' + uni.$u.guid(10) + this.toDayStr + suffix;

			// this.ossToken.key = fileName;
			// this.uploadedFileList.push(this.ossToken.host + '/' + fileName);
			// return new Promise((resolve, reject) => {
			// 	uni.uploadFile({
			// 		url: this.ossToken.host,
			// 		filePath: path,
			// 		name: 'file',
			// 		formData: this.ossToken,
			// 		success: res => {
			// 			this.addOkUrl(index, this.ossToken.host + '/' + fileName);
			// 			resolve(this.ossToken.host + '/' + fileName);
			// 		}
			// 	});
			// });
		},
	}
}

/** 检测图片
 * @param {object} filePara = {path:string,  size:number}
 * @return {boolean} 返回布尔值
 * */
async function check_img(filePara) {

	// 检测接口限定图片1M以内 先处理图片再检测
	// const newFilePath = await pictureCompression(filePara);

	const newFilePath = filePara.path;

	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: get_baseUrl() + '/system/file/upload/oss',
			name: 'file',
			filePath: newFilePath,
			header: getHeader(),
			success: res => {
				let respon = JSON.parse(res.data);
				console.log('图片风控检测结果', respon);

				if (respon.code == 200) {
					resolve(true);
				} else if (respon.code == 500) {
					errTip('图片');
					resolve(false);
				}
			},
			fail: () => {
				// 接口挂了就直接通过 
				resolve(true);
			}
		});
	});
}


/* 内容敏感提醒 */
function errTip(str = '文本') {
	uni.showModal({
		title: '内容安全风控提醒',
		content: `${str}疑似包含内容违规，请核查无误后再提交`,
		showCancel: false,
		confirmColor: "#04c354",
		confirmText: "我知道了",
	});
}

/* 图片响应提示 */
function imgTip(msg) {
	uni.showToast({
		icon: 'none',
		title: msg
	})
}
