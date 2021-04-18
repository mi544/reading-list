import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '@/composables/useAuthentication.js'
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
    meta: {
      title: 'Book Store',
      unauthorized: true,
      authorized: true,
    },
  },
  {
    path: '/about',
    component: About,
    meta: {
      title: 'About - Book Store',
      unauthorized: true,
      authorized: true,
    },
  },
  {
    path: '/contact',
    component: Contact,
    meta: {
      title: 'Contact - Book Store',
      unauthorized: true,
      authorized: true,
    },
  },
  {
    path: '/login',
    component: Login,
    meta: {
      title: 'Login - Book Store',
      unauthorized: true,
      authorized: false,
    },
  },
  {
    path: '/register',
    component: Register,
    meta: {
      title: 'Register - Book Store',
      unauthorized: true,
      authorized: false,
    },
  },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: {
      title: 'Dashboard - Book Store',
      unauthorized: false,
      authorized: true,
    },
  },
  {
    path: '/reading-list',
    component: ReadingList,
    meta: {
      title: 'Reading List - Book Store',
      unauthorized: false,
      authorized: true,
    },
  },
  {
    path: '/books',
    component: Books,
    meta: {
      title: 'Books - Book Store',
      unauthorized: true,
      authorized: true,
    },
  },
  {
    path: '/book/:gbook_id',
    component: Book,
    meta: {
      title: 'Book - Book Store',
      unauthorized: true,
      authorized: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
    meta: {
      title: '404 Not Found - Book Store',
      unauthorized: true,
      authorized: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  // we are authenticated
  if (isAuthenticated.value) {
    if (to.meta.authorized) return true
    return '/dashboard'
  }
  // we are not authenticated
  if (to.meta.unauthorized) return true
  return '/login'
})

router.afterEach((to) => {
  window.document.title = to.meta.title
})

export default router
