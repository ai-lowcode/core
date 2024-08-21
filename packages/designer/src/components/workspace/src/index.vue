<script setup lang="ts">
import { AlMain } from '@ai-lowcode/element-plus'

// 导入 form-create
import { deepCopy, uniqueId } from '@ai-lowcode/utils'
import { onMounted, ref } from 'vue'

import { AlRenderer } from '@/components/renderer'
import { DeviceEnum } from '@/enums'
import { PAGE_COMP } from '@/global'
import componentSchemaList from '@/schema'
import { Schema } from '@/types'
import { createDragBoxTemplate, removeAlDragBoxAndPromoteChildren } from '@/utils'

const currentDevice = ref(DeviceEnum.PC)

const rendererRef = ref()

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

const formData = ref()

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
function changeComponentSort() {
  // 深拷贝组件 schema, vueDrag会自动更新数据
  schema.value = deepCopy(schema.value)
}

/**
 * 删除组件
 * @param id
 */
function deleteComponent(id: string) {
  // 深拷贝组件 schema
  const newSchema = deepCopy(schema.value)
  // 过滤组件 index
  const index = (newSchema[0].children[0].children as Array<Schema>).findIndex(item => item.id === id);
  // 生成新 schema
  (newSchema[0].children[0].children as Array<Schema>).splice(index, 1)
  if (newSchema[0].children[0].children.length === 0) {
    newSchema[0].children[0].children.push({
      type: 'div',
      props: {
        text: 'drag-content',
      },
    })
  }
  schema.value = newSchema
}

/**
 * 复制组件
 * @param id
 */
function copyComponent(id: string) {
  // 深拷贝组件 schema
  const newSchema = deepCopy(schema.value)
  // 过滤要添加的组件
  const addedComp = (removeAlDragBoxAndPromoteChildren(newSchema[0].children[0].children) as Array<Schema>).find(item => item?.id === id)
  // 过滤组件 index
  const addedCompIndex = (removeAlDragBoxAndPromoteChildren(newSchema[0].children[0].children) as Array<Schema>).findIndex(item => item?.id === id)
  // 生成新 schema
  if (addedComp?.id) {
    newSchema[0].children[0].children.splice(addedCompIndex + 1, 0, createDragBoxTemplate(
      {
        ...addedComp,
        id: uniqueId(),
        field: `${addedComp?.field}__${uniqueId()}`,
      },
    ))
  }
  schema.value = newSchema
  return addedComp
}

/**
 * 新增组件
 * @param addedComp
 * @param index
 */
function insertComponent(addedComp: Schema, index?: number) {
  // 深拷贝组件 schema
  const newSchema = deepCopy(schema.value)
  // 生成新 schema
  if (addedComp?.id) {
    addedComp.id = uniqueId()
    newSchema[0].children[0].children.splice(index ?? newSchema[0].children[0].children?.length, 0, createDragBoxTemplate(addedComp))
  }
  schema.value = newSchema
  return addedComp
}

function changeSchema(newSchema: Array<Schema>) {
  schema.value = newSchema
}

function clearPage() {
  schema.value = [
    createDragBoxTemplate(
      {
        type: 'AlVueDragAble',
        id: PAGE_COMP,
        props: {},
        children: [
          {
            type: 'div',
            props: {
              text: 'drag-content',
            },
          },
        ],
      },
      true,
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
        children: [
          createDragBoxTemplate(componentSchemaList.find(item => item.name === 'input')?.schema()),
        ],
      },
      true,
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
