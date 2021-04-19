<template>
  <div class="flex-grow flex flex-col items-center justify-center text-2xl">
    <form
      class="flex flex-col justify-center items-center w-3/4"
      @submit.prevent="register"
    >
      <validated-input
        name="Name"
        :length-min="1"
        :length-max="50"
        @input-change="nameInput = $event"
        @input-valid="nameValid = $event"
      />
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
        <span v-if="!isLoading">Register</span>
        <spinner v-else />
      </book-button>
    </form>
    <div class="py-12 flex">
      <p>
        Have an account?
        <link-item to="/login" class="underline">Login</link-item>
      </p>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { updateUserData } from '@/composables/useAuthentication.js'
import { registerAccount } from '@/serviceClients/authClient.js'
import ValidatedInput from '@C/ValidatedInput.vue'
import LinkItem from '@C/LinkItem.vue'
import BookButton from '@C/BookButton.vue'
import Spinner from '@C/Spinner.vue'

export default {
  name: 'Register',
  components: { ValidatedInput, LinkItem, BookButton, Spinner },
  setup() {
    const router = useRouter()

    const isLoading = ref(false)
    const nameInput = ref('')
    const nameValid = ref(false)
    const usernameInput = ref('')
    const usernameValid = ref(false)
    const passwordInput = ref('')
    const passwordValid = ref(false)

    const inputsValid = computed(() => {
      if (nameValid.value && usernameValid.value && passwordValid.value) {
        return true
      }
      return false
    })

    const register = async () => {
      if (!inputsValid.value) return

      isLoading.value = true
      const query = {
        name: nameInput.value,
        username: usernameInput.value,
        password: passwordInput.value,
      }
      try {
        const res = await registerAccount(query)

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
      nameInput,
      nameValid,
      inputsValid,
      usernameInput,
      usernameValid,
      passwordInput,
      passwordValid,
      register,
    }
  },
}
</script>
