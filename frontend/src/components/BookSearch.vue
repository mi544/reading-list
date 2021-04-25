<template>
  <section class="bg-primary-800 border-black border-t">
    <form
      ref="bookSearchFormRef"
      class="flex flex-col sm:flex-row justify-around items-center sm:items-stretch"
      @submit.prevent="onNewSearch"
    >
      <div class="sm:w-3/12 my-2 sm:my-auto">
        <div class="min-h-full px-4">
          <select v-model="searchType" class="h-16 md:w-3/4 text-center">
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
      <div class="w-full sm:w-7/12">
        <div class="min-h-full h-12 w-3/4 mx-auto my-2 sm:my-auto">
          <input
            v-model="searchField"
            type="text"
            class="min-h-full min-w-full pl-4"
          />
        </div>
      </div>
      <div class="sm:w-2/12">
        <book-button type="submit" class="min-h-full w-24 sm:w-auto">
          Find
        </book-button>
      </div>
    </form>
    <div :style="{ height: `${pageControlsHeight}px` }"></div>
    <div
      ref="pageControlsRef"
      :class="[
        isPageControlsFixed ? 'fixed top-0 w-full' : '',
        'bg-primary-800',
      ]"
    >
      <div class="py-4 flex justify-around items-center">
        <book-button class="min-h-full" @click="onPreviousPage">
          Previous Page
        </book-button>
        <div>
          <p class="w-max px-2 py-1 bg-success-100 text-xl rounded-md">
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
import { ref, onMounted, onBeforeUnmount, watchEffect } from 'vue'
import { scrollY } from '@/composables/useWindow.js'
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

    const bookSearchFormRef = ref(null)
    const pageControlsRef = ref(null)
    const isPageControlsFixed = ref(false)
    const pageControlsHeight = ref(0)
    const formBottom = ref(0)

    const onScrollResize = () => {
      // get page controls height
      const controlsElHeight = pageControlsRef.value.offsetHeight

      // find absolute form bottom
      const elTop = bookSearchFormRef.value.offsetTop
      const elHeight = bookSearchFormRef.value.offsetHeight
      formBottom.value = elTop + elHeight

      // if scrolled past form bottom
      // make controls fixed, compensate height to prevent layout shift on Y axis
      if (scrollY.value > formBottom.value) {
        isPageControlsFixed.value = true
        pageControlsHeight.value = controlsElHeight
      } else {
        isPageControlsFixed.value = false
        pageControlsHeight.value = 0
      }
    }

    onMounted(() => {
      onScrollResize()
      window.addEventListener('scroll', onScrollResize)
      window.addEventListener('resize', onScrollResize)

      watchEffect(() => {
        if (props.qSearchType) searchType.value = props.qSearchType
        if (props.qSearchQuery) searchField.value = props.qSearchQuery

        if (props.qPage) searchPage.value = props.qPage + 1
        else searchPage.value = 1
      })
    })

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', onScrollResize)
      window.removeEventListener('resize', onScrollResize)
    })

    const onNextPage = () => {
      // scroll up to the first book only if already below it
      if (scrollY.value > formBottom.value) {
        window.scrollTo({
          top: formBottom.value,
          behavior: 'smooth',
        })
      }

      searchPage.value += 1
      router.push(
        `/books?t=${searchType.value}&q=${searchField.value}&p=${searchPage.value}`
      )
    }

    const onPreviousPage = () => {
      if (searchPage.value < 2) return false

      // scroll up to the first book only if already below it
      if (scrollY.value > formBottom.value) {
        window.scrollTo({
          top: formBottom.value,
          behavior: 'smooth',
        })
      }

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
      bookSearchFormRef,
      pageControlsRef,
      isPageControlsFixed,
      pageControlsHeight,
    }
  },
}
</script>
