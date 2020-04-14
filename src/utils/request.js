/*
 * @Descripttion: 
 * @version: 
 * @Author: Jianyong Wang
 * @Date: 2020-03-31 15:45:14
 * @LastEditors: Jianyong Wang
 * @LastEditTime: 2020-04-01 11:43:36
 */
import { useReducer } from 'react'
import { message } from 'antd'
import axios from 'axios';

//  设置request opt
function setRequestOpt(opt) {
  let { formData, bearerToken } = opt
  opt = {
    ...opt,
    transformRequest: [(data) => {
      // 对 data 进行任意转换处理
      if (formData) {
        const formData = new FormData()
        for (const key in data) {
          if (/\[\]$/.test(key)) {
            //  console.log(`/\[\]$/.test(key)`, true)
            data[key].forEach((v) => {
              // console.log(key, v)
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
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      //  'Accept-Language': getStorageItem('lang') || 'zh'
    }
  }

  //  设置token
  if (bearerToken) {
    opt.headers['Authorization'] = `Bearer `
  }

  return opt
}
//  请求方法
export async function request(opt) {
  console.log('request response')
  try {
    opt = setRequestOpt(opt)
    const response = await axios(opt);
    const { data, error } = handleResponse(response);
    // console.log('axios data', data)
    // console.log('axios error', error)

    if (error) {
      message.error(opt.errMsg || error)
      return ''
    } else {
      let sTips = opt.successMsg
      if (sTips) {
        message.success(sTips)
      }
      return data;
    }
  } catch (error) {
    message.error(opt.errMsg || error.message || error || '出错了，请稍后再试！')
    return ''
  }
}

//  请求结果处理
function handleResponse(response) {
  let { data } = response
  let status = data && data.status_code
  let error = (data && data.message) || '后端接口异常'
  let resData = data.data || {}

  if (status === 1000) {
    return { data: resData }
  } else {
    return { error }
  }
}

//  返回loading useRequest
export function useRequest(opt) {
  const initialState = {
    response: null,
    loading: false,
    error: null,
  };
  const [state, dispatch] = useReducer(requestReducer, initialState);

  /**
   * Method to make request manually
   * @param {object} config - axios config to shallow merged with opt before making request
   */
  async function request(config) {
    try {
      dispatch({
        type: 'init',
      });

      opt = setRequestOpt({
        ...opt,
        ...config
      })

      const response = await axios(opt);
      const { data, error } = handleResponse(response);

      if (error) {
        message.error(opt.errMsg || error)
        dispatch({
          type: 'error',
          error,
        })
        return ''
      } else {
        dispatch({
          type: 'success',
          response,
        });
        let sTips = opt.successMsg
        if (sTips) {
          message.success(sTips)
        }
        return data
      }
    } catch (error) {
      message.error(opt.errMsg || error.message);
      dispatch({
        type: 'error',
        error,
      });
      // return ''
    }
  }

  return {
    ...state,
    request,
  };
}

//  useRequest
function requestReducer(state, action) {
  switch(action.type) {
    case 'init':
      return {
        response: null,
        loading: true,
        error: null
      }

    case 'success':
      return {
        response: action.response,
        loading: false,
        error: null
      }

    case 'error':
      return {
        response: null,
        loading: false,
        error: action.errror
      }

    default:
      return {
        response: null,
        loading: false,
        error: null
      }
  }
}

