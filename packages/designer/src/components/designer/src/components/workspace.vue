<script setup lang="ts">
import { AlButton, AlMain } from '@ai-lowcode/element-plus'

import { computed, inject } from 'vue'

import { useWorkspace } from '@/components/designer/src/hooks/use-workspace.ts'
import viewForm, { designerForm } from '@/utils/form.ts'

defineProps<{
  activeRule: any
  device: any
  inputForm: any
  dragForm: any
  formOptions: any
  getJson: any
  addOperationRecord: any
}>()

const ViewForm = viewForm.$form()
const DragForm = designerForm.$form()
const designer = inject('designer', null)
const t = computed(() => designer.setupState.t)

const inputFormApi = computed({
  get() {
    return inputForm.api
  },
  set(newValue) {
    inputForm.api = newValue
  },
})

const dragFormApi = computed({
  get() {
    return dragForm.api
  },
  set(newValue) {
    dragForm.api = newValue
  },
})

const {
  inputClear,
  inputReset,
  inputSave,
} = useWorkspace()
</script>

<template>
  <AlMain class="relative bg-[#F5F5F5] p-2">
    <div
      class="relative bg-white h-full"
      :class="device"
      :style="{ '--fc-drag-empty': `'${t('designer.dragEmpty')}'`, '--fc-child-empty': `'${t('designer.childEmpty')}'` }"
    >
      <div v-if="inputForm.state">
        <ViewForm
          :key="inputForm.key"
          v-model:api="inputFormApi" class="h-full" :rule="inputForm.rule"
          :option="inputForm.option" :disabled="false"
        />
      </div>
      <DragForm
        v-else v-model:api="dragFormApi" :rule="dragForm.rule"
        :option="formOptions"
      />
    </div>
    <div v-if="inputForm.state" class="absolute left-0 right-0 bottom-4 flex justify-center pt-[10px]" style="box-shadow: 0 -8px 20px 0 rgb(0 0 0 / 10%)">
      <AlButton plain @click="inputClear()">
        {{ t('props.clear') }}
      </AlButton>
      <AlButton plain @click="inputReset()">
        {{ t('props.reset') }}
      </AlButton>
      <AlButton type="primary" plain @click="inputSave()">
        {{ t('props.save') }}
      </AlButton>
    </div>
  </AlMain>
</template>
