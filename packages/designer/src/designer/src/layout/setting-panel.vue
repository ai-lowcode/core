<script setup lang="ts">
import { AlAside, AlContainer, AlDivider, AlInput, AlMain, AlTabPane, AlTabs, AlTag } from '@ai-lowcode/element-plus'

import EventConfig from '../components/event-config.vue'
import { useSettingPanel } from '../hooks/use-setting-panel.ts'

import { DragForm, Rule, SettingTabEnum, designerForm } from '@/designer'

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
  <AlAside v-if="!config || config.showConfig !== false" class="px-4" width="320px">
    <AlContainer class="flex flex-col">
      <AlTabs
        v-model="activeTab"
        type="card"
      >
        <AlTabPane
          v-if="!!activeRule || settingCustomConfig.isShow || (config && config.showFormConfig === false)" label="组件配置" name="props"
        >
          <!-- 组件配置 -->
          <template
            v-if="activeRule || (settingCustomConfig.config && (settingCustomConfig.config.name || settingCustomConfig.config.label))"
          >
            <p class="">
              组件类型
            </p>
            <AlTag type="success" effect="plain" disable-transitions>
              <template v-if="activeRule">
                {{ activeRule._menu.label }}
              </template>
              <template v-else>
                {{
                  settingCustomConfig.config.label || settingCustomConfig.config.name
                }}
              </template>
            </AlTag>
            <template
              v-if="(activeRule && activeRule.name)"
            >
              <p class="">
                编号
              </p>
              <AlInput
                size="small" class=""
                :model-value="activeRule.name"
                readonly
              >
                <template #append>
                  <i class="fc-icon icon-auto" @click="updateName" />
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
        </AlTabPane>
        <AlTabPane label="表单配置" name="form">
          <!-- 表单配置项 -->
          <DragFormView
            v-model:api="formConfigApi" :rule="settingFormConfig.rule"
            :option="settingFormConfig.options" :model-value="settingFormConfig.value"
            @change="formOptChange"
          />
        </AlTabPane>
      </AlTabs>
      <!--      <div class="h-[40px] w-full flex rounded-md overflow-hidden"> -->
      <!--        <div -->
      <!--          v-if="!!activeRule || settingCustomConfig.isShow || (config && config.showFormConfig === false)" -->
      <!--          class="flex-1 flex justify-center items-center text-sm duration-300 cursor-pointer" -->
      <!--          :class="activeTab === SettingTabEnum.PROPS ? 'bg-blue-600 text-white' : ''" -->
      <!--          @click="activeTab = SettingTabEnum.PROPS" -->
      <!--        > -->
      <!--          组件配置 -->
      <!--        </div> -->
      <!--        <div -->
      <!--          v-if="!config || config.showFormConfig !== false" -->
      <!--          class="flex-1 flex justify-center items-center text-sm duration-300 cursor-pointer" -->
      <!--          :class="activeTab === SettingTabEnum.FORM && (!!activeRule || settingCustomConfig.isShow) ? 'bg-blue-600 text-white' : ''" -->
      <!--          @click="activeTab = SettingTabEnum.FORM" -->
      <!--        > -->
      <!--          表单配置 -->
      <!--        </div> -->
      <!--      </div> -->
      <div>
        <AlMain
          v-show="activeTab === SettingTabEnum.FORM" v-if="!config || config.showFormConfig"
        />
        <AlMain
          v-show="activeTab === SettingTabEnum.PROPS" :key="activeRule ? activeRule._fc_id : (settingCustomConfig.config ? settingCustomConfig.key : '')"
        />
      </div>
    </AlContainer>
  </AlAside>
</template>
