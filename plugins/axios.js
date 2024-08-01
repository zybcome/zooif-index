import request from '@/plugins/http'

export const get = function (url, params) {
  return request.get(url, {
    params
  })
}
export const post = function (url, params) {
  return request.post(url, params)
}

export const delet = function (url, params) {
  return request.delete(url, {
    params
  })
}
