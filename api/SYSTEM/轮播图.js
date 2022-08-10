
/*** glowxq glowxq@163.com  2022-07-17 15:05:23  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /system/syscarousel/save
  * summary: 新增 轮播图
 * tags: 轮播图
 */
let systemSyscarouselSave_Body = {
      name: null,   /** 轮播图名字   string required: */
      url: null,   /** 轮播图url   string required: */
      content: null,   /** 轮播图文字介绍   string required: */
      jumpUrl: null,   /** 跳转url   string required: */
      isShow: null,   /** 是否显示=1-显示,0隐藏   integer required: */
    }
    
export function systemSyscarouselSave_Post(   systemSyscarouselSave_Body) {
    return request({
         url:`/system/syscarousel/save`,
         method:'post',
                      
                 data: systemSyscarouselSave_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /system/syscarousel/delete
  * summary: 删除 轮播图 - 根据id删除
 * tags: 轮播图
 */
    
export function systemSyscarouselDelete_Delete(   ) {
    return request({
         url:`/system/syscarousel/delete`,
         method:'delete',
                      
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /system/syscarousel/update
  * summary: 修改 轮播图 - 根据id更新非空值
 * tags: 轮播图
 */
let systemSyscarouselUpdate_Body = {
      carouselId: null,   /** 主键   integer required: */
      name: null,   /** 轮播图名字   string required: */
      url: null,   /** 轮播图url   string required: */
      content: null,   /** 轮播图文字介绍   string required: */
      jumpUrl: null,   /** 跳转url   string required: */
      isShow: null,   /** 是否显示=1-显示,0隐藏   integer required: */
    }
    
export function systemSyscarouselUpdate_Put(   systemSyscarouselUpdate_Body) {
    return request({
         url:`/system/syscarousel/update`,
         method:'put',
                      
                 data: systemSyscarouselUpdate_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /system/syscarousel/page
  * summary: 分页获取 轮播图
 * tags: 轮播图
 */
let systemSyscarouselPage_Param = {
     pageNum: null,   /** 第几页    string required:false */
     pageSize: null,   /** 页码大小    string required:false */
   }
    
export function systemSyscarouselPage_Get( systemSyscarouselPage_Param    ) {
    return request({
         url:`/system/syscarousel/page`,
         method:'get',
                     params:systemSyscarouselPage_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /community/tinyserve/page
  * summary: 获取工具服务
 */
   
export function toolsList_Get() {
   return request({
        url:'/community/tinyserve/page',
        method:'get'
   })
}
/**  =========================================================================== ***/
