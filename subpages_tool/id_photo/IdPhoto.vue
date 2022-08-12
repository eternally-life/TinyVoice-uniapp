<template>
	<view class="u-page">
			<u-cell-group>
				<u-cell
				    title="教师资格证"
				    isLink
				    url="/pages/componentsB/tag/tag"
					@click="Tphoto"
				></u-cell>
				<u-cell
				    title="计算机等级考试"
				    isLink
				    url="/subpages_tool/id_photo/CPhoto"
					@click="Cphoto"
				></u-cell>
				<u-cell
				    title="普通话考试"
				    isLink
				    url="/pages/componentsB/tag/tag"
					@click="PTHphoto"
				></u-cell>
				<u-cell
				    title="英语四六级"
				    isLink
				    url="/pages/componentsB/tag/tag"
					@click="ENphoto"
				></u-cell>
				<u-cell
				    title="考研"
				    isLink
				    url="/pages/componentsB/tag/tag"
					@click="KYphoto"
				></u-cell>
				<u-cell
				    title="一寸照"
				    isLink
				    url="/pages/componentsB/tag/tag"
					@click="YCphoto"
				></u-cell>
				<u-cell
				    title="二寸照"
				    isLink
				    url="/pages/componentsB/tag/tag"
					@click="ERphoto"
				></u-cell>
				</u-cell-group>
		</view>
</template>

<script>
	export default {
			data() {
				return {}
			},
			
			methods:{
				click(name) {
				    this.$refs.uToast.success(`点击了第${name}个`)
				},
				Tphoto() {
					uni.navigateTo({
							url: '/subpages_tool/id_photo/photo_handle?type=1'
					});
					 
					console.log('ok')
				},
				Cphoto() {
					uni.navigateTo({
						url: '/subpages_tool/id_photo/Cphoto'
					})
				},
				PTHphoto() {
					
				},
				ENphoto() {
					
				},
				KYphoto() {
					
				},
				YCphoto() {
					
				},
				ERphoto() {
					
				},
			}
		};
</script>

<style lang="scss">
</style>