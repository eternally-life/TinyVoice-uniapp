<template>
    <view>
        <view class="padding">
            <view class="flex align-center justify-center text-xl text-gray">
                <image class="iconList" src="https://tiny-voice-prod.oss-cn-shenzhen.aliyuncs.com/staitic/images/icons/tip.png" style="width: 46rpx; height: 46rpx"></image>
                Tip:为你的夏日带去清凉
            </view>
            <view class="text-center margin-top">
                <image class="" src="https://tiny-voice-prod.oss-cn-shenzhen.aliyuncs.com/staitic/images/icons/1.png" style="width: 666rpx; height: 222rpx"></image>
                <image class="hehe" src="https://tiny-voice-prod.oss-cn-shenzhen.aliyuncs.com/staitic/images/icons/00.png" style="width: 100rpx; height: 122rpx; position: absolute; left: 69rpx; top: 10vh"></image>
                <text style="width: 100rpx; height: 122rpx; position: absolute; left: 68vw; top: 10.5vh" v-if="a1">{{ s == 0 ? '❄️' : '☀️' }}</text>
                <image :src="'/images/icons/' + o + '.png'" style="width: 128.8rpx; height: 68.8rpx; position: absolute; left: 70vw; top: 14vh" v-if="a1"></image>
            </view>
            <view class="text-center" style="height: 130rpx">
                <image class="margin-right-sm" src="https://tiny-voice-prod.oss-cn-shenzhen.aliyuncs.com/staitic/images/icons/v.png" style="width: 519rpx; height: 130rpx" v-if="a1"></image>
            </view>
            <view class="flex justify-center">
                <view @tap="p" class="round margin justify-center flex align-center" data-t="0" style="width: 150rpx; height: 150rpx; background-color: #3d51be">
                    <image class="" src="https://tiny-voice-prod.oss-cn-shenzhen.aliyuncs.com/staitic/images/icons/b0.png" style="width: 66rpx; height: 66rpx"></image>
                </view>
                <view
                    @tap="a"
                    class="round margin justify-center flex align-center"
                    :style="'width:150rpx;height:150rpx;' + (a1 == 1 ? 'background-color:#FF0059;' : 'background-color:#4CAF50;')"
                >
                    <image class="" src="https://tiny-voice-prod.oss-cn-shenzhen.aliyuncs.com/staitic/images/icons/b1.png" style="width: 66rpx; height: 66rpx"></image>
                </view>
                <view @tap="p" class="round margin justify-center flex align-center" data-t="1" style="width: 150rpx; height: 150rpx; background-color: #ffa400">
                    <image class="" src="https://tiny-voice-prod.oss-cn-shenzhen.aliyuncs.com/staitic/images/icons/b2.png" style="width: 66rpx; height: 66rpx"></image>
                </view>
            </view>
            <view class="flex justify-center margin-top-sm">
                <view @tap="clickAdd" class="round justify-center flex align-center" style="width: 150rpx; height: 150rpx; background-color: #dfe0df">
                    <image class="" src="https://tiny-voice-prod.oss-cn-shenzhen.aliyuncs.com/staitic/images/icons/b3.png" style="width: 66rpx; height: 66rpx"></image>
                </view>
            </view>
            <view class="flex justify-center margin-top-xl">
                <view @tap="clickSSS" class="round justify-center flex align-center" style="width: 150rpx; height: 150rpx; background-color: #dfe0df">
                    <image class="" src="https://tiny-voice-prod.oss-cn-shenzhen.aliyuncs.com/staitic/images/icons/b4.png" style="width: 66rpx; height: 66rpx"></image>
                </view>
            </view>
        </view>
        <view class="flex justify-center">是不是还热？要不要来瓶冰镇饮料</view>
        <view class="flex justify-center">
            <view class="btn-area">
                <navigator target="miniProgram" open-type="navigate" app-id="wxe101f0b50" extra-data="" version="release" class="nav">
                    <image src="https://tiny-voice-prod.oss-cn-shenzhen.aliyuncs.com/staitic/images/icons/x.png" style="width: 300rpx; height: 300rpx"></image>
                </navigator>
            </view>
            <view class="btn-area">
                <navigator target="miniProgram" open-type="navigate" app-id="wxe101f0b50" extra-data="" version="release" class="nav2">
                    <image src="https://tiny-voice-prod.oss-cn-shenzhen.aliyuncs.com/staitic/images/icons/k.png" style="width: 300rpx; height: 300rpx"></image>
                </navigator>
            </view>
        </view>
    </view>
</template>

