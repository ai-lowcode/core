import { Schema } from '@ai-lowcode/core'
import componentSchemaList from '@ai-lowcode/schemas-component-adapter'
import { deepCopy } from '@ai-lowcode/utils'
import { computed, inject, nextTick, ref, watch } from 'vue'

import { DESIGNER_CTX } from '@/global'
import { DesignerContext } from '@/types'
import { findAndModifyById, getSchemaInstanceName } from '@/utils'

export function useAttrs() {
// 全局上下文
  const context = inject<DesignerContext>(DESIGNER_CTX)

  // 字段ref
  const fieldRef = ref()

  // 插槽ref
  const slotsRef = ref()

  // 组件属性ref
  const compAttrsRef = ref()

  // 字段数据
  const fieldData = ref()

  // 组件属性数据
  const propsData = ref()

  // 插槽数据
  const slotsData = ref()

  // 当前选择组件schema
  const compSchema = computed(() => componentSchemaList.find(item => item.name === context?.workspaceRef?.value?.selectComponent?.name))

  // 当前选择组件格式化schema
  const propsSchema = computed({
    get() {
      const schema = compSchema.value?.props(changePropsData)
      schema?.[0].children.forEach((props: any) => {
        switch (props.children[0]?.type) {
          case 'al-switch':
            if (!props.children[0].events) {
              props.children[0].events = {}
            }
            props.children[0].events.onChange = changePropsData
            break
          case 'al-select':
            if (!props.children[0].events) {
              props.children[0].events = {}
            }
            props.children[0].events.onChange = changePropsData
            break
          case 'al-input-number':
            if (!props.children[0].events) {
              props.children[0].events = {}
            }
            props.children[0].events.onChange = changePropsData
            break
          case 'al-input':
            if (!props.children[0].events) {
              props.children[0].events = {}
            }
            props.children[0].events.onBlur = changePropsData
            break
        }
      })
      return schema
    },
    set() {},
  })

  /**
   * 修改字段数据
   */
  function changeFieldData() {
    // 调用函数，查找并修改
    const newNodes = findAndModifyById(deepCopy(context?.workspaceRef?.value.schema), context?.workspaceRef?.value?.selectComponent?.id, (node: Schema) => {
      if (fieldData.value?.field?.id)
        node.id = fieldData.value.field.id
      if (fieldData.value?.field?.name)
        node.name = fieldData.value.field.name
      if (fieldData.value?.field?.label)
        node.label = fieldData.value.field.label
      if (fieldData.value?.field?.field)
        node.field = fieldData.value.field.field
    })
    context?.workspaceRef?.value.changeSchema(newNodes)
    nextTick(() => {
      context?.workspaceRef?.value.rendererRef.instanceBus?.[getSchemaInstanceName(context?.workspaceRef?.value?.selectComponent)]?.updateRender()
    })
  }

  /**
   * 修改属性数据
   */
  function changePropsData() {
    // 调用函数，查找并修改
    const newNodes = findAndModifyById(deepCopy(context?.workspaceRef?.value.schema), context?.workspaceRef?.value?.selectComponent?.id, (node: Schema) => {
      node.props = {
        ...node.props,
        ...propsData.value.props,
      }
      if (propsData.value?.props?.elText)
        (node.children as Array<Schema>)[0] = propsData.value?.props?.elText
    })
    context?.workspaceRef?.value.changeSchema(newNodes)
    nextTick(() => {
      context?.workspaceRef?.value.rendererRef.instanceBus?.[getSchemaInstanceName(context?.workspaceRef?.value?.selectComponent)]?.updateRender()
    })
  }

  // 监听插槽变化
  watch(() => slotsData.value, (newValue) => {
    // 调用函数，查找并修改
    const newNodes = findAndModifyById(deepCopy(context?.workspaceRef?.value.schema), context?.workspaceRef?.value?.selectComponent?.id, (node: Schema) => {
      node.children = (node.children as Schema[])?.map((item) => {
        return {
          ...item,
          slotName: item.slotName ?? 'default',
          slotHidden: newValue.slots[item.slotName ?? 'default'],
        }
      })
    })
    context?.workspaceRef?.value.changeSchema(newNodes)
    nextTick(() => {
      context?.workspaceRef?.value.rendererRef.instanceBus?.[getSchemaInstanceName(context?.workspaceRef?.value?.selectComponent)]?.updateRender()
    })
  }, {
    deep: true,
  })

  // 选中组件改变时
  watch(() => context?.workspaceRef?.value?.selectComponent, (newValue) => {
    setTimeout(() => {
      findAndModifyById(deepCopy(context?.workspaceRef?.value.schema), newValue?.id, (node: Schema) => {
        propsData.value = {
          props: node.props,
        }
        fieldData.value = {
          field: {
            id: node.id,
            name: node.name,
            label: node.label,
            field: node.field,
          },
        }
        if (!slotsData.value) {
          slotsData.value = {
            slots: {},
          }
        }
        if (node?.type === 'al-text') {
          propsData.value.props['al-text'] = String(node.children?.[0])
        }
        (node?.children as Schema[])?.map((slot: Schema) => {
          slotsData.value.slots[slot.slotName ?? 'default'] = slot.slotHidden ? slot.slotHidden : false
        })
        compAttrsRef.value?.updateComponent(propsData.value)
        fieldRef.value?.updateComponent(fieldData.value)
        slotsRef.value?.updateComponent(slotsData.value)
      })
    }, 300)
  }, {
    deep: true,
  })

  return {
    fieldRef,
    compAttrsRef,
    slotsRef,
    slotsData,
    compSchema,
    propsData,
    propsSchema,
    fieldData,
    context,
    changeFieldData,
  }
}
