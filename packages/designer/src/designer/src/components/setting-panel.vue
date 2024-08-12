<script setup lang="ts">
import { AlAside, AlContainer, AlDivider, AlInput, AlMain, AlTag } from '@ai-lowcode/element-plus'

import { useSettingPanel } from '../hooks/use-setting-panel.ts'

import EventConfig from './event-config.vue'

import { DragForm, Rule, designerForm } from '@/designer'

defineProps<{
  config: any
  activeRule: Rule
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
  formOptions: any
}>()

const DragFormView = designerForm.$form()

const {
  t,
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
  <AlAside v-if="!config || config.showConfig !== false" class="_fc-r" width="320px">
    <AlContainer class="flex flex-col">
      <div class="h-[40px] w-full flex rounded-md overflow-hidden">
        <div
          v-if="!!activeRule || settingCustomConfig.isShow || (config && config.showFormConfig === false)"
          class="flex-1 flex justify-center items-center text-sm duration-300 cursor-pointer"
          :class="activeTab === 'props' ? 'bg-blue-600 text-white' : ''"
          @click="activeTab = 'props'"
        >
          {{ t('designer.component') }}
        </div>
        <div
          v-if="!config || config.showFormConfig !== false"
          class="flex-1 flex justify-center items-center text-sm duration-300 cursor-pointer"
          :class="activeTab === 'form' && (!!activeRule || settingCustomConfig.isShow) ? 'bg-blue-600 text-white' : ''"
          @click="activeTab = 'form'"
        >
          {{ t('designer.form') }}
        </div>
      </div>
      <div>
        <AlMain
          v-show="activeTab === 'form'" v-if="!config || config.showFormConfig !== false"
        >
          <!-- 表单配置项 -->
          <DragFormView
            v-model:api="formConfigApi" :rule="settingFormConfig.rule"
            :option="settingFormConfig.options" :model-value="settingFormConfig.value"
            @change="formOptChange"
          />
        </AlMain>
        <AlMain
          v-show="activeTab === 'props'" :key="activeRule ? activeRule._fc_id : (settingCustomConfig.config ? settingCustomConfig.key : '')"
        >
          <!-- 组件配置 -->
          <template
            v-if="activeRule || (settingCustomConfig.config && (settingCustomConfig.config.name || settingCustomConfig.config.label))"
          >
            <p class="">
              {{ t('designer.type') }}
            </p>
            <AlTag type="success" effect="plain" disable-transitions>
              <template v-if="activeRule">
                {{ t(`com.${activeRule._menu.name}.name`) || activeRule._menu.label }}
              </template>
              <template v-else>
                {{
                  t(`com.${settingCustomConfig.config.name}.name`) || settingCustomConfig.config.label || settingCustomConfig.config.name
                }}
              </template>
            </AlTag>
            <template
              v-if="(activeRule && activeRule.name)"
            >
              <p class="">
                {{ t('designer.name') }}
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
            {{ t('designer.rule') }}
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
            {{ t('designer.props') }}
          </AlDivider>
          <!-- 属性配置 -->
          <DragFormView
            v-show="settingPropsConfig.isShow" v-model:api="propsFormApi" :rule="settingPropsConfig.rule"
            :option="settingPropsConfig.options"
            :model-value="settingPropsConfig.value"
            @change="propChange" @remove-field="propRemoveField"
          />
          <AlDivider v-if="settingCustomConfig.isShow && settingCustomConfig.propsShow">
            {{ t('designer.props') }}
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
            {{ t('designer.event') }}
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
              {{
                t('designer.validate')
              }}
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
        </AlMain>
      </div>
    </AlContainer>
  </AlAside>
</template>
