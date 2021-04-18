<template>
  <header
    class="h-32 bg-primary-200 flex justify-between items-center border-black border-b-2 rounded-b-md shadow-md"
  >
    <div class="h-24 w-3/12">
      <router-link to="/" class="h-full w-full p-2 flex items-center shadow-lg">
        <img
          src="@/assets/images/open-book.svg"
          alt="Open Book Icon"
          class="h-full pl-6"
        />
        <h1 class="pl-6 text-3xl">Book Store</h1>
      </router-link>
    </div>
    <div class="w-4/12"></div>
    <nav class="w-5/12 text-xl">
      <ul class="flex justify-evenly items-center">
        <link-list-item to="/books">Explore Books</link-list-item>
        <link-list-item to="/about">About</link-list-item>
        <link-list-item to="/contact">Contact</link-list-item>
        <div class="w-1/12"></div>
        <link-list-item v-if="isAuthenticated" to="/dashboard">
          Dashboard
        </link-list-item>
        <link-list-item v-else to="/login">Login</link-list-item>
        <book-button v-if="isAuthenticated" @click="logout" small red>
          Logout
        </book-button>
      </ul>
    </nav>
  </header>
</template>

<script>
import { useRouter } from 'vue-router'
import {
  isAuthenticated,
  resetAuth,
  token,
} from '@/composables/useAuthentication.js'
import { logoutAccount } from '@/serviceClients/authClient.js'
import LinkListItem from '@C/LinkListItem.vue'
import BookButton from '@C/BookButton.vue'

export default {
  name: 'BookHeader',
  components: { LinkListItem, BookButton },
  setup() {
    const router = useRouter()

    const logout = async () => {
      try {
        await logoutAccount(token)
      } catch (err) {
        console.error(err)
      } finally {
        resetAuth()
        router.push('/')
      }
    }

    return { isAuthenticated, logout }
  },
}
</script>
