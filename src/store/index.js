import Vue from 'vue'
import Vuex from 'vuex'
// 使用模块式开发
import home from '@/store/home'
import search from '@/store/search'
import register from '@/store/register'
import detial from './detial'
import cartlist from './cartlist'
import trade from './trade'
Vue.use(Vuex)
// 对外暴露vux
export default new Vuex.Store({
  modules: {
    home,
    search,
    register,
    detial,
    cartlist,
    trade
  }
})
