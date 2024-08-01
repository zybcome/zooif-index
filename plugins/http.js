import axios from 'axios'
import store from '../store'
import { Message, Notification, MessageBox } from 'element-ui' // 这里使用了element-ui的消息提示方法，也可自行定义 

import { getToken } from './auth'
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
let service = axios.create({
  // baseURL: 'https://tool.longming.com',
  timeout: 10000
})
let tansParams = function(params) {
  let result = ''
  Object.keys(params).forEach((key) => {
    if (!Object.is(params[key], undefined) && !Object.is(params[key], null) && !Object.is(JSON.stringify(params[key]), '{}')) {
      let type = Object.prototype.toString.call(params[key]);
      if (type == "[object Object]") {
        for (var i in params[key]) {
          result += encodeURIComponent(key) + '%5B' + encodeURIComponent(i) + '%5D=' + encodeURIComponent(params[key][i]) + '&'
        }
      } else {
        result += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&'
      }
    }
  })
  return result
}
// 请求拦截 可在请求头中加入token等
service.interceptors.request.use(function (config) {
  // 是否需要设置 token
  const isToken = (config.headers || {}).isToken === false
  if (getToken() && !isToken) {
    config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  // get请求映射params参数
  if (config.method === 'get' && config.params) {
    let url = config.url + '?' + tansParams(config.params);
    url = url.slice(0, -1);
    config.params = {};
    config.url = url;
  }
  return config

}, function (error) {
  // console.log(error)
  return Promise.reject(error)
})

// 响应拦截 对响应消息作初步的处理
service.interceptors.response.use(function (resp) {

  const code = resp.data.code || 200;
  // 获取错误信息
  const msg = resp.data.msg
  // console.log(resp)
  if (resp.data) {
    if (code === 401) {
      MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }
      ).then(() => {
        location.href = '/login';
      }).catch(() => { });
      return resp.data
    } else if (code === 500) {
      Message({
        message: msg,
        type: 'error'
      })
      return Promise.reject(new Error(msg))
    } else if (code !== 200) {
      Notification.error({
        title: msg
      })
      return Promise.reject('error')
    } else {
      return resp.data
    }
  } else {
    return resp
  }
}, function (error) {
  // console.log(error.response)
  if (error.response) {
    Notification.error({
      title: error.response.status,
      duration: 3000,
      closable: true
    })
  }
  return Promise.reject(error)
})

export default service