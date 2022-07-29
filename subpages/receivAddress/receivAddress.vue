<template>
	<view>
		<u-empty mode="list" text="暂无收货地址" v-if="addList.length == 0"></u-empty>
		<view>
			<view class="view_shadow list" v-for="(item, index) in addList">
				<view class="left">
					<u-avatar :text="item.name | getNameFirstWord" fontSize="20" randomBgColor></u-avatar>
				</view>
				<view class="body" @click="addressTap(item)">
					<view class="tit">
						<text class="name">{{ item.name }}</text>
						<text class="phonenumber">{{ item.phonenumber }}</text>
					</view>
					<view class="add">{{ item.school }} {{ item.apartment }}#{{ item.dormitoryNumber }}</view>
				</view>
				<view class="right" @click="toDelete(item)">
					<u-icon name="close-circle" color="#fa3534" size="28"></u-icon>
				</view>
			</view>
		</view>
		<view class="bottom_box">
			<view class="btn">
				<u-button type="primary" icon="plus" text="添加新收货地址" @click="toEdit()"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
import { systemSysaddrPage_Get, /* 查询 */ systemSysaddrDelete_Delete /* 删除 */ } from '@/api/SYSTEM/收货地址.js';
export default {
	data() {
		return {
			addList: []
		};
	},
	filters: {
		getNameFirstWord(name) {
			return name.substring(0, 1);
		}
	},
	methods: {
		toEdit() {
			uni.navigateTo({
				url: '/subpages/edit_receivAddress/edit_receivAddress'
			});
		},
		addressTap(e) {
			this.$store.commit('sys/setTempAddressInfo', e);
			this.toEdit();
		},
		toDelete(e) {
			console.log('点击要删除的地址', e);
			uni.showModal({
				title: '提醒',
				content: '确定删除该地址',
				confirmColor: '#04c354',
				confirmText: '确认删除',
				success: res => {
					if (res.confirm) {
						this.deleteAddr(e.addrId);
						return;
					} else if (res.cancel) {
					}
				}
			});
		},
		/* 调用删除接口 */
		deleteAddr(addrId) {
			systemSysaddrDelete_Delete([addrId]).then(res => {
				// console.log('结果', res);
				if (res.data.code == 200) {
					this.addList = this.addList.filter(value => value.addrId != addrId);
					uni.$u.toast('删除成功');
				}
			});
		},
		/* 更新静态数据 */
		changeAddr(newAddr) {
			console.log('触发修改', newAddr);
			this.addList.forEach(value => {
				if (value.addrId == newAddr.addrId) {
					value = newAddr;
				}
			});
		},
		/* 刷新、覆盖所有地址数据 */
		refreshAddr() {
			systemSysaddrPage_Get({
				pageNum: 1 /** 第几页    string required:false */,
				pageSize: 20 /** 页码大小    string required:false */
			}).then(res => {
				console.log('更新自己的地址列表', res.data);
				if (res.data.code == 200 && res.data.data.records.length != 0) {
					this.addList = res.data.data.records;
				}
			});
		}
	},
	onLoad() {},
	onUnload() {
		uni.$off('changeAddr');
		uni.$off('refreshAddr');
	},
	onShow() {
		this.$store.commit('sys/setTempAddressInfo', null);
	},
	onReady() {
		uni.$on('changeAddr', this.changeAddr);
		uni.$on('refreshAddr', this.refreshAddr);

		systemSysaddrPage_Get({
			pageNum: 1 /** 第几页    string required:false */,
			pageSize: 20 /** 页码大小    string required:false */
		}).then(res => {
			console.log('获取自己的地址列表', res.data);
			if (res.data.code == 200 && res.data.data.records.length != 0) {
				this.addList = this.addList.concat(res.data.data.records);
			}
		});
	}
};
</script>

<style lang="scss" scoped>
@import '@/style/commonstyle/address.scss';
.list {
	display: flex;
	align-items: center;
	justify-content: space-between;
	.left {
	}
	.body {
		$bodymar: 2vw;
		flex: 9;
		display: flex;
		flex-flow: column;
		margin-left: $bodymar;
		margin-right: $bodymar;
		.tit {
			.name {
				max-width: 40vw;
				display: inline-block;
				font-weight: bolder;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				font-size: 40rpx;
			}
			.phonenumber {
				font-size: 24rpx;
				color: #bebebe;
			}
		}
	}
	.right {
		flex: 1;
		height: 6vh;
		display: flex;
		justify-content: flex-end;
	}
}
</style>
