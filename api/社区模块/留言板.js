
/*** glowxq glowxq@163.com  2022-07-20 18:30:16  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /community/tinyservenote/save
  * summary: 给某人留言
 * tags: 留言板
 */
let communityTinyservenoteSave_Body = {
      name: null,   /** 留言名字   string required: */
      content: null,   /** 留言内容   string required: */
    }
    
export function communityTinyservenoteSave_Post(   communityTinyservenoteSave_Body) {
    return request({
         url:`/community/tinyservenote/save`,
         method:'post',
                      
                 data: communityTinyservenoteSave_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /community/tinyservenote/byName
  * summary: 根据名字查看查看留言
 * tags: 留言板
 */
let communityTinyservenoteByName_Param = {
     userName: null,   /** 获取留言板的信息的姓名    string required:false */
   }
    
export function communityTinyservenoteByName_Get( communityTinyservenoteByName_Param    ) {
    return request({
         url:`/community/tinyservenote/byName`,
         method:'get',
                     params:communityTinyservenoteByName_Param  
                
    })
}
/**  =========================================================================== ***/
