<template>
	<view class="community_pub_wrap">
		<view class="community_pub">
			<view class="pub_card">
				<view class="voice_title">
				  <u--input
				    placeholder="请输入您的标题内容"
				    border="bottom"
				    v-model="voiceTitle"
				  ></u--input>
				</view>
				<view class="pub_content">
					<u--textarea
					  v-model="pubContent"
					  placeholder="请输入您想发布的文本内容"
					  border="none"
					  height="130"
					  focus
					></u--textarea>
				</view>
				<view class="content_upload">
				  <ty-file-upload @upPara="getImgData" paraGetMethods="active" />
				  <view class="justText">
				  	上传图片 
				  </view>
				  <u-button
				    type="primary"
				    @click="sendcomunityPub"
				    text="发布"
				    loadingText="发布中"
				  ></u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { communityTinybbsSave_Post } from '@/api/社区模块/微音论坛.js'
	export default {
		data() {
			return {
				pubContent: '',
				windowHeight: '',
				fileList: [],
				publishLoading:false
			};
		},
		methods: {
			getImgData(e) {
				console.log('页面接收到的组件返回数据', e, '总长' + e.length);
			},
			sendcomunityPub(){
				// if(this.$refs.)
			}
		}
		
	}
</script>

<style lang="scss">
.community_pub_wrap{
	padding: 30rpx;
	background: #f5f5f5;
	.community_pub {
	  background: #fff;
	  border-radius: 20rpx;
	}
	.pub_content {
	  .content_upload {
	    padding: 20rpx;
		.justText{
			
		}
	  }
	}
}
</style>
