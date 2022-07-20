
/*** glowxq glowxq@163.com  2022-07-20 18:30:16  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /community/tinyserveresource/save
  * summary: 新增 资源共享
 * tags: 资源共享
 */
let communityTinyserveresourceSave_Body = {
      integral: null,   /** 所需积分   integer required: */
      name: null,   /** 资源名   string required: */
      describe: null,   /** 资源描述   string required: */
      url: null,   /** $property.description   string required: */
    }
    
export function communityTinyserveresourceSave_Post(   communityTinyserveresourceSave_Body) {
    return request({
         url:`/community/tinyserveresource/save`,
         method:'post',
                      
                 data: communityTinyserveresourceSave_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /community/tinyserveresource/update
  * summary: 修改 资源共享 - 根据id更新非空值
 * tags: 资源共享
 */
let communityTinyserveresourceUpdate_Body = {
      integral: null,   /** 所需积分   integer required: */
      name: null,   /** 资源名   string required: */
      describe: null,   /** 资源描述   string required: */
      url: null,   /** $property.description   string required: */
    }
    
export function communityTinyserveresourceUpdate_Put(   communityTinyserveresourceUpdate_Body) {
    return request({
         url:`/community/tinyserveresource/update`,
         method:'put',
                      
                 data: communityTinyserveresourceUpdate_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /community/tinyserveresource/page
  * summary: 分页获取 资源共享并且根据下载量排序
 * tags: 资源共享
 */
let communityTinyserveresourcePage_Param = {
     pageNum: null,   /** 第几页    string required:false */
     pageSize: null,   /** 页码大小    string required:false */
   }
    
export function communityTinyserveresourcePage_Get( communityTinyserveresourcePage_Param    ) {
    return request({
         url:`/community/tinyserveresource/page`,
         method:'get',
                     params:communityTinyserveresourcePage_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /community/tinyserveresource/delete
  * summary: 删除 资源共享 - 根据id删除
 * tags: 资源共享
 */
    
export function communityTinyserveresourceDelete_Delete(   ) {
    return request({
         url:`/community/tinyserveresource/delete`,
         method:'delete',
                      
                
    })
}
/**  =========================================================================== ***/
