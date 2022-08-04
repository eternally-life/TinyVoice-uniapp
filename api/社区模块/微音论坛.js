
/*** glowxq glowxq@163.com  2022-07-31 19:39:29  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /community/tinybbs/reply-save
  * summary: 第一层-回复楼主 bbsId
 * tags: 微音论坛
 */
let communityTinybbsReplysave_Body = {
  image: null,   /** 微音图片链接=只允许一张图片   string required: */
  bbsId: null,   /** 微音id   integer required: */
  content: null,   /** 微音内容文本   string required: */
}

export function communityTinybbsReplysave_Post(communityTinybbsReplysave_Body) {
  return request({
    url: `/community/tinybbs/reply-save`,
    method: 'post',

    data: communityTinybbsReplysave_Body
  })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /community/tinybbs/reply-ll-save
  * summary: 第三层-回复层主下的评论 replyLId
 * tags: 微音论坛
 */
let communityTinybbsReplyllsave_Body = {
  image: null,   /** 微音图片链接=只允许一张图片   string required: */
  replyId: null,   /** 回复楼主第一层ID   integer required: */
  replyLId: null,   /** 被回复的对象ID   integer required: */
  content: null,   /** 微音内容文本   string required: */
}

export function communityTinybbsReplyllsave_Post(communityTinybbsReplyllsave_Body) {
  return request({
    url: `/community/tinybbs/reply-ll-save`,
    method: 'post',

    data: communityTinybbsReplyllsave_Body
  })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /community/tinybbs/delete
  * summary: 删除 微音论坛 - 根据id删除 只能删除自己的
 * tags: 微音论坛
 */

export function communityTinybbsDelete_Delete() {
  return request({
    url: `/community/tinybbs/delete`,
    method: 'delete',


  })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /community/tinybbs/save
  * summary: 发布 微音论坛
 * tags: 微音论坛
 */
let communityTinybbsSave_Body = {
  isBook: null,   /** 是否书籍=1是,0否   integer required: */
  nickName: null,   /** 昵称   string required: */
  price: null,   /** 价格-二手市场字段-单位元   number required: */
  contact: null,   /** 联系方式-二手市场,失物招领字段   string required: */
  avatar: null,   /** 用户头像链接   string required: */
  type: null,   /** 微音类型-1-微音,2-二手市场,3-失物招领,4-表白,5-官方,6-匿名   integer required: */
  content: null,   /** 微音内容文本   string required: */
  imgList: null,   /** 图片列表   array required: */
}

export function communityTinybbsSave_Post(communityTinybbsSave_Body) {
  return request({
    url: `/community/tinybbs/save`,
    method: 'post',

    data: communityTinybbsSave_Body
  })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /community/tinybbs/reply-l-save
  * summary: 第二层-回复层主 replyId
 * tags: 微音论坛
 */
let communityTinybbsReplylsave_Body = {
  image: null,   /** 微音图片链接=只允许一张图片   string required: */
  replyId: null,   /** 被回复的对象ID   integer required: */
  content: null,   /** 微音内容文本   string required: */
}

export function communityTinybbsReplylsave_Post(communityTinybbsReplylsave_Body) {
  return request({
    url: `/community/tinybbs/reply-l-save`,
    method: 'post',

    data: communityTinybbsReplylsave_Body
  })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /community/tinybbs/page
  * summary: 分页获取 微音论坛
 * tags: 微音论坛
 */
let communityTinybbsPage_Param = {
  pageNum: null,   /** 第几页    string required:false */
  pageSize: null,   /** 页码大小    string required:false */
  keyword: null,   /**     string required:false */
  userId: null,   /** 根据用户ID筛选,可为空默认不筛选 可用于查询自己的微音,别人的微音    string required:false */
  targetId: null,   /** 根据微音ID筛选,用于跳转目标    string required:false */
  type: null,   /** 微音类型,可为空 默认不筛选 1-微音,2-二手市场,,3-失物招领,4-表白,5-官方,6-匿名    string required:false */
  sort: null,   /** 排序类型,可为空 默认不筛选 1-热度,2-点赞,3-回复,4-时间    string required:false */
  screenTime: null,   /** 时间筛选-可为空 默认筛选3天 值为筛选第 n 天内微音    string required:false */
}

export function communityTinybbsPage_Get(communityTinybbsPage_Param) {
  return request({
    url: `/community/tinybbs/page`,
    method: 'get',
    params: communityTinybbsPage_Param

  })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /community/tinybbs/like
  * summary: 点赞-取消点赞
 * tags: 微音论坛
 */
let communityTinybbsLike_Param = {
  tinyBbsId: null,   /**     string required:false */
}

export function communityTinybbsLike_Get(communityTinybbsLike_Param) {
  return request({
    url: `/community/tinybbs/like`,
    method: 'get',
    params: communityTinybbsLike_Param

  })
}
/**  =========================================================================== ***/
