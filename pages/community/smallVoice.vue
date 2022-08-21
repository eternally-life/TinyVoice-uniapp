<template>
  <view class="small_voice_wrap">
    <u-sticky bgColor="#fff">
      <u-tabs :list="menuList" lineColor="#31B6C3" :activeStyle="{
        color: '#31B6C3',
        transform: 'scale(1.05)'
      }" :inactiveStyle="{
  color: '#606266',
  transform: 'scale(0.9)'
}" @change="tabsChange"></u-tabs>
    </u-sticky>
    <view class="skeleton_wrap" style="padding: 30rpx" v-show="isLoading">
      <u-skeleton :loading="isLoading" avatar rows="3"></u-skeleton>
    </view>
    <u-empty mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png"
      v-if="smallVoiceData.length === 0 && !isLoading">
    </u-empty>
    <view class="voice_item" v-for="(item, index) in smallVoiceData" :key="item.bbsId">
      <view class="userinfo" @click="enterVoiceDetail(index)">
        <view class="user_left">
          <view class="user_avatar">
            <image :src="item.avatar" mode="aspectFill" />
          </view>
          <view class="user_box">
            <view class="name">{{ item.nickName }}</view>
            <view class="public_time">{{
                item.createTime ? calculateTime(item.createTime) : '未知'
            }}</view>
          </view>
        </view>
        <view class="user_right">
          <i class="iconfont" v-if="item.type === 5">&#xe7e9;</i>
          <i class="iconfont is_like" v-if="item.type === 4">&#xe86f;</i>
          <i class="iconfont" v-if="item.type === 3">&#xe630;</i>
          <i class="iconfont" v-if="item.type === 6">&#xe8ef;</i>
          <view class="supermarket_price" v-if="item.type === 2">￥<view class="price">{{ item.price.toFixed(2) }}</view></view>
        </view>
      </view>
      <view class="voice_content" @click="enterVoiceDetail(index)">
        <!-- <text>{{ item.content }}</text> -->
        <u-parse :content="item.content"></u-parse>
        <block v-if="item.audio">
          <audio :src="item.audio" controls @click.stop="" name="倾情朗诵" :author="item.nickName"
            :poster="item.avatar"></audio>
        </block>
      </view>
      <view class="voice_imgs" v-if="item.images && item.images.length !== 0">
        <u-album :urls="item.images" multipleSize="220rpx" singleMode="aspectFill"></u-album>
      </view>
      <view class="function_btns">
        <view class="btn_share">
          <button open-type="share">分享</button>
        </view>
        <view class="btn_collection" @click="shareVoice">
          <i class="iconfont icon-zhuanfa" style="font-size:40rpx;"></i>
        </view>
        <view class="btn_comments" @click="enterVoiceDetail(index)">
          <i class="iconfont icon-pinglun" style="font-size:40rpx;"></i>
          {{ item.replyList ? item.replyList.length : '0' }}
        </view>
        <view class="btn_like" @click="likeThisVoice(item.bbsId, index)">
          <block v-if="!item.isLike"><i class="iconfont" style="font-size:40rpx;">&#xe761;</i></block>
          <block v-if="item.isLike"><i class="iconfont" style="font-size:40rpx;color:#F75F5E">&#xe86f;</i></block>
          {{ item.likeNum }}
        </view>
      </view>
      <view class="comments_wrap" @click="enterVoiceDetail(index)" v-if="item.replyList && item.replyList.length !== 0">
        <view class="comments_item" v-for="(reply, index) in item.replyList" :key="index"
          :class="index >= showReplyNumber ? 'hidden' : ''">
          <view class="content">
            <text class="name">{{ reply.nickName }}：</text>
            <view class="content_right">
              <text class="desc">
                {{ reply.content }}
              </text>
              <view class="image" v-if="reply.image !== '' && reply.image !== null && reply.image !== undefined">
                <image :src="reply.image" @click="showFullSceenImage(reply.image)" mode="aspectFill" />
              </view>
            </view>
          </view>
        </view>
        <view class="show_more_btn" v-if="item.replyList.length > 2 && showReplyNumber === 2"
          @click.stop="showReplyNumber = 10">
          展示更多
        </view>
      </view>
    </view>

    <view class="loadmore_wrap" v-if="smallVoiceData.length !== 0"
      @click="() => { isNoMore ? '' : getSmallVoiceData() }">
      <text>{{ isNoMore ? '到底啦' : '加载更多' }}</text>
    </view>

    <view class="publish_btn">
      <u-button icon="chat" shape="circle" iconColor="#31B6C3" @click="publishVoice"></u-button>
    </view>
  </view>
