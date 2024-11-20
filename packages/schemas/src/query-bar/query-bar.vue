<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { AlButton, AlIcon } from '@zero-dim/component-adapter'
import { deepCopy } from '@zero-dim/utils'
import { ref } from 'vue'

import { getExposeApi, removeAlDragBoxAndPromoteChildren } from '@/utils'

defineOptions({
  name: 'AlQueryBar',
})

const props = defineProps<{
  exposeApi: any
  // eslint-disable-next-line vue/prop-name-casing
  __schema?: Record<string, any>
  handleQuery: string
  handleReset: string
}>()

const formData = ref<Record<string, any>>({})

function initFormData() {
  const keys: Array<string> = []
  const fields = removeAlDragBoxAndPromoteChildren(deepCopy(props.__schema?.children))
  fields.map((item: any) => {
    Object.prototype.hasOwnProperty.call(item, 'field') && keys.push(item.field)
  })
  keys.map((key) => {
    formData.value[key] = props?.exposeApi?.formData.value[key]
  })
}

async function handleQuery() {
  initFormData()
  const api = await getExposeApi()
  new Function(props.handleQuery).bind({
    exposeApi: props.exposeApi,
    formData: formData.value,
    ...api,
  })()
}

async function handleReset() {
  initFormData()
  const api = await getExposeApi()
  new Function(props.handleReset).bind({
    exposeApi: props.exposeApi,
    formData: formData.value,
    ...api,
  })()
}
</script>

<template>
  <div class="flex justify-between items-center w-full" v-bind="$attrs">
    <div class="flex-1 flex flex-wrap items-center">
      <slot />
    </div>
    <div>
      <AlButton size="small" type="primary" @click="handleQuery">
        <AlIcon size="16">
          <Icon icon="ic:baseline-search" />
        </AlIcon>
        <span>查询</span>
      </AlButton>
      <AlButton size="small" @click="handleReset">
        <AlIcon size="16">
          <Icon icon="bx:reset" />
        </AlIcon>
        <span>重置</span>
      </AlButton>
    </div>
  </div>
</template>
