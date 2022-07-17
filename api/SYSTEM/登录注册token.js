
/*** glowxq glowxq@163.com  2022-07-17 13:39:04  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /auth/token-auth/login
  * summary: 账号密码登录
 * tags: 登录 注册 token
 */
let authTokenauthLogin_Body = {
      password: null,   /** 用户密码   string required: */
      username: null,   /** 用户名   string required: */
    }
    
export function authTokenauthLogin_Post(   authTokenauthLogin_Body) {
    return request({
         url:`/auth/token-auth/login`,
         method:'post',
                      
                 data: authTokenauthLogin_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /auth/token-auth/register
  * summary: 校外用户注册
 * tags: 登录 注册 token
 */
let authTokenauthRegister_Body = {
      password: null,   /** 用户密码   string required: */
      username: null,   /** 用户名   string required: */
    }
    
export function authTokenauthRegister_Post(   authTokenauthRegister_Body) {
    return request({
         url:`/auth/token-auth/register`,
         method:'post',
                      
                 data: authTokenauthRegister_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /auth/token-auth/logout
  * summary: 退出登录
 * tags: 登录 注册 token
 */
    
export function authTokenauthLogout_Delete(   ) {
    return request({
         url:`/auth/token-auth/logout`,
         method:'delete',
                      
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /auth/token-auth/bindWx
  * summary: 绑定微信接口
 * tags: 登录 注册 token
 */
let authTokenauthBindWx_Body = {
      password: null,   /** 教务密码   string required: */
      wxCode: null,   /** QQ登录code   string required: */
      username: null,   /** 学号/工号   string required: */
    }
    
export function authTokenauthBindWx_Post(   authTokenauthBindWx_Body) {
    return request({
         url:`/auth/token-auth/bindWx`,
         method:'post',
                      
                 data: authTokenauthBindWx_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /auth/token-auth/commonLogin
  * summary: 通用登录接口
 * tags: 登录 注册 token
 */
let authTokenauthCommonLogin_Body = {
      qqCode: null,   /** QQ登录code   string required: */
      password: null,   /** 用户密码   string required: */
      loginType: null,   /** 登录类型 1-为账号密码登录,2-微信登录,3-qq登录   integer required: */
      wxCode: null,   /** 微信登录code   string required: */
      username: null,   /** 用户名   string required: */
    }
    
export function authTokenauthCommonLogin_Post(   authTokenauthCommonLogin_Body) {
    return request({
         url:`/auth/token-auth/commonLogin`,
         method:'post',
                      
                 data: authTokenauthCommonLogin_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /auth/token-auth/refresh
  * summary: 刷新登录状态
 * tags: 登录 注册 token
 */
    
export function authTokenauthRefresh_Post(   ) {
    return request({
         url:`/auth/token-auth/refresh`,
         method:'post',
                      
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /auth/token-auth/outsideRegister
  * summary: 校外用户注册接口
 * tags: 登录 注册 token
 */
let authTokenauthOutsideRegister_Body = {
      qqCode: null,   /** QQ登录code   string required: */
      wxCode: null,   /** 微信登录code   string required: */
      nickName: null,   /** 用户昵称   string required: */
      sex: null,   /** 用户性别  0=男,1=女,2=未知   string required: */
      phonenumber: null,   /** 手机号码   string required: */
      registerType: null,   /** 注册类型 1-微信注册,2-QQ注册   integer required: */
      avatar: null,   /** 用户头像url   string required: */
      email: null,   /** 用户邮箱   string required: */
    }
    
export function authTokenauthOutsideRegister_Post(   authTokenauthOutsideRegister_Body) {
    return request({
         url:`/auth/token-auth/outsideRegister`,
         method:'post',
                      
                 data: authTokenauthOutsideRegister_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /auth/token-auth/commonRegister
  * summary: 微信注册接口
 * tags: 登录 注册 token
 */
let authTokenauthCommonRegister_Body = {
      qqCode: null,   /** QQ登录code   string required: */
      wxCode: null,   /** 微信登录code   string required: */
      nickName: null,   /** 用户昵称   string required: */
      sex: null,   /** 用户性别  0=男,1=女,2=未知   string required: */
      phonenumber: null,   /** 手机号码   string required: */
      registerType: null,   /** 注册类型 1-微信注册,2-QQ注册   integer required: */
      avatar: null,   /** 用户头像url   string required: */
      pwd: null,   /** 教务密码   string required: */
      tp: null,   /** 类型 1-老师,2-学生   integer required: */
      us: null,   /** 学号/工号   string required: */
      email: null,   /** 用户邮箱   string required: */
    }
    
export function authTokenauthCommonRegister_Post(   authTokenauthCommonRegister_Body) {
    return request({
         url:`/auth/token-auth/commonRegister`,
         method:'post',
                      
                 data: authTokenauthCommonRegister_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /auth/token-auth/bindQQ
  * summary: 绑定qq接口
 * tags: 登录 注册 token
 */
let authTokenauthBindQQ_Body = {
      qqCode: null,   /** QQ登录code   string required: */
      password: null,   /** 教务密码   string required: */
      username: null,   /** 学号/工号   string required: */
    }
    
export function authTokenauthBindQQ_Post(   authTokenauthBindQQ_Body) {
    return request({
         url:`/auth/token-auth/bindQQ`,
         method:'post',
                      
                 data: authTokenauthBindQQ_Body
    })
}
/**  =========================================================================== ***/
