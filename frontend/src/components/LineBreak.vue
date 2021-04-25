<template>
  <div :class="[center ? 'mx-auto' : '', 'h-2 border-t-2 border-black']"></div>
</template>

<script>
export default {
  name: 'LineBreak',
  props: { center: { type: Boolean, default: () => false } },
}
</script>
