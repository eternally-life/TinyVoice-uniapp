
/*** glowxq glowxq@163.com  2022-07-17 15:05:23  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /system/sysmsg/updateById
  * summary: 将消息设置为已读
 * tags: 消息提醒
 */
let systemSysmsgUpdateById_Param = {
     msgId: null,   /**     string required:false */
   }
    
export function systemSysmsgUpdateById_Post( systemSysmsgUpdateById_Param    ) {
    return request({
         url:`/system/sysmsg/updateById`,
         method:'post',
                     params:systemSysmsgUpdateById_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /system/sysmsg/save
  * summary: 给用户发 消息提醒(测试用)
 * tags: 消息提醒
 */
let systemSysmsgSave_Body = {
      oppositeUserId: null,   /** 接收方用户ID   integer required: */
      oppositeAvatar: null,   /** 接收方的头像   string required: */
      oppositeNickName: null,   /** 接收方用户昵称   string required: */
      type: null,   /** 消息类型=1-官方,2-微音,3-商城,4-快递,5-个人,6-其他   integer required: */
      content: null,   /** 消息内容   string required: */
    }
    
export function systemSysmsgSave_Post(   systemSysmsgSave_Body) {
    return request({
         url:`/system/sysmsg/save`,
         method:'post',
                      
                 data: systemSysmsgSave_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /system/sysmsg/update/all
  * summary: 将所有 消息设置为已读
 * tags: 消息提醒
 */
    
export function systemSysmsgUpdateAll_Post(   ) {
    return request({
         url:`/system/sysmsg/update/all`,
         method:'post',
                      
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /system/sysmsg/page
  * summary: 分页获取 消息提醒
 * tags: 消息提醒
 */
let systemSysmsgPage_Param = {
     pageNum: null,   /** 第几页    string required:false */
     pageSize: null,   /** 页码大小    string required:false */
     isRead: null,   /** 可为空  1已读,0未读,为空默认获取未读    string required:false */
     type: null,   /** 可为空 消息类型=1-官方,2-微音,3-商城,4-快递,5-个人,6-其他    string required:false */
   }
    
export function systemSysmsgPage_Get( systemSysmsgPage_Param    ) {
    return request({
         url:`/system/sysmsg/page`,
         method:'get',
                     params:systemSysmsgPage_Param  
                
    })
}
/**  =========================================================================== ***/
