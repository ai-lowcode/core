<script lang="ts" setup>
import type { Schema } from '@ai-lowcode/core'
import { deepCopy } from '@ai-lowcode/utils'
import { ComponentPublicInstance, computed, defineComponent, getCurrentInstance, h, inject, useAttrs } from 'vue'
import draggable from 'vuedraggable/src/vuedraggable'

import { DESIGNER_CTX } from '@/global'
import { DesignerContext } from '@/types'

defineOptions({
  name: 'AlVueDragAble',
})

const attrs = useAttrs()
const instance = getCurrentInstance()
const slots = instance?.slots?.default?.()
const list = computed({
  get() {
    return deepCopy((attrs?.__schema as Schema).children)
  },
  set() {},
})
const context = inject<DesignerContext>(DESIGNER_CTX)

const DragBoxRender = defineComponent({
  props: ['schema', 'index'],
  render: (ctx: ComponentPublicInstance<{
    schema: Schema
    index: number
  }>) => {
    return h(ctx?.schema?.type as string, { class: `al-drag-item`, key: ctx?.index, ...ctx?.schema?.props, id: ctx?.schema?.id }, slots?.[0]?.children?.[ctx?.index])
  },
})

function onEnded({ to, from, oldIndex, newIndex }: any) {
  context?.workspaceRef?.value?.changeComponentSort(from?.id, to?.id, oldIndex, newIndex)
}

function cloneElement() {
  return null
}

function onMove(event: any) {
  // 根据自定义逻辑控制是否允许移动
  return event.relatedContext.index !== -1 // 阻止移动到新位置
}
</script>

<template>
  <draggable
    :list="list"
    :group="{
      name: 'drag-box',
      pull: true,
      put: true,
    }"
    class="w-full"
    :class="list?.length ? 'h-full' : 'h-full bg-[#f5f5f5] rounded-md drag-content relative'"
    ghost-class="ghost"
    animation="300"
    empty-insert-threshold="0"
    direction="vertical"
    item-key="type"
    :draggable="false"
    v-bind="$attrs"
    :clone="cloneElement"
    :move="onMove"
    @end="onEnded"
  >
    <template #item="{ element, index }">
      <DragBoxRender :schema="element" :index="index" />
    </template>
  </draggable>
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
