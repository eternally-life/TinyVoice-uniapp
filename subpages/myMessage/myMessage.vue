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
		<view class="empty" v-if="msgList.length == 0"><u-empty mode="list"></u-empty></view>
		<view class="bottom_box" v-show="nowCrrent == 0 && msgList.length != 0">
			<view class="btn">
				<u-button type="primary" icon="file-text" text="全部消息设置为已读" @click="allin()"></u-button>
			</view>
		</view>
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
			this.msgList = [];
			this.nowCrrent = index;
			this.getNoticeList();
			// console.log('index', index);
		},
		swipeClick(e) {
			console.log('点击', e);
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
