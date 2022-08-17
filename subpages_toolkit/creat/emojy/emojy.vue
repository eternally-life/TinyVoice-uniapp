<template>
    <view class="bg-black">
        <view class="padding">
            <view @tap="CopyLink" class="cu-form-group bg-white" style="border-radius: 20rpx">
                <textarea :disabled="modalName != null" maxlength="-1" :value="textareaValue"></textarea>
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
        <scroll-view scrollY class="bg-white" style="height: calc(100% - 370rpx); position: fixed; bottom: 0; left: 0">
            <view class="bottom-change-list">
                <view class="swiper-tab" style="white-space: nowrap; display: flex">
                    <view @tap="changeTab" :class="'swiper-tab-item ' + (activeIndex == 0 ? 'active' : '')" data-index="0">表情库</view>
                    <view @tap="changeTab" :class="'swiper-tab-item ' + (activeIndex == 1 ? 'active' : '')" data-index="1">字符库</view>
                </view>
                <swiper @change="swiperTab" :current="activeIndex" style="margin-top: 70rpx">
                    <swiper-item>
                        <!-- parse <template is="ad" data></template> -->
                        <block name="ad">
                            <view></view>
                        </block>
                        <view v-for="(i, index) in bqdata" :key="index">
                            <view class="zf__title">{{ i.class }}</view>

                            <view class="zf__box">
                                <button @tap="addText" :id="j" v-for="(j, index1) in i.datalist" :key="index1">{{ j }}</button>
                            </view>

                            <view class="clear"></view>
                        </view>
                    </swiper-item>
                    <swiper-item>
                        <view class="zf-li" v-for="(i, index) in zfdata" :key="index">
                            <view class="zf__title">{{ i.class }}</view>

                            <view class="zf__box">
                                <button @tap="addText" :id="j" v-for="(j, index1) in i.datalist" :key="index1">{{ j }}</button>
                            </view>

                            <view class="clear"></view>
                        </view>
                    </swiper-item>
                </swiper>
            </view>
        </scroll-view>
    </view>
</template>

<script>
import cuCustom from '@/colorui/components/cu-custom';
var t = require('../../../74DFF18556B80DDF12B999825B7CE943.js');

var a = require('../../../601E039756B80DDF06786B90E78CE943.js');

export default {
    components: {
        cuCustom
    },
    data() {
        return {
            textareaValue: '点击下方内容输入，完成后点我复制',
            zfdata: '',
            bqdata: '',
            scrollTop: 0,
            activeIndex: '',
            modalName: '',

            i: {
                class: '',
                datalist: []
            },

            j: ''
        };
    },
    onLoad: function (e) {
        this.setData({
            zfdata: t,
            bqdata: a
        });
    },
    onHide: function () {},
    onUnload: function () {},
    onShareAppMessage: function () {
        var t = require('../../../7FF9148756B80DDF199F7C80BAACE943.js');

        return {
            title: t.title,
            path: '/pages/index/index',
            imageUrl: t.url
        };
    },
    methods: {
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

        clearInput: function () {
            this.current = null;
            this.setData({
                scrollTop: 0,
                textareaValue: ''
            });
        },

        changeTab: function (t) {
            var a = t.target.dataset.index;
            this.setData({
                activeIndex: a
            });
        },

        swiperTab: function (t) {
            var a = t.detail.current;
            this.setData({
                activeIndex: a
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
page {
    background-color: #000000;
}

.bottom-change-list {
    font-size: 24rpx;
    width: 100%;
    overflow: hidden;
}

.swiper-tab {
    position: fixed;
    left: 0;
    z-index: 1;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    background: #ffffff;
}

.swiper-tab-item {
    flex: 1;
    text-align: center;
    font-size: 34rpx;
    height: 90rpx;
    color: black;
    line-height: 90rpx;
}

.active {
    border-bottom: 2px solid black;
}

swiper {
    text-align: center;
    display: flex;
    justify-content: center;
    align-content: center;
    height: 100vh;
    margin-top: 90rpx;
}

swiper-item {
    overflow: scroll;
}

.active {
    color: black;
}

.zf__title {
    margin: 20rpx;
    text-align: center;
    line-height: 24rpx;
    font-size: 24rpx;
    color: #000000;
    display: block;
    width: 100%;
}

.zf__box {
    overflow: scroll;
    float: left;
}

.zf__box button {
    position: relative;
    display: inline-block;
    height: 84rpx;
    width: 84rpx;
    padding: 0;
    margin: 5rpx;
    float: left;
    background-color: #fff;
    border-radius: 4px;
    font-size: 36rpx;
    border: 0;
    box-shadow: 0 1px 3px rgba(223, 223, 223, 0.5);
}
</style>
