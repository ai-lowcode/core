<script setup lang="ts">
import { AlMain } from '@ai-lowcode/element-plus'

// 导入 form-create
import { deepCopy, uniqueId } from '@ai-lowcode/utils'
import formCreate from '@form-create/element-ui'
import { onMounted, ref } from 'vue'

import { DeviceEnum } from '@/enums'
import { PAGE_COMP } from '@/global'
import AlDragBox from '@/layout/workspace/components/drag-box.vue'
import { Schema } from '@/types'
import { createDragBoxTemplate, removeAlDragBoxAndPromoteChildren } from '@/utils'

// 获取 formCreate 组件
const FormCreate = formCreate.$form()

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

const api = ref()

function changeOptions(option) {
  options.value = option
}

function changeDevice(device: DeviceEnum) {
  currentDevice.value = device
}

function changeComponentSort() {
  // 深拷贝组件 schema, vueDrag会自动更新数据
  schema.value = deepCopy(schema.value)
}

function deleteComponent(field: string) {
  // 深拷贝组件 schema
  const newSchema = deepCopy(schema.value)
  // 过滤组件 index
  const index = (newSchema[0].children as Array<Schema>).findIndex(item => item.field === field);
  // 生成新 schema
  (newSchema[0].children as Array<Schema>).splice(index, 1)
  if (newSchema[0].children.length === 0) {
    newSchema[0].children.push({
      type: 'div',
      props: {
        text: 'drag-content',
      },
    })
  }
  schema.value = newSchema
}

function copyComponent(field: string) {
  // 深拷贝组件 schema
  const newSchema = deepCopy(schema.value)
  // 过滤要添加的组件
  const addedComp = (removeAlDragBoxAndPromoteChildren(newSchema[0].children) as Array<Schema>).find(item => item?.field === field)
  // 过滤组件 index
  const addedCompIndex = (removeAlDragBoxAndPromoteChildren(newSchema[0].children) as Array<Schema>).findIndex(item => item?.field === field)
  // 生成新 schema
  if (addedComp?.field) {
    newSchema[0].children.splice(addedCompIndex + 1, 0, createDragBoxTemplate(
      {
        ...addedComp,
        field: uniqueId(),
      },
    ))
  }
  schema.value = newSchema
  return addedComp
}

function insertComponent(addedComp: Schema, index?: number) {
  // 深拷贝组件 schema
  const newSchema = deepCopy(schema.value)
  // 生成新 schema
  if (addedComp?.field) {
    addedComp.field = uniqueId()
    newSchema[0].children.splice(index ?? newSchema[0].children?.length, 0, createDragBoxTemplate(addedComp))
  }
  schema.value = newSchema
  return addedComp
}

function clearPage() {
  schema.value = [
    {
      type: 'AlVueDragAble',
      field: PAGE_COMP,
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
  ]
}

onMounted(() => {
  schema.value = [
    {
      type: 'AlVueDragAble',
      field: PAGE_COMP,
      props: {},
      children: [
        createDragBoxTemplate({
          type: 'elButton',
          title: '按钮11111',
          field: uniqueId(),
          children: ['按钮11111'],
        }),
        createDragBoxTemplate({
          type: 'elButton',
          title: '按钮2222',
          field: uniqueId(),
          children: ['按钮2222'],
        }),
        createDragBoxTemplate({
          type: 'elButton',
          title: '按钮33333',
          field: uniqueId(),
          children: ['按钮33333'],
        }),
      ],
    },
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
  schema,
  options,
  api,
})
</script>

<template>
  <AlMain class="relative bg-[#F5F5F5] flex items-center justify-center" style="background-image: linear-gradient(#fafafc 14px,transparent 0),linear-gradient(90deg,transparent 14px,#373739 0);background-size: 15px 15px;">
    <div
      class="relative bg-white h-full border border-dashed border-gray-200 p-[2px] duration-300 overflow-auto shadow-workspace"
      :class="currentDevice"
    >
      <AlDragBox :field="PAGE_COMP">
        <!-- 工作区表单展示区 -->
        <FormCreate v-model:api="api" :rule="schema" :option="options" />
      </AlDragBox>
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
