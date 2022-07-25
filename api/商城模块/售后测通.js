
/*** glowxq glowxq@163.com  2022-07-23 22:39:03  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /pay/tinymallafter/payAfter
  * summary: 申请售后
 * tags: 售后(测通)
 */
let payTinymallafterPayAfter_Body = {
      reason: null,   /** 原因   string required: */
      orderId: null,   /** 订单ID   string required: */
      demand: null,   /** 需求   string required: */
    }
    
export function payTinymallafterPayAfter_Post(   payTinymallafterPayAfter_Body) {
    return request({
         url:`/pay/tinymallafter/payAfter`,
         method:'post',
                      
                 data: payTinymallafterPayAfter_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /pay/tinymallafter/closeAfter
  * summary: 关闭售后
 * tags: 售后(测通)
 */
let payTinymallafterCloseAfter_Param = {
     tinyMallOrderId: null,   /** 订单ID    string required:false */
   }
    
export function payTinymallafterCloseAfter_Get( payTinymallafterCloseAfter_Param    ) {
    return request({
         url:`/pay/tinymallafter/closeAfter`,
         method:'get',
                     params:payTinymallafterCloseAfter_Param  
                
    })
}
/**  =========================================================================== ***/
