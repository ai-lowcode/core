<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { AlCodeEditorAtom } from '@zero-dim/atoms'
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
} from '@zero-dim/component-adapter'
import { VueDraggable } from 'vue-draggable-plus'

import { slideMenu } from './config/menu.ts'

import { useComponentsPanel } from './hooks/use-components-panel.ts'

import { ComponentMenu } from '@/enums'
import { PAGE_COMP } from '@/global'

defineEmits<{
  /**
   * 改变选中组件事件
   */
  (event: 'changeSelectComponent', value: string): void
}>()

const {
  outLineRef,
  editor,
  editorOptions,
  code,
  activeComponentMenu,
  activeMenuTab,
  currentSelectNode,
  outLineTree,
  menuList,
  searchCom,
  handleSearchCom,
  changeComponentSlide,
  insertComponent,
  handleCommand,
  selectComponent,
  onEnd,
} = useComponentsPanel()
</script>

<template>
  <div class="mr-[10px] max-w-[360px] flex flex-row bg-red">
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
          size="20" class="h-[45px] cursor-pointer flex justify-center items-center hover:bg-active-color hover:text-white duration-300 w-full"
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
        <AlInput v-model="searchCom" class="w-full mb-2 px-3" placeholder="输入关键词查询组件" size="small" @change="handleSearchCom" />
        <!--        todo物料 -->
        <AlTabPane v-for="(item, index) in menuList" :key="index" :label="item.title" :name="item.name">
          <div class="mx-2">
            <VueDraggable
              v-model="item.list"
              :group="{ name: 'default', pull: 'clone', put: false }"
              :sort="false"
              class="flex flex-wrap"
              @end="onEnd"
            >
              <template
                v-for="element in item.list"
                :key="element.id"
              >
                <div
                  class="w-1/2 flex justify-center items-center"
                  @click="insertComponent(element as any)"
                >
                  <div style="color: var(--el-text-color-primary)" class="rounded-md text-gray-600 border hover:border-dashed border-basic-color border-solid w-full mx-1 my-1 flex justify-center items-center cursor-move px-2 py-1 hover:border-active-color duration-300">
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
            </VueDraggable>
          </div>
        </AlTabPane>
      </AlTabs>
    </div>
    <div
      :class="activeComponentMenu.menu === ComponentMenu.OUTLINE && activeComponentMenu.expand ? 'animate-fade-in !block' : 'animate-fade-out !hidden'"
      class="border border-solid border-basic-color overflow-auto flex-1 component-tree w-[272px]"
    >
      <AlInput class="w-full mt-2 px-2" placeholder="输入关键词查询大纲" size="small" />
      <AlTree
        ref="outLineRef"
        class="m-2"
        :data="outLineTree"
        empty-text="暂无数据"
        default-expand-all
        draggable
        highlight-current
        :expand-on-click-node="false"
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
              <AlDropdown trigger="click" size="default" :class="currentSelectNode === data?.id ? 'text-active-color' : ''" @command="(command: string | number | object) => handleCommand(command, data)">
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
      <AlCodeEditorAtom
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
