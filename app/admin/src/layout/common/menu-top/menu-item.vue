<script lang="ts" setup>
import { AlIcon, AlMenuItem } from '@ai-lowcode/element-plus'
import { MenuMeta } from '@ai-lowcode/request'
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'

import { useTagsStore } from '@/store/modules/tags'

defineProps<{
  menu: MenuMeta
}>()

const tagsStore = useTagsStore()

const router = useRouter()

function handlePage(menu: MenuMeta) {
  router.push(`/redirect${menu?.routePath}`)
  tagsStore.addTags(menu)
}
</script>

<template>
  <AlMenuItem :index="String(menu?.id)" @click="handlePage(menu)">
    <template #title>
      <AlIcon>
        <Icon :icon="menu?.menuIcon" />
      </AlIcon>
      {{ menu?.menuName }}
    </template>
  </AlMenuItem>
</template>
