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

const currentField = instance?.slots?.default?.()?.[0]?.children?.[0]?.props?.['component-schema']

const show = computed(() => context?.selectComponent?.value?.id === currentField?.id && currentField?.id)

function changeCompId() {
  context?.changeComponentSelect?.(currentField)
}

function deleteComponent() {
  context?.workspaceRef?.value?.deleteComponent(instance)
}

function copyComponent() {
  context?.workspaceRef?.value?.copyComponent(instance)
}

const showOptions = ref(false)
</script>

<template>
  <div class="box-border relative cursor-move flex mb-1" :class="show ? `outline outline-active-color outline-2` : `outline-dashed outline-active-color outline-1`" v-bind="$attrs" @mouseenter="showOptions = true" @mouseleave="showOptions = false" @click.stop="changeCompId">
    <div v-if="currentField?.type !== 'AlVueDragAble' && currentField?.type !== 'AlDragBox'" :class="showOptions ? 'opacity-100' : 'opacity-0'" class="absolute top-0 text-xs bg-active-color duration-300 text-white rounded-br-md left-0 z-10 cursor-move p-[3px]">
      {{ currentField?.label }}
    </div>
    <template v-if="show && context?.selectComponent?.value?.id !== PAGE_COMP">
      <AlIcon :class="showOptions ? 'opacity-100' : 'opacity-40'" class="absolute w-[20px] h-[20px] bottom-0 bg-active-color duration-300 text-white rounded-tr-md left-0 z-10 cursor-move p-[3px] option-icon">
        <Icon icon="fluent:drag-20-filled" />
      </AlIcon>
      <AlIcon :class="showOptions ? 'opacity-100' : 'opacity-40'" class="absolute w-[20px] h-[20px] bottom-0 bg-active-color duration-300 text-white rounded-tl-md right-[20px] z-10 cursor-pointer p-[3px] option-icon" @click="copyComponent">
        <Icon icon="solar:copy-bold" />
      </AlIcon>
      <AlIcon :class="showOptions ? 'opacity-100' : 'opacity-40'" class="absolute w-[20px] h-[20px] bottom-0 bg-red-600 duration-300 text-white right-0 z-10 cursor-pointer p-[3px] option-icon" @click="deleteComponent">
        <Icon icon="ic:baseline-delete" />
      </AlIcon>
    </template>
    <slot />
  </div>
</template>
