<template>
  <button
    :type="type"
    :class="[
      small ? 'p-2' : 'py-4 px-10',
      red ? 'bg-danger-300' : 'bg-info-400',
      'rounded-xl disabled:opacity-50',
    ]"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BookButton',
  props: {
    type: { type: String, default: () => 'button' },
    small: { type: Boolean, default: () => false },
    red: { type: Boolean, default: () => false },
  },
}
</script>
