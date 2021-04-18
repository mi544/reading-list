<template>
  <div class="min-h-screen bg-info-50 font-roboto flex flex-col">
    <book-header />
    <router-view></router-view>
    <book-footer />
  </div>
</template>

<script>
import BookHeader from '@C/BookHeader.vue'
import BookFooter from '@C/BookFooter.vue'

export default {
  components: {
    BookHeader,
    BookFooter,
  },
}
</script>
