<script lang="ts" setup name="FcDesigner">
import { AlContainer, AlDialog, AlMain, AlTabPane, AlTabs } from '@ai-lowcode/element-plus'

import { onMounted, provide, toRefs } from 'vue'

import ComponentsPanel from './components/components-panel.vue'
import HeaderTools from './components/header-tools.vue'
import SettingPanel from './components/setting-panel.vue'
import Workspace from './components/workspace.vue'

import {
  DESIGN_INSTANCE,
  DesignerComponentInternalInstance,
  DesignerConfig,
  Handle,
  MenuList,
  PreviewStatusEnum,
  Rule,
  viewForm,
} from '@/designer'

import { useDesigner } from '@/designer/src/hooks/use-designer.ts'
import { useRule } from '@/designer/src/hooks/use-rule.ts'

export interface DesignerProps {
  /**
   * 自定义左侧的菜单列表，会覆盖默认的菜单列表
   */
  menu: MenuList
  /**
   * 设计器组件的高度
   */
  height: [string, number]
  /**
   * 可以配置设计器内模块是否显示和默认规则的修改
   */
  config: DesignerConfig
  /**
   * 是否显示组件的遮罩，默认为true，不可以操作组件
   */
  mask: boolean
  /**
   * 多语言配置，默认为中文
   */
  locale: object
  /**
   * 设计器顶部扩展操作按钮
   */
  handle: Handle
}

const props = defineProps<DesignerProps>()

defineEmits<{
  active: [rule: Rule]
  create: [rule: Rule]
  copy: [rule: Rule]
  delete: [rule: Rule]
  drag: any
  inputData: any
  save: any
}>()

const { menu, height, handle } = toRefs(props)

const ViewForm = viewForm.$form()

const {
  previewDialogConfig,
  settingPanelRef,
  device,
  formOptions,
  previewStatus,
  settingFormConfig,
  settingBaseConfig,
  eventShow,
  settingPropsConfig,
  workspacePreviewConfig,
  settingValidateConfig,
  unloadStatus,
  workspaceEditConfig,
  settingCustomConfig,
  moveRule,
  addRule,
  added,
  operation,
  activeRule,
  configRef,
  dragHeight,
  selectComponent,
  changeSelectComponent,
  t,
  designerInstance,
  toolActive,
  clearActiveRule,
  setOption,
  getJson,
  handleChange,
  unWatchActiveRuleFunc,
  watchActiveRule,
  getOptionsJson,
  deviceChange,
  getOption,
} = useDesigner()

const {
  dragRuleList,
  outlineTree,
  workspaceRule,
  makeDragRule,
  makeChildren,
  dragComponent,
  setRule,
  addOperationRecord,
} = useRule({
  toolActive,
  settingPanelRef,
  selectComponent,
  workspacePreviewConfig,
  unloadStatus,
  workspaceEditConfig,
  settingCustomConfig,
  moveRule,
  addRule,
  added,
  operation,
  activeRule,
})

provide('selectComponentCtx', {
  selectComponent,
  changeSelectComponent,
})
provide<DesignerComponentInternalInstance | null>(DESIGN_INSTANCE, designerInstance)

onMounted(() => {
  workspaceEditConfig.value.rule = makeDragRule(makeChildren(workspaceRule.value))
  setOption({})
})
</script>

<template>
  <AlContainer class="_fc-designer" :style="height ? `height:${dragHeight};flex:0;` : ''">
    <AlMain>
      <AlContainer style="height: 100%;">
        <ComponentsPanel
          :menu="menu"
          :t="t"
          :config="configRef"
          :outline-tree="outlineTree"
          :workspace-rule="workspaceRule"
          :workspace-edit-config="workspaceEditConfig"
          :drag-component="dragComponent"
          :tool-active="toolActive"
          :drag-rule-list="dragRuleList"
          @change-select-component="changeSelectComponent"
        />
        <AlContainer class="flex flex-col">
          <HeaderTools
            :config="config"
            :workspace-preview-config="workspacePreviewConfig"
            :device="device"
            :operation="operation"
            :handle="handle"
            :workspace-edit-config="workspaceEditConfig"
            :form-options="formOptions"
            :add-operation-record="addOperationRecord"
            :clear-active-rule="clearActiveRule"
            :get-json="getJson"
            :get-options-json="getOptionsJson"
            :preview-dialog-config="previewDialogConfig"
            :set-rule="setRule"
            :unload-status="unloadStatus"
            :device-change="deviceChange"
            :get-option="getOption"
          />
          <Workspace
            :active-rule="activeRule"
            :device="device"
            :workspace-edit-config="workspaceEditConfig"
            :form-options="formOptions"
            :workspace-preview-config="workspacePreviewConfig"
            :add-operation-record="addOperationRecord"
            :get-json="getJson"
          />
        </AlContainer>
        <SettingPanel
          ref="settingPanelRef"
          :active-rule="activeRule"
          :config="config"
          :setting-custom-config="settingCustomConfig"
          :event-show="eventShow"
          :setting-props-config="settingPropsConfig"
          :setting-validate-config="settingValidateConfig"
          :workspace-edit-config="workspaceEditConfig"
          :setting-form-config="settingFormConfig"
          :setting-base-config="settingBaseConfig"
          :form-options="formOptions"
          :handle-change="handleChange"
          :un-watch-active-rule-func="unWatchActiveRuleFunc"
          :watch-active-rule="watchActiveRule"
        />
        <AlDialog v-model="previewDialogConfig.state" width="800px" class="_fd-preview-dialog" append-to-body>
          <AlTabs v-model="previewStatus" class="_fd-preview-tabs">
            <AlTabPane :label="t('form.formMode')" name="form" />
            <AlTabPane :label="t('form.componentMode')" name="component" />
          </AlTabs>
          <template v-if="previewStatus === PreviewStatusEnum.FORM">
            <ViewForm
              v-if="previewDialogConfig.state" v-model:api="previewDialogConfig.api" :rule="previewDialogConfig.rule"
              :option="previewDialogConfig.option"
            />
          </template>
          <pre v-else class="_fd-preview-code"><code v-html="previewDialogConfig.html" /></pre>
        </AlDialog>
      </AlContainer>
    </AlMain>
  </AlContainer>
</template>
