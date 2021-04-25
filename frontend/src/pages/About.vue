<template>
  <main class="flex-grow flex justify-center">
    <card
      class="sm:w-3/4 lg:w-1/2 mx-4 my-8 md:mx-0 md:my-12 p-4 md:p-12 text-xl md:text-2xl"
    >
      <p class="mb-6">
        This is a book store and we are committed to help you pick your next
        book!
      </p>
      <p class="my-2">
        Feel free to look around. We encourage you to
        <link-item :to="{ name: 'Register' }">
          obtain our library card
        </link-item>
        to enjoy all the features like tracking your books and having access to
        your personal list from any device.
      </p>
      <p class="my-2">
        It takes less than a minute to set everything up and you can start
        enjoying all the features right away. We respect your privacy, so no
        email or personal data is required - a nickname is all we need.
      </p>
      <p>
        Sort books in your personal list by title or manually change their order
        by moving each book up or down. Don't forget to save the updated order
        to enjoy seeing your books in that state every time.
      </p>
      <p class="my-6">
        <link-item :to="{ name: 'Contact' }">Let us know</link-item>
        if you need any help.
      </p>
      <p>Thank you and we sincerely hope you like it!</p>
    </card>
  </main>
</template>

<script>
import LinkItem from '@C/LinkItem.vue'
import Card from '@C/Card.vue'

export default {
  name: 'About',
  components: { LinkItem, Card },
}
</script>