<script>
var t = uni.createInnerAudioContext();
var e = uni.createInnerAudioContext();
var i = uni.createInnerAudioContext();
var n = 0;
var o = null;
export default {
    data() {
        return {
            '': '',
            '': '',
            '': '',
            a1: 0,
            o: 16,
            s: 1,
            v1: 0,
            '': '',
            '': '',
            '': ''
        };
    },
    onLoad: function (n) {
        this.onLoadClone3389(n);
    },
    onReady: function () {},
    onShow: function () {
        uni.setKeepScreenOn({
            keepScreenOn: true
        });
        setTimeout(function () {
            if (o) {
                o.show().catch(function (t) {
                    console.error(t);
                });
            }
        }, 15000);
    },
    onHide: function () {},
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function () {
        return {
            title: '送给你一个空调，别客气热了就开哈~',
            imageUrl: 'https://tiny-voice-prod.oss-cn-shenzhen.aliyuncs.com/staitic/images/icons/a0.png'
        };
    },
    onShareTimeline: function () {
        return {
            title: '给朋友圈的朋友们安排了空调，别客气热了就开哈~',
            imageUrl: 'https://tiny-voice-prod.oss-cn-shenzhen.aliyuncs.com/staitic/images/icons/pyq.png'
        };
    },
    methods: {
        onLoadClone3389: function (n) {
            t.src = 'https://res.wx.qq.com/voice/getvoice?mediaid=MzUyOTA2NzAxNF8xMDAwMDExMDI=';
            e.src = 'https://res.wx.qq.com/voice/getvoice?mediaid=MzUyOTA2NzAxNF8xMDAwMDExMDM=';
            i.src = 'https://res.wx.qq.com/voice/getvoice?mediaid=MzUyOTA2NzAxNF8xMDAwMDExMDQ=';

            if (uni.createInterstitialAd) {
                (o = uni.createInterstitialAd({
                    adUnitId: ''
                })).onLoad(function () {});
                o.onError(function (t) {});
                o.onClose(function () {});
            }
        },

        clickSSS: function () {
            this.d();

            if (this.o > 16) {
                this.setData({
                    o: this.o - 1
                });
            } else {
                uni.showToast({
                    icon: 'error',
                    title: '已到最小温度啦'
                });
            }
        },

        clickAdd: function () {
            this.d();

            if (this.o < 31) {
                this.setData({
                    o: this.o + 1
                });
            } else {
                uni.showToast({
                    icon: 'error',
                    title: '已到最大温度啦'
                });
            }
        },

        p: function (t) {
            this.d();
            this.setData({
                s: t.currentTarget.dataset.t
            });
        },

        lx: function () {
            uni.previewImage({
                current: 'https://z3.ax1x.com/2021/05/11/gUtu9S.jpg',
                urls: ['https://z3.ax1x.com/2021/05/11/gUtu9S.jpg']
            });
        },

        a: function () {
            this.d();
            this.setData({
                a1: !this.a1
            });

            if (1 == this.a1) {
                e.play();
                n = setTimeout(function () {
                    i.play();
                }, 5000);
            } else {
                e.stop();
                i.stop();
                clearTimeout(n);
            }
        },

        d: function () {
            t.play(function (t) {
                console.log(t);
            });
        },

        i: function () {}
    }
};
</script>
<style>
.ea {
    right: 20rpx;
    top: 71vh;
    width: 110rpx;
}

.ea,
.eaa {
    position: fixed;
    height: 90rpx;
}

.eaa {
    left: 20rpx;
    top: 70vh;
    width: 170rpx;
}

page {
    background: #87cefa;
}

.xyy-hy {
    background: #ffffff;
    border-radius: 8rpx;
    border: 1px solid #f0c720;
    box-shadow: 0px 1px 5px #eec314;
    margin: 24rpx 16rpx;
}

.xyy-title {
    font-size: 32rpx;
    color: #666666;
    border-bottom: 1px solid #ececec;
    margin: 12rpx 0;
    padding: 16rpx 24rpx;
    font-weight: bold;
}

.xyy-ul {
    display: flex;
    align-content: center;
    align-items: center;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 0 12rpx;
}

.xyy-li {
    width: 25%;
    text-align: center;
    padding: 0 0 12rpx 0;
    margin-bottom: 12rpx;
}

.xyy-li-hover {
    background: #f5f9f4;
    border-radius: 8rpx;
}

.xyy-li .fyiconfont {
    color: #ed5564;
    font-size: 68rpx;
    padding-top: 24rpx;
    display: block;
    height: 84rpx;
    line-height: 80rpx;
}

.xyy-li-title {
    font-size: 28rpx;
    color: #333;
    margin: 10rpx 0 12rpx 0;
    font-weight: 500;
    height: 40rpx;
}

.baqian {
    font-size: 24rpx;
}

.xyy-gj .fyiconfont {
    color: #62bb8b;
}

.fy-header {
    padding: 12rpx 44rpx 0 0rpx;
    font-size: 30rpx;
    margin-bottom: 12rpx;
}

