<script setup lang="ts">
import {
  AlAside,
  AlDropdown,
  AlDropdownItem,
  AlDropdownMenu,
  AlTree,
} from '@ai-lowcode/element-plus'
import AlDraggable from 'vuedraggable/src/vuedraggable'

import { useComponentsPanel } from '../hooks/use-components-panel.ts'

import { DesignerConfig, DragForm, DragRule, MenuList, OutLineTree, Rule } from '@/designer'

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

const { triggerOutlineActive, componentClick, toolHandle, activeMenuTab, menuList, hiddenMenu, hiddenItem } = useComponentsPanel()
</script>

<template>
  <AlAside width="300px">
    <div style="height: 100%;">
      <div class="h-[40px] flex rounded-md overflow-hidden">
        <div
          class="w-1/2 flex justify-center items-center text-sm duration-300 cursor-pointer"
          :class="activeMenuTab === 'menu' ? 'bg-blue-600 text-white' : ''"
          @click="activeMenuTab = 'menu'"
        >
          组件
        </div>
        <div
          class="w-1/2 flex justify-center items-center text-sm duration-300 cursor-pointer"
          :class="activeMenuTab === 'tree' ? 'bg-blue-600 text-white' : ''"
          @click="activeMenuTab = 'tree'"
        >
          大纲
        </div>
      </div>
      <div v-show="activeMenuTab === 'menu'">
        <template v-for="(item, index) in menuList">
          <div
            v-if="hiddenMenu.indexOf(item.name) === -1" :key="index"
          >
            <h4 class="flex justify-between mx-4 cursor-pointer" @click="item.hidden = !item.hidden">
              <span>{{ item.title }}</span>
              <i class="fc-icon icon-arrow" :class="{ down: !item.hidden }" />
            </h4>
            <AlDraggable
              v-show="!item.hidden" :group="{ name: 'default', pull: 'clone', put: false }"
              :sort="false"
              item-key="name"
              class="flex flex-wrap"
              :list="item.list"
            >
              <template #item="{ element }">
                <div
                  v-if="hiddenItem.indexOf(element.name) === -1" class="w-1/3 flex justify-center items-center flex-col py-2 cursor-pointer hover:bg-blue-600 duration-300 hover:text-white rounded-md"
                  @click="componentClick(element)"
                >
                  <div class="text-3xl">
                    <i class="fc-icon !text-[26px]" :class="element.icon || 'icon-input'" />
                  </div>
                  <span class="text-sm">{{ element.label }}</span>
                </div>
              </template>
            </AlDraggable>
          </div>
        </template>
      </div>
      <div v-if="activeMenuTab === 'tree'" class="p-4">
        <AlTree
          :data="outlineTree"
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
    </div>
  </AlAside>
</template>
