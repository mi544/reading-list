import { getAccountInfo } from '@/serviceClients/authClient.js'

const state = () => ({
  isAuthenticated: null,
  name: null,
  username: null,
  token: null,
})
const mutations = {
  SET_USER_DATA(state, { name, username, token }) {
    state.name = name
    state.username = username
    state.token = token
  },
  SET_IS_AUTHENTICATED(state, authState) {
    state.isAuthenticated = authState
  },
}
const actions = {
  updateUserData({ commit }, userData) {
    commit('SET_IS_AUTHENTICATED', true)
    window.localStorage.setItem('isAuthenticated', JSON.stringify(true))
    commit('SET_USER_DATA', userData)
    window.localStorage.setItem('userData', JSON.stringify(userData))
  },
  resetAuthStateAndUserData({ commit }) {
    commit('SET_IS_AUTHENTICATED', false)
    window.localStorage.setItem('isAuthenticated', JSON.stringify(false))
    commit('SET_USER_DATA', { name: null, username: null, token: null })
    window.localStorage.setItem('userData', JSON.stringify(null))
  },
  parseUserDataFromLocalStorage({ commit }) {
    // check if isAuthenticated exists
    const isAuthenticated = window.localStorage.getItem('isAuthenticated')
    if (isAuthenticated === null || !JSON.parse(isAuthenticated)) {
      // break out if isAuthenticated is false or doesn't exist
      window.localStorage.setItem('isAuthenticated', JSON.stringify(false))
      return false
    }
    const userData = JSON.parse(window.localStorage.getItem('userData'))
    commit('SET_USER_DATA', userData)
  },
  async isTokenActive({ dispatch }) {
    // check if isAuthenticated exists
    const isAuthenticated = window.localStorage.getItem('isAuthenticated')
    if (isAuthenticated === null || !JSON.parse(isAuthenticated)) {
      // break out if isAuthenticated is false or doesn't exist
      window.localStorage.setItem('isAuthenticated', JSON.stringify(false))
      return false
    }
    const { token } = JSON.parse(window.localStorage.getItem('userData'))
    try {
      // trying to get account info - will fail if token is invalid
      await getAccountInfo(token)
    } catch (err) {
      // in case of an error reset the authenticated state and userData
      dispatch('resetAuthStateAndUserData')
    }
  },
}
const getters = {
  isAuthenticated(state) {
    return state.isAuthenticated
  },
  token(state) {
    return state.token
  },
  userData(state) {
    return {
      name: state.name,
      username: state.username,
      token: state.token,
    }
  },
}

export const authModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
