
/*** glowxq glowxq@163.com  2022-07-17 15:05:23  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /system/sysaddr/update
  * summary: 修改 收货地址 - 根据id更新非空值
 * tags: 收货地址
 */
let systemSysaddrUpdate_Body = {
      school: null,   /** 学校名称   string required: */
      name: null,   /** 姓名   string required: */
      phonenumber: null,   /** 手机号   string required: */
      addrId: null,   /** 地址ID   integer required: */
      remark: null,   /** 地址备注   string required: */
      isStuType: null,   /** 是否学生地址,1-是,0-不是   integer required: */
      dormitoryNumber: null,   /** 宿舍号   string required: */
      apartment: null,   /** 公寓楼   string required: */
      addressJson: null,   /** 其余地址=前端自建json类型   string required: */
    }
    
export function systemSysaddrUpdate_Put(   systemSysaddrUpdate_Body) {
    return request({
         url:`/system/sysaddr/update`,
         method:'put',
                      
                 data: systemSysaddrUpdate_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /system/sysaddr/save
  * summary: 新增 收货地址
 * tags: 收货地址
 */
let systemSysaddrSave_Body = {
      school: null,   /** 学校名称   string required: */
      name: null,   /** 姓名   string required: */
      phonenumber: null,   /** 手机号   string required: */
      remark: null,   /** 地址备注   string required: */
      isStuType: null,   /** 是否学生地址,1-是,0-不是   integer required: */
      dormitoryNumber: null,   /** 宿舍号   string required: */
      apartment: null,   /** 公寓楼   string required: */
      addressJson: null,   /** 其余地址=前端自建json类型   string required: */
    }
    
export function systemSysaddrSave_Post(   systemSysaddrSave_Body) {
    return request({
         url:`/system/sysaddr/save`,
         method:'post',
                      
                 data: systemSysaddrSave_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /system/sysaddr/delete
  * summary: 删除 收货地址 - 根据id删除
 * tags: 收货地址
 */
    
export function systemSysaddrDelete_Delete(   ) {
    return request({
         url:`/system/sysaddr/delete`,
         method:'delete',
                      
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /system/sysaddr/page
  * summary: 分页获取 自己的 收货地址
 * tags: 收货地址
 */
let systemSysaddrPage_Param = {
     pageNum: null,   /** 第几页    string required:false */
     pageSize: null,   /** 页码大小    string required:false */
     IsStuType: null,   /** 是否学生地址,1-是,0-不是    string required:false */
   }
    
export function systemSysaddrPage_Get( systemSysaddrPage_Param    ) {
    return request({
         url:`/system/sysaddr/page`,
         method:'get',
                     params:systemSysaddrPage_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /system/sysaddr/byId
  * summary: 获取单个 收货地址 - 根据id获取
 * tags: 收货地址
 */
let systemSysaddrById_Param = {
     sysAddrId: null,   /**     string required:false */
   }
    
export function systemSysaddrById_Get( systemSysaddrById_Param    ) {
    return request({
         url:`/system/sysaddr/byId`,
         method:'get',
                     params:systemSysaddrById_Param  
                
    })
}
/**  =========================================================================== ***/
