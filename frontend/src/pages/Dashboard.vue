<template>
  <main class="flex-grow">
    <section>
      <book-display-as-line
        v-for="book in booksArr"
        :key="book.gid"
        :gid="book.gid"
        :finished="book.finished"
        :thumbnail-url="book.thumbnailUrl"
        :authors="book.authors"
        :title="book.title"
        :subtitle="book.subtitle"
        :categories="book.categories"
      />
    </section>
  </main>
</template>

<script>
import { ref, onMounted, watchEffect } from 'vue'
import { token } from '@/composables/useAuthentication.js'
import { getAllBooks } from '@/serviceClients/bookClient.js'
import BookDisplayAsLine from '@C/BookDisplayAsLine.vue'

export default {
  name: 'Dashboard',
  components: { BookDisplayAsLine },
  setup() {
    const booksArr = ref([])

    onMounted(() => {
      watchEffect(async () => {
        try {
          const res = await getAllBooks(token.value)

          if (!res) throw Error()

          const resData = res.data
          console.log(resData)
          if (!resData.length) {
            console.log('NO BOOKS ADDED YET!!!')
            return
          }

          booksArr.value = resData.map((book) => ({
            gid: book.gid,
            order: book.order,
            finished: book.finished,
            thumbnailUrl: book.thumbnail_url,
            authors: book.authors ? JSON.parse(book.authors) : null,
            title: book.title,
            subtitle: book.subtitle,
            categories: book.categories ? JSON.parse(book.categories) : null,
          }))
        } catch (err) {
          console.error(err)
        }
      })
    })

    return {
      booksArr,
    }
  },
}
</script>
