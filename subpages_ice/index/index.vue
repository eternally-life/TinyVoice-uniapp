<template>
    <view>
        <view class="container" :style="'background:' + colorPicker.color">
            <view class="view">
                <canvas canvasId="canvas" style="width: 750rpx; height: 750rpx"></canvas>
                <canvas canvasId="canvasTemp" style="width: 750rpx; height: 750rpx; position: absolute; left: -760rpx; top: 0"></canvas>
                <view class="tool">
                    <image @tap="setColor" :data-b="map.bgColor.b" :data-g="map.bgColor.g" data-key="bgColor" :data-r="map.bgColor.r" src="https://tiny-voice-prod.oss-cn-shenzhen.aliyuncs.com/staitic/image/icon-theme.png"></image>
                    <image @tap="bindHelp" src="https://tiny-voice-prod.oss-cn-shenzhen.aliyuncs.com/staitic/image/icon-help.png"></image>
                </view>
            </view>
            <view class="operation">
                <view class="list">
                    <view @tap="changeType" :class="'item' + (type == 'default' ? ' active' : '')" data-type="default">默认</view>
                    <view @tap="changeType" :class="'item' + (type == 'guys' ? ' active' : '')" data-type="guys">简笔</view>
                </view>
                <view class="tool">
                    <view @tap="changeRandom" class="btn" v-if="!value">
                        <image src="https://tiny-voice-prod.oss-cn-shenzhen.aliyuncs.com/staitic/image/icon-random.png"></image>
                        <text>随机</text>
                    </view>
                    <block v-else>
                        <view @tap="clearValue" class="btn">
                            <image src="https://tiny-voice-prod.oss-cn-shenzhen.aliyuncs.com/staitic/image/icon-clear.png"></image>
                            <text>清空</text>
                        </view>
                        <view @tap="changePeople" class="btn">
                            <image src="https://tiny-voice-prod.oss-cn-shenzhen.aliyuncs.com/staitic/image/icon-random.png"></image>
                            <text>换人</text>
                        </view>
                    </block>
                </view>
                <view class="input">
                    <textarea
                        @input="bindInput"
                        maxlength="40"
                        placeholder="请输入您要说的话比如：蒙蒙你可曾想过那个男生多么爱你？"
                        :style="!colorPicker.key ? '' : 'height:1rpx;'"
                        :value="output"
                    ></textarea>
                </view>
                <view class="box">
                    <button @tap="saveImage" :disabled="loading" :loading="loading">生成图片</button>
                </view>
            </view>
        </view>
        <view class="color-picker" v-if="colorPicker.key">
            <view class="hd">
                <text @tap="setIndex" :class="'title' + (!colorPicker.index ? ' active' : '')" data-index="0">基础</text>
                <text @tap="setIndex" :class="'title' + (colorPicker.index ? ' active' : '')" data-index="1">高级</text>
                <view @tap="closePicker" class="close">完成</view>
            </view>
            <view class="bd">
                <view class="color-set" v-if="!colorPicker.index">
                    <view @tap="getColor" class="color" data-b="21" data-g="0" data-r="136" style="background: rgb(136, 0, 21)"></view>
                    <view @tap="getColor" class="color" data-b="36" data-g="28" data-r="237" style="background: rgb(237, 28, 36)"></view>
                    <view @tap="getColor" class="color" data-b="39" data-g="127" data-r="255" style="background: rgb(255, 127, 39)"></view>
                    <view @tap="getColor" class="color" data-b="0" data-g="242" data-r="255" style="background: rgb(255, 242, 0)"></view>
                    <view @tap="getColor" class="color" data-b="87" data-g="122" data-r="185" style="background: rgb(185, 122, 87)"></view>
                    <view @tap="getColor" class="color" data-b="201" data-g="174" data-r="255" style="background: rgb(255, 174, 201)"></view>
                    <view @tap="getColor" class="color" data-b="14" data-g="201" data-r="255" style="background: rgb(255, 201, 14)"></view>
                    <view @tap="getColor" class="color" data-b="176" data-g="228" data-r="239" style="background: rgb(239, 228, 176)"></view>
                    <view @tap="getColor" class="color" data-b="76" data-g="177" data-r="34" style="background: rgb(34, 177, 76)"></view>
                    <view @tap="getColor" class="color" data-b="232" data-g="162" data-r="0" style="background: rgb(0, 162, 232)"></view>
                    <view @tap="getColor" class="color" data-b="204" data-g="72" data-r="63" style="background: rgb(63, 72, 204)"></view>
                    <view @tap="getColor" class="color" data-b="164" data-g="73" data-r="163" style="background: rgb(163, 73, 164)"></view>
                    <view @tap="getColor" class="color" data-b="29" data-g="230" data-r="181" style="background: rgb(181, 230, 29)"></view>
                    <view @tap="getColor" class="color" data-b="234" data-g="217" data-r="153" style="background: rgb(153, 217, 234)"></view>
                    <view @tap="getColor" class="color" data-b="190" data-g="146" data-r="112" style="background: rgb(112, 146, 190)"></view>
                    <view @tap="getColor" class="color" data-b="231" data-g="191" data-r="200" style="background: rgb(200, 191, 231)"></view>
                </view>
                <block v-else>
                    <view class="channel">
                        <text>R</text>
                        <slider showValue @change="sliderChange" data-mode="r" max="255" min="0" selectedColor="#33b5e5" :value="colorPicker.r"></slider>
                    </view>
                    <view class="channel">
                        <text>G</text>
                        <slider showValue @change="sliderChange" data-mode="g" max="255" min="0" selectedColor="#33b5e5" :value="colorPicker.g"></slider>
                    </view>
                    <view class="channel">
                        <text>B</text>
                        <slider showValue @change="sliderChange" data-mode="b" max="255" min="0" selectedColor="#33b5e5" :value="colorPicker.b"></slider>
                    </view>
                </block>
            </view>
        </view>
    </view>
