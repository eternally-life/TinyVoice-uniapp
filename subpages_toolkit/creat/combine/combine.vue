<template>
    <view class="images">
        <view
            @tap="changePreview"
            class="preview-image"
            :data-src="item.url"
            :style="'background-image:url(' + item.url + ');background-repeat:no-repeat;background-size:100% auto;'"
            v-for="(item, index) in imageInfo"
            :key="index"
        >
            <view @tap.stop.prevent="removeImage" class="remove" :data-index="index">移除{{ index + 1 }}</view>
        </view>
        <view @tap="previewImage" class="select-image" hoverClass="select-image-hover">选择图片</view>
        <view class="bottom-tab">
            <view @tap="goToPage" class="tabBtn" data-direction="horizontal">横向拼接</view>
            <view @tap="goToPage" class="tabBtn" data-direction="vertical">竖向拼接</view>
        </view>
    </view>
</template>

<script>
import cuCustom from '@/colorui/components/cu-custom';
export default {
    components: {
        cuCustom
    },
    data() {
        return {
            imageInfo: [],
            imageUrls: []
        };
    },
    onReady: function () {},
    onShareAppMessage: function () {
        var e = require('../../../7FF9148756B80DDF199F7C80BAACE943.js');

        return {
            title: e.title,
            path: '/subpages_toolkit/index/index',
            imageUrl: e.url
        };
    },
    methods: {
        previewImage: function (e) {
            var that = this;
            uni.chooseImage({
                count: 9,
                success: function (e) {
                    for (var t = 0; t < e.tempFilePaths.length; t++) {
                        that.getImageInfo(e.tempFilePaths[t]);
                    }
                }
            });
        },

        getImageInfo: function (e) {
            var that = this;
            uni.getImageInfo({
                src: e,
                success: function (t) {
                    var i = that.imageInfo;
                    var n = that.imageUrls;
                    var r = new Object();
                    r.url = e;
                    r.width = t.width;
                    r.height = t.height;
                    i.push(r);
                    n.push(e);
                    that.setData({
                        imageInfo: i,
                        imageUrls: n
                    });
                }
            });
        },

        changePreview: function (e) {
            var that = this;
            uni.previewImage({
                current: e.currentTarget.dataset.src,
                urls: that.imageUrls
            });
        },

        removeImage: function (e) {
            var that = this;
            var t = that.imageInfo;
            var i = that.imageUrls;
            var n = e.currentTarget.dataset.index;
            t.splice(n, 1);
            i.splice(n, 1);
            that.setData({
                imageInfo: t,
                imageUrls: i
            });
        },

        goToPage: function (e) {
            var that = this;
            var t = e.currentTarget.dataset.direction;
            if (void 0 == that.imageInfo[1]) {
                uni.showToast({
                    title: '请至少选择两张图！',
                    icon: 'none'
                });
            } else {
                uni.navigateTo({
                    url: './show?imageInfo=' + JSON.stringify(that.imageInfo) + '&direction=' + t
                });
            }
        }
    }
};
</script>
<style>
page {
    padding: 0;
    margin: 0;
    font-size: 30rpx;
    color: #757575;
    background-color: #eeeeee;
}

.preview-image,
.select-image {
    display: block;
    box-sizing: border-box;
    width: 210rpx;
    height: 370rpx;
    overflow: hidden;
    margin-top: 30rpx;
    margin-left: 30rpx;
    box-shadow: 0rpx 0rpx 20rpx rgba(0, 0, 0, 0.2);
    float: left;
    position: relative;
}

.select-image {
    background-color: #000000;
    color: #ffffff;
    text-align: center;
    line-height: 370rpx;
}

.remove {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 24rpx;
    width: 80rpx;
    height: 40rpx;
    line-height: 40rpx;
    overflow: hidden;
    box-sizing: border-box;
    background-color: #000000;
    color: #ffffff;
    text-align: center;
    box-shadow: -4rpx 4rpx 10rpx rgba(0, 0, 0, 0.2);
}

.bottom-tab {
    position: fixed;
    z-index: 99;
    bottom: 0;
    left: 0;
    font-size: 30rpx;
    width: 750rpx;
    overflow: hidden;
    box-sizing: border-box;
    color: #ffffff;
    text-align: center;
    box-shadow: 0rpx -4rpx 10rpx rgba(0, 0, 0, 0.2);
}

.tabBtn {
    width: 375rpx;
    height: 100rpx;
    line-height: 100rpx;
    text-align: center;
    float: left;
}

.tabBtn:nth-child(1) {
    background-color: #242424;
}

.tabBtn:nth-child(2) {
    background-color: #000000;
}

.tabBtn:active,
.select-image-hover {
    background-color: #000000;
}
</style>
