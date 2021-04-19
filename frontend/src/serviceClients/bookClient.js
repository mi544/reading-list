import { ApiClient } from './BaseApiClient.js'

const bookServiceClient = new ApiClient({
  resource: 'http://127.0.0.1:8000/api/',
})

export const getAllBooks = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  return await bookServiceClient.get('/books', config)
}

export const getBookById = async (bookId, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  return await bookServiceClient.get(`/book/${bookId}`, config)
}

export const storeBook = async (gid, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const query = { g_book_id: gid }
  return await bookServiceClient.post('/book', query, config)
}

export const toggleBookFinishedState = async (bookId, finishedState, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const query = { book_id: bookId, finished: finishedState }
  return await bookServiceClient.put('/book', query, config)
}

export const deleteBook = async (bookId, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  return await bookServiceClient.delete(`/book/${bookId}`, config)
}
