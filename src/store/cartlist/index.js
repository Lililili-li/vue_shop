import { reqcartlist, reqdeletecart, reqchangecart } from '@/api'
const state = {
  cartlist: []
}
const mutations = {
  GETCARTLIST (state, data) {
    state.cartlist = data
  }
}
const actions = {
  async getcartlist ({ commit, state }) {
    const result = await reqcartlist()
    if (result.code !== 200) {
      return Promise.reject(new Error('fail'))
    } else {
      console.log(1111111)
      state.cartlist = result.data
    }
  },
  async changecart ({ commit }, { skuId, isChecked }) {
    const result = await reqchangecart(skuId, isChecked)
    if (result.code !== 200) {
      return Promise.reject(new Error('fail'))
    }
  },
  async deletecart ({ commit }, id) {
    const result = await reqdeletecart(id)
    if (result.code !== 200) {
      return Promise.reject(new Error('fail'))
    }
  },
  deleteallcart ({ dispatch, getters }) {
    const PromiseAll = []
    getters.cartInfoList.forEach(item => {
      if (item.isChecked === 1) {
        const promise = item.isChecked === 1 ? dispatch('deletecart', item.skuId) : ''
        PromiseAll.push(promise)
      }
    })
    return Promise.all(PromiseAll)
  },
  updateallchecked ({ dispatch, getters }, data) {
    const PromiseAll = []
    getters.cartInfoList.forEach((item) => {
      const promise = dispatch('changecart', { skuId: item.skuId, isChecked: data })
      PromiseAll.push(promise)
    })
    return Promise.all(PromiseAll)
  }
}
const getters = {
  cartinfolist (state) {
    return state.cartlist[0] || {}
  },
  cartInfoList () {
    return state.cartlist[0].cartInfoList || []
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
