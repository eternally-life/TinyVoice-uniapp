<template>
  <view class="my_voice_wrap" :style="{ height: windowHeight + 'px' }">
    <view class="top_userinfo">
      <view class="user_left">
        <view class="user_avatar">
          <image :src="userinfo.avatar" mode="aspectFill" />
        </view>
        <view class="user_box">
          <view class="name">{{ userinfo.nickName }}</view>
          <view class="fans_box">
            <text class="fans_number">0粉丝</text>
            <text class="focus_number">0关注</text>
          </view>
        </view>
      </view>
      <view class="user_right"> </view>
    </view>

    <view class="tabs_box">
      <u-sticky bgColor="#fff">
        <u-tabs :list="tabList" @click="toggleTabs" lineColor="#31B6C3" :activeStyle="{
          color: '#31B6C3',
          transform: 'scale(1.05)'
        }" :inactiveStyle="{
  color: '#606266',
  transform: 'scale(0.9)'
}" :scrollable="false" :itemStyle="{ width: '335rpx', height: '44px', textAlign: 'center' }"></u-tabs>
      </u-sticky>

      <view class="small_voice_wrap">
        <view class="skeleton_wrap" style="padding: 30rpx" v-show="isLoading">
          <u-skeleton :loading="isLoading" avatar rows="3"></u-skeleton>
        </view>
        <u-empty mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png"
          v-if="smallVoiceData.length === 0 && currentIndex === 0 && !isLoading">
        </u-empty>
        <view class="voice_item" v-for="(item, index) in smallVoiceData" :key="item.bbsId" v-show="currentIndex === 0">
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
            <view class="user_right" @click.stop="deleteVoiceReady(item.bbsId, index)">
              <text>删除</text>
            </view>
          </view>
          <view class="voice_content" @click="enterVoiceDetail(index)">
            <u-parse :content="item.content"></u-parse>
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
              <i class="iconfont icon-xihuan" style="font-size:40rpx;"></i>{{ item.likeNum }}
            </view>
          </view>
        </view>
        <view class="voice_item" v-for="(item, index) in myLikeVoiceData" :key="index" v-show="currentIndex === 1">
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
            <view class="user_right"> </view>
          </view>
          <view class="voice_content" @click="enterVoiceDetail(index)">
            <u-parse :content="item.content"></u-parse>
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
              <i class="iconfont icon-xihuan" style="font-size:40rpx;"></i>{{ item.likeNum }}
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="public_voice">
      <view class="btn_size">
        <u-button class="btn" :customStyle="customStyle" @click="publicVoice">发布微音</u-button>
      </view>
    </view>

    <view class="loadmore_wrap" v-if="smallVoiceData.length !== 0 && currentIndex === 0"
      @click="() => { isNoMore ? '' : getSmallVoiceData() }">
      <text>{{ isNoMore ? '到底啦' : '加载更多' }}</text>
    </view>
    <view class="loadmore_wrap" v-if="smallVoiceData.length !== 0 && currentIndex === 1"
      @click="() => { isLikeNoMore ? '' : getMyLikeVoiceData() }">
      <text>{{ isLikeNoMore ? '到底啦' : '加载更多' }}</text>
    </view>

    <u-modal :show="deleteModal" :closeOnClickOverlay="true" title="删除警告" showCancelButton
      content="删除是不可恢复的，请确认，点击空白处可取消。" confirmColor="#5AC725" @close="deleteModal = false">
      <template v-slot:confirmButton>
        <u-button :customStyle="customStyle2" @click="deleteVoiceFinal">删除</u-button>
      </template>
    </u-modal>
  </view>
</template>

