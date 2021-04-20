import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '@/composables/useAuthentication.js'
import Index from '../pages/Index.vue'
import Love from '../pages/Love.vue'
import About from '../pages/About.vue'
import Contact from '../pages/Contact.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Dashboard from '../pages/Dashboard.vue'
import Books from '../pages/Books.vue'
import Book from '../pages/Book.vue'
import NotFound from '../pages/_.vue'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    meta: {
      title: 'Book Store',
      unauthorized: true,
      authorized: true,
    },
  },
  {
    path: '/love',
    name: 'Love',
    component: Love,
    meta: {
      title: 'Love <3',
      unauthorized: true,
      authorized: true,
      love: true,
    },
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: 'About - Book Store',
      unauthorized: true,
      authorized: true,
    },
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: {
      title: 'Contact - Book Store',
      unauthorized: true,
      authorized: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login - Book Store',
      unauthorized: true,
      authorized: false,
    },
    props: (route) => ({
      redirectAfterAuth: route.query.r || null,
    }),
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: 'Register - Book Store',
      unauthorized: true,
      authorized: false,
    },
    props: (route) => ({
      redirectAfterAuth: route.query.r || null,
    }),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      title: 'Dashboard - Book Store',
      unauthorized: false,
      authorized: true,
    },
  },
  {
    path: '/books',
    name: 'Books',
    component: Books,
    meta: {
      title: 'Books - Book Store',
      unauthorized: true,
      authorized: true,
    },
    props: (route) => ({
      searchType: route.query.t || null,
      query: route.query.q || null,
      page: parseInt(route.query.p) ? parseInt(route.query.p) - 1 : null,
    }),
  },
  {
    path: '/book/:gbook_id',
    name: 'Book',
    component: Book,
    meta: {
      title: 'Book - Book Store',
      unauthorized: true,
      authorized: true,
    },
    props: (route) => ({
      gid: route.params.gbook_id || null,
    }),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
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
