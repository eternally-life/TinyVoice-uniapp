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
		phoneNumber: '', // 全局手机号
		is_voiceEduSelect: false, //教务特殊功能鉴权
		logo: '',
		imgSuffix: ['', ''] /*缩略图统一后缀*/,
		/* 缓存键 */
		storageKey: {
			courseKEY: '', //课表存储键
			eduSwitchKEY: 'eduSwitch', //教务设置存储键
			courseFTimeKEY: 'LastRefreshTime', //最近一次刷新课表时间 存储键
			sportKey: 'PEInput' //体测输入存储键
		}
	}
};
</script>

<style lang="scss">
/*每个页面公共css */
@import 'uview-ui/index.scss';
//icon图标
@import './style/icon.css';
// 彩色icon图标
@import './style/color_icon.css';
// animate动画库
@import './style/animate.min.css';
</style>
