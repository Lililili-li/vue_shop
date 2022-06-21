import Vue from 'vue'
import App from './App.vue'
// 引入初始化样式
import '@/assets/globlecss/reset.css'
// 引入路由
import router from '@/router'
import Nav from '@/components/Nav/Nav.vue'
import Pagination from '@/components/Pagination/Pagination.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入vuex
import store from '@/store'
// 引入mock
import '@/plugins/validate.js'
import '@/mock/mockServe.js'
// 引入swiper样式
import 'swiper/css/swiper.css'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
  loading:'@/assets/loading.gif'
})
Vue.use(ElementUI)
Vue.component(Nav.name, Nav)
Vue.component(Pagination.name, Pagination)
Vue.config.productionTip = false
new Vue({
  // 注册路由
  beforeCreate () {
    Vue.prototype.$bus = this
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
