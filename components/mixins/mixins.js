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

export const g_mixins = {
	methods: {
		/** 上传文件
		 * path 临时文件的路径
		 * 		|-上传成功 返回 文件链接
		 * */
		uploadFilePromise(newFilePath) {
			return new Promise((resolve, reject) => {
				uni.uploadFile({
					url: get_baseUrl() + '/system/file/upload/oss',
					name: 'file',
					filePath: newFilePath,
					header: getHeader(),
					success: res => {
						const respon = JSON.parse(res.data);
						// console.log('结果---解析', respon);

						if (respon.code == 200) {
							resolve(respon.data.url);
						} else if (respon.code == 500) {
							// imgTip('图片疑似包含内容违规')
							errTip('内容安全风控提醒', '图片疑似包含内容违规，请核查无误后再提交');
							reject();
						}
					},
					fail: () => {
						// 接口挂了就直接不给过
						imgTip('服务器异常，无法上传图片')
						reject();
					}
				});
			});
		}



	}
}

/* 内容敏感提醒 */
function errTip(tit = '提示', msg = '一个消息提示') {
	uni.showModal({
		title: tit,
		content: msg,
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
