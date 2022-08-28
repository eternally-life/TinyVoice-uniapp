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
          <i class="iconfont" v-if="currentShowVoice.type === 5">&#xe7e9;</i>
          <i class="iconfont is_like" v-if="currentShowVoice.type === 4">&#xe86f;</i>
          <i class="iconfont" v-if="currentShowVoice.type === 3">&#xe630;</i>
          <i class="iconfont" v-if="currentShowVoice.type === 6">&#xe8ef;</i>
          <view class="supermarket_price" v-if="currentShowVoice.type === 2">￥<view class="price">{{
              currentShowVoice.price.toFixed(2)
          }}</view>
          </view>
        </view>
      </view>
      <view class="voice_content">
        <!-- <text>{{ currentShowVoice.content }}</text> -->
        <u-parse :content="currentShowVoice.content"></u-parse>
      </view>
      <view class="voice_imgs" v-if="currentShowVoice.images && currentShowVoice.images.length !== 0">
        <u-album :urls="currentShowVoice.images" multipleSize="223rpx"></u-album>
      </view>
      <view class="function_btns">
        <view class="btn_share">
          <button open-type="share">分享</button>
        </view>
        <view class="btn_collection" @click="shareVoice">
          <i class="iconfont icon-zhuanfa" style="font-size:40rpx;"></i>
        </view>
        <view class="btn_like" @click="likeThisVoice()">
          <block v-if="!currentShowVoice.isLike"><i class="iconfont" style="font-size:40rpx;">&#xe761;</i></block>
          <block v-if="currentShowVoice.isLike"><i class="iconfont" style="font-size:40rpx;color:#F75F5E">&#xe86f;</i>
          </block>
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
          (currentShowVoice.replyList.length === 0 || !currentShowVoice.replyList) &&
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
              <!-- <view>{{ reply.createTime ? calculateTime(reply.createTime) : '未知' }}</view> -->
              <view>刚刚</view>
              <view @click="replyLayerFocus(reply)">回复</view>
            </view>
            <view class="current_layer_reply" v-if="reply.replyLList && reply.replyLList.length !== 0">
              <view class="current_layer_reply_item" v-for="(replyLayer, replyLayerIndex) in reply.replyLList"
                :key="replyLayerIndex">
                <view class="current_layer_avatar">
                  <image :src="replyLayer.avatar" />
                </view>
                <view class="current_layer_right">
                  <text class="current_layer_name">{{ replyLayer.nickName }} </text>
                  <text class="current_layer_content">{{ replyLayer.content }}</text>
                  <text class="current_layer_time">刚刚</text>
                </view>
              </view>
            </view>
          </view>
          <view class="ack_right">
          </view>
        </view>
        <!-- 接口获取的评论 -->
        <view class="user_ack_item" v-for="(reply, index) in currentShowVoice.replyList" :key="reply.replyId">
          <view class="ack_left">
            <view class="ack_avatar">
              <image :src="reply.avatar" mode="aspectFill" />
            </view>
          </view>
          <view class="ack_center" @click="replyLayerFocus(reply)">
            <text class="name">{{ reply.nickName }}</text>
            <text class="content">{{ reply.content }}</text>
            <view class="image" v-if="reply.image !== '' && reply.image !== null">
              <image :src="reply.image" mode="aspectFill" @click="showFullSceenImage(reply.image)" />
            </view>
            <view class="time">
              <view>{{ reply.createTime ? calculateTime(reply.createTime) : '未知' }}</view>
              <view>回复</view>
            </view>
            <view class="current_layer_reply" v-if="reply.replyLList && reply.replyLList.length !== 0">
              <view class="current_layer_reply_item" v-for="(replyLayer, replyLayerIndex) in reply.replyLList"
                :key="replyLayerIndex" @click.stop="enterOppositePage(index, replyLayerIndex)">
                <view class="current_layer_avatar">
                  <image :src="replyLayer.avatar" />
                </view>
                <view class="current_layer_right">
                  <text class="current_layer_name">{{ replyLayer.oppositeNickName ? replyLayer.nickName ===
                      replyLayer.oppositeNickName ?
                      replyLayer.nickName : replyLayer.nickName + ' > ' + replyLayer.oppositeNickName :
                      replyLayer.nickName
                  }} </text>
                  <text class="current_layer_content">{{ replyLayer.content }}</text>
                  <text class="current_layer_time">{{ calculateTime(replyLayer.createTime) }}</text>
                </view>
              </view>
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

    <view class="reply_user_input" v-if="currentReplyLayer.inputFocus">
      <u-input class="input" :placeholder="'回复' + currentReplyLayer.replyedNickname + '：'" border="surround" clearable
        shape="circle" placeholderStyle="color:#60C5BA" color="#60C5BA" maxlength="100" @confirm="handleReplyLayer"
        focus v-model="currentReplyLayer.content" @blur="replyInputBlur">
        <template slot="suffix">
          <view class="input_right">
            <u-button :customStyle="customStyle" size="small" @click="handleReplyLayer">回复</u-button>
          </view>
        </template>
      </u-input>
    </view>

    <view class="reply_layer_input" v-if="currentReplyLayerInner.inputFocus">
      <u-input class="input"
        :placeholder="'回复' + currentReplyLayerInner.nickName + currentReplyLayerInner.content + '：'" border="surround"
        clearable shape="circle" placeholderStyle="color:#60C5BA" color="#60C5BA" maxlength="100"
        @confirm="handleReplyLayerInner" focus v-model="currentReplyLayerInner.replyContent"
        @blur="replyInputBlurInner">
        <template slot="suffix">
          <view class="input_right">
            <u-button :customStyle="customStyle" size="small" @click="handleReplyLayerInner">回复</u-button>
          </view>
        </template>
      </u-input>
    </view>
  </view>
