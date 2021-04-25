<template>
  <main v-if="isLoaded" class="flex-grow flex">
    <article
      class="py-8 min-h-full w-full flex justify-between items-center bg-white border-2"
    >
      <section class="w-3/12">
        <img
          v-if="bookData.thumbnailUrl"
          :src="bookData.thumbnailUrl"
          :alt="`Book Thumbnail of ${bookData.title}`"
        />
        <img
          v-else
          src="@/assets/images/image-not-available.jpg"
          :alt="`Book Thumbnail of ${bookData.title}`"
        />
      </section>
      <section class="w-6/12">
        <section>
          <p>{{ bookData.title }}</p>
        </section>
        <section>
          <p v-if="!bookData.authors">No authors specified</p>
          <p v-for="author in bookData.authors" :key="author">{{ author }}</p>
        </section>
        <section>
          <p v-if="!bookData.categories">No categories specified</p>
          <p v-for="category in bookData.categories" :key="category">
            {{ category }}
          </p>
        </section>
        <section v-if="bookData.description">
          <p>
            {{ bookData.description }}
          </p>
        </section>
      </section>
      <section v-if="!isAdded" class="w-3/12 flex flex-col">
        <button @click="onBookAdd">add button</button>
      </section>
      <section v-else class="w-3/12 flex flex-col">
        <button @click="onBookDelete">delete button</button>
        <button v-if="!isFinished" @click="onBookFinish">
          complete button
        </button>
        <button v-else @click="onBookUnfinish">uncomplete button</button>
      </section>
    </article>
  </main>
  <div v-else class="flex-grow">Spinner</div>
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
export default {
  name: 'Book',
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

          bookData.value = {
            thumbnailUrl: getBestQualityThumbnail(resData.volumeInfo),
            title: resData.volumeInfo.title,
            authors: resData.volumeInfo.authors,
            categories: resData.volumeInfo.categories,
            description: resData.volumeInfo.description
              ? resData.volumeInfo.description.replace(/<\/?[pib]>/gi, '')
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
