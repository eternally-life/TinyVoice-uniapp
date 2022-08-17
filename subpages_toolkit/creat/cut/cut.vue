<template>
    <view>
        <button @tap="chooseImage" class="button" hoverClass="button-hover">选择图片</button>
        <!-- parse <template is="ad" data></template> -->
        <block name="ad">
            <view></view>
        </block>
        <image class="image" v-if="!(isChoose == true ? false : true)" :src="img" :style="'width:' + showInfo.width + 'px;height:' + showInfo.height + 'px'"></image>
        <view class="choose" v-if="!(isChoose == true ? false : true)" :style="'width:' + showInfo.width + 'px;height:' + showInfo.height + 'px'">
            <view
                @tap="previewImage"
                :class="'choose-module ' + (index % 2 == 0 ? 'choose-module-odd' : '')"
                :data-index="index"
                :style="'width:' + showInfo.width / 3 + 'px;height:' + showInfo.height / 3 + 'px;line-height:' + showInfo.height / 3 + 'px;'"
                v-for="(item, index) in [0, 1, 2, 3, 4, 5, 6, 7, 8]"
                :key="index"
            >
                {{ index + 1 }}
            </view>
        </view>
        <canvas
            :canvasId="canvasInfo.id"
            class="canvas"
            :style="'width:' + canvasInfo.width + 'px;height:' + canvasInfo.height + 'px;position:absolute;top:' + (showInfo.height + systemInfo.height) + 'px;left:0;'"
        ></canvas>
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
            canvasInfo: {
                id: 'mycanvas',
                width: 320,
                height: 568
            },
            showInfo: {
                width: 320,
                height: 568
            },
            systemInfo: {
                width: 320,
                height: 568
            },
            img: '',
            isChoose: false
        };
    },
    onLoad: function (t) {
        var that = this;
        uni.getSystemInfo({
            success: function (t) {
                that.setData({
                    'systemInfo.width': t.windowWidth,
                    'systemInfo.height': t.windowHeight
                });
            }
        });
    },
    onShareAppMessage: function () {
        var t = require('../../../7FF9148756B80DDF199F7C80BAACE943.js');

        return {
            title: t.title,
            path: '/pages/index/index',
            imageUrl: t.url
        };
    },
    methods: {
        imageToCanvas: function (t) {
            var that = this;
            var i = that.canvasInfo;
            var s = uni.createCanvasContext(i.id, that);
            s.drawImage(t, 0, 0, i.width, i.height);
            s.draw();
        },

        cutImage: function (t) {
            var that = this;
            uni.getImageInfo({
                src: t,
                success: function (i) {
                    var s = i.width;
                    var a = i.height;
                    uni.getSystemInfo({
                        success: function (i) {
                            that.setData({
                                'systemInfo.width': i.windowWidth,
                                'systemInfo.height': i.windowHeight,
                                'canvasInfo.width': s,
                                'canvasInfo.height': a,
                                'showInfo.width': i.windowWidth,
                                'showInfo.height': (i.windowWidth / s) * a
                            });
                            that.imageToCanvas(t);
                        }
                    });
                }
            });
        },

        previewImage: function (t) {
            var that = this;
            var i = that.canvasInfo;
            var s = t.currentTarget.dataset.index;
            uni.canvasToTempFilePath(
                {
                    canvasId: i.id,
                    x: ((s % 3) * i.width) / 3,
                    y: (parseInt(s / 3) * i.height) / 3,
                    width: i.width / 3,
                    height: i.height / 3,
                    success: function (t) {
                        console.log('成功路径： ' + t.tempFilePath);
                        var e = [];
                        e.push(t.tempFilePath);
                        uni.previewImage({
                            urls: e
                        });
                    }
                },
                that
            );
        },

        chooseImage: function (t) {
            var that = this;
            uni.chooseImage({
                count: 1,
                sizeType: ['compressed'],
                success: function (t) {
                    that.setData({
                        img: t.tempFilePaths[0],
                        isChoose: true
                    });
                    that.cutImage(t.tempFilePaths[0]);
                    uni.showToast({
                        title: '点击长按即可保存',
                        icon: 'none'
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
    background-color: #ffffff;
    width: 100%;
    height: 100%；;
}

.image {
    display: block;
    box-sizing: border-box;
    overflow: hidden;
    position: absolute;
    top: 140rpx;
    left: 0;
    z-index: 99;
}

.choose {
    display: block;
    box-sizing: border-box;
    overflow: hidden;
    position: absolute;
    top: 140rpx;
    left: 0;
    z-index: 100;
}

.choose-module {
    box-sizing: border-box;
    overflow: hidden;
    float: left;
    background-color: rgba(0, 0, 0, 0.5);
    border: 1rpx dashed #ffffff;
    text-align: center;
    color: #ffffff;
    font-size: 40rpx;
}

.choose-module-oddc {
    background-color: rgba(251, 114, 160, 0.8);
}

.canvas {
    z-index: 1;
    display: block;
    box-sizing: border-box;
    overflow: hidden;
    opacity: 0;
}

.button {
    appearance: none;
    box-sizing: border-box;
    width: 700rpx;
    font-size: 30rpx;
    margin: 20rpx 25rpx;
    background-color: #000000;
    border-radius: 4rpx;
    text-align: center;
    height: 100rpx;
    line-height: 100rpx;
    color: #ffffff;
    border: none;
}

.button::after {
    border: none;
}

.button-hover {
    background-color: #000000;
    color: #ffffff;
}
</style>
