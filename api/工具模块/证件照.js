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
