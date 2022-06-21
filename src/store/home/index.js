import { requestlist, requestbannerlist, requestfloorlist } from '@/api'
const state = {
  categorylist: [],
  bannerlist: [],
  floorlist: []
}
const mutations = {
  CATEGORYLIST (state, categorylist) {
    state.categorylist = categorylist
  },
  REQUESTBANNER (state, list) {
    state.bannerlist = list
  },
  REQUESTFLLOR (state, list) {
    state.floorlist = list
  }
}
const actions = {
  async categorylist ({ commit }) {
    const result = await requestlist()
    if (result.code === 200) {
      commit('CATEGORYLIST', result.data)
    }
  },
  async getbannerlist ({ commit }) {
    const result = await requestbannerlist()
    if (result.code === 200) {
      commit('REQUESTBANNER', result.data)
    }
  },
  async getfloorlist ({ commit }) {
    const result = await requestfloorlist()
    if (result.code === 200) {
      commit('REQUESTFLLOR', result.data)
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
