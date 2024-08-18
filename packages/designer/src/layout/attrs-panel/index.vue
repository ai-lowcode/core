<script setup lang="ts">
import {
  AlButton,
  AlCollapse,
  AlCollapseItem,
  AlDialog,
  AlIcon,
  AlMessage,
  AlTabPane,
  AlTabs,
} from '@ai-lowcode/element-plus'
import { Icon } from '@iconify/vue'
import { inject, ref, toRaw } from 'vue'

import { DESIGNER_CTX } from '@/global'
import AlEventEditor from '@/layout/attrs-panel/components/event-editor.vue'
import { Api, DesignerContext } from '@/types'

const lifeCycle = ref([
  {
    key: 'beforeMount',
    children: [],
  },
  {
    key: 'mounted',
    children: [],
  },
  {
    key: 'beforeUpdate',
    children: [],
  },
  {
    key: 'updated',
    children: [],
  },
  {
    key: 'beforeUnmount',
    children: [],
  },
  {
    key: 'unmounted',
    children: [],
  },
  {
    key: 'errorCaptured',
    children: [],
  },
])

const visibleEvent = ref(false)

const editOption = ref()

const context = inject<DesignerContext>(DESIGNER_CTX)

const editorOptions = ref({
  el: 'monaco',
  options: {
    language: 'javascript',
    code: `function demo() {
  console.log(1212)
}
demo()`,
  },
})

const editor = ref()

function editorValueChange(code: string) {
  editorOptions.value.options.code = code
}

function editEvent(event?: string, idx?: number, option?: string, index?: number) {
  if (option === 'edit') {
    editOption.value = {
      option,
      idx,
      index,
    }
    editorOptions.value.options.code = event
  }
  if (option === 'add') {
    editOption.value = {
      option,
      idx,
      index,
    }
  }
  if (option === 'delete') {
    editOption.value = null
    lifeCycle.value[index].children.splice(idx, 1)
    return
  }
  visibleEvent.value = true
}

function confirmEvent() {
  editorOptions.value.options.code = toRaw(editor.value.editor).getValue()
  try {
    new Function('api', editorOptions.value.options.code)
  }
  catch (e) {
    console.log(e)
    AlMessage.error('函数语法错误')
    return
  }
  if (editOption.value?.option === 'add')
    lifeCycle.value[editOption.value?.index].children.push(editorOptions.value.options.code)
  if (editOption.value?.option === 'edit')
    lifeCycle.value[editOption.value?.index].children.splice(editOption.value?.idx, 1, editorOptions.value.options.code)
  context?.workspaceRef?.value.changeOptions({
    ...context.workspaceRef.value.options,
    mounted: async (api: Api) => {
      const elementPlus = await import('@ai-lowcode/element-plus')
      lifeCycle.value[editOption.value?.index]?.children.map((event) => {
        (new Function('api', event)).bind({
          api,
          elementPlus,
        })(api)
      })
    },
  })
  visibleEvent.value = false
}
</script>

<template>
  <div class="ml-[10px] w-[300px] h-full">
    <AlTabs
      v-model="activeTab"
      type="border-card"
      class="h-full overflow-auto attrs-content"
      stretch
    >
      <AlTabPane
        label="属性" name="props"
      >
        <AlCollapse :model-value="['1']">
          <AlCollapseItem title="组件信息" name="1">
            1212
          </AlCollapseItem>
        </AlCollapse>
      </AlTabPane>
      <AlTabPane label="外观" name="style">
        <!-- 外观配置项 -->
      </AlTabPane>
      <AlTabPane label="事件" name="event">
        <AlCollapse :model-value="['1']">
          <AlCollapseItem title="组件事件" name="1">
            <div class="flex items-center justify-between m-2 bg-[#f8f8f8] px-2 py-1 border border-solid border-[#d9d9d9]" @click="editEvent(undefined, undefined, 'add', index)">
              <div>值变化时</div>
              <AlIcon size="18" class="cursor-pointer">
                <Icon icon="material-symbols:add" />
              </AlIcon>
            </div>
          </AlCollapseItem>
          <AlCollapseItem title="生命周期" name="2">
            <div v-for="(item, index) in lifeCycle" :key="index">
              <div :class="index === 0 ? 'mt-2' : index === lifeCycle.length - 1 || item.children.length ? 'mb-2 !border-b' : ''" class="flex items-center justify-between mx-2 bg-[#f8f8f8] px-2 py-1 border border-solid border-[#d9d9d9] border-b-0">
                <div>{{ item.key }}</div>
                <AlIcon size="18" class="cursor-pointer" @click="editEvent(undefined, undefined, 'add', index)">
                  <Icon icon="material-symbols:add" />
                </AlIcon>
              </div>
              <div v-for="(event, idx) in item.children" :key="idx" class="flex m-2 items-center justify-between mx-2 bg-white px-2 py-1 border border-solid border-[#d9d9d9]">
                <div class="flex items-center">
                  <AlIcon size="22" class="cursor-move text-gray-600">
                    <Icon icon="mdi:drag" />
                  </AlIcon>
                  <div>自定义函数</div>
                </div>
                <div class="flex items-center justify-center">
                  <AlIcon size="14" class="cursor-pointer text-gray-600" @click="editEvent(event, idx, 'edit', index)">
                    <Icon icon="grommet-icons:settings-option" />
                  </AlIcon>
                  <AlIcon size="18" class="cursor-pointer text-gray-600 ml-1" @click="editEvent(event, idx, 'delete', index)">
                    <Icon icon="ic:round-delete" />
                  </AlIcon>
                </div>
              </div>
            </div>
          </AlCollapseItem>
        </AlCollapse>
      </AlTabPane>
    </AlTabs>
    <AlDialog v-model="visibleEvent" title="事件配置" width="1200" top="5vh" style="height: calc(100vh - 100px)">
      <div class="flex h-full w-full flex-nowrap">
        <div
          class="w-[240px] border border-solid border-[#d9d9d9] mr-4 flex flex-col py-3 px-1"
          style="height: calc(100vh - 244px)"
        >
          <div class="px-2">
            <div class="border-2 px-2 py-1 rounded-md border-solid border-[#d9d9d960] hover:border-[#2563eb60] hover:bg-[#2563eb20] hover:text-[#2563eb] duration-300 flex justify-start items-center cursor-pointer">
              自定义函数
            </div>
          </div>
          <div class="px-2 pt-2">
            <div class="border-2 px-2 py-1 rounded-md border-solid border-[#d9d9d960] hover:border-[#2563eb60] hover:bg-[#2563eb20] hover:text-[#2563eb] duration-300 flex justify-start items-center cursor-pointer">
              公共函数
            </div>
          </div>
        </div>
        <div class="flex-1 border border-solid border-[#d9d9d9] py-2">
          <div
            class="ml-4 mb-2 text-sm"
          >
            自定义函数编辑
          </div>
          <AlEventEditor
            ref="editor"
            style="height: calc(100vh - 290px)"
            :option="editorOptions"
            :on-change="editorValueChange"
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
  </div>
</template>

<style lang="scss" scoped>
:deep(.attrs-content) {
  .el-tabs__content {
    padding: 0;
  }

  .el-collapse-item__header {
    padding-left: 10px!important;
  }

  .el-collapse-item__content {
    padding-bottom: 0;
  }
}

.el-collapse {
  --el-collapse-header-height: 38px;
  --el-collapse-header-text-color: #6e6e6e;
  --el-collapse-header-bg-color:#f8f8f8;
  --el-collapse-border-color: #d9d9d9;
}
</style>