</template>

<script>
var t = require('../../data/list.js');

export default {
    data() {
        return {
            value: '',
            random: '',
            type: 'default',
            system: {},
            loading: false,

            colorPicker: {
                index: 0,
                key: '',
                color: '#87CEFA',
                r: 135,
                g: 206,
                b: 250
            },

            map: {
                bgColor: {
                    r: 135,
                    g: 206,
                    b: 250
                }
            },

            people: {},
            output: ''
        };
    },
    onLoad: function () {
        this.onLoadClone3389();
    },
    onLoad: function () {
        this.contextTemp = uni.createCanvasContext('canvasTemp');
        this.context = uni.createCanvasContext('canvas');
        this.system = uni.getSystemInfoSync();
        this.changeRandom();
    },
    onShareAppMessage: function () {
        return {
            title: '举牌小人 - 超萌聊天万能表情包',
            desc: '超萌举牌小人聊天万能表情包。',
            path: '/pages/index/index'
        };
    },
    methods: {
        onLoadClone3389: function () {
            var t = null;

            if (uni.createInterstitialAd) {
                (t = uni.createInterstitialAd({
                    adUnitId: 'adunit-d784e4c05ba697b6'
                })).onLoad(function () {});
                t.onError(function (t) {});
                t.onClose(function () {});
            }

            if (t) {
                t.show().catch(function (t) {
                    console.error(t);
                });
            }
        },

        changeType: function (t) {
            var a = t.currentTarget.dataset.type;

            if (a != this.type) {
                this.setData({
                    type: a
                });
                this.draw();
            }
        },

        bindInput: function (t) {
            var a = t.detail.value;
            this.setData({
                value: a
            });
            this.draw();
        },

        bindHelp: function (t) {
            uni.navigateTo({
                url: '../help/index'
            });
        },

        clearValue: function () {
            this.setData({
                value: '',
                output: ''
            });
            this.changeRandom();
        },

        changePeople: function () {
            var t = this.type;
            this.people[t] = null;
            this.draw();
        },

        changeRandom: function () {
            this.random = t[Math.floor(Math.random() * t.length)];
            this.changePeople();
        },

        draw: function () {
            var t = true;

            if (this.value.length > 50) {
                var that = this;
                wx.cloud.callFunction({
                    name: 'add',
                    data: {
                        word: this.value
                    },
                    success: function (t) {},
                    fail: function (e) {
                        t = false;
                        uni.showToast({
                            title: '非法词禁止生成',
                            icon: 'none',
                            duration: 2000
                        });
                        that.setData({
                            value: '非法词'
                        });
                        that.draw();
                    }
                });
            }

            if (t) {
                var e = this.value || this.random;
                var r = this.context;
                var o = this.type;
                var n = /^[\u4E00-\u9FA5]+$/;
                var i = [];
                var s = 0;
                e.split('\n').forEach(function (t) {
                    var a = t.length;
                    var e = 8 * Math.ceil(a / 8) - a;
                    if (a > s) {
                        s = Math.min(a - 1, 7);
                    }

                    i = i.concat(t.split(''), new Array(e).fill(null));
                });
                var c;
                var l;
                var d;
                var h;
                var u;
                var g;
                var f;
                var v;
                var p;
                var m;
                var w;
                var x;
                var k = i.length;
                var y = Math.floor(k / 8);
                switch ((k % 8 == 0 && y--, o)) {
                    case 'guys':
                        c = 24;
                        l = 0;
                        d = 80;
                        h = 56;
                        u = 10;
                        g = 68;
                        f = 132;
                        v = 37;
                        p = 19;
                        m = 35;
                        w = 18;
                        x = 22;
                        break;

                    default:
                        c = 34;
                        l = 54;
                        d = 72;
                        h = 64;
                        u = 32;
                        g = 149;
                        f = 190;
                        v = 78;
                        p = 25;
                        m = 73;
                        w = 23;
                        x = 28;
                }

                var b = 0;
                var T = 0;
                i.forEach(function (t, a) {
                    if (t) {
                        var e = a % 8;
                        var r = Math.floor(a / 8);
                        var o = g + e * h + (y - r) * l;
                        var n = f + r * d + e * u;
                        b = Math.max(b, o);
                        T = Math.max(T, n);
                    }
                });
                var P = this.system.windowWidth;
                var M = Math.min((P - 16) / b, (P - 16) / T, 1);
                var C = Math.max((P - b * M) / 2, 0) / M;
                var I = Math.max((P - T * M) / 2, 0) / M;
                r.scale(M, M);
                r.setStrokeStyle('#000000');
                r.setLineWidth(2);
                Math.floor(100 * Math.random());
                var D = [];

                if (this.people[o]) {
                    D = this.people[o];
                } else {
                    for (var S = 1; S <= c; S++) {
                        D.push(S);
                    }

                    D.sort(function () {
                        return Math.random() - 0.5;
                    });
                    this.people[o] = D;
                }

                i.forEach(function (t, a) {
                    if (t) {
                        var e = a % 8;
                        var i = Math.floor(a / 8);
                        var s = C + e * h + (y - i) * l;
                        var k = I + i * d + e * u;
                        var b = D[a % c];
                        r.save();
                        // r.drawImage('../../image/' + o + '/' + b + 'https://tiny-voice-prod.oss-cn-shenzhen.aliyuncs.com/staitic/subpages_ice/index/.png', s, k, g, f);

                        if (n.test(t)) {
                            r.translate(s + m, k + w);
                        } else {
                            r.translate(s + v, k + p);
                        }

                        r.rotate((37 * Math.PI) / 180);
                        r.setFontSize(x);
                        r.fillText(t, -x / 2, x / 2);
                        r.restore();
                    }
                });
                r.draw();
            }
        },

        saveImage: function () {
            var that = this;
            var a = (this.context, this.contextTemp);
            var e = this.system.windowWidth;
            a.globalCompositeOperation = ' source-over';
            a.save();
            a.setFillStyle(this.colorPicker.color);
            a.fillRect(0, 0, e, e);
            a.restore();
            that.setData({
                loading: true
            });
            uni.canvasToTempFilePath({
                canvasId: 'canvas',
                fileType: 'png',
                success: function (r) {
                    a.drawImage(r.tempFilePath, 0, 0, e, e);
                    a.draw();
                    setTimeout(function () {
                        uni.canvasToTempFilePath({
                            canvasId: 'canvasTemp',
                            fileType: 'png',
                            success: function (a) {
                                that.setData({
                                    loading: false
                                });
                                uni.previewImage({
                                    urls: [a.tempFilePath]
                                });
                            }
                        });
                    }, 120);
                }
            });
        },

        setIndex: function (t) {
            var a = this.colorPicker;
            a.index = +t.currentTarget.dataset.index;
            this.setData({
                colorPicker: a
            });
        },

        setColor: function (t) {
            var a = t.currentTarget.dataset.key;
            var e = +t.currentTarget.dataset.r;
            var r = +t.currentTarget.dataset.g;
            var o = +t.currentTarget.dataset.b;
            this.setData({
                colorPicker: {
                    key: a,
                    color: 'rgb(' + e + ',' + r + ',' + o + ')',
                    r: e,
                    g: r,
                    b: o
                }
            });
        },

        setBackground: function (t) {
            this.setData(t);
            var a = t.colorPicker.r.toString(16);
            var e = t.colorPicker.g.toString(16);
            var r = t.colorPicker.b.toString(16);
            if (a.length < 2) {
                a = '0' + a;
            }

            if (e.length < 2) {
                e = '0' + e;
            }

            if (r.length < 2) {
                r = '0' + r;
            }

            var o = '#' + a + e + r;
            uni.setNavigationBarColor({
                frontColor: '#ffffff' != o ? '#ffffff' : '#000000',
                backgroundColor: o
            });
            this.draw();
        },

        getColor: function (t) {
            var a = this.colorPicker.key;

            if (a) {
                var e = this.map;
                var r = +t.currentTarget.dataset.r;
                var o = +t.currentTarget.dataset.g;
                var n = +t.currentTarget.dataset.b;
                e[a].r = r;
                e[a].g = o;
                e[a].b = n;
                var i = {
                    colorPicker: {
                        index: 0,
                        key: a,
                        color: 'rgb(' + r + ',' + o + ',' + n + ')',
                        r: r,
                        g: o,
                        b: n
                    },
                    map: e
                };
                i[a] = 'rgb(' + r + ',' + o + ',' + n + ')';
                this.setBackground(i);
            }
        },

        sliderChange: function (t) {
            var a = this.colorPicker.key;

            if (a) {
                var e = t.detail.value;
                var r = t.currentTarget.dataset.mode;
                var o = this.map;
                var n = this.colorPicker;
                n[r] = e;
                n.color = 'rgb(' + n.r + ',' + n.g + ',' + n.b + ')';
                o[a] || (o[a] = {});
                o[a] = {
                    r: n.r,
                    g: n.g,
                    b: n.b
                };
                var i = {
                    colorPicker: n,
                    map: o
                };
                i[a] = 'rgb(' + o[a].r + ',' + o[a].g + ',' + o[a].b + ')';
                this.setBackground(i);
            }
        },

        closePicker: function () {
            var t = this.colorPicker;
            t.key = '';
            this.setData({
                colorPicker: t
            });
        }
    }
};
</script>
<style>
.container {
    background: #87cefa;
}

