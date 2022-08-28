<template>
    <view>
        <view class="detail">
            <view class="h1">使用说明</view>
            <view class="p">1. 未输入内容前，点击“随机”可随机浏览个性标语</view>
            <view class="p">2. 输入内容后，点击“换人”可切换小人形象</view>
            <view class="p">3. 内容输入长度不得超过40个字符，回车换行可另起一排队伍</view>
            <view class="p">4. 点击“清空”，可清除输入内容</view>
            <view class="p">5. 点击“生成图片”后，长按图片即可选择保存到本地或发送给好友</view>
        </view>
        <button open-type="openGroupProfile" class="but" group-id="这里填写群号">点我加群</button>
        <view class="copy"></view>
    </view>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {}
};
</script>
<style>
.detail {
    padding: 24rpx 32rpx;
}

.detail .h1 {
    height: 64rpx;
    line-height: 64rpx;
    font-size: 36rpx;
    color: #333;
}

.detail .p {
    margin-bottom: 12rpx;
    line-height: 52rpx;
    color: #666;
}

.detail .p .name {
    margin-right: 50rpx;
}
</style>
