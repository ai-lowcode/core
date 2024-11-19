<script lang="ts" setup>
import { AlButton, AlInput, AlTree } from '@ai-lowcode/component-adapter'
import { inject, ref } from 'vue'

import { DESIGNER_CTX } from '../../../designer/src/global'
import { DesignerContext } from '../../../designer/src/types'

defineOptions({
  name: 'AlVariableBindAtom',
})

const props = defineProps<{
  confirmChange: Function
  cancelChange: Function
  exposeApi: any
  modelValue: any
}>()

const emits = defineEmits(['update:modelValue', 'change'])

const context = inject<DesignerContext>(DESIGNER_CTX)

const variableBind = ref()

interface TreeNode {
  label: string
  children?: TreeNode[]
}

interface InputObject {
  [key: string]: any
}
function convertToTree(obj: InputObject, parentKey: string = ''): TreeNode[] {
  return Object.entries(obj).map(([key, value]) => {
    const currentKey = parentKey ? `${parentKey}.${key}` : key
    const node: TreeNode = { label: currentKey }

    if (typeof value === 'object' && value !== null) {
      const children = convertToTree(value, currentKey)
      if (children.length > 0) {
        node.children = children
      }
    }

    return node
  })
}

const formDataTree = ref(convertToTree(context?.workspaceRef?.value?.rendererRef?.formData))

function handleAdd(e) {
  variableBind.value = `{{${e.label}}}`
}

function handleSave() {
  console.log(props.exposeApi.formData.value)
  emits('update:modelValue', variableBind)
  props?.confirmChange?.()
  emits('change')
}

function handleRemove() {
  variableBind.value = null
  cancel()
}

function cancel() {
  props?.cancelChange?.()
}
</script>

<template>
  <div class="flex flex-col">
    <div class="flex flex-row">
      <div class="w-[200px]">
        <div class="font-medium bg-[#f3f3f3] px-2 py-[1px]">
          计算函数
        </div>
      </div>
      <div class="flex-1 border-l border-solid border-gray-200">
        <div class="font-medium bg-[#f3f3f3] px-2 py-[1px]">
          表达式
        </div>
        <div class="p-2">
          <AlInput v-model="variableBind" type="textarea" placeholder="请输入表达式" :rows="10" />
        </div>
      </div>
      <div class="w-[300px] h-[470px] overflow-auto border-l border-solid border-gray-200">
        <div class="font-medium bg-[#f3f3f3] px-2 py-[1px]">
          参数和变量
        </div>
        <div>
          <AlTree
            class="select-none"
            :data="formDataTree"
            default-expand-all
            :expand-on-click-node="false"
            @node-click="handleAdd"
          />
        </div>
      </div>
    </div>
    <div class="flex justify-between items-center w-full mt-[20px]">
      <AlButton type="danger" @click="handleRemove">
        移除绑定
      </AlButton>
      <div class="flex justify-end items-center">
        <AlButton @click="cancel">
          取消
        </AlButton>
        <AlButton type="primary" @click="handleSave">
          确定
        </AlButton>
      </div>
    </div>
  </div>
</template>
