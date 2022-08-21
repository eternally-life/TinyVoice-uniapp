<template>
  <view class="public_voice_wrap" :style="{ height: windowHeight + 'px' }">
    <view class="public_card">
      <!-- <view class="voice_title">
        <u--input placeholder="请输入您的标题内容" border="bottom" v-model="voiceTitle"></u--input>
      </view> -->
      <view class="voice_content">
        <u--textarea v-model="voiceContent" placeholder="请输入您想发布的文本内容" border="none" height="130" focus
          style="background:#000" :adjustPosition="false"></u--textarea>
        <view class="content_upload">
          <ty-file-upload @upPara="getImgData" paraGetMethods="active" />
        </view>
      </view>
      <view class="publish_type_wrap">
        <text>发布标签：</text>
        <view class="tag_item_right">
          <view class="tag_item">
            <u-tag @click="taggleTagIndex(1)" text="微音" type="warning" plain borderColor="#60C5BA"
              :color="activeTagIndex === 1 ? '#fff' : '#60C5BA'" :bgColor="activeTagIndex === 1 ? '#60C5BA' : '#fff'">
            </u-tag>
          </view>
          <view class="tag_item">
            <u-tag @click="taggleTagIndex(3)" text="失物招领" type="warning" plain borderColor="#00E600"
              :color="activeTagIndex === 3 ? '#fff' : '#00E600'" :bgColor="activeTagIndex === 3 ? '#00E600' : '#fff'">
            </u-tag>
          </view>
          <view class="tag_item">
            <u-tag @click="taggleTagIndex(4)" text="表白" type="warning" plain borderColor="pink"
              :color="activeTagIndex === 4 ? '#fff' : 'pink'" :bgColor="activeTagIndex === 4 ? 'pink' : '#fff'">
            </u-tag>
          </view>
          <view class="tag_item">
            <u-tag @click="taggleTagIndex(6)" text="隐藏" type="warning" plain borderColor="#000"
              :color="activeTagIndex === 6 ? '#fff' : '#000'" :bgColor="activeTagIndex === 6 ? '#000' : '#fff'">
            </u-tag>
          </view>
          <view class="tag_item">
            <u-tag @click="taggleTagIndex(2)" text="二手市场" type="warning" plain borderColor="#fbbd08"
              :color="activeTagIndex === 2 ? '#fff' : '#fbbd08'" :bgColor="activeTagIndex === 2 ? '#fbbd08' : '#fff'">
            </u-tag>
          </view>
          <view class="tag_item" v-if="wxUserInfo.roles && wxUserInfo.roles.length > 0">
            <u-tag @click="taggleTagIndex(5)" text="官方" type="warning" plain borderColor="#5e00ff"
              :color="activeTagIndex === 5 ? '#fff' : '#5e00ff'" :bgColor="activeTagIndex === 5 ? '#5e00ff' : '#fff'">
            </u-tag>
          </view>
        </view>
      </view>
      <!-- <view class="choose_date" v-if="activeTagIndex === 2">
        <u-datetime-picker :show="datetimeShow" v-model="chooseDate" mode="date" :formatter="formatter"
          ref="datetimePicker" :maxDate="new Date().getTime()" @cancel="datetimeShow = false" @confirm="changeDate">
        </u-datetime-picker>
        <u-button @click="datetimeShow = true" size="small" :customStyle="customStyle" stle="width:100rpx;">选择日期
        </u-button>
      </view> -->
      <view class="choose_price" v-if="activeTagIndex === 2">
        <text>价格：</text>
        <u--input placeholder="价格/元" border="bottom" clearable v-model="goodPrice">
        </u--input>
        <text>元</text>
      </view>
      <!-- <block v-if="activeTagIndex === 2">
        <view class="chooose_date_wrap">
          <text>丢失时间：<text style="color: #999;">{{ calculateTime(chooseDate) }}</text></text>
        </view>
        <view class="chooose_date_wrap">
          <text>Tips：<text style="color: #999;text-decoration: underline;">可以在内容中留下联系方式哦</text></text>
        </view>
      </block> -->
    </view>
    <view class="publish_btn">
      <u-button type="primary" @click="sendSamllVoice" text="发布" :customStyle="customStyle" :loading="publishLoading"
        loadingText="发布中" round></u-button>
    </view>
  </view>
