import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)


import mutations from 'store/mutations'
import getters from 'store/getters'
import actions from 'store/actions'


const state = {
}

const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions

})


export default store
