<template>
    <view>
        <view v-if="!hidden" style="opacity: 0">
            <canvas canvasId="draw" :style="'width:' + canvasWidth + 'px;height:' + canvasHeight + 'px'"></canvas>
        </view>
        <view class="tips">小提示：点击图片可预览，点完长按可保存</view>
        <view class="image-box" :style="'height:' + showImage.height + 'px;'">
            <image @tap="previewImage" class="image" :src="showImage.url" :style="'width:' + showImage.width + 'px;height:' + showImage.height + 'px'"></image>
        </view>
        <!-- parse <template is="ad" data></template> -->
        <block name="ad">
            <view></view>
        </block>
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
            direction: 'vertical',
            canvasWidth: 0,
            canvasHeight: 0,
            systemHeight: 0,
            systemWidth: 0,
            showImage: {
                url: '',
                width: 0,
                height: 0
            },
            hidden: false
        };
    },
    onLoad: function (t) {
        var that = this;
        that.setData({
            imageInfo: JSON.parse(t.imageInfo),
            direction: t.direction
        });
        uni.getSystemInfo({
            success: function (t) {
                that.setData({
                    systemWidth: t.windowWidth,
                    systemHeight: t.windowHeight
                });
            }
        });
        console.log(that.imageInfo);
        uni.showLoading({
            title: '正在合并',
            mask: true
        });
        that.connectImage();
    },
    onShareAppMessage: function () {
        var t = require('../../../7FF9148756B80DDF199F7C80BAACE943.js');

        return {
            title: t.title,
            path: '/subpages_toolkit/index/index',
            imageUrl: t.url
        };
    },
    methods: {
        connectImage: function () {
            var that = this;
            var e = uni.createCanvasContext('draw', that);
            var a = 0;
            var i = 0;
            var h = that.imageInfo;
            if ('vertical' == that.direction) {
                a = that.systemWidth;

                for (var s = 0, n = 0; s < h.length; s++) {
                    i += n = (h[s].height * a) / h[s].width;
                }

                that.setData({
                    canvasWidth: a,
                    canvasHeight: i
                });

                for (var s = 0, n = 0, o = 0; s < h.length; s++) {
                    n = (h[s].height * a) / h[s].width;

                    if (s > 0) {
                        o += (h[s - 1].height * a) / h[s - 1].width;
                    }

                    e.drawImage(h[s].url, 0, o, a, n);
                }
            } else {
                i = that.systemHeight;

                for (var s = 0, d = 0; s < h.length; s++) {
                    a += d = (h[s].width * i) / h[s].height;
                }

                that.setData({
                    canvasWidth: a,
                    canvasHeight: i
                });

                for (var s = 0, d = 0, g = 0; s < h.length; s++) {
                    d = (h[s].width * i) / h[s].height;

                    if (s > 0) {
                        g += (h[s - 1].width * i) / h[s - 1].height;
                    }

                    e.drawImage(h[s].url, g, 0, d, i);
                }
            }

            e.draw();
            setTimeout(function (e) {
                uni.canvasToTempFilePath(
                    {
                        canvasId: 'draw',
                        success: function (e) {
                            console.log(e.tempFilePath);
                            that.setData({
                                'showImage.url': e.tempFilePath,
                                hidden: true
                            });
                            that.setShowImage(e.tempFilePath);
                            uni.hideLoading();
                        }
                    },
                    that
                );
            }, 500);
        },

        previewImage: function (t) {
            var that = this;
            var a = [];
            a.push(that.showImage.url);
            uni.previewImage({
                current: a[0],
                urls: a
            });
        },

        setShowImage: function (t) {
            var that = this;
            var a = that.direction;
            var i = 0;
            var h = 0;
            uni.getSystemInfo({
                success: function (s) {
                    uni.getImageInfo({
                        src: t,
                        success: function (t) {
                            if ('vertical' == a) {
                                n = 0.93;
                                i = s.windowWidth * n;
                                h = (s.windowWidth / t.width) * t.height * n;
                            } else {
                                var n = 0.5;
                                h = s.windowHeight * n;
                                i = (s.windowHeight / t.height) * t.width * n;
                            }

                            that.setData({
                                'showImage.width': i,
                                'showImage.height': h
                            });
                        }
                    });
                }
            });
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
    width: 100%;
    height: 100%；;
}

.tips {
    box-sizing: border-box;
    width: 700rpx;
    margin: 25rpx;
    border-radius: 4rpx;
    background-color: #000000;
    color: #ffffff;
    min-height: 100rpx;
    line-height: 100rpx;
    font-size: 30rpx;
    padding-left: 30rpx;
    box-shadow: 0rpx 0rpx 20rpx rgba(0, 0, 0, 0.2);
}

.image-box {
    width: 700rpx;
    margin: 25rpx;
    border-radius: 4rpx;
    overflow-x: scroll;
    overflow-y: hidden;
    box-shadow: 0rpx 0rpx 20rpx rgba(0, 0, 0, 0.2);
}

.image {
    display: block;
    margin: 0 auto;
}
</style>
