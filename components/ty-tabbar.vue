<template>
	<!-- #ifdef MP-QQ -->
	<view>
		<view class="saveBottom" :style="[saveStyle]"></view>
		<view class="tabtab" id="tabtab">
			<view
				v-for="(item, index) in __tabbar_list"
				:key="index"
				class="ttttttt"
				@click="__tabbarTap({ name: index, path: __tabbar_list[index].pagePath })"
			>
				<image
					:src="index == __current_Index ? item.selectedIconPath : item.iconPath"
					style="width: 24px; height: 24px;"
					mode="aspectFill"
				></image>
				<text>{{ item.text }}</text>
			</view>
		</view>
	</view>
	<!-- #endif -->
	<!-- #ifdef MP-WEIXIN -->
	<u-tabbar
		:value="__tabbar_index"
		@change="name => __tabbarTap({ name, path: __tabbar_list[name].pagePath })"
		:fixed="true"
		:placeholder="true"
		:safeAreaInsetBottom="true"
		activeColor="#2dc1cf"
	>
		<u-tabbar-item
			:text="item.text"
			:icon="index == __current_Index ? item.selectedIconPath : item.iconPath"
			v-for="(item, index) in __tabbar_list"
			:key="index"
		></u-tabbar-item>
	</u-tabbar>
	<!-- #endif -->
</template>

<script>
import { tabbar_mixins } from '@/components/mixins/tabbar.js';
export default {
	name: 'ty-tabbar',
	mixins: [tabbar_mixins],
	data() {
		return {
			saveSize: 0
		};
	},
	computed: {
		saveStyle() {
			return {
				height: this.saveSize + 'px'
			};
		}
	},
	mounted() {
		
		const query = uni.createSelectorQuery().in(this);
		query
			.select('#tabtab')
			.boundingClientRect(data => {
				console.log('获取到高度', data.height);
				this.saveSize = data.height;
			})
			.exec();
	}
};
</script>

<style lang="scss">
@mixin com {
	width: 100vw;
	background-color: #fff;
}

.tabtab {
	@include com;
	position: fixed;
	display: flex;
	justify-content: space-around;
	border-top: 1px solid rgba(45, 193, 207, 0.1);
	bottom: 0;
	z-index: 2000;
	.ttttttt {
		flex: 1;
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
		padding-top: 10px;
		padding-bottom: 10px;
		font-size: 14px;
	}
}
.saveBottom {
	@include com;
}
</style>
