import { computed, getCurrentInstance, inject, onMounted, ref } from 'vue'

import { ComponentPanelProps } from '../layout/components-panel.vue'

import dragComponentList from '@/config'
import createMenu from '@/config/menu.ts'
import { DESIGN_INSTANCE, DesignerComponentInternalInstance, DragRule, Menu, MenuList, Rule } from '@/designer'

/**
 * 组件面板 hooks
 */
export function useComponentsPanel() {
  const props: any = getCurrentInstance()?.props as unknown as ComponentPanelProps

  const emits = getCurrentInstance()?.emit

  const designerInstance = inject<DesignerComponentInternalInstance | null>(DESIGN_INSTANCE, null)

  // 菜单列表
  const menuList = ref<MenuList>(props.menu || createMenu())

  // tab 菜单标签
  const activeMenuTab = ref('menu')

  // 隐藏菜单
  const hiddenMenu = computed(() => {
    return props.config.hiddenMenu || []
  })

  // 隐藏菜单项
  const hiddenItem = computed(() => {
    return props.config.hiddenItem || []
  })

  /**
   * 大纲树工具
   * @param rule
   * @param event
   */
  function toolHandle(rule: Rule, event: any) {
    if (!rule._fc_drag_tag || rule._menu.tool === false) {
      rule.__fc__.rm()
      return
    }
    let toolVm
    if (rule._menu.inside) {
      toolVm = (rule.children?.[0] as Rule).__fc__.exportEl
    }
    else {
      toolVm = rule.__fc__.parent.exportEl
    }
    toolVm.emits(event)
  }

  /**
   * 添加菜单项
   * @param name
   * @param item
   */
  function appendMenuItem(name: 'main' | 'aide' | 'layout' | string, item: DragRule) {
    menuList.value.forEach((v: Menu) => {
      if (v.name === name) {
        v.list.push(...(Array.isArray(item) ? item : [item]))
      }
    })
  }

  /**
   * 添加组件
   * @param component
   */
  function addComponent(component: Array<DragRule> | DragRule) {
    if (Array.isArray(component)) {
      component.forEach((v: DragRule) => {
        props.dragRuleList[v.name] = v
        v.menu && appendMenuItem(v.menu, v)
      })
    }
    else {
      props.dragRuleList[component.name] = component
      component.menu && appendMenuItem(component.menu, component)
    }
  }

  /**
   * 点击大纲树
   * @param rule
   */
  function triggerOutlineActive(rule: any) {
    let dragTool
    if (rule._menu.inside) {
      dragTool = rule.children[0]
    }
    else {
      dragTool = rule.__fc__.parent.rule
    }
    if (dragTool && dragTool.type === 'DragTool') {
      // TODO: el函数获取不到值
      const el = props.workspaceEditConfig.api.el(dragTool.__fc__.id)
      if (el) {
        emits && emits('changeSelectComponent', dragTool.__fc__.id)
        designerInstance?.emit('active', rule)
        props.toolActive(rule)
      }
    }
  }

  /**
   * 点击组件
   * @param menu
   */
  function componentClick(menu: Menu) {
    console.log(props.workspaceEditConfig.rule)
    props.dragComponent({ menu })
  }

  onMounted(() => {
    addComponent(dragComponentList)
  })

  return {
    triggerOutlineActive,
    componentClick,
    toolHandle,
    activeMenuTab,
    menuList,
    hiddenMenu,
    hiddenItem,
  }
}
