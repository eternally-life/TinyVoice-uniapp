/** 公共方法 
 * 使用方法 
 * import { funtionName } from '@/utils/Utils-tool.js';
 */

// 获取随机数方法
export function random(min = 0, max = 50) {
	return Math.floor(Math.random() * max) + min;
}


/**清除输入两端空格 用于string判空
 * */
export function uniTrim(str) {
	if (String.prototype.trim) {
		return str.trim();
	}
	return str.replace(/^\s+(.*?)\s+$/g, "$1");
}
