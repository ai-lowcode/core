<script setup lang="ts">
import {
  AlDropdown,
  AlDropdownItem,
  AlDropdownMenu,
  AlIcon,
  AlInput,
  AlTabPane,
  AlTabs,
  AlTree,
} from '@ai-lowcode/element-plus'
import { Icon } from '@iconify/vue'
import AlDraggable from 'vuedraggable/src/vuedraggable'

import { useComponentsPanel } from '../hooks/use-components-panel.ts'

import { ComponentMenu, DesignerConfig, DragForm, DragRule, MenuList, OutLineTree, Rule } from '@/designer'

export interface ComponentPanelProps {
  config: DesignerConfig
  menu: MenuList
  workspaceEditConfig: DragForm
  dragRuleList: Record<string, DragRule>
  dragComponent: Function
  workspaceRule?: Array<Rule>
  toolActive: Function
  workspacePreviewConfig: DragForm
  outlineTree?: Array<OutLineTree>
}

defineProps<ComponentPanelProps>()

defineEmits<{
  /**
   * 改变选中组件事件
   */
  (event: 'changeSelectComponent', value: string): void
}>()
const { triggerOutlineActive, componentClick, toolHandle, activeComponentMenu, activeMenuTab, menuList, hiddenMenu, hiddenItem } = useComponentsPanel()
</script>

<template>
  <div class="mr-[10px] w-[320px] flex flex-row">
    <div class="w-[45px] flex flex-col border border-solid border-gray-200 border-r-0">
      <AlIcon
        size="22" class="h-[45px] cursor-pointer hover:bg-blue-600 hover:text-white duration-300 w-full"
        :class="activeComponentMenu === ComponentMenu.COMPONENT ? 'bg-blue-600 text-white' : 'text-gray-500'"
        @click="activeComponentMenu = ComponentMenu.COMPONENT"
      >
        <Icon icon="tdesign:component-layout" />
      </AlIcon>
      <AlIcon
        size="22" class="mt-[1px] h-[45px] cursor-pointer hover:bg-blue-600 hover:text-white duration-300 w-full"
        :class="activeComponentMenu === ComponentMenu.OUTLINE ? 'bg-blue-600 text-white' : 'text-gray-500'"
        @click="activeComponentMenu = ComponentMenu.OUTLINE"
      >
        <Icon icon="gg:list-tree" />
      </AlIcon>
    </div>
    <AlTabs
      v-if="activeComponentMenu === ComponentMenu.COMPONENT"
      v-model="activeMenuTab"
      class="h-full overflow-auto flex-1"
      type="border-card"
    >
      <AlInput v-model="input" class="w-full mb-2 px-1" placeholder="输入关键词查询组件" />
      <AlTabPane v-for="(item, index) in menuList" :key="index" :label="item.title" :name="item.name">
        <div
          v-if="hiddenMenu.indexOf(item.name) === -1" :key="index"
        >
          <AlDraggable
            :group="{ name: 'default', pull: 'clone', put: false }"
            :sort="false"
            item-key="name"
            class="flex flex-wrap"
            :list="item.list"
          >
            <template #item="{ element }">
              <div
                v-if="hiddenItem.indexOf(element.name) === -1"
                class="w-1/2 flex justify-center items-center"
                @click="componentClick(element)"
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
    <AlTree
      v-if="activeComponentMenu === ComponentMenu.OUTLINE"
      class="border border-solid border-gray-200 flex-1 p-2 component-tree"
      :data="outlineTree"
      empty-text="暂无数据"
      default-expand-all
      :expand-on-click-node="false"
      @current-change="(data) => triggerOutlineActive(data.rule)"
    >
      <template #default="{ data }: any">
        <div class="flex justify-between items-center w-full" :class="{ active: data.activeRule === data.rule }">
          <div class="flex items-center">
            <i
              class="fc-icon"
              :class="(data.rule._menu && data.rule._menu.icon) || 'icon-cell'"
            />
            <span>{{
              (data.rule.title || '').trim() || (data.rule.props && data.rule.props.label) || data.rule.type
            }}</span>
          </div>
          <div v-if="!data.slot" class="" @click.stop>
            <AlDropdown trigger="click" size="default">
              <i class="fc-icon icon-more" />
              <template #dropdown>
                <AlDropdownMenu>
                  <AlDropdownItem
                    v-if="data.rule._fc_drag_tag !== '_'" key="1"
                    @click="toolHandle(data.rule, 'copy')"
                  >
                    复制
                  </AlDropdownItem>
                  <AlDropdownItem
                    v-if="data.rule._menu && data.rule._menu.children && data.rule._fc_drag_tag !== '_'"
                    key="2"
                    @click="toolHandle(data.rule, 'addChild')"
                  >
                    添加子级
                  </AlDropdownItem>
                  <AlDropdownItem
                    key="3"
                    @click="toolHandle(data.rule, 'delete')"
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
</template>

<style lang="scss" scoped>
:deep(.component-tree) {
  .el-tree-node__content {
    padding-right: 6px;
    border-radius: 4px;
    transition: .3s
  }
}
</style>
