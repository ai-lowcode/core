<script setup lang="ts">
import { AlDivider, AlIcon, AlInput, AlTabPane, AlTabs, AlTag } from '@ai-lowcode/element-plus'

import { Icon } from '@iconify/vue'

import EventConfig from '../components/event-config.vue'
import { useSettingPanel } from '../hooks/use-setting-panel.ts'

import { DragForm, Rule, designerForm } from '@/designer'

export interface SettingPanelProps {
  config: any
  activeRule?: Rule
  settingCustomConfig: any
  settingBaseConfig: DragForm
  settingPropsConfig: DragForm
  eventShow: any
  settingValidateConfig: DragForm
  workspaceEditConfig: DragForm
  handleChange: any
  unWatchActiveRuleFunc: any
  watchActiveRule: any
  settingFormConfig: DragForm
}

defineProps<SettingPanelProps>()

const DragFormView = designerForm.$form()

const {
  formConfigApi,
  baseFormApi,
  propsFormApi,
  customFormApi,
  validateFormApi,
  customFormChange,
  changeEvent,
  activeTab,
  setActiveTab,
  validateChange,
  propRemoveField,
  propChange,
  baseChange,
  updateName,
  formOptChange,
} = useSettingPanel()

defineExpose({
  setActiveTab,
})
</script>

<template>
  <div v-if="!config || config.showConfig !== false" class="ml-[10px] w-[300px] h-full">
    <AlTabs
      v-model="activeTab"
      type="border-card"
      class="h-full overflow-auto"
      stretch
    >
      <AlTabPane
        label="属性" name="props"
      >
        <!-- 组件配置 -->
        <template
          v-if="activeRule || (settingCustomConfig.config && (settingCustomConfig.config.name || settingCustomConfig.config.label))"
        >
          <p class="text-sm">
            组件类型
          </p>
          <AlTag type="success" effect="plain" disable-transitions>
            <template v-if="activeRule">
              {{ activeRule._menu.label }}
            </template>
            <template v-else>
              {{ settingCustomConfig.config.label || settingCustomConfig.config.name }}
            </template>
          </AlTag>
          <template
            v-if="(activeRule && activeRule.name)"
          >
            <p class="text-sm">
              编号
            </p>
            <AlInput
              class="component-code"
              size="small"
              :model-value="activeRule.name"
            >
              <template #append>
                <AlIcon>
                  <Icon icon="solar:refresh-bold" />
                </AlIcon>
              </template>
            </AlInput>
          </template>
        </template>
        <AlDivider v-if="settingBaseConfig.isShow">
          基础配置
        </AlDivider>
        <!-- 基础配置 -->
        <DragFormView
          v-show="settingBaseConfig.isShow" v-model:api="baseFormApi"
          :rule="settingBaseConfig.rule"
          :option="settingBaseConfig.options"
          :model-value="settingBaseConfig.value"
          @change="baseChange"
        />
        <AlDivider v-if="settingPropsConfig.isShow">
          属性配置
        </AlDivider>
        <!-- 属性配置 -->
        <DragFormView
          v-show="settingPropsConfig.isShow" v-model:api="propsFormApi" :rule="settingPropsConfig.rule"
          :option="settingPropsConfig.options"
          :model-value="settingPropsConfig.value"
          @change="propChange" @remove-field="propRemoveField"
        />
        <AlDivider v-if="settingCustomConfig.isShow && settingCustomConfig.propsShow">
          属性配置
        </AlDivider>
        <!-- 自定义属性配置 -->
        <DragFormView
          v-if="settingCustomConfig.isShow && settingCustomConfig.propsShow" :key="settingCustomConfig.key"
          v-model:api="customFormApi"
          :rule="settingCustomConfig.rule" :option="settingCustomConfig.options"
          @change="customFormChange"
        />
        <AlDivider
          v-if="eventShow"
        >
          事件配置
        </AlDivider>
        <EventConfig
          v-if="eventShow"
          :event-name="(activeRule && activeRule._menu.event) || []"
          :component-name="(activeRule && activeRule._menu.name) || ''"
          :model-value="(activeRule && activeRule._on) || {}"
          @update:model-value="changeEvent"
        />
        <template v-if="activeRule">
          <AlDivider v-if="settingValidateConfig.isShow">
            验证配置
          </AlDivider>
          <!-- 验证配置 -->
          <DragFormView
            v-if="settingValidateConfig.isShow" :key="activeRule._fc_id"
            v-model:api="validateFormApi"
            :rule="settingValidateConfig.rule"
            :option="settingValidateConfig.options"
            :model-value="settingValidateConfig.value"
            @change="validateChange"
          />
        </template>
        <template v-if="!activeRule">
          <DragFormView
            v-model:api="formConfigApi" :rule="settingFormConfig.rule"
            :option="settingFormConfig.options" :model-value="settingFormConfig.value"
            @change="formOptChange"
          />
        </template>
      </AlTabPane>
      <!--      <AlTabPane label="表单配置" name="form"> -->
      <!--        &lt;!&ndash; 表单配置项 &ndash;&gt; -->
      <!--        <DragFormView -->
      <!--            v-model:api="formConfigApi" :rule="settingFormConfig.rule" -->
      <!--            :option="settingFormConfig.options" :model-value="settingFormConfig.value" -->
      <!--            @change="formOptChange" -->
      <!--        /> -->
      <!--      </AlTabPane> -->
      <AlTabPane label="外观" name="style">
        <!-- 外观配置项 -->
      </AlTabPane>
      <AlTabPane label="事件" name="event">
        <!-- 事件配置项 -->
      </AlTabPane>
    </AlTabs>
  </div>
</template>

<style lang="scss" scoped>
:deep(.component-code) .el-input-group__append {
  padding: 0 5px;
  color: #1b1b1f;
  cursor: pointer;
}
</style>
