import Mock from 'mockjs'
import {
  imgAlgoConfigInstaceList,
  imgAlgoConfig,
  imgConfigList,
  imgConfigDetail
} from './data/imgAlgoConfig'

console.log('Mock', Mock)
const status_code = 1000
const message = ''
/**
 * 图片类算法
 *  **/

Mock.mock('/federal-api/api/algo/image', 'get', () => {
  return {
    data: imgAlgoConfigInstaceList,
    status_code,
    message
  }
})

//  算法配置列表以及详情
Mock.mock('/federal-api/api/algo/image/configuration/99', 'get', () => {
  return {
    data: imgConfigList,
    status_code,
    message
  }
})
//  算法配置列表以及详情
Mock.mock('/federal-api/api/algo/image/configuration/88', 'get', () => {
  return {
    data: imgConfigDetail,
    status_code,
    message
  }
})

