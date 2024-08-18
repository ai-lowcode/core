<script lang="ts" setup>
import { ComponentPublicInstance, defineComponent, getCurrentInstance, h, inject, ref } from 'vue'
import draggable from 'vuedraggable'

import { DESIGNER_CTX } from '@/global'
import { DesignerContext, Schema } from '@/types'

defineOptions({
  name: 'AlVueDragAble',
})

const instance = getCurrentInstance()

const list = ref(instance?.props?.formCreateInject?.children)
const slots = instance?.slots?.default?.()?.filter(item => item.key) as Array<Schema>
const context = inject<DesignerContext>(DESIGNER_CTX)

const DragBoxRender = defineComponent({
  props: ['schema', 'index'],
  render: (ctx: ComponentPublicInstance<{
    schema: Schema
    index: number
  }>) => {
    const key = ctx?.schema?.__fc__?.key
    if (key) {
      let vnode = slots.find(item => item.key === `_${ctx?.schema.slot}`)
      if (vnode) {
        vnode.children?.forEach((v) => {
          if (v.key === `${key}fc`) {
            vnode = v
          }
        })
      }
      else {
        vnode = slots.find(item => item.key === `${key}fc`) || slots[ctx?.index]
      }
      if (vnode) {
        return h('div', { class: `al-drag-item`, key }, vnode)
      }
    }
    return h('div', { class: `al-drag-item`, key: ctx?.index })
  },
})

function onAdd({ item }: any) {
  const index = context?.workspaceRef?.value.schema[0].children.findIndex((i: any) => i === item?.__draggable_context?.element)
  context?.workspaceRef?.value.schema[0].children.splice(index, 1)
}
</script>

<template>
  <draggable
    :list="list"
    group="default"
    class="w-full"
    :class="list?.length === 1 && list[0]?.type === 'div' && list[0]?.props.text === 'drag-content' ? 'h-[300px] bg-gray-100 rounded-md drag-content' : 'h-full'"
    ghost-class="ghost"
    animation="150"
    empty-insert-threshold="0"
    direction="vertical"
    item-key="type"
    @add="onAdd"
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