.view {
    position: relative;
    height: 750rpx;
}

.view canvas {
    display: block;
    margin: 0 auto;
    position: relative;
}

.view .tool {
    position: absolute;
    right: 10rpx;
    top: 20rpx;
    z-index: 99;
}

.view .tool image {
    width: 40rpx;
    height: 40rpx;
    margin: 0 10rpx;
}

.operation {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 30rpx;
    box-sizing: border-box;
}

.list {
    display: inline-block;
    width: 300rpx;
    padding: 30rpx 0 12rpx;
    border-radius: 4rpx;
    overflow: hidden;
}

.list .item {
    float: left;
    width: 150rpx;
    background: #fff;
    line-height: 52rpx;
    text-align: center;
    font-size: 28rpx;
}

.list .active {
    float: left;
    background: #484848;
    color: #fff;
}

.operation {
    position: relative;
}

.operation .input {
    flex: 1;
    display: flex;
    margin-bottom: 16rpx;
}

.operation textarea {
    display: block;
    flex: 1;
    width: 100%;
    height: 100%;
    padding: 10rpx 20rpx;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 6rpx;
    font-size: 30rpx;
    box-sizing: border-box;
}

.operation .tool {
    position: absolute;
    right: 30rpx;
    top: -20rpx;
    z-index: 999;
}

