<script setup lang="ts">
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

import { computed, inject, onMounted, ref, toRaw, watch } from 'vue'

import AlDraggable from 'vuedraggable/src/vuedraggable'

import {
  ComponentMenu,
} from '@/enums'
import { DESIGNER_CTX, PAGE_COMP } from '@/global'
import AlEventEditor from '@/layout/attrs-panel/components/event-editor.vue'
import componentSchemaList from '@/schema'

import createMenu from '@/schema/menu.ts'
import { ActiveComponentMenu, CompSchema, DesignerContext, Menu, MenuList, Schema } from '@/types'
import { removeAlDragBoxAndPromoteChildren } from '@/utils'

defineEmits<{
  /**
   * 改变选中组件事件
   */
  (event: 'changeSelectComponent', value: string): void
}>()

// 菜单列表
const menuList = ref<MenuList>(createMenu())

const activeComponentMenu = ref<ActiveComponentMenu>({
  menu: ComponentMenu.COMPONENT,
  expand: true,
})

// tab 菜单标签
const activeMenuTab = ref('main')

const context = inject<DesignerContext>(DESIGNER_CTX)

const editor = ref()

const editorOptions = ref({
  el: 'monaco',
  options: {
    language: 'json',
    code: ``,
  },
})

watch(() => context?.workspaceRef?.value?.schema, (newValue) => {
  editorOptions.value.options.code = newValue
  toRaw(editor.value.editor)?.setValue(JSON.stringify(newValue, null, 2))
  toRaw(editor.value.editor)?.getAction('editor.action.formatDocument').run()
  toRaw(editor.value.editor)?.setValue(toRaw(editor.value.editor)?.getValue())
}, { deep: true })

function schemaToOutLine(schema: Array<Schema>) {
  const arr = [] as any
  schema?.map((item: Schema) => {
    const obj = {
      label: item?.field === PAGE_COMP ? '页面' : item?.title,
      type: item?.type,
      field: item?.field,
      children: [],
    }
    if (item.children) {
      obj.children = schemaToOutLine(item.children as Array<Schema>)
    }
    if (obj?.type)
      arr.push(obj)
  })
  return arr
}

const outLineTree = computed({
  get() {
    console.log(schemaToOutLine(context?.workspaceRef?.value?.schema))
    return removeAlDragBoxAndPromoteChildren(schemaToOutLine(context?.workspaceRef?.value?.schema))
  },
  set() {},
})

const currentSelectNode = computed(() => context?.selectComponent?.value?.field)

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

function changeComponentSlide(compType: ComponentMenu) {
  activeComponentMenu.value = {
    menu: compType,
    expand: activeComponentMenu.value.menu === compType
      ? !activeComponentMenu.value.expand
      : true,
  }
}

function handleCommand(command: string | number | object, field: string) {
  switch (command) {
    case '1':
      copyComponent(field)
      break
    case '2':
      // copyComponent(field)
      break
    case '3':
      deleteComponent(field)
      break
  }
}

function deleteComponent(field: string) {
  context?.workspaceRef?.value?.deleteComponent(field)
}

function copyComponent(field: string) {
  context?.changeComponentSelect?.(context?.workspaceRef?.value?.copyComponent(field))
}

function selectComponent(field: Schema) {
  context?.changeComponentSelect?.(field)
}

function insertComponent(compSchema: CompSchema) {
  context?.workspaceRef?.value.insertComponent?.(compSchema.schema())
}

function onEnd({ item, newIndex }: any) {
  context?.workspaceRef?.value.insertComponent?.(item?.__draggable_context?.element.schema(), newIndex)
}

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

onMounted(() => {
  addComponent(componentSchemaList)
})
</script>

<template>
  <div class="mr-[10px] max-w-[360px] flex flex-row">
    <div class="w-[45px] flex flex-col border border-solid border-gray-200" :class="!activeComponentMenu.expand ? 'border-r' : 'border-r-0'">
      <AlTooltip
        v-for="(item, index) in slideMenu"
        :key="index"
        class="box-item"
        effect="dark"
        :content="item.title"
        placement="right"
      >
        <AlIcon
          size="20" class="h-[45px] cursor-pointer hover:bg-blue-600 hover:text-white duration-300 w-full"
          :class="activeComponentMenu.menu === item.slug ? 'bg-blue-600 text-white' : 'text-gray-500'"
          @click="changeComponentSlide(item.slug)"
        >
          <Icon :icon="item.icon" />
        </AlIcon>
      </AlTooltip>
    </div>
    <AlTabs
      v-model="activeMenuTab"
      :class="activeComponentMenu.menu === ComponentMenu.COMPONENT && activeComponentMenu.expand ? 'animate-fade-in block' : 'animate-fade-out hidden'"
      class="h-full overflow-auto flex-1 w-[272px]"
      type="border-card"
    >
      <AlInput class="w-full mb-2 px-1" placeholder="输入关键词查询组件" size="small" />
      <AlTabPane v-for="(item, index) in menuList" :key="index" :label="item.title" :name="item.name">
        <div>
          <AlDraggable
            :group="{ name: 'default', pull: 'clone', put: false }"
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
                <div class="rounded-md text-gray-600 border border-solid border-gray-200 w-full mx-1 my-1 flex justify-center items-center cursor-pointer px-2 py-1 hover:border-blue-600 duration-300">
                  <div class="text-sm">
                    <i class="fc-icon !text-[18px]" :class="element.icon || 'icon-input'" />
                  </div>
                  <span class="text-sm">{{ element.label }}</span>
                </div>
              </div>
            </template>
          </AlDraggable>
        </div>
      </AlTabPane>
    </AlTabs>
    <div
      :class="activeComponentMenu.menu === ComponentMenu.OUTLINE && activeComponentMenu.expand ? 'animate-fade-in block' : 'animate-fade-out hidden'"
      class="border border-solid border-gray-200 flex-1 component-tree w-[272px]"
    >
      <AlInput class="w-full mt-2 px-2" placeholder="输入关键词查询大纲" size="small" />
      <AlTree
        class="m-2"
        :data="outLineTree"
        empty-text="暂无数据"
        default-expand-all
        draggable
        highlight-current
        :current-node-key="currentSelectNode"
        node-key="field"
      >
        <template #default="{ data }: any">
          <div class="flex justify-between items-center w-full" @click="selectComponent(data)">
            <div class="flex items-center justify-between w-full">
              <div>{{ data?.label }}</div>
            </div>
            <div v-if="!data?.slot && data?.field !== PAGE_COMP" @click.stop>
              <AlDropdown trigger="click" size="default" :class="currentSelectNode === data?.field ? 'text-white' : ''" @command="(command: string | number | object) => handleCommand(command, data?.field)">
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
      class="flex-1 flex py-4 bg-white border border-solid border-gray-200 w-[272px]"
      :class="activeComponentMenu.menu === ComponentMenu.CODE && activeComponentMenu.expand ? 'animate-fade-in block' : 'animate-fade-out hidden'"
    >
      <AlEventEditor
        ref="editor"
        style="width: 275px;height: 100%"
        :option="editorOptions"
      />
    </div>
    <div
      class="flex-1 flex py-4 bg-white border border-solid border-gray-200 w-[272px]"
      :class="activeComponentMenu.menu === ComponentMenu.AICHAT && activeComponentMenu.expand ? 'animate-fade-in block' : 'animate-fade-out hidden'"
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
    color: white;
    background-color: rgb(37 99 235);
  }
}
</style>
