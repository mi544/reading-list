import { createApp } from 'vue'
import router from './router/index.js'
import App from './App.vue'
import './index.css'

const app = createApp(App)

app.use(router)

// console.log(app.config)

app.config.devtools = true

app.mount('#app')
