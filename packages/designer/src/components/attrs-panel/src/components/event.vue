<script lang="ts" setup>
import { AlCodeEditorAtom } from '@ai-lowcode/atoms'
import { AlButton, AlCollapse, AlCollapseItem, AlDialog, AlIcon } from '@ai-lowcode/component-adapter'

import { Icon } from '@iconify/vue'

import { useEvent } from '../hooks/use-event.ts'

defineOptions({
  name: 'Event',
})

const {
  events,
  handleEvent,
  visibleEvent,
  editorOptions,
  code,
  editor,
  confirmEvent,
} = useEvent()
</script>

<template>
  <AlCollapse :model-value="['1']">
    <template v-for="(eventGroup, eventGroupIndex) in events" :key="eventGroupIndex">
      <AlCollapseItem v-if="eventGroup.children?.length" :title="eventGroup.label" :name="eventGroup.index">
        <div v-for="(event, eventIndex) in eventGroup.children" :key="eventIndex">
          <div :class="eventIndex === 0 ? 'mt-2' : eventIndex === eventGroup.children.length - 1 ? 'mb-2 !border-b' : ''" class="flex items-center justify-between mx-2 bg-[#f8f8f8] px-2 py-1 border border-solid border-basic-color border-b-0">
            <div>{{ event.label }}&nbsp;({{ event.key }})</div>
            <AlIcon size="18" class="cursor-pointer" @click="handleEvent('add', eventGroupIndex, eventIndex)">
              <Icon icon="material-symbols:add" />
            </AlIcon>
          </div>
          <div v-for="(_, eventItemIdx) in event.children" :key="eventItemIdx" class="flex m-2 items-center justify-between mx-2 bg-basic-color px-2 py-1 border border-solid border-basic-color">
            <div class="flex items-center">
              <AlIcon size="22" class="cursor-move text-gray-600">
                <Icon icon="mdi:drag" />
              </AlIcon>
              <div>自定义函数</div>
            </div>
            <div class="flex items-center justify-center">
              <AlIcon size="14" class="cursor-pointer text-gray-600" @click="handleEvent('edit', eventGroupIndex, eventIndex, eventItemIdx)">
                <Icon icon="grommet-icons:settings-option" />
              </AlIcon>
              <AlIcon size="18" class="cursor-pointer text-gray-600 ml-1" @click="handleEvent('delete', eventGroupIndex, eventIndex, eventItemIdx)">
                <Icon icon="ic:round-delete" />
              </AlIcon>
            </div>
          </div>
        </div>
      </AlCollapseItem>
    </template>
  </AlCollapse>
  <AlDialog v-model="visibleEvent" title="事件配置" width="1200" top="5vh" style="height: calc(100vh - 100px)">
    <div class="flex h-full w-full flex-nowrap">
      <div
        class="w-[240px] border border-solid border-basic-color mr-4 flex flex-col py-3 px-1"
        style="height: calc(100vh - 244px)"
      >
        <div class="px-2">
          <div class="border-2 px-2 py-1 rounded-md border-solid border-[#e3e3e360] hover:border-[#2563eb60] hover:bg-[#2563eb20] hover:text-[#2563eb] duration-300 flex justify-start items-center cursor-pointer">
            自定义函数
          </div>
        </div>
        <div class="px-2 pt-2">
          <div class="border-2 px-2 py-1 rounded-md border-solid border-[#e3e3e360] hover:border-[#2563eb60] hover:bg-[#2563eb20] hover:text-[#2563eb] duration-300 flex justify-start items-center cursor-pointer">
            公共函数
          </div>
        </div>
      </div>
      <div class="flex-1 border border-solid border-basic-color py-2">
        <div
          class="ml-4 mb-2 text-sm"
        >
          自定义函数编辑
        </div>
        <AlCodeEditorAtom
          ref="editor"
          v-model="code"
          style="height: calc(100vh - 290px)"
          :option="editorOptions"
        />
      </div>
    </div>
    <div class="mt-4 flex justify-end">
      <AlButton @click="visibleEvent = false">
        取消
      </AlButton>
      <AlButton type="primary" @click="confirmEvent">
        确定
      </AlButton>
    </div>
  </AlDialog>
</template>

<style lang="scss" scoped>
.el-collapse {
  --el-collapse-header-height: 38px;
}
</style>
