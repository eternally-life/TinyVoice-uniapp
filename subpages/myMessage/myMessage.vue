<template>
	<view>
		<u-sticky bgColor="#fff">
			<view class="tabs"><u-subsection :list="tabList" :current="nowCrrent" @change="click"></u-subsection></view>
		</u-sticky>
		<view class="container">
			<u-swipe-action>
				<u-swipe-action-item
					@click="swipeClick"
					:name="item.msgId"
					:options="options1"
					v-for="(item, index) in msgList"
					:key="item.msgId"
					:disabled="nowCrrent == 1"
					:autoClose="true"
				>
					<view class="swipe-action u-border-top u-border-bottom">
						<view class="swipe-action__content list_content">
							<view class="avatar"><u-avatar :src="item.avatar"></u-avatar></view>
							<view class="text_concontent">
								<view class="text_concontent_nickName">{{ item.nickName }}</view>
								<view class="text_concontent_content">{{ item.content }}</view>
							</view>
						</view>
					</view>
				</u-swipe-action-item>
			</u-swipe-action>
		</view>
		<view class="empty" v-if="msgList.length == 0 && !loadStatu"><u-empty mode="list"></u-empty></view>
		<view class="bottom_box" v-if="nowCrrent == 0 && msgList.length > 0 && !loadStatu">
			<view class="btn">
				<u-button type="primary" icon="file-text" text="全部消息设置为已读" @click="allin()"></u-button>
			</view>
		</view>
		<view><u-loading-page :loading="loadStatu" loading-text="消息加载中..."></u-loading-page></view>
	</view>
</template>

<script>
import {
	systemSysmsgPage_Get /* 获取消息列表*/,
	systemSysmsgUpdateById_Post /* 单个消息设置已读 */,
	systemSysmsgUpdateAll_Post /* 全部已读 */
} from '@/api/SYSTEM/消息提醒.js';
export default {
	data() {
		return {
			tabList: ['未读', '已读'],
			loadStatu: true, //加载状态锁
			nowCrrent: 0,
			msgList: [],
			options1: [
				{
					text: '已读',
					style: {
						backgroundColor: '#f56c6c'
					}
				}
			]
		};
	},
	onShow() {
		this.getNoticeList();
	},
	methods: {
		click(index) {
			if (index == this.nowCrrent) return;
			this.loadStatu = true;
			this.msgList = [];
			this.nowCrrent = index;
			this.getNoticeList();
			// console.log('index', index);
		},
		swipeClick(e) {
			console.log('点击已读', e);
			systemSysmsgUpdateById_Post({ msgId: e.name }).then(res => {
				console.log('已读结果', res);
				if (res.data.code == 200) {
					this.msgList = this.msgList.filter(value => {
						return value.msgId != e.name;
					});
					// 更新user数据
					uni.$emit('changeNoticCount', this.msgList.length);
				}
			});
		},
		getNoticeList() {
			systemSysmsgPage_Get({
				isRead: this.nowCrrent.toString() /** 可为空  1已读,0未读,为空默认获取未读    string required:false */,
				pageNum: 1 /** 第几页    string required:false */,
				pageSize: 50 /**, 页码大小    string required:false */
			}).then(res => {
				// console.log(this.nowCrrent.toString(), '消息', res.data.data.records);
				// if (res.data.data.records.length > 0) {
				this.msgList = res.data.data.records;
				this.loadStatu = false;
				// if (this.nowCrrent == 0) {
				// 	[0, 1, 2, 3, 4].map((val, index) => {
				// 		this.msgList = this.msgList.concat(this.msgList);
				// 		console.log('遍历', index, this.msgList);
				// 	});
				// }
				// }
			});
		},
		allin() {
			new Promise((resolve, reject) => {
				uni.showModal({
					title: '温馨提示',
					content: '确定将所有未读消息设置为已读吗？',
					success: res => {
						res.confirm && resolve();
						res.cancel && reject('用户点击取消');
					}
				});
			})
				.then(() => {
					console.log('用户点击确定');
					systemSysmsgUpdateAll_Post().then(res => {
						console.log('全选结果', res);
						if (res.data.code == 200) {
							this.msgList = [];
						}
						// 更新user数据
						uni.$emit('changeNoticCount', this.msgList.length);
					});
				})
				.catch(err => {
					console.log('中断原因', err);
				});
		}
	}
};
</script>

<style scoped lang="scss">
@import '@/style/commonstyle/address.scss';
.tabs {
	margin: 0 auto;
	width: 70vw;
}
.container {
	padding-bottom: 10vh;
	.swipe-action {
		&__content {
			padding: 20rpx;
		}
		.list_content {
			display: flex;
			flex-wrap: nowrap;
			justify-content: space-between;
			.avatar {
				flex: 1;
			}
			.text_concontent {
				flex: 8;
				padding-left: 30rpx;
				&_nickName {
					font-size: 30rpx;
					font-weight: bolder;
					color: $u-main-color;
				}
				&_content {
					margin-top: 8rpx;
					color: $u-info;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 3;
					overflow: hidden;
				}
			}
		}
	}
}
.empty {
	width: 100%;
	margin: 30vh auto;
}
</style>
