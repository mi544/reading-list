import { createRouter, createWebHistory } from 'vue-router'
import useAuthentication from '@/composables/useAuthentication.js'
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
      public: true,
    },
  },
  {
    path: '/about',
    component: About,
    meta: {
      title: 'About - Book Store',
      public: true,
    },
  },
  {
    path: '/contact',
    component: Contact,
    meta: {
      title: 'Contact - Book Store',
      public: true,
    },
  },
  {
    path: '/login',
    component: Login,
    meta: {
      title: 'Login - Book Store',
      public: true,
    },
  },
  {
    path: '/register',
    component: Register,
    meta: {
      title: 'Register - Book Store',
      public: true,
    },
  },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: {
      title: 'Dashboard - Book Store',
      public: false,
    },
  },
  {
    path: '/reading-list',
    component: ReadingList,
    meta: {
      title: 'Reading List - Book Store',
      public: false,
    },
  },
  {
    path: '/books',
    component: Books,
    meta: {
      title: 'Books - Book Store',
      public: true,
    },
  },
  {
    path: '/book/:gbook_id',
    component: Book,
    meta: {
      title: 'Book - Book Store',
      public: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
    meta: {
      title: '404 Not Found - Book Store',
      public: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const { isAuthenticated } = useAuthentication()
  if (!to.meta.public && !isAuthenticated.value) return '/login'
  return true
})

router.afterEach((to) => {
  window.document.title = to.meta.title
})

export default router
