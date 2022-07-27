/*** glowxq glowxq@163.com  2022-07-23 22:39:03  生成模板  */
import {
	request
} from "@/utils/request"



/***  ===========================================================================
 * path: /pay/tinymallshopping/update
 * summary: 修改 购物车 - 根据id更新非空值
 * tags: 购物车(测通)
 */
let payTinymallshoppingUpdate_Body = {
	shoppingId: null,
	/** 购物车ID-主键   integer required: */
	quantity: null,
	/** 订单购买数量   integer required: */
	commodityId: null,
	/** 商品id   integer required: */
	skuId: null,
	/** 规格ID   integer required: */
}

export function payTinymallshoppingUpdate_Put(payTinymallshoppingUpdate_Body) {
	return request({
		url: `/pay/tinymallshopping/update`,
		method: 'put',

		data: payTinymallshoppingUpdate_Body
	})
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /pay/tinymallshopping/delete
 * summary: 删除 购物车 - 根据id删除
 * tags: 购物车(测通)
 */

export function payTinymallshoppingDelete_Delete(data) {
	return request({
		url: `/pay/tinymallshopping/delete`,
		method: 'delete',
		data: data

	})
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /pay/tinymallshopping/page
 * summary: 分页获取 购物车
 * tags: 购物车(测通)
 */
let payTinymallshoppingPage_Param = {
	pageNum: null,
	/** 第几页    string required:false */
	pageSize: null,
	/** 页码大小    string required:false */
}

export function payTinymallshoppingPage_Get(payTinymallshoppingPage_Param) {
	return request({
		url: `/pay/tinymallshopping/page`,
		method: 'get',
		params: payTinymallshoppingPage_Param

	})
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /pay/tinymallshopping/deleteAll
 * summary: 清空 购物车
 * tags: 购物车(测通)
 */

export function payTinymallshoppingDeleteAll_Delete() {
	return request({
		url: `/pay/tinymallshopping/deleteAll`,
		method: 'delete',


	})
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /pay/tinymallshopping/save
 * summary: 添加 购物车
 * tags: 购物车(测通)
 */
let payTinymallshoppingSave_Body = {
	quantity: null,
	/** 订单购买数量   integer required: */
	commodityId: null,
	/** 商品id   integer required: */
	skuId: null,
	/** 规格ID   integer required: */
}

export function payTinymallshoppingSave_Post(payTinymallshoppingSave_Body) {
	return request({
		url: `/pay/tinymallshopping/save`,
		method: 'post',

		data: payTinymallshoppingSave_Body
	})
}
/**  =========================================================================== ***/
