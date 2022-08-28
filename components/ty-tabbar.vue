<template>
	<u-tabbar
		:value="__tabbar_index"
		@change="name => __tabbarTap({ name, path: __tabbar_list[name].pagePath })"
		:fixed="true"
		:placeholder="true"
		:safeAreaInsetBottom="true"
	>
		<u-tabbar-item
			:text="item.text"
			:icon="index == __current_Index ? item.selectedIconPath : item.iconPath"
			v-for="(item, index) in __tabbar_list"
			:key="index"
		></u-tabbar-item>
	</u-tabbar>
</template>

<script>
import { tabbar_mixins } from '@/components/mixins/tabbar.js';
export default {
	name: 'ty-tabbar',
	mixins: [tabbar_mixins],
	mounted() {
		uni.hideTabBar();
	}
};
</script>