</template>

<script>
import { communityTinybbsSave_Post } from '@/api/社区模块/微音论坛.js'
export default {
  data() {
    return {
      voiceTitle: '',
      voiceContent: '',
      windowHeight: '',
      publishLoading: false,
      activeTagIndex: 1,
      datetimeShow: false,
      chooseDate: Number(new Date()),
      imgArr: [],
      wxUserInfo: {},
      goodPrice: '0.00'
    }
  },
  props: {
    customStyle: {
      type: Object,
      default: {
        background: '#EFF9F8',
        border: 'none',
        color: '#60C5BA',
        borderRadius: '40rpx',
      },
    },
  },
  mounted() {
    this.windowHeight = getApp().globalData.windowHeight
    this.wxUserInfo = getApp().globalData.wxUserInfo ? getApp().globalData.wxUserInfo : {}
  },
  methods: {
    sendSamllVoice() {
      if (this.voiceContent.length === 0 && this.imgArr.length === 0) {
        uni.$u.toast('内容不可为空哦~')
        return
      }
      // phonenumber
      this.publishLoading = true
      communityTinybbsSave_Post({
        type: this.activeTagIndex,
        content: this.voiceContent,
        imgList: this.imgArr,
        contact: this.activeTagIndex === 3 || this.activeTagIndex === 2 ? this.wxUserInfo.phonenumber : null,
        price: this.activeTagIndex === 2 ? this.goodPrice : null
      })
        .then((res) => {
          if (res.data.code === 200) {
            uni.navigateBack({
              success: () => {
                uni.$emit('refresh')
                uni.$u.toast('发布成功')
              },
            })
          }
        })
        .catch((err) => {
          uni.$u.toast(err.message)
        })
        .finally(() => {
          this.publishLoading = false
        })
    },
    taggleTagIndex(index) {
      this.activeTagIndex = index
    },
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`
      }
      if (type === 'month') {
        return `${value}月`
      }
      if (type === 'day') {
        return `${value}日`
      }
      return value
    },
    changeDate(time) {
      this.datetimeShow = false
      this.chooseDate = time.value
    },
    getImgData(imgArr) {
      this.imgArr = imgArr
    },
  },
  create() {
    // 微信小程序需要用此写法
    this.$refs.datetimePicker.setFormatter(this.formatter)
  },
  computed: {
    calculateTime() {
      return (time) => {
        return uni.$u.date(time, 'yyyy-mm-dd')
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.public_voice_wrap {
  padding: 30rpx;
  background: #f5f5f5;

  .public_card {
    background: #fff;
    border-radius: 20rpx;
    transition: height 1s;
    padding-bottom: 30rpx;

    .choose_date {
      padding: 20rpx 0;
    }
  }

  .voice_content {
    .content_upload {
      padding: 20rpx 0 0 20rpx;
    }
  }

  .publish_btn {
    margin-top: 30rpx;
  }

  .chooose_date_wrap {
    padding: 0 20rpx;

    text {
      font-size: 28rpx;
      color: #60c5ba;
    }
  }

  .choose_price {
    display: flex;
    align-items: center;
    padding: 0 20rpx;

    text {
      font-size: 28rpx;
      color: #60c5ba;
    }
  }

  .publish_type_wrap {
    display: flex;
    align-items: flex-start;
    padding: 0 20rpx;

    text {
      width: 160rpx;
      font-size: 28rpx;
      color: #60c5ba;
    }

    .tag_item_right {
      display: flex;
      flex-wrap: wrap;
      width: 250px;

      .tag_item {
        margin-right: 20rpx;

        &:nth-child(n+4) {
          margin-top: 20rpx;
        }
      }
    }

  }
}
</style>