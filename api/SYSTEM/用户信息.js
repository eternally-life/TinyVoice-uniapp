
/*** glowxq glowxq@163.com  2022-07-17 15:05:23  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /system/tiny-user/update/user
  * summary: 修改用户信息(包括头像)
 * tags: 用户信息
 */
let systemTinyuserUpdateUser_Body = {
      nickName: null,   /** 用户昵称   string required: */
      sex: null,   /** 用户性别 0=男,1=女,2=未知   string required: */
      avatar: null,   /** 用户头像   string required: */
      email: null,   /** 用户邮箱   string required: */
    }
    
export function systemTinyuserUpdateUser_Post(   systemTinyuserUpdateUser_Body) {
    return request({
         url:`/system/tiny-user/update/user`,
         method:'post',
                      
                 data: systemTinyuserUpdateUser_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /system/tiny-user/getInfo
  * summary: 获取用户自己的信息
 * tags: 用户信息
 */
    
export function systemTinyuserGetInfo_Get(   ) {
    return request({
         url:`/system/tiny-user/getInfo`,
         method:'get',
                      
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /system/tiny-user/getInfoByUserId
  * summary: 根据用户编号获取详细信息
 * tags: 用户信息
 */
let systemTinyuserGetInfoByUserId_Param = {
     userId: null,   /**     string required:false */
   }
    
export function systemTinyuserGetInfoByUserId_Get( systemTinyuserGetInfoByUserId_Param    ) {
    return request({
         url:`/system/tiny-user/getInfoByUserId`,
         method:'get',
                     params:systemTinyuserGetInfoByUserId_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /system/tiny-user/update/phonenumber
  * summary: 修改手机号
 * tags: 用户信息
 */
let systemTinyuserUpdatePhonenumber_Param = {
     phonenumber: null,   /** 手机号    string required:false */
     code: null,   /**     string required:false */
   }
    
export function systemTinyuserUpdatePhonenumber_Post( systemTinyuserUpdatePhonenumber_Param    ) {
    return request({
         url:`/system/tiny-user/update/phonenumber`,
         method:'post',
                     params:systemTinyuserUpdatePhonenumber_Param  
                
    })
}
/**  =========================================================================== ***/
