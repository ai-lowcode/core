<script setup lang="ts">
import { Schema } from '@ai-lowcode/core'
import {
  AlDropdown,
  AlDropdownItem,
  AlDropdownMenu,
  AlIcon,
  AlInput,
  AlTabPane,
  AlTabs,
  AlTooltip,
  AlTree,
} from '@ai-lowcode/element-plus'
import { Icon } from '@iconify/vue'
import { computed, inject, onMounted, ref, watch } from 'vue'
import AlDraggable from 'vuedraggable/src/vuedraggable'

import { AlEventEditor } from '@/components/attrs-panel'
import createMenu from '@/components/components-panel/src/config/menu.ts'
import { ComponentMenu } from '@/enums'
import { DESIGNER_CTX, PAGE_COMP } from '@/global'
import componentSchemaList from '@/schema'
import { ActiveComponentMenu, CompSchema, DesignerContext, Menu, MenuList } from '@/types'
import { addEditorThemeListener, removeAlDragBoxAndPromoteChildren } from '@/utils'

defineEmits<{
  /**
   * 改变选中组件事件
   */
  (event: 'changeSelectComponent', value: string): void
}>()

// 侧边栏菜单
const slideMenu = [
  {
    title: '组件',
    slug: ComponentMenu.COMPONENT,
    icon: 'tdesign:component-layout',
  },
  {
    title: '大纲树',
    slug: ComponentMenu.OUTLINE,
    icon: 'gg:list-tree',
  },
  {
    title: '源码',
    slug: ComponentMenu.CODE,
    icon: 'nonicons:vscode-16',
  },
  {
    title: 'Ai助手',
    slug: ComponentMenu.AICHAT,
    icon: 'hugeicons:ai-chat-02',
  },
]

const code = ref()

// 编辑器 ref
const editor = ref()

// tab 菜单标签
const activeMenuTab = ref('main')

// 菜单列表
const menuList = ref<MenuList>(createMenu())

// 全局上下文
const context = inject<DesignerContext>(DESIGNER_CTX)

// 当前选中节点
const currentSelectNode = computed(() => context?.selectComponent?.value?.id)

