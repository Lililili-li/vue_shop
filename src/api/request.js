/* eslint-disable handle-callback-err */
import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
const request = axios.create({
  baseURL: '/api',
  timeout: 5000
})
request.interceptors.request.use((config) => {
  // config是一个配置对象，有一个请求头
  // 携带token
  const token = window.localStorage.getItem('token')
  if (token) {
    config.headers.token = token
  } else {
    config.headers.userTempId = store.state.detial.uuid_token
    config.headers.userTempId = store.state.search.uuid_token
  }
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
