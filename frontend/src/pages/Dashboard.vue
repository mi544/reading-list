<template>
  <main v-if="isLoaded" class="flex-grow">
    <section class="flex justify-center items-center">
      <p class="text-2xl my-6">Hi {{ fullName }}!</p>
    </section>
    <section class="flex justify-evenly items-center">
      <button class="w-4/12" @click="sortBy('title')">Sort by Title</button>
      <button class="w-4/12" @click="reverseOrder">Reverse order</button>
      <button class="w-4/12" @click="onBookOrderSave">Save Book Order</button>
    </section>
    <section>
      <p v-if="!booksArr.length">No books added yet</p>
      <book-display-as-line
        v-for="book in booksArr"
        v-else
        :key="book.gid"
        :gid="book.gid"
        :finished="book.finished"
        :thumbnail-url="book.thumbnailUrl"
        :authors="book.authors"
        :title="book.title"
        :subtitle="book.subtitle"
        :categories="book.categories"
        @book-up="onBookUp"
        @book-down="onBookDown"
        @book-delete="onBookDelete"
      />
    </section>
  </main>
  <p v-else class="flex-grow">Spinner</p>
</template>

<script>
import { ref, onMounted } from 'vue'
import { token, fullName } from '@/composables/useAuthentication.js'
import { getAllBooks, setBookOrder } from '@/serviceClients/bookClient.js'
import BookDisplayAsLine from '@C/BookDisplayAsLine.vue'

export default {
  name: 'Dashboard',
  components: { BookDisplayAsLine },
  setup() {
    const isLoaded = ref(false)
    const booksArr = ref([])

    const getBooks = async () => {
      try {
        isLoaded.value = false
        booksArr.value = []
        const res = await getAllBooks(token.value)

        if (!res) throw Error()

        const resData = res.data
        if (!resData.length) {
          isLoaded.value = true
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

        isLoaded.value = true
      } catch (err) {
        console.error(err)
      }
    }

    onMounted(getBooks)

    const onBookDelete = (gid) => {
      const bookIndex = booksArr.value.findIndex((book) => book.gid === gid)
      if (bookIndex > -1) {
        booksArr.value.splice(bookIndex, 1)
      }
    }
    const onBookUp = (gid) => {
      const bookIndex = booksArr.value.findIndex((book) => book.gid === gid)
      if (bookIndex > -1) {
        if (bookIndex === 0) return
        const splicedBook = booksArr.value.splice(bookIndex, 1)[0]
        booksArr.value.splice(bookIndex - 1, 0, splicedBook)
      }
    }

    const onBookDown = (gid) => {
      const bookIndex = booksArr.value.findIndex((book) => book.gid === gid)
      if (bookIndex > -1) {
        if (bookIndex === booksArr.value.length - 1) return
        const splicedBook = booksArr.value.splice(bookIndex, 1)[0]
        booksArr.value.splice(bookIndex + 1, 0, splicedBook)
      }
    }

    const onBookOrderSave = async () => {
      if (!booksArr.value.length) return

      const orderArr = booksArr.value.map((book, index) => ({
        gid: book.gid,
        order: index + 1,
      }))

      try {
        await setBookOrder(orderArr, token.value)
      } catch (err) {
        console.error(err)
      }
    }

    const sortBy = (column) => {
      if (!booksArr.value.length) return
      booksArr.value.sort((a, b) => {
        if (a[column] < b[column]) return -1
        if (a[column] > b[column]) return +1
        return 0
      })
    }

    const reverseOrder = () => {
      if (!booksArr.value.length) return
      booksArr.value.reverse()
    }

    return {
      fullName,
      booksArr,
      isLoaded,
      onBookDelete,
      onBookUp,
      onBookDown,
      onBookOrderSave,
      sortBy,
      reverseOrder,
    }
  },
}
</script>
