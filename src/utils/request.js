import axios from 'axios'
import { message } from 'antd'
import { getStorageItem } from '@/utils/util'

const request = (opt) => {
  let axiosOptions = {
    method: opt.method,
    url: opt.url,
    params: opt.params, // get
    data: opt.data, // post
    transformRequest: [(data) => {
      // 对 data 进行任意转换处理
      if (opt.formData) {
        const formData = new FormData()
        for (const key in data) {
          console.log('request key', /\[\]$/.test(key))
          if (/\[\]$/.test(key)) {
            //  console.log(`/\[\]$/.test(key)`, true)
            data[key].forEach((v) => {
              console.log(key, v)
              formData.append(key, v)
            })
          } else {
            formData.append(key, data[key])
          }
        }
        return formData
      }
      //  return qs.stringify(data)
      return JSON.stringify(data)
    }],
    headers: (() => {
      var headers = opt.headers || {
        // 'Content-Type': opt.formData ? 'application/x-www-form-urlencoded' : 'application/json; charset=utf-8',
        'Content-Type': 'application/json; charset=utf-8',
        'Accept-Language': getStorageItem('lang') || 'zh'
      }
      if (!opt.isNotNeedAccept) {
        headers.Accept = 'application/vnd.dev.v2+json'
      }

      return headers
    })()
  }
  return axios(axiosOptions)
    .then((response) => {
      let body = response.data
      //  资源警告
      if (body && body.status_code && body.status_code === 3201) {
        return {
          data: body.data,
          type: 'sys-resource'
        }
      }
      //  区分服务端和后端错误
      if (body && body.status_code && body.status_code !== 1000) {
        let msg = body.message
        showErrorMessage(msg)

        return false
      }
      //  console.log('axios response', body)
      //  展示后端提示
      return (body.data || body || {})
    })
    .catch((err) => {
      //  console.log(err.response.data.message)
      let errTips = (err.response && err.response.data.message) || err.message || err || '出错了，请稍后再试！'
      showErrorMessage(errTips)
      return ''
    })
}

function showErrorMessage(errTips) {
  message.error(errTips)
}

export { request }
