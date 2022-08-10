module.exports = {
    getToken: function () {
        return uni.getStorageSync('accountToken');
    },
    setToken: function (e) {
        uni.setStorage({
            key: 'accountToken',
            data: e
        });
    },
    getOpenId: function () {
        return uni.getStorageSync('openId');
    },
    setOpenId: function (e) {
        uni.setStorage({
            key: 'openId',
            data: e
        });
    },
    getUnionId: function () {
        return uni.getStorageSync('openId');
    },
    setUnionId: function (e) {
        uni.setStorage({
            key: 'unionId',
            data: e
        });
    },
    getImage: function () {
        return uni.getStorageSync('HeadImage');
    },
    setImage: function (e) {
        uni.setStorage({
            key: 'HeadImage',
            data: e
        });
    },
    getName: function () {
        return uni.getStorageSync('NickName');
    },
    setName: function (e) {
        uni.setStorage({
            key: 'NickName',
            data: e
        });
    }
};
