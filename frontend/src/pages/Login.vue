<template>
  <div class="flex-grow flex items-center justify-center text-2xl">
    <form
      class="flex flex-col justify-center items-center w-3/4"
      @submit.prevent="logIn"
    >
      <validated-input
        @input-change="usernameInput = $event"
        name="Username"
        :length-min="3"
        :length-max="100"
        :validation="usernameValidation"
      />
      <validated-input
        @input-change="passwordInput = $event"
        name="Password"
        type="password"
        :length-min="5"
        :length-max="100"
        :validation="passwordValidation"
      />

      <button type="submit" class="bg-white">Login</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import ValidatedInput from '@C/ValidatedInput.vue'

export default {
  components: { ValidatedInput },
  name: 'Login',
  setup() {
    const usernameInput = ref('')
    const passwordInput = ref('')

    const logIn = () => {
      console.log('Logging in with ', usernameInput.value, passwordInput.value)
    }

    return {
      usernameInput,
      passwordInput,
      logIn,
    }
  },
}
</script>
