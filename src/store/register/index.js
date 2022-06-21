import { reqGetCode, requserinfo, requserlogout } from '@/api'
const state = {
  code: '',
  userinfo: {}
}
const mutations = {
  GETCODE (state, data) {
    state.code = data
  },
  GETUSERINFO (state, data) {
    state.userinfo = data
  },
  LOGOUT (state) {
    state.userinfo = {}
  }
}
const actions = {
  async getcode ({ commit }, data) {
    const result = await reqGetCode(data)
    if (result.code === 200) {
      commit('GETCODE', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  async getuserinfo ({ commit }) {
    const result = await requserinfo()
    if (result.code === 200) {
      commit('GETUSERINFO', result.data)
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  async userlogout ({ commit }) {
    const result = await requserlogout()
    if (result.code !== 200) {
      return Promise.reject(new Error('fail'))
    } else {
      commit('LOGOUT')
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