</template>

<script>
import {
  communityTinybbsPage_Get,
  communityTinybbsLike_Get
} from '@/api/社区模块/微音论坛.js'
export default {
  data() {
    return {
      windowHeight: null,
      smallVoiceData: [],
      isLoading: true,
      showReplyNumber: 2,
      userinfo: {},
      currentPageNumber: 1,
      voiceType: 1,
      menuList: [
        {
          name: '微音',
        },
        {
          name: '失物招领',
          badge: {
            isDot: false
          }
        },
        {
          name: '表白',
        },
        {
          name: '隐藏',
        },
      ],
      isNoMore: false
    }
  },
  onShareTimeline() {
    // 用户点击右上角分享
  },
  // 用户点击右上角分享
  onShareAppMessage(res) {
    // #ifdef MP-QQ
    qq.showShareMenu({
      showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment'],
    })
    // if(res.from === 'button'){
    // 	return {
    // 		title: '来自button的asdaw转发',
    // 	}
    // }
    // #endif
    console.log(res)
    // from:'menu'
    // if(res.from === 'button'){
    // 	return {
    // 		title: '来自button的转发',
    // 	    page: '/pages/video/video',
    // 	    imageUrl: '/static/images/nvsheng.jpg'
    // 	}
    // }else {
    // 	return {
    // 		title: '来自menu的转发',
    // 	    page: '/pages/video/video',
    // 	    imageUrl: '/static/images/nvsheng.jpg'
    // 	}
    // }
  },
  onLoad() {
    uni.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline'],
      success: (res) => {
        console.log(res)
      },
      fail: (err) => {
        console.log(err)
      },
    })
  },
  mounted() {
    this.windowHeight = getApp().globalData.windowHeight
    //获取微音内容
    this.getSmallVoiceData()
    uni.$on('refresh', () => {
      this.currentPageNumber = 1
      this.smallVoiceData = []
      this.getSmallVoiceData()
    })
  },
  methods: {
    //下拉刷新
    pullDownRefresh() {
      this.smallVoiceData = []
      this.currentPageNumber = 1
      this.voiceType = 1
      this.getSmallVoiceData()
    },
    //发送请求
    async getSmallVoiceData() {
      try {
        if (Object.keys(this.userinfo).length === 0) {
          this.getUserinfo()
        }
        const res = await communityTinybbsPage_Get({
          pageNum: this.currentPageNumber,
          pageSize: 10,
          type: this.voiceType === 1 ? null : this.voiceType
        })
        if (res.data.data.records.length === 0) {
          this.isNoMore = true
        }
        res.data.data.records.map((v) => {
          if (v.imgList !== '' && v.imgList !== null && v.imgList.length !== 0) {
            v.images = []
            v.imgList.forEach(item => {
              v.images.push(item.url)
            })
          }
          v.isLike = false
          //判断微音是否被点赞👇
          if (v.likeList) {
            v.likeList.forEach((info) => {
              if (this.userinfo.userId === info.userId) {
                v.isLike = true
              }
            })
          }
          return v
        })
        this.currentPageNumber++
        this.smallVoiceData = [...this.smallVoiceData, ...res.data.data.records]
        this.isLoading = false
      } catch (error) {
        console.log(error)
      }
    },
    //点赞某个微音❤
    async likeThisVoice(bbsId, index) {
      const res = await communityTinybbsLike_Get({
        tinyBbsId: bbsId,
      })
      if (res.data.msg === '取消点赞') {
        //已经点过赞了
        this.smallVoiceData[index].likeNum--
        this.smallVoiceData[index].isLike = false
      } else {
        //点赞
        this.smallVoiceData[index].likeNum++
        this.smallVoiceData[index].isLike = true
      }
    },
    //查看微音详情
    enterVoiceDetail(index) {
      uni.navigateTo({
        url: '/subpages_publish/voice_details/voiceDetails',
        success: (res) => {
          res.eventChannel.emit('acceptVoiceData', {
            data: this.smallVoiceData[index],
          })
        },
      })
    },
    //获取全局个人信息
    getUserinfo() {
      this.userinfo = getApp().globalData.wxUserInfo
    },
    //发布跳转
    publishVoice() {
      uni.navigateTo({
        url: '/subpages_publish/publishVoice/publishVoice',
      })
    },
    //标签更换
    async tabsChange(payload) {
      if (payload.index === 0) {
        this.voiceType = 1
      }
      if (payload.index === 1) {
        this.voiceType = 2
        this.menuList[1].badge.isDot = false
      }
      if (payload.index === 2) {
        this.voiceType = 4
      }
      if (payload.index === 3) {
        this.voiceType = 6
      }
      this.isLoading = true
      this.isNoMore = false
      this.smallVoiceData = []
      this.currentPageNumber = 1
      await this.getSmallVoiceData()
    },
    //显示全屏图像
    showFullSceenImage(url) {
      uni.previewImage({
        urls: [url],
        indicator: 'none'
      })
    }
  },
  computed: {
    calculateTime() {
      return (time) => {
        if (new Date().getTime() - time > 1000 * 60 * 60 * 24 * 2) {
          return uni.$u.date(time, 'yyyy-mm-dd')
        } else {
          return uni.$u.timeFrom(time)
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.small_voice_wrap {
  background: #f5f5f5;

  .voice_item {
    padding: 30rpx 30rpx;
    background: #fff;
    overflow: hidden;

    &:nth-child(n + 4) {
      margin-top: 30rpx;
    }

    &:last-child {
      padding-bottom: 0 !important;
      background: #000;
    }

    .userinfo {
      display: flex;
      justify-content: space-between;

      .user_left {
        flex: 1;
        display: flex;

        .user_avatar {
          width: 100rpx;
          height: 100rpx;
          background: #d1d1d1;
          border-radius: 50%;

          image {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }

        .user_box {
          color: #848484;
          margin-left: 30rpx;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;

          .name {}

          .public_time {
            font-size: 26rpx;
          }
        }
      }

      .user_right {
        font-size: 28rpx;
        padding-top: 10rpx;
        width: fit-content;
        position: relative;

        .supermarket_price{
          padding: 0 10rpx;
          border-radius: 10rpx;
          background: #ea605e;
          color: #fff;
          font-weight: normal;
          display: flex;
          align-items: flex-end;
          font-size: 28rpx;

          .price{
            font-size: 24rpx;
            font-weight: 100;
            &::first-letter{
              font-size: 28rpx;
            }
          }
          
        }

        .is_like {
          display: block;
          position: absolute;
          top: 50%;
          right: 50%;
          width: 200rpx;
          height: 200rpx;
          z-index: 0;
          pointer-events: none;
          font-size: 500rpx !important;
          transform: translate(-40%, -70%);
          color: #F75F5E33 !important;
        }

        i {
          font-size: 36rpx;
          color: #5db4ab;
        }

        text {
          color: #5db4ab;
          background: #eff9f8;
          padding: 9rpx 25rpx;
          border-radius: 30rpx;
        }

        .special {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
      }
    }

    .voice_content {
      padding: 20rpx 0rpx;
      color: #4a4a4a;
      position: relative;
      z-index: 1;

      audio {
        margin-top: 30rpx;
      }

      text {
        display: inline-block;
      }
    }

    .voice_imgs {
      width: 100%;
      min-height: 218rpx;
      margin-bottom: 30rpx;
    }

    .function_btns {
      display: flex;
      justify-content: space-between;
      padding: 0 30rpx;
      position: relative;

      .btn_collection {
        display: flex;
        align-items: center;

        i {
          padding-right: 10rpx;
        }
      }

      .btn_comments {
        display: flex;
        align-items: center;

        i {
          padding-right: 10rpx;
        }
      }

      .btn_like {
        display: flex;
        align-items: center;

        i {
          padding-right: 10rpx;
        }
      }

      .btn_share {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        opacity: 0;

        button {
          width: 150rpx;
          height: 50rpx;
        }
      }
    }

    .comments_wrap {
      display: flex;
      flex-direction: column;
      background: #c5c5c533;
      border-radius: 5px;
      padding: 10px;
      margin-top: 30rpx;

      .comments_item {
        display: flex;
        color: #000;

        &:nth-child(n + 2) {
          margin-top: 10rpx;
        }

        .content {
          font-size: 26rpx;
          display: flex;
          font-weight: 100;

          .name {
            max-width: 200rpx;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-weight: normal;
            font-size: 26rpx;
          }

          .content_right {
            .image {
              padding: 10rpx 0 20rpx 0;

              image {
                width: 300rpx;
                max-height: 300rpx;
              }
            }

            .desc {}
          }
        }
      }
    }

    .show_more_btn {
      color: #a4a4a4;
      font-size: 28rpx;
      padding: 10rpx 0;
    }
  }

  .loadmore_wrap {
    width: 750rpx;
    text-align: center;
    font-size: 24rpx;
    color: #888888;
    background: #fff;
    padding: 10rpx 0 20rpx 0;
  }

  .publish_btn {
    position: fixed;
    bottom: 30rpx;
    right: 30rpx;
    border-radius: 50%;
  }
}

.hidden {
  display: none !important;
}
</style>
