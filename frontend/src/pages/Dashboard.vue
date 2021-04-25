<template>
  <main v-if="isLoaded" class="flex-grow mb-6">
    <section class="flex justify-center items-center">
      <card class="w-3/4 sm:w-2/4 md:w-1/4 my-2 text-center">
        <p class="text-2xl my-6">Hi, {{ fullName }}!</p>
      </card>
    </section>
    <section class="flex justify-evenly items-stretch">
      <book-button
        class="w-4/12 bg-info-300 rounded-l-none rounded-b-none"
        @click="sortBy('title')"
      >
        Sort by Title
      </book-button>
      <book-button
        class="w-4/12 bg-warning-300 rounded-b-none"
        @click="reverseOrder"
      >
        Reverse order
      </book-button>
      <book-button
        class="w-4/12 bg-success-300 rounded-r-none rounded-b-none"
        @click="onBookOrderSave"
      >
        Save Book Order
      </book-button>
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
  <div v-else class="flex-grow">Loading...</div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { token, fullName } from '@/composables/useAuthentication.js'
import { getAllBooks, setBookOrder } from '@/serviceClients/bookClient.js'
import BookDisplayAsLine from '@C/BookDisplayAsLine.vue'
import BookButton from '@C/BookButton.vue'
import Card from '@C/Card.vue'

export default {
  name: 'Dashboard',
  components: { BookDisplayAsLine, BookButton, Card },
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
