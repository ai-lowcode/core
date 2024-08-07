import { computed, getCurrentInstance, inject, onMounted, ref } from 'vue'

import ruleList from '@/config'
import createMenu from '@/config/menu.ts'

export function useComponentsPanel() {
  const props: any = getCurrentInstance()?.props as any

  const designer = inject('designer', null)

  const t = computed(() => designer.setupState.t)

  const menuList = ref(props.menu || createMenu({ t }))

  const activeMenuTab = ref('menu')

  const hiddenMenu = computed(() => {
    return props.config.hiddenMenu || []
  })
  const hiddenItem = computed(() => {
    return props.config.hiddenItem || []
  })

  onMounted(() => {
    addComponent(ruleList)
  })

  function toolHandle(rule, event) {
    if (!rule._fc_drag_tag || rule._menu.tool === false) {
      rule.__fc__.rm()
      return
    }
    let toolVm
    if (rule._menu.inside) {
      toolVm = rule.children[0].__fc__.exportEl
    }
    else {
      toolVm = rule.__fc__.parent.exportEl
    }
    toolVm.$emit(event)
  }

  function treeChange(data: any) {
    triggerActive(data.rule)
  }

  function appendMenuItem(name, item) {
    menuList.value.forEach((v) => {
      if (v.name === name) {
        v.list.push(...(Array.isArray(item) ? item : [item]))
      }
    })
  }

  function addComponent(component) {
    if (Array.isArray(component)) {
      component.forEach((v) => {
        props.dragRuleList[v.name] = v
        v.menu && appendMenuItem(v.menu, v)
      })
    }
    else {
      props.dragRuleList[component.name] = component
      component.menu && appendMenuItem(component.menu, component)
    }
  }

  function triggerActive(rule: any) {
    let dragTool
    if (rule._menu.inside) {
      dragTool = rule.children[0]
    }
    else {
      dragTool = rule.__fc__.parent.rule
    }
    if (dragTool && dragTool.type === 'DragTool') {
      const el = props.dragForm.api.el(dragTool.__fc__.id)
      if (el) {
        props.fcx.active = el.id
        designer.emit('active', rule)
        props.toolActive(rule)
      }
    }
  }

  function clickMenu(menu: any) {
    props.dragMenu({ menu, children: props.children, index: props.children.length })
  }

  return {
    treeChange,
    clickMenu,
    toolHandle,
    activeMenuTab,
    t,
    menuList,
    hiddenMenu,
    hiddenItem,
  }
}
