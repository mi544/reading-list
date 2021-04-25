<template>
  <router-link v-if="!external" :to="to" class="text-info-900">
    <slot></slot>
  </router-link>
  <a
    v-else
    :href="to"
    target="_blank"
    rel="noopener noreferrer"
    class="text-info-900"
  >
    <slot></slot>
  </a>
</template>

<script>
export default {
  name: 'LinkItem',
  props: {
    to: { type: [String, Object], required: true },
    external: { type: Boolean, default: () => false },
  },
}
</script>
