<script lang="ts" setup>
import { Schema } from '@ai-lowcode/core'
import { AlButton, AlCollapse, AlCollapseItem, AlDialog, AlIcon, AlMessage } from '@ai-lowcode/element-plus'

import { deepCopy } from '@ai-lowcode/utils'
import { Icon } from '@iconify/vue'
import { computed, inject, onMounted, ref, watch } from 'vue'

import { EventGroup } from '../types'

import { AlCodeEditorAtom } from '@/atoms'
import { DESIGNER_CTX } from '@/global'
import componentSchemaList from '@/schema'
import { DesignerContext } from '@/types'
import { addEditorThemeListener, findAndModifyById } from '@/utils'

defineOptions({
  name: 'Event',
})

const code = ref()

// 编辑器 ref
const editor = ref()

const editOption = ref()

const visibleEvent = ref(false)

const context = inject<DesignerContext>(DESIGNER_CTX)

const compSchema = computed(() => componentSchemaList.find(item => item.name === context?.selectComponent?.value.name))

const editorOptions = ref({
  mode: 'javascript',
  theme: 'default', // 主题
  readOnly: false,
  lineNumbers: true,
  lineWiseCopyCut: true,
  gutters: ['CodeMirror-lint-markers'],
  lint: true,
})

// 生命周期事件
const events = ref<Array<EventGroup>>([
  {
    index: 1,
    label: '组件事件',
    key: 'events',
    children: [],
  },
  {
    index: 2,
    label: '生命周期',
    key: 'lifeCycle',
    children: [
      {
        key: 'onBeforeMount',
        label: '被挂载之前被调用',
        children: [],
      },
      {
        key: 'onMounted',
        label: '挂载完成后执行',
        children: [],
      },
      {
        key: 'onBeforeUpdate',
        label: '更新DOM之前调用',
        children: [],
      },
      {
        key: 'onUpdated',
        label: '更新DOM之后调用',
        children: [],
      },
      {
        key: 'onBeforeUnmount',
        label: '被卸载之前调用',
        children: [],
      },
      {
        key: 'onUnmounted',
        label: '被卸载之后调用',
        children: [],
      },
      {
        key: 'onErrorCaptured',
        label: '后代组件错误时调用',
        children: [],
      },
    ],
  },
])

watch(() => context?.selectComponent, () => {
  findAndModifyById(deepCopy(context?.workspaceRef?.value.schema), context?.selectComponent?.value.id, (node: Schema) => {
    const newEvents: any = []
    compSchema.value?.events?.()?.forEach((e) => {
      newEvents.push({
        ...e,
        children: node?.events?.[e.key]?.__event?.children || [],
      })
    })
    events.value[0].children = newEvents
    const lifeEvents: any = []
    events.value[1].children.forEach((e) => {
      lifeEvents.push({
        ...e,
        children: node?.lifeCycle?.[e.key]?.__event?.children || [],
      })
    })
    events.value[1].children = lifeEvents
  })
}, {
  deep: true,
})

/**
 * 编辑事件
 * @param option
 * @param eventGroupIndex
 * @param eventIndex
 * @param eventItemIdx
 */
function handleEvent(option?: string, eventGroupIndex?: number, eventIndex?: number, eventItemIdx?: number) {
  if (option === 'edit') {
    editOption.value = {
      option,
      eventGroupIndex,
      eventIndex,
      eventItemIdx,
    }
    code.value = events.value[eventGroupIndex!].children[eventIndex!].children?.[eventItemIdx!]?.code
  }
  if (option === 'add') {
    editOption.value = {
      option,
      eventGroupIndex,
      eventIndex,
      eventItemIdx,
    }
    code.value = ''
  }
  if (option === 'delete') {
    editOption.value = null
    events.value[eventGroupIndex!].children[eventIndex!].children?.splice(eventItemIdx!, 1)
    return
  }
  visibleEvent.value = true
}

/**
 * 确定事件
 */
function confirmEvent() {
  try {
    new Function('api', code.value)
  }
  catch (e) {
    console.log(e)
    AlMessage.error('函数语法错误')
    return
  }
  // 当前操作事件
  const currentEvent = events.value[editOption.value?.eventGroupIndex].children[editOption.value?.eventIndex]
  // 添加事件
  if (editOption.value?.option === 'add') {
    if (currentEvent.children?.length) {
      currentEvent.children.push({
        code: code.value,
      })
    }
    else {
      currentEvent.children = [{
        code: code.value,
      }]
    }
  }
  // 编辑事件
  if (editOption.value?.option === 'edit') {
    currentEvent.children?.splice(editOption.value?.idx, 1, {
      code: code.value,
    })
  }
  // 调用函数，查找并修改
  const newNodes = findAndModifyById(deepCopy(context?.workspaceRef?.value.schema), context?.selectComponent?.value.id, (node: Schema) => {
    const index = deepCopy(events.value[editOption.value?.eventGroupIndex].children[editOption.value?.eventIndex])
    // 修改事件
    node[events.value[editOption.value?.eventGroupIndex].key as keyof Schema] = {
      ...node[events.value[editOption.value?.eventGroupIndex].key as keyof Schema],
      [index.key]: {
        __event: index,
        async run(...arg: any) {
          const elementPlus = await import('@ai-lowcode/element-plus')
          this?.__event?.children?.map((event: any) => {
            (new Function('api', event?.code)).bind({
              arg,
              instance: this,
              elementPlus,
            })(arg)
          })
        },
      },
    }
  })
  // 设置事件
  context?.workspaceRef?.value.changeSchema(newNodes)
  visibleEvent.value = false
}

onMounted(() => {
  addEditorThemeListener((hasDark: boolean) => {
    if (hasDark)
      editorOptions.value.theme = 'dracula'
    else
      editorOptions.value.theme = 'default'
  })
})
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
