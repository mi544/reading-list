import { ApiClient } from './BaseApiClient.js'

const bookServiceClient = new ApiClient({
  resource: 'http://127.0.0.1:8000/api/',
})

export const getAllBooks = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  return await bookServiceClient.get('/books', config)
}

export const getBookByGid = async (gid, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  return await bookServiceClient.get(`/book/${gid}`, config)
}

export const storeBook = async (gid, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const query = { gid: gid }
  return await bookServiceClient.post('/book', query, config)
}

export const toggleBookFinishedState = async (gid, finishedState, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const query = { gid: gid, finished: finishedState }
  return await bookServiceClient.update('/book', query, config)
}

export const deleteBook = async (gid, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  return await bookServiceClient.delete(`/book/${gid}`, config)
}
