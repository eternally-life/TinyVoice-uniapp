
/*** glowxq glowxq@163.com  2022-07-17 15:05:23  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /system/file/upload/signature
  * summary: 获得上传图片签名
 * tags: 文件请求处理
 */
let systemFileUploadSignature_Param = {
     dir: null,   /** 上传图片到哪个文件夹 示例: logo/    string required:false */
   }
    
export function systemFileUploadSignature_Get( systemFileUploadSignature_Param    ) {
    return request({
         url:`/system/file/upload/signature`,
         method:'get',
                     params:systemFileUploadSignature_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /system/file/upload/local
  * summary: 文件上传 - 本地
 * tags: 文件请求处理
 */
    
export function systemFileUploadLocal_Post(   ) {
    return request({
         url:`/system/file/upload/local`,
         method:'post',
                      
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /system/file/upload/oss
  * summary: 文件上传 - oss
 * tags: 文件请求处理
 */
    
export function systemFileUploadOss_Post(   ) {
    return request({
         url:`/system/file/upload/oss`,
         method:'post',
                      
                
    })
}
/**  =========================================================================== ***/
