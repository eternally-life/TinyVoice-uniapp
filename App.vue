<script>
export default {
	onLaunch: function() {
		// console.log('App Launch');
	},
	onShow: function() {
		// console.log('App Show');
	},
	onHide: function() {
		// console.log('App Hide');
	},
	globalData: {
		windowHeight: null,
		token: null || uni.getStorageSync('token'),
		myDate: new Date(), //全局启动时间
		loginNum: 0,
		wxUserInfo: {},
		qqUserInfo: {},
		eduInfo: null, //个人教务信息
		phoneNumber: '', // 全局手机号
		is_voiceEduSelect: false, //教务特殊功能鉴权
		appName: '校园微音',
		logo: 'http://tinyvoice-oss-cdn.glowxq.com/logo/logo.png',
		/* 缓存键 */
		storageKey: {
			eduInfo: 'eduInfo', //个人教务信息缓存键
			courseKEY: 'course20221', //课表存储键
			eduSwitchKEY: 'eduSwitch', //教务设置存储键
			courseFTimeKEY: 'LastRefreshTime', //最近一次刷新课表时间 存储键
			sportKey: 'PEInput' //体测输入存储键
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f5f5f5;
}

/*每个页面公共css */
@import 'uview-ui/index.scss';
//icon图标
@import '@/style/icon.css';
// 彩色icon图标
@import '@/style/color_icon.css';
// animate动画库
@import '@/style/animate.min.css';

@import '@/style/colorUI.css';
</style>
