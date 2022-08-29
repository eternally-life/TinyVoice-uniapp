
/*** glowxq glowxq@163.com  2022-08-29 21:48:53  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /system/tinytabbar/page
  * summary: 获取 tabbar页面
 * tags: tabbar页面
 */
let systemTinytabbarPage_Param = {
     type: null,   /** 为空返回全部,1返回微信 tabbar,2返回qq tabbar    string required:false */
   }
    
export function systemTinytabbarPage_Get( systemTinytabbarPage_Param    ) {
    return request({
         url:`/system/tinytabbar/page`,
         method:'get',
                     params:systemTinytabbarPage_Param  
                
    })
}
/**  =========================================================================== ***/
