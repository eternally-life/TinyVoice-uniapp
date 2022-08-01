
/*** glowxq glowxq@163.com  2022-07-31 19:39:29  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /auth/login-register/logout
  * summary: 退出登录
 * tags: 登录注册
 */
    
export function authLoginregisterLogout_Delete(   ) {
    return request({
         url:`/auth/login-register/logout`,
         method:'delete',
                      
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /auth/login-register/verificationCode/login
  * summary: 短信验证码登录
 * tags: 登录注册
 */
let authLoginregisterVerificationCodeLogin_Param = {
     phonenumber: null,   /** 手机号    string required:false */
     verificationCode: null,   /** 短信验证码    string required:false */
   }
    
export function authLoginregisterVerificationCodeLogin_Post( authLoginregisterVerificationCodeLogin_Param    ) {
    return request({
         url:`/auth/login-register/verificationCode/login`,
         method:'post',
                     params:authLoginregisterVerificationCodeLogin_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /auth/login-register/login
  * summary: 账号密码登录
 * tags: 登录注册
 */
let authLoginregisterLogin_Body = {
      password: null,   /** 用户密码   string required: */
      username: null,   /** 用户名   string required: */
    }
    
export function authLoginregisterLogin_Post(   authLoginregisterLogin_Body) {
    return request({
         url:`/auth/login-register/login`,
         method:'post',
                      
                 data: authLoginregisterLogin_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /auth/login-register/wx/register
  * summary: 微信注册
 * tags: 登录注册
 */
let authLoginregisterWxRegister_Body = {
      wxCode: null,   /** 微信登录code   string required: */
      nickName: null,   /** 用户昵称   string required: */
      sex: null,   /** 用户性别  用户性别（0男 1女 2未知）   string required: */
      phonenumber: null,   /** 手机号码   string required: */
      avatar: null,   /** 用户头像url   string required: */
      email: null,   /** 用户邮箱   string required: */
      verificationCode: null,   /** 验证码   string required: */
    }
    
export function authLoginregisterWxRegister_Post(   authLoginregisterWxRegister_Body) {
    return request({
         url:`/auth/login-register/wx/register`,
         method:'post',
                      
                 data: authLoginregisterWxRegister_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /auth/login-register/verificationCode
  * summary: 获取短信验证码
 * tags: 登录注册
 */
let authLoginregisterVerificationCode_Param = {
     phonenumber: null,   /**     string required:false */
   }
    
export function authLoginregisterVerificationCode_Get( authLoginregisterVerificationCode_Param    ) {
    return request({
         url:`/auth/login-register/verificationCode`,
         method:'get',
                     params:authLoginregisterVerificationCode_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /auth/login-register/wx/login
  * summary: 微信登录
 * tags: 登录注册
 */
let authLoginregisterWxLogin_Param = {
     wxCode: null,   /** 微信登录临时码    string required:false */
   }
    
export function authLoginregisterWxLogin_Post( authLoginregisterWxLogin_Param    ) {
    return request({
         url:`/auth/login-register/wx/login`,
         method:'post',
                     params:authLoginregisterWxLogin_Param  
                
    })
}
/**  =========================================================================== ***/
