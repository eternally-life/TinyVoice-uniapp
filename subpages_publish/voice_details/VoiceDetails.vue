<template>
  <view class="small_voice_wrap" :style="{ height: windowHeight + 'px' }">
    <view class="voice_item">
      <view class="userinfo">
        <view class="user_left">
          <view class="user_avatar">
            <image :src="currentShowVoice.avatar" mode="aspectFill" />
          </view>
          <view class="user_box">
            <view class="name">{{ currentShowVoice.nickName }}</view>
            <view class="public_time">{{
                currentShowVoice.createTime
                  ? calculateTime(currentShowVoice.createTime)
                  : '未知'
            }}</view>
          </view>
        </view>
        <view class="user_right">
          <!-- <text>+ 关注</text> -->
        </view>
      </view>
      <view class="voice_content">
        <text>{{ currentShowVoice.content }}</text>
      </view>
      <view class="voice_imgs" v-if="currentShowVoice.images.length !== 0">
        <u-album :urls="currentShowVoice.images" multipleSize="223rpx"></u-album>
      </view>
      <view class="function_btns">
        <view class="btn_collection">
          转发：
          0
        </view>
        <view class="btn_like" @click="likeThisVoice()">
          喜欢：
          {{ currentShowVoice.likeNum }}
        </view>
      </view>
    </view>
    <view class="comments_wrap" :style="{ minHeight: windowHeight - 100 + 'px' }">
      <view class="comments_title">
        <view class="comments_border"></view>
        <view class="comments_content">评论</view>
      </view>
      <view class="user_ack_wrap">
        <view class="not_reply" v-if="
          currentShowVoice.replyList.length === 0 &&
          currentReply.length === 0
        ">暂无评论</view>
        <!-- 临时发布作为展示的评论 -->
        <view class="user_ack_item" v-for="(reply, index) in currentReply" :key="index">
          <view class="ack_left">
            <view class="ack_avatar">
              <image :src="userinfo.avatar" mode="aspectFill" />
            </view>
          </view>
          <view class="ack_center">
            <text class="name">{{ userinfo.nickName }}</text>
            <text class="content">{{ reply.content }}</text>
            <view class="image" v-if="reply.image !== '' && reply.image !== null && reply.image !== undefined">
              <image :src="reply.image" mode="aspectFill" @click="showFullSceenImage(reply.image)" />
            </view>
            <view class="time">
              <view>{{ reply.createTime ? calculateTime(reply.createTime) : '未知' }}</view>
              <view>回复</view>
            </view>
          </view>
          <view class="ack_right">
          </view>
        </view>
        <!-- 接口获取的评论 -->
        <view class="user_ack_item" v-for="reply in currentShowVoice.replyList" :key="reply.replyId">
          <view class="ack_left">
            <view class="ack_avatar">
              <image :src="reply.avatar" mode="aspectFill" />
            </view>
          </view>
          <view class="ack_center">
            <text class="name">{{ reply.nickName }}</text>
            <text class="content">{{ reply.content }}</text>
            <view class="image" v-if="reply.image !== '' && reply.image !== null">
              <image :src="reply.image" mode="aspectFill" @click="showFullSceenImage(reply.image)" />
            </view>
            <view class="time">
              <view>{{ reply.createTime ? calculateTime(reply.createTime) : '未知' }}</view>
              <view>回复</view>
            </view>
          </view>
          <view class="ack_right">
          </view>
        </view>
      </view>
    </view>

    <view class="comments_input">
      <u-input class="input" placeholder="做桂电人，讲桂电话" border="surround" clearable shape="circle"
        placeholderStyle="color:#60C5BA" color="#60C5BA" maxlength="100" @confirm="sendVoiceReply" v-model="replyText">
        <template slot="suffix">
          <view class="input_right">
            <u-button :customStyle="customStyle" size="small" @click="sendVoiceReply">发送</u-button>
          </view>
        </template>
      </u-input>
    </view>
  </view>
</template>

