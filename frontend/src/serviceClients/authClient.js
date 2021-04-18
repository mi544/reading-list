import { ApiClient } from './BaseApiClient.js'

const authServiceClient = new ApiClient({
  resource: 'http://127.0.0.1:8000/api/auth/',
})

export const registerAccount = async (query) => {
  return await authServiceClient.post('/register', query)
}

export const loginAccount = async (query) => {
  return await authServiceClient.post('/login', query)
}

export const getAccountInfo = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  return await authServiceClient.get('/info', config)
}
