<script lang="ts" setup>
import { AlIcon } from '@ai-lowcode/element-plus'
import { Icon } from '@iconify/vue'
import { computed, getCurrentInstance, inject, onMounted, ref, watch } from 'vue'

import { DESIGNER_CTX, PAGE_COMP } from '@/global'
import { DesignerContext } from '@/types'

defineOptions({
  name: 'AlDragBox',
})

const context = inject<DesignerContext>(DESIGNER_CTX)

const instance = getCurrentInstance()

const showOptions = ref(false)

const slotRef = ref()

const currentField = instance?.slots?.default?.()?.[0]?.children?.[0]?.props?.['component-schema']

const show = computed(() => (context?.selectComponent?.value?.id === currentField?.id) && currentField?.id !== undefined)

function changeCompId() {
  context?.changeComponentSelect?.(currentField)
}

function deleteComponent() {
  context?.workspaceRef?.value?.deleteComponent(instance)
}

function copyComponent() {
  context?.workspaceRef?.value?.copyComponent(instance)
}

watch(() => show, (newValue) => {
  // console.log(slotRef.value?.children?.[2].classList)
  if (newValue.value) {
    slotRef.value?.children?.[2].classList.remove('outline-dashed')
    slotRef.value?.children?.[2].classList.add('outline')
    slotRef.value?.children?.[2].classList.add('outline-2')
  }
  else {
    slotRef.value?.children?.[2].classList.remove('outline')
    slotRef.value?.children?.[2].classList.add('outline-dashed')
    slotRef.value?.children?.[2].classList.remove('outline-2')
    slotRef.value?.children?.[2].classList.add('outline-1')
  }
}, { deep: true })

onMounted(() => {
  if (show.value) {
    slotRef.value?.children?.[2].classList.add('outline')
    slotRef.value?.children?.[2].classList.add('outline-active-color')
    slotRef.value?.children?.[2].classList.add('outline-2')
  }
  else {
    slotRef.value?.children?.[2].classList.add('outline-dashed')
    slotRef.value?.children?.[2].classList.add('outline-active-color')
    slotRef.value?.children?.[2].classList.add('outline-1')
  }
})
</script>

<template>
  <div ref="slotRef" class="box-border cursor-move contents mb-1" v-bind="$attrs" @mouseenter="showOptions = true" @mouseleave="showOptions = false" @click.stop="changeCompId">
    <div
      v-if="currentField?.type !== 'AlVueDragAble' && currentField?.type !== 'AlDragBox'" :style="{
        top: slotRef?.children?.[2]?.offsetTop,
        left: slotRef?.children?.[2]?.offsetLeft,
      }" :class="showOptions ? 'opacity-100' : 'opacity-0'" class="fixed text-xs bg-active-color duration-300 text-white rounded-br-md z-10 cursor-move p-[3px]"
    >
      {{ currentField?.label }}
    </div>
    <div v-show="show && context?.selectComponent?.value?.id !== PAGE_COMP">
      <AlIcon
        :class="showOptions ? 'opacity-100' : 'opacity-40'" :style="{
          top: `${slotRef?.children?.[2]?.offsetTop + slotRef?.children?.[2]?.clientHeight - 20}px`,
          left: `${slotRef?.children?.[2]?.offsetLeft}px`,
        }" class="fixed w-[20px] h-[20px] bg-active-color text-white rounded-tr-md z-10 cursor-move p-[3px] option-icon"
      >
        <Icon icon="fluent:drag-20-filled" />
      </AlIcon>
      <AlIcon
        :class="showOptions ? 'opacity-100' : 'opacity-40'" :style="{
          top: `${slotRef?.children?.[2]?.offsetTop + slotRef?.children?.[2]?.clientHeight - 20}px`,
          left: `${slotRef?.children?.[2]?.clientWidth + slotRef?.children?.[2]?.offsetLeft - 40}px`,
        }" class="fixed w-[20px] h-[20px] bg-active-color text-white rounded-tl-md z-10 cursor-pointer p-[3px] option-icon" @click="copyComponent"
      >
        <Icon icon="solar:copy-bold" />
      </AlIcon>
      <AlIcon
        :class="showOptions ? 'opacity-100' : 'opacity-40'" :style="{
          top: `${slotRef?.children?.[2]?.offsetTop + slotRef?.children?.[2]?.clientHeight - 20}px`,
          left: `${slotRef?.children?.[2]?.clientWidth + slotRef?.children?.[2]?.offsetLeft - 20}px`,
        }" class="fixed w-[20px] h-[20px] bg-red-600 text-white z-10 cursor-pointer p-[3px] option-icon" @click="deleteComponent"
      >
        <Icon icon="ic:baseline-delete" />
      </AlIcon>
    </div>
    <slot />
  </div>
</template>
