<script lang="ts" setup name="FcDesigner">
import {
  AlContainer,
  AlDialog,
  AlMain,
  AlTabPane,
  AlTabs,
} from '@ai-lowcode/element-plus'
import {
  isNumber,
} from '@ai-lowcode/utils'

import {
  computed,
  provide,
  toRef,
  toRefs,
} from 'vue'

import ComponentsPanel from './components/components-panel.vue'
import HeaderTools from './components/header-tools.vue'
import SettingPanel from './components/setting-panel.vue'
import Workspace from './components/workspace.vue'

import { useDesigner } from '@/components/designer/src/hooks/use-designer.ts'
import { useRule } from '@/components/designer/src/hooks/use-rule.ts'
import {
  useLocale,
} from '@/utils'
import viewForm from '@/utils/form'
import { t as globalT } from '@/utils/locale'

const props = defineProps<{
  menu: any
  height: [string, number]
  config: {
    type: object
    default: () => (object)
  }
  mask: {
    type: boolean
    default: undefined
  }
  locale: object
  handle: any
}>()
defineEmits(['active', 'create', 'copy', 'delete', 'drag', 'inputData', 'save'])

const { menu, height, locale, handle } = toRefs(props)

const ViewForm = viewForm.$form()
const configRef = toRef<any>(props, 'config', {})
const dragHeight = computed(() => {
  const h = height.value
  if (!h)
    return '100%'
  return isNumber(h) ? `${h}px` : h
})
let _t = globalT
if (locale.value) {
  _t = useLocale(locale).t
}
const t = (...args: any) => _t(...args)

// const bus = Mitt()
//
// function handleDragenter(e) {
//   bus.$emit('dragenter', e)
// }
//
// function handleDragleave(e) {
//   bus.$emit('dragleave', e)
// }
//
// function handleDrop(e) {
//   bus.$emit('drop', e)
// }

const {
  preview,
  settingPanelRef,
  device,
  formOptions,
  previewStatus,
  formConfig,
  baseForm,
  eventShow,
  propsForm,
  inputForm,
  validateForm,
  unloadStatus,
  dragForm,
  customForm,
  moveRule,
  addRule,
  added,
  operation,
  activeRule,
  children,
  fcx,
  vm,
  toolActive,
  clearActiveRule,
  setOption,
  getJson,
  handleChange,
  unWatchActiveRuleFunc,
  watchActiveRule,
  getOptionsJson,
  deviceChange,
} = useDesigner()

const {
  dragRuleList,
  treeInfo,
  makeDragRule,
  makeChildren,
  dragMenu,
  setRule,
  addOperationRecord,
} = useRule({
  toolActive,
  settingPanelRef,
  fcx,
  inputForm,
  unloadStatus,
  dragForm,
  customForm,
  moveRule,
  addRule,
  added,
  operation,
  activeRule,
  children,
})

provide('fcx', fcx)
provide('designer', vm)

dragForm.value.rule = makeDragRule(makeChildren(children.value))
setOption({})
</script>

<template>
  <AlContainer class="_fc-designer" :style="height ? `height:${dragHeight};flex:0;` : ''" @dragenter="handleDragenter" @dragleave="handleDragleave" @drop="handleDrop">
    <AlMain>
      <AlContainer :key="locale && locale.name" style="height: 100%;">
        <ComponentsPanel
          :menu="menu"
          :t="t"
          :config="configRef"
          :tree-info="treeInfo"
          :children="children"
          :drag-form="dragForm"
          :drag-menu="dragMenu"
          :fcx="fcx"
          :tool-active="toolActive"
          :drag-rule-list="dragRuleList"
        />
        <AlContainer class="flex flex-col">
          <HeaderTools
            :config="config"
            :input-form="inputForm"
            :device="device"
            :operation="operation"
            :handle="handle"
            :drag-form="dragForm"
            :form-options="formOptions"
            :add-operation-record="addOperationRecord"
            :clear-active-rule="clearActiveRule"
            :get-json="getJson"
            :get-options-json="getOptionsJson"
            :preview="preview"
            :set-rule="setRule"
            :unload-status="unloadStatus"
            :device-change="deviceChange"
          />
          <Workspace
            :active-rule="activeRule"
            :device="device"
            :drag-form="dragForm"
            :form-options="formOptions"
            :input-form="inputForm"
            :add-operation-record="addOperationRecord"
            :get-json="getJson"
          />
        </AlContainer>
        <SettingPanel
          ref="settingPanelRef"
          :form="formConfig"
          :active-rule="activeRule"
          :base-form="baseForm"
          :config="config"
          :custom-form="customForm"
          :event-show="eventShow"
          :props-form="propsForm"
          :validate-form="validateForm"
          :drag-form="dragForm"
          :form-config="formConfig"
          :form-options="formOptions"
          :handle-change="handleChange"
          :un-watch-active-rule-func="unWatchActiveRuleFunc"
          :watch-active-rule="watchActiveRule"
        />
        <AlDialog v-model="preview.state" width="800px" class="_fd-preview-dialog" append-to-body>
          <AlTabs v-model="previewStatus" class="_fd-preview-tabs">
            <AlTabPane :label="t('form.formMode')" name="form" />
            <AlTabPane :label="t('form.componentMode')" name="component" />
          </AlTabs>
          <template v-if="previewStatus === 'form'">
            <ViewForm
              v-if="preview.state" v-model:api="preview.api" :rule="preview.rule"
              :option="preview.option"
            />
          </template>
          <pre v-else class="_fd-preview-code"><code v-html="preview.value.html" /></pre>
        </AlDialog>
      </AlContainer>
    </AlMain>
  </AlContainer>
</template>
