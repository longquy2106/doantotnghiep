const state = {
  token: '',
  user: {
    id: '',
    username: ''
  },
  isAuthenticated: false
}
const mutations = {
  SET_TOKEN (state, token) {
    state.token = token
    state.isAuthenticated = true
  },
  SET_USER (state, userData) {
    state.user = userData
  },
  CLEAR_TOKEN (state) {
    state.token = ''
    state.isAuthenticated = false
  }
}
const actions = {}
const getters = {}

export default { namespaces: true, state, mutations, actions, getters }
