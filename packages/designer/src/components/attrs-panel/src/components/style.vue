<script lang="ts" setup>
import { Schema } from '@ai-lowcode/core'
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
  AlTooltip,
} from '@ai-lowcode/element-plus'

import { deepCopy } from '@ai-lowcode/utils'
import { Icon } from '@iconify/vue'
import { inject, ref, watch } from 'vue'

import AlEventEditor from '@/components/attrs-panel/src/components/event-editor.vue'
import { DESIGNER_CTX } from '@/global'
import { DesignerContext } from '@/types'
import { findAndModifyById } from '@/utils'

const editor = ref()

// 全局上下文
const context = inject<DesignerContext>(DESIGNER_CTX)

const css = ref()

const editorOptions = ref({
  mode: 'css',
  theme: 'default', // 主题
  readOnly: false,
  lineNumbers: true,
  lineWiseCopyCut: true,
  gutters: ['CodeMirror-lint-markers'],
  lint: true,
})

const displayConfig = {
  display: [
    {
      label: '区块',
      name: 'block',
      icon: 'icon-park-solid:block-seven',
    },
    {
      label: '行内区块',
      name: 'inline-block',
      icon: 'fluent-mdl2:diff-inline',
    },
    {
      label: '行内文本',
      name: 'inline',
      icon: 'grommet-icons:settings-option',
    },
    {
      label: '弹性盒子',
      name: 'flex',
      icon: 'material-symbols:flex-wrap',
    },
  ],
  flexDirection: [
    {
      label: '主轴为水平方向，起点在左端',
      name: 'row',
      icon: 'icon-park-solid:block-seven',
    },
    {
      label: '主轴为垂直方向，起点在上沿',
      name: 'column',
      icon: 'fluent-mdl2:diff-inline',
    },
    {
      label: '主轴为水平方向，起点在右端',
      name: 'row-reverse',
      icon: 'grommet-icons:settings-option',
    },
    {
      label: '主轴为垂直方向，起点在下沿',
      name: 'column-reverse',
      icon: 'material-symbols:flex-wrap',
    },
  ],
  flexWrap: [
    {
      label: '不换行',
      name: 'nowrap',
      icon: 'grommet-icons:settings-option',
    },
    {
      label: '换行',
      name: 'wrap',
      icon: 'material-symbols:flex-wrap',
    },
  ],
  alignContent: [
    {
      label: '与交叉轴的中点对齐',
      name: 'center',
      icon: 'grommet-icons:settings-option',
    },
    {
      label: '与交叉轴的起点对齐',
      name: 'flex-start',
      icon: 'material-symbols:flex-wrap',
    },
    {
      label: '与交叉轴的终点对齐',
      name: 'flex-end',
      icon: 'material-symbols:flex-wrap',
    },
    {
      label: '多行子元素平均分布在交叉轴',
      name: 'space-around',
      icon: 'material-symbols:flex-wrap',
    },
    {
      label: '与交叉轴两端对齐',
      name: 'space-between',
      icon: 'material-symbols:flex-wrap',
    },
    {
      label: '轴线占满整个交叉轴',
      name: 'stretch',
      icon: 'material-symbols:flex-wrap',
    },
  ],
  justifyContent: [
    {
      label: '居中',
      name: 'center',
      icon: 'grommet-icons:settings-option',
    },
    {
      label: '左对齐',
      name: 'flex-start',
      icon: 'material-symbols:flex-wrap',
    },
    {
      label: '右对齐',
      name: 'flex-end',
      icon: 'material-symbols:flex-wrap',
    },
    {
      label: '两端对齐',
      name: 'space-between',
      icon: 'material-symbols:flex-wrap',
    },
    {
      label: '子元素两侧的间隔相等',
      name: 'space-around',
      icon: 'material-symbols:flex-wrap',
    },
    {
      label: '子元素平均分布在主轴上',
      name: 'space-evenly',
      icon: 'material-symbols:flex-wrap',
    },
  ],
  alignItems: [
    {
      label: '交叉轴的中点对齐',
      name: 'center',
      icon: 'grommet-icons:settings-option',
    },
    {
      label: '交叉轴的起点对齐',
      name: 'flex-start',
      icon: 'material-symbols:flex-wrap',
    },
    {
      label: '交叉轴的终点对齐',
      name: 'flex-end',
      icon: 'material-symbols:flex-wrap',
    },
    {
      label: '满整个容器的高度',
      name: 'stretch',
      icon: 'material-symbols:flex-wrap',
    },
    {
      label: '沿第一行文字的基线对齐',
      name: 'baseline',
      icon: 'material-symbols:flex-wrap',
    },
  ],
}

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
  display: '',
  flexDirection: '',
  flexWrap: '',
  alignContent: '',
  justifyContent: '',
  alignItems: '',
  color: '',
  backgroundColor: '',
  scale: 0,
  opacity: 0,
})

// 监听插槽变化
watch(() => style.value, () => {
  // 调用函数，查找并修改
  const newNodes = findAndModifyById(deepCopy(context?.workspaceRef?.value.schema), context?.selectComponent?.value.id, (node: Schema) => {
    node.props.style = {
      ...style.value,
      opacity: style.value.opacity / 100,
      scale: style.value.scale / 100,
    }
  })
  context?.workspaceRef?.value.changeSchema(newNodes)
}, {
  deep: true,
})

