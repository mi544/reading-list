<template>
  <main
    class="flex-grow m-4 flex flex-col md:flex-row justify-evenly items-center"
  >
    <card class="sm:w-3/4 md:w-1/2 p-4 md:p-12">
      <div class="rounded-2xl overflow-hidden">
        <img
          src="@/assets/images/library.jpg"
          alt="Old Library Photo"
          class="h-full"
        />
      </div>
      <p class="text-center mt-1">
        <link-item
          to="https://commons.wikimedia.org/wiki/File:DSC_0187-2.jpg"
          external
          >Leh-a</link-item
        >,
        <link-item to="https://creativecommons.org/licenses/by-sa/4.0" external
          >CC BY-SA 4.0</link-item
        >, via Wikimedia Commons; various sepia effects applied on the original
      </p>
    </card>
    <section class="sm:w-3/4 md:w-1/2 flex text-xl">
      <div class="w-5/6 mx-auto">
        <h2 class="mt-4 sm:mt-6 md:mt-12 text-3xl md:text-4xl">
          Welcome to the book store!
        </h2>
        <h3 class="mt-6 mb-8 text-2xl md:text-3xl">
          We're glad to have you here
        </h3>
        <p class="my-4">Find any book you want</p>
        <p class="my-4">
          Search by category, book author, title, or ISBN, to find the book
          you'll want to read!
        </p>
        <p class="my-4">
          No email needed to
          <link-item :to="{ name: 'Register' }">
            obtain a library card
          </link-item>
        </p>
      </div>
    </section>
  </main>
</template>

<script>
import LinkItem from '@C/LinkItem.vue'
import Card from '@C/Card.vue'

export default {
  name: 'Index',
  components: { LinkItem, Card },
}
</script>
