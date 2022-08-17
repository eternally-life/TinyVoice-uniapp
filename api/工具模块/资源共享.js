/*** glowxq glowxq@163.com  2022-07-31 19:39:29  生成模板  */
import {
	request,
	requestFile
} from "@/utils/request"



/***  ===========================================================================
 * path: /community/tinyserveresource/save
 * summary: 新增 资源
 * tags: 资源共享
 */
let communityTinyserveresourceSave_Body = {
	integral: null,
	/** 所需积分   integer required: */
	name: null,
	/** 资源名   string required: */
	describe: null,
	/** 资源描述   string required: */
	file: null,
	/** 资源地址   string required: */
}

export function communityTinyserveresourceSave_Post(communityTinyserveresourceSave_Body ,file) {
	console.log(communityTinyserveresourceSave_Body,file);
	console.log("****************");
	return requestFile({
		url: `/community/tinyserveresource/save`,
		method: 'post',
		params: communityTinyserveresourceSave_Body,
		file: file
	})
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /community/tinyserveresource/byResourceId
 * summary: 获取单个资源的所有回复 - 根据资源id获取
 * tags: 资源共享
 */
let communityTinyserveresourceByResourceId_Param = {
	resourceId: null,
	/** 资源ID    string required:false */
}

export function communityTinyserveresourceByResourceId_Get(communityTinyserveresourceByResourceId_Param) {
	return request({
		url: `/community/tinyserveresource/byResourceId`,
		method: 'get',
		params: communityTinyserveresourceByResourceId_Param

	})
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /community/tinyserveresource/down
 * summary: 下载资源
 * tags: 资源共享
 */
let communityTinyserveresourceDown_Param = {
	id: null,
	/**     string required:false */
}

export function communityTinyserveresourceDown_Get(communityTinyserveresourceDown_Param) {
	return request({
		url: `/community/tinyserveresource/down`,
		method: 'get',
		params: communityTinyserveresourceDown_Param

	})
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /community/tinyserveresource/saveReply
 * summary: 评论资源
 * tags: 资源共享
 */
let communityTinyserveresourceSaveReply_Body = {
	resourceId: null,
	/** 资源ID   integer required: */
	content: null,
	/** 回复文本   string required: */
}

export function communityTinyserveresourceSaveReply_Post(communityTinyserveresourceSaveReply_Body) {
	return request({
		url: `/community/tinyserveresource/saveReply`,
		method: 'post',

		data: communityTinyserveresourceSaveReply_Body
	})
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /community/tinyserveresource/page
 * summary: 分页获取 资源共享并且根据下载量排序
 * tags: 资源共享
 */
let communityTinyserveresourcePage_Param = {
	pageNum: null,
	/** 第几页    string required:false */
	pageSize: null,
	/** 页码大小    string required:false */
}

export function communityTinyserveresourcePage_Get(communityTinyserveresourcePage_Param) {
	return request({
		url: `/community/tinyserveresource/page`,
		method: 'get',
		params: communityTinyserveresourcePage_Param

	})
}
/**  =========================================================================== ***/
