import {createStore} from "vuex"

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
    },
    logout(state) {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.memberId = null;
      state.authValue = null;
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
    logout({ commit }) {
      localStorage.removeItem('auth');
      commit('logout');
    },
    setAuthValue({ commit }, authValue) {
      commit('setAuthValue', authValue);
    }
  }
});

export default store;