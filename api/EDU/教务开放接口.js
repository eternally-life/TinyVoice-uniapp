
/*** glowxq glowxq@163.com  2022-07-17 13:42:39  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /edu/guet/student/courseTable
  * summary: 代查 学生课表 消耗积分
 * tags: 教务开放接口
 */
let eduGuetStudentCourseTable_Body = {
      stid: null,   /** 学号   string required: */
      term: null,   /** 学期参数   string required: */
    }
    
export function eduGuetStudentCourseTable_Post(   eduGuetStudentCourseTable_Body) {
    return request({
         url:`/edu/guet/student/courseTable`,
         method:'post',
                      
                 data: eduGuetStudentCourseTable_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /edu/guet/selectSource
  * summary: 学生 成绩查询
 * tags: 教务开放接口
 */
let eduGuetSelectSource_Param = {
     term: null,   /** 学期参数    string required:false */
   }
    
export function eduGuetSelectSource_Post( eduGuetSelectSource_Param    ) {
    return request({
         url:`/edu/guet/selectSource`,
         method:'post',
                     params:eduGuetSelectSource_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /edu/guet/selectedCourse
  * summary: 学生 已选课程查询
 * tags: 教务开放接口
 */
let eduGuetSelectedCourse_Param = {
     term: null,   /** 学期参数默认当前学期    string required:false */
   }
    
export function eduGuetSelectedCourse_Post( eduGuetSelectedCourse_Param    ) {
    return request({
         url:`/edu/guet/selectedCourse`,
         method:'post',
                     params:eduGuetSelectedCourse_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /edu/guet/queryCourseSelection
  * summary: 查询选课课程
 * tags: 教务开放接口
 */
let eduGuetQueryCourseSelection_Body = {
      stype: null,   /** 学院   string required: */
      grade: null,   /** 年级   string required: */
      term: null,   /** 学期参数   string required: */
      spno: null,   /** 专业   string required: */
    }
    
export function eduGuetQueryCourseSelection_Post(   eduGuetQueryCourseSelection_Body) {
    return request({
         url:`/edu/guet/queryCourseSelection`,
         method:'post',
                      
                 data: eduGuetQueryCourseSelection_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /edu/guet/selectWeightedScore
  * summary: 学分绩查询
 * tags: 教务开放接口
 */
let eduGuetSelectWeightedScore_Body = {
      stype: null,   /** 1-应选， 0-实选   string required: */
      chk: null,   /** 1-单个学期，0-累计学期   string required: */
      stid: null,   /** 学号   string required: */
      term: null,   /** 学期参数   string required: */
    }
    
export function eduGuetSelectWeightedScore_Post(   eduGuetSelectWeightedScore_Body) {
    return request({
         url:`/edu/guet/selectWeightedScore`,
         method:'post',
                      
                 data: eduGuetSelectWeightedScore_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /edu/guet/departmentInfo
  * summary: 公共 获取学院数据
 * tags: 教务开放接口
 */
    
export function eduGuetDepartmentInfo_Post(   ) {
    return request({
         url:`/edu/guet/departmentInfo`,
         method:'post',
                      
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /edu/guet/usingTheIntegral
  * summary: 学生 使用积分看课程考核成绩
 * tags: 教务开放接口
 */
    
export function eduGuetUsingTheIntegral_Post(   ) {
    return request({
         url:`/edu/guet/usingTheIntegral`,
         method:'post',
                      
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /edu/guet/courseTable
  * summary: 课表查询默认当前学期 自动适配教师or学生
 * tags: 教务开放接口
 */
let eduGuetCourseTable_Param = {
     term: null,   /** 学期参数    string required:false */
   }
    
export function eduGuetCourseTable_Post( eduGuetCourseTable_Param    ) {
    return request({
         url:`/edu/guet/courseTable`,
         method:'post',
                     params:eduGuetCourseTable_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /edu/guet/teacher/courseTable
  * summary: 代查 教师课表 消耗积分
 * tags: 教务开放接口
 */
let eduGuetTeacherCourseTable_Body = {
      term: null,   /** 学期参数   string required: */
      tchno: null,   /** 教师工号   string required: */
    }
    
export function eduGuetTeacherCourseTable_Post(   eduGuetTeacherCourseTable_Body) {
    return request({
         url:`/edu/guet/teacher/courseTable`,
         method:'post',
                      
                 data: eduGuetTeacherCourseTable_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /edu/guet/selectRoomSpace
  * summary: 获取空教室数据
 * tags: 教务开放接口
 */
    
export function eduGuetSelectRoomSpace_Post(   ) {
    return request({
         url:`/edu/guet/selectRoomSpace`,
         method:'post',
                      
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /edu/guet/creditPoints
  * summary: 学分查询
 * tags: 教务开放接口
 */
    
export function eduGuetCreditPoints_Post(   ) {
    return request({
         url:`/edu/guet/creditPoints`,
         method:'post',
                      
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /edu/guet/refundCourse
  * summary: 退课程
 * tags: 教务开放接口
 */
let eduGuetRefundCourse_Body = {
      courseno: null,   /** 课程号   integer required: */
      term: null,   /** 学期   string required: */
    }
    
export function eduGuetRefundCourse_Post(   eduGuetRefundCourse_Body) {
    return request({
         url:`/edu/guet/refundCourse`,
         method:'post',
                      
                 data: eduGuetRefundCourse_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /edu/guet/infoStudent
  * summary: 代查 学生信息 消耗积分
 * tags: 教务开放接口
 */
let eduGuetInfoStudent_Param = {
     studentId: null,   /** 学号    string required:false */
   }
    
export function eduGuetInfoStudent_Post( eduGuetInfoStudent_Param    ) {
    return request({
         url:`/edu/guet/infoStudent`,
         method:'post',
                     params:eduGuetInfoStudent_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /edu/guet/selectRefundCourse
  * summary: 查询可退课程
 * tags: 教务开放接口
 */
let eduGuetSelectRefundCourse_Param = {
     term: null,   /**     string required:false */
   }
    
export function eduGuetSelectRefundCourse_Post( eduGuetSelectRefundCourse_Param    ) {
    return request({
         url:`/edu/guet/selectRefundCourse`,
         method:'post',
                     params:eduGuetSelectRefundCourse_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /edu/guet/verifyCommon
  * summary: 账号教务认证
 * tags: 教务开放接口
 */
let eduGuetVerifyCommon_Body = {
      pwd: null,   /** 密码   string required: */
      tp: null,   /** 类型 1-老师,2-学生   integer required: */
      us: null,   /** 学号   string required: */
    }
    
export function eduGuetVerifyCommon_Post(   eduGuetVerifyCommon_Body) {
    return request({
         url:`/edu/guet/verifyCommon`,
         method:'post',
                      
                 data: eduGuetVerifyCommon_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /edu/guet/selectotherscore
  * summary: 代查 学生成绩 消耗积分
 * tags: 教务开放接口
 */
let eduGuetSelectotherscore_Param = {
     studentId: null,   /** 学号    string required:false */
     term: null,   /** 学期,学期参数可以为空    string required:false */
   }
    
export function eduGuetSelectotherscore_Post( eduGuetSelectotherscore_Param    ) {
    return request({
         url:`/edu/guet/selectotherscore`,
         method:'post',
                     params:eduGuetSelectotherscore_Param  
                
    })
}
/**  =========================================================================== ***/
