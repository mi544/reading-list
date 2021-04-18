import { createRouter, createWebHistory } from 'vue-router'
import Index from '../pages/Index.vue'
import About from '../pages/About.vue'
import Contact from '../pages/Contact.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Dashboard from '../pages/Dashboard.vue'
import ReadingList from '../pages/ReadingList.vue'
import Books from '../pages/Books.vue'
import Book from '../pages/Book.vue'
import NotFound from '../pages/_.vue'

const routes = [
  { path: '/', component: Index },
  { path: '/about', component: About },
  { path: '/contact', component: Contact },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/dashboard', component: Dashboard },
  { path: '/reading-list', component: ReadingList },
  { path: '/books', component: Books },
  { path: '/book/:gbook_id', component: Book },
  { path: '/:pathMatch(.*)*', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
