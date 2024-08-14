import { ref } from 'vue'

import { Rule } from '@/designer'

/**
 * 拖拽活动 hooks
 * @param dragComponent
 * @param handleSortAfter
 */
export function useDragActions({ dragComponent, handleSortAfter }: any) {
  // 移动的组件 rule
  const moveRule = ref()

  // 需要添加的组件 rule
  const addRule = ref()

  // 是否已被添加
  const added = ref()

  /**
   * 元素拖拽开始(工作区拖拽)
   * @param children
   */
  function dragStart(children: Array<Rule>) {
    moveRule.value = children
    added.value = false
  }

  /**
   * 元素拖拽结束(工作区拖拽)
   * @param children
   * @param newIndex
   * @param oldIndex
   * @param slot
   */
  function dragEnd(children: Array<Rule>, { newIndex, oldIndex }: any, slot?: any) {
    if (!added.value && !(moveRule.value === children && newIndex === oldIndex)) {
      const rule = moveRule.value.splice(oldIndex, 1)
      if (slot) {
        rule.slot = slot
      }
      children.splice(newIndex, 0, rule[0])
      handleSortAfter()
    }
    moveRule.value = null
    addRule.value = null
    added.value = false
  }

  /**
   * 元素从另一个列表放入列表中(组件列表拖拽)
   * @param children
   * @param event
   * @param slot
   */
  function dragAdd(children: Array<Rule>, event: any, slot?: any) {
    const newIndex = event.newIndex
    const menu = event.item._underlying_vm_
    if (menu && menu.__fc__) {
      // 工作区拖拽
      if (addRule.value) {
        const rule = addRule.value.children.splice(addRule.value.children.indexOf(menu), 1)[0]
        if (slot) {
          rule.slot = slot
        }
        else {
          delete rule?.slot
        }
        children.splice(newIndex, 0, rule)
        handleSortAfter()
      }
    }
    else {
      // 组件列表拖拽
      dragComponent({ menu, workspaceRules: children, index: newIndex, slot })
    }
    added.value = true
  }

  /**
   * 元素未选择(工作区拖拽)
   * @param children
   * @param event
   */
  function dragUnChoose(children: Array<Rule>, event: any) {
    addRule.value = {
      children,
      oldIndex: event.oldIndex,
    }
  }

  /**
   * 生成拖拽组件 rule
   * @param group
   * @param tag
   * @param children
   * @param on
   * @param slot
   */
  function makeDrag(group: any, tag: any, children: any, on: any, slot?: any) {
    return {
      type: 'DragBox',
      wrap: {
        show: false,
      },
      col: {
        show: false,
      },
      inject: true,
      props: {
        rule: {
          props: {
            tag: 'el-col',
            group: group === true ? 'default' : group,
            ghostClass: 'ghost',
            animation: 150,
            handle: '.al-drag-btn',
            emptyInsertThreshold: 0,
            direction: 'vertical',
            itemKey: 'type',
          },
        },
        tag,
      },
      children,
      slot,
      on,
    }
  }

  return {
    makeDrag,
    dragEmits: {
      end: (inject: any, event: any) => dragEnd(inject.self.children, event),
      add: (inject: any, event: any) => dragAdd(inject.self.children, event),
      start: (inject: any) => dragStart(inject.self.children),
      unchoose: (inject: any, event: any) => dragUnChoose(inject.self.children, event),
    },
  }
}
