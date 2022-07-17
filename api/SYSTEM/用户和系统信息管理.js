
/*** glowxq glowxq@163.com  2022-07-17 13:39:04  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /system/user-manage/list
  * summary: 获取参数配置列表
 * tags: 用户和系统信息 管理
 */
let systemUsermanageList_Param = {
     configId: null,   /** 参数主键    string required:false */
     configName: null,   /** 参数名称    string required:false */
     configKey: null,   /** 参数键名    string required:false */
     configValue: null,   /** 参数键值    string required:false */
     configType: null,   /** 系统内置（Y是 N否）    string required:false */
     searchValue: null,   /** 搜索值    string required:false */
     createBy: null,   /** 创建者    string required:false */
     createTime: null,   /** 创建时间    string required:false */
     updateBy: null,   /** 更新者    string required:false */
     updateTime: null,   /** 更新时间    string required:false */
     remark: null,   /** 备注    string required:false */
   }
    
export function systemUsermanageList_Get( systemUsermanageList_Param    ) {
    return request({
         url:`/system/user-manage/list`,
         method:'get',
                     params:systemUsermanageList_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /system/user-manage/getInfo
  * summary: 获取用户 自己的信息
 * tags: 用户和系统信息 管理
 */
    
export function systemUsermanageGetInfo_Get(   ) {
    return request({
         url:`/system/user-manage/getInfo`,
         method:'get',
                      
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /system/user-manage/apply-role-list
  * summary: 获取可以申请的角色
 * tags: 用户和系统信息 管理
 */
    
export function systemUsermanageApplyrolelist_Get(   ) {
    return request({
         url:`/system/user-manage/apply-role-list`,
         method:'get',
                      
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /system/user-manage/byId
  * summary: 根据用户id获取详细信息
 * tags: 用户和系统信息 管理
 */
let systemUsermanageById_Param = {
     userId: null,   /** 用户id    string required:false */
   }
    
export function systemUsermanageById_Get( systemUsermanageById_Param    ) {
    return request({
         url:`/system/user-manage/byId`,
         method:'get',
                     params:systemUsermanageById_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /system/user-manage/alterAvatar
  * summary: 修改用户头像
 * tags: 用户和系统信息 管理
 */
let systemUsermanageAlterAvatar_Param = {
     avatarUrl: null,   /**     string required:false */
   }
    
export function systemUsermanageAlterAvatar_Get( systemUsermanageAlterAvatar_Param    ) {
    return request({
         url:`/system/user-manage/alterAvatar`,
         method:'get',
                     params:systemUsermanageAlterAvatar_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /system/user-manage/sign
  * summary: 签到获得积分
 * tags: 用户和系统信息 管理
 */
    
export function systemUsermanageSign_Get(   ) {
    return request({
         url:`/system/user-manage/sign`,
         method:'get',
                      
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /system/user-manage/alterInfo
  * summary: 修改用户信息
 * tags: 用户和系统信息 管理
 */
let systemUsermanageAlterInfo_Body = {
      nickName: null,   /** 用户昵称   string required: */
      sex: null,   /** 0=男,1=女,2=未知   string required: */
      phonenumber: null,   /** 手机号码   string required: */
      avatar: null,   /** 用户头像   string required: */
      email: null,   /** 用户邮箱   string required: */
    }
    
export function systemUsermanageAlterInfo_Get(   systemUsermanageAlterInfo_Body) {
    return request({
         url:`/system/user-manage/alterInfo`,
         method:'get',
                      
                 data: systemUsermanageAlterInfo_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /system/user-manage/updateUser
  * summary: 修改用户信息,包括改修密码
 * tags: 用户和系统信息 管理
 */
let systemUsermanageUpdateUser_Body = {
      password: null,   /** 密码   string required: */
      integral: null,   /** 用户账号   integer required: */
      nickName: null,   /** 用户昵称   string required: */
      sex: null,   /** 用户性别 0=男,1=女,2=未知   string required: */
      phonenumber: null,   /** 手机号码   string required: */
      avatar: null,   /** 用户头像   string required: */
      email: null,   /** 用户邮箱   string required: */
    }
    
export function systemUsermanageUpdateUser_Post(   systemUsermanageUpdateUser_Body) {
    return request({
         url:`/system/user-manage/updateUser`,
         method:'post',
                      
                 data: systemUsermanageUpdateUser_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /system/user-manage/apply-role
  * summary: 申请角色
 * tags: 用户和系统信息 管理
 */
let systemUsermanageApplyrole_Param = {
     roleId: null,   /** 需要申请的 角色id    string required:false */
   }
    
export function systemUsermanageApplyrole_Get( systemUsermanageApplyrole_Param    ) {
    return request({
         url:`/system/user-manage/apply-role`,
         method:'get',
                     params:systemUsermanageApplyrole_Param  
                
    })
}
/**  =========================================================================== ***/
