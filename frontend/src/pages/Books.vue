<template>
  <main class="flex-grow">
    <book-search
      :q-search-type="searchType"
      :q-search-query="query"
      :q-page="page"
    />
    <section class="flex flex-wrap justify-evenly">
      <book-display
        v-for="book in booksArr"
        :key="book.gid"
        :gid="book.gid"
        :thumbnail-url="book.thumbnailUrl"
        :title="book.title"
        :authors="book.authors"
      />
    </section>
  </main>
</template>

<script>
import { ref, onMounted, watchEffect } from 'vue'
import {
  getByGeneralQuery,
  getByAuthor,
  getByTitle,
  getByCategory,
  getByIsbn,
} from '@/serviceClients/gbookClient.js'
import BookSearch from '@C/BookSearch.vue'
import BookDisplay from '@C/BookDisplay.vue'

export default {
  name: 'Books',
  components: { BookSearch, BookDisplay },
  props: {
    searchType: { type: String, default: () => null },
    query: { type: String, default: () => null },
    page: { type: Number, default: () => null },
  },
  setup(props) {
    const booksArr = ref([])

    onMounted(() => {
      watchEffect(async () => {
        try {
          let res = null
          if (!props.searchType) {
            booksArr.value = []
            return
          }
          switch (props.searchType) {
            case 'generalsearch':
              res = await getByGeneralQuery(props.query, props.page)
              break
            case 'booktitle':
              res = await getByTitle(props.query, props.page)
              break
            case 'bookauthor':
              res = await getByAuthor(props.query, props.page)
              break
            case 'bookcategory':
              res = await getByCategory(props.query, props.page)
              break
            case 'isbn':
              res = await getByIsbn(props.query, props.page)
          }

          if (!res) throw Error()

          const resData = res.data
          if (!resData.items) {
            console.log('BOOKS NOT FOUND!!!')
            return
          }

          booksArr.value = resData.items.map((book) => ({
            gid: book.id,
            thumbnailUrl: book.volumeInfo.imageLinks?.thumbnail,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            categories: book.volumeInfo.categories,
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
