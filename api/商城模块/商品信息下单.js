/*** glowxq glowxq@163.com  2022-07-23 22:39:03  生成模板  */
import {
	request
} from "@/utils/request"



/***  ===========================================================================
 * path: /pay/tinymall/pageMallCommodity
 * summary: 分页获取 商品,可根据分类筛选
 * tags: 商品信息-下单(测通)
 */
let payTinymallPageMallCommodity_Param = {
	pageNum: null,
	/** 第几页    string required:false */
	pageSize: null,
	/** 页码大小    string required:false */
	mallId: null,
	/** 根据商店ID筛选    string required:false */
	name: null,
	/** 根据名字筛选    string required:false */
}

export function payTinymallPageMallCommodity_Get(payTinymallPageMallCommodity_Param) {
	return request({
		url: `/pay/tinymall/pageMallCommodity`,
		method: 'get',
		params: payTinymallPageMallCommodity_Param

	})
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /pay/tinymall/refund
 * summary: 退款
 * tags: 商品信息-下单(测通)
 */
let payTinymallRefund_Param = {
	tinyMallOrderId: null,
	/**     string required:false */
}

export function payTinymallRefund_Get(payTinymallRefund_Param) {
	return request({
		url: `/pay/tinymall/refund`,
		method: 'get',
		params: payTinymallRefund_Param

	})
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /pay/tinymall/pageMallType
 * summary: 分页获取 商品分类
 * tags: 商品信息-下单(测通)
 */
let payTinymallPageMallType_Param = {
	pageNum: null,
	/** 第几页    string required:false */
	pageSize: null,
	/** 页码大小    string required:false */
	schoolId: null,
	/** 根据学校ID筛选    string required:false */
	name: null,
	/** 根据名字筛选    string required:false */
}

export function payTinymallPageMallType_Get(payTinymallPageMallType_Param) {
	return request({
		url: `/pay/tinymall/pageMallType`,
		method: 'get',
		params: payTinymallPageMallType_Param

	})
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /pay/tinymall/getSku
 * summary: 通过商品ID 获取商品规格参数
 * tags: 商品信息-下单(测通)
 */
let payTinymallGetSku_Param = {
	commodityId: null,
	/** 商品ID    string required:false */
}

export function payTinymallGetSku_Get(payTinymallGetSku_Param) {
	return request({
		url: `/pay/tinymall/getSku`,
		method: 'get',
		params: payTinymallGetSku_Param

	})
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /pay/tinymall/getSku
 * summary: 通过商品ID 获取商品规格参数
 * tags: 商品信息-下单(测通)
 */
let SkuID_Param = {
	skuId: null,
	/** 商品ID    string required:false */
}

export function payskuId_Get(SkuID_Param) {
	return request({
		url: `/pay/tinymall/getSkuBySkuId`,
		method: 'get',
		params: SkuID_Param

	})
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /pay/tinymall/pageOrder
 * summary: 分页获取 自己的订单
 * tags: 商品信息-下单(测通)
 */
let payTinymallPageOrder_Param = {
	pageNum: null,
	/** 第几页    string required:false */
	pageSize: null,
	/** 页码大小    string required:false */
	mallId: null,
	/** 商店ID    string required:false */
	commodityId: null,
	/** 商品ID    string required:false */
	status: null,
	/** 订单状态=1-已下单未付款,2-已付款,3-出库,4-订单完成,5-退款关闭订单,6-售后,7-售后完成    string required:false */
	screenTime: null,
	/** 时间筛选-可为空 默认筛选3天 值为筛选第 n 天内微音    string required:false */
}

export function payTinymallPageOrder_Get(payTinymallPageOrder_Param) {
	return request({
		url: `/pay/tinymall/pageOrder`,
		method: 'get',
		params: payTinymallPageOrder_Param

	})
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /pay/tinymall/pageMall
 * summary: 分页获取 分类及其商品
 * tags: 商品信息-下单(测通)
 */
let payTinymallPageMall_Param = {
	pageNum: null,
	/** 第几页    string required:false */
	pageSize: null,
	/** 页码大小    string required:false */
	schoolId: null,
	/** 根据商店ID筛选    string required:false */
	name: null,
	/** 根据名字筛选    string required:false */
}

export function payTinymallPageMall_Get(payTinymallPageMall_Param) {
	return request({
		url: `/pay/tinymall/pageMall`,
		method: 'get',
		params: payTinymallPageMall_Param

	})
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /pay/tinymall/createOrder
 * summary: 下单 商店订单
 * tags: 商品信息-下单(测通)
 */
let payTinymallCreateOrder_Body = {
	phonenumber: null,
	/** 联系方式=电话   string required: */
	orderData: null,
	/** 订单数据   object required: */
	addrId: null,
	/** 地址ID   integer required: */
}

export function payTinymallCreateOrder_Post(payTinymallCreateOrder_Body) {
	return request({
		url: `/pay/tinymall/createOrder`,
		method: 'post',

		data: payTinymallCreateOrder_Body
	})
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /pay/tinymall/reloadPay
 * summary: 重新付款
 * tags: 商品信息-下单(测通)
 */
let payTinymallReloadPay_Param = {
	tinyMallOrderId: null,
	/**     string required:false */
}

export function payTinymallReloadPay_Get(payTinymallReloadPay_Param) {
	return request({
		url: `/pay/tinymall/reloadPay`,
		method: 'get',
		params: payTinymallReloadPay_Param

	})
}
/**  =========================================================================== ***/
