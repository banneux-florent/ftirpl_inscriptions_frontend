import {createStore} from "vuex"

const store = createStore({
  state() {
    return {
      isAuthenticated: false,
      token: null,
      userId: null,
      authValue: null,
    };
  },
  mutations: {
    authenticate(state, { token, userId }) {
      state.isAuthenticated = !!token;
      state.token = token;
      state.userId = userId;
    },
    logout(state) {
      state.isAuthenticated = false
      state.token = null;
      state.userId = null;
      state.authValue = null;
    },
    setAuthValue(state, authValue) {
      state.authValue = authValue;
    }
  },
  actions: {
    login({ commit }, { token, userId }) {
      commit('authenticate', { token, userId });
      // Here, you'd also want to set these in localStorage or sessionStorage
      localStorage.setItem('auth', JSON.stringify({ token, userId }));
    },
    checkLogin({ commit }) {
      const auth = JSON.parse(localStorage.getItem('auth'));
      const authValue = localStorage.getItem('authValue');
      if (auth && auth.token) {
        commit('authenticate', auth);
      } else if (authValue) {
        commit('setAuthValue', authValue);
      }
    },
    logout({ commit }) {
      localStorage.removeItem('auth');
      localStorage.removeItem('authValue');
      commit('logout');
    },
    setAuthValue({ commit }, authValue) {
      localStorage.setItem('authValue', authValue);
      commit('setAuthValue', authValue);
    }
  }
});

export default store;