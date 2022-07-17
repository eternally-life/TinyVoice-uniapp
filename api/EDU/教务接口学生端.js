
/*** glowxq glowxq@163.com  2022-07-17 13:42:39  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /edu/student/teachingIndicatorsComment
  * summary: 获取评教指标分数及评语
 * tags: 教务接口 - 学生端
 */
let eduStudentTeachingIndicatorsComment_Body = {
      lb: null,   /** lb 未知参数,需要去教务看   string required: */
      courseno: null,   /** 课程号   string required: */
      stid: null,   /** 学号   string required: */
      term: null,   /** 学期参数   string required: */
      teacherno: null,   /** 教师号   string required: */
    }
    
export function eduStudentTeachingIndicatorsComment_Post(   eduStudentTeachingIndicatorsComment_Body) {
    return request({
         url:`/edu/student/teachingIndicatorsComment`,
         method:'post',
                      
                 data: eduStudentTeachingIndicatorsComment_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /edu/student/selectCourseSave
  * summary: 选课保存
 * tags: 教务接口 - 学生端
 */
let eduStudentSelectCourseSave_Body = {
      stype: null,   /** 选课类型   string required: */
      courseno: null,   /** 课程代码   string required: */
      ip: null,   /** 选课Ip   string required: */
      stid: null,   /** 学号   string required: */
      term: null,   /** 学期   string required: */
      courseid: null,   /** 课程代码   string required: */
    }
    
export function eduStudentSelectCourseSave_Post(   eduStudentSelectCourseSave_Body) {
    return request({
         url:`/edu/student/selectCourseSave`,
         method:'post',
                      
                 data: eduStudentSelectCourseSave_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /edu/student/selectSource
  * summary: A-成绩查询
 * tags: 教务接口 - 学生端
 */
let eduStudentSelectSource_Body = {
      stid: null,   /** 学号   string required: */
      term: null,   /** 学期参数   string required: */
    }
    
export function eduStudentSelectSource_Post(   eduStudentSelectSource_Body) {
    return request({
         url:`/edu/student/selectSource`,
         method:'post',
                      
                 data: eduStudentSelectSource_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /edu/student/courseTable
  * summary: A-课表查询
 * tags: 教务接口 - 学生端
 */
let eduStudentCourseTable_Body = {
      stid: null,   /** 学号   string required: */
      term: null,   /** 学期参数   string required: */
    }
    
export function eduStudentCourseTable_Post(   eduStudentCourseTable_Body) {
    return request({
         url:`/edu/student/courseTable`,
         method:'post',
                      
                 data: eduStudentCourseTable_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /edu/student/saveEvaluationComment
  * summary: 保存评教评语
 * tags: 教务接口 - 学生端
 */
let eduStudentSaveEvaluationComment_Body = {
      score: null,   /** $property.description   string required: */
      lb: null,   /** lb 未知参数,需要去教务看   string required: */
      courseno: null,   /** 课程号   string required: */
      chk: null,   /** $property.description   string required: */
      bz: null,   /** $property.description   string required: */
      stid: null,   /** 学号   string required: */
      term: null,   /** 学期参数   string required: */
      teacherno: null,   /** 教师号   string required: */
      courseid: null,   /** 课程id   string required: */
    }
    
export function eduStudentSaveEvaluationComment_Post(   eduStudentSaveEvaluationComment_Body) {
    return request({
         url:`/edu/student/saveEvaluationComment`,
         method:'post',
                      
                 data: eduStudentSaveEvaluationComment_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /edu/student/saveEvaluationDetails
  * summary: saveEvaluationDetails
 * tags: 教务接口 - 学生端
 */
    
export function eduStudentSaveEvaluationDetails_Post(   ) {
    return request({
         url:`/edu/student/saveEvaluationDetails`,
         method:'post',
                      
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /edu/student/evaluationTeachingList
  * summary: 获取评教课程
 * tags: 教务接口 - 学生端
 */
let eduStudentEvaluationTeachingList_Body = {
      stid: null,   /** 学号   string required: */
      term: null,   /** 学期参数   string required: */
    }
    
export function eduStudentEvaluationTeachingList_Post(   eduStudentEvaluationTeachingList_Body) {
    return request({
         url:`/edu/student/evaluationTeachingList`,
         method:'post',
                      
                 data: eduStudentEvaluationTeachingList_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /edu/student/creditPoints
  * summary: A-学分查询
 * tags: 教务接口 - 学生端
 */
let eduStudentCreditPoints_Body = {
      stid: null,   /** 学号   string required: */
    }
    
export function eduStudentCreditPoints_Post(   eduStudentCreditPoints_Body) {
    return request({
         url:`/edu/student/creditPoints`,
         method:'post',
                      
                 data: eduStudentCreditPoints_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /edu/student/verifyStudent
  * summary: A-验证学生账号
 * tags: 教务接口 - 学生端
 */
let eduStudentVerifyStudent_Body = {
      pwd: null,   /** 密码   string required: */
      us: null,   /** 学号   string required: */
    }
    
export function eduStudentVerifyStudent_Post(   eduStudentVerifyStudent_Body) {
    return request({
         url:`/edu/student/verifyStudent`,
         method:'post',
                      
                 data: eduStudentVerifyStudent_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /edu/student/selectCourseList
  * summary: selectCourseList
 * tags: 教务接口 - 学生端
 */
let eduStudentSelectCourseList_Body = {
      stid: null,   /** 学号   string required: */
      id: null,   /** 计划id   string required: */
    }
    
export function eduStudentSelectCourseList_Post(   eduStudentSelectCourseList_Body) {
    return request({
         url:`/edu/student/selectCourseList`,
         method:'post',
                      
                 data: eduStudentSelectCourseList_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /edu/student/selectCheck
  * summary: 选课审核
 * tags: 教务接口 - 学生端
 */
let eduStudentSelectCheck_Body = {
      stid: null,   /** 学号   string required: */
    }
    
export function eduStudentSelectCheck_Post(   eduStudentSelectCheck_Body) {
    return request({
         url:`/edu/student/selectCheck`,
         method:'post',
                      
                 data: eduStudentSelectCheck_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /edu/student/selectedCourse
  * summary: A-已选课程查询
 * tags: 教务接口 - 学生端
 */
let eduStudentSelectedCourse_Body = {
      stid: null,   /** 学号   string required: */
      term: null,   /** 学期参数   string required: */
    }
    
export function eduStudentSelectedCourse_Post(   eduStudentSelectedCourse_Body) {
    return request({
         url:`/edu/student/selectedCourse`,
         method:'post',
                      
                 data: eduStudentSelectedCourse_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /edu/student/selectRefundCourse
  * summary: A-查询可退课程
 * tags: 教务接口 - 学生端
 */
let eduStudentSelectRefundCourse_Body = {
      stid: null,   /** 学号   string required: */
      term: null,   /** 学期参数   string required: */
    }
    
export function eduStudentSelectRefundCourse_Post(   eduStudentSelectRefundCourse_Body) {
    return request({
         url:`/edu/student/selectRefundCourse`,
         method:'post',
                      
                 data: eduStudentSelectRefundCourse_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /edu/student/refundCourse
  * summary: A-退课程
 * tags: 教务接口 - 学生端
 */
let eduStudentRefundCourse_Body = {
      courseno: null,   /** 课程号   integer required: */
      stid: null,   /** 学号   string required: */
      term: null,   /** 学期   string required: */
    }
    
export function eduStudentRefundCourse_Post(   eduStudentRefundCourse_Body) {
    return request({
         url:`/edu/student/refundCourse`,
         method:'post',
                      
                 data: eduStudentRefundCourse_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /edu/student/infoStudent
  * summary: A- 获取学生信息
 * tags: 教务接口 - 学生端
 */
let eduStudentInfoStudent_Body = {
      stid: null,   /** 学号   string required: */
    }
    
export function eduStudentInfoStudent_Post(   eduStudentInfoStudent_Body) {
    return request({
         url:`/edu/student/infoStudent`,
         method:'post',
                      
                 data: eduStudentInfoStudent_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /edu/student/teachingIndicators
  * summary: 获取评教指标
 * tags: 教务接口 - 学生端
 */
let eduStudentTeachingIndicators_Body = {
      lb: null,   /** lb 未知参数,需要去教务看   string required: */
      courseno: null,   /** 课程号   string required: */
      stid: null,   /** 学号   string required: */
      term: null,   /** 学期参数   string required: */
      teacherno: null,   /** 教师号   string required: */
    }
    
export function eduStudentTeachingIndicators_Post(   eduStudentTeachingIndicators_Body) {
    return request({
         url:`/edu/student/teachingIndicators`,
         method:'post',
                      
                 data: eduStudentTeachingIndicators_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /edu/student/selectWeightedScore
  * summary: A-学分绩查询
 * tags: 教务接口 - 学生端
 */
let eduStudentSelectWeightedScore_Body = {
      stype: null,   /** 1-应选， 0-实选   string required: */
      chk: null,   /** 1-单个学期，0-累计学期   string required: */
      stid: null,   /** 学号   string required: */
      term: null,   /** 学期参数   string required: */
    }
    
export function eduStudentSelectWeightedScore_Post(   eduStudentSelectWeightedScore_Body) {
    return request({
         url:`/edu/student/selectWeightedScore`,
         method:'post',
                      
                 data: eduStudentSelectWeightedScore_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /edu/student/queryCourseSelection
  * summary: A-查询选课课程
 * tags: 教务接口 - 学生端
 */
let eduStudentQueryCourseSelection_Body = {
      stype: null,   /** 学院   string required: */
      grade: null,   /** 年级   string required: */
      stid: null,   /** 学号   string required: */
      term: null,   /** 学期参数   string required: */
      spno: null,   /** 专业   string required: */
    }
    
export function eduStudentQueryCourseSelection_Post(   eduStudentQueryCourseSelection_Body) {
    return request({
         url:`/edu/student/queryCourseSelection`,
         method:'post',
                      
                 data: eduStudentQueryCourseSelection_Body
    })
}
/**  =========================================================================== ***/
