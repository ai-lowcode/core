<script setup lang="ts">
import {
  AlButton,
  AlDropdown,
  AlDropdownItem,
  AlDropdownMenu,
  AlHeader,
  AlIcon,
  AlPopconfirm,
  AlSwitch,
} from '@ai-lowcode/element-plus'
import { deepCopy, hasProperty } from '@ai-lowcode/utils'
import { Icon } from '@iconify/vue'
import { computed, inject } from 'vue'

import { useHeaderTools } from '@/components/designer/src/hooks/use-header-tools.ts'
import { parseRule } from '@/utils'
import { designerForm } from '@/utils/form.ts'

const props = defineProps<{
  inputForm: any
  device: string
  deviceChange: any
  operation: any
  handle: any
  config: any
  dragForm: any
  formOptions: any
  unloadStatus: any
  preview: any
  getJson: any
  getOptionsJson: any
  clearActiveRule: any
  setRule: any
  addOperationRecord: any
}>()

const designer = inject('designer', null)
const t = computed(() => designer.setupState.t)

function getConfig(key, def?: any) {
  return props.config ? (hasProperty(props.config, key) ? props.config[key] : def) : def
}

function getJson() {
  return designerForm.toJson(parseRule(deepCopy(props.dragForm.rule[0].children)))
}

function getOption() {
  const options = deepCopy(props.formOptions)
  Object.keys(options._event || {}).forEach((k) => {
    if (options._event[k]) {
      options[k] = options._event[k]
    }
  })
  delete options._event
  options.submitBtn = options._submitBtn
  options.resetBtn = options._resetBtn
  options.resetBtn.textContent = t.value('props.reset')
  options.submitBtn.textContent = t.value('props.submit')
  const formData = deepCopy(props.inputForm.data)
  if (Object.keys(formData).length > 0) {
    options.formData = formData
  }
  delete options._submitBtn
  delete options._resetBtn
  return options
}

function handleSave() {
  designer.emit('save', {
    rule: getJson(),
    options: designerForm.toJson([getOption()]).slice(1).slice(0, -1),
  })
}

function triggerHandle(item) {
  item.handle()
}

const {
  prevOperationRecord,
  nextOperationRecord,
  openPreview,
  clearDragRule,
  openInputData,
} = useHeaderTools()
</script>

<template>
  <AlHeader class="flex items-center h-[40px] justify-between" height="45">
    <div class="flex items-center">
      <template v-if="!inputForm.state">
        <template v-if="getConfig('showDevice') !== false">
          <AlIcon class="cursor-pointer mx-1" :class="device === 'pc' ? 'text-blue-600' : ''" @click="deviceChange('pc')">
            <Icon icon="grommet-icons:personal-computer" />
          </AlIcon>
          <AlIcon class="cursor-pointer mx-1" :class="device === 'pad' ? 'text-blue-600' : ''" @click="deviceChange('pad')">
            <Icon icon="mingcute:pad-line" />
          </AlIcon>
          <AlIcon class="cursor-pointer mx-1" :class="device === 'mobile' ? 'text-blue-600' : ''" @click="deviceChange('mobile')">
            <Icon icon="fa:mobile" />
          </AlIcon>
          <div class="line" />
        </template>
        <div class="flex items-center">
          <AlIcon
            class="cursor-pointer mx-1"
            :class="{ disabled: !operation.list[operation.idx - 1] }"
            @click="prevOperationRecord"
          >
            <Icon icon="ant-design:caret-left-filled" />
          </AlIcon>
          <AlIcon
            class="cursor-pointer mx-1"
            :class="{ disabled: !operation.list[operation.idx + 1] }"
            @click="nextOperationRecord"
          >
            <Icon icon="ant-design:caret-right-filled" />
          </AlIcon>
        </div>
      </template>
    </div>
    <div class="flex items-center">
      <template v-if="!inputForm.state">
        <slot name="handle" />
        <AlButton
          v-if="getConfig('showSaveBtn', false)" type="success" plain size="small"
          @click="handleSave"
        >
          <AlIcon
            class="mr-1"
          >
            <Icon icon="ant-design:save-outlined" />
          </AlIcon>
          {{
            t('props.save')
          }}
        </AlButton>
        <AlButton
          type="primary" plain size="small"
          @click="openPreview"
        >
          <AlIcon
            class="mr-1"
          >
            <Icon icon="ant-design:eye-filled" />
          </AlIcon>
          {{
            t('props.preview')
          }}
        </AlButton>
        <AlPopconfirm
          :title="t('designer.clearWarn')"
          width="200px"
          :confirm-button-text="t('props.clear')"
          :cancel-button-text="t('props.cancel')"
          @confirm="clearDragRule"
        >
          <template #reference>
            <AlButton type="danger" plain size="small">
              <AlIcon
                class="mr-1"
              >
                <Icon icon="ant-design:delete-filled" />
              </AlIcon>
              {{ t('props.clear') }}
            </AlButton>
          </template>
        </AlPopconfirm>
        <AlDropdown v-if="handle && handle.length" trigger="click" size="default">
          <AlButton class="mx-4" plain size="small">
            <AlIcon>
              <Icon icon="ant-design:more-outlined" />
            </AlIcon>
          </AlButton>
          <template #dropdown>
            <AlDropdownMenu>
              <AlDropdownItem v-for="item in handle" :key="item" @click.stop="triggerHandle(item)">
                <div>{{ item.label }}</div>
              </AlDropdownItem>
            </AlDropdownMenu>
          </template>
        </AlDropdown>
      </template>
      <div class="line" />
      <div class="text-sm flex items-center">
        <span>{{
          t('props.inputData')
        }}：</span>
        <AlSwitch
          size="small" :model-value="inputForm.state" inline-prompt
          @update:model-value="openInputData"
        />
      </div>
    </div>
  </AlHeader>
</template>
