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
  post(path, payload, config = {}) {
    return this.axios.post(path, payload, config)
  }
  update(path, payload, config = {}) {
    return this.axios.put(path, payload, config)
  }
  delete(path, config) {
    return this.axios.delete(path, config)
  }
}

export { ApiClient }
