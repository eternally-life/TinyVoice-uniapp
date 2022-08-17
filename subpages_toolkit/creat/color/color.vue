<template>
    <view>
        <view class="padding-bottom-xl" style="background-color: #000000">
            <view class="padding-left-xs text-white">
                <view class="padding-xs text-sub">
                    <text>温馨提示 1、蓝色效果只有安卓手机可以看到 2、微信昵称最多能输入6个蓝色字母，否则无法粘贴成功</text>
                </view>
            </view>
        </view>
        <view class="padding">
            <view class="cu-form-group solid-bottom">
                <view class="title">请输入</view>
                <input focus @input="generate" maxlength="10" placeholder="请输入您的英文小写昵称" :value="textareaValue" />
            </view>
            <view class="cu-bar bg-white solid-bottom" v-if="!(result == '' ? true : false)">
                <view class="action">
                    <text>{{ result }}</text>
                </view>
            </view>
            <view class="grid col-2 padding" v-if="!(result == '' ? true : false)">
                <view class="text-center padding-right sm">
                    <button @tap="CopyName" class="bg-black" :data-name="result">复制</button>
                </view>
                <view class="text-center">
                    <button class="bg-green" openType="share">分享好友</button>
                </view>
            </view>

            <ad unit-id="95a15b722a8061b5790c23cae154b4bf" type="card"></ad>
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
            result: '',
            textareaValue: ''
        };
    },
    onLoad: function (e) {},
    onShareAppMessage: function () {
        var e = require('../../../7FF9148756B80DDF199F7C80BAACE943.js');

        return {
            title: e.title,
            path: '/pages/index/index',
            imageUrl: e.url
        };
    },
    methods: {
        generate: function (e) {
            var t = e.detail.value.trim();
            this.setData({
                result: this.strReplace(
                    t,
                    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
                    [
                        '🇦 ',
                        '🇧 ',
                        '🇨 ',
                        '🇩 ',
                        '🇪 ',
                        '🇫 ',
                        '🇬 ',
                        '🇭 ',
                        '🇮 ',
                        '🇯 ',
                        '🇰 ',
                        '🇱 ',
                        '🇲 ',
                        '🇳 ',
                        '🇴 ',
                        '🇵 ',
                        '🇶 ',
                        '🇷 ',
                        '🇸 ',
                        '🇹 ',
                        '🇺 ',
                        '🇻 ',
                        '🇼 ',
                        '🇽 ',
                        '🇾 ',
                        '🇿'
                    ]
                )
            });
        },

        strReplace: function (e, t, a) {
            var r;

            if (t.length == a.length) {
                for (var n = 0; n < t.length; n++) {
                    r = new RegExp(t[n], 'g');
                    e = e.replace(r, a[n]);
                }

                return e;
            }

            alert('find 和 replace 數量不一致');
        },

        CopyName: function (e) {
            uni.setClipboardData({
                data: e.currentTarget.dataset.name,
                success: function (e) {
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
    background-color: #ffffff;
}
</style>
