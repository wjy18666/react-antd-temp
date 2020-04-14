/*
 * @Descripttion: 
 * @version: 
 * @Author: Jianyong Wang
 * @Date: 2020-03-30 15:55:58
 * @LastEditors: Jianyong Wang
 * @LastEditTime: 2020-04-14 16:05:58
 */
import { request } from '@/utils/request_new'

const userApi = {
  login(data) {
    return request({
      url: '/federal-api/api/login',
      method: 'post',
      data
    })
  }, 
}

export default userApi