<template>
    <view>
        <view class="topview">效果显示区域</view>
        <view class="canvasBox">
            <canvas canvasId="myCanvas" class="myCanvas" :style="'background:' + fontInfo.background.color" v-if="!isShowMask"></canvas>
        </view>
        <view class="selectSection">
            <text class="textmag">输入内容：</text>
            <input @input="textInput" class="input-content" maxlength="9" placeholder="请输入要生成的内容" :value="content" v-if="!isShowMask || !isShowSave" />
        </view>
        <view class="selectSection">
            <text class="textmag">字体大小：</text>
            <radio-group @change="radioChange" class="radio-group">
                <label class="radio" v-for="(item, index) in fontSize" :key="item.i">
                    <icon :class="'radioIcon ' + (item.checked ? 'actIcon' : '')"></icon>

                    <radio :checked="item.checked" :value="item.name"></radio>

                    {{ item.value }}
                </label>
            </radio-group>
        </view>
        <view class="selectSection">
            <text class="textmag">背景颜色：</text>
            <view @tap="showMask" class="selectBox" :data-isback="true">
                <text>{{ fontInfo.background.title }}</text>
                <icon class="xlIcon"></icon>
            </view>
        </view>
        <view @tap="showMask" class="selectSection" :data-isback="false">
            <text class="textmag">字体颜色：</text>
            <view class="selectBox">
                <text>{{ fontInfo.fontColor.title }}</text>
                <icon class="xlIcon"></icon>
            </view>
        </view>
        <button @tap="transformImg" class="make">一键转换</button>
        <view class="btnview">
            <button @tap="downimg" class="backbtn" v-if="ldata">保存到相册</button>
            <button class="backbtn" openType="share" style="background-color: #39b54a">分享好友</button>
            <button @opensetting="handler" class="backbtn" openType="openSetting" v-if="!ldata">授权</button>
        </view>
        <view class="ad">
            <!-- parse <template is="ad" data></template> -->
            <block name="ad">
                <view></view>
            </block>
        </view>
        <view class="colorMask" v-if="isShowMask">
            <view class="maskBox">
                <view
                    @tap="changeColor"
                    class="maskTxt"
                    :data-colortype="isBack ? 'bColors' : 'fontColors'"
                    :data-index="index"
                    v-for="(item, index) in isBack ? bColors : fontColors"
                    :key="index"
                >
                    <text>{{ item.title }}</text>

                    <icon :class="'maskIcon ' + (item.checked ? 'maskActIcon' : '')"></icon>
                </view>
            </view>
        </view>
        <ad unit-id="22c2addba13230a261797b944ad900b0"></ad>
    </view>
</template>

