import * as types from '../mutation-types'

const state = {
  msg: '我是原始数据'
}

const mutations = {
  [types.GET_MSG] (state, payload) {
    state.msg = payload
  }
}

const getters = {
  msg: state => state.msg
}

export default {
  state,
  mutations,
  getters
}
