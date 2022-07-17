
/*** glowxq glowxq@163.com  2022-07-17 13:39:04  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /system/user-msg-notice/isRead
  * summary: 根据id 设置为已读
 * tags: 消息 公告
 */
let systemUsermsgnoticeIsRead_Param = {
     msgId: null,   /** 消息id    string required:false */
   }
    
export function systemUsermsgnoticeIsRead_Get( systemUsermsgnoticeIsRead_Param    ) {
    return request({
         url:`/system/user-msg-notice/isRead`,
         method:'get',
                     params:systemUsermsgnoticeIsRead_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /system/user-msg-notice/list
  * summary: 获取通知公告列表
 * tags: 消息 公告
 */
let systemUsermsgnoticeList_Param = {
     noticeId: null,   /** 公告ID    string required:false */
     noticeTitle: null,   /** 公告标题    string required:false */
     noticeType: null,   /** 公告类型（1通知 2公告）    string required:false */
     noticeContent: null,   /** 公告内容    string required:false */
     status: null,   /** 公告状态（0正常 1关闭）    string required:false */
     searchValue: null,   /** 搜索值    string required:false */
     createBy: null,   /** 创建者    string required:false */
     createTime: null,   /** 创建时间    string required:false */
     updateBy: null,   /** 更新者    string required:false */
     updateTime: null,   /** 更新时间    string required:false */
     remark: null,   /** 备注    string required:false */
   }
    
export function systemUsermsgnoticeList_Get( systemUsermsgnoticeList_Param    ) {
    return request({
         url:`/system/user-msg-notice/list`,
         method:'get',
                     params:systemUsermsgnoticeList_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /system/user-msg-notice/isReadAll
  * summary: 设置所有未读消息为已读
 * tags: 消息 公告
 */
    
export function systemUsermsgnoticeIsReadAll_Get(   ) {
    return request({
         url:`/system/user-msg-notice/isReadAll`,
         method:'get',
                      
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /system/user-msg-notice/detail
  * summary: 获取消息通知详细信息 根据id
 * tags: 消息 公告
 */
let systemUsermsgnoticeDetail_Param = {
     msgId: null,   /** 消息id    string required:false */
   }
    
export function systemUsermsgnoticeDetail_Get( systemUsermsgnoticeDetail_Param    ) {
    return request({
         url:`/system/user-msg-notice/detail`,
         method:'get',
                     params:systemUsermsgnoticeDetail_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /system/user-msg-notice/userSendMsg
  * summary: 消耗积分向用户发送消息
 * tags: 消息 公告
 */
let systemUsermsgnoticeUserSendMsg_Body = {
      acceptUserId: null,   /** 接收的用户id   integer required: */
      text: null,   /** 消息内容   string required: */
      title: null,   /** 消息标题   string required: */
    }
    
export function systemUsermsgnoticeUserSendMsg_Post(   systemUsermsgnoticeUserSendMsg_Body) {
    return request({
         url:`/system/user-msg-notice/userSendMsg`,
         method:'post',
                      
                 data: systemUsermsgnoticeUserSendMsg_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /system/user-msg-notice/delete/ids
  * summary: 删除 多个 根据ids 消息通知
 * tags: 消息 公告
 */
let systemUsermsgnoticeDeleteIds_Param = {
     msgIds: null,   /** 多个id    string required:false */
   }
    
export function systemUsermsgnoticeDeleteIds_Delete( systemUsermsgnoticeDeleteIds_Param    ) {
    return request({
         url:`/system/user-msg-notice/delete/ids`,
         method:'delete',
                     params:systemUsermsgnoticeDeleteIds_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /system/user-msg-notice/list-unread
  * summary: 查询消息通知列表
 * tags: 消息 公告
 */
let systemUsermsgnoticeListunread_Param = {
     msgType: null,   /** 消息类型-1=系统消息.2=用户消息,3=动态消息 可为空,为空默认默认不筛选    string required:false */
     readType: null,   /** 为空则全部,0为未读,1为已读    string required:false */
   }
    
export function systemUsermsgnoticeListunread_Get( systemUsermsgnoticeListunread_Param    ) {
    return request({
         url:`/system/user-msg-notice/list-unread`,
         method:'get',
                     params:systemUsermsgnoticeListunread_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /system/user-msg-notice/delete/id
  * summary: 删除 单个 根据id 消息通知
 * tags: 消息 公告
 */
let systemUsermsgnoticeDeleteId_Param = {
     msgId: null,   /** 多个id    string required:false */
   }
    
export function systemUsermsgnoticeDeleteId_Delete( systemUsermsgnoticeDeleteId_Param    ) {
    return request({
         url:`/system/user-msg-notice/delete/id`,
         method:'delete',
                     params:systemUsermsgnoticeDeleteId_Param  
                
    })
}
/**  =========================================================================== ***/
