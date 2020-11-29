import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//Additional Custom Plugins
import snackbarPlugin from './plugins/snackbar';
import Axios from 'axios';

//Using Middlewares and Plugins
Vue.use(snackbarPlugin, {store});

Vue.config.productionTip = false


//AutoLogin
const token = localStorage.getItem("token");
if(token)
  Axios.defaults.headers.common['Authorization'] = token;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
