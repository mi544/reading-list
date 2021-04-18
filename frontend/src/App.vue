<template>
  <div class="min-h-screen flex flex-col">
    <book-header />
    <router-view></router-view>
    <book-footer />
  </div>
</template>

<script>
import BookHeader from './components/BookHeader.vue'
import BookFooter from './components/BookFooter.vue'

export default {
  components: {
    BookHeader,
    BookFooter
  }
}
</script>
