<template>
    <view>
        <view class="list-header" v-if="articleList[0]">
            <view class="list-header-img">
                <image src="https://tiny-voice-prod.oss-cn-shenzhen.aliyuncs.com/staitic/image/list_header_poem.png"></image>
            </view>
            <view @tap="changeSort" class="list-header-sort">
                <span :class="listSort ? 'check' : ''">最新</span>
                <span class="red-dot" v-if="redDot"></span>
                <span class="line">|</span>
                <span :class="listSort ? '' : 'check'">热门</span>
            </view>
        </view>
        <view class="poem-list">
            <!-- template没有找到这个wxml，已注释 -->
            <!-- <template :is="listSort?'itemCardNew':'itemCardHot'" :data="item:item,index:index,sensitive:sensitive,appenv:appenv" v-for="(item,index) in (articleList)" :key="item.id"></template> -->
        </view>
        <view class="util-loadmore" v-if="loadMore">
            <view class="util-loading"></view>
            <view class="util-loadmore-tips">马上就能温暖你的心</view>
        </view>
        <view class="util-loadmore" v-if="nextPage">
            <view class="util-loadmore-tips">- 已无更多记录 -</view>
        </view>
        <!-- parse <template is="shareDialog" :data="isShareDialogShow:isShareDialogShow,shareQuanImage:shareQuanImage,clickShareArticleId:clickShareArticleId,clickShareArticleIndex:clickShareArticleIndex,appenv:appenv"></template> -->
        <block name="shareDialog">
            <view @tap.stop.prevent="hideShareDialog" @touchmove.stop.prevent="disMove" class="share-dialog" v-if="isShareDialogShow">
                <view class="share-image-area">
                    <view class="share-load">
                        <view class="util-loadmore" v-if="!shareQuanImage">
                            <view class="util-loading"></view>
                            <view class="util-loadmore-tips">正在加载海报</view>
                        </view>
                    </view>
                    <view class="share-image">
                        <image mode="aspectFit" :src="shareQuanImage"></image>
                    </view>
                </view>
                <view class="share-dialog-area" v-if="appenv == 'wx'">
                    <view @tap.stop.prevent="clickNull" class="share-to-user" hoverClass="class-hover">
                        <image src="https://tiny-voice-prod.oss-cn-shenzhen.aliyuncs.com/staitic/image/share-user.png"></image>
                        <button openType="share"></button>
                        <view class="share-to-user-text">转发好友</view>
                    </view>
                    <view
                        @tap.stop.prevent="saveShareImage"
                        class="share-to-quan"
                        :data-article-id="clickShareArticleId"
                        :data-article-index="clickShareArticleIndex"
                        hoverClass="class-hover"
                        v-if="!sensitive"
                    >
                        <image src="https://tiny-voice-prod.oss-cn-shenzhen.aliyuncs.com/staitic/image/share-quan.png"></image>
                        <view class="share-to-user-text">保存相册</view>
                    </view>
                </view>
                <view class="share-dialog-area" v-if="appenv == 'qq'">
                    <view @tap.stop.prevent="clickNull" class="share-to-user" hoverClass="class-hover">
                        <image src="https://tiny-voice-prod.oss-cn-shenzhen.aliyuncs.com/staitic/image/share-user-qq.png"></image>
                        <button openType="share"></button>
                        <view class="share-to-user-text">好友/空间</view>
                    </view>
                    <view
                        @tap.stop.prevent="shareToShuo"
                        class="share-to-qq-item"
                        :data-article-id="clickShareArticleId"
                        :data-article-index="clickShareArticleIndex"
                        hoverClass="class-hover"
                    >
                        <image src="https://tiny-voice-prod.oss-cn-shenzhen.aliyuncs.com/staitic/image/share-to-shuo.png"></image>
                        <view class="share-to-user-text">发表说说</view>
                    </view>
                    <view
                        @tap.stop.prevent="saveShareImage"
                        class="share-to-qq-item"
                        :data-article-id="clickShareArticleId"
                        :data-article-index="clickShareArticleIndex"
                        hoverClass="class-hover"
                    >
                        <image src="https://tiny-voice-prod.oss-cn-shenzhen.aliyuncs.com/staitic/image/share-quan.png"></image>
                        <view class="share-to-user-text">保存图片</view>
                    </view>
                </view>
            </view>
        </block>
    </view>
</template>
<script module="mod" lang="wxs" src="../../utils/mod.wxs"></script>
<script>
require('@/data/AF69DFF5BC64A5DFC90FB7F2A9B24571.js');

var e = require('@/data/AE450F94BC64A5DFC823679305A24571.js');

var t = require('@/data/71CC79E6BC64A5DF17AA11E1F0B24571.js');

