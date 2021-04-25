<template>
  <button
    :type="type"
    :class="[
      small ? 'p-2' : 'py-2 px-2 xs:py-3 xs:px-4 sm:py-4 sm:px-10',
      red ? 'bg-danger-300' : 'bg-info-400',
      'rounded-md',
      'disabled:opacity-50',
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
    rounded: { type: Boolean, default: () => false },
  },
}
</script>
