<template>
    <view class="cu-custom" :style="'height:' + CustomBar + 'px'">
        <view
            :class="'cu-bar fixed ' + (bgImage != '' ? 'none-bg text-white bg-img' : '') + ' ' + bgColor"
            :style="'height:' + CustomBar + 'px;padding-top:' + StatusBar + 'px;' + (bgImage ? 'background-image:url(+bgImage+)' : '')"
        >
            <view @tap="BackPage" class="action" v-if="isBack">
                <text class="cuIcon-back"></text>
                <slot name="backText"></slot>
            </view>
            <view
                class="action border-custom"
                :style="'width:' + Custom.width + 'px;height:' + Custom.height + 'px;margin-left:calc(750rpx - ' + Custom.right + 'px)'"
                v-if="isCustom"
            >
                <text @tap="BackPage" class="cuIcon-back"></text>
                <text @tap="toHome" class="cuIcon-homefill"></text>
            </view>
            <view class="content" :style="'top:' + StatusBar + 'px'">
                <slot name="content"></slot>
            </view>
            <slot name="right"></slot>
        </view>
    </view>
</template>

<script>
import cuCustom from '@/colorui/components/cu-custom';
var app = getApp();
export default {
    components: {
        cuCustom
    },
    data() {
        return {
            StatusBar: app.globalData.StatusBar,
            CustomBar: app.globalData.CustomBar,
            Custom: app.globalData.Custom
        };
    },
    options: {
        addGlobalClass: true,
        multipleSlots: true
    },
    props: {
        bgColor: {
            type: String,
            default: ''
        },
        isCustom: {
            type: [Boolean, String],
            default: false
        },
        isBack: {
            type: [Boolean, String],
            default: false
        },
        bgImage: {
            type: String,
            default: ''
        }
    },
    methods: {
        BackPage: function () {
            uni.navigateBack({
                delta: 1
            });
        },
        toHome: function () {
            uni.reLaunch({
                url: '/pages/index/index'
            });
        }
    }
};
</script>
<style></style>
