<template>
  <article
    v-if="!isDeleted"
    class="mb-1 py-1 flex justify-evenly items-stretch bg-white border-2"
  >
    <div class="w-3/12">
      <router-link :to="{ path: `/book/${gid}` }">
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
    <div class="w-6/12 pl-1 sm:pl-0 flex flex-col justify-around">
      <section>
        <router-link :to="{ path: `/book/${gid}` }">
          <p class="mb-4 text-base sm:text-xl">{{ title }}</p>
        </router-link>
        <p v-if="!authors" class="text-base sm:text-lg">No authors specified</p>
        <p v-for="author in authors" :key="author" class="text-base sm:text-lg">
          {{ author }}
        </p>
      </section>
      <section class="sm:w-3/4 md:w-2/4 flex justify-around sm:justify-between">
        <book-button class="w-12 md:w-auto text-center" @click="onBookUp">
          &and;
        </book-button>
        <book-button class="w-12 md:w-auto text-center" @click="onBookDown">
          &or;
        </book-button>
      </section>
    </div>
    <div class="min-h-full w-3/12 flex flex-col justify-evenly items-center">
      <book-button class="bg-danger-500" @click="onBookDelete">
        Delete
      </book-button>
      <p
        v-if="isFinished"
        long
        class="p-2 my-1 rounded-md bg-success-500 text-center"
      >
        Book is finished!
      </p>
      <p
        v-if="!isFinished"
        long
        class="p-2 my-1 rounded-md bg-warning-500 text-center"
      >
        Book is not finished!
      </p>
      <book-button
        v-if="isFinished"
        class="bg-warning-500"
        @click="onBookUnfinish"
      >
        &gt;Not finished?
      </book-button>
      <book-button
        v-if="!isFinished"
        class="bg-success-500"
        @click="onBookFinish"
      >
        &gt;Finished?
      </book-button>
    </div>
  </article>
</template>

<script>
import { ref } from 'vue'
import { token } from '@/composables/useAuthentication.js'
import {
  toggleBookFinishedState,
  deleteBook,
} from '@/serviceClients/bookClient.js'
import BookButton from '@C/BookButton.vue'

export default {
  name: 'BookDisplayAsLine',
  components: { BookButton },
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
