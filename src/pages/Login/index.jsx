import React from 'react'
import { Button } from 'antd'
import {
  useRequest,
  //  request
} from  '@/utils/request'
import { userLogin } from '@/config/ajaxOpt'

function Login() {
  let { loading, request } = useRequest(userLogin)

  async function handleLogin() {
    let data = {
      username: 'admin',
      password: 'y36py5jz'
    }
    
    let res = await request({
      ...userLogin,
      data
    })

    console.log('login', res)
  }

  async function handleRetailLogin() {
    let opt = {
      method: 'get',
      url: '/cultural-center/api/trace/'
    }
    
    let res = await request(opt)

    console.log('login', res)
  }

  return (
    <div>
      <img
        width={100}
        height={75}
        src={'/federal-api/storage/camera/2020-03-31/20200331055032KhsoaD.png'}
        alt=""/>
      <Button
        disabled={loading}
        type="primary"
        onClick={handleLogin}>
        {
          loading ? '推理平台登录...' : '推理平台登录'
        }
      </Button>
      <Button
        disabled={loading}
        type="primary"
        onClick={handleRetailLogin}>
        {
          loading ? '文化中心...' : '文化中心'
        }
      </Button>
    </div>
  )
}

export default Login