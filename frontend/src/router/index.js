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
  {
    path: '/',
    component: Index,
    meta: { title: 'Book Store' },
  },
  {
    path: '/about',
    component: About,
    meta: { title: 'About - Book Store' },
  },
  {
    path: '/contact',
    component: Contact,
    meta: { title: 'Contact - Book Store' },
  },
  {
    path: '/login',
    component: Login,
    meta: {
      title: 'Login - Book Store',
    },
  },
  {
    path: '/register',
    component: Register,
    meta: { title: 'Register - Book Store' },
  },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { title: 'Dashboard - Book Store' },
  },
  {
    path: '/reading-list',
    component: ReadingList,
    meta: { title: 'Reading List - Book Store' },
  },
  {
    path: '/books',
    component: Books,
    meta: { title: 'Books - Book Store' },
  },
  {
    path: '/book/:gbook_id',
    component: Book,
    meta: { title: 'Book - Book Store' },
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
    meta: { title: '404 Not Found - Book Store' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.afterEach((to) => {
  window.document.title = to.meta.title
})

export default router
