import { ref } from 'vue'
import { getAccountInfo } from '@/serviceClients/authClient.js'

const isAuthenticated = ref(null)
const fullName = ref(null)
const username = ref(null)
const token = ref(null)

const updateUserData = (userData) => {
  isAuthenticated.value = true
  window.localStorage.setItem('isAuthenticated', JSON.stringify(true))
  fullName.value = userData.name
  username.value = userData.username
  token.value = userData.token
  window.localStorage.setItem('userData', JSON.stringify(userData))
}

const resetAuth = () => {
  isAuthenticated.value = false
  window.localStorage.setItem('isAuthenticated', JSON.stringify(false))
  fullName.value = null
  username.value = null
  token.value = null
  window.localStorage.removeItem('userData')
}

const loadDataFromStorage = () => {
  // check if isAuthenticated exists
  const isAuthenticatedStore = window.localStorage.getItem('isAuthenticated')
  if (isAuthenticatedStore === null || !JSON.parse(isAuthenticatedStore)) {
    // break out if isAuthenticated is false or doesn't exist
    return false
  }

  const userData = JSON.parse(window.localStorage.getItem('userData'))
  fullName.value = userData.name
  username.value = userData.username
  token.value = userData.token
  isAuthenticated.value = true

  return true
}

const checkIsTokenActive = async () => {
  // check if isAuthenticated exists
  const isAuthenticated = window.localStorage.getItem('isAuthenticated')
  if (isAuthenticated === null || !JSON.parse(isAuthenticated)) {
    // break out if isAuthenticated is false or doesn't exist
    return false
  }

  const { token } = JSON.parse(window.localStorage.getItem('userData'))
  try {
    // trying to get account info - will fail if token is invalid
    await getAccountInfo(token)
    return true
  } catch (err) {
    // in case of an error reset the authenticated state and userData
    resetAuth()
    return false
  }
}

export {
  isAuthenticated,
  fullName,
  username,
  token,
  updateUserData,
  resetAuth,
  loadDataFromStorage,
  checkIsTokenActive,
}
