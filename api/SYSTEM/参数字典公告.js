
/*** glowxq glowxq@163.com  2022-07-17 15:05:23  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /system/params/note/${systemParamsNotenoticeId_Param["noticeId"]}
  * summary: 根据通知公告编号获取详细信息
 * tags: 参数-字典-公告
 */
let systemParamsNotenoticeId_Param = {
     noticeId: null,   /** 通知公告编号    string required:true */
   }
    
export function systemParamsNotenoticeId_Get( systemParamsNotenoticeId_Param    ) {
    return request({
         url:`/system/params/note/${systemParamsNotenoticeId_Param["noticeId"]}`,
         method:'get',
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /system/params/type/${systemParamsTypedictType_Param["dictType"]}
  * summary: 根据字典类型查询字典数据信息
 * tags: 参数-字典-公告
 */
let systemParamsTypedictType_Param = {
     dictType: null,   /** 字典类型    string required:true */
   }
    
export function systemParamsTypedictType_Get( systemParamsTypedictType_Param    ) {
    return request({
         url:`/system/params/type/${systemParamsTypedictType_Param["dictType"]}`,
         method:'get',
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /system/params/configKey/${systemParamsConfigKeyconfigKey_Param["configKey"]}
  * summary: 根据参数键名查询参数值
 * tags: 参数-字典-公告
 */
let systemParamsConfigKeyconfigKey_Param = {
     configKey: null,   /** 参数键名    string required:true */
   }
    
export function systemParamsConfigKeyconfigKey_Get( systemParamsConfigKeyconfigKey_Param    ) {
    return request({
         url:`/system/params/configKey/${systemParamsConfigKeyconfigKey_Param["configKey"]}`,
         method:'get',
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /system/params/conf/list
  * summary: 获取配置列表
 * tags: 参数-字典-公告
 */
    
export function systemParamsConfList_Get(   ) {
    return request({
         url:`/system/params/conf/list`,
         method:'get',
                      
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /system/params/note/list
  * summary: 获取公告列表
 * tags: 参数-字典-公告
 */
    
export function systemParamsNoteList_Get(   ) {
    return request({
         url:`/system/params/note/list`,
         method:'get',
                      
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /system/params/dict/list
  * summary: 获取字典列表
 * tags: 参数-字典-公告
 */
    
export function systemParamsDictList_Get(   ) {
    return request({
         url:`/system/params/dict/list`,
         method:'get',
                      
                
    })
}
/**  =========================================================================== ***/
