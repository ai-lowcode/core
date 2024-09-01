<script lang="ts" setup>
import { AlIcon } from '@ai-lowcode/element-plus'
import { MenuType } from '@ai-lowcode/request'
import { Icon } from '@iconify/vue'
import { toRefs } from 'vue'

import { useRoute, useRouter } from 'vue-router'

import { useTagsStore } from '@/store/modules/tags'

const tagsStore = useTagsStore()

const route = useRoute()

const router = useRouter()

const { tagsList, closeTags } = toRefs(tagsStore)

function handlePage(menu: MenuType) {
  router.push(menu?.path)
}

function openMenu(tag, $event) {
  console.log(tag, $event)
}
</script>

<template>
  <div class="bg-white border-b border-solid border-basic-color flex">
    <div
      v-for="(tag, index) in tagsList" :key="index" :class="{
        'text-blue-600 border-b-blue-600': route.path === tag.path,
      }"
      class="text-sm pl-4 pr-2 py-[5px] select-none hover:text-blue-600 flex items-center cursor-pointer border-r border-solid border-r-basic-color border-b-2 border-b-transparent duration-300 hover:border-b-blue-600"
      @click="handlePage(tag)"
      @contextmenu.prevent="openMenu(tag, $event)"
    >
      <div class="mr-2">
        {{ tag.name }}
      </div>
      <AlIcon class="rounded-full" @click.stop="closeTags(tag)">
        <Icon icon="material-symbols:close" />
      </AlIcon>
    </div>
  </div>
</template>
