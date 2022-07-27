<template>
	<view class="profile_wrap">
		<view class="bgColor"></view>

		<view class="topInfo">
			<view class="userInfo" @click="toLogin">
				<view class="user_avator">
					<image
						:src="
							wxUserInfo.avatar
								? wxUserInfo.avatar
								: 'https://tiny-voice.oss-cn-guangzhou.aliyuncs.com/logo/QQ%E5%9B%BE%E7%89%8720211101001355.jpg'
						"
						class="userAvatar"
					/>
				</view>
				<view class="right">
					<view class="user">
						<text class="name">{{ wxUserInfo.nickName || '点击登录' }}</text>
						<text class="desc">{{ wxUserInfo.isAuth ? '已校园认证' : '未校园认证' }}</text>
					</view>
				</view>
			</view>
			<view class="otherInfo">
				<view
					class="bot_item"
					v-for="(item, index) in otherInfo"
					:key="index"
					@click="navOtherItemClick(item.path, index)"
				>
					<view class="item_number">{{ item.num }}</view>
					<view class="item_text">{{ item.text }}</view>
				</view>
			</view>
		</view>

		<!-- #ifndef MP-QQ -->

		<view class="centerInfo">
			<view class="myItem" @click="navItemClick(item.path)" v-for="(item, index) in navs" :key="index">
				<view class="myIcon">
					<!-- <image :src="item.img"  mode="widthFix" /> -->
					<view class="fix" :class="item.icon"></view>
				</view>
				<text>{{ item.title }}</text>
			</view>
		</view>

		<!-- #endif -->

		<view class="botInfo">
			<button
				class="setItem"
				v-for="(item, index) in setInfo"
				:open-type="item.open_type"
				@click="toDetail(index)"
				:key="index"
			>
				<view class="setIcon"><view class="t-icon set-t-icon" :class="item.icon"></view></view>
				<view class="setInfo">
					<text class="setName">{{ item.name }}</text>
				</view>
				<text class="iconfont icon-dayuhao icon2"></text>
			</button>
		</view>
		<u-modal
			:show="showSignExplain"
			:title="noticeTitle"
			@confirm="showSignExplain = false"
			confirmColor="#2979ff"
			closeOnClickOverlay
			@close="showSignExplain = false"
		>
			<view class="slot-content"><rich-text :nodes="content"></rich-text></view>
		</u-modal>
	</view>
</template>

