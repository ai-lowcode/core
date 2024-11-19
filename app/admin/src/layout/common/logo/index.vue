<script lang="ts" setup>
import { AlImage } from '@ai-lowcode/component-adapter'
import { useRouter } from 'vue-router'

const router = useRouter()

function jumpHome() {
  router.push('/')
}
</script>

<template>
  <div class="flex justify-center items-center p-2 cursor-pointer" @click="jumpHome">
    <AlImage src="/logo.png" class="w-[30px] h-[30px]" />
  </div>
</template>
