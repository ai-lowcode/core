<script setup lang="ts">
import {
  AlAside,
  AlCollapse,
  AlCollapseItem,
  AlDropdown,
  AlDropdownItem,
  AlDropdownMenu,
  AlTabPane,
  AlTabs,
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

const { triggerOutlineActive, componentClick, toolHandle, expandMenu, activeMenuTab, menuList, hiddenMenu, hiddenItem } = useComponentsPanel()
</script>

<template>
  <AlAside width="300px">
    <div style="height: 100%;">
      <AlTabs
        v-model="activeMenuTab"
        type="card"
      >
        <AlTabPane label="组件菜单" name="menu">
          <AlCollapse v-model="expandMenu">
            <AlCollapseItem v-for="(item, index) in menuList" :key="index" :title="item.title" :name="item.name">
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
            </AlCollapseItem>
          </AlCollapse>
        </AlTabPane>
        <AlTabPane label="大纲树" name="tree">
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
        </AlTabPane>
      </AlTabs>
    </div>
  </AlAside>
</template>
