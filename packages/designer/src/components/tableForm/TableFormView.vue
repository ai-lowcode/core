<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TableFormView',
  data() {
    return {}
  },
})
</script>

<template>
  <div class="_fd-table-form">
    <div v-if="$slots.default" class="_fd-tf-wrap">
      <slot />
    </div>
    <div v-else class="_fc-child-empty" />
  </div>
</template>

<style>
._fd-table-form {
    width: 100%;
    min-height: 130px;
    background: #fff;
    border: 1px solid #ECECEC;
}

._fc-child-empty {
    min-height: 130px;
}

._fd-tf-wrap {
    display: flex;
    overflow: auto;
}

._fd-tf-wrap > ._fd-drag-tool {
    display: flex;
    flex-shrink: 0;
    height: auto;
    margin: 2px;
}
</style>
