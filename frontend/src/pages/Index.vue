<template>
  <main class="flex-grow m-4 flex justify-evenly items-center">
    <section class="w-1/2 p-12 bg-white border-2">
      <div class="rounded-2xl overflow-hidden">
        <img
          src="@/assets/images/library.jpg"
          alt="Old Library Photo"
          class="h-full"
        />
      </div>
      <p class="text-center mt-1">
        <a
          href="https://commons.wikimedia.org/wiki/File:DSC_0187-2.jpg"
          class="text-info-900"
          >Leh-a</a
        >
        ,
        <a
          href="https://creativecommons.org/licenses/by-sa/4.0"
          class="text-info-900"
          >CC BY-SA 4.0</a
        >, via Wikimedia Commons
      </p>
    </section>
    <section class="w-1/2 flex">
      <div class="w-5/6 mx-auto flex-col items-center text-xl">
        <h2 class="mt-12 text-4xl">Welcome to the book store!</h2>
        <h3 class="mt-6 mb-8 text-3xl">We're glad to have you here</h3>
        <p class="my-4">Find any book you want</p>
        <p class="my-4">
          Search by categor, book author, title, and even ISBN, to find the book
          you'll want to read!
        </p>
        <p class="my-4">No email needed to sign up</p>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'Index',
}
</script>
