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
import { deepCopy } from '@ai-lowcode/utils'
import { Icon } from '@iconify/vue'
import { computed, inject, ref, toRaw, watch } from 'vue'

import AlEventEditor from './components/event-editor.vue'

import { FieldAttrsSchema } from '@/components/attrs-panel/src/schema/field.ts'
import { FormAttrsSchema } from '@/components/attrs-panel/src/schema/form.ts'
import { ValidateAttrsSchema } from '@/components/attrs-panel/src/schema/validate.ts'
import { AlRenderer } from '@/components/renderer'
import { DESIGNER_CTX, PAGE_COMP } from '@/global'
import componentSchemaList from '@/schema'
import { Api, DesignerContext, Schema } from '@/types'

const lifeCycle = ref([
  {
    key: 'onBeforeMount',
    children: [],
  },
  {
    key: 'onMounted',
    children: [],
  },
  {
    key: 'onBeforeUpdate',
    children: [],
  },
  {
    key: 'onUpdated',
    children: [],
  },
  {
    key: 'onBeforeUnmount',
    children: [],
  },
  {
    key: 'onUnmounted',
    children: [],
  },
  {
    key: 'onErrorCaptured',
    children: [],
  },
])

const editor = ref()

const editOption = ref()

const visibleEvent = ref(false)

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

function editEvent(event?: string, idx?: number, option?: string, index?: number) {
  if (option === 'edit') {
    editOption.value = {
      option,
      idx,
      index,
    }
    editorOptions.value.options.code = event!
    toRaw(editor.value.editor)?.setValue(event)
  }
  if (option === 'add') {
    editOption.value = {
      option,
      idx,
      index,
    }
    editorOptions.value.options.code = ''
  }
  if (option === 'delete') {
    editOption.value = null
    lifeCycle.value[index!].children.splice(idx!, 1)
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
  // 调用函数，查找并修改
  const newNodes = findAndModifyById(context?.workspaceRef?.value.schema, context?.selectComponent?.value.id, (node: Schema) => {
    const index = deepCopy(lifeCycle.value[editOption.value?.index])
    node.lifeCycle = {
      ...node.lifeCycle,
      [index.key]: async (api: Api) => {
        console.log(index)
        const elementPlus = await import('@ai-lowcode/element-plus')
        index.children.map((event: string) => {
          (new Function('api', event)).bind({
            api,
            elementPlus,
          })(api)
        })
      },
    }
  })
  console.log('newNodes==', newNodes)
  context?.workspaceRef?.value.changeSchema(newNodes)
  visibleEvent.value = false
}

const activeTab = ref('props')

const compSchema = computed(() => componentSchemaList.find(item => item.name === context?.selectComponent?.value.name)?.props())

const basicRef = ref()

const options = ref({
  global: {
    input: {
      modelEmit: 'blur',
    },
  },
  form: {
    labelPosition: 'top',
    size: 'small',
  },
  submitBtn: false,
  mounted: (fapi: any) => {
    fapi.activeRule = context?.selectComponent
    fapi.setValue(fapi.options.formData || {})
  },
})

const formData = ref()

function findAndModifyById(nodes, targetId, callback) {
  // 遍历所有节点
  return nodes.map((node) => {
    // 创建当前节点的浅拷贝
    const newNode = { ...node }

    // 如果当前节点的 id 匹配目标 id，则调用回调函数进行修改
    if (newNode.id === targetId) {
      callback(newNode)
    }

    // 如果当前节点有子节点，递归处理子节点
    if (newNode.children && newNode.children.length > 0) {
      newNode.children = findAndModifyById(newNode.children, targetId, callback)
    }

    return newNode
  })
}

watch(() => formData.value, (newValue) => {
  // 调用函数，查找并修改
  const newNodes = findAndModifyById(context?.workspaceRef?.value.schema, context?.selectComponent?.value.id, (node: Schema) => {
    node.props = {
      ...node.props,
      ...newValue.form,
    }
  })
  context?.workspaceRef?.value.changeSchema(newNodes)
}, {
  deep: true,
})

watch(() => context?.selectComponent, (newValue) => {
  findAndModifyById(context?.workspaceRef?.value.schema, newValue?.value.id, (node: Schema) => {
    formData.value = {
      form: node.props,
    }
    basicRef.value.updateComponent(formData.value)
  })
}, {
  deep: true,
})
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
        <AlCollapse :model-value="['1', '2', '3']">
          <AlCollapseItem v-if="context?.selectComponent?.value?.id !== PAGE_COMP" title="基础属性" name="1">
            <div class="p-4">
              <AlRenderer :schemas="FieldAttrsSchema" :options="options" />
            </div>
          </AlCollapseItem>
          <AlCollapseItem title="组件属性" name="2">
            <div class="p-4">
              <AlRenderer ref="basicRef" v-model="formData" :schemas="context?.selectComponent?.value?.id === PAGE_COMP ? FormAttrsSchema : compSchema!" :options="options" />
            </div>
          </AlCollapseItem>
          <AlCollapseItem v-if="context?.selectComponent?.value?.id !== PAGE_COMP" title="验证属性" name="3">
            <div class="p-4">
              <AlRenderer :schemas="ValidateAttrsSchema" :options="options" />
            </div>
          </AlCollapseItem>
        </AlCollapse>
      </AlTabPane>
      <AlTabPane label="外观" name="style">
        <!-- 外观配置项 -->
      </AlTabPane>
      <AlTabPane label="事件" name="event">
        <AlCollapse :model-value="['1']">
          <AlCollapseItem title="组件事件" name="1">
            <div class="flex items-center justify-between m-2 bg-[#f8f8f8] px-2 py-1 border border-solid border-[#d9d9d9]">
              <div>值变化时</div>
              <AlIcon size="18" class="cursor-pointer" @click="editEvent(undefined, undefined, 'add')">
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
