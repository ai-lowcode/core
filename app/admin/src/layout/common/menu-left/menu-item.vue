<script lang="ts" setup>
import { AlIcon, AlMenuItem } from '@ai-lowcode/element-plus'
import { MenuType } from '@ai-lowcode/request'
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'

import { useTagsStore } from '@/store/modules/tags'

defineProps<{
  menu: MenuType
}>()

const tagsStore = useTagsStore()

const router = useRouter()

function handlePage(menu: MenuType) {
  router.push(`/redirect${menu?.path}`)
  tagsStore.addTags(menu)
}
</script>

<template>
  <AlMenuItem :index="String(menu?.id)" @click="handlePage(menu)">
    <template #title>
      <AlIcon>
        <Icon :icon="menu?.meta?.icon" />
      </AlIcon>
      {{ menu?.name }}
    </template>
  </AlMenuItem>
</template>