.operation .btn {
    float: left;
    width: 98rpx;
    height: 98rpx;
    margin-left: 16rpx;
    border: 2rpx solid transparent;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.15);
    line-height: 30rpx;
    text-align: center;
    font-size: 24rpx;
    color: #fff;
}

.operation image {
    display: block;
    width: 48rpx;
    height: 48rpx;
    margin: 10rpx auto 0rpx;
}

.operation button {
    width: 300rpx;
    height: 76rpx;
    margin: 0 auto 16rpx;
    background: #333;
    line-height: 76rpx;
    font-size: 32rpx;
    color: #fff;
    border-radius: 6rpx;
}

.operation button[disabled] {
    background: #666;
    color: #fff;
}

.color-picker {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 999;
    width: 100%;
    background: #fff;
    box-sizing: border-box;
}

.color-picker .hd {
    height: 48rpx;
    padding: 20rpx 24rpx;
    border-bottom: 2rpx solid #ebebeb;
    line-height: 48rpx;
    font-size: 32rpx;
}

.color-picker .bd {
    padding: 24rpx;
    height: 300rpx;
}

.color-picker swiper {
    height: 300rpx;
}

.color-picker .color-set {
    margin: 30rpx 16rpx;
    overflow: hidden;
    border-top: 1rpx solid #ebebeb;
    border-left: 1rpx solid #ebebeb;
}

.color-picker .color {
    float: left;
    width: 25%;
    height: 60rpx;
    border-bottom: 1rpx solid #ebebeb;
    border-right: 1rpx solid #ebebeb;
    box-sizing: border-box;
}

.color-picker .close {
    float: right;
    margin-right: -30rpx;
    padding: 0 40rpx;
    color: rgb(51, 181, 229);
}

.color-picker .title {
    padding: 0 24rpx;
    color: #999;
}

.color-picker .active {
    color: #000;
}

.color-picker .view {
    margin: 0 auto;
    width: 120rpx;
    height: 42rpx;
    margin-bottom: -36rpx;
    padding: 2rpx;
    border: 2rpx solid #dbdbdb;
}

.color-picker .channel {
    padding: 0 10rpx 0 20rpx;
}

.color-picker .channel text {
    display: block;
    padding: 0 32rpx;
    color: #666;
}

.color-picker slider {
    margin-top: -5rpx;
}
</style>
