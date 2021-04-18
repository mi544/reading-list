<template>
  <router-link :to="to">
    <li>
      <slot></slot>
    </li>
  </router-link>
</template>

<script>
export default {
  name: 'LinkListItem',
  props: {
    to: { type: String, required: true },
  },
}
</script>
