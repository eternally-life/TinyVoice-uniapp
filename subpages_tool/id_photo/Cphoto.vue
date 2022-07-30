<template>
				<u-upload
					:fileList="fileList3"
					@afterRead="afterRead"
					@delete="deletePic"
					name="3"
					multiple
					:maxCount="1"
					:previewFullImage="true"
				></u-upload>
</template>

<script>
	export default {
				data(){
					return{
						fileList3: [{
							url: '',
						}],
					}
				}
				}
</script>

<style>
				
</style>