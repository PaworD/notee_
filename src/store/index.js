import Vue from 'vue'
import Vuex from 'vuex'

import snackbar from './snackbar';
import user from './user';
import notes from './notes';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },

  modules: {
     snackbar,
     user,
     notes
  }
  
})
