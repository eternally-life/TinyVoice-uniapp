/*** glowxq glowxq@163.com  2022-07-23 22:39:03  生成模板  */

import {
	request,
	requestFile
} from "@/utils/request"
/***  ===========================================================================
 * path: /community/tinyphotos/save
 * summary: 新增 微音证件照
 * 
 */

let creatIdPhoto_params = {
	specid: null, 	//证件照ID(必须)
	color: null, 	//照片底色(必须)
	photowide: null, 	//自定义像素宽
	photohigh: null,	//自定义像素高
	fileSize: null,		//期望的文件大小 [最小值,最大值]单位(kb) 超过这个区间默认无效
	beauty_degree: null,  //美颜系数 [1.0-5.0] 超过这个区间默认无效
	photosFile: null,	//照片文件
}


export function creatIdPhoto_post(creatIdPhoto_params, file) {
	console.log("=========================")
	console.log(file)
	console.log("=========================")
	return requestFile({
		url: `/community/tinyphotos/save`,
		method: 'post',
		params: creatIdPhoto_params,
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
	return request({
		url: `/community/tinyphotosspec/page`,
		method: 'get',
		params: getTinyPhotoSpec_params,
	})
}

/***  ===========================================================================
 * path: /community/tinyphotosspec/pagebyname
 * summary: 模糊搜索并且分页
 * 
 */

let searchPhotoSpec_params = {
	pageNum: null, //第几页
	pageSize: null, //页码大小
	name: null, 	// 排序方式 1-默认 2-下载量 3-热门
}

export function searchPhotoSpec_get(searchPhotoSpec_params) {
	return request({
		url: `/community/tinyphotosspec/pagebyname`,
		method: 'get',
		params: searchPhotoSpec_params,
	})
}

/***  ===========================================================================
 * path: /community/tinyphotosspec/page
 * summary: 获取单个 微音证件照规格 - 根据id获取
 * 
 */

let getPhotoSpecById_params = {
	tinyPhotosSpecId: 2, //证件照规格id
}

export function getPhotoSpecById_get(getPhotoSpecById_params) {
	return request({
		url: `/community/tinyphotosspec/page`,
		method: 'get',
		params: getPhotoSpecById_params,
	})
}

/***  ===========================================================================
 * path: /community/tinyphotos/page
 * summary: 分页获取自己的微音证件照
 * 
 */

let getPhotoData_params={
		pageNum: 1, //第几页
		pageSize: 10,  // 页码大小
}

export function getPhotoData_get(getPhotoData_params) {
	// console.log(getPhotoData_params)
	// console.log('==============================')
	return request({
		url: `/community/tinyphotos/page`,
		method: 'get',
		params: getPhotoData_params,
	})
}

/***  ===========================================================================
 * path: /community/tinyphotos/delete
 * summary: 删除 微音证件照 - 根据id删除
 * 
 */

let deletePhotoById_params={
		photosId: null
}

export function deletePhotoById_delete(deletePhotoById_params) {
	console.log(deletePhotoById_params)
	console.log('==============================')
	return request({
		url: `/community/tinyphotos/delete`,
		method: 'delete',
		data: deletePhotoById_params,
	})
}