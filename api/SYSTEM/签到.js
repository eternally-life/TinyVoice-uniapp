
/*** glowxq glowxq@163.com  2022-07-17 15:05:23  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /system/syssign/page
  * summary: 分页获取 签到
 * tags: 签到
 */
let systemSyssignPage_Param = {
     pageNum: null,   /** 第几页    string required:false */
     pageSize: null,   /** 页码大小    string required:false */
   }
    
export function systemSyssignPage_Get( systemSyssignPage_Param    ) {
    return request({
         url:`/system/syssign/page`,
         method:'get',
                     params:systemSyssignPage_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /system/syssign/save
  * summary: 签到
 * tags: 签到
 */
    
export function systemSyssignSave_Post(   ) {
    return request({
         url:`/system/syssign/save`,
         method:'post',
                      
                
    })
}
/**  =========================================================================== ***/