// 编辑器选项
const editorOptions = ref({
  mode: 'javascript',
  theme: 'default', // 主题
  readOnly: false,
  lineNumbers: true,
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
const outLineTree = computed({
  get() {
    return removeAlDragBoxAndPromoteChildren(schemaToOutLine(context?.workspaceRef?.value?.schema))
  },
  set() {},
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
 * 添加菜单项
 * @param name
 * @param item
 */
function appendMenuItem(name: 'main' | 'aide' | 'layout' | string, item: any) {
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
function addComponent(component: Array<CompSchema> | any) {
  if (Array.isArray(component)) {
    component.forEach((compSchema: CompSchema) => {
      compSchema.menu && appendMenuItem(compSchema.menu, compSchema)
    })
  }
  else {
    component.menu && appendMenuItem(component.menu, component)
  }
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
 * @param id
 */
function handleCommand(command: string | number | object, id: string) {
  switch (command) {
    case '1':
      copyComponent(id)
      break
    case '2':
      // copyComponent(id)
      break
    case '3':
      deleteComponent(id)
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
 */
function copyComponent(id: string) {
  context?.changeComponentSelect?.(context?.workspaceRef?.value?.copyComponent(id))
}

/**
 * 选择组件
 * @param id
 */
function selectComponent(id: Schema) {
  context?.changeComponentSelect?.(id)
}

/**
 * 插入组件
 * @param compSchema
 */
function insertComponent(compSchema: CompSchema) {
  const addedComp = context?.workspaceRef?.value.insertComponent?.(compSchema.schema(), context?.selectComponent?.value.id)
  selectComponent(addedComp)
}

/**
 * 组件拖拽结束事件
 * @param item
 * @param newIndex
 * @param pullMode
 * @param to
 */
function onEnd({ item, newIndex, pullMode, to }: any) {
  if (pullMode === 'clone') {
    const addedComp = context?.workspaceRef?.value.insertComponent?.(item?.__draggable_context?.element.schema(), to.id, newIndex)
    selectComponent(addedComp)
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
</script>

<template>
  <div class="mr-[10px] max-w-[360px] flex flex-row">
    <div class="w-[45px] flex flex-col border border-solid border-basic-color bg-basic-color" :class="!activeComponentMenu.expand ? 'border-r' : 'border-r-0'">
      <AlTooltip
        v-for="(item, index) in slideMenu"
        :key="index"
        class="box-item"
        effect="dark"
        :content="item.title"
        placement="right"
      >
        <AlIcon
          size="20" class="h-[45px] cursor-pointer hover:bg-active-color hover:text-white duration-300 w-full"
          :class="activeComponentMenu.menu === item.slug ? 'bg-active-color text-white' : 'text-gray-500'"
          @click="changeComponentSlide(item.slug)"
        >
          <Icon :icon="item.icon" />
        </AlIcon>
      </AlTooltip>
    </div>
    <div
      :class="activeComponentMenu.menu === ComponentMenu.COMPONENT && activeComponentMenu.expand ? 'animate-fade-in !block' : 'animate-fade-out !hidden'"
    >
      <AlTabs
        v-model="activeMenuTab"
        class="h-full overflow-auto flex-1 w-[272px] border border-solid border-basic-color bg-basic-color tabs-component"
        stretch
      >
        <AlInput class="w-full mb-2 px-3" placeholder="输入关键词查询组件" size="small" />
        <AlTabPane v-for="(item, index) in menuList" :key="index" :label="item.title" :name="item.name">
          <div class="mx-2">
            <AlDraggable
              :group="{ name: 'default', pull: 'clone', put: true }"
              :sort="false"
              item-key="name"
              class="flex flex-wrap"
              :list="item.list"
              @end="onEnd"
            >
              <template #item="{ element }">
                <div
                  class="w-1/2 flex justify-center items-center"
                  @click="insertComponent(element)"
                >
                  <div style="color: var(--el-text-color-primary);background: var(--el-color-primary-light-9)" class="rounded-md text-gray-600 border hover:border-dashed border-basic-color border-solid w-full mx-1 my-1 flex justify-center items-center cursor-move px-2 py-1 hover:border-active-color duration-300">
                    <div class="text-sm">
                      <i class="fc-icon !text-[18px]" :class="element.icon || 'icon-input'" />
                    </div>
                    <AlIcon size="18" class="cursor-pointer text-gray-600 mr-1">
                      <Icon :icon="element?.icon" />
                    </AlIcon>
                    <span class="text-sm">{{ element.label }}</span>
                  </div>
                </div>
              </template>
            </AlDraggable>
          </div>
        </AlTabPane>
      </AlTabs>
    </div>
    <div
      :class="activeComponentMenu.menu === ComponentMenu.OUTLINE && activeComponentMenu.expand ? 'animate-fade-in !block' : 'animate-fade-out !hidden'"
      class="border border-solid border-basic-color flex-1 component-tree w-[272px]"
    >
      <AlInput class="w-full mt-2 px-2" placeholder="输入关键词查询大纲" size="small" />
      <AlTree
        class="m-2"
        :data="outLineTree"
        empty-text="暂无数据"
        default-expand-all
        draggable
        highlight-current
        :expand-on-click-node="false"
        :current-node-key="currentSelectNode"
        node-key="id"
      >
        <template #default="{ data }: any">
          <div class="flex justify-between items-center w-full" @click="selectComponent(data)">
            <div class="flex items-center justify-between w-full">
              <div class="flex items-center">
                <AlIcon size="14" class="cursor-pointer text-gray-600 mr-1">
                  <Icon :icon="data?.icon" :class="currentSelectNode === data?.id ? 'text-active-color' : ''" />
                </AlIcon>
                <div>{{ data?.label }}</div>
              </div>
            </div>
            <div v-if="!data?.slot && data?.id !== PAGE_COMP" @click.stop>
              <AlDropdown trigger="click" size="default" :class="currentSelectNode === data?.id ? 'text-active-color' : ''" @command="(command: string | number | object) => handleCommand(command, data?.id)">
                <AlIcon>
                  <Icon icon="mingcute:more-2-fill" />
                </AlIcon>
                <template #dropdown>
                  <AlDropdownMenu>
                    <AlDropdownItem
                      command="1"
                    >
                      复制
                    </AlDropdownItem>
                    <AlDropdownItem
                      command="2"
                    >
                      添加子级
                    </AlDropdownItem>
                    <AlDropdownItem
                      command="3"
                    >
                      删除
                    </AlDropdownItem>
                  </AlDropdownMenu>
                </template>
              </AlDropdown>
            </div>
          </div>
        </template>
      </AlTree>
    </div>
    <div
      class="flex-1 flex py-4 bg-basic-color border border-solid border-basic-color w-[272px]"
      :class="activeComponentMenu.menu === ComponentMenu.CODE && activeComponentMenu.expand ? 'animate-fade-in !block' : 'animate-fade-out !hidden'"
    >
      <AlEventEditor
        v-if="activeComponentMenu.menu === ComponentMenu.CODE && activeComponentMenu.expand"
        ref="editor"
        v-model="code"
        style="width: 270px;height: 100%"
        :option="editorOptions"
      />
    </div>
    <div
      class="flex-1 flex py-4 bg-basic-color border border-solid border-basic-color w-[272px]"
      :class="activeComponentMenu.menu === ComponentMenu.AICHAT && activeComponentMenu.expand ? 'animate-fade-in !block' : 'animate-fade-out !hidden'"
    >
      1212
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.component-tree) {
  .el-tree-node__content {
    padding-right: 6px;
    border-radius: 4px;
    transition: .3s;
  }

  .el-tree-node.is-current>.el-tree-node__content{
    color: rgb(37 99 235);
    background-color: #ededed;
    border-radius: 0;
  }
}

:deep(.tabs-component) {
  .el-tabs__item.is-top:nth-child(2) {
    padding: 0 20px;
  }

  .el-tabs__item.is-top:last-child {
    padding: 0 20px;
  }

}
</style>
