<template>
    <view>
        <view class="bg-black">
            <view class="padding">
                <view class="cu-form-group bg-white" style="border-radius: 20rpx">
                    <textarea
                        autoFocus
                        @input="bindKeyInput"
                        :disabled="modalName != null"
                        maxlength="-1"
                        placeholder="请输入需转换的号码，仅支持数字转换"
                        type="number"
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
            <view class="padding-left padding-right padding-bottom">
                <!-- parse <template is="ad" data></template> -->
                <block name="ad">
                    <view></view>
                </block>
            </view>
            <view v-if="!list">
                <view class="padding-left padding-right">
                    <view @tap="CopyTel" class="cu-list menu" :data-tel="no_h" style="border-radius: 10rpx">
                        <view class="cu-item arrow">
                            <view class="content">
                                <text class="text-black"></text>
                                <text class="text-black">{{ no_h }}</text>
                            </view>
                        </view>
                    </view>
                    <view @tap="CopyTel" class="cu-list menu" :data-tel="no_d" style="border-radius: 10rpx">
                        <view class="cu-item arrow">
                            <view class="content">
                                <text class="text-grey"></text>
                                <text class="text-black">{{ no_d }}</text>
                            </view>
                        </view>
                    </view>
                    <view @tap="CopyTel" class="cu-list menu" :data-tel="cell_h" style="border-radius: 10rpx">
                        <view class="cu-item arrow">
                            <view class="content">
                                <text class="text-grey"></text>
                                <text class="text-black">{{ cell_h }}</text>
                            </view>
                        </view>
                    </view>
                    <view @tap="CopyTel" class="cu-list menu" :data-tel="cell_d" style="border-radius: 10rpx">
                        <view class="cu-item arrow">
                            <view class="content">
                                <text class="text-grey"></text>
                                <text class="text-black">{{ cell_d }}</text>
                            </view>
                        </view>
                    </view>
                    <view @tap="CopyTel" class="cu-list menu" :data-tel="tell_h" style="border-radius: 10rpx">
                        <view class="cu-item arrow">
                            <view class="content">
                                <text class="text-grey"></text>
                                <text class="text-black">{{ tell_h }}</text>
                            </view>
                        </view>
                    </view>
                    <view @tap="CopyTel" class="cu-list menu" :data-tel="tell_d" style="border-radius: 10rpx">
                        <view class="cu-item arrow">
                            <view class="content">
                                <text class="text-grey"></text>
                                <text class="text-black">{{ tell_d }}</text>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <ad unit-id="95a15b722a8061b5790c23cae154b4bf" type="card"></ad>
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
            list: true,
            scrollTop: 0,
            textareaValue: '',
            no_h: '',
            no_d: '',
            cell_h: '',
            cell_d: '',
            tell_h: '',
            tell_d: '',
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
            this.setName();
        },

        clearInput: function () {
            this.current = null;
            this.setData({
                scrollTop: 0,
                textareaValue: '',
                list: true
            });
        },

        setName: function () {
            var t = this.current;

            if ('' != t) {
                var e = new Array();
                e = t.split('');

                for (var a = '', n = '', i = 0; i <= e.length; i++) {
                    if ('0' != e[i]) {
                        if ('1' != e[i]) {
                            if ('2' != e[i]) {
                                if ('3' != e[i]) {
                                    if ('4' != e[i]) {
                                        if ('5' != e[i]) {
                                            if ('6' != e[i]) {
                                                if ('7' != e[i]) {
                                                    if ('8' != e[i]) {
                                                        '9' != e[i] || ((a += '⁹'), (n += '₉'));
                                                    } else {
                                                        a += '⁸';
                                                        n += '₈';
                                                    }
                                                } else {
                                                    a += '⁷';
                                                    n += '₇';
                                                }
                                            } else {
                                                a += '⁶';
                                                n += '₆';
                                            }
                                        } else {
                                            a += '⁵';
                                            n += '₅';
                                        }
                                    } else {
                                        a += '⁴';
                                        n += '₄';
                                    }
                                } else {
                                    a += '³';
                                    n += '₃';
                                }
                            } else {
                                a += '²';
                                n += '₂';
                            }
                        } else {
                            a += '¹';
                            n += '₁';
                        }
                    } else {
                        a += '⁰';
                        n += '₀';
                    }
                }

                var r = a;
                var l = n;
                if ('' != r) {
                    this.setData({
                        no_h: r,
                        no_d: l,
                        cell_h: '℡' + r,
                        cell_d: '℡' + r,
                        tell_h: '☏' + r,
                        tell_d: '☏' + r,
                        list: false
                    });
                }
            }
        },

        CopyTel: function (t) {
            uni.setClipboardData({
                data: t.currentTarget.dataset.tel,
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
page {
    background-color: #000000;
}
</style>