<script>
import cuCustom from '@/colorui/components/cu-custom';
var t = uni.createCanvasContext('myCanvas');
export default {
    components: {
        cuCustom
    },
    data() {
        return {
            ldata: true,
            fontSize: [
                {
                    name: 'equal',
                    value: '同等'
                },
                {
                    name: 'gradually',
                    value: '渐大',
                    checked: 'true'
                }
            ],
            canvasImg: '',
            isShowMask: false,
            isBack: false,
            isShowSave: false,
            bColors: [
                {
                    color: 'black',
                    title: '黑色'
                },
                {
                    color: 'red',
                    title: '红色'
                },
                {
                    color: 'yellow',
                    title: '黄色'
                },
                {
                    color: 'blue',
                    title: '蓝色'
                },
                {
                    color: 'green',
                    title: '绿色'
                },
                {
                    color: 'white',
                    title: '白色',
                    checked: true
                }
            ],
            fontColors: [
                {
                    color: 'black',
                    title: '黑色',
                    checked: true
                },
                {
                    color: 'red',
                    title: '红色'
                },
                {
                    color: 'yellow',
                    title: '黄色'
                },
                {
                    color: 'blue',
                    title: '蓝色'
                },
                {
                    color: 'green',
                    title: '绿色'
                },
                {
                    color: 'white',
                    title: '白色'
                }
            ],
            fontInfo: {
                fontSize: 'gradually',
                background: {
                    color: 'white',
                    title: '白色'
                },
                fontColor: {
                    color: 'black',
                    title: '黑色'
                }
            },
            content: ''
        };
    },
    onLoad: function (t) {
        var e = 1;
        this.rnd(2, 10, function (t) {
            e = t;
        });
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
        radioChange: function (t) {
            for (var e = t.detail.value, o = this.fontSize, a = 0, n = o.length; a < n; a++) {
                if (o[a].name == e) {
                    o[a].checked = true;
                    var i = o[a].name;
                } else {
                    o[a].checked = false;
                }
            }

            this.setData({
                fontSize: o,
                'fontInfo.fontSize': i
            });
        },

        showMask: function (t) {
            var e = 'true' == t.currentTarget.dataset.isback;
            var o = this.isShowMask;
            this.setData({
                isShowMask: !o,
                isBack: e
            });
        },

        changeColor: function (t) {
            for (
                var e = t.currentTarget.dataset.colortype,
                    o = t.currentTarget.dataset.index,
                    a = this.isShowMask,
                    n = 'bColors' == e ? this.bColors : this.fontColors,
                    i = 0,
                    s = n.length;
                i < s;
                i++
            ) {
                n[i].checked = i == o;
            }

            if ('bColors' == e) {
                this.setData({
                    bColors: n,
                    isShowMask: !a,
                    'fontInfo.background': n[o]
                });
                this.transformImg();
            } else {
                this.setData({
                    fontColors: n,
                    isShowMask: !a,
                    'fontInfo.fontColor': n[o]
                });
                this.transformImg();
            }
        },

        textInput: function (t) {
            var e = t.detail.value;
            this.setData({
                content: e
            });
        },

        transformImg: function (t) {
            var e = this.content;

            if ('' != e) {
                console.log(e);

                for (var o = [], a = 0, n = e.length; a < n; a++) {
                    o.push(e.charAt(a));
                }

                this.drawImg(o);
            } else {
                uni.showToast({
                    title: '请输入内容'
                });
            }
        },

        drawImg: function (e) {
            var o = this.fontInfo;
            var a = o.fontSize;
            t.clearRect(0, 0, 525, 290);
            t.setFillStyle(o.background.color);
            t.fillRect(0, 0, 525, 290);
            t.draw();
            t.setTextAlign('left');
            t.setTextBaseline('top');
            t.setFillStyle(o.fontColor.color);
            if ('gradually' == a)
                for (var n = 0, i = e.length; n < i; n++) {
                    s = n * (2 * n + 18);
                    t.setFontSize(4 * n + 18);
                    t.fillText(e[n], s, 29.5);
                    t.fillText(e[n], s - 0.5, 30);
                }
            else if ('equal' == a) {
                for (var n = 0, i = e.length; n < i; n++) {
                    var s = 37 * n;
                    t.setFontSize(37);
                    t.fillText(e[n], s, 45);
                }
            }
            t.draw(true);
            var that = this;
            setTimeout(function () {
                that.saveImg();
            }, 200);
        },

        saveImg: function () {
            var that = this;
            uni.canvasToTempFilePath({
                x: 0,
                y: 0,
                canvasId: 'myCanvas',
                success: function (e) {
                    that.setData({
                        canvasImg: e.tempFilePath
                    });
                }
            });
        },

        downimg: function () {
            if ('' != this.content) {
                var that = this;
                uni.getSetting({
                    success: function (e) {
                        console.log(e);

                        if (e.authSetting['scope.writePhotosAlbum']) {
                            that.saveToPhone();
                        } else {
                            uni.authorize({
                                scope: 'scope.writePhotosAlbum',
                                success: function () {
                                    that.saveToPhone();
                                },
                                fail: function (e) {
                                    that.setData({
                                        ldata: false
                                    });
                                }
                            });
                        }
                    }
                });
            } else {
                uni.showToast({
                    title: '请输入内容'
                });
            }
        },

        saveToPhone: function (t) {
            uni.showLoading({
                title: '正在保存...'
            });
            var e = this.canvasImg;
            uni.saveImageToPhotosAlbum({
                filePath: e,
                success: function (t) {
                    uni.hideLoading();
                    uni.showToast({
                        title: '保存成功'
                    });
                }
            });
        },

        clearContent: function () {
            this.setData({
                content: ''
            });
        },

        shoucang: function () {},

        hotJumpPageID: function (t) {
            console.log(t);
            var e = t.detail.formId;

            if ('' != t.detail.formId) {
                a.formAdd(e, function (t) {});
            }
        },

        rnd: function (t, e, o) {
            var a = Math.floor(Math.random() * (e - t + 1) + t);
            o(a);
            return a;
        },

        back: function () {
            if (getCurrentPages().length > 1) {
                uni.navigateBack({});
            } else {
                uni.reLaunch({
                    url: '/subpages_toolkit/index/index'
                });
            }
        },

        handler: function (t) {
            var that = this;

            if (t.detail.authSetting['scope.writePhotosAlbum']) {
                that.setData({
                    ldata: true
                });
            } else {
                that.setData({
                    ldata: false
                });
            }
        }
    }
};
</script>
<style>
page {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f8f6f6;
}

.topview {
    margin-top: 20rpx;
    font-size: 30rpx;
}

.canvasBox {
    margin-top: 10rpx;
    width: 90%;
    height: 290rpx;
    box-sizing: border-box;
}

.canvasBox image {
    width: 100%;
    height: 100%;
    background: #fff;
    margin-bottom: 20rpx;
}

.myCanvas {
    background: #fff;
    width: 100%;
    height: 260rpx;
}

.selectSection {
    display: flex;
    font-size: 30rpx;
    margin-bottom: 20rpx;
    width: 85%;
    margin-top: 15rpx;
}

.textmag {
    margin-right: 20rpx;
    height: 60rpx;
    line-height: 60rpx;
    min-width: 150rpx;
}