<script>
import {
  communityTinybbsPage_Get,
  communityTinybbsLike_Get,
  communityTinybbsDelete_Delete,
} from '@/api/社区模块/微音论坛.js'
export default {
  data() {
    return {
      windowHeight: null,
      tabList: [
        {
          name: '动态',
        },
        {
          name: '喜欢',
        },
      ],
      smallVoiceData: [],
      myLikeVoiceData: [],
      isLoading: true,
      showReplyNumber: 2,
      userinfo: {},
      currentIndex: 0,
      deleteModal: false,
      needDeleteVoice: {
        index: -1,
        bbsId: -1,
      },
      isNoMore: false,
      isLikeNoMore: false,
      currentPageNumber: 1,
      currentLikePageNumber: 1,
    }
  },
  mounted() {
    this.windowHeight = getApp().globalData.windowHeight
    //获取微音内容
    this.getSmallVoiceData()
    uni.$on('refresh', () => {
      this.smallVoiceData = []
      this.myLikeVoiceData = []
      this.currentPageNumber = 1
      this.currentLikePageNumber = 1
      this.getSmallVoiceData()
      this.getMyLikeVoiceData()
    })
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
    customStyle2: {
      type: Object,
      default: {
        background: '#F56C6C',
        color: '#fff',
        borderRadius: '40rpx',
      },
    },
  },
  methods: {
    toggleTabs(item) {
      this.currentIndex = item.index
      if (this.currentIndex === 1) {
        this.myLikeVoiceData = []
        this.currentLikePageNumber = 1
        this.getMyLikeVoiceData()
      }
    },
    async getSmallVoiceData() {
      //myself为true时获取自己的维音
      try {
        if (Object.keys(this.userinfo).length === 0) {
          this.getUserinfo()
        }
        const requestObj = {
          pageNum: this.currentPageNumber,
          pageSize: 10,
          timeSort: 0,
          userId: this.userinfo.userId
        }
        const res = await communityTinybbsPage_Get(requestObj)
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
          return v
        })
        this.currentPageNumber++
        this.smallVoiceData = [...this.smallVoiceData, ...res.data.data.records]
        this.isLoading = false
      } catch (error) {
        console.log(error)
      }
    },
    async getMyLikeVoiceData() {
      try {
        this.isLoading = true
        if (Object.keys(this.userinfo).length === 0) {
          this.getUserinfo()
        }
        const requestObj = {
          pageNum: this.currentLikePageNumber,
          pageSize: 10,
          timeSort: 0,
        }
        const res = await communityTinybbsPage_Get(requestObj)
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
        this.currentLikePageNumber++
        let N = this.myLikeVoiceData.length
        this.myLikeVoiceData = [...this.myLikeVoiceData, ...res.data.data.records.filter((v) => {
          if (v.isLike) return true
          return false
        })]
        if (this.myLikeVoiceData.length === N) {
          this.isLikeNoMore = true
        }
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
        this.currentIndex === 1 ? this.myLikeVoiceData[index].likeNum-- : ''
      } else {
        //点赞
        this.smallVoiceData[index].likeNum++
        this.currentIndex === 1 ? this.myLikeVoiceData[index].likeNum++ : ''
      }
    },
    //查看微音详情
    enterVoiceDetail(index) {
      uni.navigateTo({
        url: '/subpages_publish/voice_details/voiceDetails',
        success: (res) => {
          res.eventChannel.emit('acceptVoiceData', {
            data: this.currentIndex === 0 ? this.smallVoiceData[index] : this.myLikeVoiceData[index],
          })
        },
      })
    },
    //获取全局个人信息
    getUserinfo() {
      if (getApp().globalData.wxUserInfo.avatar) {
        this.userinfo = getApp().globalData.wxUserInfo
      } else {
        uni.getStorage({
          key: 'wxUserInfo',
          success: (res) => {
            this.userinfo = res.data
            console.log(res.data)
          },
          error: () => {
            uni.$u.toast('获取用户信息错误')
          },
        })
      }
    },
    publicVoice() {
      uni.navigateTo({
        url: '/subpages_publish/publishVoice/publishVoice',
      })
    },
    //根据bbsId删除自己的微音
    deleteVoiceReady(bbsId, index) {
      this.needDeleteVoice.bbsId = bbsId
      this.needDeleteVoice.index = index
      this.deleteModal = true
    },
    async deleteVoiceFinal() {
      const res = await communityTinybbsDelete_Delete([this.needDeleteVoice.bbsId])
      console.log(res);
      if (res.data.code === 200) {
        this.deleteModal = false
        uni.$u.toast('删除成功')
        this.smallVoiceData.splice(this.needDeleteVoice.index, 1)
      } else {
        this.deleteModal = false
        uni.$u.toast('删除失败')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.my_voice_wrap {
  background: #F1F1F1;
  padding-bottom: 170rpx;

  .top_userinfo {
    display: flex;
    justify-content: space-between;
    padding: 30rpx;
    background: #fff;

    .user_left {
      flex: 1;
      display: flex;

      .user_avatar {
        width: 120rpx;
        height: 120rpx;
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

        .name {
          font-size: 32rpx;
          color: #000;
        }

        .fans_box {
          .fans_number {
            font-size: 30rpx;
          }

          .focus_number {
            font-size: 30rpx;
            padding: 0 10rpx;
          }
        }
      }
    }

    .user_right {
      font-size: 28rpx;
      padding-top: 10rpx;
      width: fit-content;

      text {
        color: #5db4ab;
        border: #eff9f8 solid 4rpx;
        padding: 9rpx 25rpx;
        border-radius: 30rpx;
      }
    }
  }

  .tabs_box {
    margin-top: 40rpx;
    background: #fff;
  }

  .loadmore_wrap {
    width: 750rpx;
    text-align: center;
    font-size: 24rpx;
    color: #888888;
    background: #fff;
    padding: 10rpx 0 20rpx 0;
  }

  .public_voice {
    position: fixed;
    width: 100%;
    display: flex;
    justify-content: center;
    bottom: 50rpx;

    .btn_size {
      width: 50%;
    }
  }
}
</style>

<style scoped lang="scss">
.small_voice_wrap {
  background: #f5f5f5;

  .voice_item {
    padding: 30rpx 30rpx;
    background: #fff;

    &:nth-child(n + 3) {
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
          color: #f56c6c;
          border: solid 2rpx #f56c6c;
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

    .show_more_btn {
      color: #a4a4a4;
      font-size: 28rpx;
      padding: 10rpx 0;
    }
  }
}

.hidden {
  display: none !important;
}
</style>