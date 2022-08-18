<template>
    <view>
        <view class="chat-item">
            <view class="chat-main justify-end flex">
                <view>
                    <view class="chat-centact success">空白昵称素材</view>
                </view>
            </view>
            <open-data class="img-df radius" type="userAvatarUrl"></open-data>
        </view>
        <view class="chat-item chat-left">
            <image class="img-df radius" mode="widthFix" src="https://tinyvoice-oss-cdn.glowxq.com/material/tool/logo.png"></image>
            <view class="chat-main">
                <view>
                    <view @tap="copyAndroid" class="chat-centact">安卓手机点我复制</view>
                </view>
            </view>
        </view>
        <view class="chat-item chat-left">
            <image class="img-df radius" mode="widthFix" src="https://tinyvoice-oss-cdn.glowxq.com/material/tool/logo.png"></image>
            <view class="chat-main">
                <view>
                    <view @tap="copyIos" class="chat-centact">苹果手机点我复制</view>
                </view>
            </view>
        </view>
        <ad unit-id="95a15b722a8061b5790c23cae154b4bf" type="card"></ad>
        <view class="foot-btn">
            <button class="black btn round" openType="share">
                <text class="iconfont icon-share mr-xs"></text>
                分享给好友
            </button>
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
        return {};
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
        copyAndroid: function (t) {
            uni.setClipboardData({
                data: 'ㅤ',
                success: function (t) {
                    uni.getClipboardData({
                        success: function (t) {
                            console.log(t.data);
                            uni.showToast({
                                title: '已复制到粘贴板，粘贴即可使用',
                                icon: 'none',
                                duration: 2000
                            });
                        }
                    });
                }
            });
        },

        copyIos: function (t) {
            uni.setClipboardData({
                data: '',
                success: function (t) {
                    uni.getClipboardData({
                        success: function (t) {
                            console.log(t.data);
                            uni.showToast({
                                title: '已复制到粘贴板，粘贴即可使用',
                                icon: 'none',
                                duration: 2000
                            });
                        }
                    });
                }
            });
        }
    }
};
</script>
<style>
page {
    background: #f1f1f1;
    padding-bottom: 120rpx;
}

.chat-item {
    display: flex;
    padding: 20rpx;
}

.chat-item {
    border: none;
}

.chat-main {
    flex: 1;
    margin-right: 40rpx;
}

.chat-left .chat-main {
    margin-left: 40rpx;
}

.justify-end {
    justify-content: flex-end;
}

.flex {
    display: flex;
}

.chat-centact {
    border-radius: 6rpx;
    padding: 20rpx;
    display: inline-block;
    max-width: 470rpx;
    line-height: 40rpx;
    position: relative;
    background: #fff;
    color: #666;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.success {
    background: #5db85d;
    color: #fff;
}

.success::before {
    border-right-color: #5db85d;
}

.img-df {
    width: 80rpx;
    height: 80rpx;
}

.chat-left .chat-centact::before {
    border-left: 8px solid #333;
    border-right: 0 dotted;
    border-left-color: #fff;
    left: -7px;
    right: initial;
}

.chat-centact::before {
    content: \x22\x22;
    top: 26rpx;
    transform: rotate(180deg);
    right: -7px;
    position: absolute;
    z-index: 100;
    display: inline-block;
    width: 0;
    height: 0;
    vertical-align: middle;
    border-right: 8px solid #333;
    border-bottom: 8px solid transparent;
    border-top: 8px solid transparent;
    border-left: 0 dotted;
    overflow: hidden;
    border-right-color: #fff;
}

.chat-centact text {
    color: #888;
    margin-right: 20rpx;
}

.chat-centact image {
    max-width: 100%;
    display: block;
}

.foot-btn {
    position: fixed;
    width: 100%;
    bottom: 0;
    padding: 20rpx 0;
    background: #f1f1f1;
    z-index: 999;
    display: flex;
    justify-content: center;
}

.btn {
    flex: 1;
    margin: 0 30rpx;
}

.fixed .btn {
    position: fixed;
    bottom: 30rpx;
    right: 30rpx;
    padding: 20rpx 0;
    z-index: 997;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    border-radius: 50%;
}

.fixed .btn text {
    width: 100rpx;
    display: block;
    line-height: 30rpx;
    text-align: center;
    font-size: 24rpx;
}

.black {
    background: #000;
    color: #fff;
}
</style>
