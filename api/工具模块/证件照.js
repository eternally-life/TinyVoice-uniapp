/*** glowxq glowxq@163.com  2022-07-23 22:39:03  生成模板  */
import {
	requestFile
} from "@/utils/request"
/***  ===========================================================================
 * path: /community/tinyserve/page
 * summary: 提交证件照图片
 * 
 */

let submitIdPhoto_params = {
	file: null, //图片OSS路径
	type: null, //证件照处理类型
	color: null, //底色
}
// let filePames = {
// 	file: null, //图片OSS路径
// }


export function submitIdPhoto_post(submitIdPhoto_params, file) {
	return requestFile({
		url: `/community/tinyservephotos/save`,
		// url: `/community/tinyservephotos/save?type=${type}&color=${color}&file=${file}`,
		method: 'post',
		params: submitIdPhoto_params,
		file: file
	})
}


/***  ===========================================================================
 * path: /community/tinyphotosspec/page
 * summary: 分页获取 微音证件照规格
 * 
 */

let getTinyPhotoSpec_params = {
	pageNum: null, //第几页
	pageSize: null, //页码大小
	sort: null, 	// 排序方式 1-默认 2-下载量 3-热门
}

export function getTinyPhotoSpec_get(getTinyPhotoSpec_params) {
console.log(getTinyPhotoSpec_params)
	return requestFile({
		url: `/community/tinyphotosspec/page`,
		method: 'get',
		params: getTinyPhotoSpec_params
	})
}