</template>

<script>
import {
  communityTinybbsReplysave_Post, communityTinybbsLike_Get, communityTinybbsReplylsave_Post,
  communityTinybbsReplyllsave_Post, communityTinybbsPage_Get
} from '@/api/社区模块/微音论坛.js'
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
      currentReplyLayer: {
        inputFocus: false,
        replyedId: -1,
        content: '',
        image: '',
        replyedNickname: ''
      },
      currentReplyLayerInner: {
        inputFocus: false,
        replyContent: '',
        index: 0,
        replyLayerIndex: 0,
      },
      innerTimer: null
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
    eventChannel.on('acceptVoiceData', ({ data, needReload = false }) => {
      if (needReload) {
        this.getSmallVoiceData(data.bbsId)
        return
      }
      this.currentShowVoice = data
      this.currentShowVoice.replyList && this.currentShowVoice.replyList.reverse()
    })
  },
  methods: {
    async getSmallVoiceData(bbsId) {
      const requestObj = {
        pageNum: 0,
        pageSize: 10,
        timeSort: 0,
        targetId: bbsId
      }
      const res = await communityTinybbsPage_Get(requestObj)
      console.log(res);
      this.currentShowVoice = res.data.data.records[0]
    },
    enterOppositePage(index, replyLayerIndex) {
      // uni.navigateTo({
      //   url: '/subpages_publish/voice_details/oppositeDetails',
      //   success: (res) => {
      //     res.eventChannel.emit('acceptOppositeData', {
      //       data: this.currentShowVoice.replyList[index],
      //     })
      //   },
      // })
      this.currentReplyLayerInner.inputFocus = true
      this.currentReplyLayerInner.index = index
      this.currentReplyLayerInner.replyLayerIndex = replyLayerIndex
      this.currentReplyLayerInner = { ...this.currentReplyLayerInner, ...this.currentShowVoice.replyList[index].replyLList[replyLayerIndex] }
    },
    replyInputBlur() {
      setTimeout(() => {
        this.currentReplyLayer.inputFocus = false
      }, 300);
    },
    replyInputBlurInner() {
      this.innerTimer = setTimeout(() => {
        this.currentReplyLayerInner.inputFocus = false
      }, 300);
    },
    replyLayerFocus(layerContent) {
      this.currentReplyLayer.inputFocus = false
      this.$nextTick(() => {
        this.currentReplyLayer.content = ''
        this.currentReplyLayer.inputFocus = true
        this.currentReplyLayer.replyedId = layerContent.replyId
        this.currentReplyLayer.replyedNickname = layerContent.nickName
      })
    },
    //回复一层回复
    async handleReplyLayer() {
      if (this.currentReplyLayer.content === '') {
        uni.showToast({
          title: '消息不能为空',
          icon: 'none'
        })
        return
      }
      const res = await communityTinybbsReplylsave_Post({
        image: this.currentReplyLayer.image,
        replyId: this.currentReplyLayer.replyedId,
        content: this.currentReplyLayer.content
      })
      console.log(res.data);
      if (res.data.code === 200) {
        let wxUserInfo = getApp().globalData.wxUserInfo
        if (this.currentShowVoice.replyList === null) this.currentShowVoice.replyList = []
        this.currentShowVoice.replyList.map(v => {
          if (v.replyId === this.currentReplyLayer.replyedId) {
            if (!v.replyLList) v.replyLList = []
            v.replyLList.push({
              nickName: wxUserInfo.nickName ? wxUserInfo.nickName : '我',
              content: this.currentReplyLayer.content,
              avatar: wxUserInfo.avatar
            })
          }
        })
        //临时
        this.currentReply.map(v => {
          if (v.replyId === this.currentReplyLayer.replyedId) {
            if (!v.replyLList) v.replyLList = []
            v.replyLList.push(res.data.data)
          }
        })
        this.currentReplyLayer.inputFocus = false
        this.currentReplyLayer.content = ''
        uni.$emit('refresh')
      }
    },
    async handleReplyLayerInner() {
      if (this.currentReplyLayerInner.content === '') {
        uni.showToast({
          title: '消息不能为空',
          icon: 'none'
        })
        return
      }
      const res = await communityTinybbsReplyllsave_Post({
        image: null,
        replyId: this.currentReplyLayerInner.replyId,
        replyLId: this.currentReplyLayerInner.replyLId,
        content: this.currentReplyLayerInner.replyContent,
      })
      if (res.data.code === 200) {
        this.currentShowVoice.replyList[this.currentReplyLayerInner.index].replyLList
          .push(res.data.data)
      }
    },
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
      //有问题
      if (res.data.code === 200) {
        uni.$emit('refresh')
        this.currentReply = [
          res.data.data,
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
        this.currentShowVoice.isLike = false
      } else {
        //点赞
        this.currentShowVoice.likeNum++
        this.currentShowVoice.isLike = true
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

  .reply_user_input {
    width: 750rpx;
    position: fixed;
    bottom: 0;
    z-index: 100;
  }

  .reply_layer_input {
    width: 750rpx;
    position: fixed;
    bottom: 0;
    z-index: 101;
  }

  .voice_item {
    padding: 30rpx 30rpx;
    background: #fff;
    overflow: hidden;

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
        position: relative;

        .supermarket_price {
          border-radius: 10rpx;
          height: 36rpx;
          background: #ea605e;
          color: #fff;
          font-weight: normal;
          display: flex;
          align-items: flex-end;
          font-size: 28rpx;
          padding: 0 10rpx;
          margin-right: 20rpx;

          .price {
            font-size: 24rpx;
            font-weight: 100;

            &::first-letter {
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
      padding: 20rpx 20rpx;
      color: #4a4a4a;

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

      .not_reply {
        color: #707070;
        font-size: 26rpx;
        padding-bottom: 40rpx;
        margin-left: 40rpx;
      }

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

          .current_layer_reply {
            background: #c5c5c533;
            border-radius: 5px;
            padding: 10px;
            margin-top: 30rpx;

            .current_layer_reply_item {
              display: flex;

              &:nth-child(n+2) {
                margin-top: 20rpx;
              }

              .current_layer_right {
                display: flex;
                flex-direction: column;
                margin-left: 10rpx;

                .current_layer_time {
                  font-size: 24rpx;
                  color: #aaaaaa;
                }

                .current_layer_name {
                  max-width: 200rpx;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  font-weight: normal;
                  font-size: 26rpx;
                }

                .current_layer_content {
                  font-size: 26rpx;
                  color: #707070;
                  padding: 10rpx 0;
                }
              }

              .current_layer_avatar {
                display: flex;

                image {
                  width: 60rpx;
                  height: 60rpx;
                  border-radius: 50%;
                }

              }

            }

          }

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
            color: #aaaaaa;
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

<style lang="scss">
.u-input {
  background: #eff9f8 !important;
  border: none;
}
</style>
