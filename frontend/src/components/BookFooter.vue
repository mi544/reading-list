<template>
  <footer class="h-12 bg-primary-100 border-black border-t text-xl">
    <nav class="min-h-full">
      <ul class="mt-2 flex justify-between items-stretch">
        <div class="flex-grow w-8/12 flex justify-around items-center">
          <link-list-item :to="{ name: 'Love' }">&lt;3</link-list-item>
        </div>
        <div class="flex-grow w-4/12 flex justify-around items-center">
          <link-list-item :to="{ name: 'About' }">About</link-list-item>
          <link-list-item :to="{ name: 'Contact' }">Contact</link-list-item>
        </div>
      </ul>
    </nav>
  </footer>
</template>

<script>
import LinkListItem from '@C/LinkListItem.vue'

export default {
  name: 'BookFooter',
  components: { LinkListItem },
}
</script>
