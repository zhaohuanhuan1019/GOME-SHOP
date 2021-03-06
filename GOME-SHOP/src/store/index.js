import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import messages from './modules/messages'
Vue.use(Vuex)
const store = new Vuex.Store({
  getters,
  actions,
  modules: {
    messages
  }
})
export default store
