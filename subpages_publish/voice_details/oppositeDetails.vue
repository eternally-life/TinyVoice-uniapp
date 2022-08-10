<template>
  <view class="opposite_details_wrap">
    <view class="voice_item">
      <view class="userinfo">
        <view class="user_left">
          <view class="user_avatar">
            <image :src="currentVoiceOpposite.avatar" mode="aspectFill" />
          </view>
          <view class="user_box">
            <view class="name">{{ currentVoiceOpposite.nickName }}</view>
            <view class="public_time">{{
                currentVoiceOpposite.createTime
                  ? calculateTime(currentVoiceOpposite.createTime)
                  : '未知'
            }}</view>
          </view>
        </view>
        <view class="user_right">
          <!-- <text>+ 关注</text> -->
        </view>
      </view>
      <view class="voice_content">
        <!-- <text>{{ currentShowVoice.content }}</text> -->
        <u-parse :content="currentVoiceOpposite.content"></u-parse>
      </view>
      <!-- <view class="voice_imgs" v-if="currentVoiceOpposite.images && currentVoiceOpposite.images.length !== 0">
        <u-album :urls="currentVoiceOpposite.images" multipleSize="223rpx"></u-album>
      </view> -->
    </view>

    <view class="comments_wrap" :style="{ minHeight: windowHeight - 100 + 'px' }">
      <view class="comments_title">
        <view class="comments_border"></view>
        <view class="comments_content">评论</view>
      </view>
      <view class="user_ack_wrap">
        <view class="not_reply" v-if="
          currentVoiceOpposite.replyLList.length === 0
        ">暂无评论</view>
        <!-- 接口获取的评论 -->
        <view class="user_ack_item" v-for="(reply, index) in currentVoiceOpposite.replyLList" :key="reply.replyId">
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
      <u-input class="input" :placeholder="'回复' + currentVoiceOpposite.nickName + '：'" border="none" clearable
        shape="circle" placeholderStyle="color:#60C5BA" color="#60C5BA" maxlength="100" @confirm="sendVoiceReply"
        v-model="replyText">
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
import { communityTinybbsReplylsave_Post } from '@/api/社区模块/微音论坛.js'
export default {
  onLoad() {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptOppositeData', ({ data }) => {
      console.log(data);
      this.currentVoiceOpposite = data
    })
  },
  mounted() {
    this.windowHeight = getApp().globalData.windowHeight
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
  data() {
    return {
      currentVoiceOpposite: {
      },
      windowHeight: 0,
      replyText: ''
    }
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
      const res = await communityTinybbsReplylsave_Post({
        image: null,
        replyId: this.currentVoiceOpposite.replyId,
        content: this.replyText
      })
      if(res.data.code === 200){
        this.replyText = ''
        this.currentVoiceOpposite.replyLList.push(res.data.data)
      }
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
.opposite_details_wrap {
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
  }

  .comments_wrap {
    margin-bottom: 70rpx;
    margin-top: 30rpx;
    background: #fff;
    box-sizing: border-box;

    .comments_title {
      display: flex;
      align-items: center;
      padding: 30rpx;

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
        padding: 20rpx;

        &:hover {
          background: #9b9b9b11;
        }

        &:nth-child(n + 2) {
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
            font-size: 28rpx;
            min-height: 40rpx;
          }

          .content {
            color: #4a4a4a;
            font-size: 28rpx;
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
    padding: 10rpx 30rpx;
    position: fixed;
    bottom: 0rpx;
    left: 0;
    right: 0rpx;
    z-index: 99;
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
