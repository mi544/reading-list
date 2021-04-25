import { ApiClient } from './BaseApiClient.js'

const authServiceClient = new ApiClient({
  resource: `${import.meta.env.VITE_BACKEND_API_URL}/auth/`,
})
export const registerAccount = async (query) => {
  return await authServiceClient.post('/register', query)
}

export const loginAccount = async (query) => {
  return await authServiceClient.post('/login', query)
}

export const logoutAccount = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  return await authServiceClient.delete('/logout', config)
}

export const getAccountInfo = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  return await authServiceClient.get('/info', config)
}
