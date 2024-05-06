import {createStore} from "vuex"
import axios from "axios";

const store = createStore({
  state() {
    return {
      isAuthenticated: false,
      accessToken: null,
      memberId: null,
      authValue: null,
    };
  },
  mutations: {
    authenticate(state, { accessToken, memberId }) {
      state.isAuthenticated = true;
      state.accessToken = accessToken;
      state.memberId = memberId;
      state.authValue = null;
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.memberId = null;
      state.authValue = null;
      delete axios.defaults.headers.common['Authorization'];
    },
    setAuthValue(state, authValue) {
      state.authValue = authValue;
    }
  },
  actions: {
    login({ commit }, { accessToken, memberId }) {
      commit('authenticate', { accessToken, memberId });
      localStorage.setItem('auth', JSON.stringify({ accessToken, memberId }));
    },
    checkLogin({ commit }) {
      const auth = JSON.parse(localStorage.getItem('auth'));
      if (auth)
        commit('authenticate', auth);
    },
    logout({ commit, state }) {
      if (state.isAuthenticated) {
        axios.get("/auth/logout");
        localStorage.removeItem('auth');
        commit('logout');
      }
      return Promise.resolve();
    },
    setAuthValue({ commit }, authValue) {
      commit('setAuthValue', authValue);
    }
  }
});

export default store;