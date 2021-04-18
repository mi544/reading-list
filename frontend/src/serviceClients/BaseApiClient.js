import axios from 'axios'

class ApiClient {
  constructor({ resource = '' } = {}) {
    this.axios = axios.create({
      baseURL: resource,
    })
  }
  get(path, config) {
    return this.axios.get(path, config)
  }
  post(path, payload) {
    return this.axios.post(path, payload)
  }
  update(path, payload) {
    return this.axios.put(path, payload)
  }
  delete(path) {
    return this.axios.delete(path)
  }
}

export { ApiClient }
