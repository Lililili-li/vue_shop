import { reqsearchinfo } from '@/api'
import { getuuid } from '@/utils/uuid_token'
const state = {
  searchlist: {},
  uuid_token: getuuid()
}
const mutations = {
  GETSEARCHLIST (state, datalist) {
    state.searchlist = datalist
  }
}
const actions = {
  async getsearchlist ({ commit }, params = {}) {
    const result = await reqsearchinfo(params)
    if (result.code === 200) {
      commit('GETSEARCHLIST', result.data)
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
