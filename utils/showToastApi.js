// 封装uni.showToast()成功函数
export const ShowToastSuc = (msg) => {
  uni.showToast({
    title: msg
  })
}
// 封装uni.showToast()失败函数
export const ShowToastErr = (msg) => {
  uni.showToast({
    title: msg,
    icon: 'error'
  })
}

// 封装uni.showToast() 无图标函数
export const ShowToastNone = (msg) => {
  uni.showToast({
    title: msg,
    icon: 'none'
  })
}

