
/*** glowxq glowxq@163.com  2022-07-20 18:56:16  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /tinymallcommoditysku/byId
  * summary: 获取单个 商品规格 - 根据id获取
 * tags: 商品规格
 */
let tinymallcommodityskuById_Param = {
     tinyMallCommoditySkuId: null,   /**     string required:false */
   }
    
export function tinymallcommodityskuById_Get( tinymallcommodityskuById_Param    ) {
    return request({
         url:`/tinymallcommoditysku/byId`,
         method:'get',
                     params:tinymallcommodityskuById_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /tinymallcommoditysku/save
  * summary: 新增 商品规格
 * tags: 商品规格
 */
let tinymallcommodityskuSave_Body = {
      createTime: null,   /** 创建时间   integer required: */
      price: null,   /** 价格=单位分   integer required: */
      specification: null,   /** 规格名   string required: */
      commodityId: null,   /** 商品ID   integer required: */
      inventory: null,   /** 库存   integer required: */
      skuId: null,   /** $property.description   integer required: */
    }
    
export function tinymallcommodityskuSave_Post(   tinymallcommodityskuSave_Body) {
    return request({
         url:`/tinymallcommoditysku/save`,
         method:'post',
                      
                 data: tinymallcommodityskuSave_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /tinymallcommoditysku/update
  * summary: 修改 商品规格 - 根据id更新非空值
 * tags: 商品规格
 */
let tinymallcommodityskuUpdate_Body = {
      createTime: null,   /** 创建时间   integer required: */
      price: null,   /** 价格=单位分   integer required: */
      specification: null,   /** 规格名   string required: */
      commodityId: null,   /** 商品ID   integer required: */
      inventory: null,   /** 库存   integer required: */
      skuId: null,   /** $property.description   integer required: */
    }
    
export function tinymallcommodityskuUpdate_Put(   tinymallcommodityskuUpdate_Body) {
    return request({
         url:`/tinymallcommoditysku/update`,
         method:'put',
                      
                 data: tinymallcommodityskuUpdate_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /tinymallcommoditysku/delete
  * summary: 删除 商品规格 - 根据id删除
 * tags: 商品规格
 */
    
export function tinymallcommodityskuDelete_Delete(   ) {
    return request({
         url:`/tinymallcommoditysku/delete`,
         method:'delete',
                      
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /tinymallcommoditysku/page
  * summary: 分页获取 商品规格
 * tags: 商品规格
 */
let tinymallcommodityskuPage_Param = {
     pageNum: null,   /** 第几页    string required:false */
     pageSize: null,   /** 页码大小    string required:false */
   }
    
export function tinymallcommodityskuPage_Get( tinymallcommodityskuPage_Param    ) {
    return request({
         url:`/tinymallcommoditysku/page`,
         method:'get',
                     params:tinymallcommodityskuPage_Param  
                
    })
}
/**  =========================================================================== ***/
