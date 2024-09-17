<script setup lang="ts">
import {
  AlTabPane,
  AlTabs,
} from '@ai-lowcode/element-plus'
import { inject, ref } from 'vue'

import CompAttrs from './components/attrs.vue'
import CompEvent from './components/event.vue'
import CompStyle from './components/style.vue'

import { DESIGNER_CTX, PAGE_COMP } from '@/global'
import { DesignerContext } from '@/types'

const activeTab = ref('props')

// 全局上下文
const context = inject<DesignerContext>(DESIGNER_CTX)
</script>

<template>
  <div class="ml-[10px] w-[300px] h-full">
    <AlTabs
      v-model="activeTab"
      class="h-full attrs-content border border-solid border-basic-color bg-basic-color"
      stretch
    >
      <AlTabPane v-show="context?.selectComponent?.value.field !== PAGE_COMP" label="属性" name="props" class="h-full overflow-auto">
        <CompAttrs />
      </AlTabPane>
      <AlTabPane v-show="activeTab === 'style'" label="外观" name="style" class="h-full overflow-auto">
        <CompStyle />
      </AlTabPane>
      <AlTabPane label="事件" name="event" class="h-full overflow-auto">
        <CompEvent />
      </AlTabPane>
    </AlTabs>
  </div>
</template>

<style lang="scss" scoped>
:deep(.attrs-content) {
  .el-tabs__content {
    padding: 0;
  }

  .el-collapse-item__header {
    padding-left: 10px!important;
  }

  .el-collapse-item__content {
    padding-bottom: 0;
  }

  .el-tabs__item.is-top:nth-child(2) {
    padding: 0 20px;
  }

  .el-tabs__item.is-top:last-child {
    padding: 0 20px;
  }
}
</style>
