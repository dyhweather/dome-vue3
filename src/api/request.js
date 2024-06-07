import { message } from 'ant-design-vue'
import axios from 'axios'
// import qs from 'qs'

const TYPEJSON = 'application/json'
// const TYPEFORM = 'application/x-www-form-urlencoded'
const TYPEFORMDATA = 'multipart/form-data'

const baseURL = '/api'
// console.log('NODE_ENV', process.env.NODE_ENV)

const defaultConfig = {
  baseURL,
  timeout: 30000 // 设置全局超时时间30s
}
const instance = axios.create(defaultConfig)
// 设置默认post请求头。
instance.defaults.headers.common['Content-Type'] = TYPEJSON

/** 添加请求拦截器，可以根据请求路径做一些个性化设置 */
instance.interceptors.request.use(
  async (config) => {
    if (typeof config.headers === 'undefined') config.headers = {}
    // 自定义请求头
    config.headers.hzToken = ''
    return config
  },
  (error) => Promise.reject(error)
)

/** 添加响应拦截器  * */
instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    message.error('数据请求失败')
    throw error // 二者效果一样
    // return Promise.reject(error)
  }
)

export const get = (url, params, config) => {
  return instance.request({ method: 'get', url, params, ...config })
}

export const post = (url, data, params, config) => {
  return instance.request({ method: 'post', url, data, params, ...config })
}

// export const postForm = (url, data, params, config) => {
//   return instance.request({
//     method: 'post',
//     url,
//     data: qs.stringify(data),
//     params,
//     ...config,
//     headers: { 'content-type': TYPEFORM }
//   })
// }

export const postFormData = (url, data, params, config) => {
  return instance.request({
    method: 'post',
    url,
    data,
    params,
    ...config,
    headers: { 'content-type': TYPEFORMDATA }
  })
}

// 文件下载
const instanceDownload = axios.create(defaultConfig)
// 设置默认post请求头。
instanceDownload.defaults.headers.common['Content-Type'] = TYPEJSON

/** 添加请求拦截器，可以根据请求路径做一些个性化设置 */
instanceDownload.interceptors.request.use(
  async (config) => {
    if (typeof config.headers === 'undefined') config.headers = {}
    // 自定义请求头
    config.headers.hzToken = ''
    return config
  },
  (error) => Promise.reject(error)
)

/** 添加响应拦截器  * */
instanceDownload.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // message.error(error?.message ?? '数据请求失败')
    message.error('数据请求失败')
    throw error // 二者效果一样
    // return Promise.reject(error)
  }
)
export const getDownload = (url, params, config) => {
  return instanceDownload.request({
    method: 'get',
    url,
    params,
    responseType: 'blob',
    ...config
  })
}

export const postDownload = (url, data, params, config) => {
  return instanceDownload.request({
    method: 'post',
    url,
    data,
    params,
    responseType: 'blob',
    ...config
  })
}

// export const postFormDownload = (url, data, params, config) => {
//   return instanceDownload.request({
//     method: 'post',
//     url,
//     data: qs.stringify(data),
//     params,
//     responseType: 'blob',
//     ...config,
//     headers: { 'content-type': TYPEFORM }
//   })
// }
