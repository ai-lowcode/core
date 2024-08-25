<script setup lang="ts">
import {
  AlTabPane,
  AlTabs,
} from '@ai-lowcode/element-plus'
import { ref } from 'vue'

import CompAttrs from './components/attrs.vue'
import CompEvent from './components/event.vue'
import CompStyle from './components/style.vue'

const activeTab = ref('props')
</script>

<template>
  <div class="ml-[10px] w-[300px] h-full">
    <AlTabs
      v-model="activeTab"
      class="h-full overflow-auto attrs-content border border-solid border-[#e3e3e3] bg-white"
      stretch
    >
      <AlTabPane
        label="属性" name="props"
      >
        <CompAttrs />
      </AlTabPane>
      <AlTabPane label="外观" name="style">
        <CompStyle />
      </AlTabPane>
      <AlTabPane label="事件" name="event">
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
