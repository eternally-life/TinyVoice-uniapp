<template>
    <view>
        <swiper
            :autoplay="true"
            @change="cardSwiper"
            :circular="true"
            class="card-swiper square-dot"
            duration="500"
            indicatorActiveColor="#0081ff"
            indicatorColor="#8799a3"
            :indicatorDots="false"
            interval="5000"
        >
            <swiper-item :class="cardCur == index ? 'cur' : ''" v-for="(item, index) in swiperList" :key="index">
                <view class="swiper-item">
                    <image mode="aspectFill" :src="item.url" v-if="item.type == 'image'"></image>
                    <video
                        autoplay
                        muted
                        :controls="false"
                        :loop="true"
                        objectFit="cover"
                        poster="https://ws3.sinaimg.cn/large/005BYqpggy1g2m841m6t6j31hc0u0dj7.jpg"
                        :showPlayBtn="false"
                        :src="item.url"
                        v-if="item.type == 'video'"
                    ></video>
                </view>
            </swiper-item>
        </swiper>
        <view class="cu-bar justify-left bg-white">
            <view class="action border-title">
                <text class="text-sub text-blue text-bold">功能大全</text>
                <text class="bg-blue" style="width: 2rem"></text>
            </view>
        </view>
        <view class="padding-left padding right">
            <view class="grid col-3">
                <view @tap="ToCreat" class="padding-xs" data-link="typeface">
                    <view class="padding-tb-xl bg-pink shadow" style="height: 150rpx; border-radius: 20rpx">
                        <view class="justify-center flex text-white">花式字体</view>
                    </view>
                </view>
                <view @tap="ToCreat" class="padding-xs" data-link="fly">
                    <view class="padding-tb-xl bg-yellow shadow" style="height: 150rpx; border-radius: 20rpx">
                        <view class="justify-center flex text-white">装逼翅膀</view>
                    </view>
                </view>
                <view @tap="ToCreat" class="padding-xs" data-link="emojy">
                    <view class="padding-tb-xl bg-cyan shadow" style="height: 150rpx; border-radius: 20rpx">
                        <view class="justify-center flex text-white">表情字符</view>
                    </view>
                </view>

                <view @tap="ToCreat" class="padding-xs" data-link="tel">
                    <view class="padding-tb-xl bg-green shadow" style="height: 150rpx; border-radius: 20rpx">
                        <view class="justify-center flex text-white">电话号码</view>
                    </view>
                </view>
                <view @tap="ToCreat" class="padding-xs" data-link="color">
                    <view class="padding-tb-xl bg-blue shadow" style="height: 150rpx; border-radius: 20rpx">
                        <view class="justify-center flex text-white">彩色昵称</view>
                    </view>
                </view>
                <view @tap="ToCreat" class="padding-xs" data-link="word">
                    <view class="padding-tb-xl bg-orange shadow" style="height: 150rpx; border-radius: 20rpx">
                        <view class="justify-center flex text-white">文字表情</view>
                    </view>
                </view>
            </view>
        </view>
        <ad unit-id="167d031bb567765affeb9bcb0e974651"></ad>
        <view class="cu-bar justify-left bg-white">
            <view class="action border-title">
                <text class="text-sub text-blue text-bold">热火推荐</text>
                <text class="bg-blue" style="width: 2rem"></text>
            </view>
        </view>
        <view class="cu-list menu-avatar">
            <view @tap="ToCreat" class="cu-item" data-link="screaming">
                <view class="cu-avatar radius lg bg-white" style="background-image: url(../images/anquan.png)"></view>
                <view class="content">
                    <view class="text-grey">尖叫字</view>
                    <view class="text-gray text-sm flex">
                        <text class="text-cut">
                            <text></text>
                            快速生成尖叫字体
                        </text>
                    </view>
                </view>
                <view class="action">
                    <view class="text-blue text-xl">
                        <text class="icon-appreciatefill"></text>
                    </view>
                </view>
            </view>
            <view @tap="ToCreat" class="cu-item" data-link="cut">
                <view class="cu-avatar radius lg bg-white" style="background-image: url(../images/aixin.png)"></view>
                <view class="content">
                    <view class="text-grey">九宫格切图</view>
                    <view class="text-gray text-sm flex">
                        <text class="text-cut">
                            <text></text>
                            快速生成九宫格朋友圈逼图
                        </text>
                    </view>
                </view>
                <view class="action">
                    <view class="text-orange text-xl">
                        <text class="icon-likefill"></text>
                    </view>
                </view>
            </view>
            <view @tap="ToCreat" class="cu-item" data-link="combine">
                <view class="cu-avatar radius lg bg-white" style="background-image: url(../images/rongyu.png)"></view>
                <view class="content">
                    <view class="text-grey">多图频接</view>
                    <view class="text-gray text-sm flex">
                        <text class="text-cut">
                            <text></text>
                            支持横向和竖直图片合并
                        </text>
                    </view>
                </view>
                <view class="action">
                    <view class="text-green text-xl">
                        <text class="icon-hotfill"></text>
                    </view>
                </view>
            </view>
        </view>
        <view class="cu-bar justify-left bg-white">
            <view class="action border-title">
                <text class="text-sub text-blue text-bold">特色功能</text>
                <text class="bg-blue" style="width: 2rem"></text>
            </view>
        </view>
        <view class="cu-list menu card-menu">
            <view @tap="ToCreat" class="cu-item arrow" data-link="blank">
                <view class="content">
                    <text class="icon-favorfill text-purple"></text>
                    <text class="text-grey">透明昵称</text>
                </view>
                <view class="action">
                    <text class="text-grey text-sm">微信透明昵称，透明签名素材</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import cuCustom from '@/colorui/components/cu-custom';
