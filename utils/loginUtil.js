import {
	authLoginregisterVerificationCodeLogin_Post,
	authLoginregisterVerificationCode_Get,
	authLoginregisterWxLogin_Post
} from '@/api/SYSTEM/登录注册.js'
import {
	systemParamsNoteList_Get,
	systemParamsConfList_Get
} from '@/api/SYSTEM/参数字典公告.js'
import {
	systemTinyuserGetInfo_Get
} from '@/api/SYSTEM/用户信息.js'

// 检查登录状态 
export function loginStatus(code) {
	let loginNum = getApp().globalData.loginNum
	// 限制重新登录的次数
	if (loginNum >= 1) {
		return
	}
	// console.log(loginNum)
	if (code == 401) {
		setGloalDataLoginNum()
		let loginNum = getApp().globalData.loginNum
		console.log("=======" + loginNum)
		getApp().globalData.wxUserInfo = null;
		uni.removeStorageSync('wxUserInfo');
		uni.showModal({
			title: '登录已经过期,是否重新登录',
			success: (res) => {
				// #ifdef MP-WEIXIN		
				res.confirm && wxLogin()
				// #endif
				// #ifdef MP-QQ
				res.confirm && qqLogin()
				// #endif
			},
			fail: () => {

			},
			complete: () => {
				setTimeout(() => {
					resetGloalDataLoginNum()
				}, 3000);

			}
		})
	}

}
// QQ登录方法
export function qqLogin() {
	setGloalDataLoginNum()
	uni.login({
		success: async (res) => {
			console.log(res);
			const reslut = await authTokenauthCommonLogin_Post({
				loginType: 3,
				qqCode: res.code
			})
			console.log(reslut);
			if (reslut.data.code === 8081) {
				uni.navigateTo({
					url: '/subpages/login/login',
					success: () => {
						uni.showToast({
							title: '请先账号登录qq绑定',
							icon: 'none'
						})
					}
				})
				return
			}
			if (reslut.data.code === 200) {
				setGloalDataUserInfo()
				setGloalDataToken(reslut.data.data.access_token)
				showToastLogin('登录成功')
				uni.$emit('refresh')
				setPamesList()
				setNoticeList()
				return
			}
			if (reslut.data.code === 500) {
				return this.selfMsg('账号不存在，请先注册', 'warning')
			}
			uni.hideLoading()
		},
		fail: (err) => {
			uni.hideLoading()
			console.log(err, "登录失败");
		}
	})
}

// wx登录方法
export function wxLogin() {
	setGloalDataLoginNum()
	uni.login({
		success: async (res) => {
			provider: 'weixin'
			// TODO 登录逻辑 - 更新token
			const reslut = await authLoginregisterWxLogin_Post({
				wxCode: res.code
			})
			// 存储全局 token
			if (reslut.data.code === 200) {
				setGloalDataUserInfo()
				setGloalDataToken(reslut.data.data.access_token)
				showToastLogin('登录成功')
				uni.$emit('refresh')
				setPamesList()
				setNoticeList()
				return
			}
			if (reslut.data.code === 5555) {
				uni.navigateTo({
					url: '/subpages/login/login?num=1',
					success: () => {
						uni.showToast({
							title: '手机号未绑定，绑定即可微信登录',
							icon: 'none'
						})
					}
				})
				return
			}
			uni.navigateTo({
				url: '/subpages/login/login',
				success: () => {
					uni.showToast({
						title: '还未注册，请先注册',
						icon: 'none'
					})
				}
			})
			return
		},
		fail: (err) => {
			showToastLogin('登录失败')
		},
		complete: () => {}
	})
}


// 重试次数
export function setGloalDataLoginNum() {
	getApp().globalData.loginNum = getApp().globalData.loginNum + 1
}

// 重试次数
export function resetGloalDataLoginNum() {
	getApp().globalData.loginNum = 0
}



// 存储全局token
export function setGloalDataToken(token) {
	getApp().globalData.token = token
	uni.setStorageSync('token', token)
}


// 存储全局用户信息(请求接口)
export function setGloalDataUserInfo() {
	systemTinyuserGetInfo_Get().then(res => {
		if (res.data.code === 200) {
			getApp().globalData.wxUserInfo = res.data.user
			uni.setStorageSync('wxUserInfo', res.data.user)
			setGloalDataEduInfo(res.data.guet);
		}
	})
}

// 存储全局用户教务信息(接口、静态均可)
export function setGloalDataEduInfo(eduInfo) {
	getApp().globalData.eduInfo = eduInfo
	uni.setStorageSync(getApp().globalData.storageKey.eduInfo, eduInfo)
}


// 修改全局用户信息(静态修改)
export function setGloalDataUserInfo_static(para) {
	getApp().globalData.wxUserInfo = para
	uni.setStorageSync('wxUserInfo', para);
}

// 存储缓存公告信息
export function setNoticeList() {
	systemParamsNoteList_Get().then(res => {
		if (res.data.code === 200) {
			uni.setStorageSync("noticeList", res.data.rows)
		}
	})
}

// 存储缓存参数信息
export function setPamesList() {
	systemParamsConfList_Get().then(res => {
		if (res.data.code === 200) {
			uni.setStorageSync("pamesList", res.data.rows)
		}
	})
}

// 登录专用 轻提示
function showToastLogin(msg) {
	uni.showToast({
		title: msg
	})
}

// 登录专用 显示加载提示
function showLoadingLogin(msg) {
	uni.showLoading({
		title: msg,
	})
}

// 登录专用 关闭加载提示
function hideLoadingLogin() {
	uni.hideLoading()
}