<script>
const prf = 't-';
import { mapState, mapMutations } from 'vuex';
import { systemTinyuserGetInfo_Get } from '@/api/SYSTEM/用户信息.js';
import { systemParamsNoteList_Get, systemParamsConfList_Get } from '@/api/SYSTEM/参数字典公告.js';
export default {
	data() {
		return {
			showSignExplain: false, // 是否显示音符说明
			content: '', // 富文本内容
			noticeTitle: '', // 音符说明标题
			wxUserInfo: {},
			token: '',
			// 导航区数据
			navs: [
				{
					icon: 'iconfont icon-fabu1',
					title: '我的发布',
					path: '/pages/small_voice/MyVoice'
				},
				{
					icon: 'iconfont icon-dingdan',
					title: '我的订单',
					path: '/pages/profile/order'
				},
				{
					icon: 'iconfont icon-ruzhu1',
					title: '店铺入驻',
					path: '/pages/supermarket/mall/applyOpenShop'
				},
				{
					icon: 'iconfont icon-wodedianpu3',
					title: '我的店铺',
					path: '/pages/supermarket/mall/myShop'
				}
			],
			// #ifdef MP-QQ
			otherInfo: [
				{
					num: '0',
					text: '音符'
				}
			],
			// #endif
			// #ifdef MP-WEIXIN
			otherInfo: [
				{
					num: '0',
					text: '音符'
				},
				{
					num: '0',
					text: '关注'
				},
				{
					num: '0',
					text: '粉丝'
				},
				{
					num: '0',
					text: '消息',
					path: '/pages/profile/news'
				}
			],
			// #endif
			// #ifdef MP-WEIXIN
			setInfo: [
				{
					icon: prf + 'icon-gerenxinxi1',
					name: '个人信息'
				},
				{
					icon: prf + 'icon-lianxikefu1',
					name: '联系客服',
					open_type: 'contact'
				},
				{
					icon: prf + 'icon-guanyuwomen-01-01',
					name: '关于我们'
				},
				{
					icon: prf + 'icon-fenxiangweiyin1',
					name: '分享微音',
					open_type: 'share'
				},
				{
					icon: prf + 'icon-tuichuzhanghao1',
					name: '退出账号'
				}
			],
			// #endif
			// #ifdef MP-QQ
			setInfo: [
				{
					icon: prf + 'icon-gerenxinxi1',
					name: '个人信息'
				},
				{
					icon: prf + 'icon-guanyuwomen-01-01',
					name: '关于我们'
				},
				{
					icon: prf + 'icon-fenxiangweiyin1',
					name: '分享微音',
					open_type: 'share'
				},
				{
					icon: prf + 'icon-tuichuzhanghao1',
					name: '退出账号'
				}
			]
			// #endif
		};
	},
	onLoad() {
		this.token = getApp().globalData.token;
		this.getUserInfo();
		uni.$on('refresh', () => {
			this.getUserInfo();
		});
		/* 根据vuex缓存决定是否跳转教务 */
		this.toHome();
		this.getNewList();
		uni.$on('refreshNews', () => {
			this.getNewList();
		});
		this.getNoticeList();
	},
	onShareTimeline() {
		// 用户点击右上角分享
	},
	// 用户点击右上角分享
	onShareAppMessage(res) {
		// #ifdef MP-QQ
		qq.showShareMenu({
			showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment']
		});
		// #endif
	},
	methods: {
		...mapMutations('edu', ['setEduSwitch']),
		// 登录就签到
		async signInNote() {},
		async getNoticeList() {
			// 获通知列表
		},
		/* 跳转教务首页 */
		toHome() {
			/* 初始化教务相关设置 */
			let key = getApp().globalData.eduSwitchKEY;
			const value = uni.getStorageSync(key);
			//读取缓存
			if (value) {
				//有 将vuex路由数据设置为缓存值
				this.$store.commit('edu/setEduSwitch', value);
				// uni.setStorageSync(key, value);
			} else {
				//没有 初始化缓存为vuex路由数据
				let data = this.$store.state.edu.eduSwitch;
				uni.setStorageSync(key, data);
			}
			//根据 状态值进行跳转
			if (this.eduSwitch.firstOpen) {
				console.log('跳转触发');
				uni.switchTab({
					url: '/pages/home/index'
				});
			}
		},

		toLogin() {
			if (this.wxUserInfo) {
				uni.navigateTo({
					url: './myInfo?userInfo=' + JSON.stringify(this.wxUserInfo)
				});
				return;
			}
			uni.navigateTo({
				url: '/subpages/login/login'
			});
		},
		async getNewList() {
			// 获取消息数目
			// const res = await systemUsermsgnoticeListunread_Get()
			// if (res.data.code === 200) {
			// 	this.otherInfo[3].num = res.data.data.length
			// }
		},
		// 获取自己信息
		getUserInfo() {
			systemTinyuserGetInfo_Get().then(res => {
				console.log(res);
				this.wxUserInfo = res.data.user;
				this.otherInfo[0].num = res.data.user.integral;
				getApp().globalData.wxUserInfo = res.data.user;
				uni.setStorageSync('wxUserInfo', res.data.user);
			});
		},
		// 导航栏点击跳转
		navOtherItemClick(path, index) {
			if (index == '0') {
				this.signInNote();
				console.log('签到');
			}
			console.log(index);
			uni.navigateTo({
				url: path
			});
		},
		navItemClick(path) {
			console.log(path);
			uni.navigateTo({
				url: path
			});
		},
		toDetail(index) {
			console.log(index);
			// #ifdef MP-WEIXIN
			if (index === 0) {
				uni.navigateTo({
					url: '/subpages/userInfo/userInfo?userInfo=' + JSON.stringify(this.wxUserInfo)
				});
			} else if (index === 1) {
				console.log('我是1 是客服');
			} else if (index === 2) {
				uni.navigateTo({
					url: './about_us'
				});
			} else if (index === 3) {
				console.log('我是3 是分享');
			} else {
				uni.showModal({
					content: '是否要退出？',
					confirmText: '退出',
					confirmColor: '#0099ff',
					cancelColor: '#000000',
					success: res => {
						if (res.confirm) {
							this.wxUserInfo = {};
							uni.clearStorage();
							/* uni.removeStorageSync('token');
								uni.removeStorageSync('wxUserInfo');
								uni.removeStorageSync('noticeList');
								uni.removeStorageSync('pamesList');
								uni.removeStorageSync(getApp().globalData.eduSwitchKEY);
								uni.removeStorageSync(getApp().globalData.courseFTimeKEY); */
							getApp().globalData.token = null;
							getApp().globalData.wxUserInfo = {};
							uni.reLaunch({
								url: '/subpages/login/login'
							});
						}
					}
				});
			}
			// #endif
			// #ifdef MP-QQ
			if (index === 0) {
				uni.navigateTo({
					url: './myInfo?userInfo=' + JSON.stringify(this.wxUserInfo)
				});
			} else if (index === 1) {
				uni.navigateTo({
					url: './about_us'
				});
			} else if (index === 2) {
				console.log('我是2 是分享');
			} else {
				uni.showModal({
					content: '是否要退出？',
					confirmText: '退出',
					confirmColor: '#0099ff',
					cancelColor: '#000000',
					success: res => {
						if (res.confirm) {
							this.wxUserInfo = {};
							uni.removeStorageSync('token');
							uni.removeStorageSync('wxUserInfo');
							uni.removeStorageSync('noticeList');
							uni.removeStorageSync('pamesList');
							getApp().globalData.token = null;
							getApp().globalData.wxUserInfo = {};
							uni.reLaunch({
								url: '/subpages/login/login'
							});
						}
					}
				});
			}
			// #endif
		}
	},
	computed: {
		...mapState('edu', ['eduSwitch'])
	}
};
</script>

