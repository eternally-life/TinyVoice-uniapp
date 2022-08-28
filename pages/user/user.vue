<template>
	<view class="profile_wrap">
		<view class="bgColor"></view>

		<view class="topInfo">
			<view class="userInfo">
				<view class="user_avator" @click="toLogin">
					<image
						:src="
							wxUserInfo.avatar ? wxUserInfo.avatar : 'http://tinyvoice-oss-cdn.glowxq.com/logo/logo.jpg'
						"
						class="userAvatar"
					/>
				</view>
				<view class="right" @click="toLogin">
					<view class="user">
						<text class="name">{{ wxUserInfo.nickName || '点击登录' }}</text>
						<text class="desc">{{ wxUserInfo.isAuth | isAuth }}</text>
					</view>
				</view>
				<view class="sign">
					<u-tag text="已签" size="mini" type="success" v-if="signined"></u-tag>
					<u-tag text="签到" plain size="mini" type="success" v-else @click="signInNote"></u-tag>
				</view>
			</view>
			<view class="otherInfo">
				<view
					class="bot_item"
					v-for="(item, index) in otherInfo"
					:key="index"
					@click="navOtherItemClick(item.path, index)"
				>
					<view class="item_number"><u-count-to :startVal="0" :endVal="item.num"></u-count-to></view>
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
				@click="toDetail(item.name)"
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
		<ty-tabbar></ty-tabbar>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { systemTinyuserGetInfo_Get } from '@/api/SYSTEM/用户信息.js';
import { systemParamsNoteList_Get, systemParamsConfList_Get } from '@/api/SYSTEM/参数字典公告.js';
import { systemSyssignPage_Get, systemSyssignSave_Post } from '@/api/SYSTEM/签到.js';
import { systemSysmsgPage_Get } from '@/api/SYSTEM/消息提醒.js';
import { getSetInfo_QQ, getSetInfo_WX, getNaviList, getOtherInfo_WX, getOtherInfo_QQ } from './datalist.js';
import { setGloalDataEduInfo } from '@/utils/loginUtil.js';
import { systemParamsConfigKeyconfigKey_Get } from '@/api/SYSTEM/参数字典公告.js';
export default {
	data() {
		return {
			showSignExplain: false, // 是否显示音符说明
			content: '', // 富文本内容
			noticeTitle: '', // 音符说明标题
			wxUserInfo: {},
			eduInfo: {},
			signined: false, //是否已签到
			token: '',
			// 导航区数据
			navs: getNaviList(),

			// #ifdef MP-WEIXIN
			otherInfo: getOtherInfo_WX(),
			setInfo: getSetInfo_WX(),
			// #endif

			// #ifdef MP-QQ
			otherInfo: getOtherInfo_QQ(),
			setInfo: getSetInfo_QQ()
			// #endif
		};
	},
	onLoad() {
		this.token = getApp().globalData.token;
		this.getUserInfo();
		this.setEduOpenTime();
		uni.$on('refresh', () => {
			this.getUserInfo();
		});
		uni.$on('changeNoticCount', num => {
			this.changeNoticCount(num);
		});
		/* 根据vuex缓存决定是否跳转教务 */
		// this.toHome();
	},
	onShow() {
		//更新页面静态数据
		this.wxUserInfo = getApp().globalData.wxUserInfo;
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
		async signInNote() {
			systemSyssignSave_Post().then(res => {
				// console.log('签到结果', res);
				if (res.data.code == 200) {
					this.signined = true;
					uni.$u.toast('签到成功');
				} else if (res.data.code == 500 && res.data.msg.indexOf('已经') != -1) {
					uni.$u.toast('今日已签');
					this.signined = true;
				}
			});
		},

		/* 跳转教务首页 */
		toHome() {
			/* 初始化教务相关设置 */
			let key = getApp().globalData.storageKey.eduSwitchKEY;
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
			try {
				if (Object.keys(this.wxUserInfo).length > 0) {
					uni.navigateTo({ url: '/subpages/userInfo/userInfo' });
					return;
				}
				uni.navigateTo({ url: '/subpages/login/login' });
			} catch (e) {
				uni.navigateTo({ url: '/subpages/login/login' });
			}
		},

		// 获通知列表
		getNoticeList() {
			systemSysmsgPage_Get({
				pageNum: 1 /** 第几页    string required:false */,
				pageSize: 100 /** 页码大小    string required:false */
			}).then(res => {
				if (res.data.data.records.length > 0) {
					console.log('消息', res.data.data.records);
					this.changeNoticCount(res.data.data.records.length);
				}
			});
		},
		//修改消息数量
		changeNoticCount(num) {
			this.otherInfo.forEach(value => {
				if (value.text == '消息') {
					value.num = num;
				}
			});
		},
		// 获取自己信息
		getUserInfo() {
			if (Object.keys(this.wxUserInfo).length !== 0) return;
			systemTinyuserGetInfo_Get().then(res => {
				console.log('获取个人信息', res);
				if (res.data.code == 200) {
					this.wxUserInfo = res.data.user;
					this.eduInfo = res.data.guet;
					setGloalDataEduInfo(res.data.guet);
					this.$store.commit('edu/setEduInfo', res.data.guet);
					this.otherInfo[0].num = res.data.user.integral;
					getApp().globalData.wxUserInfo = res.data.user;
					uni.setStorageSync('wxUserInfo', res.data.user);
					this.signInNote();
					this.getNoticeList();
				}
			});
		},
		async setEduOpenTime() {
			const timeNodeRes = await systemParamsConfigKeyconfigKey_Get({ configKey: 'system:edu:opentime' });
			console.log('获取开学时间', timeNodeRes);
			if (timeNodeRes.data.code == 200) {
				this.$store.commit('edu/setTimeNode', Number(timeNodeRes.data.msg));
			}
		},
		// 导航栏点击跳转
		navOtherItemClick(path, index) {
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
		toDetail(name) {
			console.log(name);
			// #ifdef MP-WEIXIN
			if (name === '个人信息') {
				this.toLogin();
			} else if (name === '联系客服') {
				console.log('我是1 是客服');
			} else if (name === '关于我们') {
				uni.navigateTo({
					url: '/subpages/aboutUs/aboutUs'
				});
			} else if (name === '分享微音') {
				console.log('我是3 是分享');
			} else {
				this.exitLogin();
			}
			// #endif
			// #ifdef MP-QQ
			if (name === '个人信息') {
				this.toLogin();
			} else if (name === '关于我们') {
				uni.navigateTo({
					url: '/subpages/aboutUs/aboutUs'
				});
			} else if (name === '分享微音') {
				console.log('我是2 是分享');
			} else {
				this.exitLogin();
			}
			// #endif
		},
		// 退出登录
		exitLogin() {
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
						getApp().globalData.loginNum = 0;
						uni.reLaunch({
							url: '/subpages/login/login'
						});
					}
				}
			});
		}
	},
	computed: {
		...mapState('edu', ['eduSwitch'])
	},
	filters: {
		// 身份过滤器
		isAuth(value) {
			switch (value) {
				case 1:
					return '教师认证';
				case 2:
					return '学生认证';
				default:
					return '未认证';
			}
		}
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
						max-width: 40vw;
					}

					.desc {
						padding-top: 10rpx;
						font-size: 25rpx;
						color: #707070;
					}
				}
			}

			.sign {
				padding: 2vw;
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
					align-content: center;
					text-align: center;
				}

				.item_number {
					align-content: center;
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
