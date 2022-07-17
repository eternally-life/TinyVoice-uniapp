
/*** glowxq glowxq@163.com  2022-07-17 13:42:39  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /edu/teacher/courseTable
  * summary: A-教师课表
 * tags: 教务接口 - 教师端
 */
let eduTeacherCourseTable_Body = {
      term: null,   /** 学期参数   string required: */
      tchno: null,   /** 教师工号   string required: */
    }
    
export function eduTeacherCourseTable_Post(   eduTeacherCourseTable_Body) {
    return request({
         url:`/edu/teacher/courseTable`,
         method:'post',
                      
                 data: eduTeacherCourseTable_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /edu/teacher/verifyTeacher
  * summary: A-验证教师
 * tags: 教务接口 - 教师端
 */
let eduTeacherVerifyTeacher_Body = {
      pwd: null,   /** 密码   string required: */
      us: null,   /** 学号   string required: */
    }
    
export function eduTeacherVerifyTeacher_Post(   eduTeacherVerifyTeacher_Body) {
    return request({
         url:`/edu/teacher/verifyTeacher`,
         method:'post',
                      
                 data: eduTeacherVerifyTeacher_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /edu/teacher/courseList
  * summary: 教师课程列表(不可用)
 * tags: 教务接口 - 教师端
 */
let eduTeacherCourseList_Body = {
      term: null,   /** 学期参数   string required: */
      tchno: null,   /** 教师工号   string required: */
    }
    
export function eduTeacherCourseList_Post(   eduTeacherCourseList_Body) {
    return request({
         url:`/edu/teacher/courseList`,
         method:'post',
                      
                 data: eduTeacherCourseList_Body
    })
}
/**  =========================================================================== ***/
