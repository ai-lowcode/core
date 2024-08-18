<script lang="ts" setup>
import { AlIcon } from '@ai-lowcode/element-plus'
import { Icon } from '@iconify/vue'
import { computed, getCurrentInstance, inject } from 'vue'

import { DESIGNER_CTX, PAGE_COMP } from '@/global'
import { DesignerContext } from '@/types'

defineOptions({
  name: 'AlDragBox',
})

const context = inject<DesignerContext>(DESIGNER_CTX)

const instance = getCurrentInstance()

const currentField = (instance?.props?.formCreateInject as any)?.children?.[0] || instance?.attrs

const show = computed(() => context?.selectComponent?.value?.field === currentField?.field && currentField?.field)

function changeCompId() {
  context?.changeComponentSelect?.(currentField)
}

function deleteComponent() {
  context?.workspaceRef?.value?.deleteComponent(currentField)
}

function copyComponent() {
  context?.workspaceRef?.value?.copyComponent(currentField?.field)
}
</script>

<template>
  <div class="h-full w-full box-border relative pb-[24px] cursor-move p-2" :class="show ? 'outline outline-blue-600 outline-2' : 'outline-dashed outline-blue-400 outline-1'" @click.stop="changeCompId">
    <div v-show="show && context?.selectComponent?.value?.field !== PAGE_COMP">
      <AlIcon class="absolute bottom-[2px] bg-blue-600 text-white rounded-sm left-[2px] cursor-move p-[2px]">
        <Icon icon="fluent:drag-20-filled" />
      </AlIcon>
      <AlIcon class="absolute bottom-[2px] bg-blue-600 text-white rounded-sm right-[24px] cursor-pointer p-[2px]" @click="copyComponent">
        <Icon icon="solar:copy-bold" />
      </AlIcon>
      <AlIcon class="absolute bottom-[2px] bg-red-600 text-white rounded-sm right-[2px] cursor-pointer p-[2px]" @click="deleteComponent">
        <Icon icon="ic:baseline-delete" />
      </AlIcon>
    </div>
    <slot />
  </div>
</template>
