import { reqdetial, reqaddgoodscart } from '@/api'
import { getuuid } from '@/utils/uuid_token'
const state = {
  detialist: [],
  uuid_token: getuuid()
}
const mutations = {
  GETDETIAL (state, data) {
    state.detialist = data
  }
}
const actions = {
  async getdetial ({ commit }, skuId) {
    const result = await reqdetial(skuId)
    if (result.code === 200) {
      commit('GETDETIAL', result.data)
    }
  },
  async addgoodscart ({ commit }, { skuId, skuNum }) {
    const result = await reqaddgoodscart(skuId, skuNum)
    if (result.code !== 200) {
      return Promise.reject(new Error('fail'))
    }
  }
}
const getters = {
  spuSaleAttrList (state) {
    return state.detialist.spuSaleAttrList || []
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
