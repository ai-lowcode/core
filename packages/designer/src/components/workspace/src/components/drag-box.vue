<script lang="ts" setup>
import { AlIcon } from '@ai-lowcode/element-plus'
import { Icon } from '@iconify/vue'
import { computed, getCurrentInstance, inject, ref } from 'vue'

import { DESIGNER_CTX, PAGE_COMP } from '@/global'
import { DesignerContext } from '@/types'

defineOptions({
  name: 'AlDragBox',
})

const context = inject<DesignerContext>(DESIGNER_CTX)

const instance = getCurrentInstance()

const currentField = computed({
  get() {
    return instance?.slots?.default?.()?.[0]?.children?.[0]?.props?.['component-schema']
  },
  set() {},
})

const show = computed(() => context?.workspaceRef?.value?.selectComponent?.id === currentField.value?.id && currentField.value?.id)

function changeCompId() {
  context?.workspaceRef?.value?.changeComponentSelect?.(currentField.value)
}

function deleteComponent() {
  context?.workspaceRef?.value?.deleteComponent(instance?.attrs?.id)
}

function copyComponent() {
  context?.workspaceRef?.value?.copyComponent(instance?.attrs?.id, instance?.attrs?.__schema)
}

const showOptions = ref(false)
</script>

<template>
  <div class="box-border relative cursor-move flex mb-1" :class="show ? `outline outline-active-color outline-2 ${currentField?.props?.class}` : `outline-dashed outline-active-color duration-300 outline-1 ${currentField?.props?.class}`" v-bind="$attrs" @mouseenter="showOptions = true" @mouseleave="showOptions = false" @click.stop="changeCompId">
    <div v-if="show && context?.workspaceRef?.value?.selectComponent?.id !== PAGE_COMP" :class="showOptions ? 'opacity-100' : 'opacity-40'" class="absolute h-[22px] z-10 duration-300 -left-[2px] -top-[24px] bg-active-color flex flex-row items-center">
      <div v-if="currentField?.type !== 'AlVueDragAble' && currentField?.type !== 'AlDragBox'" class="text-xs px-2 h-[20px] bg-active-color duration-300 text-white z-10 cursor-move p-[3px]">
        {{ currentField?.label }}
      </div>
      <div class="text-white">
        |
      </div>
      <AlIcon class="w-[20px] text-white z-10 cursor-move p-[3px] option-icon">
        <Icon icon="fluent:drag-20-filled" />
      </AlIcon>
      <AlIcon class="w-[20px] text-white z-10 cursor-pointer p-[3px] option-icon" @click="copyComponent">
        <Icon icon="solar:copy-bold" />
      </AlIcon>
      <AlIcon class="w-[20px] text-white z-10 cursor-pointer p-[3px] option-icon" @click="deleteComponent">
        <Icon icon="ic:baseline-delete" />
      </AlIcon>
    </div>
    <slot />
  </div>
</template>
