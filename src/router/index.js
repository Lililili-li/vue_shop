import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
Vue.use(VueRouter)
// 重写push和replace方法
// 1.备份原来的push方法
const orginpush = VueRouter.prototype.push
const orginreplace = VueRouter.prototype.replace
// 2.重写push和replace方法
VueRouter.prototype.push = function (location, reslove, reject) {
  if (reslove && reject) {
    orginpush.call(this, location, reslove, reject)
  } else {
    orginpush.call(this, location, () => {}, () => {})
  }
}
VueRouter.prototype.replace = function (location, reslove, reject) {
  if (reslove && reject) {
    orginreplace.call(this, location, reslove, reject)
  } else {
    orginreplace.call(this, location, () => {}, () => {})
  }
}
const router = new VueRouter({
  routes: [
    {
      path: '/home',
      component: () => import('@/views/Home/Home.vue')
    },
    {
      path: '/center',
      component: () => import('@/views/Center'),
      children: [
        {
          path: '/center/myorder',
          component: () => import('@/views/Center/children/myorder.vue')
        },
        {
          path: '/center/grouporder',
          component: () => import('@/views/Center/children/grouporder.vue')
        },
        {
          path: '/center',
          redirect: '/center/myorder'
        }
      ]
    },
    {
      path: '/pay',
      component: () => import('@/views/Pay/Pay.vue'),
      beforeEnter: (to, from, next) => {
        if (from.path === '/trade') {
          next()
        } else {
          next(false)
        }
      }
    },
    {
      path: '/paysuccess',
      component: () => import('@/views/PaySuccess'),
      beforeEnter: (to, from, next) => {
        if (from.path === '/pay') {
          next()
        } else {
          next(false)
        }
      }
    },
    {
      path: '/trade',
      name: 'trade',
      component: () => import('@/views/Trade/Trade.vue'),
      beforeEnter: (to, from, next) => {
        if (from.path === '/shopcart') {
          next()
        } else {
          next(false)
        }
      }
    },
    {
      path: '/addcartsuccess/:skum?',
      name: 'addcartsuccess',
      component: () => import('@/views/Addcartsuccess/Addcartsuccess.vue')
    },
    {
      name: 'search',
      path: '/search/:keyword?',
      component: () => import('@/views/Search/Search.vue')
    },
    {
      path: '/register',
      component: () => import('@/views/Register/Register.vue')
    },
    {
      path: '/login',
      component: () => import('@/views/Login/Login.vue')
    },
    {
      name: 'detial',
      path: '/detial/:skuId',
      component: () => import('@/views/Detial/Detial.vue')
    },
    {
      path: '/shopcart',
      component: () => import('@/views/Shopcart/Shopcart.vue')
    },
    // 路由重定向
    {
      path: '/',
      redirect: '/home'
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }
  }
})
router.beforeEach(async (to, from, next) => {
  const token = window.localStorage.getItem('token')
  const name = store.state.register.userinfo.name
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
      if (name) {
        next()
      } else {
        try {
          // 派发action
          await store.dispatch('getuserinfo')
          next()
        } catch (error) {
          // token失效走这个回调，清除回调
          window.localStorage.removeItem('token')
          await store.dispatch('userlogout')
        }
      }
    }
  } else {
    if (to.path === '/shopcart' || to.path === '/addcartsuccess' || to.path === '/center' || to.path === '/center/myorder') {
      next('/login')
    }
    next()
  }
  next()
})
export default router
