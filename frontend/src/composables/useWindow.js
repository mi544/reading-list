import { ref } from 'vue'

const scrollY = ref(0)

window.addEventListener('scroll', () => {
  scrollY.value = window.scrollY
})

export { scrollY }
