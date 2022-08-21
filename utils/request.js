
// const BASE_URL = 'https://tiny-voice.glowxq.com/prod-api'  // 生产 api
// const BASE_URL = 'https://tinyvoice.glowxq.com/prod-api'  // 生产 api
// const BASE_URL = 'https://tinyvoice.glowxq.com:10000' 
// const BASE_URL = 'http://127.0.0.1:8080' 
const BASE_URL = 'http://106.52.58.11:12574' // 开发api
// const BASE_URL = 'https://tinyvoice.glowxq.com/prod-api'  // 微音生产 api

const loginUtil = require('./loginUtil.js')

export function request({
	url,
	method,
	params,
	data,
	token,
	flag = true
}) {

	uni.showLoading({
		title: '加载中'
	})

	return new Promise(function(resolve, reject) {
		uni.request({
			url: BASE_URL + url + urlencode(params),
			data,
			method,
			header: getHeader(),
			success: (res) => {
				if (res.statusCode === 200) {
					flag && loginUtil.loginStatus(res.data.code)
					resolve(res)
				}
			},
			fail: (err) => {
				console.error(url + "请求失败")
				reject(err)
			},
			complete: () => {
				uni.hideLoading()
			}
		})
	})
}

export function requestFile({
	url,
	method,
	params,
	file,
	data,
	token,
	flag = true
}) {
	uni.showLoading({
		title: '加载中'
	})
	console.log(file);
	console.log("++++++++++++++++++++++++++");
	return new Promise(function(resolve, reject) {
		uni.uploadFile({
			url: BASE_URL + url + urlencode(params),
			filePath: file,
			name: 'file',
			header: getFileHeader(),
			success: (res) => {
				if (res.statusCode === 200) {
					flag && loginUtil.loginStatus(res.data.code)
					resolve(res)
				}
			},
			complete: () => {
				uni.hideLoading()
			}
		})
	})
}


export function getHeader() {
	// 从全局变量拿token
	var token = getApp().globalData.token
	// 全局变量没有token,则去缓存拿
	if (token === null || token === '' || token === undefined) {
		token = uni.getStorageSync("token")
	}
	let Authorization = {
		Authorization: token
	}
	return Authorization;
}

export function getFileHeader() {
	// 从全局变量拿token
	var token = getApp().globalData.token
	// 全局变量没有token,则去缓存拿
	if (token === null || token === '' || token === undefined) {
		token = uni.getStorageSync("token")
	}
	let header = {
		Authorization: token
	}
	return header;
}

function urlencode(data, isPrefix = true) {
	isPrefix = isPrefix ? isPrefix : false
	let prefix = isPrefix ? '?' : ''
	let _result = []
	for (let key in data) {
		let value = data[key]
		// 去掉为空的参数
		if (['', undefined, null].includes(value)) {
			continue
		}
		if (value.constructor === Array) {
			value.forEach(_value => {
				_result.push(encodeURIComponent(key) + '[]=' + encodeURIComponent(_value))
			})
		} else {
			_result.push(encodeURIComponent(key) + '=' + encodeURIComponent(value))
		}
	}

	return _result.length ? prefix + _result.join('&') : ''
}

export function get_baseUrl() {
	return BASE_URL
}
