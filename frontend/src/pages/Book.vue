<template>
  <main v-if="isLoaded" class="flex-grow bg-white border-4">
    <section
      class="py-2 md:py-0 md:fixed md:right-12 md:top-1/3 md:h-72 md:w-48"
    >
      <div
        v-if="!isAdded"
        class="min-h-full flex flex-row md:flex-col justify-center items-center"
      >
        <button @click="onBookAdd">
          <text-icon>Add</text-icon>
        </button>
      </div>
      <div
        v-else
        class="min-h-full flex flex-row md:flex-col justify-evenly items-center"
      >
        <button @click="onBookDelete">
          <text-icon class="bg-danger-500">Delete</text-icon>
        </button>
        <p
          v-if="isFinished"
          long
          class="p-2 mx-2 md:mx-0 rounded-md bg-success-500 text-center"
        >
          Book is finished!
        </p>
        <p
          v-if="!isFinished"
          long
          class="p-2 mx-2 md:mx-0 rounded-md bg-warning-500 text-center"
        >
          Book is not finished!
        </p>
        <button v-if="isFinished" @click="onBookUnfinish">
          <text-icon class="bg-warning-500">&gt;Not finished?</text-icon>
        </button>
        <button v-if="!isFinished" @click="onBookFinish">
          <text-icon class="bg-success-500">&gt;Finished?</text-icon>
        </button>
      </div>
    </section>
    <article class="mb-12">
      <section class="px-4 flex flex-col items-center">
        <h2 class="mt-8 mb-5 text-4xl">{{ bookData.title }}</h2>
        <line-break center class="my-2 mb-10 w-3/4 sm:w-2/4 md:w-1/4" />
      </section>
      <div class="min-h-full w-full px-0 md:px-5 flex flex-col md:flex-row">
        <section class="w-3/4 md:w-3/12 mb-12 md:mb-0 self-center md:self-auto">
          <img
            v-if="bookData.thumbnailUrl"
            :src="bookData.thumbnailUrl"
            :alt="`Book Thumbnail of ${bookData.title}`"
            class="max-h-screen mx-auto"
          />
          <img
            v-else
            src="@/assets/images/image-not-available.jpg"
            :alt="`Book Thumbnail of ${bookData.title}`"
            class="max-h-screen mx-auto"
          />
        </section>
        <section class="px-4 md:w-9/12 lg:w-7/12">
          <section>
            <p class="text-2xl">{{ bookData.title }}</p>
            <line-break class="my-2 w-1/4" />
            <p v-if="!bookData.authors" class="text-2xl"
              >No authors specified</p
            >
            <p v-for="author in bookData.authors" :key="author" class="text-xl">
              {{ author }}
            </p>
            <line-break class="my-2 w-2/4" />
            <p v-if="!bookData.categories">No categories specified</p>
            <p
              v-for="category in bookData.categories"
              :key="category"
              class="mb-1"
            >
              {{ category }}
            </p>
            <line-break class="my-2 w-3/4" />
          </section>
          <section v-if="bookData.description">
            <p class="text-lg">
              {{ bookData.description }}
            </p>
          </section>
        </section>
      </div>
    </article>
  </main>
  <div v-else class="flex-grow">Loading...</div>
</template>

<script>
import { ref, onMounted, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import {
  isAuthenticated,
  resetAuth,
  token,
} from '@/composables/useAuthentication.js'
import { getBestQualityThumbnail } from '@/utils/bookUtils.js'
import {
  storeBook,
  getBookByGid,
  toggleBookFinishedState,
  deleteBook,
} from '@/serviceClients/bookClient.js'
import { getById } from '@/serviceClients/gbookClient.js'
import LineBreak from '@C/LineBreak.vue'
import TextIcon from '@C/TextIcon.vue'

export default {
  name: 'Book',
  components: { LineBreak, TextIcon },
  props: {
    gid: { type: String, required: true },
  },
  setup(props) {
    const router = useRouter()

    const bookData = ref(null)
    const isLoaded = ref(false)
    const isAdded = ref(false)
    const isFinished = ref(false)

    onMounted(() => {
      watchEffect(async () => {
        try {
          const gidRes = await getBookByGid(props.gid, token.value)

          if (!gidRes) throw Error()

          const gidResData = gidRes.data

          if (gidResData.gid) {
            isAdded.value = true
            if (gidResData.finished) {
              isFinished.value = true
            }
          }
        } catch (err) {
          if (err.isAxiosError) {
            if (err.response.status === 404) {
              isAdded.value = false
            }
          } else {
            console.error(err)
          }
        }

        try {
          const res = await getById(props.gid)

          if (!res) throw Error()

          const resData = res.data
          if (!resData.id) {
            return
          }

          const descriptionRegex = /<\/?(p|i|b|ul|li)>/gi

          bookData.value = {
            thumbnailUrl: getBestQualityThumbnail(resData.volumeInfo),
            title: resData.volumeInfo.title,
            authors: resData.volumeInfo.authors,
            categories: resData.volumeInfo.categories,
            description: resData.volumeInfo.description
              ? resData.volumeInfo.description.replace(descriptionRegex, '')
              : null,
          }

          isLoaded.value = true
        } catch (err) {
          console.error(err)
        }
      })
    })

    const onBookAdd = async () => {
      if (!isAuthenticated) {
        router.push({ name: 'Login', query: { r: `/book/${props.gid}` } })
        return
      }

      try {
        await storeBook(props.gid, token.value)
        isAdded.value = true
      } catch (err) {
        if (err.isAxiosError) {
          if (err.response.status === 303) {
            isAdded.value = true
            return
          }
          if (err.response.status === 401) {
            resetAuth()
            router.push({ name: 'Login', query: { r: `/book/${props.gid}` } })
            return
          }
          console.error(err)
          return
        }
        console.error(err)
      }
    }

    const onBookDelete = async () => {
      try {
        await deleteBook(props.gid, token.value)
        isFinished.value = false
        isAdded.value = false
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

    return {
      bookData,
      isLoaded,
      onBookAdd,
      isAdded,
      isFinished,
      onBookDelete,
      onBookFinish,
      onBookUnfinish,
    }
  },
}
</script>
