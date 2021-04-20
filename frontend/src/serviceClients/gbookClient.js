import { ApiClient } from './BaseApiClient.js'

const gbookServiceClient = new ApiClient({
  resource: `${import.meta.env.VITE_BACKEND_API_URL}/gbook/`,
})

export const getByGeneralQuery = async (query, page = 0) => {
  return await gbookServiceClient.get(`/general/${query}/${page}`)
}

export const getById = async (id) => {
  return await gbookServiceClient.get(`/id/${id}`)
}

export const getByAuthor = async (author, page = 0) => {
  return await gbookServiceClient.get(`/general/inauthor:${author}/${page}`)
}

export const getByTitle = async (title, page = 0) => {
  return await gbookServiceClient.get(`/general/intitle:${title}/${page}`)
}

export const getByCategory = async (category, page = 0) => {
  return await gbookServiceClient.get(`/general/subject:${category}/${page}`)
}

export const getByIsbn = async (isbn, page = 0) => {
  return await gbookServiceClient.get(`/general/isbn:${isbn}/${page}`)
}
