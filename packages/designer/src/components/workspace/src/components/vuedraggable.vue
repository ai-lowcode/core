<script lang="ts" setup>
import type { Schema } from '@ai-lowcode/core'
import { deepCopy } from '@ai-lowcode/utils'
import {
  inject,
  ref,
  useAttrs,
  watch,
} from 'vue'

import { VueDraggable } from 'vue-draggable-plus'

import { DESIGNER_CTX } from '@/global'
import { DesignerContext } from '@/types'

defineOptions({
  name: 'AlVueDragAble',
})

const props = defineProps<{
  schema: Schema
}>()

const attrs = useAttrs()
const list = ref(deepCopy((props?.schema as Schema)?.children))
const context = inject<DesignerContext>(DESIGNER_CTX)

watch(() => props?.schema, (newValue) => {
  list.value = deepCopy((newValue as Schema).children)
}, {
  deep: true,
})

/**
 * 拖拽结束
 * @param to
 * @param from
 * @param oldIndex
 * @param newIndex
 */
function onEnded({ to, from, oldIndex, newIndex }: any) {
  context?.workspaceRef?.value?.changeComponentSort(from?.id, to?.id, oldIndex, newIndex)
}

/**
 * 克隆元素
 */
function cloneElement() {
  return null
}

/**
 * 拖拽移动
 * @param event
 */
function onMove(event: any) {
  // 根据自定义逻辑控制是否允许移动
  return event.relatedContext.index !== -1 // 阻止移动到新位置
}
</script>

<template>
  <VueDraggable
    v-model="list"
    :group="{
      name: 'drag-box',
      pull: true,
      put: true,
    }"
    class="w-full"
    :class="{
      'h-full': list?.length,
      'h-full bg-basic-color rounded-md drag-content relative': !list?.length,
      'flex': attrs?.__parentSchema?.props?.class?.includes('flex'),
      'flex-row': attrs?.__parentSchema?.props?.class?.includes('flex-row'),
      'flex-col': attrs?.__parentSchema?.props?.class?.includes('flex-col'),
      'flex-nowrap': attrs?.__parentSchema?.props?.class?.includes('flex-nowrap'),
      'flex-wrap': attrs?.__parentSchema?.props?.class?.includes('flex-wrap'),
    }"
    ghost-class="ghost"
    v-bind="$attrs"
    :clone="cloneElement"
    :move="onMove"
    @end="onEnded"
  >
    <slot />
  </VueDraggable>
</template>

<style lang="scss" scoped>
.drag-content::after {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #aaa;
  content: '拖拽左侧列表中的组件到此处';
}
</style>
