<script lang="ts" setup>
import {
  AlCollapse,
  AlCollapseItem,
  AlColorPicker,
  AlForm,
  AlFormItem,
  AlIcon,
  AlInput,
  AlRadioButton,
  AlRadioGroup,
  AlSlider,
} from '@ai-lowcode/element-plus'

import { Icon } from '@iconify/vue'
import { ref } from 'vue'

import AlEventEditor from '@/components/attrs-panel/src/components/event-editor.vue'

const editor = ref()
const editorOptions = ref({
  el: 'monaco',
  options: {
    language: 'css',
    code: ``,
  },
})

const style = ref({
  marginTop: '',
  marginBottom: '',
  marginLeft: '',
  marginRight: '',
  paddingTop: '',
  paddingBottom: '',
  paddingLeft: '',
  paddingRight: '',
  width: '',
  height: '',
})

const basicStyle = ref({
  display: '',
  color: '',
  scale: 0,
  opacity: 0,
})
</script>

<template>
  <AlCollapse :model-value="['1', '2', '3']">
    <AlCollapseItem title="基础样式" name="1">
      <div class="p-4">
        <!-- 样式选择器 -->
        <div class="bg-[#f2cea5] hover:bg-[#fac78d] duration-300 border-dashed border border-gray-100 h-[251px] flex flex-col items-center justify-center">
          <div class="w-full flex justify-center items-center h-full relative">
            <span class="absolute left-[4px] top-[4px]">外边距</span>
            <input v-model="style.marginTop" type="text" class="w-[30px] border-t-0 border-l-0 border-r-0 bg-transparent border-b text-xs outline-none">
          </div>
          <div class="text-center w-full flex justify-center items-center">
            <div class="flex-1 flex justify-center items-center h-full">
              <input v-model="style.marginLeft" type="text" class="w-[30px] border-t-0 border-l-0 border-r-0 bg-transparent border-b text-xs outline-none">
            </div>
            <div class="bg-[#c6cf92] hover:bg-[#c0cd79] duration-300 border-dashed border border-gray-100 h-[170px] w-[170px] flex flex-col items-center justify-center">
              <div class="flex-1 flex justify-center items-center h-full w-full relative">
                <span class="absolute left-[4px] top-[4px]">内边距</span>
                <input v-model="style.paddingTop" type="text" class="w-[30px] border-t-0 border-l-0 border-r-0 bg-transparent border-b text-xs outline-none">
              </div>
              <div class="text-center w-full flex justify-center items-center">
                <div class="flex-1 flex justify-center items-center h-full">
                  <input v-model="style.paddingLeft" type="text" class="w-[30px] border-t-0 border-l-0 border-r-0 bg-transparent border-b text-xs outline-none">
                </div>
                <div class="bg-[#94b5c0] hover:bg-[#7badbe] duration-300 border-dashed border border-gray-100 h-[89px] w-[89px] flex flex-col items-center justify-center">
                  <div class="text-center w-full flex justify-center items-center">
                    <div class="w-full flex justify-center items-center h-full">
                      <input v-model="style.width" type="text" class="w-[30px] border-t-0 border-l-0 border-r-0 bg-transparent border-b text-xs outline-none">
                    </div>
                    <span class="mx-1">x</span>
                    <div class="w-full flex justify-center items-center h-full">
                      <input v-model="style.height" type="text" class="w-[30px] border-t-0 border-l-0 border-r-0 bg-transparent border-b text-xs outline-none">
                    </div>
                  </div>
                </div>
                <div class="flex-1 flex justify-center items-center h-full">
                  <input v-model="style.paddingRight" type="text" class="w-[30px] border-t-0 border-l-0 border-r-0 bg-transparent border-b text-xs outline-none">
                </div>
              </div>
              <div class="flex-1 flex justify-center items-center h-full w-full">
                <input v-model="style.paddingBottom" type="text" class="w-[30px] border-t-0 border-l-0 border-r-0 bg-transparent border-b text-xs outline-none">
              </div>
            </div>
            <div class="flex-1 flex justify-center items-center h-full">
              <input v-model="style.marginRight" type="text" class="w-[30px] border-t-0 border-l-0 border-r-0 bg-transparent border-b text-xs outline-none">
            </div>
          </div>
          <div class="w-full flex justify-center items-center h-full">
            <input v-model="style.marginBottom" type="text" class="w-[30px] border-t-0 border-l-0 border-r-0 bg-transparent border-b text-xs outline-none">
          </div>
        </div>
        <div class="mt-4">
          <AlForm :model="basicStyle" label-width="100px" size="small" label-position="left">
            <AlFormItem label="布局">
              <AlRadioGroup v-model="basicStyle.display">
                <AlRadioButton value="block">
                  <AlIcon size="12" class="cursor-pointer text-gray-600">
                    <Icon icon="grommet-icons:settings-option" />
                  </AlIcon>
                </AlRadioButton>
                <AlRadioButton value="inline-block">
                  <AlIcon size="12" class="cursor-pointer text-gray-600">
                    <Icon icon="grommet-icons:settings-option" />
                  </AlIcon>
                </AlRadioButton>
                <AlRadioButton value="inline">
                  <AlIcon size="12" class="cursor-pointer text-gray-600">
                    <Icon icon="grommet-icons:settings-option" />
                  </AlIcon>
                </AlRadioButton>
                <AlRadioButton value="flex">
                  <AlIcon size="12" class="cursor-pointer text-gray-600">
                    <Icon icon="grommet-icons:settings-option" />
                  </AlIcon>
                </AlRadioButton>
              </AlRadioGroup>
            </AlFormItem>
            <AlFormItem label="颜色">
              <div class="flex">
                <AlInput v-model="basicStyle.color" placeholder="Please input" />
                <AlColorPicker v-model="basicStyle.color" show-alpha />
              </div>
            </AlFormItem>
            <AlFormItem label="透明度">
              <AlSlider v-model="basicStyle.opacity" />
            </AlFormItem>
            <AlFormItem label="缩放">
              <AlSlider v-model="basicStyle.scale" />
            </AlFormItem>
          </AlForm>
        </div>
      </div>
    </AlCollapseItem>
    <AlCollapseItem title="自定义样式" name="2">
      <div class="p-4">
        <AlEventEditor
          ref="editor"
          style="height: calc(100vh - 290px)"
          :option="editorOptions"
        />
      </div>
    </AlCollapseItem>
  </AlCollapse>
</template>
