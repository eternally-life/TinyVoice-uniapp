
/*** glowxq glowxq@163.com  2022-07-20 18:56:16  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /tinymall/page
  * summary: 分页获取 商店/分类
 * tags: 商店/分类
 */
let tinymallPage_Param = {
     pageNum: null,   /** 第几页    string required:false */
     pageSize: null,   /** 页码大小    string required:false */
   }
    
export function tinymallPage_Get( tinymallPage_Param    ) {
    return request({
         url:`/tinymall/page`,
         method:'get',
                     params:tinymallPage_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /tinymall/byId
  * summary: 获取单个 商店/分类 - 根据id获取
 * tags: 商店/分类
 */
let tinymallById_Param = {
     tinyMallId: null,   /**     string required:false */
   }
    
export function tinymallById_Get( tinymallById_Param    ) {
    return request({
         url:`/tinymall/byId`,
         method:'get',
                     params:tinymallById_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /tinymall/update
  * summary: 修改 商店/分类 - 根据id更新非空值
 * tags: 商店/分类
 */
let tinymallUpdate_Body = {
      address: null,   /** 商店地址   string required: */
      otherContact: null,   /** 其他联系方式   string required: */
      mallId: null,   /** $property.description   integer required: */
      phonenumber: null,   /** 电话号码   string required: */
      orderNum: null,   /** 订单数量   integer required: */
      remark: null,   /** 申请备注   string required: */
      avatar: null,   /** 商店图片   string required: */
      sort: null,   /** 排序等级=1-4个等级,1-置顶,2-其次,3-普通,4-滞后   integer required: */
      type: null,   /** 商店类型-1-官方商店,2-校内合作,3-校外合作   integer required: */
      userId: null,   /** 用户id   integer required: */
      content: null,   /** 店铺描述   string required: */
      isShow: null,   /** 是否显示-1=显示,0=不显示   integer required: */
      hotNum: null,   /** 热度指数   integer required: */
      balance: null,   /** 余额-单位分   integer required: */
      createTime: null,   /** 创建时间戳   integer required: */
      name: null,   /** 商店名   string required: */
      sendType: null,   /** 配送-1=微音配送,2=商家自送,3=不配送,需自取   integer required: */
      startTime: null,   /** 开始营业时间   object required: */
      endTime: null,   /** 结束营业时间   object required: */
      status: null,   /** 营业状态-1营业中,0未营业   integer required: */
    }
    
export function tinymallUpdate_Put(   tinymallUpdate_Body) {
    return request({
         url:`/tinymall/update`,
         method:'put',
                      
                 data: tinymallUpdate_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /tinymall/save
  * summary: 新增 商店/分类
 * tags: 商店/分类
 */
let tinymallSave_Body = {
      address: null,   /** 商店地址   string required: */
      otherContact: null,   /** 其他联系方式   string required: */
      mallId: null,   /** $property.description   integer required: */
      phonenumber: null,   /** 电话号码   string required: */
      orderNum: null,   /** 订单数量   integer required: */
      remark: null,   /** 申请备注   string required: */
      avatar: null,   /** 商店图片   string required: */
      sort: null,   /** 排序等级=1-4个等级,1-置顶,2-其次,3-普通,4-滞后   integer required: */
      type: null,   /** 商店类型-1-官方商店,2-校内合作,3-校外合作   integer required: */
      userId: null,   /** 用户id   integer required: */
      content: null,   /** 店铺描述   string required: */
      isShow: null,   /** 是否显示-1=显示,0=不显示   integer required: */
      hotNum: null,   /** 热度指数   integer required: */
      balance: null,   /** 余额-单位分   integer required: */
      createTime: null,   /** 创建时间戳   integer required: */
      name: null,   /** 商店名   string required: */
      sendType: null,   /** 配送-1=微音配送,2=商家自送,3=不配送,需自取   integer required: */
      startTime: null,   /** 开始营业时间   string required: */
      endTime: null,   /** 结束营业时间   string required: */
      status: null,   /** 营业状态-1营业中,0未营业   integer required: */
    }
    
export function tinymallSave_Post(   tinymallSave_Body) {
    return request({
         url:`/tinymall/save`,
         method:'post',
                      
                 data: tinymallSave_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /tinymall/delete
  * summary: 删除 商店/分类 - 根据id删除
 * tags: 商店/分类
 */
    
export function tinymallDelete_Delete(   ) {
    return request({
         url:`/tinymall/delete`,
         method:'delete',
                      
                
    })
}
/**  =========================================================================== ***/
