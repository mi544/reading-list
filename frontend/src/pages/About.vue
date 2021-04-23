<template>
  <main class="flex-grow flex justify-center">
    <div class="w-1/2 mt-12 text-2xl">
      <p class="my-2">
        This is a book store and we are committed to help you pick your next
        book!
      </p>
      <p class="my-2">
        Feel free to look around for a book at our store, but keep in mind that
        to begin keeping track of the books you read you'll need to
        <router-link :to="{ name: 'Register' }" class="text-info-900">
          acquire our library card
        </router-link>
      </p>
      <p class="my-2">
        It takes less than a minute to set up and you can start enjoying all the
        features right away. We respect your privacy, so no email or personal
        data is required. Think of a nickname that suits you and that's all
        we'll need.
      </p>
      <p>
        Sort your personal books by title, or put them in any order by moving
        each book up and down. Don't forget to save the updated order to enjoy
        seeing your books in that state every time.
      </p>
      <p class="my-6">
        <router-link :to="{ name: 'Contact' }" class="text-info-900">
          Let us know
        </router-link>
        if you need any help.
      </p>
      <p class="mb-16">Thank you and we sincerely hope you'll like it!</p>
    </div>
  </main>
</template>

<script>
export default {
  name: 'About',
}
</script>
