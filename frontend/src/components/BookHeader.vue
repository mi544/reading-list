<template>
  <header
    class="h-32 bg-primary-200 flex justify-between items-center border-black border-b-2 rounded-b-md shadow-md"
  >
    <div class="h-24 md:w-5/12 lg:w-4/12">
      <router-link
        :to="{ name: 'Index' }"
        class="h-full w-full p-2 flex items-center shadow-lg"
      >
        <img
          src="@/assets/images/open-book.svg"
          alt="Open Book Icon"
          class="h-full pl-1 sm:pl-6"
        />
        <h1 class="pl-1 sm:pl-6 text-3xl text-center">Book Store</h1>
      </router-link>
    </div>
    <div class="hidden md:block md:w-2/12 lg:w-3/12"></div>
    <button class="md:hidden h-24 w-24 mr-4 sm:mr-10" @click="onMenuToggle">
      <div class="h-6 w-12 m-auto flex flex-col justify-between">
        <div class="border-t-4 border-black"></div>
        <div class="w-10 mx-auto border-t-4 border-black"></div>
        <div class="border-t-4 border-black"></div>
      </div>
    </button>
    <nav
      :class="[
        isMobile
          ? isMenuOpen
            ? 'absolute h-64 w-64 top-32 right-2'
            : 'hidden'
          : 'md:w-5/12',
      ]"
    >
      <ul
        :class="[
          'h-full md:h-auto flex flex-col md:flex-row justify-evenly items-center text-2xl md:text-xl',
          'bg-info-100 md:bg-transparent rounded-xl md:rounded-none',
        ]"
      >
        <link-list-item :to="{ name: 'Books' }" @click="onLinkClick">
          Explore Books
        </link-list-item>
        <div class="hidden md:block md:w-1/12"></div>
        <link-list-item
          v-if="isAuthenticated"
          :to="{ name: 'Dashboard' }"
          @click="onLinkClick"
        >
          Dashboard
        </link-list-item>
        <link-list-item v-else :to="{ name: 'Login' }" @click="onLinkClick"
          >Login</link-list-item
        >
        <book-button v-if="isAuthenticated" @click="logout" small red>
          Logout
        </book-button>
      </ul>
    </nav>
  </header>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
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

    const isMenuOpen = ref(false)
    const isMobile = ref(false)

    const onResize = () => {
      const screenWidth = window.screen.availWidth
      isMobile.value = screenWidth < 768 ? true : false
      // will set isMenuOpen value to false
      // every time the screen is resized to be wider than 768px
      // to prevent having opened menu when resizing to small screen back
      isMenuOpen.value = screenWidth >= 768 ? false : isMenuOpen.value
    }

    onMounted(() => {
      onResize()
      window.addEventListener('resize', onResize)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize)
    })

    const onMenuToggle = () => {
      isMenuOpen.value = !isMenuOpen.value
    }

    const onLinkClick = () => {
      isMenuOpen.value = false
    }

    const logout = async () => {
      onLinkClick()
      try {
        await logoutAccount(token.value)
      } catch (err) {
        console.error(err)
      } finally {
        resetAuth()
        router.push('/')
      }
    }

    return {
      isAuthenticated,
      logout,
      isMenuOpen,
      isMobile,
      onMenuToggle,
      onLinkClick,
    }
  },
}
</script>
