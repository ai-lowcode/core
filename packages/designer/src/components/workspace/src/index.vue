<script setup lang="ts">
import { AlRenderer, Schema } from '@ai-lowcode/core'
import { AlMain } from '@ai-lowcode/element-plus'
import { webStorage } from '@ai-lowcode/hooks'
import { AlHttp } from '@ai-lowcode/request'
import {
  convertStringsToFunctions,
  deepCopy,
  isJsonStringTryCatch,
  uniqueId,
} from '@ai-lowcode/utils'
import { onMounted, ref } from 'vue'

import { DeviceEnum } from '@/enums'
import { PAGE_COMP } from '@/global'
import {
  createDragBoxTemplate,
  createPageTemplate,
  findAndModifyById,
  findAndModifyParentById,
  recursiveUpdateIds,
  removeNodeById,
  swapChildrenPositions,
} from '@/utils'

const formData = ref()

const rendererRef = ref()

const workspaceScale = ref(1)

const currentSelectPage = ref(webStorage.getStorageFromKey('__current_select_page'))

const currentDevice = ref(DeviceEnum.PC)

const schema = ref<Array<Schema>>([])

const selectComponent = ref<Schema>({
  id: PAGE_COMP,
  name: PAGE_COMP,
} as Schema)

function changeSelectPage(page: any) {
  currentSelectPage.value = page
  webStorage.setStorage('__current_select_page', page)
  schema.value = isJsonStringTryCatch(page?.content) ? convertStringsToFunctions(JSON.parse(page?.content)) : clearPage()
}

function changeWorkspaceScale(scale: number) {
  workspaceScale.value = scale
}

/**
 * 修改设备
 * @param device
 */
function changeDevice(device: DeviceEnum) {
  currentDevice.value = device
}

/**
 * 改变组件顺序
 */
function changeComponentSort(fromId: string, toId: string, oldIndex: number, newIndex: number) {
  // 深拷贝组件 schema
  const newSchema = deepCopy(schema.value)
  schema.value = swapChildrenPositions(newSchema, fromId, toId, oldIndex, newIndex)
}

/**
 * 删除组件
 * @param componentId
 */
function deleteComponent(componentId: string) {
  // 深拷贝组件 schema
  let newSchema = deepCopy(schema.value)
  // // 生成新 schema
  newSchema = removeNodeById(newSchema, componentId)
  schema.value = newSchema
}

/**
 * 复制组件
 * @param componentId
 * @param componentSchema
 */
function copyComponent(componentId: string, componentSchema: Schema) {
  let addedComp = null
  // 深拷贝组件 schema
  const newSchema = deepCopy(schema.value)
  // // 生成新 schema
  schema.value = findAndModifyParentById(newSchema, componentId, (node: Schema[]) => {
    // 要添加的组件
    addedComp = recursiveUpdateIds(componentSchema)
    const findIndex = node?.findIndex(n => n.children?.[0]?.id === selectComponent.value?.id)
    // debugger
    node.splice(findIndex + 1, 0, addedComp)
    // 在这里自定义你的修改逻辑
    return node
  })
  return addedComp
}

/**
 * 新增组件
 * @param addedComp
 * @param componentId
 * @param index
 */
function insertComponent(addedComp: Schema, componentId?: string, index?: number): Schema {
  // 深拷贝组件 schema
  const newSchema = deepCopy(schema.value)
  // 生成新 schema
  if (addedComp?.id) {
    addedComp.id = `__${uniqueId()}`
    schema.value = findAndModifyById(newSchema, componentId, (node: Schema) => {
      if (node?.children?.length) {
        if (index) {
          (node.children as Schema[])[index!] = createDragBoxTemplate(addedComp)
        }
        else {
          (node.children as Schema[])[node?.children?.length] = createDragBoxTemplate(addedComp)
        }
      }
      else {
        node.children = [createDragBoxTemplate(addedComp)]
      }
    })
  }
  return addedComp
}

/**
 * 修改 schema
 * @param newSchema
 * @param update
 */
function changeSchema(newSchema: Array<Schema>, update?: boolean) {
  schema.value = newSchema
  if (update)
    updateRenderer()
}

function updateRenderer() {
  rendererRef.value.updateRender()
}

/**
 * 清除页面
 */
function clearPage() {
  schema.value = [
    createDragBoxTemplate(
      createPageTemplate(),
      {
        class: 'p-2 h-full',
      },
    ),
  ]
}

async function initPageSchema() {
  if (currentSelectPage.value?.id) {
    const { data } = await AlHttp.get(`/lowcode/pages/${currentSelectPage.value?.id}`)
    schema.value = isJsonStringTryCatch(data?.content) ? convertStringsToFunctions(JSON.parse(data?.content)) : clearPage()
    console.log(schema.value, schema.value[0].children[0])
  }
}

function changeComponentSelect(comp: Schema) {
  if (comp?.id !== selectComponent.value?.id)
    selectComponent.value = comp
}

onMounted(() => {
  initPageSchema()
})

defineExpose({
  changeComponentSort,
  deleteComponent,
  copyComponent,
  insertComponent,
  currentDevice,
  changeDevice,
  clearPage,
  changeSchema,
  workspaceScale,
  currentSelectPage,
  changeSelectPage,
  changeWorkspaceScale,
  schema,
  selectComponent,
  rendererRef,
  changeComponentSelect,
  updateRenderer,
})
</script>

<template>
  <AlMain class="relative bg-workspace-white bg-[#f5f5f5] dark:bg-workspace-dark dark:bg-[#18181c] flex items-center justify-center" style="background-size: 15px 15px;">
    <div
      class="relative bg-basic-color h-full p-[2px] duration-300 overflow-auto workspace shadow-workspace"
      :style="`transform: scale(${workspaceScale});`"
      :class="currentDevice"
    >
      <!-- 工作区表单展示区 -->
      <AlRenderer ref="rendererRef" v-model="formData" :schemas="schema" />
    </div>
  </AlMain>
</template>

<style lang="scss" scoped>
.mobile {
  width: 390px;
  height: 694px;
}

.pad {
  width: 780px;
  height: 694px;
}

.pc{
  width: 100%;
  height: 100%;
}
</style>
