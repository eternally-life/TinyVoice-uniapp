<template>
    <view class="bg-black">
        <view class="padding">
            <view class="cu-form-group bg-white" style="border-radius: 20rpx">
                <textarea
                    @input="bindKeyInput"
                    
                    maxlength="-1"
                    placeholder="请输入需转换的文字，然后点击下方类别自动会进行转换"
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
            <view class="bottom-change-list" v-for="(i, index) in flydata" :key="index">
                <view class="bottom-change-list__title">{{ i.class }}</view>

                <view class="bottom-change-list__box">
                    <button @tap="changeText" :id="i" v-for="(i, index1) in i.datalist" :key="index1">{{ i }}</button>
                </view>
            </view>
        </scroll-view>
    </view>
</template>

<script>
import cuCustom from '@/colorui/components/cu-custom';
var t = require('../../../data/14F192A656B80DDF7297FAA1889CE943.js');

export default {
    components: {
        cuCustom
    },
    data() {
        return {
            flydata: '',
            scrollTop: 0,
            textareaValue: '',
            modalName: '',

            i: {
                class: '',
                datalist: []
            }
        };
    },
    onLoad: function (a) {
        this.setData({
            flydata: t
        });
    },
    onReady: function () {},
    onShow: function () {},
    onHide: function () {},
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
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
                if (t.target.id) {
                    var a = t.target.id.replace(/昵称/, this.current);
                    this.setData({
                        textareaValue: a
                    });
                    this.CopyLink();
                }
            } else {
                uni.showToast({
                    title: '昵称不能为空',
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
page {
    background-color: #000000;
}

.bottom-change-list {
    font-size: 24rpx;
    width: 100%;
    overflow: hidden;
}

.bottom-change-list__title {
    margin-top: 10rpx;
    text-align: center;
    line-height: 24rpx;
    font-size: 24rpx;
    color: #666;
}

.bottom-change-list__box {
    overflow: scroll;
    padding: 20rpx;
}

.bottom-change-list__box button {
    position: relative;
    display: inline-block;
    margin-top: 12rpx;
    margin-right: 20rpx;
    height: 80rpx;
    line-height: 80rpx;
    width: calc((50% - 20rpx) + (20rpx / 2));
    background-color: #fff;
    border-radius: 4px;
    font-size: 26rpx;
    border: 0;
    padding: 0;
    overflow: hidden;
    text-align: center;
    box-shadow: 0 1px 3px rgba(223, 223, 223, 0.5);
}

.bottom-change-list__box button:nth-child(2n) {
    margin-right: 0;
}
</style>
