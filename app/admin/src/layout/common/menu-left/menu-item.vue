<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { AlIcon, AlMenuItem } from '@zero-dim/component-adapter'
import { MenuMeta } from '@zero-dim/request'
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
      <AlIcon class="mr-2">
        <Icon :icon="menu?.menuIcon" />
      </AlIcon>
      {{ menu?.menuName }}
    </template>
  </AlMenuItem>
</template>
