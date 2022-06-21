import request from './request'
import mockrequest from './mockrequest'
export const requestlist = () => request.get('/product/getBaseCategoryList')
export const requestbannerlist = () => mockrequest.get('/banner')
export const requestfloorlist = () => mockrequest.get('/flor')
export const reqsearchinfo = (params) => request({ url: '/list', method: 'POST', data: params })
export const reqdetial = (params) => request({ url: `/item/${params}`, method: 'GET' })
export const reqGetCode = (phone) => request({ url: `/user/passport/sendCode/${phone}`, method: 'GET' })
export const requserregister = (params) => request({ url: '/user/passport/register', method: 'POST', data: params })
export const requserlogin = (params) => request({ url: '/user/passport/login', method: 'POST', data: params })
// 用户登录
export const requserinfo = () => request({ url: '/user/passport/auth/getUserInfo', method: 'GET' })
// /user/passport/logout
export const requserlogout = () => request({ url: '/user/passport/logout', method: 'GET' })
// /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqaddgoodscart = (skuId, skuNum) => request({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'POST' })
// /api/cart/cartList购物车列表
export const reqcartlist = () => request({ url: '/cart/cartList', method: 'GET' })
export const reqdeletecart = (skuId) => request({ url: `/cart/deleteCart/${skuId}`, method: 'DELETE' })
// /api/cart/checkCart/{skuID}/{isChecked}
export const reqchangecart = (skuId, isChecked) => request({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'GET' })
export const reqtradelist = () => request({ url: '/order/auth/trade', method: 'GET' })
// /api/user/userAddress/auth/findUserAddressList
export const reqaddresslist = () => request.get('/user/userAddress/auth/findUserAddressList')
// /api/order/auth/submitOrder?tradeNo={tradeNo}提交订单
export const reqsubmitOrder = (tradeNo, data) => request({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' })
// /api/payment/weixin/createNative/{orderId}支付信息
export const reqpayment = (params) => request.get(`/payment/weixin/createNative/${params}`)
// /api/payment/weixin/queryPayStatus/{orderId}
export const reqpaystate = (orderId) => request.get(`/payment/weixin/queryPayStatus/${orderId}`)
// /api/order/auth/{page}/{limit}
export const reqpage = (page, limit) => request.get(`/order/auth/${page}/${limit}`)
