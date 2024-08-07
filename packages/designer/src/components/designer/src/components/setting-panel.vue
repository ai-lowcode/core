<script setup lang="ts">
import { AlAside, AlContainer, AlDivider, AlInput, AlMain, AlTag } from '@ai-lowcode/element-plus'

import { computed, inject, ref } from 'vue'

import EventConfig from '@/components/EventConfig.vue'
import { useSettingPanel } from '@/components/designer/src/hooks/use-setting-panel.ts'
import { designerForm } from '@/utils/form.ts'

const props = defineProps<{
  config: any
  activeRule: any
  customForm: any
  baseForm: any
  propsForm: any
  eventShow: any
  validateForm: any
  form: any
  dragForm: any
  handleChange: any
  unWatchActiveRuleFunc: any
  watchActiveRule: any
  formConfig: any
  formOptions: any
}>()

const activeTab = ref('form')

const DragForm = designerForm.$form()
const designer = inject('designer', null)
const t = computed(() => designer.setupState.t)

function customFormChange(field, value) {
  if (props.customForm.config) {
    props.customForm.config.change(field, value)
  }
}

function setActiveTab(type) {
  activeTab.value = type
}

function changeEvent(on) {
  // eslint-disable-next-line vue/no-mutating-props
  props.activeRule._on = on
}

const formApi = computed({
  get() {
    return props.form.api
  },
  set(newValue) {
    // eslint-disable-next-line vue/no-mutating-props
    props.form.api = newValue
  },
})

const baseFormApi = computed({
  get() {
    return props.baseForm.api
  },
  set(newValue) {
    // eslint-disable-next-line vue/no-mutating-props
    props.baseForm.api = newValue
  },
})

const propsFormApi = computed({
  get() {
    return props.propsForm.api
  },
  set(newValue) {
    // eslint-disable-next-line vue/no-mutating-props
    props.propsForm.api = newValue
  },
})

const validateFormApi = computed({
  get() {
    return props.validateForm.api
  },
  set(newValue) {
    // eslint-disable-next-line vue/no-mutating-props
    props.validateForm.api = newValue
  },
})

const customFormApi = computed({
  get() {
    return props.customForm.api
  },
  set(newValue) {
    // eslint-disable-next-line vue/no-mutating-props
    props.customForm.api = newValue
  },
})

const {
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
          v-if="!!activeRule || customForm.isShow || (config && config.showFormConfig === false)"
          class="flex-1 flex justify-center items-center text-sm duration-300 cursor-pointer"
          :class="activeTab === 'props' ? 'bg-blue-600 text-white' : ''"
          @click="activeTab = 'props'"
        >
          {{ t('designer.component') }}
        </div>
        <div
          v-if="!config || config.showFormConfig !== false"
          class="flex-1 flex justify-center items-center text-sm duration-300 cursor-pointer"
          :class="activeTab === 'form' && (!!activeRule || customForm.isShow) ? 'bg-blue-600 text-white' : ''"
          @click="activeTab = 'form'"
        >
          {{ t('designer.form') }}
        </div>
      </div>
      <div>
        <AlMain
          v-show="activeTab === 'form'" v-if="!config || config.showFormConfig !== false"
        >
          <DragForm
            v-model:api="formApi" :rule="form.rule"
            :option="form.option" :model-value="form.value"
            @change="formOptChange"
          />
        </AlMain>
        <AlMain
          v-show="activeTab === 'props'" :key="activeRule ? activeRule._fc_id : (customForm.config ? customForm.key : '')"
        >
          <template
            v-if="activeRule || (customForm.config && (customForm.config.name || customForm.config.label))"
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
                  t(`com.${customForm.config.name}.name`) || customForm.config.label || customForm.config.name
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
          <AlDivider v-if="baseForm.isShow">
            {{ t('designer.rule') }}
          </AlDivider>
          <DragForm
            v-show="baseForm.isShow" v-model:api="baseFormApi"
            :rule="baseForm.rule"
            :option="baseForm.options"
            :model-value="baseForm.value"
            @change="baseChange"
          />
          <AlDivider v-if="propsForm.isShow">
            {{ t('designer.props') }}
          </AlDivider>
          <DragForm
            v-show="propsForm.isShow" v-model:api="propsFormApi" :rule="propsForm.rule"
            :option="propsForm.options"
            :model-value="propsForm.value"
            @change="propChange" @remove-field="propRemoveField"
          />
          <AlDivider v-if="customForm.isShow && customForm.propsShow">
            {{ t('designer.props') }}
          </AlDivider>
          <DragForm
            v-if="customForm.isShow && customForm.propsShow" :key="customForm.key"
            v-model:api="customFormApi"
            :rule="customForm.rule" :option="customForm.options"
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
            <AlDivider v-if="validateForm.isShow">
              {{
                t('designer.validate')
              }}
            </AlDivider>
            <DragForm
              v-if="validateForm.isShow" :key="activeRule._fc_id"
              v-model:api="validateFormApi"
              :rule="validateForm.rule"
              :option="validateForm.options"
              :model-value="validateForm.value"
              @change="validateChange"
            />
          </template>
        </AlMain>
      </div>
    </AlContainer>
  </AlAside>
</template>
