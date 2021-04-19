<template>
  <div class="flex-grow flex flex-col items-center justify-center text-2xl">
    <form
      class="flex flex-col justify-center items-center w-3/4"
      @submit.prevent="logIn"
    >
      <validated-input
        name="Username"
        :length-min="3"
        :length-max="100"
        @input-change="usernameInput = $event"
        @input-valid="usernameValid = $event"
      />
      <validated-input
        name="Password"
        type="password"
        :length-min="5"
        :length-max="100"
        @input-change="passwordInput = $event"
        @input-valid="passwordValid = $event"
      />

      <book-button type="submit" :disabled="isLoading || !inputsValid">
        <span v-if="!isLoading">Login</span>
        <spinner v-else />
      </book-button>
    </form>
    <div class="py-12 flex">
      <p>
        No account yet?
        <link-item to="/register" class="underline">Register</link-item>
      </p>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { loginAccount } from '@/serviceClients/authClient.js'
import { updateUserData } from '@/composables/useAuthentication.js'
import ValidatedInput from '@C/ValidatedInput.vue'
import LinkItem from '@C/LinkItem.vue'
import BookButton from '@C/BookButton.vue'
import Spinner from '@C/Spinner.vue'

export default {
  name: 'Login',
  components: { ValidatedInput, LinkItem, BookButton, Spinner },
  setup() {
    const router = useRouter()

    const isLoading = ref(false)
    const usernameInput = ref('')
    const usernameValid = ref(false)
    const passwordInput = ref('')
    const passwordValid = ref(false)

    const inputsValid = computed(() => {
      if (usernameValid.value && passwordValid.value) {
        return true
      }
      return false
    })

    const logIn = async () => {
      if (!inputsValid.value) return

      isLoading.value = true
      const query = {
        username: usernameInput.value,
        password: passwordInput.value,
      }
      try {
        const res = await loginAccount(query)

        const userData = {
          name: res.data.user.name,
          username: res.data.user.username,
          token: res.data.access_token,
        }

        updateUserData(userData)

        router.push('/dashboard')
      } catch (err) {
        console.error(err)
      } finally {
        isLoading.value = false
      }
    }

    return {
      isLoading,
      inputsValid,
      usernameInput,
      usernameValid,
      passwordInput,
      passwordValid,
      logIn,
    }
  },
}
</script>