var app = getApp();
export default {
    data() {
        return {
            userInfo: {},
            logged: false,
            sensitive: app.globalData.sensitive,
            appenv: app.globalData.appEnv,
            articleList: {},
            listSort: false,
            redDot: false,
            loadMore: true,
            nextPage: false,
            isShareDialogShow: false,
            shareQuanImage: '',
            shareUserImage: '',
            clickShareArticleId: 0,
            clickShareArticleIndex: 0
        };
    },
    onShareAppMessage: function (e) {
        uni.reportAnalytics('share_article', {
            share_type: 'friend',
            article_id: this.clickShareArticleId
        });
        var t = Math.round(Math.random() * (app.globalData.shareTextList.length - 1));
        return {
            title: app.globalData.shareTextList[t],
            path: '/pages/index/index?docId=' + this.clickShareArticleId,
            imageUrl: this.shareUserImage
        };
    },
    onLoad: function (t) {
        this.getPoemArticleList(1, e.setting.pageSize);
    },
    onShow: function () {
        t.updateUserInfoToPage(this, app);

        for (var that = this, i = 0; i < that.articleList.length; i++) {
            var r = t.checkIsLiked(that, app, that.articleList[i].id);
            that.articleList[i].isLiked = r;
            that.articleList[i].likeAnim = false;
        }

        that.setData({
            articleList: that.articleList
        });
        var o = uni.getStorageSync('cureRedDotTime');

        if (new Date().getTime() - o > 259200000) {
            console.log('红点时间超过7天，需要展示红点');
            this.setData({
                redDot: true
            });
        }
    },
    onPullDownRefresh: function () {
        this.getPoemArticleList(1, e.setting.pageSize);
    },
    onReachBottom: function () {
        if (this.loadMore) {
            this.getPoemArticleList(this.nextPage, e.setting.pageSize);
        }
    },
    methods: {
        bindGetUserInfo: function (e) {
            if (e.detail.userInfo) {
                t.userLogin(this, app, function (e, t) {
                    uni.navigateTo({
                        url: './publish/publish'
                    });
                });
            }
        },

        changeSort: function () {
            var that = this;
            that.setData({
                listSort: !that.listSort
            });

            if (that.listSort) {
                that.setData({
                    redDot: false
                });
                uni.setStorageSync('cureRedDotTime', new Date().getTime());
            }

            this.getPoemArticleList(1, e.setting.pageSize);
        },

        getPoemArticleList: function (e, i) {
            var r = this.listSort ? 1 : 2;
            t.getArticleList(this, app, e, i, 2, r);
        },

        clickLike: function (e) {
            t.articleLikeClick(this, app, e);
        },

        goArticle: function (e) {
            uni.navigateTo({
                url: '/pages/article/article?docId=' + e.currentTarget.dataset.articleId
            });
            t.submitFormId(e, app);
        },

        disMove: function () {},

        clickNull: function () {
            return true;
        },

        showShareDialog: function (e) {
            var i = e.currentTarget.dataset.articleId;
            var r = e.currentTarget.dataset.articleIndex;
            console.log('articleShareClick', i, r);
            t.doCaptureAndShare(this, app, i, r);
        },

        hideShareDialog: function () {
            this.setData({
                isShareDialogShow: false
            });
        },

        shareToShuo: function (e) {
            t.showBusy('正在获取海报');
            var i = e.currentTarget.dataset.articleId;
            var r = e.currentTarget.dataset.articleIndex;
            console.log('shareToShuoClick', i, r);
            uni.reportAnalytics('share_article', {
                share_type: 'shareShuo',
                article_id: i
            });
            var that = this;
            uni.downloadFile({
                url: that.shareQuanImage,
                success: function (e) {
                    console.log(e);
                    uni.hideLoading();
                    var t = Math.round(Math.random() * (app.globalData.shareTextList.length - 1));
                    qq.openQzonePublish({
                        text: app.globalData.shareTextList[t],
                        media: [
                            {
                                type: 'photo',
                                path: e.tempFilePath
                            }
                        ]
                    });
                },
                fail: function () {
                    uni.hideLoading();
                    console.log('图片下载失败，使用默认文案发说说');
                    qq.openQzonePublish({
                        text: that.articleList[r].content
                    });
                }
            });
        },

        saveShareImage: function (e) {
            t.showBusy('正在保存海报');
            var a = e.currentTarget.dataset.articleId;
            var i = e.currentTarget.dataset.articleIndex;
            console.log('saveShareImageClick', a, i);
            uni.reportAnalytics('share_article', {
                share_type: 'saveImage',
                article_id: a
            });
            var that = this;
            uni.downloadFile({
                url: that.shareQuanImage,
                success: function (e) {
                    console.log(e);
                    uni.saveImageToPhotosAlbum({
                        filePath: e.tempFilePath,
                        success: function (e) {
                            console.log('图片保存成功', e);
                            t.showSuccess('图片保存成功');
                        },
                        fail: function (e) {
                            uni.hideLoading();
                            console.log('图片保存失败', e);
                            uni.showModal({
                                title: '保存失败',
                                content: '图片保存失败，请检查图片保存设置是否打开',
                                confirmText: '前往设置',
                                showCancel: true,
                                success: function (e) {
                                    if (e.confirm) {
                                        console.log('图片保存失败弹窗下，用户点击前往设置');
                                        uni.openSetting();
                                    }
                                }
                            });
                        }
                    });
                },
                fail: function () {
                    uni.hideLoading();
                    console.log('图片下载失败');
                    t.showNetErrorModel('图片下载保存失败，请稍候重试');
                }
            });
        }
    }
};
</script>
<style>
page {
    width: 100%;
    height: 100%;
    background: #87cefa;
    padding: 30rpx;
    box-sizing: border-box;
}

.poem-list {
    width: 100%;
    margin: -20rpx 0 0 0;
}
</style>
