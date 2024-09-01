import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const isCollapse = ref(true)

  function changeCollapse() {
    isCollapse.value = !isCollapse.value
  }

  return {
    isCollapse,
    changeCollapse,
  }
})
