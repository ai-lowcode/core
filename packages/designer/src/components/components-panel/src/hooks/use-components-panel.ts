import { Schema } from '@ai-lowcode/core'
import { AlMessage } from '@ai-lowcode/element-plus'
import componentSchemaList, { CompSchema } from '@ai-lowcode/schemas-element-plus'
import { deepCopy } from '@ai-lowcode/utils'
import { computed, inject, nextTick, onMounted, ref, watch } from 'vue'

import { createMenu } from '@/components/components-panel/src/config/menu.ts'
import { ComponentMenu } from '@/enums'
import { DESIGNER_CTX, PAGE_COMP } from '@/global'
import { ActiveComponentMenu, DesignerContext, Menu, MenuList } from '@/types'
import { addEditorThemeListener, findParentNode, removeAlDragBoxAndPromoteChildren } from '@/utils'

export function useComponentsPanel() {
  const code = ref()

  // 编辑器 ref
  const editor = ref()

  const outLineRef = ref()

  // tab 菜单标签
  const activeMenuTab = ref('basic')

  // 菜单列表
  const menuList = ref<MenuList>(createMenu())

  const cloneMenuList = ref < MenuList | any > (null)
  // 全局上下文
  const context = inject<DesignerContext>(DESIGNER_CTX)

  // 当前选中节点
  const currentSelectNode = ref(context?.workspaceRef?.value?.selectComponent?.id)

  // 搜索组件
  const searchCom = ref('')
  watch(() => context?.workspaceRef?.value?.selectComponent?.id, (newValue) => {
    currentSelectNode.value = newValue
  }, { deep: true })

  // 编辑器选项
  const editorOptions = ref({
    mode: 'javascript',
    theme: 'default', // 主题
    readOnly: false,
    lineNumbers: false,
    lineWiseCopyCut: true,
    gutters: ['CodeMirror-lint-markers'],
    lint: true,
  })

  // 当前激活面板
  const activeComponentMenu = ref<ActiveComponentMenu>({
    menu: ComponentMenu.COMPONENT,
    expand: true,
  })

  // 大纲树
  const outLineTree = computed(() => removeAlDragBoxAndPromoteChildren(schemaToOutLine(context?.workspaceRef?.value?.schema)))

  watch(() => outLineTree.value, () => {
    nextTick(() => {
      outLineRef.value?.setCurrentKey(currentSelectNode.value)
    })
  })

  watch(() => context?.workspaceRef?.value?.schema, (newValue) => {
    code.value = JSON.stringify(newValue, null, 2) ?? ''
  }, { deep: true })

  /**
   * schema 转换大杨树
   * @param schema
   */
  function schemaToOutLine(schema: Array<Schema>) {
    const arr = [] as any
    schema?.map((item: Schema) => {
      const obj = {
        ...item,
        label: item?.id === PAGE_COMP ? '页面' : item?.label,
        children: item?.children ?? [],
      }
      if (item?.children) {
        obj.children = schemaToOutLine(item.children as Array<Schema>)
      }
      if (obj?.type)
        arr.push(obj)
    })
    return arr
  }

  /**
   * 添加菜单项物料组件
   * @param name
   * @param item
   */
  function appendMenuItem(name: 'main' | 'aide' | 'layout' | string, item: any) {
    menuList.value.forEach((v: Menu) => {
      if (v.name === name) {
        v.list.push(item)
      }
    })
  }

  /**
   * 添加组件
   * @param component
   */
  function addComponent(component: Array<CompSchema> | any) {
    if (Array.isArray(component)) {
      component.forEach((compSchema: CompSchema) => {
        compSchema.menu && appendMenuItem(compSchema.menu, compSchema)
      })
    }
    else {
      component.menu && appendMenuItem(component.menu, component)
    }
    cloneMenuList.value = deepCopy(menuList.value)
  }

  /**
   * 修改组件边栏
   * @param compType
   */
  function changeComponentSlide(compType: ComponentMenu) {
    activeComponentMenu.value = {
      menu: compType,
      expand: activeComponentMenu.value.menu === compType
        ? !activeComponentMenu.value.expand
        : true,
    }
  }

  /**
   * 大纲树操作命令
   * @param command
   * @param data
   */
  function handleCommand(command: string | number | object, data: any) {
    const parentNode = findParentNode(context?.workspaceRef?.value?.schema[0], data?.id)
    switch (command) {
      case '1':
        copyComponent(parentNode?.id, parentNode)
        break
      case '2':
        // copyComponent(id)
        break
      case '3':
        deleteComponent(parentNode?.id)
        break
    }
  }

  /**
   * 删除组件
   * @param id
   */
  function deleteComponent(id: string) {
    context?.workspaceRef?.value?.deleteComponent(id)
  }

  /**
   * 复制组件
   * @param id
   * @param schema
   */
  function copyComponent(id: string, schema: any) {
    context?.workspaceRef?.value?.changeComponentSelect?.(context?.workspaceRef?.value?.copyComponent(id, schema))
  }

  /**
   * 选择组件
   * @param id
   */
  function selectComponent(id: Schema) {
    context?.workspaceRef?.value?.changeComponentSelect?.(id)
  }

  /**
   * 插入组件
   * @param compSchema
   */
  function insertComponent(compSchema: CompSchema) {
    console.log(compSchema, 'compSchema')
    console.log(compSchema.schema(), 'schema')
    const addedComp = context?.workspaceRef?.value.insertComponent?.(compSchema.schema(), context?.workspaceRef?.value?.selectComponent?.id)
    selectComponent(addedComp)
  }

  /**
   * 组件拖拽结束事件
   * @param item
   * @param newIndex
   * @param pullMode
   * @param to
   */
  function onEnd({ data, newIndex, pullMode, to }: any) {
    if (pullMode === 'clone') {
      const addedComp = context?.workspaceRef?.value.insertComponent?.(data.schema(), to.id, newIndex)
      selectComponent(addedComp)
    }
  }

  /**
   * 重置 menuList 到初始状态
   */
  function resetMenuList() {
    menuList.value = deepCopy(cloneMenuList.value)
  }

  /**
   * 搜索组件
   * @param componentLabel 组件名称
   */
  function handleSearchCom(componentLabel: string) {
    const comList = componentSchemaList.filter(item => item.label.includes(componentLabel))
    if (!comList.length) {
      AlMessage.error('暂无该组件')
      resetMenuList()
      return
    }
    if (!componentLabel.length) {
      resetMenuList()
      return
    }
    const targetMenu = menuList.value.find(v => v.name === activeMenuTab.value)
    if (targetMenu) {
      targetMenu.list = comList
    }
  }

  onMounted(() => {
    addComponent(componentSchemaList)
    addEditorThemeListener((hasDark: boolean) => {
      if (hasDark)
        editorOptions.value.theme = 'dracula'
      else
        editorOptions.value.theme = 'default'
    })
  })

  return {
    outLineRef,
    editor,
    editorOptions,
    code,
    searchCom,
    activeComponentMenu,
    activeMenuTab,
    currentSelectNode,
    outLineTree,
    menuList,
    changeComponentSlide,
    insertComponent,
    selectComponent,
    handleCommand,
    handleSearchCom,
    onEnd,
  }
}
