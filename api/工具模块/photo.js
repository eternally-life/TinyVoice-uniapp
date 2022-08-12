/***  ===========================================================================
 * path: /community/tinyserve/page
  * summary: 提交证件照图片
  * 
	file:图片OSS路径
	type:证件照处理类型
	color：底色
 */

export function photo_post(file,type,color) {
   return request({
        url:'/mock/130/static',
        method:'post'
   })
}