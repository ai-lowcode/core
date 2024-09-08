<script lang="ts" setup>
import { AlIcon } from '@ai-lowcode/element-plus'
import { MenuType } from '@ai-lowcode/request'
import { Icon } from '@iconify/vue'
import { onClickOutside } from '@vueuse/core'
import { nextTick, ref, toRefs } from 'vue'

import { useRoute, useRouter } from 'vue-router'

import { useTagsStore } from '@/store/modules/tags'

const visibleMenu = ref()

const contextmenuRef = ref()

const contextMenu = ref({
  x: 0,
  y: 0,
})

enum OperationEnum {
  REFRESH = 'REFRESH',
  CLOSE_CURRENT = 'CLOSE_CURRENT',
  CLOSE_LEFT = 'CLOSE_LEFT',
  CLOSE_RIGHT = 'CLOSE_RIGHT',
  CLOSE_OTHER = 'CLOSE_OTHER',
  CLOSE_ALL = 'CLOSE_ALL',
}

const menuOperation = ref([
  {
    icon: 'tabler:refresh',
    type: OperationEnum.REFRESH,
    title: '重新加载',
  },
  {
    icon: 'material-symbols:close',
    type: OperationEnum.CLOSE_CURRENT,
    title: '关闭当前',
  },
  {
    icon: 'line-md:arrow-close-left',
    type: OperationEnum.CLOSE_LEFT,
    title: '关闭左侧',
  },
  {
    icon: 'line-md:arrow-close-right',
    type: OperationEnum.CLOSE_RIGHT,
    title: '关闭右侧',
  },
  {
    icon: 'ri:text-spacing',
    type: OperationEnum.CLOSE_OTHER,
    title: '关闭其他',
  },
  {
    icon: 'ri:subtract-line',
    type: OperationEnum.CLOSE_ALL,
    title: '关闭全部',
  },
])

onClickOutside(contextmenuRef, closeMenu, {
  detectIframe: true,
})

const currentSelectTag = ref<MenuType>()

const tagsStore = useTagsStore()

const route = useRoute()

const router = useRouter()

const { tagsList, closeTags, closeAllTags, closeOtherTags, closeLeftTags, closeRightTags } = toRefs(tagsStore)

function handlePage(menu: MenuType) {
  router.push(menu?.path)
}

function closeMenu() {
  visibleMenu.value = false
}

function openMenu(tag, { clientX, clientY }) {
  closeMenu()
  currentSelectTag.value = tag
  contextMenu.value.x = clientX
  contextMenu.value.y = clientY
  nextTick(() => {
    visibleMenu.value = true
  })
}

function selectMenu(operation) {
  closeMenu()
  switch (operation?.type) {
    case OperationEnum.REFRESH:
    case OperationEnum.CLOSE_CURRENT:
      closeTags.value(currentSelectTag.value)
      break
    case OperationEnum.CLOSE_LEFT:
      closeLeftTags.value(currentSelectTag.value)
      break
    case OperationEnum.CLOSE_RIGHT:
      closeRightTags.value(currentSelectTag.value)
      break
    case OperationEnum.CLOSE_OTHER:
      closeOtherTags.value(currentSelectTag.value)
      break
    case OperationEnum.CLOSE_ALL:
      closeAllTags.value(currentSelectTag.value)
      break
  }
}
</script>

<template>
  <div class="bg-white border-b border-solid border-basic-color flex">
    <div
      v-for="(tag, index) in tagsList" :key="index" :class="route.path === tag.path ? 'text-blue-600 border-b-blue-600' : 'border-b-transparent'"
      class="text-sm pl-4 pr-2 py-[5px] select-none hover:text-blue-600 flex items-center cursor-pointer border-r border-solid border-r-basic-color border-b-2 duration-300 hover:border-b-blue-600"
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
    <transition name="el-zoom-in-top">
      <div
        v-show="visibleMenu"
        ref="contextmenuRef" class="bg-white fixed z-10 p-1.5 rounded-md shadow-md" :style="{
          top: `${contextMenu?.y}px`,
          left: `${contextMenu?.x}px`,
        }"
      >
        <div v-for="(operation, index) in menuOperation" :key="index" class="flex items-center py-1.5 px-2 cursor-pointer text-black-color select-none hover:bg-gray-100 rounded-md duration-300" @click="selectMenu(operation)">
          <AlIcon class="mr-1">
            <Icon :icon="operation?.icon" />
          </AlIcon>
          <div class="text-sm">
            {{ operation?.title }}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
