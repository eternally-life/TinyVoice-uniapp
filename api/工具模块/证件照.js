/*** glowxq glowxq@163.com  2022-07-23 22:39:03  生成模板  */
import {
	request
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


export function submitIdPhoto_post(submitIdPhoto_params) {
	uni.uploadFile({
		url:`http://106.52.58.11:12574/community/tinyservephotos/save?color=1&type=1`,
		filePath:submitIdPhoto_params.file,
		name:'file',
		formData:{
			color:submitIdPhoto_params.color,
			type:submitIdPhoto_params.type
		},
		success:(res)=>{
			console.log(res);
		}
		// color:submitIdPhoto_params.color
	})
	// return request({
	// 	url: `/community/tinyservephotos/save`,
	// 	// url: `/community/tinyservephotos/save?type=${type}&color=${color}&file=${file}`,
	// 	method: 'post',
	// 	params: submitIdPhoto_params
	// })
}