<script>
import { communityTinybbsReplysave_Post, communityTinybbsLike_Get } from '@/api/社区模块/微音论坛.js'
export default {
  data() {
    return {
      windowHeight: null,
      currentShowVoice: {
        images: [],
      },
      replyObj: {
        image: null,
        oppositeUserId: null,
        oppositeAvatar: null,
        text: null,
        oppositeNickName: null,
        bbsId: null,
      },
      replyText: '',
      userinfo: {
        avatar: '',
        nickName: '',
      },
      currentReply: [],
    }
  },
  mounted() {
    this.windowHeight = getApp().globalData.windowHeight
    if (getApp().globalData.wxUserInfo.avatar) {
      const { avatar, nickName } = getApp().globalData.wxUserInfo
      this.userinfo.nickName = nickName
      this.userinfo.avatar = avatar
    } else {
      uni.getStorage({
        key: 'wxUserInfo',
        success: (res) => {
          const { avatar, nickName } = res.data
          this.userinfo.nickName = nickName
          this.userinfo.avatar = avatar
        },
        error: () => {
          uni.$u.toast('获取用户信息错误')
        },
      })
    }
  },
  onLoad() {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptVoiceData', ({ data }) => {
      console.log(data);
      this.currentShowVoice = data
      this.currentShowVoice.replyList && this.currentShowVoice.replyList.reverse()
    })
  },
  methods: {
    async sendVoiceReply() {
      if (this.replyText === '') {
        uni.showToast({
          title: '消息不能为空',
          icon: 'none'
        })
        return
      }
      const { bbsId } = this.currentShowVoice
      const res = await communityTinybbsReplysave_Post({
        bbsId,
        content: this.replyText,
        // image: '',
      })
      console.log(res);
      //有问题
      if (res.data.code === 200) {
        uni.$emit('refresh')
        this.currentReply = [
          {
            createTime: new Date(),
            content: this.replyText,
            likeNum: 0,
            image: ''
          },
          ...this.currentReply,
        ]
        this.replyText = ''
      }
    },
    //点赞某个微音❤
    async likeThisVoice() {
      const res = await communityTinybbsLike_Get({
        tinyBbsId: this.currentShowVoice.bbsId,
      })
      if (res.data.msg === '取消点赞') {
        //已经点过赞了
        this.currentShowVoice.likeNum--
      } else {
        //点赞
        this.currentShowVoice.likeNum++
        uni.$emit('refresh')
      }
    },
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
  props: {
    customStyle: {
      type: Object,
      default: {
        background: '#60C5BA',
        color: '#fff',
        borderRadius: '40rpx',
      },
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

    &:nth-child(n + 2) {
      margin-top: 30rpx;
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

        text {
          color: #5db4ab;
          background: #eff9f8;
          padding: 9rpx 25rpx;
          border-radius: 30rpx;
        }
      }
    }

    .voice_content {
      padding: 20rpx 20rpx;
      color: #4a4a4a;

      text {
        display: inline-block;
      }
    }

    .voice_imgs {
      width: 100%;
      min-height: 218rpx;
    }

    .function_btns {
      display: flex;
      justify-content: space-between;
      padding: 30rpx;

      .btn_collection {
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
    }
  }

  .comments_wrap {
    padding: 30rpx;
    margin-bottom: 70rpx;
    margin-top: 30rpx;
    background: #fff;
    box-sizing: border-box;

    .comments_title {
      display: flex;
      align-items: center;

      .comments_border {
        width: 8rpx;
        height: 50rpx;
        background: #2dc1cf;
        border-top-left-radius: 10rpx;
        border-top-right-radius: 10rpx;
        border-bottom-left-radius: 10rpx;
        border-bottom-right-radius: 10rpx;
      }

      .comments_content {
        color: #4a4a4a;
        margin-left: 10rpx;
      }
    }

    .user_ack_wrap {
      .user_ack_item {
        display: flex;
        align-items: flex-start;
        min-height: 140rpx;

        &:nth-child(n + 1) {
          margin-top: 30rpx;
        }

        .ack_left {
          .ack_avatar {
            width: 70rpx;
            height: 70rpx;
            background: #d1d1d1;
            border-radius: 50%;

            image {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
        }

        .ack_center {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          margin-left: 30rpx;

          .image {
            padding: 10rpx 0 20rpx 0;

            image {
              width: 150rpx;
              max-height: 150rpx;
            }
          }

          .name {
            color: #707070;
            font-size: 30rpx;
            min-height: 40rpx;
          }

          .content {
            color: #4a4a4a;
            font-size: 30rpx;
            margin: 10rpx 0;
          }

          .time {
            color: #4a4a4a;
            font-size: 26rpx;
            display: flex;
            justify-content: space-between;
            width: 550rpx;

            view {
              &:nth-child(2) {
                border-radius: 8rpx;
                color: #707070;
                padding: 0 8rpx;
                font-size: 24rpx;
                background: #F3F3F3;
              }
            }
          }
        }

        .ack_right {}
      }
    }
  }

  .comments_input {
    padding: 0 30rpx;
    position: fixed;
    bottom: 0rpx;
    left: 0;
    right: 0rpx;
    z-index: 9999;
    background: #EFF9F8;

    i {
      color: #69c8be;
      font-size: 60rpx;
    }

    .input_right {
      display: flex;
      align-items: center;
    }
  }
}
</style>

<style lang="scss">
.u-input {
  background: #eff9f8 !important;
  border: none;
}
</style>