radio-group {
    height: 60rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.radio radio {
    display: none;
}

.radio {
    margin-right: 100rpx;
    display: inline-flex;
    align-items: center;
}

.radioIcon {
    display: inline-block;
    width: 36rpx;
    height: 36rpx;
    background: #fff;
    border: 1px solid #9d9d9d;
    border-radius: 50%;
    margin-right: 10rpx;
}

.actIcon {
    background: #fff
        url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAkElEQVRYhe2UwQ3CMBAEr4SURCfsa2+flEQHuAPoADoKDwiKECIW4hQp2pH8nvHZughjjDE/IAkkr5k5ZuZI8kRyXy4GMMzFH84ZwFAWkJm3L/LXNErkJA9L8ulI2v09oOf2sykcKwK65M+AyyYD1n2C1T9hRPcUWok84rGIFiJa6SKakIS3kCYJ5WJjjNkkdwPeA4LdMnoPAAAAAElFTkSuQmCC)
        center center no-repeat;
    background-size: 24rpx;
}

.selectBox {
    border: 1px solid #9d9d9d;
    background: #fff;
    font-size: 26rpx;
    width: 450rpx;
    height: 60rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 11rpx;
    border-radius: 10rpx;
}

.xlIcon {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAwklEQVRYhe2SvQnDMBBGH5nAXSbRANnGpcuUGkkTeJW0niFgksIS2KBLrL8LBD24+h28DzqdDoyA/dGNADdgBV7Kt3o3+G+0H7DsuACzonz2zgNXYFGQL94VpfUeDt0lbMMH7Dc5tNuDI9JdovYeHsBwVh6otYcnYFLlAVvhgSlXDuV7cCXyQO4esrpLpO6hqLvEPeGBou6fcCfkVbpLDGxtVbpLGLbGKt0lpsgDzbpL7PfQtLtE2INKdwmDYvfOf/IG6XNSyDxVchEAAAAASUVORK5CYII\x3d)
        center center no-repeat;
    background-size: 100%;
    display: inline-block;
    width: 20rpx;
    height: 20rpx;
}

.make {
    background-color: #000;
    color: #fff;
    height: 70rpx;
    width: 600rpx;
    font-size: 30rpx;
    line-height: 70rpx;
    margin-top: 10rpx;
}

.btnview {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 640rpx;
}

.backbtn {
    margin-top: 20rpx;
    font-size: 30rpx;
    line-height: 70rpx;
    height: 70rpx;
    width: 280rpx;
    background-color: #000;
    color: #fff;
}

.ad {
    width: 85%;
    margin-top: 30rpx;
}

.colorMask {
    position: fixed;
    z-index: 999;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
}

.maskBox {
    width: 620rpx;
    position: absolute;
    left: 50%;
    top: 50%;
    border-radius: 8rpx;
    background: #fff;
    transform: translateX(-50%) translateY(-50%);
}

.maskBox button {
    border-bottom: 1px solid #dedede;
    height: 100rpx;
    line-height: 100rpx;
    text-align: left;
    font-size: 30rpx;
    border-radius: 0;
}

.maskBox button::after {
    border: none;
}

.maskTxt {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 130rpx;
    border-bottom: 1px solid #d9d9d9;
    font-size: 32rpx;
    box-sizing: border-box;
    padding: 0 25rpx;
}

.maskIcon {
    display: inline-block;
    width: 34rpx;
    height: 34rpx;
    border: 1px solid #717171;
    border-radius: 50%;
    margin-right: 10rpx;
}

.maskActIcon {
    border: 1px solid #07928b;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABKElEQVRYhe1Xy42EMAzNBaeNlEAplDIdzNwi7EMUpyDoYKYD6GDogD1MdsQCmuWTELTaJ1kip+c8PwdbiH+sQGYwB0dXyVSBxbtk6iVT778rcHTNDObBicGVhbTYfBP+GhYbcGWxn9loJZmqxcTTqITRahN3ZjAHS88d5L489Fxdlsxgvpd4HMuTMFqFuPmcEovKIRnr0OQ/PPEJ4MoiIvlLiU/dIZna2AlIi80seQzjrTIkWLodlYBkuhxtvlFgPVWA6ZE0gQPl7yVTf74ETlCC1CZM3YbJHyJvxPhPMVM7Sy7ECX5G8c04Y74JjFbA2AW/OWO3eD5MO5INkgihBDB223cFo9U+T2C9eSwfwnfHmhZtwywmI/hd4fZSZajM+3yJspr9aXwB3b9DIfzW9CoAAAAASUVORK5CYII\x3d),
        8rpx, 8rpx, no-repeat;
    background-size: 18rpx;
}

.input-content {
    width: 450rpx;
    height: 60rpx;
    font-size: 30rpx;
    border-bottom: 1rpx solid #666;
    background-color: #fff;
}

.saveTitle {
    text-align: center;
    font-size: 30rpx;
    color: #9d9d9d;
    margin-bottom: 20rpx;
}
</style>
