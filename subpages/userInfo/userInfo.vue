<template>
	<view>
		<view class="avatar">
			<u-avatar :src="showAvatarUrl" size="90" @click="selectImg"></u-avatar>
		</view>
		<view v-if="audit == 'false'" class="">
			<u-cell-group>
				<u-cell v-for="(item, index) in cellList" :key="index" :title="item.title" :value="getValue(item.name)"
					:name="item.name" size="large" :isLink="true" :clickable="true" arrow-direction="right"
					@click="itemTap"></u-cell>
			</u-cell-group>
		</view>

		<!-- 性别选择器 -->
		<u-picker :show="isShowPicke" :columns="sexColumns" cancelText="手滑了" confirmText="嗯、改"
			:defaultIndex="[Number(userInfo.sex)]" @cancel="isShowPicke = false" @confirm="sexConfirm"></u-picker>

		<!-- 输入框弹出层 -->
		<u-popup :show="isShowPop" mode="bottom" @close="isShowPop = false">
			<view class="popView">
				<view class="pop_item">
					<u--input placeholder="请输入内容" border="surround" v-model="inputValue"></u--input>
				</view>
				<u-button color="#56a96e" text="确认修改" @click="checkInput" :disabled="disabled"></u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		systemTinyuserUpdateUser_Post
	} from '@/api/SYSTEM/用户信息.js';
	import {
		setGloalDataUserInfo_static
	} from '@/utils/loginUtil.js';
	import {
		systemParamsNotenoticeId_Get,
		systemParamsConfigKeyconfigKey_Get
	} from '@/api/SYSTEM/参数字典公告.js';
	export default {
		data() {
			return {
				audit: 'true',
				userInfo: {},
				isShowPicke: false,
				isNewAvatar: false, //是否显示临时头像
				tempAvatar: '', //临时头像地址
				disabled: true, //按钮置灰
				isShowPop: false, //弹出框
				inputValue: '', //输入框值
				inpuType: '', //输入框修改类型
				eduInfo: {},
				cellList: [{
						title: '昵称',
						name: 'nickName'
					},
					{
						title: '性别',
						name: 'sex'
					},
					{
						title: '邮箱',
						name: 'email'
					},
					{
						title: '手机号',
						name: 'phone'
					},
					{
						title: '校园认证',
						name: 'std'
					}
				],
				sexColumns: [
					['小哥哥', '小姐姐', '保密']
				]
			};
		},
		created() {
			this.getParam();
		},
		methods: {
			getParam() {
				systemParamsConfigKeyconfigKey_Get({
					configKey: 'system:show:audit'
				}).then(res => {
					this.audit = res.data.msg;
					console.log(res);
				});
			},
			/* 输入框按钮点击事件 */
			checkInput() {
				if (this.inpuType == 'email' && this.inputValue.indexOf('@') == -1) {
					uni.showToast({
						icon: 'none',
						title: '邮箱地址不合法'
					});
					return;
				}
				let para = {};
				para[this.inpuType] = this.inputValue;
				console.log('构建参数', para);
				this.saveData(para);
			},
			/* 选择头像 */
			selectImg() {
				new Promise((resolve, reject) => {
						uni.chooseImage({
							count: 1,
							success: res => {
								const tempFilePaths = res.tempFiles[0]; //拿到选择的图片，是一个数组
								console.log('图片地址', tempFilePaths);
								resolve(tempFilePaths.path);
							},
							fail: err => {
								reject(err);
							}
						});
					})
					//上传图片
					.then(pathResult => {
						uni.showLoading({
							title: '新头像上传中'
						});
						return new Promise(async (resolve, reject) => {
							try {
								const newUrl = await this.uploadFilePromise(pathResult);
								this.tempAvatar = newUrl;
								this.isNewAvatar = true;
								uni.hideLoading();
								resolve();
							} catch (e) {
								uni.hideLoading();
								reject('返回数据异常');
							}
						});
					})
					.then(() => {
						return new Promise((resolve, reject) => {
							uni.showModal({
								content: '是否更改新头像',
								success: res => {
									if (res.confirm) {
										resolve();
									} else if (res.cancel) {
										this.isNewAvatar = false;
										reject();
									}
								}
							});
						});
					})
					.then(() => {
						let para = {
							avatar: this.tempAvatar
						};
						this.saveData(para);
					})
					.catch(err => {
						console.log('阻断原因', err);
					});
			},
			itemTap(e) {
				console.log('点击', e);
				if (e.name == 'sex') {
					this.isShowPicke = true;
					return;
				}
				if (e.name == 'std') {
					uni.navigateTo({
						url: '/subpages/campusAuthentication/campusAuthentication'
					});
					return;
				}
				if (e.name == 'phone') {
					uni.navigateTo({
						url: '/subpages/phoneChange/phoneChange'
					});
					return;
				}
				this.inputValue = this.userInfo[e.name];
				this.inpuType = e.name;
				this.isShowPop = true;
			},
			/* 确认性别 */
			sexConfirm(e) {
				console.log('选中', e);
				const sex = e.indexs.toString();
				this.saveData({
					sex
				});
			},
			saveData(para) {
				if (!para) return;
				systemTinyuserUpdateUser_Post(para).then(res => {
					console.log('修改结果', res);
					if (res.data.code == 200) {
						this.isShowPicke = false;
						this.isShowPop = false;
						Object.keys(para).map(key => {
							// console.log(key, para[key], this.userInfo[key]);
							this.userInfo[key] = para[key];
						});
						setGloalDataUserInfo_static(this.userInfo);
					}
				});
			},
			/* 获取参数 */
			getValue(para) {
				switch (para) {
					case 'nickName':
						return this.userInfo.nickName;
					case 'sex':
						return this.$options.filters['genderString'](this.userInfo.sex);
					case 'std':
						return this.$options.filters['isAuth'](this.userInfo.isAuth);;
					case 'email':
						return this.userInfo.email;
					case 'add':
						return '学校';
					case 'phone':
						return this.userInfo.phonenumber;
					default:
						return '暂无';
				}
			}
		},
		onShow() {
			this.userInfo = getApp().globalData.wxUserInfo;
			this.eduInfo = getApp().globalData.eduInfo;
		},
		filters: {
			genderString(sex) {
				switch (sex) {
					case '0':
						return '小哥哥';
					case '1':
						return '小姐姐';
					default:
						return '保密';
				}
			},
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
		},
		computed: {
			/* 当前显示头像 */
			showAvatarUrl() {
				return this.isNewAvatar ? this.tempAvatar : this.userInfo.avatar;
			}
		},
		watch: {
			//无内容时按钮置灰
			inputValue(value) {
				value ? (this.disabled = false) : (this.disabled = true);
			}
		}
	};
</script>

<style scoped lang="scss">
	.avatar {
		margin: 6vh auto;
		display: flex;
		justify-content: center;
	}

	$mar: 2vh;

	.popView {
		width: 80%;
		margin: $mar auto;

		.pop_item {
			margin-bottom: $mar;
		}
	}
</style>
