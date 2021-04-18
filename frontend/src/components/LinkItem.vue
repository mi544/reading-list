<template>
  <router-link :to="link">
    <li>
      <slot></slot>
    </li>
  </router-link>
</template>

<script>
export default {
  name: 'LinkItem',
  props: {
    link: { type: String, required: true },
  },
}
</script>
