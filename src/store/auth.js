export default {
  namespaced: true,

  state: () => ({
    token: null,
    user: null
  }),

  getters: {
    isLoggedIn: state => {
      return !!state.user
    }
  },

  mutations: {
    setToken (state, token) {
      state.token = token
    },

    setUser (state, user) {
      state.user = user
    },

    logout (state) {
      state.user = null
      state.token = null
    }
  }
}
