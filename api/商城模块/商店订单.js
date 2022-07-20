
/*** glowxq glowxq@163.com  2022-07-20 18:56:16  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /tinymallorder/save
  * summary: 新增 商店订单
 * tags: 商店订单
 */
let tinymallorderSave_Body = {
      unitPrice: null,   /** 单价-单位分   integer required: */
      mallName: null,   /** 商店名   string required: */
      serialNumber: null,   /** 商品32位流水号   string required: */
      commodityNumber: null,   /** 四位取货码   string required: */
      quantity: null,   /** 订单购买数量   integer required: */
      orderId: null,   /** 订单id-主键   integer required: */
      totalPrice: null,   /** 总价-单位分   integer required: */
      payTime: null,   /** 付款时间戳   integer required: */
      mallId: null,   /** 商店id   integer required: */
      lastOperationUser: null,   /** 订单最后操作信息   string required: */
      statusValue: null,   /** 订单状态=文字描述   string required: */
      phonenumber: null,   /** 联系方式=电话   string required: */
      payUserId: null,   /** 购买的用户id   integer required: */
      remark: null,   /** 备注   string required: */
      commodityId: null,   /** 商品id   integer required: */
      content: null,   /** 主体介绍   string required: */
      wxPayNumber: null,   /** 微信付款订单号   string required: */
      createTime: null,   /** 商品订单的时间戳   integer required: */
      addrJson: null,   /** 地址json   string required: */
      addrId: null,   /** 地址ID   integer required: */
      specificationName: null,   /** 规格名   string required: */
      commodityName: null,   /** 商品名   string required: */
      status: null,   /** 订单状态=1-已下单未付款,2-已付款,3-出库,4-订单完成,5-退款关闭订单,6-售后,7-售后完成   integer required: */
    }
    
export function tinymallorderSave_Post(   tinymallorderSave_Body) {
    return request({
         url:`/tinymallorder/save`,
         method:'post',
                      
                 data: tinymallorderSave_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /tinymallorder/byId
  * summary: 获取单个 商店订单 - 根据id获取
 * tags: 商店订单
 */
let tinymallorderById_Param = {
     tinyMallOrderId: null,   /**     string required:false */
   }
    
export function tinymallorderById_Get( tinymallorderById_Param    ) {
    return request({
         url:`/tinymallorder/byId`,
         method:'get',
                     params:tinymallorderById_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /tinymallorder/page
  * summary: 分页获取 商店订单
 * tags: 商店订单
 */
let tinymallorderPage_Param = {
     pageNum: null,   /** 第几页    string required:false */
     pageSize: null,   /** 页码大小    string required:false */
   }
    
export function tinymallorderPage_Get( tinymallorderPage_Param    ) {
    return request({
         url:`/tinymallorder/page`,
         method:'get',
                     params:tinymallorderPage_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /tinymallorder/delete
  * summary: 删除 商店订单 - 根据id删除
 * tags: 商店订单
 */
    
export function tinymallorderDelete_Delete(   ) {
    return request({
         url:`/tinymallorder/delete`,
         method:'delete',
                      
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /tinymallorder/update
  * summary: 修改 商店订单 - 根据id更新非空值
 * tags: 商店订单
 */
let tinymallorderUpdate_Body = {
      unitPrice: null,   /** 单价-单位分   integer required: */
      mallName: null,   /** 商店名   string required: */
      serialNumber: null,   /** 商品32位流水号   string required: */
      commodityNumber: null,   /** 四位取货码   string required: */
      quantity: null,   /** 订单购买数量   integer required: */
      orderId: null,   /** 订单id-主键   integer required: */
      totalPrice: null,   /** 总价-单位分   integer required: */
      payTime: null,   /** 付款时间戳   integer required: */
      mallId: null,   /** 商店id   integer required: */
      lastOperationUser: null,   /** 订单最后操作信息   string required: */
      statusValue: null,   /** 订单状态=文字描述   string required: */
      phonenumber: null,   /** 联系方式=电话   string required: */
      payUserId: null,   /** 购买的用户id   integer required: */
      remark: null,   /** 备注   string required: */
      commodityId: null,   /** 商品id   integer required: */
      content: null,   /** 主体介绍   string required: */
      wxPayNumber: null,   /** 微信付款订单号   string required: */
      createTime: null,   /** 商品订单的时间戳   integer required: */
      addrJson: null,   /** 地址json   string required: */
      addrId: null,   /** 地址ID   integer required: */
      specificationName: null,   /** 规格名   string required: */
      commodityName: null,   /** 商品名   string required: */
      status: null,   /** 订单状态=1-已下单未付款,2-已付款,3-出库,4-订单完成,5-退款关闭订单,6-售后,7-售后完成   integer required: */
    }
    
export function tinymallorderUpdate_Put(   tinymallorderUpdate_Body) {
    return request({
         url:`/tinymallorder/update`,
         method:'put',
                      
                 data: tinymallorderUpdate_Body
    })
}
/**  =========================================================================== ***/
