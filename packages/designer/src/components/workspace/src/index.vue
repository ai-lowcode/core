<script setup lang="ts">
import { AlRenderer } from '@ai-lowcode/core'
import { AlMain } from '@ai-lowcode/element-plus'
import { deepCopy, uniqueId } from '@ai-lowcode/utils'
import { onMounted, ref } from 'vue'

import { DeviceEnum } from '@/enums'
import { PAGE_COMP } from '@/global'
import { Schema } from '@/types'
import {
  createDragBoxTemplate,
  findAndModifyById,
  findAndModifyParentById,
  recursiveUpdateIds,
  removeNodeById,
  swapChildrenPositions,
} from '@/utils'

const formData = ref()

const rendererRef = ref()

const currentDevice = ref(DeviceEnum.PC)

const schema = ref<Array<Schema>>([])

const options = ref({
  submitBtn: false,
  inline: false,
  hideRequiredAsterisk: false,
  labelPosition: 'right',
  size: 'default',
  labelWidth: '125px',
  mounted: (api) => {
    console.log(api)
  },
})

/**
 * 修改 options
 * @param option
 */
function changeOptions(option) {
  options.value = option
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
 * @param component
 */
function deleteComponent(component: any) {
  // 深拷贝组件 schema
  let newSchema = deepCopy(schema.value)
  // // 生成新 schema
  newSchema = removeNodeById(newSchema, component?.attrs?.id)
  schema.value = newSchema
}

/**
 * 复制组件
 * @param component
 */
function copyComponent(component: any) {
  const compAttrs = deepCopy(component?.attrs)
  // 深拷贝组件 schema
  const newSchema = deepCopy(schema.value)
  let addedComp = null
  // // 生成新 schema
  schema.value = findAndModifyParentById(newSchema, compAttrs?.id, (node: Schema[]) => {
    // 要添加的组件
    addedComp = recursiveUpdateIds(compAttrs?.__schema)
    // 在这里自定义你的修改逻辑
    return [
      ...node,
      addedComp,
    ]
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
    addedComp.id = uniqueId()
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
 */
function changeSchema(newSchema: Array<Schema>) {
  schema.value = newSchema
}

/**
 * 清除页面
 */
function clearPage() {
  schema.value = [
    createDragBoxTemplate(
      {
        type: 'AlVueDragAble',
        id: PAGE_COMP,
        children: [
          {
            type: 'div',
            props: {
              text: 'drag-content',
            },
          },
        ],
      },
      {
        class: 'p-2 h-full',
      },
    ),
  ]
}

onMounted(() => {
  schema.value = [
    createDragBoxTemplate(
      {
        type: 'AlVueDragAble',
        id: PAGE_COMP,
        props: {},
        children: [],
      },
      {
        class: 'p-2 h-full',
      },
    ),
  ]
})

defineExpose({
  changeComponentSort,
  deleteComponent,
  copyComponent,
  insertComponent,
  currentDevice,
  changeDevice,
  changeOptions,
  clearPage,
  changeSchema,
  schema,
  options,
})
</script>

<template>
  <AlMain class="relative bg-[#F5F5F5] flex items-center justify-center" style="background-image: linear-gradient(#fafafc 14px,transparent 0),linear-gradient(90deg,transparent 14px,#373739 0);background-size: 15px 15px;">
    <div
      class="relative bg-white h-full border border-dashed border-gray-200 p-[2px] duration-300 overflow-auto shadow-workspace"
      :class="currentDevice"
    >
      <!-- 工作区表单展示区 -->
      <AlRenderer ref="rendererRef" v-model="formData" :schemas="schema" :options="options" />
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
  height: 94%;
}
</style>
