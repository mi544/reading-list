<template>
  <div
    class="min-h-max h-24 min-w-max w-24 flex justify-center items-center rounded-full font-semibold text-xl bg-info-400"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TextIcon',
}
</script>
