/*
 * @Descripttion: 
 * @version: 
 * @Author: Jianyong Wang
 * @Date: 2020-04-02 16:27:37
 * @LastEditors: Jianyong Wang
 * @LastEditTime: 2020-04-02 16:32:54
 */
const status_code = 1000

const user = {
  'POST /federal-api/admin/login': (req, res) => {
    return res.json({
      status_code,
      message: '登录成功！',
      name: '登录接口'
    })
  }
}

module.exports = user