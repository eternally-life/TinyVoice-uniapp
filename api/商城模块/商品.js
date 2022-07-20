
/*** glowxq glowxq@163.com  2022-07-20 18:56:16  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /tinymallcommodity/update
  * summary: 修改 商品 - 根据id更新非空值
 * tags: 商品
 */
let tinymallcommodityUpdate_Body = {
      heat: null,   /** 热度   integer required: */
      mallName: null,   /** 商店名   string required: */
      mallId: null,   /** 商店id   integer required: */
      remark: null,   /** 备注   string required: */
      commodityId: null,   /** $property.description   integer required: */
      sort: null,   /** 排序等级   integer required: */
      type: null,   /** 商品类型=1-虚拟商品,2-实体商品   integer required: */
      userId: null,   /** 商店用户的id   integer required: */
      content: null,   /** 商品介绍   string required: */
      isShow: null,   /** 是否显示=1-显示,0-不显示   integer required: */
      createTime: null,   /** 商品创建的时间戳   integer required: */
      imageUrl: null,   /** 商品的图片url   string required: */
      name: null,   /** 商品名   string required: */
      status: null,   /** 状态=1-在售,0-停售   integer required: */
    }
    
export function tinymallcommodityUpdate_Put(   tinymallcommodityUpdate_Body) {
    return request({
         url:`/tinymallcommodity/update`,
         method:'put',
                      
                 data: tinymallcommodityUpdate_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /tinymallcommodity/page
  * summary: 分页获取 商品
 * tags: 商品
 */
let tinymallcommodityPage_Param = {
     pageNum: null,   /** 第几页    string required:false */
     pageSize: null,   /** 页码大小    string required:false */
   }
    
export function tinymallcommodityPage_Get( tinymallcommodityPage_Param    ) {
    return request({
         url:`/tinymallcommodity/page`,
         method:'get',
                     params:tinymallcommodityPage_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /tinymallcommodity/delete
  * summary: 删除 商品 - 根据id删除
 * tags: 商品
 */
    
export function tinymallcommodityDelete_Delete(   ) {
    return request({
         url:`/tinymallcommodity/delete`,
         method:'delete',
                      
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /tinymallcommodity/byId
  * summary: 获取单个 商品 - 根据id获取
 * tags: 商品
 */
let tinymallcommodityById_Param = {
     tinyMallCommodityId: null,   /**     string required:false */
   }
    
export function tinymallcommodityById_Get( tinymallcommodityById_Param    ) {
    return request({
         url:`/tinymallcommodity/byId`,
         method:'get',
                     params:tinymallcommodityById_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /tinymallcommodity/save
  * summary: 新增 商品
 * tags: 商品
 */
let tinymallcommoditySave_Body = {
      heat: null,   /** 热度   integer required: */
      mallName: null,   /** 商店名   string required: */
      mallId: null,   /** 商店id   integer required: */
      remark: null,   /** 备注   string required: */
      commodityId: null,   /** $property.description   integer required: */
      sort: null,   /** 排序等级   integer required: */
      type: null,   /** 商品类型=1-虚拟商品,2-实体商品   integer required: */
      userId: null,   /** 商店用户的id   integer required: */
      content: null,   /** 商品介绍   string required: */
      isShow: null,   /** 是否显示=1-显示,0-不显示   integer required: */
      createTime: null,   /** 商品创建的时间戳   integer required: */
      imageUrl: null,   /** 商品的图片url   string required: */
      name: null,   /** 商品名   string required: */
      status: null,   /** 状态=1-在售,0-停售   integer required: */
    }
    
export function tinymallcommoditySave_Post(   tinymallcommoditySave_Body) {
    return request({
         url:`/tinymallcommodity/save`,
         method:'post',
                      
                 data: tinymallcommoditySave_Body
    })
}
/**  =========================================================================== ***/
