import { reqtradelist, reqaddresslist } from '@/api'
const state = {
  tradelist: {},
  addresslist: []
}
const mutations = {
  GETTRADELIST (state, datalist) {
    state.tradelist = datalist
  },
  GETADDRESSLIST (state, list) {
    state.addresslist = list
  }
}
const actions = {
  async gettradelist ({ commit }) {
    const result = await reqtradelist()
    if (result.code === 200) {
      commit('GETTRADELIST', result.data)
    }
  },
  async getaddresslist ({ commit }) {
    const result = await reqaddresslist()
    if (result.code === 200) {
      commit('GETADDRESSLIST', result.data)
    }
  }
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}
