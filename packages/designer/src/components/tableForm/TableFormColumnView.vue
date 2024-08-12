<script>
import is from '@form-create/utils/lib/type'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TableFormColumnView',
  props: {
    label: String,
    width: [Number, String],
    color: String,
  },
  data() {
    return {}
  },
  computed: {
    colStyle() {
      const w = this.width
      const style = { width: is.Number(w) ? `${w}px` : ((!w || w === 'auto') ? '180px' : w) }
      if (this.color) {
        style.color = this.color
      }
      return style
    },
  },
})
</script>

<template>
  <div class="_fd-tf-col" :style="colStyle">
    <div class="_fd-tf-title">
      {{ label || '' }}
    </div>
    <div class="_fd-tf-con">
      <slot />
    </div>
  </div>
</template>

<style>
._fd-tf-col ._fd-tf-con .el-form-item {
    margin-bottom: 1px;
}

._fd-tf-col {
    display: flex;
    flex-flow: column wrap;
    flex-shrink: 0;
    width: 180px;
}

._fd-tf-con .el-form-item__label {
    display: none !important;
}

._fd-tf-con {
    display: flex;
    flex: 1;
    width: 100%;
}

._fd-tf-con .el-form-item__content {
    display: flex;
    width: 100% !important;
    margin-left: 0 !important;
}

._fd-tf-title {
    display: flex;
    align-items: center;
    width: 100% !important;
    height: 40px;
    padding-left: 5px;
    margin-bottom: 0;
    border-bottom: 1px solid #ebeef5;
}

._fd-tf-con ._fc-l-item {
    display: flex;
    flex-shrink: 0;
    width: 100%;
    margin-top: 4px;
}

._fd-tf-con ._fc-l-item > * {
    display: none !important;
}

._fd-tf-con .el-input-number, ._fd-tf-con .el-select, ._fd-tf-con .el-slider, ._fd-tf-con .el-cascader, ._fd-tf-con .el-date-editor {
    width: 100%;
}
</style>
