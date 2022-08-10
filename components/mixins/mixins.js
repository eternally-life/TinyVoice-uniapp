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
		},
        setData: function (obj, callback) {
            let that = this
            const handleData = (tepData, tepKey, afterKey) => {
                var tepData2 = tepData
                tepKey = tepKey.split('.')
                tepKey.forEach(item => {
                    if (tepData[item] === null || tepData[item] === undefined) {
                        let reg = /^[0-9]+$/
                        tepData[item] = reg.test(afterKey) ? [] : {}
                        tepData2 = tepData[item]
                    } else {
                        tepData2 = tepData[item]
                    }
                })
                return tepData2
            }
            const isFn = function (value) {
                return typeof value == 'function' || false
            }
            Object.keys(obj).forEach(function (key) {
                let val = obj[key]
                key = key.replace(/\]/g, '').replace(/\[/g, '.')
                let front, after
                let index_after = key.lastIndexOf('.')
                if (index_after != -1) {
                    after = key.slice(index_after + 1)
                    front = handleData(that, key.slice(0, index_after), after)
                } else {
                    after = key
                    front = that
                }
                if (front.$data && front.$data[after] === undefined) {
                    Object.defineProperty(front, after, {
                        get () {
                            return front.$data[after]
                        },
                        set (newValue) {
                            front.$data[after] = newValue
                            that.hasOwnProperty("$forceUpdate") && that.$forceUpdate()
                        },
                        enumerable: true,
                        configurable: true
                    })
                    front[after] = val
                } else {
                    that.$set(front, after, val)
                }
            })
            // this.$forceUpdate();
            isFn(callback) && this.$nextTick(callback)
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
