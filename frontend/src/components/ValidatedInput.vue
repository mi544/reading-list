<template>
  <div class="h-28 w-1/2 flex flex-col">
    <label for="username">{{ name }}</label>
    <input
      :id="name.toLowerCase()"
      v-model="input"
      :type="type"
      :name="name.toLowerCase()"
      :class="['border-2', inputColor]"
      @focus="inputClicked = true"
      @change="$emit('input-change', input)"
    />
    <p
      v-if="inputClicked && !inputValid.status"
      class="my-2 text-danger-400 text-base"
    >
      {{ inputValid.message }}
    </p>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
export default {
  name: 'ValidatedInput',
  props: {
    name: { type: String, required: true },
    type: { type: String, default: () => 'text' },
    lengthMin: { type: Number, default: () => null },
    lengthMax: { type: Number, default: () => null },
  },
  emits: ['input-change'],
  setup(props) {
    const input = ref('')
    const inputClicked = ref(false)

    const inputValid = computed(() => {
      if (props.lengthMin && input.value.length < props.lengthMin) {
        return {
          status: false,
          message: `${props.name} should be at least ${props.lengthMin} characters long`,
        }
      }
      if (props.lengthMax && input.value.length > props.lengthMax) {
        return {
          status: false,
          message: `${props.name} should be less than ${props.lengthMax} characters long`,
        }
      }

      return {
        status: true,
      }
    })

    const inputColor = computed(() => {
      if (!inputClicked.value) return 'border-gray-400'
      if (inputClicked.value && !inputValid.value.status)
        return 'border-warning-300'
      return 'border-success-300'
    })

    return { input, inputClicked, inputColor, inputValid }
  },
}
</script>
