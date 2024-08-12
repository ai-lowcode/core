<script lang="ts" setup>
import { AlIcon, AlMenuItem } from '@ai-lowcode/element-plus'
import { MenuType } from '@ai-lowcode/request'
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'

defineProps<{
  menu: MenuType
}>()

const router = useRouter()

function handlePage(path: string) {
  router.push(path)
}
</script>

<template>
  <AlMenuItem :index="String(menu?.id)" @click="handlePage(menu?.path)">
    <template #title>
      <AlIcon>
        <Icon :icon="menu?.meta?.icon" />
      </AlIcon>
      {{ menu?.name }}
    </template>
  </AlMenuItem>
</template>
