<template>
    <view>
        <view class="bg-black">
            <view class="padding">
                <view class="cu-form-group bg-white" style="border-radius: 20rpx">
                    <textarea
                        @input="bindKeyInput"
                        :disabled="modalName != null"
                        maxlength="-1"
                        placeholder="输入需转换的文字，点击下方字体会自动转换"
                        :value="textareaValue"
                    ></textarea>
                </view>
            </view>
            <!-- parse <template is="change" data></template> -->
            <block name="change">
                <view class="grid col-2 padding-left padding-right padding-bottom">
                    <view class="text-center padding-right sm">
                        <button @tap="clearInput" class="lines-black">清空记录</button>
                    </view>
                    <view class="text-center">
                        <button class="bg-green" openType="share">分享好友</button>
                    </view>
                </view>
            </block>
            <scroll-view scrollY class="bg-white" style="height: calc(100% - 380rpx); position: fixed; bottom: 0; left: 0">
                <!-- parse <template is="ad" data></template> -->
                <block name="ad">
                    <view></view>
                </block>
                <view class="bottom-change-list">
                    <view class="bottom-change-list__box">
                        <button @tap="changeText" id="tmw1">藤蔓文1</button>
                        <button @tap="changeText" id="tmw2">藤蔓文2</button>
                        <button @tap="changeText" id="tmw3">藤蔓文3</button>
                        <button @tap="changeText" id="jhw">菊花文</button>
                        <button @tap="changeText" id="hbw">花边文</button>
                        <button @tap="changeText" id="ctw">草头文</button>
                        <button @tap="changeText" id="blw">波浪文</button>
                        <button @tap="changeText" id="myw">萌芽文</button>
                        <button @tap="changeText" id="sbw">水波文</button>
                        <button @tap="changeText" id="htw">横条文</button>
                        <button @tap="changeText" id="shtw">双横条文</button>
                        <button @tap="changeText" id="kaw">可爱文</button>
                        <button @tap="changeText" id="pgyw">蒲公英文</button>
                        <button @tap="changeText" id="lhz">流汗文</button>
                        <button @tap="changeText" id="fnw">飞鸟文</button>
                        <button @tap="changeText" id="yfw">音符文</button>
                        <button @tap="changeText" id="mlw">ℳℓ文</button>
                        <button @tap="changeText" id="mtz">毛体字</button>
                        <button @tap="changeText" id="scx">删除线</button>
                        <button @tap="changeText" id="xhx">下划线</button>
                    </view>
                </view>
            </scroll-view>
        </view>
        <view></view>
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
            scrollTop: 0,
            textareaValue: '',
            modalName: ''
        };
    },
    onLoad: function (t) {},
    onShareAppMessage: function () {
        var t = require('../../../7FF9148756B80DDF199F7C80BAACE943.js');

        return {
            title: t.title,
            path: '/subpages_toolkit/index/index',
            imageUrl: t.url
        };
    },
    methods: {
        bindKeyInput: function (t) {
            this.current = t.detail.value;
        },

        clearInput: function () {
            this.current = null;
            this.setData({
                scrollTop: 0,
                textareaValue: ''
            });
        },

        changeText: function (t) {
            if (this.current) {
                switch (t.target.id) {
                    case 'lhz':
                        for (var a = String.fromCharCode(1160), e = '', r = 0, h = (s = this.current).length; r < h; r++) {
                            e += s.charAt(r) + a;
                        }

                        this.setData({
                            textareaValue: e
                        });
                        this.CopyLink();
                        break;

                    case 'jhw':
                        for (var a = String.fromCharCode(1161), e = '', r = 0, h = (s = this.current).length; r < h; r++) {
                            e += s.charAt(r) + a;
                        }

                        this.setData({
                            textareaValue: e
                        });
                        this.CopyLink();
                        break;

                    case 'tmw1':
                        for (var a = 'ζั͡ ', e = '', r = 0, h = (s = this.current).length; r < h; r++) {
                            e += a + s.charAt(r);
                        }

                        this.setData({
                            textareaValue: e + 'ζั͡✾'
                        });
                        this.CopyLink();
                        break;

                    case 'tmw2':
                        for (var a = 'ζั͡ ', e = '', r = 0, h = (s = this.current).length; r < h; r++) {
                            e += a + s.charAt(r);
                        }

                        this.setData({
                            textareaValue: e + 'ζั͡✿'
                        });
                        this.CopyLink();
                        break;

                    case 'tmw3':
                        for (var a = 'ζั͡ ', e = '', r = 0, h = (s = this.current).length; r < h; r++) {
                            e += a + s.charAt(r);
                        }

                        this.setData({
                            textareaValue: e + 'ζั͡❀'
                        });
                        this.CopyLink();
                        break;

                    case 'hbw':
                        for (var a = String.fromCharCode(2954), e = '', r = 0, h = (s = this.current).length; r < h; r++) {
                            e += s.charAt(r) + a;
                        }

                        this.setData({
                            textareaValue: e
                        });
                        this.CopyLink();
                        break;

                    case 'ctw':
                        for (var a = String.fromCharCode(3572), e = '', r = 0, h = (s = this.current).length; r < h; r++) {
                            e += s.charAt(r) + a;
                        }

                        this.setData({
                            textareaValue: e
                        });
                        this.CopyLink();
                        break;

                    case 'scx':
                        for (var a = '̶', e = '', r = 0, s = this.current, h = (s = this.current).length; r < h; r++) {
                            e += s.charAt(r) + a;
                        }

                        this.setData({
                            textareaValue: e
                        });
                        this.CopyLink();
                        break;

                    case 'xhx':
                        for (var a = '꯭', e = '', r = 0, h = (s = this.current).length; r < h; r++) {
                            e += s.charAt(r) + a;
                        }

                        this.setData({
                            textareaValue: '꯭' + e
                        });
                        this.CopyLink();
                        break;

                    case 'kaw':
                        for (var a = String.fromCharCode(4326), e = '', r = 0, h = (s = this.current).length; r < h; r++) {
                            e += a + s.charAt(r);
                        }

                        this.setData({
                            textareaValue: e + a
                        });
                        this.CopyLink();
                        break;

                    case 'pgyw':
                        for (var a = 'ོ', e = '', r = 0, h = (s = this.current).length; r < h; r++) {
                            e += s.charAt(r) + a;
                        }

                        this.setData({
                            textareaValue: '៚' + e + 'ོ ͜✿ ҉҉҉҉҉'
                        });
                        this.CopyLink();
                        break;

                    case 'blw':
                        for (var a = String.fromCharCode(794), e = '', r = 0, h = (s = this.current).length; r < h; r++) {
                            e += s.charAt(r) + a;
                        }

                        this.setData({
                            textareaValue: e
                        });
                        this.CopyLink();
                        break;

                    case 'myw':
                        for (var a = '็้', e = '', r = 0, h = (s = this.current).length; r < h; r++) {
                            e += s.charAt(r) + a;
                        }

                        this.setData({
                            textareaValue: e
                        });
                        this.CopyLink();
                        break;

                    case 'sbw':
                        for (var a = String.fromCharCode(860), e = '', r = 0, h = (s = this.current).length; r < h; r++) {
                            e += s.charAt(r) + a;
                        }

                        this.setData({
                            textareaValue: e
                        });
                        this.CopyLink();
                        break;

                    case 'htw':
                        for (var i = String.fromCharCode(862), n = String.fromCharCode(863), o = '', r = 0, h = (c = this.current).length; r < h; r++) {
                            o += i + c.charAt(r) + n;
                        }

                        this.setData({
                            textareaValue: o
                        });
                        this.CopyLink();
                        break;

                    case 'shtw':
                        for (var i = String.fromCharCode(831), n = String.fromCharCode(839), o = '', c = this.current, r = 0, h = c.length; r < h; r++) {
                            o += i + c.charAt(r) + n;
                        }

                        this.setData({
                            textareaValue: o
                        });
                        this.CopyLink();
                        break;

                    case 'fnw':
                        for (var a = 'ོ', e = '', r = 0, h = (s = this.current).length; r < h; r++) {
                            e += s.charAt(r) + a;
                        }

                        this.setData({
                            textareaValue: e
                        });
                        this.CopyLink();
                        break;

                    case 'yfw':
                        for (var a = '♫', e = '', r = 0, h = (s = this.current).length; r < h; r++) {
                            e += s.charAt(r) + a;
                        }

                        this.setData({
                            textareaValue: '∮' + e
                        });
                        this.CopyLink();
                        break;

                    case 'mlw':
                        for (var a = 'ℳℓ', e = '', r = 0, h = (s = this.current).length; r < h; r++) {
                            e += a + s.charAt(r);
                        }

                        this.setData({
                            textareaValue: e
                        });
                        this.CopyLink();
                        break;

                    case 'mtz':
                        for (var a = 'ืุ', e = '', r = 0, h = (s = this.current).length; r < h; r++) {
                            e += s.charAt(r) + a;
                        }

                        this.setData({
                            textareaValue: e
                        });
                        this.CopyLink();
                        break;

                    default:
                }
            } else {
                uni.showToast({
                    title: '转换内容不能为空',
                    icon: 'none',
                    duration: 800
                });
            }
        },

        CopyLink: function () {
            var t = this.textareaValue;
            uni.setClipboardData({
                data: t,
                success: function (t) {
                    uni.showToast({
                        title: '已复制',
                        duration: 1000
                    });
                }
            });
        }
    }
};
</script>
<style>
/* @import '../fly/fly.css'; */
</style>