var t = null;
export default {
    components: {
        cuCustom
    },
    data() {
        return {
            cardCur: 0,

            swiperList: [
                {
                    id: 5,
                    type: 'image',
                    url: '/static/images/110404-1521083044b19d.jpg'
                }
            ],

            DotStyle: '',
            towerStart: '',
            direction: ''
        };
    },
    onLoad: function () {
        this.towerSwiper('swiperList');
    },
    onShareAppMessage: function () {
        var t = require('../../7FF9148756B80DDF199F7C80BAACE943.js');

        return {
            title: t.title,
            path: '/subpages_toolkit/index/index',
            imageUrl: t.url
        };
    },
    methods: {
        DotStyleFun: function (t) {
            this.setData({
                DotStyle: t.detail.value
            });
        },

        cardSwiper: function (t) {
            this.setData({
                cardCur: t.detail.current
            });
        },

        towerSwiper: function (t) {
            for (var e = this[t], i = 0; i < e.length; i++) {
                e[i].zIndex = parseInt(e.length / 2) + 1 - Math.abs(i - parseInt(e.length / 2));
                e[i].mLeft = i - parseInt(e.length / 2);
            }

            this.setData({
                swiperList: e
            });
        },

        towerStartFun: function (t) {
            this.setData({
                towerStart: t.touches[0].pageX
            });
        },

        towerMove: function (t) {
            this.setData({
                direction: t.touches[0].pageX - this.towerStart > 0 ? 'right' : 'left'
            });
        },

        towerEnd: function (t) {
            var e = this.direction;
            var i = this.swiperList;
            if ('right' == e) {
                for (var a = i[0].mLeft, n = i[0].zIndex, r = 1; r < i.length; r++) {
                    i[r - 1].mLeft = i[r].mLeft;
                    i[r - 1].zIndex = i[r].zIndex;
                }

                i[i.length - 1].mLeft = a;
                i[i.length - 1].zIndex = n;
                this.setData({
                    swiperList: i
                });
            } else {
                for (var s = i[i.length - 1].mLeft, d = i[i.length - 1].zIndex, h = i.length - 1; h > 0; h--) {
                    i[h].mLeft = i[h - 1].mLeft;
                    i[h].zIndex = i[h - 1].zIndex;
                }

                i[0].mLeft = s;
                i[0].zIndex = d;
                this.setData({
                    swiperList: i
                });
            }
        },

        ToCreat: function (t) {
            uni.navigateTo({
                url: '../creat/' + t.currentTarget.dataset.link + '/' + t.currentTarget.dataset.link
            });
        }
    }
};
</script>
<style>
.tower-swiper .tower-item {
    transform: scale(calc(0.5 + var(--index) / 10));
    margin-left: calc(var(--left) * 100rpx - 150rpx);
    z-index: var(--index);
}

page {
    background-color: #ffffff;
}

.box {
    margin: 20rpx 0;
}

.box view.cu-bar {
    margin-top: 20rpx;
}
</style>