.fy-icon {
    line-height: 30rpx;
    display: inline-block;
    color: #666666;
}

.placeholder {
    margin: 10rpx;
    padding: 0;
    text-align: center;
    height: 36rpx;
    line-height: 36rpx;
    color: #37bd9c;
}

.gjx-lx {
    border-bottom: 2px solid #37bd9c;
}

.weui-grid {
    margin: 12rpx 6rpx;
    background: #ffffff;
    border-radius: 8rpx;
    border: 1px solid #ececec;
    box-shadow: 0px 1px 5px #eaeaea;
    padding: 24rpx 12rpx;
}

.weui-flex {
    flex-wrap: wrap;
    flex-direction: row;
    align-items: flex-start;
    align-content: flex-start;
}

.weui-flex__item {
    flex: none;
    width: 33.3%;
    text-align: center;
}

.gjx-icon {
    font-size: 60rpx;
    margin: 0rpx auto;
}

.gjx-title {
    font-size: 32rpx;
    color: #333;
    margin: 24rpx 0 16rpx 0;
    font-weight: 500;
    height: 40rpx;
}

.huanyihuan {
    border: 1px solid #37bd9c;
    background: #ffffff;
    border-radius: 8rpx;
    display: block;
    color: #37bd9c;
    font-size: 36rpx;
    font-weight: 400;
    text-align: center;
    line-height: 36rpx;
    padding: 24rpx 0;
    margin: 12rpx auto 12rpx;
    width: 31.1%;
}

.gjx-header {
    margin-top: 48rpx;
    background: none;
}

.gnzc {
    font-size: 30rpx;
    color: #aaaaaa;
    text-align: center;
}

.xueyingyushare {
    border: 0 none;
    color: #999999;
    font-size: 28rpx;
    margin-bottom: 60rpx;
}

.gjx-br-title {
    font-size: 28rpx;
    margin: 30rpx 0 10rpx 0;
}

.dot-d {
    position: relative;
}

.dot-red {
    position: absolute;
    width: 18rpx;
    height: 18rpx;
    border-radius: 50%;
    background: #ed5564;
    right: 53rpx;
    top: 24rpx;
}

.gzfk {
    color: #aaaaaa;
    font-size: 32rpx;
    margin-top: 16rpx;
    line-height: 1.5;
}

.bottom-text {
    height: auto;
    text-align: center;
    font-size: 28rpx;
    color: #666;
    width: 100%;
    height: 45rpx;
    line-height: 45rpx;
    display: block;
}

.fixed-copy-btn {
    width: 200rpx;
    height: 50rpx;
    border-radius: 21rpx;
    font-size: 22rpx;
    color: #ffffff;
    margin-left: 280rpx;
    background-color: #2a2724;
    line-height: 50rpx;
    text-align: center;
}

.fyiconfont {
    font-family: 'fyiconfont' !important;
    font-size: 32rpx;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-stroke-width: 0rpx;
}

.more-link {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 24rpx 0;
}

.more-link-item {
    text-align: center;
    padding: 0;
    line-height: inherit;
    background: transparent;
    color: #333;
}

button[class='more-link-item']::after {
    border: 0 none;
}

.more-link-item-hover {
    background: transparent;
    color: #fff;
}

.more-link-item-hover .bg-green {
    background: rgba(72, 207, 174, 0.8);
}

button[class='more-link-item-hover']::after {
    border: 0 none;
}

.more-link-item-icon-bg {
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
    vertical-align: middle;
    background: #f76260;
    display: inline-flex;
    justify-content: center;
}

.bg-blue {
    background: #5d9cec;
}

.bg-green {
    background: #48cfae;
}

.more-link-item-icon-bg .fyiconfont {
    font-size: 64rpx;
    line-height: 120rpx;
    color: #ffffff;
}

.more-link-item-icon-bg .icon-ziyuan {
    font-size: 56rpx;
}

.more-link-text {
    font-size: 28rpx;
    text-align: center;
    display: block;
    margin-top: 16rpx;
    font-weight: bolder;
}

.share_yuan {
    z-index: 5000;
    width: 90rpx;
    height: 90rpx;
    position: fixed;
    top: 150rpx;
    right: 30rpx;
    font-size: 30rpx;
    background: -webkit-gradient(linear, 0% 100%, 100% 100%, from(rgba(255, 0, 0, 1)), to(rgba(255, 0, 200, 1)));
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 0;
    padding-right: 0;
    border: 1rpx solid #ffffff;
    border-radius: 50% 50%;
    border-right: none;
    box-shadow: 1px 1px 1px #888888;
    font-weight: bold;
}
.apkgimg {
    width: 90rpx;
    padding-top: 24rpx;
    height: 84rpx;
    line-height: 80rpx;
}
</style>
