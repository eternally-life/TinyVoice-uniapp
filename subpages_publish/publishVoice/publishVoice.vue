<template>
  <view class="public_voice_wrap" :style="{ height: windowHeight + 'px' }">
    <view class="public_card">
      <!-- <view class="voice_title">
        <u--input placeholder="请输入您的标题内容" border="bottom" v-model="voiceTitle"></u--input>
      </view> -->
      <view class="voice_content">
        <u--textarea v-model="voiceContent" placeholder="请输入您想发布的文本内容" border="none" height="130" focus></u--textarea>
        <view class="content_upload">
          <ty-file-upload @upPara="getImgData" paraGetMethods="active" />
          <view class="publish_btn">
            <u-button type="primary" @click="sendSamllVoice" text="发布" :customStyle="customStyle"
              :loading="publishLoading" loadingText="发布中" round></u-button>
          </view>
        </view>
      </view>
      <view class="publish_type_wrap">
        <text>发布标签：</text>
        <view class="tag_item">
          <u-tag @click="taggleTagIndex(1)" :text="activeTagIndex === 1 ? '微音√' : '微音'" type="warning" plain
            borderColor="#60C5BA" :color="activeTagIndex === 1 ? '#fff' : '#60C5BA'"
            :bgColor="activeTagIndex === 1 ? '#60C5BA' : '#fff'"></u-tag>
        </view>
        <!-- <view class="tag_item">
          <u-tag @click="taggleTagIndex(3)" :text="activeTagIndex === 3 ? '二手市场√' : '二手市场'" type="warning" plain
            borderColor="#60C5BA" :color="activeTagIndex === 3 ? '#fff' : '#60C5BA'"
            :bgColor="activeTagIndex === 3 ? '#60C5BA' : '#fff'"></u-tag>
        </view>
        <view class="tag_item">
          <u-tag @click="taggleTagIndex(2)" :text="activeTagIndex === 2 ? '寻物√' : '寻物'" type="success" plain
            borderColor="#60C5BA" :color="activeTagIndex === 2 ? '#fff' : '#60C5BA'"
            :bgColor="activeTagIndex === 2 ? '#60C5BA' : '#fff'"></u-tag>
        </view> -->
      </view>
      <view class="choose_date" v-if="activeTagIndex === 2">
        <u-datetime-picker :show="datetimeShow" v-model="chooseDate" mode="date" :formatter="formatter"
          ref="datetimePicker" :maxDate="new Date().getTime()" @cancel="datetimeShow = false" @confirm="changeDate">
        </u-datetime-picker>
        <u-button @click="datetimeShow = true" size="small" :customStyle="customStyle" stle="width:100rpx;">选择日期
        </u-button>
      </view>
      <block v-if="activeTagIndex === 2">
        <view class="chooose_date_wrap">
          <text>丢失时间：<text style="color: #999;">{{ calculateTime(chooseDate) }}</text></text>
        </view>
        <view class="chooose_date_wrap">
          <text>Tips：<text style="color: #999;text-decoration: underline;">可以在内容中留下联系方式哦</text></text>
        </view>
      </block>
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
      imgArr: []
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
    console.log(getApp().globalData.phoneNumber);
  },
  methods: {
    sendSamllVoice() {
      if (this.voiceContent.length === 0 && this.imgArr.length === 0) {
        uni.$u.toast('内容不可为空哦~')
        return
      }
      this.publishLoading = true
      communityTinybbsSave_Post({
        type: this.activeTagIndex,
        content: this.voiceContent,
        imgList: this.imgArr
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
          console.log('@')
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

      .publish_btn {
        position: fixed;
        bottom: 60rpx;
        left: 20rpx;
        right: 20rpx;
      }
    }
  }

  .chooose_date_wrap {
    padding: 0 20rpx;

    text {
      font-size: 28rpx;
      color: #60c5ba;
    }
  }

  .publish_type_wrap {
    display: flex;
    align-items: center;
    padding: 0 20rpx;

    text {
      font-size: 28rpx;
      color: #60c5ba;
    }

    .tag_item {
      margin-right: 20rpx;
    }
  }
}
</style>