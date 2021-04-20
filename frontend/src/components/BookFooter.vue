<template>
  <footer
    class="h-12 bg-primary-100 flex justify-between items-center border-black border-t"
  >
    <div class="w-8/12">
      <h4 class="m-auto w-max">&lt;3</h4>
    </div>
    <nav class="w-4/12 text-xl">
      <ul class="flex justify-evenly items-center">
        <link-list-item to="/about">About</link-list-item>
        <link-list-item to="/contact">Contact</link-list-item>
      </ul></nav
    >
  </footer>
</template>

<script>
import LinkListItem from '@C/LinkListItem.vue'

export default {
  name: 'BookFooter',
  components: { LinkListItem },
}
</script>
