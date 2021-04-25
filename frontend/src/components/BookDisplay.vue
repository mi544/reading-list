<template>
  <router-link :to="{ path: `/book/${gid}` }">
    <article
      class="sm:h-96 w-56 sm:w-96 my-2 py-4 sm:py-0 flex flex-col justify-center items-center bg-white border-2"
    >
      <div class="h-4/6">
        <img
          v-if="thumbnailUrl"
          :src="thumbnailUrl"
          :alt="`Book Thumbnail of ${title}`"
        />
        <img
          v-else
          src="@/assets/images/image-not-available.jpg"
          :alt="`Book Thumbnail of ${title}`"
        />
      </div>
      <section class="w-10/12 sm:w-auto">
        <p class="mt-5 mb-0.5">{{ titleToDisplay }}</p>
        <p class="my-0.5">{{ authorsToDisplay }}</p>
      </section>
    </article>
  </router-link>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'BookDisplay',
  props: {
    gid: { type: String, required: true },
    thumbnailUrl: { type: String, default: () => null },
    title: { type: String, required: true },
    authors: { type: Array, default: () => null },
    categories: { type: Array, default: () => null },
  },
  setup(props) {
    const authorsToDisplay = computed(() => {
      if (!props.authors || !props.authors.length) {
        return ''
      }

      let authors = props.authors

      if (authors.length > 3) {
        authors = props.authors.slice(0, 3)
      }

      authors = authors.map((author) => {
        if (author.length > 30) {
          return `${author.slice(0, 29)}...`
        }
        return author
      })

      return authors.join(', ')
    })

    const titleToDisplay = computed(() => {
      if (props.title.length > 40) {
        return `${props.title.slice(0, 39)}...`
      }
      return props.title
    })

    return { authorsToDisplay, titleToDisplay }
  },
}
</script>
