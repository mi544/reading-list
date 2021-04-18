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
      <ul class="flex justify-evenly">
        <link-item to="/books">Explore Books</link-item>
        <link-item to="/about">About</link-item>
        <link-item to="/contact">Contact</link-item>
        <div class="w-1/12"></div>
        <link-item to="/login">Login</link-item>
      </ul>
    </nav>
  </header>
</template>

<script>
import { ref } from 'vue'
import LinkItem from '@C/LinkItem.vue'
export default {
  name: 'BookHeader',
  components: { LinkItem },
  setup() {
    const isAuthenticated = ref(false)

    return { isAuthenticated }
  },
}
</script>
