import { AlMessage } from '@zero-dim/component-adapter'
import { Schema } from '@zero-dim/core'
import componentSchemaList from '@zero-dim/schemas-component-adapter'
import { deepCopy } from '@zero-dim/utils'
import { computed, inject, onMounted, ref, watch } from 'vue'

import { EventGroup } from '@/components/attrs-panel/src/types'
import { DESIGNER_CTX } from '@/global'
import { DesignerContext } from '@/types'
import { addEditorThemeListener, findAndModifyById } from '@/utils'

export function useEvent() {
  const code = ref()

  // 编辑器 ref
  const editor = ref()

  // 编辑选项
  const editOption = ref()

  // 显示事件
  const visibleEvent = ref(false)

  // 全局上下文
  const context = inject<DesignerContext>(DESIGNER_CTX)

  const compSchema = computed(() => componentSchemaList.find(item => item.name === context?.workspaceRef?.value?.selectComponent?.name))

  const editorOptions = ref({
    mode: 'javascript',
    theme: 'default', // 主题
    readOnly: false,
    lineNumbers: true,
    lineWiseCopyCut: true,
    gutters: ['CodeMirror-lint-markers'],
    lint: true,
  })

  // 生命周期事件
  const events = ref<Array<EventGroup>>([
    {
      index: 1,
      label: '组件事件',
      key: 'events',
      children: [],
    },
    {
      index: 2,
      label: '生命周期',
      key: 'lifeCycle',
      children: [
        {
          key: 'onBeforeMount',
          label: '被挂载之前被调用',
          children: [],
        },
        {
          key: 'onMounted',
          label: '挂载完成后执行',
          children: [],
        },
        {
          key: 'onBeforeUpdate',
          label: '更新DOM之前调用',
          children: [],
        },
        {
          key: 'onUpdated',
          label: '更新DOM之后调用',
          children: [],
        },
        {
          key: 'onBeforeUnmount',
          label: '被卸载之前调用',
          children: [],
        },
        {
          key: 'onUnmounted',
          label: '被卸载之后调用',
          children: [],
        },
        {
          key: 'onErrorCaptured',
          label: '后代组件错误时调用',
          children: [],
        },
      ],
    },
  ])

  watch(() => context?.workspaceRef?.value?.selectComponent, () => {
    findAndModifyById(deepCopy(context?.workspaceRef?.value.schema), context?.workspaceRef?.value?.selectComponent?.id, (node: Schema) => {
      const newEvents: any = []
      compSchema.value?.events?.()?.forEach((e: any) => {
        newEvents.push({
          ...e,
          children: node?.events?.[e.key]?.__event?.children || [],
        })
      })
      events.value[0].children = newEvents
      const lifeEvents: any = []
      events.value[1].children.forEach((e) => {
        lifeEvents.push({
          ...e,
          children: node?.lifeCycle?.[e.key]?.__event?.children || [],
        })
      })
      events.value[1].children = lifeEvents
    })
  }, {
    deep: true,
  })

  /**
   * 编辑事件
   * @param option
   * @param eventGroupIndex
   * @param eventIndex
   * @param eventItemIdx
   */
  function handleEvent(option?: string, eventGroupIndex?: number, eventIndex?: number, eventItemIdx?: number) {
    if (option === 'edit') {
      editOption.value = {
        option,
        eventGroupIndex,
        eventIndex,
        eventItemIdx,
      }
      code.value = events.value[eventGroupIndex!].children[eventIndex!].children?.[eventItemIdx!]?.code
    }
    if (option === 'add') {
      editOption.value = {
        option,
        eventGroupIndex,
        eventIndex,
        eventItemIdx,
      }
      code.value = ''
    }
    if (option === 'delete') {
      editOption.value = {
        option,
        eventGroupIndex,
        eventIndex,
        eventItemIdx,
      }
      events.value[eventGroupIndex!].children[eventIndex!].children?.splice(eventItemIdx!, 1)
      confirmEvent()
      return
    }
    visibleEvent.value = true
  }

  /**
   * 确定事件
   */
  function confirmEvent() {
    try {
      new Function('api', code.value)
    }
    catch (e) {
      console.log(e)
      AlMessage.error('函数语法错误')
      return
    }
    // 当前操作事件
    const currentEvent = events.value[editOption.value?.eventGroupIndex]?.children[editOption.value?.eventIndex]
    // 添加事件
    if (editOption.value?.option === 'add') {
      if (currentEvent.children?.length) {
        currentEvent.children.push({
          code: code.value,
        })
      }
      else {
        currentEvent.children = [{
          code: code.value,
        }]
      }
    }
    // 编辑事件
    if (editOption.value?.option === 'edit') {
      currentEvent.children?.splice(editOption.value?.idx, 1, {
        code: code.value,
      })
    }
    // 删除事件
    if (editOption.value?.option === 'delete') {
      currentEvent.children?.splice(editOption.value?.idx, 1)
    }
    // 调用函数，查找并修改
    const newNodes = findAndModifyById(deepCopy(context?.workspaceRef?.value.schema), context?.workspaceRef?.value?.selectComponent?.id, (node: Schema) => {
      const index = deepCopy(events.value[editOption.value?.eventGroupIndex]?.children[editOption.value?.eventIndex])
      // 修改事件
      node[events.value[editOption.value?.eventGroupIndex]?.key as keyof Schema] = {
        ...node[events.value[editOption.value?.eventGroupIndex]?.key as keyof Schema],
        [index?.key]: {
          __event: index,
          async run(...arg: any) {
            this?.__event?.children?.map((event: any) => {
              (new Function(event?.code)).bind({
                arg,
                ...this,
              })()
            })
          },
        },
      }
    })
    // 设置事件
    context?.workspaceRef?.value.changeSchema(newNodes)
    visibleEvent.value = false
  }

  onMounted(() => {
    addEditorThemeListener((hasDark: boolean) => {
      if (hasDark)
        editorOptions.value.theme = 'dracula'
      else
        editorOptions.value.theme = 'default'
    })
  })

  return {
    events,
    handleEvent,
    visibleEvent,
    editorOptions,
    code,
    editor,
    confirmEvent,
  }
}
