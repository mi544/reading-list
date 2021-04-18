import { createStore } from 'vuex'
import { authModule } from './auth.js'
import { errorModule } from './error.js'

export default createStore({
  modules: {
    auth: authModule,
    error: errorModule,
  },
})
