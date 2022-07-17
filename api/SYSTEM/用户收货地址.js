
/*** glowxq glowxq@163.com  2022-07-17 13:39:04  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /system/user-address/delete/id
  * summary: 删除 单个 根据id 收货地址
 * tags: 用户收货地址
 */
let systemUseraddressDeleteId_Param = {
     addressId: null,   /** 多个id    string required:false */
   }
    
export function systemUseraddressDeleteId_Delete( systemUseraddressDeleteId_Param    ) {
    return request({
         url:`/system/user-address/delete/id`,
         method:'delete',
                     params:systemUseraddressDeleteId_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /system/user-address/detail
  * summary: 获取收货地址详细信息 根据id
 * tags: 用户收货地址
 */
let systemUseraddressDetail_Param = {
     addressId: null,   /**     string required:false */
   }
    
export function systemUseraddressDetail_Get( systemUseraddressDetail_Param    ) {
    return request({
         url:`/system/user-address/detail`,
         method:'get',
                     params:systemUseraddressDetail_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /system/user-address/alter/id
  * summary: 修改 - 根据id 收货地址
 * tags: 用户收货地址
 */
let systemUseraddressAlterId_Body = {
      nickName: null,   /** 快递单收货人姓名   string required: */
      campus: null,   /** 学校-默认桂电北海   string required: */
      name: null,   /** 收货人真实姓名   string required: */
      phonenumber: null,   /** 电话   string required: */
      remark: null,   /** 备注   string required: */
      region: null,   /** 区域-东区,西区   string required: */
      dormitoryNumber: null,   /** 宿舍号   integer required: */
      apartment: null,   /** 公寓-1=1#,2=2#以此类推   integer required: */
      addressId: null,   /** $property.description   integer required: */
      direction: null,   /** 方向-1=A面,2=B面,3=C面,以此类推   integer required: */
      directionValue: null,   /** 方向-A,B,C,D,E,F   string required: */
    }
    
export function systemUseraddressAlterId_Put(   systemUseraddressAlterId_Body) {
    return request({
         url:`/system/user-address/alter/id`,
         method:'put',
                      
                 data: systemUseraddressAlterId_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /system/user-address/delete/ids
  * summary: 删除 多个 根据ids 收货地址
 * tags: 用户收货地址
 */
let systemUseraddressDeleteIds_Param = {
     addressIds: null,   /** 多个id    string required:false */
   }
    
export function systemUseraddressDeleteIds_Delete( systemUseraddressDeleteIds_Param    ) {
    return request({
         url:`/system/user-address/delete/ids`,
         method:'delete',
                     params:systemUseraddressDeleteIds_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /system/user-address/add
  * summary: 新增收货地址
 * tags: 用户收货地址
 */
let systemUseraddressAdd_Body = {
      nickName: null,   /** 快递单收货人姓名   string required: */
      campus: null,   /** 学校-默认桂电北海   string required: */
      name: null,   /** 收货人真实姓名   string required: */
      phonenumber: null,   /** 电话   string required: */
      remark: null,   /** 备注   string required: */
      region: null,   /** 区域-东区,西区   string required: */
      dormitoryNumber: null,   /** 宿舍号   integer required: */
      apartment: null,   /** 公寓-1=1#,2=2#以此类推   integer required: */
      direction: null,   /** 方向-1=A面,2=B面,3=C面,以此类推   integer required: */
    }
    
export function systemUseraddressAdd_Post(   systemUseraddressAdd_Body) {
    return request({
         url:`/system/user-address/add`,
         method:'post',
                      
                 data: systemUseraddressAdd_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /system/user-address/page
  * summary: 分页获取自己的收货地址
 * tags: 用户收货地址
 */
let systemUseraddressPage_Param = {
     pageNum: null,   /** 第几页    string required:false */
     pageSize: null,   /** 页码大小    string required:false */
   }
    
export function systemUseraddressPage_Get( systemUseraddressPage_Param    ) {
    return request({
         url:`/system/user-address/page`,
         method:'get',
                     params:systemUseraddressPage_Param  
                
    })
}
/**  =========================================================================== ***/
