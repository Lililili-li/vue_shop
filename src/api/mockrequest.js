/* eslint-disable handle-callback-err */
import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
const request = axios.create({
  baseURL: '/mock',
  timeout: 5000
})

request.interceptors.request.use((config) => {
  // config是一个配置对象，有一个请求头
  nprogress.start()
  return config
})
request.interceptors.response.use((res) => {
  // 数据响应成功
  nprogress.done()
  return res.data
}, (error) => {
  return Promise.reject(new Error('fail'))
})

export default request
