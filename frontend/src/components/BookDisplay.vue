<template>
  <router-link :to="`/book/${gid}`">
    <article
      class="my-1 h-96 w-96 flex flex-col justify-center items-center bg-white border-2"
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
      <p>{{ titleToDisplay }}</p>
      <p>{{ authorsToDisplay }}</p>
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
