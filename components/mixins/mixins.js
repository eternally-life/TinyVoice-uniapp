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
		return {
			ossToken: {}, //图片上传oss
		}
	},
	methods: {
		/**内容风控检测
		 * @param {string || object} target = 'text' 	文本适用
		 * @param {object} target = {path:string,  size:number}  图片适用
		 * @param {string} type = 'str(@default) || string || img || imges'
		 * @returns boolean
		 */
		async safe_dataContentCheck(target, type = 'str') {
			console.log("----检测内容----", target, type);
			if (target == undefined || target == null) return true;
			if (type == 'str' || type == 'string') {
				try {
					if (typeof target == 'object') {
						return await check_string(JSON.stringify(target));
					}
					return await check_string(target);
				} catch (e) {
					errTip();
					return false
				}
			}
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

		/** 异步获取oss签名
		 * 请求成功  返回oss签名
		 * 请求异常	返回false 并弹出模态框提醒
		 * */
		getOssToken() {
			return new Promise((resolve, reject) => {
				systemFileUploadSignature_Get().then(res => {
					if (res.data.code == 200) {
						resolve(res.data.data);
					} else {
						uni.showModal({
							title: '图片上传失败提醒',
							content: `网络异常,无法上传图片,请重试`,
							showCancel: false,
							confirmColor: "#04c354",
							confirmText: "我知道了",
						});
						resolve(false);
					}
				});
			});
		}
	}
}

/* 检测字符串 */
function check_string(para) {
	return new Promise((resolve, reject) => {
		apiBusinessNewCheckText_Get({
			text: para
		}).then(res => {
			// console.log("判断依据", res);
			if (res.data.code == 200) {
				resolve(true);
			} else {
				reject(false);
			}
		}).catch(err => {
			resolve(true);
		})
	})
}

/**压缩图片
 * @param {object} file = {path:string,  size:number}  
 * @return {string} 直接返回图片原路径或处理后的临时文件路径
 * */
function pictureCompression(file) {
	return new Promise((resolve, rreject) => {
		if (file.size > 1000) {
			uni.compressImage({
				src: file.path,
				quality: 80,
				width: '50%',
				height: '50%',
				success: ress => {
					// console.log('压缩结果----------', ress, ress.tempFilePath);
					resolve(ress.tempFilePath);
				}
			});
		} else {
			resolve(file.path);
		}
	})
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
			header: getHeader()
			success: res => {
				let respon = JSON.parse(res.data);
				console.log('图片风控检测结果', respon);


				if (respon.code == 200) {
					resolve(true);
				} else if (respon.code == 500 && respon.msg.indexOf('大于') != -1) {
					imgTip('图片过大');
					resolve(false);
				} else if (respon.code == 500 && respon.msg.indexOf('违法违规') != -1) {
					errTip('图片');
					resolve(false);
				} else if (respon.code == 500) {
					imgTip('文件异常，请重新选择');
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
