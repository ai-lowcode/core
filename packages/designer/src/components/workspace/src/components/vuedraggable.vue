<script lang="ts" setup>
import type { Schema } from '@ai-lowcode/core'
import { deepCopy } from '@ai-lowcode/utils'
import { ComponentPublicInstance, computed, defineComponent, getCurrentInstance, h, inject, useAttrs } from 'vue'

import { VueDraggable } from 'vue-draggable-plus'

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

function matchTailwindWidth(input) {
  if (input) {
    const regex = /\bw-(?:full|screen|min|max|fit|\[[\w.%]+\]|\d+\/\d+|\d+(?:\.5)?)/
    const match = input.match(regex)
    return match ? match[0] : null
  }
}

const DragBoxRender = defineComponent({
  props: ['schema', 'index'],
  render: (ctx: ComponentPublicInstance<{
    schema: Schema
    index: number
  }>) => {
    return h(ctx?.schema?.type as string, { class: `al-drag-item ${matchTailwindWidth(ctx?.schema?.children?.[0]?.props?.class)}`, key: ctx?.index, ...ctx?.schema?.props, id: ctx?.schema?.id }, slots?.[0]?.children?.[ctx?.index])
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
  <VueDraggable
    v-model="list"
    :group="{
      name: 'drag-box',
      pull: true,
      put: true,
    }"
    class="w-full p-1 h-full"
    :class="{
      'h-full': list?.length,
      'h-full bg-basic-color rounded-md drag-content relative': !list?.length,
      'flex': attrs?.__parentSchema?.props?.class?.includes('flex'),
      'flex-row': attrs?.__parentSchema?.props?.class?.includes('flex-row'),
      'flex-nowrap': attrs?.__parentSchema?.props?.class?.includes('flex-nowrap'),
      'flex-wrap': attrs?.__parentSchema?.props?.class?.includes('flex-wrap'),
    }"
    ghost-class="ghost"
    v-bind="$attrs"
    :clone="cloneElement"
    :move="onMove"
    @end="onEnded"
  >
    <template v-for="(element, index) in list" :key="index">
      <DragBoxRender :schema="element" :index="index" />
    </template>
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
