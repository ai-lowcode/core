<script lang="ts" setup name="FcDesigner">
import { AlContainer, AlDialog, AlTabPane, AlTabs } from '@ai-lowcode/element-plus'
import HightLineJs from '@highlightjs/vue-plugin'
import 'highlight.js/lib/common'
import 'highlight.js/styles/atom-one-dark.css' // 样式
import { onMounted, provide, toRefs } from 'vue'

import ComponentsPanel from './layout/components-panel.vue'
import HeaderTools from './layout/header-tools.vue'
import SettingPanel from './layout/setting-panel.vue'
import Workspace from './layout/workspace.vue'

import {
  DESIGN_INSTANCE,
  DesignerComponentInternalInstance,
  DesignerConfig,
  MenuList,
  PreviewStatusEnum,
  Rule,
  viewForm,
} from '@/designer'
import { useDesigner } from '@/designer/src/hooks/use-designer.ts'
import { useRule } from '@/designer/src/hooks/use-rule.ts'

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

const HightLine = HightLineJs.component

export interface DesignerProps {
  /**
   * 自定义左侧的菜单列表，会覆盖默认的菜单列表
   */
  menu?: MenuList
  /**
   * 设计器组件的高度
   */
  height?: [string, number]
  /**
   * 可以配置设计器内模块是否显示和默认规则的修改
   */
  config: DesignerConfig
  /**
   * 是否显示组件的遮罩，默认为true，不可以操作组件
   */
  mask?: boolean
}

const { menu, height, mask } = toRefs(props)

const ViewForm = viewForm.$form()

const {
  previewDialogConfig,
  settingPanelRef,
  device,
  previewStatus,
  settingFormConfig,
  settingBaseConfig,
  eventShow,
  settingPropsConfig,
  workspacePreviewConfig,
  settingValidateConfig,
  workspaceEditConfig,
  settingCustomConfig,
  activeRule,
  configRef,
  selectComponent,
  changeSelectComponent,
  designerInstance,
  toolActive,
  clearActiveRule,
  setWorkspaceOption,
  handleChange,
  unWatchActiveRuleFunc,
  watchActiveRule,
  getOptionsJson,
  deviceChange,
  getOption,
} = useDesigner()

const {
  unloadStatus,
  addOperationRecord,
  operation,
  outlineTree,
  dragRuleList,
  workspaceRule,
  makeDragRule,
  makeChildren,
  dragComponent,
  setRule,
} = useRule({
  toolActive,
  settingPanelRef,
  selectComponent,
  workspacePreviewConfig,
  workspaceEditConfig,
  settingCustomConfig,
  mask,
  activeRule,
})

// 注入组件选中 provide
provide('selectComponentCtx', {
  selectComponent,
  changeSelectComponent,
})
// 注入设计器全局实例
provide<DesignerComponentInternalInstance | null>(DESIGN_INSTANCE, designerInstance)

onMounted(() => {
  // 生成工作区rule
  workspaceEditConfig.value.rule = makeDragRule(makeChildren(workspaceRule.value as Array<Rule>))
  // 生成工作区options
  setWorkspaceOption()
})
</script>

<template>
  <AlContainer style="height: 100vh" class="p-4">
    <AlContainer :style="height ? `height:${height};` : ''">
      <ComponentsPanel
        :menu="menu!"
        :config="configRef"
        :workspace-rule="workspaceRule"
        :workspace-edit-config="workspaceEditConfig"
        :workspace-preview-config="workspacePreviewConfig"
        :drag-component="dragComponent"
        :tool-active="toolActive"
        :outline-tree="outlineTree"
        :drag-rule-list="dragRuleList"
        @change-select-component="changeSelectComponent"
      />
      <AlContainer class="flex flex-col">
        <HeaderTools
          :config="config"
          :workspace-preview-config="workspacePreviewConfig"
          :device="device"
          :operation="operation"
          :workspace-edit-config="workspaceEditConfig"
          :clear-active-rule="clearActiveRule"
          :get-options-json="getOptionsJson"
          :preview-dialog-config="previewDialogConfig"
          :set-rule="setRule"
          :device-change="deviceChange"
          :get-option="getOption"
          :add-operation-record="addOperationRecord"
          :unload-status="unloadStatus"
        />
        <Workspace
          :active-rule="activeRule"
          :device="device"
          :workspace-edit-config="workspaceEditConfig"
          :workspace-preview-config="workspacePreviewConfig"
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
        :handle-change="handleChange"
        :un-watch-active-rule-func="unWatchActiveRuleFunc"
        :watch-active-rule="watchActiveRule"
      />
      <AlDialog v-model="previewDialogConfig.isShow" width="800px" class="_fd-preview-dialog" append-to-body>
        <AlTabs v-model="previewStatus" class="_fd-preview-tabs">
          <AlTabPane label="表单模式" name="form" />
          <AlTabPane label="生成组件" name="component" />
        </AlTabs>
        <template v-if="previewStatus === PreviewStatusEnum.FORM">
          <ViewForm
            v-if="previewDialogConfig.isShow" v-model:api="previewDialogConfig.api" :rule="previewDialogConfig.rule"
            :option="previewDialogConfig.options"
          />
        </template>
        <HightLine v-else language="javascript" :code="previewDialogConfig.html as string" />
      </AlDialog>
    </AlContainer>
  </AlContainer>
</template>
