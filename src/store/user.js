import axios from 'axios';
import router from '../router/index'
const user = {
  state: () => ({
    user: null,
    error: null
  }),
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setError(state, payload) {
      state.error = payload;
    }
  },
  actions: {
    logOut({ state }) {
      localStorage.removeItem("token")
      
      state.user = null;
    },
    logIn({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/user/login', payload).then((res) => {
          localStorage.setItem("token", res.data.token)

          commit("setUser", res.data.data);
          commit("setError", null)
          resolve(res.data.data)
          router.replace({ name: "MyNotes" })
        }).catch((e) => {
          console.log(e);
          commit("setError", "Неправильный Пароль или Логин")
        })
      })
    },

    autoLogin({ commit, state }) {
      return new Promise((resolve, reject) => {
        let token = localStorage.getItem("token");
        if(!token){
          return
        }
        axios.get("http://localhost:3000/user/token", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then((res) => {
          resolve("Get")
          commit("setUser", res.data.data);
          commit("setError", null)
          router.replace({ name: "MyNotes" })
        }).catch((e) => {
          reject(e);
          console.log(e);
        })
      })
    },

    signUp({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/user/signup', payload).then((res) => {
        resolve(res.data);
        }).catch((e) => reject(e));
      })
    }
  },
  getters: {
    isLoggedIn(state) {
      if (state.user) {
        return true
      }
      else {
        return false;
      }
    },
    userData(state) {
      return state.user;
    },
    hasError(state) {
      return state.error;
    }
  }
};

export default user;
