
/*** glowxq glowxq@163.com  2022-07-31 19:39:29  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /community/tinyserve/byId
  * summary: 获取单个 服务管理 - 根据id获取
 * tags: 服务管理
 */
let communityTinyserveById_Param = {
     tinyServeId: null,   /**     string required:false */
   }
    
export function communityTinyserveById_Get( communityTinyserveById_Param    ) {
    return request({
         url:`/community/tinyserve/byId`,
         method:'get',
                     params:communityTinyserveById_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /community/tinyserve/delete
  * summary: 删除 服务管理 - 根据id删除
 * tags: 服务管理
 */
    
export function communityTinyserveDelete_Delete(   ) {
    return request({
         url:`/community/tinyserve/delete`,
         method:'delete',
                      
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /community/tinyserve/page
  * summary: 分页获取 服务管理
 * tags: 服务管理
 */
let communityTinyservePage_Param = {
     pageNum: null,   /** 第几页    string required:false */
     pageSize: null,   /** 页码大小    string required:false */
   }
    
export function communityTinyservePage_Get( communityTinyservePage_Param    ) {
    return request({
         url:`/community/tinyserve/page`,
         method:'get',
                     params:communityTinyservePage_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /community/tinyserve/save
  * summary: 新增 服务管理
 * tags: 服务管理
 */
let communityTinyserveSave_Body = {
      jumpType: null,   /** 跳转类型=1-普通页面,2-tabbar页面,3-网页,4-小程序   integer required: */
      image: null,   /** 图片图标   string required: */
      createTime: null,   /** 创建时间戳   integer required: */
      iconType: null,   /** 图标类型-1icon图标,2图片图标   string required: */
      name: null,   /** 工具名   string required: */
      icon: null,   /** icon图标   string required: */
      serveId: null,   /** $property.description   integer required: */
      jumpUrl: null,   /** 跳转地址   string required: */
      isShow: null,   /** 是否显示=1-显示,0-隐藏   boolean required: */
    }
    
export function communityTinyserveSave_Post(   communityTinyserveSave_Body) {
    return request({
         url:`/community/tinyserve/save`,
         method:'post',
                      
                 data: communityTinyserveSave_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /community/tinyserve/update
  * summary: 修改 服务管理 - 根据id更新非空值
 * tags: 服务管理
 */
let communityTinyserveUpdate_Body = {
      jumpType: null,   /** 跳转类型=1-普通页面,2-tabbar页面,3-网页,4-小程序   integer required: */
      image: null,   /** 图片图标   string required: */
      createTime: null,   /** 创建时间戳   integer required: */
      iconType: null,   /** 图标类型-1icon图标,2图片图标   string required: */
      name: null,   /** 工具名   string required: */
      icon: null,   /** icon图标   string required: */
      serveId: null,   /** $property.description   integer required: */
      jumpUrl: null,   /** 跳转地址   string required: */
      isShow: null,   /** 是否显示=1-显示,0-隐藏   boolean required: */
    }
    
export function communityTinyserveUpdate_Put(   communityTinyserveUpdate_Body) {
    return request({
         url:`/community/tinyserve/update`,
         method:'put',
                      
                 data: communityTinyserveUpdate_Body
    })
}
/**  =========================================================================== ***/
