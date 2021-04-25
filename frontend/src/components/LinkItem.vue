<template>
  <router-link :to="to" class="text-info-900">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  name: 'LinkItem',
  props: {
    to: { type: [String, Object], required: true },
  },
}
</script>
