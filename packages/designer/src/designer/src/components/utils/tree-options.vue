<script lang="ts" setup name="TreeOptions">
import { AlInput, AlTree } from '@ai-lowcode/element-plus'
import { deepCopy } from '@ai-lowcode/utils'
import { computed, defineEmits, defineProps, onMounted, ref } from 'vue'

const props = defineProps<{
  modelValue: Array<any>
  columns: any
}>()

const emits = defineEmits(['update:modelValue'])

const value = ref([...deepCopy(props.modelValue || [])])

const overColumns = computed(() => {
  if (!props.columns) {
    return {
      label: 'label',
      value: 'value',
    }
  }
  return {
    label: props.columns.label || 'label',
    value: props.columns.value || 'value',
  }
})

function tidyValue() {
  return deepCopy(value.value)
}

function change() {
  emits('update:modelValue', tidyValue())
}

function add(node: any) {
  const parent = node.parent
  const children = parent.data.children || parent.data
  children.push({})
}

function append(data: any) {
  if (!data.children) {
    data.children = []
  }
  data.children.push({})
}

function remove(node: any, data: any) {
  const parent = node.parent
  if (parent.data.children) {
    parent.data.children.splice(parent.data.children.indexOf(data), 1)
    if (!parent.data.children.length) {
      delete parent.data.children
    }
  }
  else {
    parent.data.splice(parent.data.indexOf(data), 1)
  }
  change()
}

onMounted(() => {
  if (!value.value.length) {
    value.value = [{}]
  }
})
</script>

<template>
  <div class="_fd-tree-opt">
    <AlTree
      :data="value"
      node-key="index"
      :expand-on-click-node="false"
    >
      <template #default="{ node, data }">
        <div class="_fd-tree-opt-node">
          <AlInput
            v-model="data[overColumns.label]" class="_fd-tree-opt-first"
            @blur="change"
          />
          <AlInput v-model="data[overColumns.value]" class="_fd-tree-opt-last" @blur="change">
            <template #append>
              <div class="_fd-tree-opt-btn" @click="add(node)">
                <i class="fc-icon icon-add" />
              </div>
              <div class="_fd-tree-opt-btn" @click="append(data)">
                <i class="fc-icon icon-add-child" />
              </div>
              <div class="_fd-tree-opt-btn _fd-tree-opt-danger" @click="remove(node, data)">
                <i class="fc-icon icon-delete" />
              </div>
            </template>
          </AlInput>
        </div>
      </template>
    </AlTree>
  </div>
</template>

<style>
._fd-tree-opt ._fd-tree-opt-btn {
    justify-content: center;
    float: left;
    width: 18px;
    height: 19px;
    padding-bottom: 1px;
    line-height: 20px;
    color: #fff;
    text-align: center;
    cursor: pointer;
    background-color: #2f73ff;
}

._fd-tree-opt-node {
    display: flex;
    align-items: center;
}

._fd-tree-opt-first {
    width: 60px;
    margin-right: 5px;
}

._fd-tree-opt-last {
    width: 110px;
}

._fd-tree-opt ._fd-tree-opt-danger {
    background-color: #ff2d2e;
    border-radius: 0 2px 2px 0;
}

._fd-tree-opt .el-tree-node__content {
    height: 28px;
    margin-bottom: 3px;
}

._fd-tree-opt .el-input__inner {
    border-right: 0 none;
}

._fd-tree-opt .el-input-group__append {
    width: 90px;
    padding-right: 2px;
    padding-left: 1px;
    background: #fff;
}
</style>
