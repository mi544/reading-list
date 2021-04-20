<template>
  <article
    v-if="!isDeleted"
    class="my-1 flex justify-evenly items-stretch bg-white border-2"
  >
    <div class="w-3/12">
      <router-link :to="`/book/${gid}`">
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
      </router-link>
    </div>
    <section class="w-6/12">
      <section>
        <router-link :to="`/book/${gid}`">
          <p>{{ title }}</p>
        </router-link>
      </section>
      <section>
        <p v-if="!authors">No authors specified</p>
        <p v-for="author in authors" :key="author">{{ author }}</p>
      </section>
      <section>
        <p v-if="!categories">No categories specified</p>
        <p v-for="category in categories" :key="category">
          {{ category }}
        </p>
      </section>
    </section>
    <section class="w-3/12 flex flex-col">
      <button @click="onBookDelete">delete button</button>
      <button v-if="!isFinished" @click="onBookFinish">
        complete button
      </button>
      <button v-else @click="onBookUnfinish">uncomplete button</button>
      <button @click="onBookUp">up</button>
      <button @click="onBookDown">down</button>
    </section>
  </article>
</template>

<script>
import { ref } from 'vue'
import { token } from '@/composables/useAuthentication.js'
import {
  toggleBookFinishedState,
  deleteBook,
} from '@/serviceClients/bookClient.js'

export default {
  name: 'BookDisplayAsLine',
  props: {
    gid: { type: String, required: true },
    finished: { type: Number, required: true },
    thumbnailUrl: { type: String, default: () => null },
    authors: { type: Array, default: () => null },
    title: { type: String, required: true },
    subtitle: { type: String, default: () => null },
    categories: { type: Array, default: () => null },
  },
  emits: ['book-up', 'book-down', 'book-delete'],
  setup(props, { emit }) {
    const isDeleted = ref(false)
    const isFinished = ref(props.finished)

    const onBookDelete = async () => {
      try {
        await deleteBook(props.gid, token.value)
        emit('book-delete', props.gid)
        isDeleted.value = true
      } catch (err) {
        console.error(err)
      }
    }

    const onBookFinish = async () => {
      try {
        await toggleBookFinishedState(props.gid, true, token.value)
        isFinished.value = true
      } catch (err) {
        console.error(err)
      }
    }

    const onBookUnfinish = async () => {
      try {
        await toggleBookFinishedState(props.gid, false, token.value)
        isFinished.value = false
      } catch (err) {
        console.error(err)
      }
    }

    const onBookUp = () => {
      emit('book-up', props.gid)
    }

    const onBookDown = () => {
      emit('book-down', props.gid)
    }

    return {
      isDeleted,
      isFinished,
      onBookDelete,
      onBookFinish,
      onBookUnfinish,
      onBookUp,
      onBookDown,
    }
  },
}
</script>
