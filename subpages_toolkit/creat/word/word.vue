<template>
    <view class="bg-black">
        <view class="padding">
            <view @tap="CopyLink" class="cu-form-group bg-white" style="border-radius: 20rpx">
                <textarea  maxlength="-1" :value="textareaValue"></textarea>
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
            <view class="bottom-change-list" v-for="(i, index) in worddata" :key="index">
                <view class="bottom-change-list__title">{{ i.class }}</view>

                <view class="bottom-change-list__box">
                    <button @tap="addText" :id="i" v-for="(i, index1) in i.datalist" :key="index1">{{ i }}</button>
                </view>
            </view>
        </scroll-view>
    </view>
</template>

<script>
import cuCustom from '@/colorui/components/cu-custom';
var t = require('@/data/DF8CB79756B80DDFB9EADF90EECCE943.js');

export default {
    components: {
        cuCustom
    },
    data() {
        return {
            textareaValue: '',
            worddata: '',
            scrollTop: 0,
            modalName: '',

            i: {
                class: '',
                datalist: []
            }
        };
    },
    onLoad: function (a) {
        this.setData({
            worddata: t
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
        clearInput: function () {
            this.current = null;
            this.setData({
                scrollTop: 0,
                textareaValue: ''
            });
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
        },

        addText: function (t) {
            if ('点击下方内容输入，完成后点我复制' != this.textareaValue) {
                if (t.target.id) {
                    var a = this.textareaValue + t.target.id;
                    this.setData({
                        textareaValue: a
                    });
                }
            } else if (t.target.id) {
                var e = t.target.id;
                this.setData({
                    textareaValue: e
                });
            }
        }
    }
};
</script>
<style>
/* @import '../fly/fly.css'; */
</style>