// 选中组件改变时
watch(() => context?.selectComponent, (newValue) => {
  findAndModifyById(context?.workspaceRef?.value.schema, newValue?.value.id, (node: Schema) => {
    style.value = {
      ...node.props?.style,
      opacity: node.props?.opacity * 100,
      scale: node.props?.scale * 100,
    }
  })
}, {
  deep: true,
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
          <AlForm :model="style" label-width="100px" size="small" label-position="left">
            <AlFormItem label="布局">
              <AlRadioGroup v-model="style.display">
                <AlTooltip
                  v-for="(item, index) in displayConfig.display" :key="index"
                  :content="item.label"
                  placement="top"
                >
                  <AlRadioButton :value="item.name">
                    <AlIcon size="12" class="cursor-pointer">
                      <Icon :icon="item.icon" />
                    </AlIcon>
                  </AlRadioButton>
                </AlTooltip>
              </AlRadioGroup>
            </AlFormItem>
            <div v-if="style.display === 'flex'" class="p-2 bg-gray-100 rounded-md mb-4 flex-box">
              <AlFormItem v-if="style.display === 'flex'" label="主轴的方向" label-position="top" class="mb-1">
                <AlRadioGroup v-model="style.flexDirection" class="w-full">
                  <AlTooltip
                    v-for="(item, index) in displayConfig.flexDirection" :key="index"
                    :content="item.label"
                    placement="top"
                  >
                    <AlRadioButton :value="item.name">
                      <AlIcon size="12" class="cursor-pointer">
                        <Icon :icon="item.icon" />
                      </AlIcon>
                    </AlRadioButton>
                  </AlTooltip>
                </AlRadioGroup>
              </AlFormItem>
              <AlFormItem v-if="style.display === 'flex'" label="是否换行" label-position="top" class="mb-1">
                <AlRadioGroup v-model="style.flexWrap" class="w-full">
                  <AlTooltip
                    v-for="(item, index) in displayConfig.flexWrap" :key="index"
                    :content="item.label"
                    placement="top"
                  >
                    <AlRadioButton :value="item.name">
                      <AlIcon size="12" class="cursor-pointer">
                        <Icon :icon="item.icon" />
                      </AlIcon>
                    </AlRadioButton>
                  </AlTooltip>
                </AlRadioGroup>
              </AlFormItem>
              <AlFormItem v-if="style.display === 'flex'" label="多行子元素在交叉轴上的对齐方式" label-position="top" class="mb-1">
                <AlRadioGroup v-model="style.alignContent" class="w-full">
                  <AlRadioButton v-for="(item, index) in displayConfig.alignContent" :key="index" :value="item.name">
                    <AlTooltip
                      :content="item.label"
                      placement="top"
                    >
                      <AlIcon size="12" class="cursor-pointer">
                        <Icon :icon="item.icon" />
                      </AlIcon>
                    </AlTooltip>
                  </AlRadioButton>
                </AlRadioGroup>
              </AlFormItem>
              <AlFormItem v-if="style.display === 'flex'" label="主轴上的对齐方式" label-position="top" class="mb-1">
                <AlRadioGroup v-model="style.justifyContent" class="w-full">
                  <AlTooltip
                    v-for="(item, index) in displayConfig.justifyContent" :key="index"
                    :content="item.label"
                    placement="top"
                  >
                    <AlRadioButton :value="item.name">
                      <AlIcon size="12" class="cursor-pointer">
                        <Icon :icon="item.icon" />
                      </AlIcon>
                    </AlRadioButton>
                  </AlTooltip>
                </AlRadioGroup>
              </AlFormItem>
              <AlFormItem v-if="style.display === 'flex'" label="子元素交叉轴上的对齐方式" label-position="top" class="mb-1">
                <AlRadioGroup v-model="style.alignItems" class="w-full">
                  <AlTooltip
                    v-for="(item, index) in displayConfig.alignItems"
                    :key="index"
                    :content="item.label" placement="top"
                  >
                    <AlRadioButton :value="item.name">
                      <AlIcon size="12" class="cursor-pointer">
                        <Icon :icon="item.icon" />
                      </AlIcon>
                    </AlRadioButton>
                  </AlTooltip>
                </AlRadioGroup>
              </AlFormItem>
            </div>
            <AlFormItem label="文字颜色">
              <div class="flex">
                <AlInput v-model="style.color" placeholder="Please input" />
                <AlColorPicker v-model="style.color" show-alpha />
              </div>
            </AlFormItem>
            <AlFormItem label="背景色">
              <div class="flex">
                <AlInput v-model="style.backgroundColor" placeholder="Please input" />
                <AlColorPicker v-model="style.backgroundColor" show-alpha />
              </div>
            </AlFormItem>
            <AlFormItem label="透明度">
              <AlSlider v-model="style.opacity" />
            </AlFormItem>
            <AlFormItem label="缩放">
              <AlSlider v-model="style.scale" />
            </AlFormItem>
          </AlForm>
        </div>
      </div>
    </AlCollapseItem>
    <AlCollapseItem title="自定义样式" name="2">
      <div class="p-4">
        <AlEventEditor
          ref="editor"
          v-model="css"
          style="height: calc(100vh - 290px)"
          :option="editorOptions"
        />
      </div>
    </AlCollapseItem>
  </AlCollapse>
</template>

<style lang="scss" scoped>
:deep(.flex-box) {
  .el-radio-group{
    display: flex;
  }

  .el-radio-button, .el-radio-button__inner {
    flex: 1;
  }

  .el-radio-button--small .el-radio-button__inner{
    width: 100%
  }
}
</style>
