<script lang="ts" setup name="FieldInput">
import { AlInput } from '@ai-lowcode/element-plus'
import { isArray, uniqueId } from '@ai-lowcode/utils'
import { computed, inject, ref, watch } from 'vue'

import errorMessage from '../utils/message'

const props = defineProps<{
  modelValue: string
}>()

const emits = defineEmits(['update:modelValue'])
const designer = inject<any>('designer', null)
const t = computed(() => designer.setupState.t)

const value = ref(props.modelValue || '')
const oldValue = ref('')

const activeRule = computed(() => designer.setupState.activeRule)
const fieldReadonly = computed(() => designer.setupState.fieldReadonly)

watch(() => props.modelValue, (n) => {
  value.value = n
})

function getSubFormChildren(rule) {
  let ctx = rule.__fc__ && rule.__fc__.parent
  while (ctx) {
    if (ctx.rule._menu && ['array', 'object'].includes(ctx.rule._menu.subForm)) {
      return ctx.rule.children || []
    }
    else {
      ctx = ctx.parent
    }
  }
  return null
}

function getSubChildren() {
  let subChildren = getSubFormChildren(activeRule.value) || []
  subChildren = isArray(subChildren) ? subChildren : designer.setupState.children
  return subChildren
}

function getSubFieldChildren() {
  const subChildren = getSubChildren()
  const list: any = []
  const getRule = (children: any) => {
    children && children.forEach((rule: any) => {
      if (rule && rule._fc_drag_tag && rule.field) {
        list.push({ ...rule, children: [] })
      }
      else if (rule && rule.children) {
        getRule(rule.children)
      }
    })
    return list
  }
  return getRule(subChildren)
}

function checkValue() {
  const oldField = oldValue.value
  let field = (value.value || '').replace(/\s/g, '')
  if (!field) {
    errorMessage(t.value('computed.fieldEmpty'))
    return oldField
  }
  else if (!/^[a-z]/i.test(field)) {
    errorMessage(t.value('computed.fieldChar'))
    return oldField
  }
  else if (oldField !== field) {
    const flag = field.includes('.')
    if (flag) {
      field = field.replaceAll('.', '_')
    }
    if (getSubFieldChildren().filter((v: any) => v.field === field).length > 0) {
      errorMessage(t.value('computed.fieldExist', { label: field }))
      return oldField
    }
    if (flag) {
      return field
    }
  }
  oldValue.value = ''
  return field
}

function onFocus() {
  oldValue.value = value.value
}

function makeField() {
  oldValue.value = value.value
  value.value = uniqueId()
  onInput()
}

function onInput() {
  if (value.value !== props.modelValue) {
    value.value = checkValue()
    if (value.value !== props.modelValue) {
      emits('update:modelValue', value.value)
    }
  }
}
</script>

<template>
  <div class="_fd-field-input">
    <AlInput
      v-model="value"
      :readonly="fieldReadonly"
      :disabled="fieldReadonly"
      @focus="onFocus"
      @blur="onInput"
    >
      <template v-if="!fieldReadonly" #append>
        <i class="fc-icon icon-auto" @click="makeField" />
      </template>
    </AlInput>
  </div>
</template>

<style>
._fd-field-input {
    width: 100%;
}

._fd-field-input .el-input-group__append {
    width: 25px;
    padding: 0;
    margin: 0;
    color: #606266;
    cursor: pointer;
}
</style>
