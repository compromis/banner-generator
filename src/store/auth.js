export default {
  namespaced: true,
  state: () => ({
    token: null,
    user: null
  }),

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