<style lang="scss" scoped>
.profile_wrap {
	.bgColor {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgb(245, 245, 245);
		z-index: -1;
	}

	// 个人信息
	.topInfo {
		padding: 20rpx 40rpx 60rpx;

		.userInfo {
			display: flex;
			margin-bottom: 30rpx;
			align-items: center;

			.user_avator {
				image {
					width: 150rpx;
					height: 150rpx;
					border: 5rpx solid #fff;
					border-radius: 50%;
				}
			}

			.right {
				margin-left: 50rpx;

				.user {
					display: flex;
					flex-direction: column;

					.name {
						color: #ff6773;
						font-weight: bold;
						font-size: 40rpx;
						display: block;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						max-width: 400rpx;
					}

					.desc {
						padding-top: 10rpx;
						font-size: 25rpx;
						color: #707070;
					}
				}
			}
		}

		.otherInfo {
			display: flex;
			justify-content: space-around;

			.bot_item {
				height: 40rpx;
				line-height: 40rpx;
				font-size: 28rpx;

				.item_text {
					color: #676767;
				}

				.item_number {
					text-align: center;
					color: #aaa;
				}
			}
		}
	}

	.centerInfo {
		// 横排显示
		display: flex;
		justify-content: space-around;
		background-color: #fff;
		border-radius: 30rpx;
		padding: 20rpx 10rpx 40rpx;
		margin: 0 40rpx 50rpx;

		.myItem {
			// 5个区域 每个占25%
			text-align: center;

			.myIcon {
				width: 100rpx;
				height: 100rpx;
				line-height: 100rpx;
				border-radius: 50%;
				// // 图片居中
				margin: 10rpx auto;

				// 修改图标颜色大小
				background-image: linear-gradient(45deg, #3dc0d2, #43e3bd);

				.fix {
					color: #fff;
					font-size: 50rpx;
				}
			}

			// 设置所有图标大小
			.iconfont {
				font-size: 55rpx;
			}

			text {
				font-size: 26rpx;
			}
		}
	}

	.botInfo {
		background-color: #fff;
		border-radius: 30rpx;
		padding: 30rpx 20rpx;

		button::after {
			border: none;
		}

		button {
			background-color: #fff;
			border-radius: 0;
		}

		.setItem {
			position: relative;
			// 纵向排列
			display: flex;
			margin-bottom: 50rpx;
			height: 80rpx;
			line-height: 60rpx;
			color: #686868;

			.setIcon {
				display: flex;
				align-items: center;
				width: 60rpx;
				height: 60rpx;
				// border-radius: 50%;
				text-align: center;

				.set-t-icon {
					width: 45rpx;
					height: 45rpx;
				}
			}

			.setInfo {
				display: flex;
				// 改变flex布局 纵向排列
				flex-direction: column;
				margin-left: 20rpx;

				.setName {
					font-size: 35rpx;
				}
			}

			.icon2 {
				position: absolute;
				right: 15rpx;
				color: #ccc;
				font-size: 40rpx;
			}
		}
	}
}
</style>
