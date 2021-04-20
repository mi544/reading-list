<template>
  <section class="mx-20 bg-primary-800 border-black border-t">
    <form
      class="flex justify-around items-stretch"
      @submit.prevent="onNewSearch"
    >
      <div class="w-3/12">
        <div class="min-h-full px-4">
          <select v-model="searchType" class="h-16 w-3/4 text-center">
            <option
              v-for="searchType in searchTypes"
              :key="searchType.slug"
              :value="searchType.slug"
            >
              {{ searchType.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="w-7/12">
        <input
          v-model="searchField"
          type="text"
          class="min-h-full w-full pl-4"
        />
      </div>
      <div>
        <book-button class="min-h-full" type="submit">Find</book-button>
      </div>
    </form>
    <div>
      <div class="mt-4 py-4 flex justify-around items-center">
        <book-button class="min-h-full" @click="onPreviousPage">
          Previous Page
        </book-button>
        <div>
          <p class="w-max px-2 py-1 bg-success-100 text-xl">
            Page: {{ searchPage }}
          </p>
        </div>
        <book-button class="min-h-full" @click="onNextPage">
          Next Page
        </book-button>
      </div>
    </div>
    <div> </div>
  </section>
</template>

<script>
import { ref, onMounted, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

import BookButton from '@C/BookButton.vue'

export default {
  name: 'BookSearch',
  components: { BookButton },
  props: {
    qSearchType: { type: String, default: () => null },
    qSearchQuery: { type: String, default: () => null },
    qPage: { type: Number, default: () => null },
  },
  setup(props) {
    const router = useRouter()

    const searchTypes = [
      { name: 'General Search', slug: 'generalsearch' },
      { name: 'Book Title', slug: 'booktitle' },
      { name: 'Book Author', slug: 'bookauthor' },
      { name: 'Book Category', slug: 'bookcategory' },
      { name: 'ISBN', slug: 'isbn' },
    ]
    const searchType = ref('bookcategory')
    const searchField = ref('science fiction')
    const searchPage = ref(1)

    onMounted(() => {
      watchEffect(() => {
        if (props.qSearchType) searchType.value = props.qSearchType
        if (props.qSearchQuery) searchField.value = props.qSearchQuery

        if (props.qPage) searchPage.value = props.qPage + 1
        else searchPage.value = 1
      })
    })

    const onNextPage = () => {
      searchPage.value += 1
      router.push(
        `/books?t=${searchType.value}&q=${searchField.value}&p=${searchPage.value}`
      )
    }

    const onPreviousPage = () => {
      if (searchPage.value < 2) return false
      searchPage.value -= 1
      router.push(
        `/books?t=${searchType.value}&q=${searchField.value}&p=${searchPage.value}`
      )
    }

    const onNewSearch = () => {
      searchPage.value = 1
      router.push(
        `/books?t=${searchType.value}&q=${searchField.value}&p=${searchPage.value}`
      )
    }

    return {
      searchType,
      searchField,
      searchTypes,
      searchPage,
      onNewSearch,
      onNextPage,
      onPreviousPage,
    }
  },
}
</script>
